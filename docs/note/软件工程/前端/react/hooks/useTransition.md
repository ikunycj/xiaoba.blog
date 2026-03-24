# useTransition

> 分类：性能 / 并发  
> 官方签名：`const [isPending, startTransition] = useTransition()`  
> 官方文档：https://zh-hans.react.dev/reference/react/useTransition

## 输入
- 无。

## 输出
- `isPending`：当前是否有过渡中的更新。
- `startTransition`：把一批更新标记为非阻塞的函数。

## 作用
把不那么紧急的更新降级为后台更新，让重要交互先响应。

## 通俗解释
它像是给更新排优先级：用户打字这种急事先办，重列表刷新这种慢事排到后面。

## 常见场景
- 切换 tab
- 切换筛选结果
- 路由切换
- 大型列表更新

## 注意点
- 受控输入的即时值更新不要放进 transition。
- 适合“可以稍后显示，但不要卡住用户操作”的更新。