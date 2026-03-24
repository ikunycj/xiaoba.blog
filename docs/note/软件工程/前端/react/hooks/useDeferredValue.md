# useDeferredValue

> 分类：性能 / 并发  
> 官方签名：`const deferredValue = useDeferredValue(value, initialValue?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useDeferredValue

## 输入
- `value`：想延迟消费的值，可以是任意类型。
- `initialValue?`：首屏时先用的旧值；可选。

## 输出
- `deferredValue`：这个值的“延迟版本”。紧急更新先走，慢一点的内容稍后再跟上。

## 作用
让不那么重要的 UI 更新晚一点发生，从而保证交互更顺滑。

## 通俗解释
可以把它理解成“先让输入框动起来，重列表稍后再追上”。用户先感觉不卡，再等重内容慢慢刷新。

## 常见场景
- 搜索框实时输入
- 大列表过滤
- 图表或重内容延迟刷新

## 注意点
- 更适合传原始值或稳定对象。
- 如果更新本身已经在 Transition 里，它通常不会再额外延迟。