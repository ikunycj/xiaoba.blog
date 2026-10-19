# React Hooks 官方概括

> 整理日期：2026-03-24  
> 文档版本：React 中文文档 `react@19.2`  
> 说明：以下内容基于 React 官网 Hook 总览与各 Hook 详情页整理，并按日常使用场景重组，不完全等同官网原始分组。

## 一句话总结

React 19.2 中文文档中，React 核心部分列出了 18 个内置 Hook。日常开发最常用的是 `useState`、`useEffect`、`useContext`、`useRef`；复杂状态会用 `useReducer`；性能与并发相关主要看 `useMemo`、`useCallback`、`useDeferredValue`、`useTransition`；表单和乐观更新则重点关注 `useActionState`、`useOptimistic`，以及 `react-dom` 里的 `useFormStatus`。

## 先记住 3 条规则

1. Hook 只能在组件顶层或自定义 Hook 顶层调用，不能放在条件、循环、普通嵌套函数里。
2. 优先用 `props`、`state`、`context` 表达数据流；只有在需要和外部系统同步时再用 Effect。
3. `useMemo` 和 `useCallback` 是性能优化工具，不是业务语义工具，不要默认滥用。

## Hook 速查表

| 分类          | Hook                   | 核心作用                            | 常见用法                                        | 使用提醒                                                   |
| ----------- | ---------------------- | ------------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| 状态          | `useState`             | 声明简单本地状态                        | 输入框、开关、计数器、弹窗状态                             | 基于旧值更新时用函数式写法                                          |
| 状态          | `useReducer`           | 用 reducer 管理复杂状态流转              | 多 action、状态字段多、更新逻辑集中管理                     | 适合“状态机式”更新，不适合所有场景都硬上                                  |
| 表单 / Action | `useActionState`       | 根据表单 action 的返回结果更新状态           | 表单提交结果、服务端 action 返回信息、提交中状态                | 返回 `[state, formAction, isPending]`，适合和表单 action 配合    |
| 乐观更新        | `useOptimistic`        | 在异步操作完成前先更新 UI                  | 点赞、评论发送、列表追加、删除回滚                           | 乐观更新应放在 `Action` 或 `Transition` 里                      |
| 上下文         | `useContext`           | 读取并订阅最近的 context 值              | 主题、语言、登录态、全局配置                              | 读取的是最近的 Provider；跨层传值优先考虑它                             |
| Ref         | `useRef`               | 保存不参与渲染的可变值，或引用 DOM             | 聚焦输入框、保存计时器 ID、保存上一次值                       | 改 `ref.current` 不会触发重新渲染                               |
| Ref         | `useImperativeHandle`  | 自定义组件通过 ref 暴露给父组件的内容           | 暴露 `focus()`、`scrollToTop()` 等命令式方法         | 很少用，只在封装组件时需要                                          |
| 标识          | `useId`                | 生成稳定唯一 ID                       | `label` 和 `input` 的 `id/for`、无障碍关联          | 不要拿它生成列表 `key`，也不要当缓存键                                 |
| 副作用         | `useEffect`            | 让组件与外部系统同步                      | 请求订阅、事件监听、定时器、第三方库接入                        | 不需要同步外部系统时，通常不必写 Effect                                |
| 副作用         | `useEffectEvent`       | 把 Effect 中的非响应式逻辑抽出来            | 在 Effect 中读取最新 props/state，又不想让 Effect 因此重跑 | 适合拆分“订阅逻辑”和“读取最新值逻辑”                                   |
| 副作用         | `useLayoutEffect`      | 在浏览器绘制前执行副作用                    | 测量 DOM 尺寸、定位 tooltip、同步布局                   | 比 `useEffect` 更阻塞，能不用就不用                               |
| 副作用         | `useInsertionEffect`   | 在布局副作用前插入样式                     | CSS-in-JS 库注入样式                             | 主要给库作者用，业务代码几乎不用                                       |
| 外部数据源       | `useSyncExternalStore` | 订阅外部 store，并保证快照读取一致            | Redux 风格外部 store、浏览器 API 订阅、SSR 同步          | 适合“React 外部”的状态源，不是 `useState` 替代品                     |
| 性能          | `useMemo`              | 缓存计算结果                          | 昂贵计算、稳定对象依赖、避免重复推导                          | 先保证逻辑正确，再做记忆化                                          |
| 性能          | `useCallback`          | 缓存函数定义                          | 给 `memo` 子组件传回调、稳定 Effect 依赖                | React Compiler 会减少手动使用需求                               |
| 并发 / 性能     | `useDeferredValue`     | 延迟更新非关键 UI 部分                   | 搜索输入实时响应，结果列表稍后刷新                           | 适合“输入先丝滑，重内容后更新”                                       |
| 并发 / 性能     | `useTransition`        | 把更新标记为非阻塞过渡                     | 切 tab、大列表切换、路由切换、后台渲染                       | 返回 `[isPending, startTransition]`，输入框更新不能放进 transition |
| 调试          | `useDebugValue`        | 给自定义 Hook 在 React DevTools 中加标签 | 调试自定义 Hook                                  | 主要给库或通用 Hook 作者用                                       |

