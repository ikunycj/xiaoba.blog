# useContext

> 分类：上下文  
> 官方签名：`const value = useContext(SomeContext)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useContext

## 输入
- `SomeContext`：由 `createContext` 创建的 context 对象。

## 输出
- `value`：最近一层 Provider 提供的值；如果没有 Provider，就拿默认值。

## 作用
让组件直接读取跨层级共享的数据，不需要一级一级手动传 props。

## 通俗解释
可以把它想成“组件树里的公共广播频道”。谁订阅这个频道，谁就能收到最近的广播内容。

## 常见场景
- 主题切换
- 语言切换
- 登录用户信息
- 全局配置

## 注意点
- 它读取的是最近的 Provider。
- Provider 的值变化后，使用这个 context 的组件会重新渲染。