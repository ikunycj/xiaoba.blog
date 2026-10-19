# [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

**`RegExp`** 对象用于将文本与一个模式匹配。

有关正则表达式的介绍，请阅读 [JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)中的[正则表达式章节](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E6%8F%8F%E8%BF%B0)

### [字面量和构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E5%AD%97%E9%9D%A2%E9%87%8F%E5%92%8C%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)

有两种方法可以创建一个 `RegExp` 对象：一种是字面量，另一种是构造函数。

[字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E5%AD%97%E9%9D%A2%E9%87%8F)

由斜杠 (/) 包围而不是引号包围。

[构造函数的字符串参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8F%82%E6%95%B0)

由引号而不是斜杠包围。

以下三种表达式都会创建相同的正则表达式：

jsCopy to Clipboard

```
/ab+c/i; //字面量形式
new RegExp("ab+c", "i"); // 首个参数为字符串模式的构造函数
new RegExp(/ab+c/, "i"); // 首个参数为常规字面量的构造函数
```

当表达式被赋值时，字面量形式提供正则表达式的编译（compilation）状态，当正则表达式保持为常量时使用字面量。例如当你在循环中使用字面量构造一个正则表达式时，正则表达式不会在每一次迭代中都被重新编译（recompiled）。

而正则表达式对象的构造函数，如 `new RegExp('ab+c')` 提供了正则表达式运行时编译（runtime compilation）。如果你知道正则表达式模式将会改变，或者你事先不知道什么模式，而是从另一个来源获取，如用户输入，这些情况都可以使用构造函数。

### [构造函数中的标志参数 (flags)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E4%B8%AD%E7%9A%84%E6%A0%87%E5%BF%97%E5%8F%82%E6%95%B0_flags)

从 ECMAScript 6 开始，当第一个参数为正则表达式而第二个标志参数存在时，`new RegExp(/ab+c/, 'i')` 不再抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)（`"从另一个 RegExp 构造一个 RegExp 时无法提供标志"`）的异常，取而代之，将使用这些参数创建一个新的正则表达式。

当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 `\`）。

比如，以下是等价的：

jsCopy to Clipboard

```
var re = new RegExp("\\w+");
var re = /\w+/;
```

### [Perl-like RegExp 属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#perl-like_regexp_%E5%B1%9E%E6%80%A7)

请注意，[`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)属性有长名称和短名称（类似 Perl）。两个名称总是引用同一个值。（Perl 是 JavaScript 为其正则表达式建模的编程语言）。另请参见[不推荐使用的 RegExp 属性。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features#regexp_properties)

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)

[`RegExp()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)

创建一个新的 `RegExp` 对象。

## [静态属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E9%9D%99%E6%80%81%E5%B1%9E%E6%80%A7)

[`RegExp[Symbol.species]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.species)

该构造函数用于创建派生对象。

[`RegExp.lastIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)

该索引表示从哪里开始下一个匹配

## [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)

[`RegExp.prototype.flags`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags)

含有 `RegExp` 对象 flags 的字符串。

[`RegExp.prototype.dotAll`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll)

`.` 是否要匹配新行（newlines）。

[`RegExp.prototype.global`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)

针对字符串中所有可能的匹配项测试正则表达式，还是仅针对第一个匹配项。

[`RegExp.prototype.ignoreCase`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase)

匹配文本的时候是否忽略大小写。

[`RegExp.prototype.multiline`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline)

是否进行多行搜索。

[`RegExp.prototype.source`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)

正则表达式的文本。

[`RegExp.prototype.sticky`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky)

搜索是否是 sticky。

[`RegExp.prototype.unicode`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode)

Unicode 功能是否开启。

## [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)

[`RegExp.prototype.compile()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/compile)

运行脚本的期间（重新）编译正则表达式。

