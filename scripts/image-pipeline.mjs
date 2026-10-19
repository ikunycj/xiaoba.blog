import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import {
  existsSync, mkdirSync, readFileSync, readdirSync, realpathSync,
  statSync, writeFileSync,
} from 'node:fs'
import { basename, dirname, extname, isAbsolute, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const IMAGE_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.avif',
  '.heic', '.heif', '.tif', '.tiff', '.ico', '.jfif', '.pjpeg', '.pjp', '.apng',
])
const PRIVATE_ROOTS = new Set(['local', 'self', '.obsidian'])
const ZERO_SHA = /^0+$/

export function git(root, args, { input, binary = false, optional = false, isolated = false } = {}) {
  const env = { ...process.env }
  if (isolated) {
    // Hooks export repository-local Git variables; do not leak them to the image repo.
    const names = spawnSync('git', ['rev-parse', '--local-env-vars'], { encoding: 'utf8' })
    for (const name of (names.stdout || '').trim().split('\n')) delete env[name]
  }
  const result = spawnSync('git', args, {
    cwd: root, env, input, encoding: binary ? null : 'utf8', maxBuffer: 64 * 1024 * 1024,
  })
  if (result.error) throw result.error
  if (result.status !== 0) {
    if (optional) return null
    throw new Error(`git ${args[0]} 失败：${String(result.stderr || result.stdout).trim()}`)
  }
  return binary ? result.stdout : result.stdout.trimEnd()
}

function config(root) {
  const configured = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).imageRepository || {}
  return {
    directory: resolve(root, 'docs.source'),
    remote: configured.remote || 'https://github.com/ikunycj/xiaoba.blog-images.git',
    branch: configured.branch || 'master',
    rawBase: (configured.rawBase || 'https://raw.githubusercontent.com/ikunycj/xiaoba.blog-images/master').replace(/\/$/, ''),
  }
}

function isPublicMarkdown(path) {
  const parts = path.split('/')
  return parts[0] === 'content' && !parts.some((part) => part.startsWith('.')) && !PRIVATE_ROOTS.has(parts[1]) && path.endsWith('.md')
}

function publicFiles(root) {
  const results = []
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name)
      const rel = relative(root, path).split('\\').join('/')
      if (entry.isDirectory() && !entry.name.startsWith('.') && !PRIVATE_ROOTS.has(entry.name)) walk(path)
      if (entry.isFile() && isPublicMarkdown(rel)) results.push(rel)
    }
  }
  if (existsSync(resolve(root, 'content'))) walk(resolve(root, 'content'))
  return results.sort()
}

