# for...in

**`for...in`** 语句迭代一个对象的所有[可枚举字符串属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)（除 [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 以外），包括继承的可枚举属性。
## 语法
```JS
for (variable in object)
  statement
```

### 参数

[`variable`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#variable)
在每次迭代时接收一个字符串属性名。它可以通过使用 [`const`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)、[`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 或 [`var`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var) 进行声明，也可以是一个[赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment)目标（例如，先前声明的变量、对象属性或[解构赋值模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)）。使用 `var` 声明的变量不会局限于循环内部，即它们与 `for...in` 循环所在的作用域相同。

[`object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#object)
被迭代非符号可枚举属性的对象。

[`statement`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#statement)
每次迭代后执行的语句。可以引用 `variable`。可以使用[块语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)执行多个语句。

## 描述

该循环将迭代对象本身的所有可枚举属性，以及对象从其原型链继承的属性（原型链中较近的原型的属性优先于较远的原型的属性）。

`for...in` 循环只会迭代可枚举的非符号属性。从内置构造函数（如 `Array` 和 `Object`）创建的对象会从 `Array.prototype` 和 `Object.prototype` 继承不可枚举属性，例如 `Array` 的 `indexOf()` 方法或 `Object` 的 `toString()` 方法，它们在 `for...in` 循环中不会被访问到。

根据现代 ECMAScript 规范的定义，遍历的顺序是一致且可预测的。在原型链的每个组件中，所有非负整数键（可以作为数组索引）将首先按值升序遍历，然后是其他字符串键按属性创建的先后顺序升序遍历。

在 `for...in` 循环中，`variable` 部分可以接受任何在 `=` 运算符之前的内容。只要在循环体内部不重新赋值（可以在迭代之间更改，因为它们是两个独立的变量），你可以使用 [`const`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 来声明变量。否则，你可以使用 [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)。你可以使用[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)来为多个局部变量赋值，或者使用属性访问器（例如 `for (x.y in iterable)`）将值赋给对象属性。

一种[遗留的语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features#%E8%AF%AD%E5%8F%A5)允许在 `for...in` 循环中的 `var` 声明的循环变量具有初始值。在严格模式下，这会抛出[语法错误](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Invalid_for-in_initializer)，而在非严格模式下则会被忽略。

### 删除、添加或修改的属性

`for...in` 按以下方式访问属性键：

1. 它首先获取当前对象的所有自有的字符串键，其方式与 [`Object.getOwnPropertyNames()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) 非常相似。
2. 对于每一个键，如果没有访问过具有相同值的字符串，则[获取属性描述符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor)并只访问可枚举的属性。但是，即使该属性不可枚举，也会标记为已访问。
3. 然后，当前对象被替换为其原型，并重复上述过程。

这意味着：

- 任何在迭代过程中被添加到当前访问对象中的属性都不会被访问到，因为当前对象的所有自有属性已经被保存了。
- 如果原型链中多个对象具有相同名称的属性，则只会访问第一个，并且只有它是可枚举时才会被访问。如果它是不可枚举的，则不会访问具有相同名称的任何其他属性，即使它们也是可枚举的。

一般来说，最好不要在迭代过程中添加、修改或删除对象属性，除非是正在访问的属性。规范明确允许实现可以在以下情况下不遵循上述算法：

- 在迭代过程中修改对象的原型链。
- 在迭代过程中从对象或其原型链中删除属性。
- 在迭代过程中向对象原型链中添加属性。
- 在迭代过程中更改属性的可枚举性。

在这些情况下，实现可能与你期望的行为不同，甚至可能与其他实现不同。

### [数组迭代和 for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#%E6%95%B0%E7%BB%84%E8%BF%AD%E4%BB%A3%E5%92%8C_for...in)

数组索引只是具有整数名称的可枚举属性，除此之外与一般对象属性完全相同。`for...in` 循环将在遍历其他键之前遍历所有整数键，并且按照严格递增的顺序进行，使得 `for...in` 的行为接近正常的数组迭代。然而，`for...in` 循环会返回所有可枚举属性，包括那些具有非整数名称和被继承的属性。与 `for...of` 不同，`for...in` 使用属性枚举而不是数组的迭代器。在[稀疏数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E7%A8%80%E7%96%8F%E6%95%B0%E7%BB%84)中，`for...of` 会访问空槽，但 `for...in` 不会访问空槽。

最好使用带有数值索引的 [`for`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for) 循环、[`Array.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 或 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环，因为它们会将索引作为数字而不是字符串返回，并且还会避免非索引属性的干扰。

### [仅迭代自身的属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#%E4%BB%85%E8%BF%AD%E4%BB%A3%E8%87%AA%E8%BA%AB%E7%9A%84%E5%B1%9E%E6%80%A7)

如果你只想迭代对象本身的属性，而不是它的原型，你可以使用以下技术之一：

- [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [`Object.getOwnPropertyNames()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

`Object.keys` 会返回一个包含所有可枚举的自有字符串属性的数组，而 `Object.getOwnPropertyNames` 则会包含所有属性，包括不可枚举的。

许多 JavaScript 风格指南和代码检查工具建议避免使用 `for...in` 循环，因为它会遍历整个原型链，这很少是我们想要的，并且可能会与更常用的 `for...of` 循环混淆。`for...in` 循环最常用于调试目的，它是一种简单的方式来检查对象的属性（通过向控制台输出或其他方式）。在对象被用作临时键值对的情况下，`for...in` 循环可以检查这些键中是否存在持有特定值的键。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#%E7%A4%BA%E4%BE%8B)

## [使用 for ... in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#%E4%BD%BF%E7%94%A8_for_..._in)

下面的 `for...in` 循环迭代对象所有可枚举的非符号属性，并输出属性名和对应值的字符串。

jsCopy to Clipboard

```
const obj = { a: 1, b: 2, c: 3 };

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

// 输出：
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```

### [迭代自有属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#%E8%BF%AD%E4%BB%A3%E8%87%AA%E6%9C%89%E5%B1%9E%E6%80%A7)

下面的函数展示了 [`Object.hasOwn()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn) 的用法：继承的属性不会显示。

jsCopy to Clipboard

```
const triangle = { a: 1, b: 2, c: 3 };

function ColoredTriangle() {
  this.color = "红色";
}

ColoredTriangle.prototype = triangle;

const obj = new ColoredTriangle();

for (const prop in obj) {
  if (Object.hasOwn(obj, prop)) {
    console.log(`obj.${prop} = ${obj[prop]}`);
  }
}

// 输出：
// "obj.color = 红色"
```

### [并发修改](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in#%E5%B9%B6%E5%8F%91%E4%BF%AE%E6%94%B9)

**警告：**你不应该自己编写类似的代码。这里仅仅展示了 `for...in` 在某些极端情况下的行为。

在迭代期间添加到当前对象的属性永远不会被访问：

jsCopy to Clipboard

```
const obj = { a: 1, b: 2 };

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
  obj.c = 3;
}

// 输出：
// obj.a = 1
// obj.b = 2
```

被遮蔽（shadowed）的属性只会被访问一次：

jsCopy to Clipboard

```
const proto = { a: 1 };
const obj = { __proto__: proto, a: 2 };

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

// 输出：
// obj.a = 2

Object.defineProperty(obj, "a", { enumerable: false });

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}
// 没有输出，因为第一个“a”属性已经被访问过，并且是不可枚举的。
```

此外，请考虑以下情况，即行为是未指定的，并且实现往往偏离规定的算法：

在迭代过程中更改原型链：

jsCopy to Clipboard

```
const obj = { a: 1, b: 2 };

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
  Object.setPrototypeOf(obj, { c: 3 });
}
```

在迭代过程中删除属性：

jsCopy to Clipboard

```
const obj = { a: 1, b: 2, c: 3 };

// 在属性被访问前删除它
for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
  delete obj.c;
}

const obj2 = { a: 1, b: 2, c: 3 };

// 在属性被访问后删除它
for (const prop in obj2) {
  console.log(`obj2.${prop} = ${obj2[prop]}`);
  delete obj2.a;
}
```

在迭代过程中向原型链添加可枚举属性：

jsCopy to Clipboard

```
const proto = {};
const obj = { __proto__: proto, a: 1, b: 2 };

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
  proto.c = 3;
}
```

在迭代过程中修改属性的可枚举性：

jsCopy to Clipboard

```
const obj = { a: 1, b: 2, c: 3 };

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
  Object.defineProperty(obj, "c", { enumerable: false });
}
```