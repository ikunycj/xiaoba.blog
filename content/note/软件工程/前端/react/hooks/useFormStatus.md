# useFormStatus

> 分类：react-dom Hook  
> 官方签名：`const { pending, data, method, action } = useFormStatus()`  
> 官方文档：https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus

## 输入
- 无。

## 输出
- `pending`：表单是否正在提交。
- `data`：当前提交中的 `FormData`。
- `method`：本次提交使用的方法。
- `action`：本次提交对应的 action。

## 作用
读取最近一次表单提交的状态，适合在表单内部做加载态和交互控制。

## 通俗解释
它像是站在提交按钮旁边看表单进度：现在是不是在提交、带了什么数据、提交到哪里，一眼就能知道。

## 常见场景
- 提交按钮禁用
- 按钮文案显示“提交中...”
- 在子组件里读取表单提交状态

## 注意点
- 必须在 `<form>` 内部渲染的子组件里调用。
- 它来自 `react-dom`，不是 `react` 包。