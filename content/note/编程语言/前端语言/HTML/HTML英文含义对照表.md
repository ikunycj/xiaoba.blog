# 一.标签
## `<a>` anchor 链接，锚点
[`<a>`标签详情](https://www.runoob.com/tags/tag-a.html)
##  `<b>` bold 粗体
## `<bdo>` bidirectional override 双向替代
## `<br>` break 换行
## `<hr>` horizontal rule 水平分割线
## `<i>` italic 斜体
## `<meta>` metadata 标签用于提供关于HTML文档的元数据。
## `<pre>` preformatted text 预格式化文本
## `<ul>`（unordered list）
`<ul>` 标签用于定义一个无序列表。无序列表中的每个项目通常会以一个圆点（bullet）作为标记。一个无序列表可以包含多个列表项 (`<li>` 标签)。
##### `<li>`（list item）
`<li>` 标签用于定义无序列表 (`<ul>`) 或有序列表 (`<ol>`) 中的每个项目。每个 `<li>` 标签表示一个列表项。
# 二.属性
## `href` hypertext reference 超文本 链接
## `src` source 外部资源
## `dir="rtl"` direction: right to left
## `alt` alternative text（替代文本）
## `enctype` encoding type 编码方式
# 三.缩写含义
### `CORS`（Cross-Origin Resource Sharing，跨域资源共享）
是一种机制，它允许Web应用服务器控制资源的共享策略，从而允许或禁止不同源（域）的网页对服务器上的资源进行请求。CORS通过添加新的HTTP头来告诉浏览器哪些跨域请求是被允许的。
### `MIME`（Multipurpose Internet Mail Extensions，多用途互联网邮件扩展）
是一种互联网标准，它扩展了电子邮件协议，使其能够发送不仅仅是纯文本的电子邮件，还包括多种类型的内容，如文本、图像、音频、视频和其他应用程序专用数据。MIME不仅用于电子邮件，还被广泛用于Web技术来标识各种互联网文件类型。


## `ARIA`（Accessible Rich Internet Applications，可访问的富互联网应用）
是一套由W3C定义的技术规范，旨在增强Web应用的可访问性。通过为HTML元素添加特殊属性，ARIA帮助辅助技术（如屏幕阅读器）更好地理解和呈现Web内容。ARIA属性可以使复杂的用户界面组件（如导航菜单、标签页、动态内容更新等）对残障用户更加友好。

### ARIA属性分类

ARIA属性分为三个主要类别：角色（roles）、属性（properties）和状态（states）。

#### 1. 角色（Roles）

角色定义了元素在用户界面中的功能。常见的ARIA角色包括：

- **alert**: 表示紧急通知。
- **button**: 表示可点击的按钮。
- **checkbox**: 表示复选框。
- **dialog**: 表示对话框。
- **navigation**: 表示导航部分。
- **progressbar**: 表示进度条。
示例：
```html
<button role="button">点击我</button>
```

<button role="button">点击我</button>
#### 2. 属性（Properties）

ARIA属性提供了关于元素的额外信息。常见的ARIA属性包括：

- **aria-labelledby**: 指定一个或多个元素的ID，这些元素为当前元素提供标签。
- **aria-describedby**: 指定一个或多个元素的ID，这些元素为当前元素提供描述。
- **aria-hidden**: 指示元素是否对辅助技术隐藏。

```html
<div id="description">这是一个描述文本。</div> 
<button aria-describedby="description">点击我</button>
```

#### 3. 状态（States）

ARIA状态表示元素的动态状态。常见的ARIA状态包括：

- **aria-checked**: 指示复选框是否被选中。
- **aria-disabled**: 指示元素是否被禁用。
- **aria-expanded**: 指示可折叠元素是否展开。

```html
<button aria-expanded="false">展开更多</button>
```






# 四HTML 标签简写及全称

| 标签          | 英文全称                      | 中文说明             |
| ----------- | ------------------------- | ---------------- |
| a           | Anchor                    | 锚                |
| abbr        | Abbreviation              | 缩写词              |
| acronym     | Acronym                   | 取首字母的缩写词         |
| address     | Address                   | 地址               |
| alt         | alter                     | 替用(一般是图片显示不出的提示) |
| b           | Bold                      | 粗体（文本）           |
| bdo         | Bi-Directional Override   | 文本显示方向           |
| big         | Big                       | 变大（文本）           |
| blockquote  | Block Quotation           | 区块引用语            |
| br          | Break                     | 换行               |
| cell        | cell                      | 单元格              |
| cellpadding | cellpadding               | 单元格填充            |
| cellspacing | cellspacing               | 单元格间距            |
| center      | Centered                  | 居中（文本）           |
| cite        | Citation                  | 引用               |
| code        | Code                      | 源代码（文本）          |
| dd          | Definition Description    | 定义描述             |
| del         | Deleted                   | 删除（的文本）          |
| dfn         | Defines a Definition Term | 定义定义条目           |
| div         | Division                  | 分隔               |
| dl          | Definition List           | 定义列表             |
| dt          | Definition Term           | 定义术语             |
| em          | Emphasized                | 加重（文本）           |
| font        | Font                      | 字体               |
| h1~h6       | Header 1 to Header 6      | 标题1到标题6          |
| hr          | Horizontal Rule           | 水平尺              |
| href        | hypertext reference       | 超文本引用            |
| i           | Italic                    | 斜体（文本）           |
| iframe      | Inline frame              | 定义内联框架           |
| ins         | Inserted                  | 插入（的文本）          |
| kbd         | Keyboard                  | 键盘（文本）           |
| li          | List Item                 | 列表项目             |
| nl          | navigation lists          | 导航列表             |
| ol          | Ordered List              | 排序列表             |
| optgroup    | Option group              | 定义选项组            |
| p           | Paragraph                 | 段落               |
| pre         | Preformatted              | 预定义格式（文本 ）       |
| q           | Quotation                 | 引用语              |
| rel         | Reload                    | 加载               |
| s/ strike   | Strikethrough             | 删除线              |
| samp        | Sample                    | 示例（文本            |
| small       | Small                     | 变小（文本）           |
| span        | Span                      | 范围               |
| src         | Source                    | 源文件链接            |
| strong      | Strong                    | 加重（文本）           |
| sub         | Subscripted               | 下标（文本）           |
| sup         | Superscripted             | 上标（文本）           |
| td          | table data cell           | 表格中的一个单元格        |
| th          | table header cell         | 表格中的表头           |
| tr          | table row                 | 表格中的一行           |
| tt          | Teletype                  | 打印机（文本）          |
| u           | Underlined                | 下划线（文本）          |
| ul          | Unordered List            | 不排序列表            |
| var         | Variable                  | 变量（文本）           |