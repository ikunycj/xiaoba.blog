# [Marh](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

**`Math`** 是一个内置对象，它拥有一些数学常数属性和数学函数方法。`Math` 不是一个函数对象。

`Math` 用于 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 类型。它不支持 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。

## 描述

与其他全局对象不同的是，`Math` 不是一个构造器。`Math` 的所有属性与方法都是静态的。引用圆周率的写法是 `Math.PI`，调用正余弦函数的写法是 `Math.sin(x)`，`x` 是要传入的参数。`Math` 的常量是使用 JavaScript 中的全精度浮点数来定义的。

## 静态属性

### [`Math.E`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/E)
欧拉数，即自然对数的底数，约等于 `2.718`。

### [`Math.LN2`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/LN2)
`2` 的自然对数，约等于 `0.693`。

### [`Math.LN10`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/LN10)
`10` 的自然对数，约等于 `2.303`。

### [`Math.LOG2E`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG2E)
以 `2` 为底的 `E` 的对数，约等于 `1.443`。

### [`Math.LOG10E`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG10E)
以 `10` 为底的 `E` 的对数，约等于 `0.434`。

### [`Math.PI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/PI)
圆周率，一个圆的周长和直径之比，约等于 `3.14159`。

### [`Math.SQRT1_2`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT1_2)
二分之一 ½ 的平方根，同时也是 `2` 的平方根的倒数 12，约等于 `0.707`。

### [`Math.SQRT2`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT2)
`2` 的平方根，约等于 `1.414`。

## 方法
**备注：** 需要注意的是，三角函数 `sin()`、`cos()`、`tan()`、`asin()`、`acos()`、`atan()` 和 `atan2()` 返回的值是 _弧度_ 而非角度。若要转换，弧度除以 `(Math.PI / 180)` 即可转换为角度，同理，角度乘以这个数则能转换为弧度。

**备注：** 需要注意的是，很多 `Math` 函数都有一个精度，而且这个精度在不同实现中也是不相同的。这意味着不同的浏览器会给出不同的结果，甚至，在不同的系统或架构下，相同的 JS 引擎也会给出不同的结果！

### [`Math.abs(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)
返回一个数的绝对值。

### [`Math.cbrt(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt)
返回一个数的立方根。

### [`Math.ceil(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
返回大于一个数的最小整数，即一个数向上取整后的值。

### [`Math.clz32(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32)
返回一个 32 位整数的前导零的数量。

### [`Math.cos(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cos)
返回一个数的余弦值。

### [`Math.expm1(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1)
返回 `exp(x) - 1` 的值。

### [`Math.floor(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
返回小于一个数的最大整数，即一个数向下取整后的值。

### [`Math.fround(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/fround)
返回最接近一个数的[单精度浮点型](https://zh.wikipedia.org/wiki/%E5%96%AE%E7%B2%BE%E5%BA%A6%E6%B5%AE%E9%BB%9E%E6%95%B8)表示。

### [`Math.log(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log)
返回一个数的自然对数（㏒e，即 ㏑）。

### [`Math.log10(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log10)
返回一个数以 10 为底数的对数。

### [`Math.log2(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log2)
返回一个数以 2 为底数的对数。

### [`Math.max([x[, y[, …]]])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
返回零到多个数值中最大值。

### [`Math.min([x[, y[, …]]])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
返回零到多个数值中最小值。

### [`Math.pow(x, y)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)
返回一个数的 y 次幂。

### [`Math.random()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
返回一个 0 到 1 之间的伪随机数。`[0,1)`

### [`Math.round(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
返回四舍五入后的整数。

### [`Math.sign(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)
返回一个数的符号，得知一个数是正数、负数还是 0。

###[`Math.sin(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sin)
返回一个数的正弦值。
### [`Math.sqrt(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt)
返回一个数的平方根。
### [`Math.toSource()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math#math.tosource)
返回字符串 `"Math"`。

### [`Math.trunc(x)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)
返回一个数的整数部分，直接去除其小数点及之后的部分。


