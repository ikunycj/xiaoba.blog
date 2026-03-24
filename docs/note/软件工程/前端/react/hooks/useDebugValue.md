# useDebugValue

> 分类：调试  
> 官方签名：`useDebugValue(value, format?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useDebugValue

## 输入
- `value`：你想在 React DevTools 里显示的调试值。
- `format?`：可选的格式化函数，用来把值转换成更易读的文本。

## 输出
- 无显式返回值。

## 作用
给自定义 Hook 添加调试标签，方便在 React DevTools 里查看。

## 通俗解释
它像是给自定义 Hook 贴备注。开发时打开 DevTools，就能更快看懂这个 Hook 当前处于什么状态。

## 常见场景
- 封装通用自定义 Hook
- 给库代码加调试信息

## 注意点
- 主要给自定义 Hook 用，普通业务组件通常用不到。
- 价值主要体现在 React DevTools，而不是页面本身。