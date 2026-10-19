# useEffectEvent

> 分类：副作用 / 同步  
> 官方签名：`const onSomething = useEffectEvent(callback)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useEffectEvent

## 输入
- `callback`：你想在 Effect 内调用的逻辑。

## 输出
- `onSomething`：一个 Effect Event 函数，适合在 Effect 内部调用。

## 作用
把 Effect 中“需要读取最新值但不想导致 Effect 重跑”的那部分逻辑抽出来。

## 通俗解释
它像是把 Effect 拆成两层：外层负责订阅，内层负责拿最新数据。这样既能拿到最新值，又不把依赖数组搞得一团乱。

## 常见场景
- 聊天连接成功后显示最新主题
- 订阅回调里读取最新 props
- 把非响应式逻辑从 Effect 中拆出去

## 注意点
- 返回的函数应该在 Effect 里调用，不是普通点击事件处理器替代品。
- 它解决的是“Effect 依赖过多”问题，不是所有回调都该改成它。