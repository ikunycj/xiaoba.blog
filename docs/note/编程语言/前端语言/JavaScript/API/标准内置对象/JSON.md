# [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)
**`JSON`** 命名空间对象包含用于解析 [JavaScript 对象表示法](https://json.org/)（[JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON)）和将值转换为 JSON 字符串的静态方法。

## 描述

与大多数全局对象不同，`JSON` 不是一个构造函数。不能将它与 [`new` 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 一起使用，也不能将 `JSON` 对象作为函数调用。JSON的所有属性和方法都是静态的（就像 [Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象一样）。

### JavaScript 与 JSON 的区别

JSON 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)。它基于 JavaScript 语法，但与之不同：大部分 JavaScript _不是_ JSON。例如：

[对象和数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON#%E5%AF%B9%E8%B1%A1%E5%92%8C%E6%95%B0%E7%BB%84)
属性名称必须是双引号括起来的字符串；禁止出现[尾随逗号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Trailing_commas)。

[数值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON#%E6%95%B0%E5%80%BC)
禁止出现前导零。小数点后必须至少有一位数字。不支持 `NaN` 和 `Infinity`。

任何 JSON 文本都是有效的 JavaScript 表达式，但仅限于 [JSON 超集](https://github.com/tc39/proposal-json-superset)修订之后。在修订之前，U+2028 行分隔符和 U+2029 段分隔符允许在 JSON 的字符串字面量和属性键中使用；但在 JavaScript 字符串字面量中使用同样的分隔符会导致 [`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)。

其他区别包括只允许双引号字符串，不支持 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 或注释。对于希望使用基于 JSON 的更人性化配置格式的用户，有 Babel 编译器使用的 [JSON5](https://json5.org/)，以及更常用的 [YAML](https://zh.wikipedia.org/wiki/YAML)。

在 JavaScript 对象字面量与 JSON 中，相同的文本可能代表不同的值。如需了解更多信息，请参阅[对象字面量语法与 JSON 的对比](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E5%AF%B9%E8%B1%A1%E5%AD%97%E9%9D%A2%E8%AF%AD%E6%B3%95%E4%B8%8E_json_%E7%9A%84%E5%AF%B9%E6%AF%94)。

### 完整的 JSON 语法

有效的 JSON 语法由以下语法正式定义，该语法用 [ABNF](https://zh.wikipedia.org/wiki/%E6%89%A9%E5%85%85%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F) 表示，抄自 [IETF JSON 标准（RFC）](https://datatracker.ietf.org/doc/html/rfc8259)：

```
JSON-text = object / array
begin-array     = ws %x5B ws  ; [ 左方括号
begin-object    = ws %x7B ws  ; { 左大括号
end-array       = ws %x5D ws  ; ] 右方括号
end-object      = ws %x7D ws  ; } 右大括号
name-separator  = ws %x3A ws  ; : 冒号
value-separator = ws %x2C ws  ; , 逗号
ws = *(
     %x20 /              ; 空格
     %x09 /              ; 垂直制表符
     %x0A /              ; 换行符
     %x0D                ; 回车符
     )
value = false / null / true / object / array / number / string
false = %x66.61.6c.73.65   ; false
null  = %x6e.75.6c.6c      ; null
true  = %x74.72.75.65      ; true
object = begin-object [ member *( value-separator member ) ]
         end-object
member = string name-separator value
array = begin-array [ value *( value-separator value ) ] end-array
number = [ minus ] int [ frac ] [ exp ]
decimal-point = %x2E       ; .
digit1-9 = %x31-39         ; 1-9
e = %x65 / %x45            ; e E
exp = e [ minus / plus ] 1*DIGIT
frac = decimal-point 1*DIGIT
int = zero / ( digit1-9 *DIGIT )
minus = %x2D               ; -
plus = %x2B                ; +
zero = %x30                ; 0
string = quotation-mark *char quotation-mark
char = unescaped /
    escape (
        %x22 /          ; "    引号     U+0022
        %x5C /          ; \    反斜杠   U+005C
        %x2F /          ; /    正斜杠   U+002F
        %x62 /          ; b    退格符   U+0008
        %x66 /          ; f    换页符   U+000C
        %x6E /          ; n    换行符   U+000A
        %x72 /          ; r    回车符   U+000D
        %x74 /          ; t    制表符   U+0009
        %x75 4HEXDIG )  ; uXXXX        U+XXXX
escape = %x5C              ; \
quotation-mark = %x22      ; "
unescaped = %x20-21 / %x23-5B / %x5D-10FFFF
HEXDIG = DIGIT / %x41-46 / %x61-66   ; 0-9, A-F, or a-f
       ; HEXDIG 等效于 [RFC5234] 中的 HEXDIG 规则
DIGIT = %x30-39            ; 0-9
      ; DIGIT 等效于 [RFC5234] 的 DIGIT 规则
```

无关紧要的[空白符](https://developer.mozilla.org/zh-CN/docs/Glossary/Whitespace)可以出现在任何地方，但不包括在 `JSONNumber`（数字不得包含空白）或 `JSONString`（字符串中的相应字符会被解释为空白，否则会导致错误）中。制表符（[U+0009](https://symbl.cc/cn/0009/)）、回车符（[U+000D](https://symbl.cc/cn/000D/)）、换行符（[U+000A](https://symbl.cc/cn/000A/)）和空格（[U+0020](https://symbl.cc/cn/0020/)）字符是唯一有效的空白字符。

## 静态属性

### [`JSON[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON#jsonsymbol.tostringtag)

[`[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值为字符串 `"JSON"`。该属性在 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 中使用。

## 静态方法

### [`JSON.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

解析 JSON 字符串并返回对应的值，可以额外传入一个转换函数，用来将生成的值和其属性，在返回之前进行某些修改。

```js
JSON.parse(text)
JSON.parse(text, reviver)
```

### [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

返回与指定值对应的 JSON 字符串，可以通过额外的参数，控制仅包含某些属性，或者以自定义方法来替换某些属性值。
- 如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性

```js
JSON.stringify(value[, replacer [, space]])
```

## 示例

### 示例 JSON

```json
{
  "browsers": {
    "firefox": {
      "name": "Firefox",
      "pref_url": "about:config",
      "releases": {
        "1": {
          "release_date": "2004-11-09",
          "status": "retired",
          "engine": "Gecko",
          "engine_version": "1.7"
        }
      }
    }
  }
}
```

你可以使用 [`JSON.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 方法将上述 JSON 字符串转化为 JavaScript 对象：
```js
const jsonText = `{
  "browsers": {
    "firefox": {
      "name": "Firefox",
      "pref_url": "about:config",
      "releases": {
        "1": {
          "release_date": "2004-11-09",
          "status": "retired",
          "engine": "Gecko",
          "engine_version": "1.7"
        }
      }
    }
  }
}`;

console.log(JSON.parse(jsonText));
```