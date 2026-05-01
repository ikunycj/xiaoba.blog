/**
 * images:prepare
 *
 * 逻辑：
 * 1. 扫描 docs/**\/*.md
 * 2. 识别本地图片引用（Obsidian ![[]] 和标准 Markdown ![]()）
 * 3. 直接替换 docs/ 中 Markdown 的图片引用为 raw GitHub URL
 * 4. 将图片文件迁移（移动）到 docs.source/ 对应位置，删除原文件，清理空目录
 *
 * 幂等：已经是目标 raw GitHub URL 的引用完全跳过。
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'

// ─── 配置 ────────────────────────────────────────────────────────────────────

const REPO_ROOT = process.cwd()
const DOCS_ROOT = resolve(REPO_ROOT, 'docs')
const SOURCE_ROOT = resolve(REPO_ROOT, 'docs.source')

const RAW_PREFIX = 'https://raw.githubusercontent.com/ikunycj/xiaoba.blog-images/main'

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'])

// ─── 工具函数 ─────────────────────────────────────────────────────────────────

function normalizeSep(p) {
  return p.replace(/\\/g, '/')
}

function isRemoteUrl(src) {
  return /^https?:\/\//i.test(src)
}

function isTargetUrl(src) {
  return src.startsWith(RAW_PREFIX)
}

function isImageExt(filename) {
  const lower = filename.toLowerCase()
  for (const ext of IMAGE_EXTENSIONS) {
    if (lower.endsWith(ext)) return true
  }
  return false
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true })
}

/** 删除空目录（递归向上直到 docs/ 为止） */
function removeEmptyDirs(dir) {
  if (!existsSync(dir)) return
  if (dir === DOCS_ROOT || !dir.startsWith(DOCS_ROOT)) return
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return
  }
  if (entries.length === 0) {
    try {
      rmSync(dir, { recursive: true })
    } catch {
      return
    }
    removeEmptyDirs(dirname(dir))
  }
}

/** 收集所有 Markdown 文件 */
function collectMarkdownFiles(dir, results = []) {
  if (!existsSync(dir)) return results
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      collectMarkdownFiles(fullPath, results)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath)
    }
  }
  return results
}

/**
 * 解析本地图片引用 src 中的文件名，按优先级查找文件路径
 * 返回绝对路径或 null
 *
 * 查找顺序：
 * 1. 引用中含路径分隔符 → 直接按相对路径找
 * 2. 同级目录
 * 3. img/
 * 4. assets/
 * 5. attach/（Obsidian 常见附件目录）
 * 6. 与 Markdown 同名的子目录（Obsidian 附件约定：Foo.md → Foo/）
 */
function resolveLocalImage(rawSrc, mdDir, mdPath) {
  const src = normalizeSep(rawSrc).trim()

  // 1. 如果包含路径分隔符，先按相对路径找
  if (src.includes('/')) {
    const candidate = resolve(mdDir, src)
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }

  // 2-6. 仅文件名：按顺序查找各候选目录
  const filename = basename(src)
  // 与 Markdown 同名的子目录（去掉 .md 后缀）
  const mdStemDir = resolve(mdDir, basename(mdPath, '.md'))
  const candidates = [
    resolve(mdDir, filename),
    resolve(mdDir, 'img', filename),
    resolve(mdDir, 'assets', filename),
    resolve(mdDir, 'attach', filename),
    resolve(mdStemDir, filename),
  ]
  for (const c of candidates) {
    if (existsSync(c) && statSync(c).isFile()) return c
  }

  return null
}

/**
 * 计算图片相对 DOCS_ROOT 的路径（用于图床 URL 和 docs.source 路径）
 * 如果图片不在 DOCS_ROOT 下则抛出错误
 */
function relativeToDocsRoot(absPath) {
  const rel = relative(DOCS_ROOT, absPath)
  if (rel.startsWith('..')) {
    throw new Error(`图片 ${absPath} 不在 docs/ 目录下`)
  }
  return normalizeSep(rel)
}

/**
 * 迁移图片：移动到 docs.source/ 并删除原文件
 * 如果 docs.source/ 中已存在相同路径的文件则跳过移动，但仍删除 docs/ 原文件
 */
function migrateImage(absImagePath, relPath, migratedSet) {
  if (migratedSet.has(relPath)) {
    // 同一图片已被迁移（由其他 md 触发），直接跳过文件操作
    return
  }

  const destPath = resolve(SOURCE_ROOT, relPath)
  ensureDir(dirname(destPath))

  if (!existsSync(destPath)) {
    // 目标不存在：移动
    renameSync(absImagePath, destPath)
  } else {
    // 目标已存在：删除 docs/ 原文件（不覆盖）
    rmSync(absImagePath)
  }

  migratedSet.add(relPath)
  removeEmptyDirs(dirname(absImagePath))
}

