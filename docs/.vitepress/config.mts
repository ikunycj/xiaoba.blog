import { generateSidebar } from 'vitepress-sidebar'

import { defineConfigWithTheme, type DefaultTheme } from 'vitepress'

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
    .replace(/!\[[^\]]*]\(([^)]+)\)/g, '')
    .replace(/!\[\[([^[\]]+)\]\]/g, '')
    .replace(
      /\[([^\]]*)]\(([^)]+\.(?:png|jpe?g|gif|bmp|webp|svg)(?:[?#][^)]+)?)\)/gi,
      '[$1](about:blank)'
    )
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

export default defineConfigWithTheme<ThemeConfig>({
  title: '小八',
  description: '小八博客',
  srcDir: '.',
  srcExclude: ['.obsidian/**', 'local/**', 'self/**'],
  rewrites: {
    'blogs/:path(.*)': ':path',
  },
  head: [['link', { rel: 'icon', href: '/xiaoba-logo.png' }]],

  base: '/',
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/xiaoba-logo.png',
    outline: {
      level: 'deep',
      label: '大纲',
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
      { text: '首页', link: '/home' },
      { text: '博客', link: '/blog/index' },
      { text: '笔记', link: '/note/' },
      { text: 'AI', link: '/note/AI/' },
      {
        text: '分享',
        items: [
          { text: '分享推荐', link: '/share' },
          { text: '博客建站', link: '/share/blogbuild/choose' },
          { text: '效率工具推荐', link: '/share/tools' },
          { text: '山大', link: '/share/sdu' },
        ],
      },
      { text: '项目', link: '/projects' },
    ],
    sidebar: generateSidebar([
      {
        documentRootPath: '/docs/note/AI',
        scanStartPath: '/',
        resolvePath: '/note/AI/',
        useTitleFromFileHeading: false,
        excludePattern: ['do-not-include.md'],
        collapsed: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/note',
        scanStartPath: '/',
        resolvePath: '/note/',
        useTitleFromFileHeading: false,
        excludePattern: ['do-not-include.md'],
        collapsed: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/blogs/share/blogbuild',
        scanStartPath: '/',
        resolvePath: '/share/blogbuild/',
        useTitleFromFileHeading: true,
        collapsed: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/docs/blogs/share/sdu',
        scanStartPath: '/',
        resolvePath: '/share/sdu/',
        useTitleFromFileHeading: true,
        collapsed: true,
        sortMenusByFrontmatterOrder: true,
      },
    ]),

    socialLinks: [{ icon: 'github', link: 'https://github.com/ikunycj' }],

    footer: {
      message: 'xiaoba blog',
      copyright: 'Copyright © 2023-2026 xiaoba.my',
    },

    editLink: {
      pattern: 'https://github.com/ikunycj/xiaoba.blog/tree/master/docs/:path',
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
    plugins: [
      {
        name: 'sanitize-note-md',
        enforce: 'pre',
        transform(code, id) {
          const normalizedId = id.split('?')[0].replace(/\\/g, '/')
          if (!normalizedId.endsWith('.md')) return null
          if (!normalizedId.includes('/docs/note/')) return null
          if (normalizedId.endsWith('/docs/note/index.md')) return null
          return sanitizeNoteMarkdown(code)
        },
      },
    ],
  },
})
