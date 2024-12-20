/* .vitepress/theme/index.ts */
import DefaultTheme from "vitepress/theme";
import "./tailwind.css";
import Mycomponent from "./components/Mycomponent.vue"

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { 
    // 注册全局组件
    app.component('MyComponent' , Mycomponent)
  }
}