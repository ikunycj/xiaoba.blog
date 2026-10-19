# break

**`break`** 语句终止当前循环或 [`switch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch) 语句，并将程序控制权转移到终止语句后的语句。当在带有标签的语句内部使用时，它还可以用于跳过该[标记语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label)。
## 语法
```js
break;
break label;
```

[`label`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/break#label) 可选
与要中断的语句的标签关联的标识符。如果 `break` 语句未嵌套在循环或 [`switch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch) 中，则需要标签标识符`lable`。

## 描述
执行到 `break;` 时，程序会跳出最内层的 `switch` 或[循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements#%E8%BF%AD%E4%BB%A3)语句，并继续执行其后的下一条语句。

执行到 `break label;` 时，程序会跳出标记为 `label` 的语句，并继续执行其后的下一条语句。`break` 语句需要嵌套在引用的标签内。标记语句可以是任何语句（通常是[块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)语句），它不一定是另一个循环语句。

即使函数或类进一步嵌套在循环中，`break` 语句（无论是否带有标签）也不能在脚本、模块、函数体或[静态初始化块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks)的顶层使用。

## 示例

### [中断 while 循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/break#%E4%B8%AD%E6%96%AD_while_%E5%BE%AA%E7%8E%AF)

以下函数有一个 `break` 语句，当 `i` 等于 3 时终止 [`while`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while) 循环，然后返回值 `3 * x`。
```js
function testBreak(x) {
  let i = 0;

  while (i < 6) {
    if (i === 3) {
      break;
    }
    i += 1;
  }

  return i * x;
}
```

### switch 语句中的 break

以下代码有一个 `break` 语句，当匹配到一个 `case` 并执行完相应的代码后，会终止 [`switch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch) 语句。
```js
const food = "寿司";

switch (food) {
  case "寿司":
    console.log("寿司原产于日本。");
    break;
  case "披萨":
    console.log("披萨原产于意大利。");
    break;
  default:
    console.log("我从未听说过这道菜。");
    break;
}
```

### 带标签的 break 语句

以下代码展示了如何使用带标签的 `break` 语句。通过使用 `break outerBlock` 语句，可以跳出标记为 `outerBlock` 的嵌套循环或块语句。
```
outerBlock: {
  innerBlock: {
    console.log("1");
    break outerBlock; // 同时跳出 innerBlock 和 outerBlock
    console.log(":-("); // 跳过这一行
  }
  console.log("2"); // 跳过这一行
}
```

### 非法 break 语句

==一个 `break` 语句必须嵌套在它引用的任何标签内部==。

以下代码也使用了带 `break` 语句的标签，但是会产生语法错误，因为其 `break` 语句引用了 `block2`，但它并未嵌套在 `block2` 内。
```
block1: {
  console.log("1");
  break block2; // SyntaxError: label not found
}

block2: {
  console.log("2");
}
```

以下代码示例中，在嵌套在循环或带标签块中的函数内使用 `break` 语句也会产生语法错误，而 `break` 语句旨在跳出这些循环或带标签块。
```js
function testBreak(x) {
  let i = 0;

  while (i < 6) {
    if (i === 3) {
      (() => {
        break;
      })();
    }
    i += 1;
  }

  return i * x;
}

testBreak(1); // SyntaxError: Illegal break statement
```

```js
block1: {
  console.log("1");
  (() => {
    break block1; // SyntaxError: Undefined label 'block1'
  })();
}
```