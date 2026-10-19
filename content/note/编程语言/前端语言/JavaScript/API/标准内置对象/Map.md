# [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

`Map` 对象是键值对的集合。
- `Map` 中的一个键**只能出现一次**；它在 `Map` 的集合中是独一无二的。
- `Map` 对象按键值对迭代——一个 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环在每次迭代后会返回一个形式为 `[key, value]` 的数组。迭代按 _插入顺序_ 进行，即键值对按 [`set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set) 方法首次插入到集合中的顺序（也就是说，当调用 `set()` 时，map 中没有具有相同值的键）进行迭代。

规范要求 map 实现“平均访问时间与集合中的元素数量呈次线性关系”。因此，它可以在内部表示为哈希表（使用 O(1) 查找）、搜索树（使用 O(log(N)) 查找）或任何其他数据结构，只要复杂度小于 O(N)。

### 键的相等

键的比较基于[零值相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E9%9B%B6%E5%80%BC%E7%9B%B8%E7%AD%89)算法。（它曾经使用[同值相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E5%90%8C%E5%80%BC%E7%9B%B8%E7%AD%89)，将 `0` 和 `-0` 视为不同。检查[浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#browser_compatibility)。）这意味着 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 是与 `NaN` 相等的（虽然 `NaN !== NaN`），剩下所有其他的值是根据 `===` 运算符的结果判断是否相等。

### `Object` 和 `Map` 的比较

[`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 和 `Map` 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 `Map` 使用。

不过 `Map` 和 `Object` 有一些重要的区别，在下列情况中使用 `Map` 会是更好的选择：

|        | Map                                                                                                                                                                                                                                                                                                                                                                                                                                | Object                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 意外的键   | `Map` 默认不包含任何键。它只包含显式存入的键值对。                                                                                                                                                                                                                                                                                                                                                                                                       | `Object` 有原型，因此它包含默认的键，如果不小心的话，它们可能会与你自己的键相冲突。<br><br>**备注：** 这可以通过使用 [`Object.create(null)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 来绕过，但很少这样做。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 安全性    | `Map` 可以安全地与用户提供的键值一起使用。                                                                                                                                                                                                                                                                                                                                                                                                           | 在 `Object` 上设置用户提供的键值对可能会允许攻击者覆盖对象的原型，这可能会导致[对象注入攻击](https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md)。就像意外的键问题一样，这也可以通过使用 `null` 原型对象来缓解。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 键的类型   | `Map` 的键可以为任何值（包括函数、对象或任何原始值）。                                                                                                                                                                                                                                                                                                                                                                                                     | `Object` 的键必须为 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 或 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 键的顺序   | `Map` 中的键以简单、直接的方式排序：`Map` 对象按照插入的顺序迭代条目、键和值。                                                                                                                                                                                                                                                                                                                                                                                      | 尽管现在普通的 `Object` 的键是有序的，但情况并非总是如此，并且其排序比较复杂的。因此，最好不要依赖属性的顺序。<br><br>该顺序最初仅在 ECMAScript 2015 中为自有属性定义；ECMAScript 2020 还定义了继承属性的顺序。但请注意，没有单一机制可以迭代对象的**所有**属性；各种机制各自包含不同的属性子集。（[`for-in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 仅包含可枚举的字符串键属性；[`Object.keys`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 仅包含可枚举的自有字符串键属性；[`Object.getOwnPropertyNames`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) 包括自有的字符串键属性，即使是不可枚举的；[`Object.getOwnPropertySymbols`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) 仅对 `Symbol` 键属性执行相同的操作，等等。） |
| 大小     | `Map` 中的项目数量很容易从其 [`size`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/size) 属性中获得。                                                                                                                                                                                                                                                                                                       | 确定 `Object` 中的项目数量通常更麻烦，效率也较低。一种常见的方法是通过获取 [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 返回的数组的[长度](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 迭代     | `Map` 是[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)，所以它可以直接迭代。                                                                                                                                                                                                                                                                                                                   | `Object` 没有实现[迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)，因此对象默认情况下不能直接通过 JavaScript 的 [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 语句进行迭代。<br><br>**备注：**<br><br>- 一个对象可以实现迭代协议，或者你可以使用 [`Object.keys`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 或 [`Object.entries`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) 来获取一个对象的可迭代对象。<br>- [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 语句允许你迭代对象的_可枚举_属性。                                               |
| 性能     | 在涉及频繁添加和删除键值对的场景中表现更好。                                                                                                                                                                                                                                                                                                                                                                                                             | 未针对频繁添加和删除键值对进行优化。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 序列化和解析 | 没有对序列化或解析的原生支持。<br><br>（但你可以通过使用 [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 及其 _replacer_ 参数和 [`JSON.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 及其 _reviver_ 参数来为 `Map` 构建自己的序列化和解析支持。参见 Stack Overflow 问题 [How do you JSON.stringify an ES6 Map?](https://stackoverflow.com/q/29085197/)）。 | 原生支持使用 [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 序列化 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 到 JSON。<br><br>原生支持使用 [`JSON.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 解析 JSON 为 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)。                                                                                                                                                                                                                                                                                 |

### 设置对象属性

设置对象属性同样适用于 Map 对象，但容易造成困扰。

即，以下的代码能够正常运行（但不推荐）：
```js
const wrongMap = new Map();
wrongMap["bla"] = "blaa";
wrongMap["bla2"] = "blaaa2";

console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' }
```

但这种设置属性的方式不会改变 Map 的数据结构。它使用的是通用对象的特性。`'bla'` 的值未被存储在 Map 中，无法被查询到。其他的对这一数据的操作也会失败：
```js
wrongMap.has("bla"); // false
wrongMap.delete("bla"); // false
console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' }
```

正确的存储数据到 Map 中的方式是使用 `set(key, value)` 方法。
```js
const contacts = new Map();
contacts.set("Jessie", { phone: "213-555-1234", address: "123 N 1st Ave" });
contacts.has("Jessie"); // true
contacts.get("Hilary"); // undefined
contacts.set("Hilary", { phone: "617-555-4321", address: "321 S 2nd St" });
contacts.get("Jessie"); // {phone: "213-555-1234", address: "123 N 1st Ave"}
contacts.delete("Raymond"); // false
contacts.delete("Jessie"); // true
console.log(contacts.size); // 1
```

### 类 Map 浏览器 API

**浏览器类 Map 对象**（或称为“maplike 对象”）是其行为在很多方面都类似于 `Map` 的 [Web API](https://developer.mozilla.org/zh-CN/docs/Web/API) 接口。

就像 `Map` 一样，对象中的条目可以以添加的顺序迭代。类似 `Map` 的对象和 `Map` 具有相同的属性和方法。但是，与 `Map` 不同的是，它们仅允许每个条目中的键和值具有特定预定义的类型。

允许的类型规范的 IDL 定义给出。例如，[`RTCStatsReport`](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCStatsReport) 是一个类似 `Map` 的对象，必须使用字符串作为键，对象作为值。这是在规范 IDL 中定义的：
```js
interface RTCStatsReport {
  readonly maplike<DOMString, object>;
};
```

类 `Map` 对象可以是只读的，也可以是可写的（参见上面 IDL 中的 `readonly` 关键字）。

- 只读的类 `Map` 对象具有 [`size`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototype.size) 属性，以及这些方法：[`entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototype.entries)、[`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototype.foreach)、[`keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototype.keys)、[`values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototype.values) 和 [`[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototypesymbol.iterator) 。
- 可写的类 `Map` 对象还额外具有这些方法：[`clear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototype.clear)、[`delete()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototype.delete) 和 [`set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototype.set)。

除了对键和值类型的限制外，其方法和属性的行为与 `Map` 中的对应实体相同。

以下是浏览器中只读的类 `Map` 对象的示例：

- [`AudioParamMap`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParamMap)
- [`RTCStatsReport`](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCStatsReport)
- [`EventCounts`](https://developer.mozilla.org/en-US/docs/Web/API/EventCounts)
- [`KeyboardLayoutMap`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardLayoutMap)
- [`MIDIInputMap`](https://developer.mozilla.org/zh-CN/docs/Web/API/MIDIInputMap)
- [`MIDIOutputMap`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIOutputMap)

## 构造函数

### [`Map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/Map)
创建 `Map` 对象。
```js
new Map()
new Map(iterable)
```

>[!tip] 备注：
`Map()` 只能用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 构造。尝试不使用 `new` 调用它会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

- `iterable` 可选
一个元素是键值对的[数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)或其他[可迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)对象。（例如，包含两个元素的数组，如 `[[ 1, 'one' ],[ 2, 'two' ]]`。）每个键值对都被添加到新的 `Map` 中。
```js
const myMap = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
```
## 静态属性

### [`Map[Symbol.species]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/Symbol.species)
用于创建派生对象的构造函数。

## 静态方法

### [`Map.groupBy()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy)
根据提供的回调函数返回的值将给定的可迭代对象分组。最终返回的 `Map` 对象使用测试函数返回的唯一值作为键，可用于获取每个组的元素数组。

```js
Map.groupBy(items, callbackFn)
```

>[!tip] 备注：
在某些浏览器的某些版本中，此方法被实现为 `Array.prototype.groupToMap()` 方法。由于 web 兼容性问题，它现在以静态方法实现。参见[浏览器兼容性表格](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)以获取更多信息。

## 实例属性

这些属性在 `Map.prototype` 上定义，并由所有 `Map` 实例共享。

### [`Map.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
创建实例对象的构造函数。对于 `Map` 实例，初始值为 [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) 构造函数。

### [`Map.prototype.size`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/size)
返回 `Map` 对象中的键值对数量。

### [`Map.prototype[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map.prototypesymbol.tostringtag)
`[Symbol.toStringTag]` 属性的初始值是字符串 `"Map"`。该属性在 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 中使用。

## 实例方法

### [`Map.prototype.clear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/clear)
移除 `Map` 对象中所有的键值对。

### [`Map.prototype.delete()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/delete)
移除 `Map` 对象中指定的键值对，如果键值对存在并成功被移除，返回 `true`，否则返回 `false`。调用 `delete` 后再调用 `map.has(key)` 将返回 `false`。

```js
mapInstance.delete(key)
```

### [`Map.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)
返回一个新的迭代器对象，其包含 `Map` 对象中所有键值对 `[key, value]` 二元数组，以插入顺序排列。

### [`Map.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach)
以插入顺序为 `Map` 对象中的每个键值对调用一次 `callbackFn`。
- 如果为 `forEach` 提供了 `thisArg` 参数，则它将作为每一次 callback 的 `this` 值。
```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```
### [`Map.prototype.get()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/get)
返回与指定的键 `key` 关联的**值**，若不存在关联的值，则返回 `undefined`。
```js
get(key)
```

>[!tip] 注意
持有原始对象引用的映射实际上意味着对象不能被垃圾回收，这可能会导致意外的内存问题。如果你希望存储在 map 中的对象具有与原始对象相同的生命周期，请考虑使用 [`WeakMap`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)。
### [`Map.prototype.has()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/has)
返回一个**布尔值**，用来表明 `Map` 对象中是否存在与指定的键 `key` 关联的值。
```js
has(key)
```

### [`Map.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)
返回一个新的迭代器对象，其包含 `Map` 对象中所有元素的键，以插入顺序排列。
```js
keys()
```

### [`Map.prototype.set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set)
 `Map` 实例的 **`set()`** 方法会向 `Map` 对象 **添加** 或 **更新** 一个指定的 **键值对**。
```js
set(key, value)
```
### [`Map.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/values)
返回一个新的迭代对象，其中包含 `Map` 对象中所有的值，并以插入 `Map` 对象的顺序排列。

### [`Map.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/Symbol.iterator)
返回一个新的迭代器对象，其包含 `Map` 对象中所有元素 `[key, value]` 二元数组，以插入顺序排列。

## 示例

### 使用 Map 对象

```js
const myMap = new Map();

const keyString = "a string";
const keyObj = {};
const keyFunc = function () {};

// 添加键
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键 keyObj 关联的值");
myMap.set(keyFunc, "和键 keyFunc 关联的值");

console.log(myMap.size); // 3

// 读取值
console.log(myMap.get(keyString)); // "和键'a string'关联的值"
console.log(myMap.get(keyObj)); // "和键 keyObj 关联的值"
console.log(myMap.get(keyFunc)); // "和键 keyFunc 关联的值"

console.log(myMap.get("a string")); // "和键'a string'关联的值"，因为 keyString === 'a string'
console.log(myMap.get({})); // undefined，因为 keyObj !== {}
console.log(myMap.get(function () {})); // undefined，因为 keyFunc !== function () {}
```

### 将 NaN 作为 Map 的键

[`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 也可以作为键。虽然 `NaN` 与任何值甚至与自己都不相等（`NaN !== NaN` 返回 true），但是因为所有的 `NaN` 的值都是无法区分的，所以下面的例子成立：
```js
const myMap = new Map();
myMap.set(NaN, "not a number");

myMap.get(NaN);
// "not a number"

const otherNaN = Number("foo");
myMap.get(otherNaN);
// "not a number"
```

### 使用 for...of 迭代 Map

`Map` 可以使用 `for...of` 循环来实现迭代：
```js
const myMap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");

for (const [key, value] of myMap) {
  console.log(`${key} = ${value}`);
}
// 0 = zero
// 1 = one

for (const key of myMap.keys()) {
  console.log(key);
}
// 0
// 1

for (const value of myMap.values()) {
  console.log(value);
}
// zero
// one

for (const [key, value] of myMap.entries()) {
  console.log(`${key} = ${value}`);
}
// 0 = zero
// 1 = one
```

### 使用 forEach() 迭代 Map

`Map` 也可以通过 [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach) 方法迭代：
```js
myMap.forEach((value, key) => {
  console.log(`${key} = ${value}`);
});
// 0 = zero
// 1 = one
```

### Map 与数组对象的关系
```js
const kvArray = [
  ["key1", "value1"],
  ["key2", "value2"],
];

// 使用常规的 Map 构造函数可以将一个二维的键值对数组转换成一个 Map 对象
const myMap = new Map(kvArray);

console.log(myMap.get("key1")); // "value1"

// 使用 Array.from 函数可以将一个 Map 对象转换成一个二维的键值对数组
console.log(Array.from(myMap)); // 输出和 kvArray 相同的数组

// 更简洁的方法来做如上同样的事情，使用展开运算符
console.log([...myMap]);

// 或者在键或者值的迭代器上使用 Array.from，进而得到只含有键或者值的数组
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]
```

### 复制或合并 Maps

`Map` 能像数组一样被复制：
```js
const original = new Map([[1, "one"]]);

const clone = new Map(original);

console.log(clone.get(1)); // one
console.log(original === clone); // false. 浅比较 不为同一个对象的引用
```

**备注：** 请记住，_数据本身_ 未被克隆。

`Map` 对象间可以进行合并，但是会保持键的唯一性。
```js
const first = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);

const second = new Map([
  [1, "uno"],
  [2, "dos"],
]);

// 合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的。
// 展开语法本质上是将 Map 对象转换成数组。
const merged = new Map([...first, ...second]);

console.log(merged.get(1)); // uno
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```

`Map` 对象也能与数组合并：
```js
const first = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);

const second = new Map([
  [1, "uno"],
  [2, "dos"],
]);

// Map 对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。
const merged = new Map([...first, ...second, [1, "eins"]]);

console.log(merged.get(1)); // eins
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```

