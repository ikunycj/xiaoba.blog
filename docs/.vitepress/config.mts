import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小八",
  // titleTemplate: ":title 小八",  // 标题模板
  description: "小八博客",
  // md 文件根目录
  srcDir: "./src",
  // 增加一个head标签
  head: [
    ['link', { rel: 'icon', href: '/xiaoba-logo.png' }] //网站icon
  ], 

  base: '/', // 部署到github pages需要设置base为'/'
  cleanUrls:true, //开启纯净链接



  /**
   * 主题配置
   */
  themeConfig: {
    logo: '/xiaoba-logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/home' },
      { text: '博客', link: '/blog/index' },
      { text: '笔记', link: '/note/index' },
      { text: '分享',
        items: [
          {text: '导航', link: '/share/index/'},
          {text: '测试用例', link: '/share/test/'}
      ]},
      { text: '项目', link: '/projects' }
    ],

    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      '/note/': [
        {
          text: 'note',
          items: [
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
          ]
        }
      ],
      
      // 当用户位于 `config` 目录时，会显示此侧边栏
      '/share/': [
        {
          text: 'share',
          items: [
            { text: 'Index', link: '/index/' },
            { text: 'debate', link: 'share/debate' },
            { text: 'Four', link: '/config/four' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ikunycj/xiaoba.my' }
    ]
  },

  /**
   * markdown配置
   */
  markdown: {
    // https://vitepress.dev/zh/reference/site-config#markdown
    //math: true,
  },

  /**
   * vite配置
   */
  vite: {
    // https://vitepress.dev/zh/reference/site-config#vite

/*     resolve: {
      alias: [
        {
          find: /^.*\/VPDocFooterLastUpdated\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/UpdateTime.vue", import.meta.url)
          ),
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(new URL("./components/Footer.vue", import.meta.url)),
        },
      ],
    }, */
  }
})
