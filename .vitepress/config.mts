import { generateSidebar } from 'vitepress-sidebar'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'

import { defineConfigWithTheme, type DefaultTheme, type HeadConfig } from 'vitepress'

interface GiscusThemeConfig {
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number'
  term?: string
  strict?: '0' | '1'
  reactionsEnabled?: '0' | '1'
  emitMetadata?: '0' | '1'
  inputPosition?: 'top' | 'bottom'
  lang?: string
  theme?: string
  lightTheme?: string
  darkTheme?: string
  loading?: 'lazy' | 'eager'
}

type ThemeConfig = DefaultTheme.Config & {
  giscus?: GiscusThemeConfig
}

const SITE_NAME = '小八博客'
const SITE_URL = 'https://xiaoba.blog'
const SITE_DESCRIPTION = '小八的技术博客，分享 AI 应用开发、全栈开发和计算机基础，提供学习路线、实战教程与开源项目记录。'
const SHARE_IMAGE = new URL('/xiaoba/xiaoba-coding.jpg', SITE_URL).href

const KNOWN_FENCE_LANGUAGES = new Set([
  'apache',
  'bash',
  'c++',
  'cmd',
  'cpp',
  'csharp',
  'css',
  'dart',
  'go',
  'html',
  'http',
  'java',
  'javascript',
  'js',
  'json',
  'jsx',
  'markdown',
  'mermaid',
  'nginx',
  'php',
  'plaintext',
  'powershell',
  'properties',
  'python',
  'regex',
  'sql',
  'text',
  'ts',
  'tsx',
  'txt',
  'typescript',
  'vue',
  'xml',
  'yaml',
  'yml',
])

const FENCE_LANGUAGE_ALIASES = new Map([
  ['htnl', 'html'],
  ['ja', 'java'],
  ['jav', 'java'],
  ['ks', 'js'],
  ['mysql', 'sql'],
  ['plain', 'plaintext'],
  ['pythobn', 'python'],
  ['shell', 'bash'],
  ['shellscript', 'bash'],
])

const SHELL_COMMAND_STARTERS = new Set([
  'bun',
  'conda',
  'curl',
  'deno',
  'docker',
  'git',
  'kubectl',
  'mvn',
  'node',
  'npm',
  'npx',
  'pip',
  'pip3',
  'pnpm',
  'python',
  'python3',
  'yarn',
])

