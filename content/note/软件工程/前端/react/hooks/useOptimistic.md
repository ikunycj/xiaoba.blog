# useOptimistic

> 分类：状态 / 表单  
> 官方签名：`const [optimisticState, setOptimistic] = useOptimistic(value, reducer?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useOptimistic

## 输入
- `value`：没有待处理操作时的真实值。
- `reducer?`：可选 reducer，用来定义乐观状态如何从当前值和动作生成。

## 输出
- `optimisticState`：当前显示的乐观状态。
- `setOptimistic`：在 Action 中临时更新乐观状态的函数。

## 作用
在异步操作完成前，先把用户期待看到的结果显示出来。

## 通俗解释
用户点了点赞，不想等接口回来再变红心。`useOptimistic` 就是先把红心亮出来，等真正结果回来再对齐。

## 常见场景
- 点赞
- 发送评论
- 列表新增或删除的即时反馈

## 注意点
- 这个 setter 应该放在 Action 或 Transition 里调用。
- 乐观状态是临时的，最终仍以真实值为准。