[`RegExp.prototype.exec()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

在该字符串中执行匹配项的搜索。

[`RegExp.prototype.test()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

该正则在字符串里是否有匹配。

[`RegExp.prototype[Symbol.match]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.match)

对给定字符串执行匹配并返回匹配结果。

[`RegExp.prototype[Symbol.matchAll]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.matchAll)

对给定字符串执行匹配，返回所有匹配结果。

[`RegExp.prototype[Symbol.replace]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.replace)

给定新的子串，替换所有匹配结果。

[`RegExp.prototype[Symbol.search]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.search)

在给定字符串中搜索匹配项，并返回在字符串中找到字符索引。

[`RegExp.prototype[Symbol.split]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.split)

通过将给定字符串拆分为子字符串，并返回字符串形成的数组。

[`RegExp.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/toString)

返回表示指定对象的字符串。重写[`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)方法。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E7%A4%BA%E4%BE%8B)

### [使用正则改变数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E4%BD%BF%E7%94%A8%E6%AD%A3%E5%88%99%E6%94%B9%E5%8F%98%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)

下例使用 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的 [`replace()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 方法去匹配姓名 _first last_ 输出新的格式 _last_, _first_。

在替换的文本中，脚本中使用 `$1` 和 `$2` 指明括号里先前的匹配。

jsCopy to Clipboard

```
let re = /(\w+)\s(\w+)/;
let str = "John Smith";
let newstr = str.replace(re, "$2, $1");
console.log(newstr);
```

这将显示 "Smith, John".

### [使用正则来划分带有多种行结束符和换行符的文本](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E4%BD%BF%E7%94%A8%E6%AD%A3%E5%88%99%E6%9D%A5%E5%88%92%E5%88%86%E5%B8%A6%E6%9C%89%E5%A4%9A%E7%A7%8D%E8%A1%8C%E7%BB%93%E6%9D%9F%E7%AC%A6%E5%92%8C%E6%8D%A2%E8%A1%8C%E7%AC%A6%E7%9A%84%E6%96%87%E6%9C%AC)

对于不同的平台（Unix，Windows 等等），其默认的行结束符是不一样的。而下面的划分方式适用于所有平台。

let text = 'Some text\nAnd some more\r\nAnd yet\rThis is the end'
let lines = text.split(/\r\n|\r|\n/)
console.log(lines) // logs [ 'Some text', 'And some more', 'And yet', 'This is the end' ]

注意：在正则表达式中，以竖线分割的子模式的顺序会影响匹配结果。

### [在多行文本中使用正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E5%9C%A8%E5%A4%9A%E8%A1%8C%E6%96%87%E6%9C%AC%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)

jsCopy to Clipboard

```
let s = "Please yes\nmake my day!";

s.match(/yes.*day/);
// Returns null

s.match(/yes[^]*day/);
// Returns 'yes\nmake my day'
```

### [使用带有 sticky 标志的正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E4%BD%BF%E7%94%A8%E5%B8%A6%E6%9C%89_sticky_%E6%A0%87%E5%BF%97%E7%9A%84%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)

带有[`sticky`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky)标志的正则表达式将会从源字符串的[`RegExp.prototype.lastIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)位置开始匹配，也就是进行“粘性匹配”。

jsCopy to Clipboard

```
let str = "#foo#";
let regex = /foo/y;

regex.lastIndex = 1;
regex.test(str); // true
regex.lastIndex = 5;
regex.test(str); // false (lastIndex is taken into account with sticky flag)
regex.lastIndex; // 0 (reset after match failure)
```

### [sticky 标志和 global 标志的不同点](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#sticky_%E6%A0%87%E5%BF%97%E5%92%8C_global_%E6%A0%87%E5%BF%97%E7%9A%84%E4%B8%8D%E5%90%8C%E7%82%B9)

如果正则表达式有粘性 `y` 标志，下一次匹配一定在 `lastIndex` 位置开始；如果正则表达式有全局 `g` 标志，下一次匹配可能在 `lastIndex` 位置开始，也可能在这个位置的后面开始。

jsCopy to Clipboard

```
re = /\d/y;
while ((r = re.exec("123 456")))
  console.log(r, "AND re.lastIndex", re.lastIndex);

// [ '1', index: 0, input: '123 456', groups: undefined ] AND re.lastIndex 1
// [ '2', index: 1, input: '123 456', groups: undefined ] AND re.lastIndex 2
// [ '3', index: 2, input: '123 456', groups: undefined ] AND re.lastIndex 3
//   ... and no more match.
```

如果使用带有全局标志`g`的正则表达式`re`，就会捕获字符串中的所有 6 个数字，而非 3 个

### [使用正则表达式和 Unicode 字符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E4%BD%BF%E7%94%A8%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%92%8C_unicode_%E5%AD%97%E7%AC%A6)

正如上面表格提到的，`\w` 或 `\W` 只会匹配基本的 ASCII 字符；如 `a` 到 `z`、 `A` 到 `Z`、 `0` 到 `9` 及 `_`。

为了匹配其他语言中的字符，如西里尔（Cyrillic）或 希伯来语（Hebrew），要使用 `\uhhhh`，`hhhh` 表示以十六进制表示的字符的 Unicode 值。

下例展示了怎样从一个单词中分离出 Unicode 字符。

jsCopy to Clipboard

```
let text = "Образец text на русском языке";
let regex = /[\u0400-\u04FF]+/g;

let match = regex.exec(text);
console.log(match[0]); // prints "Образец"
console.log(regex.lastIndex); // prints "7"

let match2 = regex.exec(text);
console.log(match2[0]); // prints "на" [did not print "text"]
console.log(regex.lastIndex); // prints "15"

// and so on
```

[Unicode 属性转义特性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape)引入了一种解决方案，它允许使用像\p{scx=Cyrl}这样简单的语句。这里有一个外部资源，用来获取 Unicode 中的不同区块范围：[Regexp-unicode-block](http://kourge.net/projects/regexp-unicode-block)

### [从 URL 中提取子域名](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%E4%BB%8E_url_%E4%B8%AD%E6%8F%90%E5%8F%96%E5%AD%90%E5%9F%9F%E5%90%8D)

jsCopy to Clipboard

```
var url = "http://xxx.domain.com";
console.log(/[^.]+/.exec(url)[0].substr(7)); // logs "xxx"
```

**备注：** 使用浏览器内建的[URL API](https://developer.mozilla.org/zh-CN/docs/Web/API/URL_API)而非正则表达式来解析 URL 是更好的做法