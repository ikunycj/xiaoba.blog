# useInsertionEffect

> 分类：副作用 / 同步  
> 官方签名：`useInsertionEffect(setup, dependencies?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useInsertionEffect

## 输入
- `setup`：插入样式相关的逻辑，可以返回清理函数。
- `dependencies?`：依赖数组。

## 输出
- 无显式返回值。

## 作用
在布局副作用之前执行，主要用于 CSS-in-JS 等样式注入场景。

## 通俗解释
它像是“抢在浏览器量尺寸之前先把样式塞进去”。这样后面的布局测量拿到的是最终样式，而不是半成品。

## 常见场景
- CSS-in-JS 库注入样式
- 底层样式系统

## 注意点
- 主要给库作者用，业务代码几乎不会需要。
- 它不是普通页面逻辑的常规工具。