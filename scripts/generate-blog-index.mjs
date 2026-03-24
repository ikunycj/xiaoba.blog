import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { basename, relative, resolve } from 'node:path'

const BLOG_ROOT = '/blog/'
const NOTE_ROOT = '/note/'
const PAGE_SIZE = 6
const REPO_ROOT = process.cwd()
const DOCS_ROOT = resolve(REPO_ROOT, 'docs')
const OUTPUT_ROOT = resolve(DOCS_ROOT, 'blogs', 'public', 'blog-index')
const ALL_LABEL = '\u5168\u90E8'
const UNKNOWN_LABEL = '\u672A\u77E5\u65F6\u95F4'
const BLOG_LABEL = '\u535A\u5BA2'
const OTHER_LABEL = '\u5176\u4ED6'

function normalizeFsPath(value) {
  return value.replace(/\\/g, '/')
}

function normalizeContentUrl(url) {
  let normalized = url.trim()
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`
  }
  if (normalized.startsWith('/blogs/')) {
    normalized = normalized.slice('/blogs'.length)
  }
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}

function toRoutePath(filePath) {
  let routePath = normalizeFsPath(relative(DOCS_ROOT, filePath))
  if (routePath.startsWith('blogs/')) {
    routePath = routePath.slice('blogs/'.length)
  }
  routePath = routePath.replace(/\/index\.md$/u, '/').replace(/\.md$/u, '')
  return normalizeContentUrl(routePath)
}

function isArticlePage(url, root) {
  if (!url.startsWith(root)) {
    return false
  }
  return url !== `${root}index` && !url.endsWith('/index')
}

function isBlogPost(url) {
  return isArticlePage(url, BLOG_ROOT) || isArticlePage(url, NOTE_ROOT)
}

function walkMarkdownFiles(dir, files = []) {
  if (!existsSync(dir)) {
    return files
  }

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      walkMarkdownFiles(fullPath, files)
      continue
    }

    if (entry.isFile() && fullPath.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

function parseTimestamp(value) {
  if (value instanceof Date) {
    const parsed = value.getTime()
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value).getTime()
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
  }

  return 0
}

function resolveCreatedAt(stats) {
  const createdAt = Number.isFinite(stats.birthtimeMs) && stats.birthtimeMs > 0 ? stats.birthtimeMs : 0
  if (createdAt > 0) {
    return createdAt
  }
  return Number.isFinite(stats.mtimeMs) && stats.mtimeMs > 0 ? stats.mtimeMs : 0
}

function resolveUpdated(frontmatter, stats) {
  const explicitUpdated = parseTimestamp(frontmatter.lastUpdated)
  if (explicitUpdated > 0) {
    return explicitUpdated
  }

  const explicitDate = parseTimestamp(frontmatter.date)
  if (explicitDate > 0) {
    return explicitDate
  }

  return Number.isFinite(stats.mtimeMs) && stats.mtimeMs > 0 ? stats.mtimeMs : resolveCreatedAt(stats)
}

function resolvePublished(frontmatter, stats) {
  const explicitDate = parseTimestamp(frontmatter.date)
  if (explicitDate > 0) {
    return explicitDate
  }

  const createdAt = resolveCreatedAt(stats)
  if (createdAt > 0) {
    return createdAt
  }

  return resolveUpdated(frontmatter, stats)
}

function resolveSection(url) {
  const parts = decodeURI(url).split('/').filter(Boolean)
  if (parts[0] === 'blog') {
    return BLOG_LABEL
  }
  return parts[1] || OTHER_LABEL
}

function resolveTitle(filePath, frontmatter) {
  const rawTitle = frontmatter.title
  if (typeof rawTitle === 'string' && rawTitle.trim().length > 0) {
    return rawTitle.trim()
  }

  const fileName = basename(filePath, '.md').trim()
  if (fileName && fileName !== 'index') {
    return fileName
  }

  return '\u672A\u547D\u540D\u6587\u7AE0'
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\(([^)]+)\)/g, ' ')
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/^>\s?/gm, ' ')
    .replace(/[*_~|>-]/g, ' ')
    .replace(/\r?\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function resolveSummary(frontmatter, content, section) {
  const description = frontmatter.description
  if (typeof description === 'string' && description.trim().length > 0) {
    return description.trim()
  }

  const plainText = stripMarkdown(content.slice(0, 2000))
  if (plainText.length > 0) {
    return plainText.slice(0, 120)
  }

  return `\u6765\u81EA\u300C${section}\u300D\u4E13\u9898\u7684\u6700\u8FD1\u66F4\u65B0\u6587\u7AE0\u3002`
}

function formatDate(timestamp) {
  if (!timestamp) {
    return UNKNOWN_LABEL
  }

  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

function resolveArchiveKey(timestamp) {
  if (!timestamp) return 'unknown'
  const date = new Date(timestamp)
  if (!Number.isFinite(date.getTime())) return 'unknown'
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  return `${date.getFullYear()}-${month}`
}

function resolveArchiveLabel(key) {
  if (key === 'unknown') return UNKNOWN_LABEL
  const [year, month] = key.split('-')
  return `${year}\u5E74${month}\u6708`
}

function normalizeFrontmatterValue(value) {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  if (/^(true|false)$/iu.test(trimmed)) {
    return trimmed.toLowerCase() === 'true'
  }

  if (/^-?\d+(?:\.\d+)?$/u.test(trimmed)) {
    return Number(trimmed)
  }

  return trimmed
}

function parseFrontmatterBlock(block) {
  const frontmatter = {}
  let pendingKey = ''
  let pendingLines = []

  const flushPending = () => {
    if (!pendingKey) {
      return
    }

    frontmatter[pendingKey] = pendingLines.join(' ').trim()
    pendingKey = ''
    pendingLines = []
  }

  for (const line of block.split(/\r?\n/u)) {
    if (pendingKey) {
      if (/^\s+/u.test(line)) {
        pendingLines.push(line.trim())
        continue
      }
      flushPending()
    }

    const match = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/u)
    if (!match) {
      continue
    }

    const [, key, rawValue] = match
    if (!['title', 'description', 'date', 'lastUpdated'].includes(key)) {
      continue
    }

    const value = rawValue.trim()
    if (!value || value === '|' || value === '>') {
      pendingKey = key
      pendingLines = []
      continue
    }

    frontmatter[key] = normalizeFrontmatterValue(value)
  }

  flushPending()
  return frontmatter
}

function extractFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/u)
  if (!match) {
    return {
      frontmatter: {},
      content: source,
    }
  }

  return {
    frontmatter: parseFrontmatterBlock(match[1]),
    content: source.slice(match[0].length),
  }
}

function ensureDir(dirPath) {
  mkdirSync(dirPath, { recursive: true })
}

function writeJson(filePath, value) {
  ensureDir(resolve(filePath, '..'))
  writeFileSync(filePath, JSON.stringify(value), 'utf8')
}

function buildBucket(key, label, items) {
  return {
    key,
    label,
    count: items.length,
    latest: items[0]?.publishedAt || 0,
    totalPages: Math.max(1, Math.ceil(items.length / PAGE_SIZE)),
  }
}

function buildBlogDirectory(posts) {
  return posts
    .filter((post) => post.url.startsWith('/blog/'))
    .map((post) => ({
      title: post.title,
      url: post.url,
      updatedAt: post.updatedAt,
      updatedText: post.updatedText,
    }))
}

function buildPosts() {
  const files = [
    ...walkMarkdownFiles(resolve(DOCS_ROOT, 'note')),
    ...walkMarkdownFiles(resolve(DOCS_ROOT, 'blogs')),
  ].sort()

  return files
    .map((filePath) => {
      const url = toRoutePath(filePath)
      if (!isBlogPost(url)) {
        return null
      }

      const source = readFileSync(filePath, 'utf8')
      const { frontmatter, content } = extractFrontmatter(source)
      const stats = statSync(filePath)
      const section = resolveSection(url)
      const publishedAt = resolvePublished(frontmatter, stats)
      const updatedAt = resolveUpdated(frontmatter, stats) || publishedAt

      return {
        title: resolveTitle(filePath, frontmatter),
        summary: resolveSummary(frontmatter, content, section),
        section,
        url,
        publishedAt,
        publishedText: formatDate(publishedAt),
        updatedAt,
        updatedText: formatDate(updatedAt),
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.publishedAt - a.publishedAt || b.updatedAt - a.updatedAt)
}

function writePagedItems(baseDir, key, items) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  for (let page = 1; page <= totalPages; page += 1) {
    const start = (page - 1) * PAGE_SIZE
    const pageItems = items.slice(start, start + PAGE_SIZE)
    writeJson(resolve(baseDir, `page-${page}.json`), {
      key,
      page,
      totalPages,
      items: pageItems,
    })
  }
}

function generateBlogIndex() {
  const posts = buildPosts()
  const latestUpdatedText = formatDate(posts.find((post) => post.updatedAt > 0)?.updatedAt || 0)
  const archiveMap = new Map()

  for (const post of posts) {
    const key = resolveArchiveKey(post.publishedAt)
    const current = archiveMap.get(key)
    if (current) {
      current.push(post)
      continue
    }
    archiveMap.set(key, [post])
  }

  const archiveEntries = Array.from(archiveMap.entries())
    .map(([key, items]) => ({
      key,
      label: resolveArchiveLabel(key),
      items,
    }))
    .sort((a, b) => {
      if (a.key === 'unknown') return 1
      if (b.key === 'unknown') return -1
      return (b.items[0]?.publishedAt || 0) - (a.items[0]?.publishedAt || 0)
    })

  rmSync(OUTPUT_ROOT, { recursive: true, force: true })
  ensureDir(OUTPUT_ROOT)

  writePagedItems(resolve(OUTPUT_ROOT, 'all'), 'all', posts)
  for (const entry of archiveEntries) {
    writePagedItems(resolve(OUTPUT_ROOT, 'archive', entry.key), entry.key, entry.items)
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    pageSize: PAGE_SIZE,
    latestUpdatedText,
    all: buildBucket('all', ALL_LABEL, posts),
    archives: archiveEntries.map((entry) => buildBucket(entry.key, entry.label, entry.items)),
    blogDirectory: buildBlogDirectory(posts),
  }

  writeJson(resolve(OUTPUT_ROOT, 'manifest.json'), manifest)

  console.log(
    JSON.stringify({
      output: normalizeFsPath(relative(REPO_ROOT, OUTPUT_ROOT)),
      postCount: posts.length,
      archiveCount: archiveEntries.length,
      pageSize: PAGE_SIZE,
      totalPages: manifest.all.totalPages,
    })
  )
}

generateBlogIndex()