// ─── Markdown 解析与改写 ────────────────────────────────────────────────────

/**
 * 将 Markdown 内容中的本地图片引用替换为 raw GitHub URL
 * 同时收集需要迁移的图片信息
 *
 * 返回：
 *   - newContent: 替换后的 Markdown 字符串
 *   - imagesToMigrate: [{ absPath, relPath }]
 */
function processMarkdown(content, mdPath) {
  const mdDir = dirname(mdPath)
  const errors = []
  const imagesToMigrate = []

  let newContent = content

  // 1. Obsidian 图片：![[filename]] / ![[filename|说明]] / ![[filename|300]]
  newContent = newContent.replace(/!\[\[([^\]]+)\]\]/g, (match, inner) => {
    // inner 可能是 "a.png" / "a.png|说明" / "a.png|300"
    const [rawSrc, ...rest] = inner.split('|')
    const altRaw = rest.join('|').trim() // "说明" 或 "300" 或 ""

    if (!isImageExt(rawSrc.trim())) return match // 非图片类型，跳过

    // 定位本地文件
    const absPath = resolveLocalImage(rawSrc.trim(), mdDir, mdPath)
    if (!absPath) {
      errors.push(`找不到图片：${rawSrc.trim()}（来自 ${mdPath}）`)
      return match
    }

    const relPath = relativeToDocsRoot(absPath)
    const url = `${RAW_PREFIX}/${relPath}`

    // alt：如果是纯数字则忽略（宽度参数），否则保留
    const alt = altRaw && /^\d+$/.test(altRaw) ? '' : altRaw

    imagesToMigrate.push({ absPath, relPath })
    return `![${alt}](${url})`
  })

  // 2. 标准 Markdown 本地图片：![alt](src)
  newContent = newContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, rawSrc) => {
    const src = rawSrc.trim()

    // 已经是外链（包含目标 URL）则跳过
    if (isRemoteUrl(src)) {
      if (isTargetUrl(src)) return match // 已经是目标 URL，直接跳过
      return match // 其他外链，也跳过
    }

    if (!isImageExt(src)) return match // 非图片类型，跳过

    // 定位本地文件
    const absPath = resolveLocalImage(src, mdDir, mdPath)
    if (!absPath) {
      errors.push(`找不到图片：${src}（来自 ${mdPath}）`)
      return match
    }

    const relPath = relativeToDocsRoot(absPath)
    const url = `${RAW_PREFIX}/${relPath}`

    imagesToMigrate.push({ absPath, relPath })
    return `![${alt}](${url})`
  })

  return { newContent, imagesToMigrate, errors }
}

// ─── 主流程 ──────────────────────────────────────────────────────────────────

function main() {
  console.log('▶ images:prepare 开始')
  console.log(`  docs 根目录：${DOCS_ROOT}`)
  console.log(`  图床目标目录：${SOURCE_ROOT}`)
  console.log(`  图床 URL 前缀：${RAW_PREFIX}`)

  // 确保 docs.source/ 存在
  ensureDir(SOURCE_ROOT)

  const mdFiles = collectMarkdownFiles(DOCS_ROOT)
  console.log(`\n  扫描到 ${mdFiles.length} 个 Markdown 文件`)

  const allErrors = []
  const migratedSet = new Set() // 已迁移图片的 relPath 集合，防重复
  let rewrittenMdCount = 0
  let migratedImageCount = 0

  for (const mdPath of mdFiles) {
    const content = readFileSync(mdPath, 'utf8')
    const { newContent, imagesToMigrate, errors } = processMarkdown(content, mdPath)

    if (errors.length > 0) {
      allErrors.push(...errors)
    }

    if (newContent !== content) {
      writeFileSync(mdPath, newContent, 'utf8')
      rewrittenMdCount++
      console.log(`  ✓ 改写：${relative(REPO_ROOT, mdPath)}`)
    }

    for (const { absPath, relPath } of imagesToMigrate) {
      const isNew = !migratedSet.has(relPath)
      migrateImage(absPath, relPath, migratedSet)
      if (isNew) {
        migratedImageCount++
        console.log(`  → 迁移：${relPath}`)
      }
    }
  }

  console.log(`\n  改写 Markdown：${rewrittenMdCount} 个`)
  console.log(`  迁移图片：${migratedImageCount} 个`)

  if (allErrors.length > 0) {
    console.error('\n⚠ 以下图片未能处理（请手动检查）：')
    for (const e of allErrors) {
      console.error(`  ${e}`)
    }
  }

  console.log('\n✅ images:prepare 完成')
}

main()
