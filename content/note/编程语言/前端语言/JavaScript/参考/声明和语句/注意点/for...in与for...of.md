# for...in与for...of区别
在JavaScript中，`for...in` 和 `for...of` 是两种常用的循环语句，它们的主要区别在于迭代的**对象类型**和**内容**。以下是详细的解释和比较：

---

### **1. `for...in` 循环**

- **作用**：用于**遍历对象的可枚举属性（包括原型链上的可枚举属性）**。
- **迭代内容**：返回对象的**键名**（属性名），而不是值。
- **适用对象**：适用于对象和数组，但主要用于遍历对象的属性。

#### 示例 1：遍历对象
```javascript
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key); // 输出: a, b, c
}
```

#### 示例 2：遍历数组

```javascript
const arr = [10, 20, 30];
for (let index in arr) {
  console.log(index); // 输出: 0, 1, 2 （索引）
  console.log(arr[index]); // 输出: 10, 20, 30
}
```

#### 特点：

1. 遍历数组时，返回的是**索引**，不是数组的值。
2. `for...in` 会遍历对象的原型链上的可枚举属性，如果不想遍历原型链属性，可以使用 `hasOwnProperty` 过滤：
    
    ```javascript
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(key);
      }
    }
    ```
    

---

### **2. `for...of` 循环**

- **作用**：用于**遍历具有迭代器（iterator）接口的对象**。
- **迭代内容**：返回值，而不是键名。
- **适用对象**：适用于数组、字符串、`Map`、`Set` 等可迭代对象。

#### 示例 1：遍历数组

```javascript
const arr = [10, 20, 30];
for (let value of arr) {
  console.log(value); // 输出: 10, 20, 30
}
```

#### 示例 2：遍历字符串

```javascript
const str = "hello";
for (let char of str) {
  console.log(char); // 输出: h, e, l, l, o
}
```

#### 示例 3：遍历 `Map`

```javascript
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3]
]);
for (let [key, value] of map) {
  console.log(key, value); // 输出: a 1, b 2, c 3
}
```

#### 示例 4：遍历 `Set`

```javascript
const set = new Set([1, 2, 3]);
for (let value of set) {
  console.log(value); // 输出: 1, 2, 3
}
```

#### 特点：

1. **不能用于普通对象**，因为对象不是可迭代对象。如果尝试对对象使用 `for...of`，会报错：
```javascript
const obj = { a: 1, b: 2 };
for (let value of obj) {
  console.log(value); // 报错: obj is not iterable
}
```

2. 如果需要对对象使用 `for...of`，可以配合 `Object.keys()`、`Object.values()` 或 `Object.entries()`：
```javascript
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value); // 输出: a 1, b 2
}
```


---

### **3. 区别总结**

| 特性          | `for...in`         | `for...of`                |
| ----------- | ------------------ | ------------------------- |
| **用途**      | 遍历 **对象的可枚举属性**（键） | 遍历 **可迭代** 对象（值）          |
| **返回内容**    | 键                  | 值                         |
| **适用范围**    | 对象和数组              | 数组、字符串、`Map`、`Set` 等可迭代对象 |
| **是否遍历原型链** | 是（包括原型链上的可枚举属性）    | 否                         |
| **是否适用于对象** | 是                  | 否（需要转换为可迭代对象）             |
| **主要应用场景**  | 对象属性遍历             | 数组和其他可迭代对象遍历              |

---

### **4. 使用建议**

- **使用 `for...in`**：
    - 当需要遍历对象的属性（包括索引、键名）时。
    - 遍历数组时尽量避免，可能会导致意外问题。
- **使用 `for...of`**：
    - 当需要遍历数组、字符串或其他可迭代对象的值时。
    - 适用于处理数组、`Map`、`Set` 等复杂数据结构。

通过选择合适的循环方式，可以编写更简洁、高效的代码。