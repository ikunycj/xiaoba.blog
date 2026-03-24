# useActionState

> 分类：状态 / 表单  
> 官方签名：`const [state, formAction, isPending] = useActionState(action, initialState, permalink?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useActionState

## 输入
- `action`：表单动作函数。React 会把上一次 state 作为第一个参数传给它。
- `initialState`：初始状态，表单还没提交前显示这个值。
- `permalink?`：可选的永久链接，主要用于渐进增强和服务器场景。

## 输出
- `state`：当前表单状态；第一次渲染时是初始值，提交后会变成 action 的返回值。
- `formAction`：新的表单 action，可以传给 `<form action>` 或 `<button formAction>`。
- `isPending`：当前是否有提交中的过渡。

## 作用
根据表单动作的结果维护一份状态，特别适合处理表单提交后的返回信息。

## 通俗解释
把它想成“表单版的 useState”。只是它不是你手动 set，而是等表单提交后，用 action 的返回值来更新。

## 常见场景
- 登录表单提示
- 提交后显示成功或失败信息
- 服务端 action 返回状态

## 注意点
- 传入的 action 和普通表单 action 不同，会多收到一个“上一次 state”参数。
- 很适合和 `useFormStatus` 搭配。