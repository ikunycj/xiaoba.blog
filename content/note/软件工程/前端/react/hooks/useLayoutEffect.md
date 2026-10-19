# useLayoutEffect

> 分类：副作用 / 同步  
> 官方签名：`useLayoutEffect(setup, dependencies?)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useLayoutEffect

## 输入
- `setup`：布局相关副作用，可以返回清理函数。
- `dependencies?`：依赖数组。

## 输出
- 无显式返回值。

## 作用
在浏览器绘制前执行副作用，适合读取布局或同步修正 DOM。

## 通俗解释
如果 `useEffect` 是“画完再处理”，那它就是“画出来之前先处理好”。这样用户不会先看到错误位置再闪一下。

## 常见场景
- 测量元素尺寸
- 定位 tooltip
- 滚动位置同步

## 注意点
- 它会阻塞绘制，比 `useEffect` 更重。
- 只有在必须先测量或先修正布局时再用。