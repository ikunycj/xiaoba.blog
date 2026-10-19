# useRef

> 分类：引用 / DOM  
> 官方签名：`const ref = useRef(initialValue)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useRef

## 输入
- `initialValue`：第一次创建 ref 时的初始值。

## 输出
- `ref`：一个带有 `current` 属性的对象。

## 作用
保存一个在多次渲染之间持续存在、但变化时不会触发重新渲染的值。

## 通俗解释
它像一个“可长期保存的小盒子”。盒子里的 `current` 想改就改，但 React 不会因为你改盒子内容就重画页面。

## 常见场景
- 拿 DOM 节点
- 保存定时器 ID
- 保存上一次值
- 防抖节流句柄

## 注意点
- 改 `ref.current` 不会触发重新渲染。
- 需要界面更新时，还是应该用 state。