## 常见选择方式

- 只是给组件加一个简单状态：`useState`
- 状态变化规则复杂，且有多个 action：`useReducer`
- 需要跨多层组件传值：`useContext`
- 需要 DOM 节点或保存不会触发渲染的值：`useRef`
- 要和事件监听、定时器、网络连接、第三方库同步：`useEffect`
- 要在绘制前测量布局：`useLayoutEffect`
- 表单提交后要读取 action 返回值：`useActionState`
- 异步提交时先把 UI 改出来：`useOptimistic`
- 输入必须立即更新，但重列表或图表可以慢一点：`useDeferredValue` 或 `useTransition`
- 性能瓶颈来自重复计算：`useMemo`
- 性能瓶颈来自回调引用频繁变化：`useCallback`

## 几个容易混淆的点

- `useState` vs `useReducer`
  - 前者适合简单状态。
  - 后者适合复杂更新逻辑、多个分支 action、需要统一管理状态流转。

- `useEffect` vs `useLayoutEffect`
  - `useEffect` 在大多数副作用场景都够用。
  - `useLayoutEffect` 用于“必须在浏览器绘制前完成”的布局测量或同步。

- `useMemo` vs `useCallback`
  - `useMemo` 缓存“计算结果”。
  - `useCallback` 缓存“函数本身”。

- `useDeferredValue` vs `useTransition`
  - `useDeferredValue` 是“延迟某个值的消费”。
  - `useTransition` 是“把某批状态更新标记为非阻塞”。

- `useActionState` vs `useFormStatus`
  - `useActionState` 关心的是“action 返回的状态”。
  - `useFormStatus` 关心的是“表单当前是否在提交、提交了什么数据”。

## 官方文档里的相关补充

### `react-dom` Hook

| API             | 作用                     | 典型场景                                  | 备注                       |
| --------------- | ---------------------- | ------------------------------------- | ------------------------ |
| `useFormStatus` | 读取父级 `<form>` 最近一次提交状态 | 提交按钮禁用、显示 `pending`、读取提交中的 `FormData` | 必须在 `<form>` 内部渲染的子组件里调用 |

### 相关 API

| API   | 作用                              | 典型场景                     | 备注                                                                    |
| ----- | ------------------------------- | ------------------------ | --------------------------------------------------------------------- |
| `use` | 读取 `Promise` 或 `context` 这类资源的值 | Suspense 数据读取、读取 context | 它是 React API，不在官网 Hook 分组里；和普通 Hook 不同，它可以出现在条件和循环里，但调用它的仍必须是组件或 Hook |

### 自定义 Hook

自定义 Hook 本质上就是“内部复用了一个或多个 Hook 的普通 JavaScript 函数”。它的价值不在于发明新能力，而在于把可复用的状态逻辑、订阅逻辑、表单逻辑、异步逻辑抽出来复用。

## Hooks


## 参考

- React 内置 Hook：https://zh-hans.react.dev/reference/react/hooks
- useActionState：https://zh-hans.react.dev/reference/react/useActionState
- useCallback：https://zh-hans.react.dev/reference/react/useCallback
- useContext：https://zh-hans.react.dev/reference/react/useContext
- useDebugValue：https://zh-hans.react.dev/reference/react/useDebugValue
- useDeferredValue：https://zh-hans.react.dev/reference/react/useDeferredValue
- useEffect：https://zh-hans.react.dev/reference/react/useEffect
- useEffectEvent：https://zh-hans.react.dev/reference/react/useEffectEvent
- useId：https://zh-hans.react.dev/reference/react/useId
- useImperativeHandle：https://zh-hans.react.dev/reference/react/useImperativeHandle
- useInsertionEffect：https://zh-hans.react.dev/reference/react/useInsertionEffect
- useLayoutEffect：https://zh-hans.react.dev/reference/react/useLayoutEffect
- useMemo：https://zh-hans.react.dev/reference/react/useMemo
- useOptimistic：https://zh-hans.react.dev/reference/react/useOptimistic
- useReducer：https://zh-hans.react.dev/reference/react/useReducer
- useRef：https://zh-hans.react.dev/reference/react/useRef
- useState：https://zh-hans.react.dev/reference/react/useState
- useSyncExternalStore：https://zh-hans.react.dev/reference/react/useSyncExternalStore
- useTransition：https://zh-hans.react.dev/reference/react/useTransition
- useFormStatus：https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus
- use：https://zh-hans.react.dev/reference/react/use