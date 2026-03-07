import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

export default defineConfig({
  title: '小八',
  description: '小八博客',
  srcDir: './blogs',
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

    nav: [
      { text: '首页', link: '/home' },
      { text: '博客', link: '/blog/index' },
      { text: '笔记', link: '/note/index' },
      {
        text: '分享',
        items: [
          { text: '分享推荐', link: '/share' },
          { text: '网站导航', link: '/share/map' },
          { text: '博客建站', link: '/share/blogbuild/choose' },
          { text: '效率工具推荐', link: '/share/tools' },
          { text: '山大', link: '/share/sdu' },
        ],
      },
      { text: '项目', link: '/projects' },
    ],

    sidebar: generateSidebar([
      {
        documentRootPath: '/docs/blogs/note',
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
      copyright: 'Copyright © 2023-2024 xiaoba.my',
    },

    editLink: {
      pattern: 'https://github.com/ikunycj/xiaoba.my/tree/master/docs/src/:path',
      text: '👋 Welcome to edit this page!',
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
  },

  vite: {},
})
