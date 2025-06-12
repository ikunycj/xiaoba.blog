# Array简介
与其他编程语言中的数组一样，**`Array`** 对象支持 [在单个变量名下存储多个元素](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays) ，并具有 [执行常见数组操作](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E7%A4%BA%E4%BE%8B) 的成员。

## 描述
在 JavaScript 中，数组不是[原始类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)，而是具有以下核心特征的 `Array` 对象：

- **JavaScript 数组是可调整大小的，并且可以包含不同的[数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)**。（当不需要这些特征时，可以使用[类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays)。）
- **JavaScript 数组不是关联数组**，因此，不能使用任意字符串作为索引访问数组元素，但必须使用非负整数（或它们各自的字符串形式）作为索引访问。
- **JavaScript 数组的[索引从 0 开始](https://zh.wikipedia.org/zh-cn/%E5%BE%9E%E9%9B%B6%E9%96%8B%E5%A7%8B%E7%9A%84%E7%B7%A8%E8%99%9F)**：数组的第一个元素在索引 `0` 处，第二个在索引 `1` 处，以此类推，最后一个元素是数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性减去 `1` 的值。
- **JavaScript [数组复制操作](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E5%A4%8D%E5%88%B6%E6%95%B0%E7%BB%84)创建[浅拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Shallow_copy)**。（_所有_ JavaScript 对象的标准内置复制操作都会创建浅拷贝，而不是[深拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Deep_copy)）。

### 数组索引
`Array` 对象不能使用任意字符串作为元素索引（如[关联数组](https://zh.wikipedia.org/wiki/%E5%85%B3%E8%81%94%E6%95%B0%E7%BB%84)），必须使用非负整数（或它们的字符串形式）。通过非整数设置或访问不会设置或从数组列表本身检索元素，但会设置或访问与该数组的[对象属性集合](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%B1%9E%E6%80%A7)相关的变量。数组的对象属性和数组元素列表是分开的，数组的[遍历和修改操作](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95)不能应用于这些具名属性。

数组元素是对象属性，就像 `toString` 是属性一样（具体来说，`toString()` 是一种方法）。然而，尝试按以下方式访问数组的元素会抛出语法错误，因为属性名无效：
```js
arr.0; // 语法错误
```

JavaScript 语法要求使用[方括号表示法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_objects#%E5%AF%B9%E8%B1%A1%E5%92%8C%E5%B1%9E%E6%80%A7)而不是[点号表示法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_accessors)来访问以数字开头的属性。也可以用引号包裹数组索引（例如，`years['2']` 而不是 `years[2]`），尽管通常没有必要。

JavaScript 引擎通过隐式的 `toString`，将 `years[2]` 中的 `2` 强制转换为字符串。因此，`'2'` 和 `'02'` 将指向 `years` 对象上的两个不同的槽位，下面的例子可能是 `true`：

```js
console.log(years["2"] !== years["02"]);
```

只有 `years['2']` 是一个实际的数组索引。`years['02']` 是一个在数组迭代中不会被访问的任意字符串属性。

### 长度与数值属性的关系

JavaScript 数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性和数值属性是连接的。

一些内置数组方法（例如 [`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)、[`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)、[`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 等）在被调用时会考虑到数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性的值。

其他方法（例如，[`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)、[`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 等）也会更新数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性。

```js
const fruits = [];
fruits.push("banana", "apple", "peach");
console.log(fruits.length); // 3
```

当在 JavaScript 数组上设置一个属性时，如果该属性是一个有效的数组索引并且该索引在数组的当前边界之外，引擎将相应地更新数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性：

```js
fruits[5] = "mango";
console.log(fruits[5]); // 'mango'
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 6
```

增加 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 会通过添加空槽来扩展数组，而不是创建任何新元素——甚至不会是 `undefined`。
```js
fruits.length = 10;
console.log(fruits); // ['banana', 'apple', 'peach', empty x 2, 'mango', empty x 4]
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 10
console.log(fruits[8]); // undefined
```

但是，减少 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性会删除元素。
```js
fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length); // 2
```

这将在 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 页中进一步解释。

### 数组方法和空槽
数组方法在遇到空槽时有不同的行为，在[稀疏数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E7%A8%80%E7%96%8F%E6%95%B0%E7%BB%84)中数组方法遇到空槽时有不同的行为。通常，较旧的方法（例如 `forEach`）处理空槽的方式与处理包含 `undefined` 索引的方式不同。

对空槽进行特殊处理的方法包括：[`concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)、[`copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)、[`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)、[`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)、[`flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)、[`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)、[`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)、[`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)、[`lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)、[`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)、[`reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)、[`reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)、[`reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)、[`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)、[`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)、[`sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 和 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)。诸如 `forEach` 之类的迭代方法根本不会访问空槽。其他方法，如 `concat`、`copyWithin` 等，在进行复制时会保留空槽，因此最终数组依然是稀疏的。
```js
const colors = ["红", "黄", "蓝"];
colors[5] = "紫";
colors.forEach((item, index) => {
  console.log(`${index}：${item}`);
});
// 输出：
// 0：红
// 1：黄
// 2：蓝
// 5：紫

colors.reverse(); // ['紫', 空槽 × 2, '蓝', '黄', '红']
```

较新的方法（例如 `keys`）不会对空槽进行特殊处理，而是将它们视为包含 `undefined`。将空槽合并为 `undefined` 元素方法有：[`entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)、[`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)、[`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)、[`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)、[`findLast()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)、[`findLastIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)、[`includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)、[`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)、[`keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)、[`toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)、[`values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values) 和 [`with()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/with)。
```js
const colors = ["红", "黄", "蓝"];
colors[5] = "紫";
const iterator = colors.keys();
for (const key of iterator) {
  console.log(`${key}：${colors[key]}`);
}
// 输出
// 0：红
// 1：黄
// 2：蓝
// 3：undefined
// 4：undefined
// 5：紫

const newColors = colors.toReversed(); // ['紫', undefined, undefined, '蓝', '黄', '红']
```

### 复制方法和修改方法
有些方法不会修改调用该方法的现有数组，而是返回一个新的数组。它们通过首先构造一个新数组，然后填充元素来实现。复制始终是[_浅层次的_](https://developer.mozilla.org/zh-CN/docs/Glossary/Shallow_copy)——该方法从不复制一开始创建的数组之外的任何内容。原始数组的元素将按以下方式复制到新数组中：

- 对象：对象引用被复制到新数组中。原数组和新数组都引用同一个对象。也就是说，如果一个被引用的对象被修改，新数组和原数组都可以看到更改。
- 原始类型，如字符串、数字和布尔值（不是 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 和 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象）：它们的值被复制到新数组中。

其他方法会改变调用该方法的数组，在这种情况下，它们的返回值根据方法的不同而不同：有时是对相同数组的引用，有时是新数组的长度。

以下方法通过访问 [`this.constructor[Symbol.species]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.species) 来创建新数组，以确定要使用的构造函数：[`concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)、[`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)、[`flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)、[`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)、[`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)、[`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 和 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)（返回构造的已删除元素数组）

以下方法总是使用 `Array` 基础构造函数创建新数组：[`toReversed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)、[`toSorted()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)、[`toSpliced()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced) 和 [`with()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/with)。

下表列出了会修改原始数组的方法，以及相应的非修改方法：

| 修改方法                                                                                                                | 相应的非修改方法                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [`copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) | 没有相应的非修改方法                                                                                                                    |
| [`fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)             | 没有相应的非修改方法                                                                                                                    |
| [`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)               | [`slice(0, -1)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)                |
| [`push(v1, v2)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)       | [`concat([v1, v2])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)           |
| [`reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)       | [`toReversed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)           |
| [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)           | [`slice(1)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)                    |
| [`sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)             | [`toSorted()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)               |
| [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)         | [`toSpliced()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)             |
| [`unshift(v1, v2)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) | [`toSpliced(0, 0, v1, v2)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced) |

将改变原数组的方法转换为非修改方法的一种简单方式是使用 [展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax) 或  [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)  先创建一个副本：
```js
arr.copyWithin(0, 1, 2); // 改变了 arr
const arr2 = arr.slice().copyWithin(0, 1, 2); // 不改变 arr
const arr3 = [...arr].copyWithin(0, 1, 2); // 不改变 arr
```

### 迭代方法

许多数组方法接受一个回调函数作为参数。回调函数按顺序为数组中的每个元素调用，且最多调用一次，并且回调函数的返回值用于确定方法的返回值。它们都具有相同的方法签名：
```js
method(callbackFn, thisArg)
```

其中 `callbackFn` 接受三个参数
[`element`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#element)
-  数组中当前正在处理的元素。

[`index`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#index)
- 正在处理的元素在数组中的索引。

[`array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#array)
- 调用该方法的数组。

`callbackFn` 的返回值取决于调用的数组方法。

`thisArg` 参数（默认为 `undefined`）将在调用 `callbackFn` 时用作 `this` 值。最终由 `callbackFn` 观察到的 `this` 值根据[通常的规则](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)确定：如果 `callbackFn` 是[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)，原始 `this` 值将被包装为对象，并将 `undefined`/`null` 替换为 [`globalThis`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)。对于使用[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 定义的任何 `callbackFn` 来说，`thisArg` 参数都是无关紧要的，因为箭头函数没有自己的 `this` [绑定](https://developer.mozilla.org/zh-CN/docs/Glossary/Binding)。

如果想要在迭代期间读取另一个索引值的话，传递给 `callbackFn` 的 `array` 参数是有用的，因为可能并不总是有一个引用当前数据的现有变量。在迭代过程中，通常不应更改数组（参见 [迭代方法中的改变初始数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E8%BF%AD%E4%BB%A3%E6%96%B9%E6%B3%95%E4%B8%AD%E7%9A%84%E6%94%B9%E5%8F%98%E5%88%9D%E5%A7%8B%E6%95%B0%E7%BB%84)），但可以使用这个参数这样做。`array` 参数 _不是_ 正在构建的数组，在类似 `map()`、`filter()` 和 `flatMap()` 方法的情况下——无法通过回调函数访问正在构建的数组。

所有迭代方法都是[复制方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E5%A4%8D%E5%88%B6%E6%96%B9%E6%B3%95%E5%92%8C%E4%BF%AE%E6%94%B9%E6%96%B9%E6%B3%95)和[通用方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E9%80%9A%E7%94%A8%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95)，尽管它们在处理[空槽](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95%E5%92%8C%E7%A9%BA%E6%A7%BD)时的行为不同。

以下方法是迭代方法：[`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)、[`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)、[`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)、[`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)、[`findLast()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)、[`findLastIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)、[`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)、[`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)、[`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 和 [`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)。

特别地，[`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)、[`find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)、[`findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)、[`findLast()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)、[`findLastIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex) 和 [`some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 并不总是在每个元素上调用 `callbackFn`——它们在确定返回值后立即停止迭代。

[`reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 和 [`reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) 方法也接受一个回调函数，并对数组中的每个元素最多运行一次，但它们的方法签名与典型的迭代方法略有不同（例如，它们不接受 `thisArg`）。

[`sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 方法也接受一个回调函数，但它不是一个迭代方法。它会就地修改数组，不接受 `thisArg`，并且可能在索引上多次调用回调函数。

迭代方法迭代数组，如下所示（省略许多技术细节）：
```js
function method(callbackFn, thisArg) {
  const length = this.length;
  for (let i = 0; i < length; i++) {
    if (i in this) {
      const result = callbackFn.call(thisArg, this[i], i, this);
      // 使用 result 做一些事，也许更早地返回
    }
  }
}
```

备注如下内容：
1. 不是所有的方法都执行 `i in this` 验证，`find`、`findIndex`、`findLast` 和 `findLastIndex` 方法不执行，其他的会。
2. `length` 变量在循环开始前存储。这会影响迭代过程中插入和删除的处理方式（参见[迭代方法中的改变初始数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E8%BF%AD%E4%BB%A3%E6%96%B9%E6%B3%95%E4%B8%AD%E7%9A%84%E6%94%B9%E5%8F%98%E5%88%9D%E5%A7%8B%E6%95%B0%E7%BB%84)）。
3. `method` 方法不会存储数组内容，因此如果迭代期间，有任何索引发生更改，可以观察到新的值。
4. 上面的代码按索引的升序迭代数组，有一些方法按索引降序迭代（`for (let i = length - 1; i >= 0; i--)`）：`reduceRight()`、`findLast()` 和 `findLastIndex()`。
5. `reduce` 和 `reduceRight` 具有略微不同的签名，并不总是从第一个/最后一个元素开始。

### 通用数组方法
数组方法总是通用的——它们不访问数组对象的任何内部数据。它们只通过 `length` 属性和索引访问数组元素。这意味着它们也可以在类数组对象上调用。
```js
const arrayLike = {
  0: "a",
  1: "b",
  length: 2,
};
console.log(Array.prototype.join.call(arrayLike, "+")); // 'a+b'
```

#### 长度属性的规范化

`length` 属性被[转换为一个数字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_%E5%BC%BA%E5%88%B6%E8%BD%AC%E6%8D%A2)，被截断为一个整数，然后固定为 0 到 $2^{53} - 1$ 之间的范围。`NaN` 变成 `0`，所以即使 `length` 没有出现或是 `undefined`，它也会表现得好像它的值是 `0`。

JavaScript 避免将 `length` 设置为[不安全的整数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)。如果 `length` 将被设置为大于 $2^{53} - 1$ 的数字，则所有内置方法都将抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。但是，由于数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性在设置为大于 $2^{32}$ 时会抛出错误，因此通常不会达到安全整数阈值，除非该方法在非数组对象上调用。

```js
Array.prototype.flat.call({}); // []
```

一些数组方法会设置数组对象的 `length` 属性。它们总是在规范化后设置值，因此 `length` 总是以整数结尾。
```js
const a = { length: 0.7 };
Array.prototype.push.call(a);
console.log(a.length); // 0
```

#### 类数组对象

术语[_类数组对象_](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E4%BD%BF%E7%94%A8%E7%B1%BB%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1)指的是在上面描述的 `length` 转换过程中不抛出的任何对象。在实践中，这样的对象应该实际具有 `length` 属性，并且索引元素的范围在 `0` 到 `length - 1` 之间。（如果它没有所有的索引，它将在功能上等同于[稀疏数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95%E5%92%8C%E7%A9%BA%E6%A7%BD)。）

许多 DOM 对象都是类数组对象——例如 [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList) 和 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)。[`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 对象也是类数组对象。你可以在它们上调用数组方法，即使它们本身没有这些方法。
```js
function f() {
  console.log(Array.prototype.join.call(arguments, "+"));
}

f("a", "b"); // 'a+b'
```

## 构造函数
### [`Array()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
创建一个新的 `Array` 对象。
```js
new Array()
new Array(element0)
new Array(element0, element1)
new Array(element0, element1, /* … ,*/ elementN)
new Array(arrayLength)

Array()
Array(element0)
Array(element0, element1)
Array(element0, element1, /* … ,*/ elementN)
Array(arrayLength)
```

## 静态属性
### [`Array[Symbol.species]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.species)
返回 `Array` 构造函数。

>[!warning] 警告： 
>`[Symbol.species]` 的存在允许执行任意代码，这可能会产生安全漏洞。它还会使某些优化变得更加困难。引擎开发者正在[调查是否要移除此特性](https://github.com/tc39/proposal-rm-builtin-subclassing)。如果可能，请避免依赖它。现代数组方法，如 [`toReversed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)，不使用 `[Symbol.species]` 且始终返回一个新的 `Array` 基类实例。
## 静态方法
### [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
从数组类对象或可迭代对象创建一个新的 `Array` 实例。
```js
Array.from(arrayLike)
Array.from(arrayLike, mapFn)
Array.from(arrayLike, mapFn, thisArg)
```
### [`Array.fromAsync()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync)
从异步可迭代、可迭代或类数组对象创建新的 `Array` 实例。

### [`Array.isArray()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
如果参数是数组则返回 `true` ，否则返回 `false` 。
```js
Array.isArray(value)
```
### [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)
创建一个新的 `Array` 实例，具有可变数量的参数，而不管参数的数量或类型。
```js
Array.of()
Array.of(element0)
Array.of(element0, element1)
Array.of(element0, element1, /* … ,*/ elementN)
```
## 实例属性
以下属性在 `Array.prototype` 上定义，并由所有 `Array` 实例共享。

### [`Array.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
创建实例对象的构造函数。对于 `Array` 实例，初始值是 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Array) 构造函数。

### [`Array.prototype[Symbol.unscopables]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.unscopables)
包含 ES2015 版本之前 ECMAScript 标准中没有包含的属性名，在使用 [`with`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with) 绑定语句时会被忽略。

**以下属性是每个 `Array` 实例自有的属性。**
### [`Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
反映数组中元素的数量。
该值是一个无符号 32 位整数，并且其数值总是大于数组最大索引。x
## 实例方法

### [`Array.prototype.at()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
返回给定索引处的数组元素。接受从最后一项往回计算的负整数。
```js
at(index)
```
### [`Array.prototype.concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
返回一个新数组，该数组由被调用的数组与其他数组或值连接形成。
```js
concat()
concat(value0)
concat(value0, value1)
concat(value0, value1, /* … ,*/ valueN)
```
### [`Array.prototype.copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度
```js
copyWithin(target)
copyWithin(target, start)
copyWithin(target, start, end)
```

### [`Array.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
返回一个新的[_数组迭代器_](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_generators)对象，其中包含数组中每个索引的键/值对。

### [`Array.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
如果调用数组中的每个元素都满足测试函数，则返回 `true`。

### [`Array.prototype.fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
用静态值填充数组中从开始索引到结束索引的所有元素。

### [`Array.prototype.filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
返回一个新数组，其中包含调用所提供的筛选函数返回为 `true` 的所有数组元素。

### [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
返回数组中满足提供的测试函数的第一个元素的值，如果没有找到合适的元素，则返回 `undefined`。

### [`Array.prototype.findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
返回数组中满足提供的测试函数的第一个元素的索引，如果没有找到合适的元素，则返回 `-1`。

### [`Array.prototype.findLast()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)
返回数组中满足提供的测试函数的最后一个元素的值，如果没有找到合适的元素，则返回 `undefined`。

### [`Array.prototype.findLastIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)
返回数组中满足所提供测试函数的最后一个元素的索引，如果没有找到合适的元素，则返回 `-1`。

### [`Array.prototype.flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
返回一个新数组，所有子数组元素递归地连接到其中，直到指定的深度。

### [`Array.prototype.flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
对调用数组的每个元素调用给定的回调函数，然后将结果展平一层，返回一个新数组。

### [`Array.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
对调用数组中的每个元素调用给定的函数。

### [`Array.prototype.includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
确定调用数组是否包含一个值，根据情况返回 `true` 或 `false`。

### [`Array.prototype.indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
返回在调用数组中可以找到给定元素的第一个（最小）索引。

### [`Array.prototype.join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
将数组的所有元素连接为字符串。

### [`Array.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
返回一个新的[_数组迭代器_](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_generators)，其中包含调用数组中每个索引的键。

### [`Array.prototype.lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
返回在调用数组中可以找到给定元素的最后一个（最大）索引，如果找不到则返回 `-1`。

### [`Array.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
**创建一个新数组**，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成
```js
map(callbackFn)
map(callbackFn, thisArg)
```
### [`Array.prototype.pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
从数组中移除最后一个元素并返回该元素。

### [`Array.prototype.push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
在数组末尾添加一个或多个元素，并返回数组新的 `length`。

### [`Array.prototype.reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
对数组的每个元素（从左到右）执行用户提供的“reducer”回调函数，将其简化为单个值。

### [`Array.prototype.reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)
对数组的每个元素（从右到左）执行用户提供的“reducer”回调函数，将其简化为单个值。

### [`Array.prototype.reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
_就地_ 反转数组中元素的顺序。（前面变成后面，后面变成前面。）

### [`Array.prototype.shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
从数组中移除第一个元素并返回该元素。

### [`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
提取调用数组的一部分并返回一个新数组。

### [`Array.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
如果调用数组中至少有一个元素满足提供的测试函数，则返回 `true`。

### [`Array.prototype.sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
对数组的元素进行排序并返回该数组。

### [`Array.prototype.splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
从数组中添加和/或删除元素。

### [`Array.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
返回一个表示调用数组及其元素的本地化字符串。重写 [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString) 方法。

### [`Array.prototype.toReversed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)
返回一个新数组，该数组的元素顺序被反转，但不改变原始数组。

### [`Array.prototype.toSorted()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
返回一个新数组，其中元素按升序排序，而不改变原始数组。

### [`Array.prototype.toSpliced()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)
返回一个新数组，在给定索引处删除和/或替换了一些元素，而不改变原始数组。

### [`Array.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
返回一个表示调用数组及其元素的字符串。重写 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

### [`Array.prototype.unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
在数组的前面添加一个或多个元素，并返回数组新的 `length`。

### [`Array.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
返回一个新的[_数组迭代器_](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_generators)对象，该对象包含数组中每个索引的值。

### [`Array.prototype.with()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/with)
返回一个新数组，其中给定索引处的元素替换为给定值，而不改变原始数组。

### [`Array.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.iterator)
默认情况下，该方法为 [`values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values) 方法的别名。

## 示例

本节提供一些 JavaScript 中常见的数组操作示例。

**备注：** 如果你还不熟悉数组的基础知识，可以考虑先读一下 [JavaScript 第一步：数组](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays)，它解释了[数组是什么](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays#%E6%95%B0%E7%BB%84%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)，还包括其他常见的数组操作示例。

### 创建数组

下面的例子展示了三种创建新数组的方法：首先使用[数组字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Array#%E6%95%B0%E7%BB%84%E5%AD%97%E9%9D%A2%E9%87%8F)，然后使用 [`Array()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Array) 构造函数，最后使用 [`String.prototype.split()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 从字符串构建数组。

```js
// 1.使用数组字面量创建的 'fruits' 数组。
const fruits = ["Apple", "Banana"];
console.log(fruits.length);

// 2.使用 Array() 构建函数创建的 'fruits2' 数组。
const fruits2 = new Array("Apple", "Banana");
console.log(fruits2.length);

// 3.使用 String.prototype.split() 方法创建的 'fruits3' 数组。
const fruits3 = "Apple, Banana".split(", ");
console.log(fruits3.length);
```

### 从数组中创建一个字符串

下面的例子使用 [`join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join) 方法从 `fruits` 数组中创建一个字符串。

```js
const fruits = ["Apple", "Banana"];
const fruitsString = fruits.join(", ");
console.log(fruitsString);
// "Apple, Banana"
```

### 通过索引访问数组元素

下面的例子展示了如何通过指定它们在数组中的位置的索引号来访问 `fruits` 数组中的元素。

```js
const fruits = ["Apple", "Banana"];

// 数组第一个元素的索引始终为 0。
fruits[0]; // Apple

// 数组第二个元素的索引始终为 1。
fruits[1]; // Banana

// 数组最后一个元素的索引总是比数组的长度小 1。
fruits[fruits.length - 1]; // Banana

// 使用大于数组长度的索引会返回"undefined"
fruits[99]; // undefined
```

### 在数组中查找元素的索引

下面的例子使用 [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 方法查找字符串 `"Banana"` 在 `fruits` 数组中的位置（索引）。

```js
const fruits = ["Apple", "Banana"];
console.log(fruits.indexOf("Banana"));
// 1
```

### 检查数组是否包含某个元素

下面的例子展示了两种检查 `fruits` 数组是否包含 `"Banana"` 和 `"Cherry"` 的方法：首先使用 [`includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) 方法，然后使用 [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 方法来测试索引值不是 `-1`。

```js
const fruits = ["Apple", "Banana"];

fruits.includes("Banana"); // true
fruits.includes("Cherry"); // false

// 如果 indexOf() 不返回 -1，则数组包含给定的元素。
fruits.indexOf("Banana") !== -1; // true
fruits.indexOf("Cherry") !== -1; // false
```

### 将元素添加到数组中

下面的例子使用 [`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 方法向 `fruits` 数组追加一个新字符串。

```js
const fruits = ["Apple", "Banana"];
const newLength = fruits.push("Orange");
console.log(fruits);
// ["Apple", "Banana", "Orange"]
console.log(newLength);
// 3
```

### 移除数组中的最后一个元素

下面的例子使用 [`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) 方法从 `fruits` 数组中移除最后一个元素。
```js
const fruits = ["Apple", "Banana", "Orange"];
const removedItem = fruits.pop();
console.log(fruits);
// ["Apple", "Banana"]
console.log(removedItem);
// Orange
```

**备注：** `pop()` 只能用于从数组中移除最后一个元素。若要从数组末尾移除多个元素，请参见下一个示例。

### 从数组末尾移除多个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法从 `fruits` 数组中移除最后 3 个元素。
```js
const fruits = ["Apple", "Banana", "Strawberry", "Mango", "Cherry"];
const start = -3;
const removedItems = fruits.splice(start);
console.log(fruits);
// ["Apple", "Banana"]
console.log(removedItems);
// ["Strawberry", "Mango", "Cherry"]
```

### 将数组截断为前 N 个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法将 `fruits` 数组截断到只剩下前 2 个元素。
```js
const fruits = ["Apple", "Banana", "Strawberry", "Mango", "Cherry"];
const start = 2;
const removedItems = fruits.splice(start);
console.log(fruits);
// ["Apple", "Banana"]
console.log(removedItems);
// ["Strawberry", "Mango", "Cherry"]
```

### 移除数组中的第一个元素

下面的例子使用 [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) 方法从 `fruits` 数组中移除第一个元素。
```js
const fruits = ["Apple", "Banana"];
const removedItem = fruits.shift();
console.log(fruits);
// ["Banana"]
console.log(removedItem);
// Apple
```

**备注：** `shift()` 只能用于从数组中移除第一个元素。若要从数组的开头移除多个元素，请参见下一个示例。

### 从数组开头移除多个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法从 `fruits` 数组中移除前 3 个元素。
```js
const fruits = ["Apple", "Strawberry", "Cherry", "Banana", "Mango"];
const start = 0;
const deleteCount = 3;
const removedItems = fruits.splice(start, deleteCount);
console.log(fruits);
// ["Banana", "Mango"]
console.log(removedItems);
// ["Apple", "Strawberry", "Cherry"]
```

### 向数组开头添加一个新的元素

下面的例子使用 [`unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) 方法在索引 `0` 处向 `fruits` 数组中添加一个新元素——使其成为数组中新的第一元素。
```js
const fruits = ["Banana", "Mango"];
const newLength = fruits.unshift("Strawberry");
console.log(fruits);
// ["Strawberry", "Banana", "Mango"]
console.log(newLength);
// 3
```

### 按索引移除单个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法从 `fruits` 数组中删除字符串 `"Banana"`——通过指定 `"Banana"` 的索引位置。

```js
const fruits = ["Strawberry", "Banana", "Mango"];
const start = fruits.indexOf("Banana");
const deleteCount = 1;
const removedItems = fruits.splice(start, deleteCount);
console.log(fruits);
// ["Strawberry", "Mango"]
console.log(removedItems);
// ["Banana"]
```

### 按索引移除多个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法从 `fruits` 数组中删除字符串 `"Banana"` 和 `"Strawberry"`——通过指定 `"Banana"` 的索引位置，以及要移除的元素总数。
```js
const fruits = ["Apple", "Banana", "Strawberry", "Mango"];
const start = 1;
const deleteCount = 2;
const removedItems = fruits.splice(start, deleteCount);
console.log(fruits);
// ["Apple", "Mango"]
console.log(removedItems);
// ["Banana", "Strawberry"]
```

### 替换数组中的多个元素

下面的例子使用 [`splice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法将 `fruits` 数组中的最后两个元素替换为新元素。

```js
const fruits = ["Apple", "Banana", "Strawberry"];
const start = -2;
const deleteCount = 2;
const removedItems = fruits.splice(start, deleteCount, "Mango", "Cherry");
console.log(fruits);
// ["Apple", "Mango", "Cherry"]
console.log(removedItems);
// ["Banana", "Strawberry"]
```

### 遍历数组

下面的例子使用 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环遍历 `fruits` 数组，将每一个元素打印到控制台。

```js
const fruits = ["Apple", "Mango", "Cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
// Apple
// Mango
// Cherry
```

但 `for...of` 只是遍历任意数组的众多方法之一；更多方法，参见[循环与迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration)，并查看 [`every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)、[`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)、[`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)、[`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)、[`reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 和 [`reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) 方法——并参见下一个示例，该示例使用 [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 方法。

### 对数组中的每个元素调用函数

下面的例子使用 [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 方法在 `fruits` 数组中的每个元素上调用一个函数；该函数将每个元素以及元素的索引号打印到控制台。
```js
const fruits = ["Apple", "Mango", "Cherry"];
fruits.forEach((item, index, array) => {
  console.log(item, index);
});
// Apple 0
// Mango 1
// Cherry 2
```

### 合并多个数组

下面的例子使用 [`concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) 方法将 `fruits` 数组与 `moreFruits` 数组合并，生成一个新的 `combinedFruits` 数组。注意，`fruits` 和 `moreFruits` 保持不变。

```js
const fruits = ["Apple", "Banana", "Strawberry"];
const moreFruits = ["Mango", "Cherry"];
const combinedFruits = fruits.concat(moreFruits);
console.log(combinedFruits);
// ["Apple", "Banana", "Strawberry", "Mango", "Cherry"]

// The 'fruits' array remains unchanged.
console.log(fruits);
// ["Apple", "Banana", "Strawberry"]

// The 'moreFruits' array also remains unchanged.
console.log(moreFruits);
// ["Mango", "Cherry"]
```

### 复制数组

下面的例子展示了从现有的 `fruits` 数组创建新数组的三种方法：首先使用[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)，然后使用 [`from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 方法，然后使用 [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 方法。

```js
const fruits = ["Strawberry", "Mango"];

// 1.Create a copy using spread syntax.
const fruitsCopy = [...fruits];

// 2.Create a copy using the from() method.
const fruitsCopy2 = Array.from(fruits);

// 3.Create a copy using the slice() method.
const fruitsCopy3 = fruits.slice();
```

所有内置的数组复制操作（[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)、[`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)、[`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 和 [`Array.prototype.concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)）都会创建[浅拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Shallow_copy)。如果你想要一个数组的[深拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Deep_copy)，你可以使用 [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 将数组转换成一个 JSON 字符串，然后使用 [`JSON.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 将字符串转换回一个完全独立于原数组的新数组。
```js
const fruitsDeepCopy = JSON.parse(JSON.stringify(fruits));
```

你还可以使用 [`structuredClone()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/structuredClone "structuredClone()") 方法创建深拷贝，该方法的优点是允许源代码中的[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)被 _转移_ 到新的副本，而不仅仅是克隆。

最后，重要的是要理解，将现有数组赋值给新变量并不会创建数组或其元素的副本。相反，新变量只是对原数组的引用或别名；也就是说，原来的数组名和新的变量名只是同一个对象的两个名称（因此总是被计算为[严格相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E4%B8%A5%E6%A0%BC%E7%9B%B8%E7%AD%89)）。因此，如果你对原数组的值或新变量的值做了任何改变，另一个也会改变：

```js
const fruits = ["Strawberry", "Mango"];
const fruitsAlias = fruits;
// 'fruits' 和 'fruitsAlias' 是同一个对象，严格相等。
fruits === fruitsAlias; // true
// 对 'fruits' 数组的任何更改也会更改 'fruitsAlias'。
fruits.unshift("Apple", "Banana");
console.log(fruits);
// ['Apple', 'Banana', 'Strawberry', 'Mango']
console.log(fruitsAlias);
// ['Apple', 'Banana', 'Strawberry', 'Mango']
```

### 创建二维数组

下面的例子创建了一个代表棋盘的二维字符串数组。第一步是将 `board[6][4]` 中的 `'p'` 复制到 `board[4][4]`。原本的 `[6][4]` 位置则被设置为空格。

```js
const board = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"],
];

console.log(`${board.join("\n")}\n\n`);

// 将国王的兵向前移动 2
board[4][4] = board[6][4];
board[6][4] = " ";
console.log(board.join("\n"));
```

下面是输出：

```
R,N,B,Q,K,B,N,R
P,P,P,P,P,P,P,P
 , , , , , , ,
 , , , , , , ,
 , , , , , , ,
 , , , , , , ,
p,p,p,p,p,p,p,p
r,n,b,q,k,b,n,r

R,N,B,Q,K,B,N,R
P,P,P,P,P,P,P,P
 , , , , , , ,
 , , , , , , ,
 , , , ,p, , ,
 , , , , , , ,
p,p,p,p, ,p,p,p
r,n,b,q,k,b,n,r
```

### 使用数组将一组值制成表格

```
const values = [];
for (let x = 0; x < 10; x++) {
  values.push([2 ** x, 2 * x ** 2]);
}
console.table(values);
```

结果为：
```
// The first column is the index
0  1    0
1  2    2
2  4    8
3  8    18
4  16   32
5  32   50
6  64   72
7  128  98
8  256  128
9  512  162
```

### 使用匹配的结果创建数组

[`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 和字符串之间的匹配结果可以创建一个 JavaScript 数组，该数组具有匹配信息的属性和元素。这样的数组由 [`RegExp.prototype.exec()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) 和 [`String.prototype.match()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 返回。

```js
// 匹配一个 d 后跟一个或多个 b 后跟一个 d
// 记住匹配的 b 和后面的 d
// 忽略大小写

const myRe = /d(b+)(d)/i;
const execResult = myRe.exec("cdbBdbsbz");

console.log(execResult.input); // 'cdbBdbsbz'
console.log(execResult.index); // 1
console.log(execResult); // [ "dbBd", "bB", "d" ]
```

有关匹配结果的更多信息，请参见 [`RegExp.prototype.exec()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) 和 [`String.prototype.match()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 页。

### 迭代方法中的改变初始数组
[迭代方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E8%BF%AD%E4%BB%A3%E6%96%B9%E6%B3%95)不会改变调用它的数组，但作为 `callbackFn` 提供的函数可以。要记住关键原则是只有 0 和 `arrayLength - 1` 之间的索引可访问，`arrayLength` 是数组方法第一次被调用时的长度值，但传递给回调的元素是访问索引时的值。因此：

- `callbackFn` 不会访问任何添加到超出数组的初始化长度之外的元素，当开始调用迭代方法时。
- 对已访问索引的变更不会导致再次对其调用 `callbackFn`。
- 如果数组中存在但未访问的元素被 `callbackFn` 更改，则传递给 `callbackFn` 的值将是访问该元素时的值。删除的元素不会被访问。

**警告：** 上述类型的并发修改通常会导致代码难以理解，需要避免（特殊情况除外）。

下面的示例使用 `forEach` 方法作为一个例子，但以升序访问索引的其他的方法以相同的方式工作。我们将先定义一个帮助函数：

```js
function testSideEffect(effect) {
  const arr = ["e1", "e2", "e3", "e4"];
  arr.forEach((elem, index, arr) => {
    console.log(`数组：[${arr.join(", ")}]，索引：${index}，元素：${elem}`);
    effect(arr, index);
  });
  console.log(`最终数组：[${arr.join(", ")}]`);
}
```

一旦达到索引，对尚未访问索引的修改将可见：
```js
testSideEffect((arr, index) => {
  if (index + 1 < arr.length) arr[index + 1] += "*";
});
// 数组：[e1, e2, e3, e4]，索引：0，元素：e1
// 数组：[e1, e2*, e3, e4]，索引：1，元素：e2*
// 数组：[e1, e2*, e3*, e4]，索引：2，元素：e3*
// 数组：[e1, e2*, e3*, e4*]，索引：3，元素：e4*
// 最终数组：[e1, e2*, e3*, e4*]
```

对已访问索引的修改不会改变迭代行为，尽管之后数据会有所不同：
```js
testSideEffect((arr, index) => {
  if (index > 0) arr[index - 1] += "*";
});
// 数组：[e1, e2, e3, e4]，索引：0，元素：e1
// 数组：[e1, e2, e3, e4]，索引：1，元素：e2
// 数组：[e1*, e2, e3, e4]，索引：2，元素：e3
// 数组：[e1*, e2*, e3, e4]，索引：3，元素：e4
// 最终数组：[e1*, e2*, e3*, e4]
```

在小于初始数组长度的未访问索引处插入 _n_ 元素将使它们被访问。原始数组中大于初始长度的最后 _n_ 元素将不会被访问：
```js
testSideEffect((arr, index) => {
  if (index === 1) arr.splice(2, 0, "new");
});
// 数组：[e1, e2, e3, e4]，索引：0，元素：e1
// 数组：[e1, e2, e3, e4]，索引：1，元素：e2
// 数组：[e1, e2, new, e3, e4]，索引：2，元素：new
// 数组：[e1, e2, new, e3, e4]，索引：3，元素：e3
// 最终数组：[e1, e2, new, e3, e4]
// e4 不会被访问因为它的索引是 4
```

在大于初始数组长度处插入 _n_ 元素将不会使它们被访问：
```js
testSideEffect((arr) => arr.push("new"));
// 数组：[e1, e2, e3, e4]，索引：0，元素：e1
// 数组：[e1, e2, e3, e4, new]，索引：1，元素：e2
// 数组：[e1, e2, e3, e4, new, new]，索引：2，元素：e3
// 数组：[e1, e2, e3, e4, new, new, new]，索引：3，元素：e4
// 最终数组：[e1, e2, e3, e4, new, new, new, new]
```

对已经访问过的索引插入 _n_ 元素将不会使它们被访问，但它会将剩余元素向后移动 _n_，因此当前索引和它之前的 _n - 1_ 元素会再次被访问。
```js
testSideEffect((arr, index) => arr.splice(index, 0, "new"));
// 数组：[e1, e2, e3, e4]，索引：0，元素：e1
// 数组：[new, e1, e2, e3, e4]，索引：1，元素：e1
// 数组：[new, new, e1, e2, e3, e4]，索引：2，元素：e1
// 数组：[new, new, new, e1, e2, e3, e4]，索引：3，元素：e1
// 最终数组：[new, new, new, new, e1, e2, e3, e4]
// e1 不断被访问，因为它不断被移回
```

删除未访问索引处的 _n_ 元素将使它们不再被访问。因为数组已经缩小，最后 _n_ 迭代将访问越界索引。如果此方法忽略不存在的索引（参见[数组方法和空槽](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95%E5%92%8C%E7%A9%BA%E6%A7%BD)），最后的 _n_ 次迭代将会被跳过；否则，它们将收到 `undefined`：
```js
testSideEffect((arr, index) => {
  if (index === 1) arr.splice(2, 1);
});
// 数组：[e1, e2, e3, e4]，索引：0，元素：e1
// 数组：[e1, e2, e3, e4]，索引：1，元素：e2
// 数组：[e1, e2, e4]，索引：2，元素：e4
// 最终数组：[e1, e2, e4]
// 不会访问索引 3 因为它越界

// 与 find() 比较，后者将不存在的索引视为未定义：
const arr2 = ["e1", "e2", "e3", "e4"];
arr2.find((elem, index, arr) => {
  console.log(`数组：[${arr.join(", ")}]，索引：${index}，元素：${elem}`);
  if (index === 1) arr.splice(2, 1);
  return false;
});
// 数组：[e1, e2, e3, e4]，索引：0，元素：e1
// 数组：[e1, e2, e3, e4]，索引：1，元素：e2
// 数组：[e1, e2, e4]，索引：2，元素：e4
// 数组：[e1, e2, e4]，索引：3，元素：undefined
```

删除已访问索引处的 _n_ 元素不会改变它们在删除之前被访问的事实。因为数据已经缩小，在当前索引后的下 _n_ 元素被跳过。如果此方法忽略不存在索引，最后的 _n_ 次迭代将会被跳过；否则，它们将收到 `undefined`：
```js
testSideEffect((arr, index) => arr.splice(index, 1));
// 数组：[e1, e2, e3, e4]，索引：0，元素：e1
// 不会范围内 e2 因为 e2 现在的索引是 0，索引 0 已经被访问过
// 数组：[e2, e3, e4]，索引：1，元素：e3
// 不会范围内 e4 因为 e4 现在的索引是 1，索引 1 已经被访问过
// 最终数组：[e2, e4]
// 索引 2 越界，索引它不会被访问

// 与 find() 比较，后者将不存在的索引视为未定义：
const arr2 = ["e1", "e2", "e3", "e4"];
arr2.find((elem, index, arr) => {
  console.log(`数组：[${arr.join(", ")}]，索引：${index}，元素：${elem}`);
  arr.splice(index, 1);
  return false;
});
// 数组：[e1, e2, e3, e4]，索引：0，元素：e1
// 数组：[e2, e3, e4]，索引：1，元素：e3
// 数组：[e2, e4]，索引：2，元素：undefined
// 数组：[e2, e4]，索引：3，元素：undefined
```

对于按索引降序迭代的方法，插入会导致元素被跳过，删除会导致元素被多次访问，调整上面的代码以查看效果。
