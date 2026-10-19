# useEffect

> 分类：副作用 / 同步  
> 官方签名：`useEffect(setup, dependencies?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useEffect

## 输入
- `setup`：副作用逻辑，可以返回清理函数。
- `dependencies?`：依赖数组，决定何时重新执行 Effect。

## 输出
- 无显式返回值。

## 作用
让组件和外部系统保持同步，比如事件、订阅、定时器、网络连接、第三方库。

## 通俗解释
把它想成“给组件接外部电线”。组件渲染只是画界面，真正和外部世界对接，通常放在 Effect 里。

## 常见场景
- 添加和移除事件监听
- 创建和销毁订阅
- 定时器
- 接入第三方库

## 注意点
- 如果只是根据 state 算另一个值，通常不需要 Effect。
- 记得在合适的时候返回清理函数，避免泄漏和重复订阅。