import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './tailwind.css'
import Mycomponent from './components/Mycomponent.vue'
import GiscusComments from './components/GiscusComments.vue'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-after': () => h(GiscusComments),
    }),
  enhanceApp({ app }) {
    app.component('MyComponent', Mycomponent)
  },
}
