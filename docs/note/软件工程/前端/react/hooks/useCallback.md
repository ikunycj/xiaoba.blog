# useCallback

> 分类：性能 / 并发  
> 官方签名：`const cachedFn = useCallback(fn, dependencies)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useCallback

## 输入
- `fn`：你想缓存的函数。
- `dependencies`：函数依赖的响应式值数组。

## 输出
- `cachedFn`：在依赖不变时保持同一个引用的函数。

## 作用
缓存函数本身，避免因为函数引用变化而触发子组件重渲染或 Effect 重跑。

## 通俗解释
把它理解成“帮函数办一张长期通行证”。依赖不变时，React 会尽量继续使用同一个函数引用。

## 常见场景
- 把回调传给 `memo` 子组件
- 稳定 Effect 依赖
- 避免不必要的重新渲染

## 注意点
- 它缓存的是“函数引用”，不是函数执行结果。
- 只有在引用稳定确实重要时再用，不要到处包一层。