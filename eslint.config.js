import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"], // 匹配 JavaScript 和 Vue 文件
    plugins: {
      js,
      vue: pluginVue, 
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      indent: ["error", 2], 
      "no-tabs": "error", 
      "space-before-blocks": ["error", "always"], 
    },
    extends: ["js/recommended", "plugin:vue/essential"], 
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/html-indent": ["error", 2], // Vue 模板中的 HTML 缩进强制为 2 空格
      "vue/script-indent": ["error", 2, { baseIndent: 1 }], // Vue `<script>` 标签中的缩进强制为 2 空格
    },
  },
]);
