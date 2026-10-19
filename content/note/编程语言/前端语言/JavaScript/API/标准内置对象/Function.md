# Function

**`Function`** 对象提供了用于处理[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)的方法。在 JavaScript 中，每个函数实际上都是一个 `Function` 对象。

## 构造函数

[`Function()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)
创建一个新的 `Function` 对象。直接调用此构造函数可以动态创建函数，但会遇到和 [`eval()  "evaluate"（求值）`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 类似的安全问题和（相对较小的）性能问题。然而，与 `eval()` 不同的是，`Function` 构造函数创建的函数只能在全局作用域中运行。

## 实例属性

以下属性定义在 `Function.prototype` 上，并且被所有 `Function` 实例共享。

### [`Function.prototype.arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/arguments) 已弃用 非标准
表示传递给该函数的参数。对于[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)、箭头函数、异步函数和生成器函数，访问 `arguments` 属性会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常。请改为在函数闭包内使用 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 对象。

### [`Function.prototype.caller`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/caller) 已弃用 非标准
表示调用该函数的函数。对于[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)、箭头函数、异步函数和生成器函数，访问 `caller` 属性会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常。

### [`Function.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
创建实例对象的构造函数。对于 `Function` 实例来说，初始值是 [`Function构造函数`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/Function) 。

以下属性是每个 `Function` 实例的自有属性。

### [`displayName`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName) 非标准 可选
函数的显示名称。

### [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
指定函数期望的参数个数。

### [`name`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
函数的名称。
`name` 属性是只读的，不能用赋值运算符修改：

### [`prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)
在使用 `function` 作为构造函数与 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 运算符一起使用时，用作新对象的原型。

## 实例方法
### [`Function.prototype.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

>[!tip] 作用
>给调用函数提供`this`和`一个参数的数组`

使用给定的 `this` 值和可选的参数数组（或[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E4%BD%BF%E7%94%A8%E7%B1%BB%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1)）作为参数来调用一个函数。

语法：
```js
apply(thisArg)
apply(thisArg, argsArray)
```

### [`Function.prototype.bind()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

>[!tip] 作用
>设置原函数的`this`和`多个参数`

`Function` 实例的 **`bind()`** 方法创建一个新函数，当调用该新函数时，它会==调用原始函数并将其 `this` 关键字设置为给定的值==，同时，还可以传入一系列指定的参数，这些参数会插入到调用新函数时传入的参数的前面。

**语法：**
```js
bind(thisArg)
bind(thisArg, arg1)
bind(thisArg, arg1, arg2)
bind(thisArg, arg1, arg2, /* …, */ argN)
```

**例子：**
```js
const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42
```


**参数：**
`thisArg`
- 在调用绑定函数时，作为 `this` 参数传入目标函数 `func` 的值。
- 如果函数不在[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 和 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 会被替换为全局对象，并且原始值会被转换为对象。如果使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 运算符构造绑定函数，则忽略该值。

`arg1, …, argN` 可选
在调用 `func` 时，插入到传入绑定函数的参数前的参数。

**返回值：**
使用指定的 `this` 值和初始参数（如果提供）创建的给定函数的副本。
### [`Function.prototype.call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

>[!tip] 作用
>给调用函数提供`this`和`多个参数`

`Function` 实例的 **`call()`** 方法会以给定的 `this` 值和==逐个==提供的参数调用该函数。

>[!notice] **备注：** 
这个函数几乎与 [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 相同，只是函数的参数以列表的形式逐个传递给 `call()`，而在 `apply()` 中它们被组合在一个对象中，通常是一个数组——例如，`func.call(this, "eat", "bananas")` 与 `func.apply(this, ["eat", "bananas"])`。

**语法：**
```js
call(thisArg)
call(thisArg, arg1)
call(thisArg, arg1, arg2)
call(thisArg, arg1, arg2, /* …, */ argN)
```

**例子：**
```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// Expected output: "cheese"
```

**参数：**
`thisArg`
在调用 `func` 时要使用的 `this` 值。如果函数不在[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 和 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 将被替换为全局对象，并且原始值将被转换为对象。

`arg1, …, argN` 可选
函数的参数。

**返回值**:
使用指定的 `this` 值和参数调用函数后的结果。

>[!caution] **警告：** 
>不要使用 `call()` 来链式调用构造函数（例如，实现继承）。这会将构造函数作为普通函数调用，这意味着 [`new.target`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target) 的值为 `undefined`，而类会抛出错误，因为它们不能在没有 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 的情况下被调用。请改用 [`Reflect.construct()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct) 或 [`extends`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends)。
### [`Function.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toString)
返回表示函数源代码的字符串。重写了 [`Object.prototype.toString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

### [`Function.prototype[Symbol.hasInstance]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/Symbol.hasInstance)
指定确定构造函数是否将对象识别为其实例的默认过程。由 [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 运算符调用。

## 示例

### Function 构造函数与函数声明之间的不同

由 `Function` 构造函数创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 `Function` 构造函数创建时所在的作用域的变量。这一点与使用 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 执行创建函数的代码不同。

```js
// 使用 `var` 创建一个全局属性
var x = 10;

function createFunction1() {
  const x = 20;
  return new Function("return x;"); // 这个 `x` 指的是全局 `x`
}

function createFunction2() {
  const x = 20;
  function f() {
    return x; // 这个 `x` 指的是上面的局部 `x`
  }
  return f;
}

const f1 = createFunction1();
console.log(f1()); // 10
const f2 = createFunction2();
console.log(f2()); // 20
```

虽然这段代码可以在浏览器中正常运行，但在 Node.js 中 `f1()` 会产生一个“找不到变量 `x`”的 `ReferenceError`。这是因为在 Node 中顶级作用域不是全局作用域，而 `x` 其实是在当前模块的作用域之中。