import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './tailwind.css'
import Mycomponent from './components/Mycomponent.vue'
import TwikooComments from './components/TwikooComments.vue'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-after': () => h(TwikooComments),
    }),
  enhanceApp({ app }) {
    app.component('MyComponent', Mycomponent)
  },
}
