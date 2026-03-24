# useState

> 分类：状态 / 表单  
> 官方签名：`const [state, setState] = useState(initialState)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useState

## 输入
- `initialState`：初始状态。可以是普通值，也可以是返回初始值的函数。

## 输出
- `state`：当前状态值。
- `setState`：更新状态的函数，支持直接传值或传更新函数。

## 作用
让组件拥有自己的本地状态，并在状态变化后重新渲染界面。

## 通俗解释
把它想成组件自己的“小抽屉”。抽屉里放当前数据，调用 `setState` 就是把抽屉里的内容换掉，React 会按新内容重新画页面。

## 常见场景
- 表单输入
- 计数器
- 弹窗开关

## 注意点
- 如果新状态依赖旧状态，优先写成 `setState(prev => ...)`。
- 状态更新是异步调度的，不要假设调用后立刻读到新值。