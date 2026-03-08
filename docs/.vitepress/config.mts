import { generateSidebar } from 'vitepress-sidebar'

import { defineConfigWithTheme, type DefaultTheme } from 'vitepress'

interface TwikooThemeConfig {
  envId?: string
  region?: string
  lang?: string
  siteUrl?: string
}

type ThemeConfig = DefaultTheme.Config & {
  twikoo?: TwikooThemeConfig
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
    twikoo: {
      envId: 'https://twikoo-snowy-ten-37.vercel.app',
      region: '',
      lang: 'zh-CN',
      siteUrl: 'https://xiaoba.blog',
    },
    nav: [
      { text: '首页', link: '/home' },
      { text: '博客', link: '/blog/index' },
      { text: '笔记', link: '/note/' },
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

    socialLinks: [{ icon: 'github', link: 'https://github.com/ikunycj/xiaoba.my' }],

    footer: {
      message: 'xiaoba blog',
      copyright: 'Copyright © 2023-2026 xiaoba.my',
    },

    editLink: {
      pattern: 'https://github.com/ikunycj/xiaoba.my/tree/master/docs/:path',
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
