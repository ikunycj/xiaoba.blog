**`do...while`** 语句创建了一个循环，只要测试条件为 true，该循环就会执行指定语句。执行语句后会对条件进行评估，从而使指定语句至少执行一次。
## 语法
```js
do
  statement
while (condition);
```

[`statement`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while#statement)
执行至少一次的语句，并在每次条件值为真时重新执行。想在循环中执行多行语句，可使用[块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)语句包裹这些语句。

[`condition`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while#condition)

循环中每次都会计算的表达式。如果 `condition` [值为真](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)，`statement` 会再次执行。当 `condition` [值为假](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)时，控制权传递到 `do...while` 之后的语句。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while#%E6%8F%8F%E8%BF%B0)

与其他循环语句一样，你可以在 `statement` 内使用[控制流语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements#%E6%8E%A7%E5%88%B6%E6%B5%81)：

- [`break`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/break) 停止执行 `statement`，转到循环后的第一条语句。
- [`continue`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/continue) 停止执行 `statement`，并重新评估 `condition`。

`do...while` 语句的语法要求在末尾加上分号，但如果缺少分号导致语法无效，[自动分号补全](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E8%87%AA%E5%8A%A8%E5%88%86%E5%8F%B7%E8%A1%A5%E5%85%A8)过程可能会为你插入一个分号。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while#%E7%A4%BA%E4%BE%8B)

### [使用 do...while](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while#%E4%BD%BF%E7%94%A8_do...while)

下面的例子中，`do...while` 循环至少迭代一次，并且继续迭代直到 `i` 不再小于 5 时结束。
```js
let result = "";
let i = 0;
do {
  i += 1;
  result += `${i} `;
} while (i > 0 && i < 5);
// 尽管 i === 0，但仍会进入循环，因为开始时没有进行测试

console.log(result);
```

### [使用 false 作为 do...while 条件](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while#%E4%BD%BF%E7%94%A8_false_%E4%BD%9C%E4%B8%BA_do...while_%E6%9D%A1%E4%BB%B6)

由于语句总是被执行一次，`do...while (false)` 等同于执行语句本身。这是类 C 语言中常见的习语，它允许你使用 `break` 来提前跳出分支逻辑。
```js
do {
  if (!user.loggedIn) {
    console.log("你未登陆");
    break;
  }
  const friends = user.getFriends();
  if (!friends.length) {
    console.log("未找到朋友");
    break;
  }
  for (const friend of friends) {
    handleFriend(friend);
  }
} while (false);
// 剩余代码
```

在 JavaScript 中，有一些替代方法，例如使用带有 `break` 的[带标签块语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label)：
```js
handleFriends: {
  if (!user.loggedIn) {
    console.log("你未登陆");
    break handleFriends;
  }
  const friends = user.getFriends();
  if (!friends.length) {
    console.log("未找到朋友");
    break handleFriends;
  }
  for (const friend of friends) {
    handleFriend(friend);
  }
}
```

或者使用函数：
```js
function handleFriends() {
  if (!user.loggedIn) {
    console.log("你未登陆");
    return;
  }
  const friends = user.getFriends();
  if (!friends.length) {
    console.log("未找到朋友");
    return;
  }
  for (const friend of friends) {
    handleFriend(friend);
  }
}
```

### [使用赋值作为条件](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while#%E4%BD%BF%E7%94%A8%E8%B5%8B%E5%80%BC%E4%BD%9C%E4%B8%BA%E6%9D%A1%E4%BB%B6)

在某些情况下，使用赋值作为条件是有意义的，例如这样：
```js
do {
  // …
} while ((match = regexp.exec(str)));
```

但是，当你这样做时，就会在可读性上有所取舍。在 [`while`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while) 文档中有一个[使用赋值作为条件](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while#%E4%BD%BF%E7%94%A8%E8%B5%8B%E5%80%BC%E4%BD%9C%E4%B8%BA%E6%9D%A1%E4%BB%B6)部分，其中包含了我们的建议。