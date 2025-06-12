# Error
当运行时错误产生时，`Error` 对象会被抛出。`Error` 对象也可用于用户自定义的异常的基础对象。下面列出了各种内建的标准错误类型。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E6%8F%8F%E8%BF%B0)

当代码运行时的发生错误，会创建新的 `Error` 对象，并将其抛出。

### [错误类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E9%94%99%E8%AF%AF%E7%B1%BB%E5%9E%8B)

除了通用的 `Error` 构造函数外，JavaScript 还有其他类型的错误构造函数。对于客户端异常，详见[异常处理语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86%E8%AF%AD%E5%8F%A5)。

[`EvalError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/EvalError)

创建一个 error 实例，表示错误的原因：与 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 有关。

[`RangeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError)

创建一个 error 实例，表示错误的原因：数值变量或参数超出其有效范围。

[`ReferenceError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)

创建一个 error 实例，表示错误的原因：无效引用。

[`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)

创建一个 error 实例，表示错误的原因：语法错误。

[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)

创建一个 error 实例，表示错误的原因：变量或参数不属于有效类型。

[`URIError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError)

创建一个 error 实例，表示错误的原因：给 [`encodeURI()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 或 [`decodeURI()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) 传递的参数无效。

[`AggregateError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)

创建一个 error 实例，其中包裹了由一个操作产生且需要报告的多个错误。如：[`Promise.any()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) 产生的错误。

[`InternalError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/InternalError) 非标准

创建一个代表 Javascript 引擎内部错误的异常抛出的实例。如：递归太多。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)