// Keep fences, inline code and HTML comments untouched, including illustrative image syntax.
export function rewriteMarkdown(text, replaceImage) {
  const protectedBlocks = /(^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\2[^\n]*$|<!--[^]*?-->|(`+)[^]*?\3)/gm
  const rewrite = (part) => part.replace(
    /!\[\[([^\]]+)\]\]|!\[([^\]]*)\]\(\s*(?:<([^>]+)>|((?:\\.|[^\\()\n]|\([^()\n]*\))+?))\s*(?:(["'])([^\n]*?)\5)?\s*\)/g,
    (match, wiki, alt, angled, ordinary, quote, caption) => {
      let src = wiki ? wiki.split('|')[0].trim() : (angled || ordinary).trim()
      let title = quote ? ` ${quote}${caption}${quote}` : ''
      if (!wiki && !angled) {
        const titleMatch = src.match(/^(.*?)\s+(["'])(.*)\2$/)
        if (titleMatch) { src = titleMatch[1]; title = ` ${titleMatch[2]}${titleMatch[3]}${titleMatch[2]}` }
      }
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i.test(src)) {
        const destination = replaceImage(src, { remote: true })
        return destination ? match.replace(src, destination) : match
      }
      if (!IMAGE_EXTENSIONS.has(extname(src).toLowerCase())) return match
      const destination = replaceImage(src, { remote: false })
      if (!destination) return match
      const wikiAlt = wiki?.split('|').slice(1).join('|') || ''
      return `![${wiki ? (/^\d+(?:x\d+)?$/.test(wikiAlt) ? '' : wikiAlt) : alt}](${destination}${title})`
    },
  )
  let cursor = 0
  let result = ''
  for (const match of text.matchAll(protectedBlocks)) {
    result += rewrite(text.slice(cursor, match.index)) + match[0]
    cursor = match.index + match[0].length
  }
  return result + rewrite(text.slice(cursor))
}

function localCandidates(root, path, src) {
  let decoded
  try { decoded = decodeURIComponent(src).replace(/\\/g, '/') } catch { throw new Error(`图片地址编码无效：${path}`) }
  const directory = dirname(resolve(root, path))
  const filename = basename(decoded)
  return [
    resolve(directory, decoded), resolve(directory, 'img', filename),
    resolve(directory, 'assets', filename), resolve(directory, 'attach', filename),
    resolve(directory, basename(path, '.md'), filename),
  ].filter((candidate) => {
    const rel = relative(resolve(root, 'content'), candidate).split('\\').join('/')
    return rel !== '..' && !rel.startsWith('../') && !isAbsolute(rel) && !PRIVATE_ROOTS.has(rel.split('/')[0])
  })
}

function renameSources(root, base, target) {
  if (!base) return new Map()
  const args = ['diff', '--name-status', '-z', '--find-renames', base]
  if (target) args.push(target)
  else args.push('--cached')
  const fields = git(root, args).split('\0')
  const renamed = new Map()
  for (let i = 0; i < fields.length && fields[i];) {
    const status = fields[i++]
    const oldPath = fields[i++]
    if (status.startsWith('R') || status.startsWith('C')) renamed.set(fields[i++], oldPath)
  }
  return renamed
}

function oldReferences(root, path, base, renamed) {
  if (!base) return new Set()
  const previous = git(root, ['show', `${base}:${renamed.get(path) || path}`], { binary: true, optional: true })
  const references = new Set()
  if (previous !== null) rewriteMarkdown(previous.toString('utf8'), (src, { remote }) => { if (!remote) references.add(src) })
  return references
}

function ensureImageRepository(root) {
  const settings = config(root)
  if (!existsSync(resolve(settings.directory, '.git'))) {
    if (existsSync(settings.directory)) throw new Error('docs.source/ 不是独立 Git 仓库；请移开该目录后重试，禁止覆盖现有文件。')
    console.log('首次使用：克隆图片仓库。')
    git(root, ['clone', '--filter=blob:none', '--sparse', '--depth', '1', '--branch', settings.branch, settings.remote, settings.directory], { isolated: true })
  }
  const top = git(settings.directory, ['rev-parse', '--show-toplevel'], { isolated: true })
  if (realpathSync(top) !== realpathSync(settings.directory)) throw new Error('docs.source/ 必须是独立图片仓库。')
  return settings
}

export function prepareImages(root, { staged = false, files } = {}) {
  const base = git(root, ['rev-parse', '--verify', 'HEAD'], { optional: true })
  const renamed = renameSources(root, base, null)
  const settings = config(root)
  const changed = staged ? git(root, ['diff', '--cached', '--name-only', '-z', '--diff-filter=ACMR']).split('\0').filter(Boolean) : []
  const selected = files || (staged ? changed.filter(isPublicMarkdown) : publicFiles(root))
  const changedImages = new Set(changed.filter((path) => IMAGE_EXTENSIONS.has(extname(path).toLowerCase())))
  if (staged && changedImages.size) {
    for (const path of git(root, ['ls-files', '-z', 'content']).split('\0').filter(isPublicMarkdown)) {
      if (selected.includes(path)) continue
      const text = git(root, ['show', `:${path}`], { binary: true }).toString('utf8')
      let usesChangedImage = false
      rewriteMarkdown(text, (src, { remote }) => {
        if (!remote || !src.startsWith(`${settings.rawBase}/`)) return
        const original = decodeURIComponent(src.slice(settings.rawBase.length + 1)).replace(/\.[a-f0-9]{16}(\.[^.\/]+)$/, '$1')
        if (changedImages.has(`content/${original}`)) usesChangedImage = true
      })
      if (usesChangedImage) selected.push(path)
    }
  }
  const assets = new Map()
  const documents = []
  const errors = []
  let inheritedMissing = 0
  for (const path of selected) {
    if (!isPublicMarkdown(path)) throw new Error(`不允许上传非公开内容：${path}`)
    const absolute = resolve(root, path)
    const original = staged ? git(root, ['show', `:${path}`], { binary: true }).toString('utf8') : readFileSync(absolute, 'utf8')
    const old = oldReferences(root, path, base, renamed)
    const rewritten = rewriteMarkdown(original, (src, { remote }) => {
      let lookup = src
      if (remote) {
        if (!src.startsWith(`${settings.rawBase}/`)) return null
        const hosted = decodeURIComponent(src.slice(settings.rawBase.length + 1))
        if (!/\.[a-f0-9]{16}\.[^.\/]+$/.test(hosted)) return null
        const original = hosted.replace(/\.[a-f0-9]{16}(\.[^.\/]+)$/, '$1')
        lookup = relative(dirname(absolute), resolve(root, 'content', original)).split('\\').join('/')
      }
      let asset
      for (const candidate of localCandidates(root, path, lookup)) {
        const rel = relative(root, candidate).split('\\').join('/')
        const indexed = staged ? git(root, ['show', `:${rel}`], { binary: true, optional: true }) : null
        if (indexed !== null) {
          const mode = git(root, ['ls-files', '--stage', '--', rel]).split(' ')[0]
          if (mode === '120000') { errors.push(`${path}：拒绝上传符号链接图片 ${src}`); return null }
          asset = { path: candidate, bytes: indexed }
          break
        }
        if (existsSync(candidate) && statSync(candidate).isFile()) {
          const canonical = realpathSync(candidate)
          const canonicalRelative = relative(realpathSync(resolve(root, 'content')), canonical)
          if (canonicalRelative.startsWith('..') || isAbsolute(canonicalRelative) || PRIVATE_ROOTS.has(canonicalRelative.split('/')[0])) {
            errors.push(`${path}：拒绝越界图片 ${src}`)
            return null
          }
          asset = { path: candidate, bytes: readFileSync(candidate) }
          break
        }
      }
      if (!asset) {
        if (remote) return null
        if (old.has(src)) inheritedMissing++
        else errors.push(`${path}：找不到图片 ${src}`)
        return null
      }
      const rel = relative(resolve(root, 'content'), asset.path).split('\\').join('/')
      const extension = extname(rel)
      const digest = createHash('sha256').update(asset.bytes).digest('hex')
      const destination = `${rel.slice(0, -extension.length)}.${digest.slice(0, 16)}${extension}`
      const url = `${settings.rawBase}/${destination.split('/').map(encodeURIComponent).join('/')}`
      if (remote && url === src) return null
      assets.set(destination, asset.bytes)
      return url
    })
    if (rewritten !== original) documents.push({ path, absolute, original, rewritten })
  }
  if (errors.length) throw new Error(errors.join('\n'))
  // Validate the entire plan before changing any Markdown or index entry.
  if (assets.size) ensureImageRepository(root)
  for (const [path, bytes] of assets) {
    const destination = resolve(settings.directory, path)
    if (existsSync(destination) && !readFileSync(destination).equals(bytes)) throw new Error(`图片哈希路径冲突：${path}`)
    mkdirSync(dirname(destination), { recursive: true })
    writeFileSync(destination, bytes)
  }
  for (const document of documents) {
    if (staged) {
      const mode = git(root, ['ls-files', '--stage', '--', document.path]).split(' ')[0]
      const blob = git(root, ['hash-object', '-w', '--stdin'], { input: document.rewritten })
      git(root, ['update-index', '--cacheinfo', `${mode},${blob},${document.path}`])
      if (existsSync(document.absolute) && readFileSync(document.absolute, 'utf8') === document.original) {
        writeFileSync(document.absolute, document.rewritten)
      } else {
        console.log(`保留未暂存的正文修改：${document.path}`)
      }
    } else writeFileSync(document.absolute, document.rewritten)
  }
  console.log(`图片检查：${selected.length} 篇正文，${documents.length} 篇改写，${assets.size} 张图片待同步；保留本地原图。`)
  if (inheritedMissing) console.warn(`历史已有缺图引用 ${inheritedMissing} 处，未改动；新增缺图会阻止提交。`)
  return { documents: documents.map((d) => d.path), assets: [...assets.keys()], inheritedMissing }
}

export function pushImages(root) {
  const settings = config(root)
  if (!existsSync(settings.directory)) return null
  ensureImageRepository(root)
  const imageGit = (args, options) => git(settings.directory, args, { ...options, isolated: true })
  const changed = imageGit(['status', '--porcelain=v1', '-z', '--untracked-files=all']).split('\0').filter(Boolean)
  const paths = changed.map((entry) => {
    const status = entry.slice(0, 2)
    const path = entry.slice(3)
    if (!/^[? AM]+$/.test(status) || !IMAGE_EXTENSIONS.has(extname(path).toLowerCase()) || PRIVATE_ROOTS.has(path.split('/')[0])) {
      throw new Error('图片仓库包含非图片变更、删除或重命名，拒绝自动提交，请单独处理 docs.source/。')
    }
    return path
  })
  if (paths.length) {
    imageGit(['add', '--sparse', '--', ...paths])
    imageGit(['commit', '-m', 'chore: 同步文章图片'])
  }
  // A previous push may have failed after commit. Always retry even when status is clean.
  imageGit(['fetch', 'origin', settings.branch])
  imageGit(['merge', '--ff-only', `origin/${settings.branch}`])
  imageGit(['push', '--set-upstream', 'origin', `HEAD:refs/heads/${settings.branch}`])
  const head = imageGit(['rev-parse', 'HEAD'])
  console.log(`图片仓库已同步：${head.slice(0, 12)}`)
  return head
}

export function checkPush(root, input) {
  const settings = config(root)
  const errors = []
  const hosted = new Set()
  let inheritedMissing = 0
  for (const line of input.trim().split('\n').filter(Boolean)) {
    const [, local, , remote] = line.split(/\s+/)
    if (ZERO_SHA.test(local)) continue
    const commit = git(root, ['rev-parse', `${local}^{commit}`], { optional: true })
    if (!commit) continue
    const base = ZERO_SHA.test(remote) ? git(root, ['rev-parse', `${commit}^`], { optional: true })
      : git(root, ['rev-parse', `${remote}^{commit}`], { optional: true })
    const renamed = renameSources(root, base, commit)
    const paths = (base && !ZERO_SHA.test(remote)
      ? git(root, ['diff', '--name-only', '-z', '--diff-filter=ACMR', base, commit])
      : git(root, ['ls-tree', '-r', '--name-only', '-z', commit])).split('\0').filter(isPublicMarkdown)
    for (const path of paths) {
      const previous = oldReferences(root, path, base, renamed)
      rewriteMarkdown(git(root, ['show', `${commit}:${path}`], { binary: true }).toString('utf8'), (src, { remote: isRemote }) => {
        if (isRemote) {
          if (src.startsWith(`${settings.rawBase}/`)) {
            const rel = decodeURIComponent(src.slice(settings.rawBase.length + 1))
            if (rel.split('/').some((part) => part === '..') || PRIVATE_ROOTS.has(rel.split('/')[0])) errors.push(`${path}：非法图床路径`)
            else hosted.add(rel)
          }
        } else if (previous.has(src) && !localCandidates(root, path, src).some((candidate) =>
          git(root, ['cat-file', '-e', `${commit}:${relative(root, candidate).split('\\').join('/')}`], { optional: true }) !== null)) {
          inheritedMissing++
        } else errors.push(`${path}：存在未转换的本地图片 ${src}；请重新 git add 后 git commit，勿绕过 pre-commit。`)
      })
    }
  }
  if (errors.length) throw new Error(errors.join('\n'))
  // The source push only starts after the image push has succeeded.
  if (hosted.size) {
    ensureImageRepository(root)
    pushImages(root)
    for (const path of hosted) {
      if (!git(settings.directory, ['ls-tree', 'HEAD', '--', path], { isolated: true })) {
        errors.push(`图床仓库缺少已引用图片：${path}`)
      }
    }
  } else if (existsSync(settings.directory)) pushImages(root)
  if (errors.length) throw new Error(errors.join('\n'))
  if (inheritedMissing) console.warn(`本次推送保留 ${inheritedMissing} 处历史缺图引用。`)
  console.log(`推送前校验通过：${hosted.size} 张图床图片已存在；继续推送代码。`)
}

function runPreviousHook(root, name, args, input) {
  const previous = git(root, ['config', '--local', '--get', 'images.previousHooksPath'], { optional: true })
  if (!previous) return
  const path = resolve(root, previous, name)
  if (!existsSync(path) || realpathSync(path) === realpathSync(resolve(root, '.githooks', name))) return
  const result = spawnSync(path, args, { cwd: root, input, stdio: ['pipe', 'inherit', 'inherit'] })
  if (result.error || result.status !== 0) throw new Error(`原有 ${name} 钩子失败，停止操作。`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const root = git(process.cwd(), ['rev-parse', '--show-toplevel'])
    const [command, ...args] = process.argv.slice(2)
    if (command === 'pre-commit') {
      runPreviousHook(root, command, args, '')
      prepareImages(root, { staged: true })
    } else if (command === 'pre-push') {
      const input = readFileSync(0, 'utf8')
      runPreviousHook(root, command, args, input)
      checkPush(root, input)
    } else throw new Error(`未知图片流水线操作：${command}`)
  } catch (error) {
    console.error(`图片流水线失败：${error.message}`)
    process.exitCode = 1
  }
}
