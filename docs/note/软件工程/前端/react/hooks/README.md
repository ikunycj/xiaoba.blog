# React Hooks 逐个讲解

> 整理日期：2026-03-24  
> 来源：React 中文官网 `react@19.2`  
> 说明：本目录把官方 Hook 拆成“一个 Hook 一个文件”，统一按输入、输出、作用、通俗解释、常见场景、注意点来写。

## 如何使用本目录

- 想快速选 Hook：先看分类。
- 想理解单个 Hook：进入对应文件看“通俗解释”和“注意点”。
- 想对照官方原文：每个文件顶部都保留了官网链接。

## 状态 / 表单

- [useState](./useState.md)：最常用的本地状态 Hook。
- [useReducer](./useReducer.md)：复杂状态更新的集中处理器。
- [useActionState](./useActionState.md)：让表单 action 的返回值直接变成状态。
- [useOptimistic](./useOptimistic.md)：先显示预期结果，再等异步操作完成。

## 上下文

- [useContext](./useContext.md)：跨层读取共享数据。

## 引用 / DOM

- [useRef](./useRef.md)：保存不会触发重渲染的值或 DOM 引用。
- [useImperativeHandle](./useImperativeHandle.md)：定制父组件通过 ref 能拿到的内容。
- [useId](./useId.md)：生成稳定唯一 ID。

## 副作用 / 同步

- [useEffect](./useEffect.md)：和外部系统同步。
- [useEffectEvent](./useEffectEvent.md)：把 Effect 中的非响应式逻辑拆出来。
- [useLayoutEffect](./useLayoutEffect.md)：在绘制前处理布局相关副作用。
- [useInsertionEffect](./useInsertionEffect.md)：在布局前插入样式，主要给库作者。
- [useSyncExternalStore](./useSyncExternalStore.md)：安全订阅 React 外部 store。

## 性能 / 并发

- [useMemo](./useMemo.md)：缓存计算结果。
- [useCallback](./useCallback.md)：缓存函数引用。
- [useDeferredValue](./useDeferredValue.md)：延迟不重要的值更新。
- [useTransition](./useTransition.md)：把一批更新标记为非阻塞。

## 调试

- [useDebugValue](./useDebugValue.md)：给自定义 Hook 加调试标签。

## react-dom Hook

- [useFormStatus](./useFormStatus.md)：读取表单最近一次提交状态。

## 备注

- 本目录聚焦官方 Hook；`use` 是 React API，不作为普通 Hook 单独收录。
- `useFormStatus` 来自 `react-dom`，其余文件来自 `react`。