function normalizeFenceLanguageToken(token: string): string {
  const lowered = token.trim().toLowerCase()
  if (!lowered) return ''

  const direct = FENCE_LANGUAGE_ALIASES.get(lowered) || (KNOWN_FENCE_LANGUAGES.has(lowered) ? lowered : '')
  if (direct) return direct

  const leading = lowered.match(/^[a-z0-9+#-]+/u)?.[0] || ''
  if (!leading || leading === lowered) return ''

  return FENCE_LANGUAGE_ALIASES.get(leading) || (KNOWN_FENCE_LANGUAGES.has(leading) ? leading : '')
}

function normalizeFenceInfo(info: string, content: string): { info: string; content: string } {
  const trimmedInfo = info.trim()
  if (!trimmedInfo) {
    return { info, content }
  }

  const [firstToken, ...restTokens] = trimmedInfo.split(/\s+/)
  const rest = restTokens.join(' ')
  const loweredFirstToken = firstToken.toLowerCase()
  const normalizedLanguage = normalizeFenceLanguageToken(firstToken)

  if (firstToken === '$' || (!normalizedLanguage && rest && SHELL_COMMAND_STARTERS.has(loweredFirstToken))) {
    const normalizedContent = content.startsWith(trimmedInfo) ? content : `${trimmedInfo}\n${content}`
    return {
      info: 'bash',
      content: normalizedContent,
    }
  }

  if (normalizedLanguage) {
    if (!rest || normalizedLanguage !== loweredFirstToken) {
      return {
        info: normalizedLanguage,
        content,
      }
    }
  }

  if (/^[-=]+$/.test(firstToken) || /^[^\p{L}\p{N}]+$/u.test(firstToken)) {
    return {
      info: 'txt',
      content,
    }
  }

  return { info, content }
}

function sanitizeNoteMarkdown(content: string): string {
  const withoutMarkdownImages = content
    // 移除 obsidian 风格的图片
    .replace(/!\[\[([^[\]]+)\]\]/g, '')
    // 移除链接中指向本地图片的内容
    .replace(
      /\[([^\]]*)]\(([^)]+\.(?:png|jpe?g|gif|bmp|webp|svg)(?:[?#][^)]+)?)\)/gi,
      (match, text, url) => {
        // 保留 http/https 外链
        if (/^https?:\/\//i.test(url)) return match
        return '[$1](about:blank)'
      }
    )
    // 移除 img 标签
    .replace(/<img\b[^>]*>/gi, '')

  const escapedAngleBrackets = withoutMarkdownImages.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const escapedProcessingInstruction = escapedAngleBrackets
    .replace(/<\?/g, '&lt;?')
    .replace(/\?>/g, '?&gt;')

  const escapedInvalidTagLikeContent = escapedProcessingInstruction.replace(
    /<([^>\n]+)>/g,
    (match, innerRaw) => {
      const inner = innerRaw.trim()
      if (!inner) return '&lt;&gt;'
      if (inner.startsWith('!--') && inner.endsWith('--')) return match
      if (inner.startsWith('!DOCTYPE')) return match

      const normalized = inner.startsWith('/') ? inner.slice(1).trim() : inner
      const tagName = normalized.split(/\s+/)[0] || ''
      if (!/^[A-Za-z][\w:-]*$/.test(tagName)) return `&lt;${innerRaw}&gt;`

      return match
    }
  )

  const escapedAttrs = escapedInvalidTagLikeContent.replace(
    /\{([^{}\n]+)\}/g,
    (_match, inner) => `&#123;${inner}&#125;`
  )

  return escapedAttrs.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;')
}

function rewritePublicRoute(route: string): string {
  const publicRoute = route.startsWith('blogs/') ? route.slice('blogs/'.length) : route
  return publicRoute.replace(/c\+\+/gi, 'cpp').replace(/\+/g, '-plus-')
}

function publicPagePath(page: string): string {
  return page.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
}

function canonicalUrl(path: string): string {
  // Match the clean URLs served by Vercel with trailingSlash disabled.
  return new URL(path.replace(/\/$/, ''), SITE_URL).href
}

function rewriteSidebarItems(items: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem[] {
  return items.map((item) => ({
    ...item,
    link: item.link ? rewritePublicRoute(item.link) : undefined,
    items: item.items ? rewriteSidebarItems(item.items) : undefined,
  }))
}

function rewriteSidebarLinks(sidebar: DefaultTheme.Sidebar): DefaultTheme.Sidebar {
  if (Array.isArray(sidebar)) return rewriteSidebarItems(sidebar)

  return Object.fromEntries(
    Object.entries(sidebar).map(([route, config]) => [
      route,
      Array.isArray(config)
        ? rewriteSidebarItems(config)
        : { ...config, items: rewriteSidebarItems(config.items) },
    ])
  )
}

function createLegacyPlusAliases(
  outputDirectory: string,
  pages: string[],
  rewrites: Record<string, string | undefined>
): void {
  for (const sourcePage of pages) {
    if (!sourcePage.includes('+')) continue

    const publicPage = rewrites[sourcePage]
    if (!publicPage) continue

    const canonicalPath = join(outputDirectory, publicPage.replace(/\.md$/, '.html'))
    if (!existsSync(canonicalPath)) {
      throw new Error(`Missing canonical page for legacy route: ${publicPage}`)
    }

    const target = canonicalUrl(publicPagePath(publicPage))
    const escapedCanonicalUrl = target
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;')
    const redirectHtml = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex">
    <link rel="canonical" href="${escapedCanonicalUrl}">
    <script>location.replace(${JSON.stringify(new URL(target).pathname)} + location.search + location.hash)</script>
    <title>正在跳转 | ${SITE_NAME}</title>
  </head>
  <body>
    <a href="${escapedCanonicalUrl}">前往新地址</a>
  </body>
</html>
`

    for (const legacyPage of [sourcePage, sourcePage.replace(/\+/g, '%2B')]) {
      const aliasPath = join(outputDirectory, legacyPage.replace(/\.md$/, '.html'))
      mkdirSync(dirname(aliasPath), { recursive: true })
      writeFileSync(aliasPath, redirectHtml)
    }
  }
}

export default defineConfigWithTheme<ThemeConfig>({
  lang: 'zh-CN',
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  srcDir: 'content',
  srcExclude: [
    '.obsidian/**',
    'local/**',
    'self/**',
  ],
  rewrites: rewritePublicRoute,
  head: [
    ['link', { rel: 'icon', href: '/xiaoba-logo.png' }],
    ['meta', { name: 'theme-color', content: '#2b78a6' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image', content: SHARE_IMAGE }],
    ['meta', { property: 'og:image:alt', content: '小八坐在电脑前写代码' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: SHARE_IMAGE }],
    ['meta', { name: 'twitter:image:alt', content: '小八坐在电脑前写代码' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
  ],

  base: '/',
  cleanUrls: true,
  ignoreDeadLinks: 'localhostLinks',
  lastUpdated: true,

  sitemap: {
    hostname: SITE_URL,
    transformItems: (items) => items
      .filter(({ url }) => url !== 'home' && url !== '404')
      .map((item) => ({ ...item, url: canonicalUrl(item.url) })),
  },

  transformPageData(pageData) {
    const { relativePath, filePath, frontmatter } = pageData
    if (relativePath === '404.md') return

    const path = publicPagePath(relativePath)
    const url = canonicalUrl(path === 'home' ? '' : path)
    const fileName = basename(filePath, '.md')
    const title = pageData.title || (fileName === 'index' ? basename(dirname(filePath)) : fileName)
    const description = pageData.description || SITE_DESCRIPTION
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:type', content: path.startsWith('blog/') && path !== 'blog/' ? 'article' : 'website' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ...(frontmatter.head || []),
    ]
    if (path === '') {
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url,
      })])
    }
    return { title, frontmatter: { ...frontmatter, head } }
  },

  transformHead({ page, description }) {
    if (page === '404.md') return [['meta', { name: 'robots', content: 'noindex' }]]
    // Let VitePress escape the attribute value when rendering the HTML.
    return [['meta', { name: 'description', content: description }]]
  },

  buildEnd(siteConfig) {
    createLegacyPlusAliases(siteConfig.outDir, siteConfig.pages, siteConfig.rewrites.map)
  },

  themeConfig: {
    logo: '/xiaoba-logo.png',
    outline: {
      level: 'deep',
      label: '目录',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
          buttonText: '搜索',
          buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    giscus: {
      repo: 'ikunycj/xiaoba.blog',
      // Fill these IDs from https://giscus.app/ after enabling GitHub Discussions.
      repoId: 'R_kgDONgF0HQ',
      category: 'General',
      categoryId: 'DIC_kwDONgF0Hc4C4YOS',
      mapping: 'pathname',
      term: '',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      lightTheme: 'light',
      darkTheme: 'dark_dimmed',
      loading: 'lazy',
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '博客',
        link: '/blog/',
        activeMatch: '^/blog(?:/|$)',
      },
      {
        text: '知识库',
        activeMatch: '^/(?:note|ai|fullstack)(?:/|$)',
        items: [
          { text: '知识库总览', link: '/note/' },
          { text: 'AI 应用开发', link: '/ai/' },
          { text: '全栈开发', link: '/fullstack/' },
        ],
      },
      { text: '项目', link: '/projects', activeMatch: '^/projects(?:/|$)' },
      {
        text: '其他',
        items: [
          { text: 'GitHub', link: 'https://github.com/ikunycj/xiaoba.blog' },
          { text: `关于${SITE_NAME}`, link: '/about' },
        ]
      },
    ],
    sidebar: rewriteSidebarLinks(generateSidebar([
      {
        documentRootPath: '/content/note/AI',
        scanStartPath: '/',
        resolvePath: '/note/AI/',
        useTitleFromFileHeading: true,
        excludePattern: ['do-not-include.md', 'index.md'],
        collapsed: true,
        sortMenusByFrontmatterOrder: true,
        sortMenusOrderByDescending: false,
        capitalizeFirst: true,
      },
      {
        documentRootPath: '/content/note',
        scanStartPath: '/',
        resolvePath: '/note/',
        useTitleFromFileHeading: true,
        excludePattern: ['do-not-include.md', 'index.md', 'AI/**'],
        collapsed: true,
        sortMenusByFrontmatterOrder: true,
        sortMenusOrderByDescending: false,
        capitalizeFirst: true,
      },
      {
        documentRootPath: '/content/blogs/share/blogbuild',
        scanStartPath: '/',
        resolvePath: '/share/blogbuild/',
        useTitleFromFileHeading: true,
        collapsed: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/content/blogs/share/sdu',
        scanStartPath: '/',
        resolvePath: '/share/sdu/',
        useTitleFromFileHeading: true,
        collapsed: true,
        sortMenusByFrontmatterOrder: true,
      },
    ])),

    footer: {
      message: 'xiaoba.blog',
      copyright: `Copyright © 2023-2026 ${SITE_NAME}`,
    },

    editLink: {
      pattern: 'https://github.com/ikunycj/xiaoba.blog/tree/master/content/:path',
      text: '欢迎一起完善文档',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },

  markdown: {
    math: true,
    config(md) {
      md.set({ linkify: false })

      md.core.ruler.push('seo-description', ({ env, tokens }) => {
        if (!env.relativePath || env.frontmatter.description || env.frontmatter.head?.some(
          ([tag, attrs]: HeadConfig) => tag === 'meta' && attrs.name === 'description',
        )) return

        for (let index = 0; index < tokens.length; index++) {
          const paragraph = tokens[index]
          if (paragraph.type !== 'paragraph_open' || paragraph.level !== 0) continue

          const summary = tokens[index + 1].children?.map(({ type, content }) => {
            if (type === 'text' || type === 'code_inline') return content
            if (type === 'softbreak' || type === 'hardbreak') return ' '
            return ''
          }).join('').replace(/\s+/g, ' ').trim()
          if (!summary || summary.length < 20 || /^https?:\/\/\S+$/.test(summary)) continue

          env.frontmatter.description = summary.length > 150 ? `${summary.slice(0, 149)}…` : summary
          break
        }
      })

      const defaultFenceRenderer = md.renderer.rules.fence
      if (!defaultFenceRenderer) return

      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const originalInfo = token.info
        const originalContent = token.content
        const normalized = normalizeFenceInfo(originalInfo, originalContent)

        token.info = normalized.info
        token.content = normalized.content

        try {
          return defaultFenceRenderer(tokens, idx, options, env, self)
        } finally {
          token.info = originalInfo
          token.content = originalContent
        }
      }
    },
  },

  vite: {
    publicDir: 'blogs/public',
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            'vitepress-vendor': ['vitepress'],
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ['vitepress'],
    },
    ssr: {
      noExternal: ['@iconify/vue'],
    },
    plugins: [
      {
        name: 'sanitize-note-md',
        enforce: 'pre',
        transform(code, id) {
          const normalizedId = id.split('?')[0].replace(/\\/g, '/')
          if (!normalizedId.endsWith('.md')) return null
          if (!normalizedId.includes('/content/note/')) return null
          if (normalizedId.endsWith('/content/note/index.md')) return null
          return sanitizeNoteMarkdown(code)
        },
      },
    ],
  },
})
