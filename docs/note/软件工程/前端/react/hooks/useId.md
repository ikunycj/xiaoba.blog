# useId

> 分类：引用 / DOM  
> 官方签名：`const id = useId()`  
> 官方文档：https://zh-hans.react.dev/reference/react/useId

## 输入
- 无。

## 输出
- `id`：稳定且唯一的 ID 字符串。

## 作用
生成稳定的唯一 ID，常用于无障碍属性关联。

## 通俗解释
可以把它理解成“自动生成的门牌号”。一个给 `label`，一个给 `input`，两边就能准确对应上。

## 常见场景
- `label` 对应 `input`
- 无障碍属性关联
- 表单元素 ID

## 注意点
- 不要把它拿来当列表 `key`。
- 它适合做 DOM 关联标识，不适合做业务主键。