[`Error()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/Error)

创建一个新的 `Error` 对象。

## [静态方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95)

[`Error.captureStackTrace()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#error.capturestacktrace) 非标准

一个非标准的 V8 函数，用于在 Error 实例上创建 [`stack`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) 属性。

[`Error.stackTraceLimit`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#error.stacktracelimit) 非标准

一个非标准的 V8 数值属性，用于限制错误堆栈跟踪中包含堆栈帧数量。

[`Error.prepareStackTrace()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#error.preparestacktrace) 非标准 可选

一个非标准的 V8 函数，如果提供了这一函数，V8 JavaScript 引擎会调用该函数来抛出异常。这个函数允许用户提供自定义的堆栈跟踪格式。

## [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)

[`Error.prototype.message`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/message)

错误消息。对于用户创建的 `Error` 对象，这是构造函数的第一个参数提供的字符串。

[`Error.prototype.name`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/name)

错误名称。这是由构造函数决定的。

[`Error.prototype.cause`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)

表示导致当前错误被抛出的原因——通常是另一个错误。对于用户创建的 `Error` 对象，这是构造函数的第二个参数提供的值。

[`Error.prototype.fileName`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/fileName) 非标准

一个非标准的 Mozilla 属性，用于表示引发此错误的文件的路径。

[`Error.prototype.lineNumber`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/lineNumber) 非标准

一个非标准的 Mozilla 属性，用于表示引发此错误的代码所在的文件的行号。

[`Error.prototype.columnNumber`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/columnNumber) 非标准

一个非标准的 Mozilla 属性，用于表示引发此错误的代码在文件中所在行的列号。

[`Error.prototype.stack`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) 非标准

一个非标准的属性，用于堆栈跟踪。

## [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)

[`Error.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/toString)

返回表示该对象的字符串。覆盖了 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E7%A4%BA%E4%BE%8B)

### [抛出一个基本错误](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E6%8A%9B%E5%87%BA%E4%B8%80%E4%B8%AA%E5%9F%BA%E6%9C%AC%E9%94%99%E8%AF%AF)

通常你会使用 [`throw`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/throw) 关键字来抛出你创建的 `Error` 对象。可以使用 [`try...catch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch) 结构来处理异常：

jsCopy to Clipboard

```
try {
  throw new Error("Whoops!");
} catch (e) {
  console.error(e.name + ": " + e.message);
}
```

### [处理一个特定错误](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E5%A4%84%E7%90%86%E4%B8%80%E4%B8%AA%E7%89%B9%E5%AE%9A%E9%94%99%E8%AF%AF)

你可以通过判断异常的类型来特定处理某一类的异常，即判断 [`constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) 属性，当使用现代 JavaScript 引擎时，可使用 [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 关键字：

jsCopy to Clipboard

```
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.error(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.error(e.name + ": " + e.message);
  }
  // ... etc
  else {
    // If none of our cases matched leave the Error unhandled
    throw e;
  }
}
```

### [区分相似的错误](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E5%8C%BA%E5%88%86%E7%9B%B8%E4%BC%BC%E7%9A%84%E9%94%99%E8%AF%AF)

有时，对于代码块的错误需要根据其原因进行不同的处理，但错误的原因又较为相似（例如：错误的类型和消息均相同）。

如果你无法控制原有错误的抛出，那么一种方法是捕获错误然后抛出一个新的错误，并在新的错误中给出更加具体的错误消息。原始错误应该被传递到新的 `Error` 的构造函数的 `option` 参数（`cause` 属性）中，这确保了原始的错误和堆栈追踪信息在上层的 try/catch 块中可用。

以下示例展示了两种方法会在失败时抛出相似的错误（`doFailSomeWay()` 和 `doFailAnotherWay()`）：

jsCopy to Clipboard

```
function doWork() {
  try {
    doFailSomeWay();
  } catch (err) {
    throw new Error("Failed in some way", { cause: err });
  }
  try {
    doFailAnotherWay();
  } catch (err) {
    throw new Error("Failed in another way", { cause: err });
  }
}

try {
  doWork();
} catch (err) {
  switch (err.message) {
    case "Failed in some way":
      handleFailSomeWay(err.cause);
      break;
    case "Failed in another way":
      handleFailAnotherWay(err.cause);
      break;
  }
}
```

**备注：**如果你在创建一个函数库，你应该使用错误原因来区分不同的错误——而不是要求你的函数库的使用者来解析错误消息。相关的示例，请参见[提供错误原因](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/cause#providing_structured_data_as_the_error_cause)。

[自定义错误类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%94%99%E8%AF%AF%E7%B1%BB%E5%9E%8B)也可以使用 [`cause`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#error.prototype.cause) 属性，前提是通过 `super()` 调用子类的构造函数时传递 `options` 参数。

jsCopy to Clipboard

```
class MyError extends Error {
  constructor(/* some arguments */) {
    // Needs to pass both `message` and `options` to install the "cause" property.
    super(message, options);
  }
}
```

### [自定义错误类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%94%99%E8%AF%AF%E7%B1%BB%E5%9E%8B)

你可能希望自定义基于 `Error` 的异常类型，使得你能够 `throw new MyError()` 并可以使用 `instanceof MyError` 来检查某个异常的类型。这种需求的通用解决方法如下。

参考 StackOverflow 上关于[“What's a good way to extend Error in JavaScript?”](https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript)的讨论。

#### ES6 自定义错误类

**警告：**Babel 7 之前的版本可以处理 `CustomError` 类方法，但类方法需要使用 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 定义。否则，旧版本的 Babel 和其他转译器在没有[额外配置](https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend)的情况下将无法正确处理下面的代码。

**备注：**在使用 ES2015 的类时，一些浏览器会在堆栈跟踪中包含 `CustomError` 构造函数。

jsCopy to Clipboard

```
class CustomError extends Error {
  constructor(foo = "bar", ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = "CustomError";
    // Custom debugging information
    this.foo = foo;
    this.date = new Date();
  }
}

try {
  throw new CustomError("baz", "bazMessage");
} catch (e) {
  console.error(e.name); // CustomError
  console.error(e.foo); // baz
  console.error(e.message); // bazMessage
  console.error(e.stack); // stacktrace
}
```

#### ES5 自定义错误对象

**警告：**在使用原型声明时，所有浏览器都会在堆栈跟踪中包含 `CustomError` 的构造函数。

jsCopy to Clipboard

```
function CustomError(foo, message, fileName, lineNumber) {
  var instance = new Error(message, fileName, lineNumber);
  instance.foo = foo;
  Object.setPrototypeOf(instance, CustomError.prototype);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, CustomError);
  }
  return instance;
}

Object.setPrototypeOf(CustomError.prototype, Error.prototype);

Object.setPrototypeOf(CustomError, Error);

CustomError.prototype.name = "CustomError";

try {
  throw new CustomError("baz", "bazMessage");
} catch (e) {
  console.error(e.name); // CustomError
  console.error(e.foo); // baz
  console.error(e.message); // bazMessage
}
```