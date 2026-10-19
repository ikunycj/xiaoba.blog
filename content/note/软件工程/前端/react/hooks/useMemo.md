# useMemo

> 分类：性能 / 并发  
> 官方签名：`const cachedValue = useMemo(calculateValue, dependencies)`  
> 官方文档：https://zh-hans.react.dev/reference/react/useMemo

## 输入
- `calculateValue`：返回计算结果的函数。
- `dependencies`：计算依赖的响应式值数组。

## 输出
- `cachedValue`：在依赖不变时复用的计算结果。

## 作用
缓存昂贵计算结果，减少重复计算。

## 通俗解释
它像是给计算结果做缓存。原料没变时，就不重新算，直接拿上次算好的结果。

## 常见场景
- 大列表过滤
- 复杂数据转换
- 稳定对象或数组依赖

## 注意点
- 先保证逻辑正确，再决定是否记忆化。
- 不要把它当业务语义依赖，React 可能在某些情况下丢弃缓存。