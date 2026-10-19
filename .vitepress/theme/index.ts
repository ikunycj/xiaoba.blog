import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './tailwind.css'
import './pages.css'

// 页面级 layout：frontmatter 里写 `layout: <Name>` 即可，
// 组件实现全部留在 .vitepress/ 内，保证 content/ 里只有纯 markdown。
import XiaobaHome from '../views/index.vue'
import XiaobaProjects from '../views/Project.vue'
import XiaobaBlogIndex from '../views/Blog/index.vue'
import XiaobaShare from '../views/Share/index.vue'

import Mycomponent from './components/Mycomponent.vue'
import GiscusComments from './components/GiscusComments.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import BackToTop from './components/BackToTop.vue'
import NotFound from './components/NotFound.vue'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'layout-top': () => h(ReadingProgress),
      'not-found': () => h(NotFound),
      'doc-after': () => h(GiscusComments),
      'layout-bottom': () => h(BackToTop),
    }),
  enhanceApp({ app }) {
    app.component('MyComponent', Mycomponent)
    // 具名 layout（由 frontmatter.layout 解析）
    app.component('XiaobaHome', XiaobaHome)
    app.component('XiaobaProjects', XiaobaProjects)
    app.component('XiaobaBlogIndex', XiaobaBlogIndex)
    app.component('XiaobaShare', XiaobaShare)
  },
} satisfies Theme
