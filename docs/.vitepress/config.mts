import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';  //https://vitepress-sidebar.cdget.com/zhHans/guide/getting-started  vitepress-sidebar插件

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
          { text: '分享推荐', link: '/share' },
          { text: '网站导航', link: '/share/map' },
          { text: '博客建站', link: '/share/blogbuild' },
          { text: '效率工具推荐', link: '/share/tools' },
          { text: '山大踩坑', link: '/share/sdu' },
        ]
       },

      { text: '项目', link: '/projects' }
    ],

    /** 
     * 自动生成侧边栏配置 https://vitepress-sidebar.cdget.com
     */
    sidebar: generateSidebar([
      // VitePress Sidebar's options here..
        {
          documentRootPath: '/docs/src/note', // 文档根目录
          scanStartPath: '/',          // 根目录下的，需要开始扫描的路径
          resolvePath: '/note/',          // 网站的路径前缀(多侧边栏配置必须设置)
          useTitleFromFileHeading: true,  // 从文件标题中获取标题
          excludeFiles: ['do-not-include.md'],  // 排除的文件
          collapsed: true,                // 是否折叠
        },
        {
          documentRootPath: '/docs/src/share/blogbuild', 
          scanStartPath: '/',         
          resolvePath: '/share/blogbuild/',         
          useTitleFromFileHeading: true,  
          collapsed: true, 
        },
    ]),


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
