# JavaScript

**JavaScript**（**JS**）是一种具有[函数优先](https://developer.mozilla.org/zh-CN/docs/Glossary/First-class_Function)特性的轻量级、解释型或者说[即时编译型](https://zh.wikipedia.org/wiki/%E5%8D%B3%E6%99%82%E7%B7%A8%E8%AD%AF)的编程语言。虽然作为 Web 页面中的脚本语言被人所熟知，但是它也被用到了很多[非浏览器环境](https://zh.wikipedia.org/wiki/JavaScript#%E5%85%B6%E4%BB%96)中，例如 [Node.js](https://developer.mozilla.org/zh-CN/docs/Glossary/Node.js)、[Apache CouchDB](https://couchdb.apache.org/)、[Adobe Acrobat](https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsdk/) 等。进一步说，JavaScript 是一种[基于原型](https://developer.mozilla.org/zh-CN/docs/Glossary/Prototype-based_programming)、多范式、[单线程](https://developer.mozilla.org/zh-CN/docs/Glossary/Thread)的[动态](https://developer.mozilla.org/zh-CN/docs/Glossary/Dynamic_typing)语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。

JavaScript 的动态特性包括运行时对象的构造、变量参数列表、函数变量、动态脚本创建（通过 [`eval`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)）、对象内枚举（通过 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 和 [`Object` 工具方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95)）和源代码恢复（JavaScript 函数会存储其源代码文本，可以使用 [`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) 进行检索）。

本部分文档将专注于 JavaScript 语言本身，而不是专注于 Web 页面或其他宿主环境特有的那部分。想要了解 Web 页面特有的 [API](https://developer.mozilla.org/zh-CN/docs/Glossary/API) 信息，请参考 [Web API](https://developer.mozilla.org/zh-CN/docs/Web/API) 以及 [DOM](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM)。

JavaScript 标准是 [ECMAScript 语言规范](https://tc39.es/ecma262/)（ECMA-262）和 [ECMAScript 国际化 API 规范](https://tc39.es/ecma402/)（ECMA-402）。只要某个浏览器实现了某个特性，我们就会尝试详细记录这个特性。这意味着，当某个 [ECMAScript 新特性的提案](https://github.com/tc39/proposals)在浏览器中实现时，文档和 MDN 文章中的示例可能会使用这些新特性。大多数时候发生在[阶段](https://tc39.es/process-document/) 3 和阶段 4 之间，通常在正式发布之前。

不要将 JavaScript 与 [Java 编程语言](https://zh.wikipedia.org/wiki/Java)弄混——**JavaScript _不是_“解释型的 Java”**。“Java”和“JavaScript”都是 Oracle 公司在美国和其他国家注册（或未注册）的商标。然而，这两门编程语言有着非常不同的语法、语义和用途。

JavaScript 核心语言特性（大部分是纯 [ECMAScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/JavaScript_technologies_overview)）的文档包含以下内容：

- [JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
- [JavaScript 参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)

有关 JavaScript 规范和相关技术的更多信息，请参阅 [JavaScript 技术概述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/JavaScript_technologies_overview)。

## [教程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript#%E6%95%99%E7%A8%8B)

借助指南和教程来学习如何用 JavaScript 编程。

### [1.面向纯新手](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript#%E9%9D%A2%E5%90%91%E7%BA%AF%E6%96%B0%E6%89%8B)

如果你想学习 JavaScript，却从未接触过 JavaScript 或编程，你可以投入到我们的 [JavaScript 主题学习区](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript)。下面列出了这部分的所有章节：

#### [JavaScript 第一步](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps)
回答一些基本问题，比如“JavaScript 是什么？”、“它长什么样子？”、“它可以用来做什么？”等，还谈及如变量、字符串、数字、数组等 JavaScript 关键特性。

#### [创建 JavaScript 代码块](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks)
继续介绍 JavaScript 的关键基本特性，将注意力转向常见的代码块类型，如条件语句、循环、函数、事件等。

#### [介绍 JavaScript 对象](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects)
如果你想进一步提高对语言的了解并编写出更高效的代码，理解 JavaScript 面向对象的本质很重要，因此我们为你准备了这个模块。

#### [异步 JavaScript](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous)
探讨异步 JavaScript、为什么它很重要、如何使用它有效地处理潜在的阻塞操作（如从服务器获取资源）。

#### [客户端 web API](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs)
探讨 API 是什么、如何使用一些开发工作中最常见的 API。

### [2.JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript#javascript_%E6%8C%87%E5%8D%97)

[JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
一份非常详细的 JavaScript 指南，适用于有过 JavaScript 或其他语言编程经验的读者。

### [3.中级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript#%E4%B8%AD%E7%BA%A7)

#### [理解客户端 Javascript 框架](https://developer.mozilla.org/zh-CN/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks)
JavaScript 框架是现代前端 Web 开发必不可少的一部分，为开发者构建可扩展、交互式的 Web 应用程序提供了经过验证的工具。这个模块讨论一些客户端框架如何工作以及如何集成到工具集的基础背景知识，接着是一个讨论现在最流行框架的系列教程。

#### [JavaScript 语言概述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_overview)
JavaScript 基础语法和语义概述：帮助来自其他编程语言的读者加速学习。

#### [JavaScript 数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
JavaScript 数据结构概述。

#### [相等比较和相同](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)
JavaScript 提供了三种不同的值比较运算：严格相等运算符 `===`、非严格相等运算符 `==`，以及 [`Object.is()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 方法。

#### [属性的可枚举性和所有权](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)
不同的处理属性的可枚举性和所有权的方法——一个接着一个的访问一组对象属性。

#### [闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
闭包是由函数及其声明所在的词法环境结合而成。

### [4.高级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript#%E9%AB%98%E7%BA%A7)

#### [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
解释被广泛误解与低估的基于原型的继承。

#### [内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_management)
JavaScript 的内存生命周期和垃圾回收。

#### [事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Event_loop)
JavaScript 拥有基于“事件循环”的运行时模型。

## [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript#%E5%8F%82%E8%80%83)

浏览完整的 [JavaScript 参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)文档。

#### [标准对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
了解 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)、[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)、[`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)、[`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)、[`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)、[`JSON`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)、[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)、[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)、[`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)、[`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)、[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)、[`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)、[`WeakMap`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 、[`WeakSet`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) 等标准内置对象。

#### [表达式和运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)
学习运算符 [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)、[`typeof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)、[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)、[`this`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)，[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_precedence)，以及其他运算符的行为。

#### [语句和声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements)
学习 [`do-while`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while)、[`for-in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)、[`for-of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)、[`try-catch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)、[`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)、[`var`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)、[`const`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)、[`if-else`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/if...else)、[`switch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch) 以及其他语句和关键字的作用。

#### [函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)
学习如何使用 JavaScript 函数开发应用。

#### [类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
JavaScript 类是最适合面向对象编程的方式。