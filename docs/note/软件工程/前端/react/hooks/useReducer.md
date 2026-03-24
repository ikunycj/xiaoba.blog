# useReducer

> 分类：状态 / 表单  
> 官方签名：`const [state, dispatch] = useReducer(reducer, initialArg, init?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useReducer

## 输入
- `reducer`：根据当前 state 和 action 计算下一个 state 的纯函数。
- `initialArg`：初始化参数。
- `init?`：可选初始化函数，用来从 `initialArg` 计算初始 state。

## 输出
- `state`：当前状态。
- `dispatch`：触发状态更新的函数，参数通常是 action 对象。

## 作用
把复杂状态更新逻辑集中管理，让状态变化更可预测。

## 通俗解释
它像一个“状态处理中心”。你只负责发 action，真正怎么改状态，统一交给 reducer 处理。

## 常见场景
- 表单状态复杂
- 多个操作都要改同一份状态
- 希望更新逻辑集中管理

## 注意点
- reducer 必须是纯函数。
- 适合复杂状态，不必把简单状态也强行改成 reducer。