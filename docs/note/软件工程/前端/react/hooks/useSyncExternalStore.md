# useSyncExternalStore

> 分类：副作用 / 同步  
> 官方签名：`const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useSyncExternalStore

## 输入
- `subscribe`：订阅外部数据源变化的函数。
- `getSnapshot`：读取当前快照的函数。
- `getServerSnapshot?`：服务端渲染时使用的快照函数；可选。

## 输出
- `snapshot`：当前外部 store 的快照值。

## 作用
把 React 组件安全地连接到 React 外部的状态源。

## 通俗解释
如果状态不归 React 管，而是放在外部 store 里，这个 Hook 就像“官方接线器”，负责把外部变化稳定地接进 React。

## 常见场景
- 读取外部 store
- 接入浏览器 API 状态
- SSR 下订阅外部数据源

## 注意点
- `getSnapshot` 应该返回稳定一致的结果。
- 它适合连接外部状态，不是 `useState` 的替代品。