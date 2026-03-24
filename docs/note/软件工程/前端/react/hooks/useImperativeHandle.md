# useImperativeHandle

> 分类：引用 / DOM  
> 官方签名：`useImperativeHandle(ref, createHandle, dependencies?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useImperativeHandle

## 输入
- `ref`：父组件传进来的 ref。
- `createHandle`：返回要暴露给父组件的对象。
- `dependencies?`：依赖数组，决定何时重新创建这个对象。

## 输出
- 无显式返回值。

## 作用
定制父组件通过 ref 能拿到什么，而不是把整个内部细节都暴露出去。

## 通俗解释
默认 ref 像是把整个抽屉递给父组件，`useImperativeHandle` 则像只递给它一把定制好的工具：例如 `focus()` 或 `open()`。

## 常见场景
- 封装输入框并暴露 `focus()`
- 封装弹窗并暴露 `open()`
- 限制父组件可调用的命令

## 注意点
- 这是偏命令式的能力，优先考虑 props 方案。
- 通常只在封装组件时有价值。