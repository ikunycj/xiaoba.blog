# 引言

## 代码质量的守护者：ESLint的价值与意义

想象这样一个场景：周一早晨，你打开电脑准备修复线上的一个紧急bug，代码定位到了一个同事上周提交的函数：

```
function calculateTotal(items) {
  let total = 0
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price
  }
  return totl  // 拼写错误：totl应为total
}
```

一个简单的拼写错误导致了线上故障，而这本可以在开发阶段就被发现。

这正是ESLint存在的价值 - 它不仅是一个代码检查工具，更是团队代码质量的守护者。通过静态分析代码，ESLint能够在开发过程中及早发现潜在问题，从拼写错误、未使用变量到不符合最佳实践的代码模式，甚至是React Hooks的错误使用方式。

ESLint的意义不仅限于发现错误，它还可以：

- 统一代码风格，使团队代码库保持一致性和可读性 （比如import-style、arrow-body-style）
- 强制执行最佳实践，避免常见的陷阱和反模式 （比如guard-for-in、for-direction、no-array-reduce）
- 通过错误提示帮助团队成员学习和改进
- 提升开发效率，将Code Review的一部分工作自动化

前端开发中，ESLint已经成为标准工具链的重要一环，与Babel、Webpack等工具一起构成了现代前端开发的基础设施。

## 为什么需要了解ESLint原理？

深入理解ESLint的工作机制能够让我们：

1. 超越"用户"角色：从仅仅会配置ESLint，到能够定制和扩展它，解决特定的业务问题
2. 提升代码分析能力：学习ESLint如何分析JavaScript代码，能够加深对JavaScript语言本身的理解
3. 成为团队中的专家：能够为团队定制专属规则，解决特定业务场景中的代码质量问题

想象一下，当团队中的React开发者经常犯同样的错误时，能够编写一个自定义规则来捕获这个问题；或者当项目有特定的编码规范需求时，能够实现一个插件来确保所有代码都符合规范。

## 自定义规则的业务价值

在我们的实际业务开发中，有许多场景是通用ESLint规则无法覆盖的：

例如：在useEffect中直接调用setState可能导致无限渲染循环

```js
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1); // 可能导致无限循环
  }, [count]);
  
  return <div{count}</div;
}
```

通用的ESLint规则可能更多从普适性的角度去考虑，从降低误报的角度设计的检查逻辑，没有对这些特定业务场景中的问题进行适配。

而自定义ESLint规则能够为我们带来显著的业务价值：

1. 提升代码质量，减少线上故障：

- 捕获特定的业务逻辑错误
- 防止常见的错误模式重复出现
- 减少因代码质量问题导致的线上故障

2. 加速开发流程：

- 自动发现问题，减少Code Review的负担
- 提供即时反馈，缩短开发-测试-修复循环，实现测试左移

3. 降低维护成本：

- 确保代码遵循一致的模式和最佳实践
- 减少技术债务的累积
- 使新团队成员更容易理解和遵循项目规范

在我们的实际项目中，我们通过优化已有规则，如eslint-plugin-react-hooks 、开发自定义规则，如`no-only-setstate-in-useeffect`，成功地减少了部分React相关bug，减少了Code Review时间。

这些都是自定义ESLint规则为业务带来的实际价值。

接下来，让我们一起深入ESLint的世界，探索它的工作原理，并学习如何开发自定义插件来满足特定的业务需求。

# ESLint基础

## ESLint的核心概念

ESLint的核心设计理念是可配置和可扩展：

1. 可配置：几乎所有规则都可以打开或关闭，许多规则还有额外的配置选项
2. 可扩展：用户可以创建自定义规则和插件，实现特定的检查需求
3. 与构建工具集成：可以与 Webpack、Rollup 等构建工具集成，成为开发流程的一部分

## 配置文件详解

ESLint 配置文件是 ESLint 工作的基础，通常命名为 `.eslintrc.js`、`.eslintrc.json` 或 `.eslintrc.yml`。一个典型的 ESLint 配置文件结构如下：

```js
module.exports = {
  parser: '@typescript-eslint/parser',  // 定义ESLint的解析器
  extends: [                           // 定义文件继承的子规范
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ], 
  plugins: [                           // 定义了该eslint文件所依赖的插件
    'react',
    '@typescript-eslint',
    'react-hooks'
  ], 
  env: {                              // 定义环境变量
    browser: true,
    node: true,
    es2021: true
  },
  rules: {                            // 具体规则配置
    'no-console': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {                         // 共享设置
    react: {
      version: 'detect'
    }
  },
  parserOptions: {                    // 解析器选项
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
};
```

接下来，需要详细了解每个配置项的作用：

### `parser` - 解析器

默认情况下，ESLint 使用内置的 Espree 解析器，一般不需要特别修改。

但可以通过此项配置其他解析器，例如：

- `@babel/eslint-parser` - 支持 Babel 实验性语法
- `@typescript-eslint/parser` - 支持 TypeScript
- `vue-eslint-parser` - 支持 Vue 单文件组件

选择正确的解析器对于处理不同类型的代码至关重要，例如：

```
// 使用 TypeScript 语法时需要 @typescript-eslint/parser
const greeting: string = "Hello";

// 使用 JSX 时需要支持 JSX 的解析器
const element = <div>Hello</div>;
```

### `extends` - 继承配置

`extends` 允许继承已有的配置，是快速设置 ESLint 的最佳方式。

它可以是：

- 预定义配置：`eslint:recommended`、`eslint:all`
- 插件提供的配置：`plugin:react/recommended`
- 共享配置：`airbnb-base`、`standard`
- 本地文件路径：`./node_modules/coding-standard/eslintDefaults.js`

例如：

```
extends: [
  'eslint:recommended',        // ESLint 推荐规则
  'plugin:react/recommended',  // React 推荐规则
  'airbnb'                     // Airbnb 风格
  'plugin:unicorn/all',       // unicorn
  'plugin:sonarjs/recommended-legacy', // sonar相关的
]
```

继承多个配置时，后面的配置会覆盖前面的配置。这种层叠机制可以在基础配置上进行更细致的调整。

### `plugins` - 插件

插件是 ESLint 的扩展，提供了额外的规则、配置等。

使用插件需要两步：

10. 在 `plugins` 数组中声明插件
11. 在 `rules` 中使用插件提供的规则，或在 `extends` 中使用插件的预设配置

```
plugins: ['react', '@typescript-eslint'],
rules: {
 'react/jsx-uses-react': 'error',
 '@typescript-eslint/no-explicit-any': 'warn'
}
```

使用插件时，规则名称通常为 `插件名/规则名`。例如：

- `eslint-plugin-react` - React 相关规则
- `eslint-plugin-import` - ES6 import/export 相关规则
- `@typescript-eslint/eslint-plugin` - TypeScript 相关规则
- `eslint-plugin-react-hooks` - React Hooks 相关规则

需要注意的是ESLint有特定的**命名约定**来简化插件的引用：

#### 插件命名约定

ESLint使用以下规则将插件名映射到实际的npm包名：

12. 标准插件：在`plugins`数组中列出`'plugin-name'`时，ESLint会自动查找名为`eslint-plugin-plugin-name`的包。

例如：`'react-hooks'` → ESLint查找`eslint-plugin-react-hooks`包

13. 范围插件：对于以`@`开头的范围插件，ESLint会查找`@scope/eslint-plugin`或`@scope/eslint-plugin-plugin-name`包。

例如：`'@typescript-eslint'` → ESLint查找`@typescript-eslint/eslint-plugin`包

这种命名约定简化了ESLint配置，让我们可以使用简短的名称引用插件，而不必每次都写完整的包名。例如，使用`'react-hooks'`代替`'eslint-plugin-react-hooks'`使配置文件更加简洁易读。

在前面作为示范的配置中：

```
plugins: [
  'react',            // 实际加载 eslint-plugin-react
  '@typescript-eslint', // 实际加载 @typescript-eslint/eslint-plugin
  'react-hooks'       // 实际加载 eslint-plugin-react-hooks
]
```

这些插件必须已通过npm安装在项目中，通常会出现在`package.json`的`devDependencies`部分。

### `env` - 环境

`env` 定义了代码运行的环境，可以自动设置一些特定的全局变量，例如：

```
env: {
  browser: true,    // 浏览器环境，定义 window, document 等全局变量
  node: true,       // Node.js 环境，定义 process, require 等全局变量
  es2021: true,     // 支持 ES2021 语法
  jest: true,       // Jest 测试环境
  'shared-node-browser': true  // 同时在 Node 和浏览器环境运行的代码
}
```

设置正确的环境可以避免"未定义变量"的警告，例如我们常见的：

```
// 如果不设置 browser: true，ESLint 会警告 document 未定义
document.getElementById('app');

// 如果不设置 node: true，ESLint 会警告 process 未定义
process.env.NODE_ENV;
```

### `rules` - 规则

`rules` 是 ESLint 配置的核心，可以精确控制每条规则的行为：

```
rules: {
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'react/prop-types': 'off',
  'indent': ['error', 2, { SwitchCase: 1 }],
  'quotes': ['error', 'single', { avoidEscape: true }]
}
```

## 规则级别与优先级

### 规则级别

ESLint 规则有三种级别，可以用字符串或数字表示：

- `"off"` 或 `0` - 完全关闭规则
- `"warn"` 或 `1` - 将规则作为警告（不会导致退出码非零）
- `"error"` 或 `2` - 将规则作为错误（退出码为1，会中断流程）

例如，以下两种写法是等价的：

```
// 字符串形式
rules: {
  'no-console': 'warn',
  'no-unused-vars': 'error',
  'react/prop-types': 'off'
}

// 数字形式
rules: {
  'no-console': 1,
  'no-unused-vars': 2,
  'react/prop-types': 0
}
```

有些规则还可以添加一些额外的配置选项：

```
// 数组的第一个元素是规则级别，后面的元素是规则配置
'quotes': ['error', 'single', { avoidEscape: true }]
```

在这个例子中：

- 规则级别为 `error`
- 第一个选项指定使用单引号
- 第二个选项允许在单引号字符串中使用双引号转义

### 配置优先级

ESLint 配置遵循特定的优先级规则：

14. 内联注释 > 配置文件 > 命令行选项

```
// 禁用整个文件的检查
/* eslint-disable */

// 禁用特定规则
/* eslint-disable no-console, no-unused-vars */

// 仅禁用下一行的特定规则
// eslint-disable-next-line no-console
console.log('debugging info');

// 仅禁用当前行的特定规则
console.log('debugging info'); // eslint-disable-line no-console
```

这对于处理特殊情况非常有用：

```
// 有时需要在特定场景下禁用某些规则
function legacyMethod() {
  /* eslint-disable no-alert  -- 这段旧代码暂时不想重构*/
  alert('This is legacy code');
  /* eslint-enable no-alert */
}
```

15. 忽略文件

通过 `.eslintignore` 文件可以指定忽略检查的文件：

```
# 忽略所有 build 目录下的文件
build/

# 忽略所有 JavaScript 文件
*.js

# 忽略特定文件
src/legacy-code.js
```

无论 `.eslintignore` 中是否有配置，ESLint 默认会忽略 `/node_modules/**` 和 `/bower_components/**` 目录。

# JavaScript AST

JavaScript 抽象语法树(AST)是JavaScript代码的结构化表示，它将源代码解析为树状结构，其中每个节点代表源代码中的一个元素。ESLint正是基于AST进行代码分析和规则检查的。

## AST基础概念

AST将JavaScript代码表示为一棵树，其中：

- 节点(Node) 代表代码中的元素（如表达式、语句、声明等）
- 边(Edge) 表示节点之间的关系

例如，以下代码：

```
function greet(name) {return "Hello, " + name;
}
```

会被解析成类似这样的AST结构：

```
FunctionDeclaration
├── id: Identifier (name: "greet")
├── params: [Identifier (name: "name")]
└── body: BlockStatement
    └── body: [ReturnStatement]
        └── argument: BinaryExpression (operator: "+")
            ├── left: Literal (value: "Hello, ")
            └── right: Identifier (name: "name")
```

结合AST Explorer工具，可以直观看到一个一个常见的React代码的AST结构 （可操作修改，看到它AST树的变化)

暂时无法在文档外展示此内容

## 常见的AST节点类型

ESLint规则开发中最常遇到的节点类型：

### `Program`

代表整个程序，是AST的根节点。

### `Identifier`

标识符，如变量名、函数名等。

```
const name = "John"; // 'name'是一个Identifier
```

### `Literal`

字面量，如字符串、数字、布尔值等。

```
const x = 42; // '42'是一个Literal
const str = "hello"; // '"hello"'是一个Literal
const flag = true; // 'true'是一个Literal
```

### `BlockStatement`

由花括号包围的代码块，如函数体、if语句块等。

以下是 `BlockStatement` 的一些常见用途和例子：

函数体：

```
function someFunction() {
  // 这是一个 BlockStatement
  const x = 1;
  const y = 2;
  return x + y;
}
```

条件语句的主体：

```
if (condition) {
  // 这是一个 BlockStatement
  console.log("Condition is true");
}
```

循环语句的主体：

```
for (let i = 0; i < 10; i++) {
  // 这是一个 BlockStatement
  console.log(i);
}
```

独立的代码块：

```
{
  // 这是一个 BlockStatementconst x = 1;
  console.log(x);
}
```

举个例子：

```
if (condition) {
  const x = 10;
  console.log(x);
}
```

AST 是这样：

```
{
  "type": "IfStatement",
  "test": {
    // 条件表达式节点 (condition)
  },
  "consequent": {
    "type": "BlockStatement",
    "body": [
      {
        "type": "VariableDeclaration",
        // 变量声明的具体细节
      },
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "CallExpression",
          // 函数调用的具体细节
        }
      }
    ]
  }
}
```

### `IfStatement`

条件语句，一般包含一个条件表达式（`test`），一个条件成立时执行的语句块（`consequent`），和一个条件不成立时执行的可选语句块（`alternate`）。

```
if (condition) { // condition 是 test
  // Consequent - 当条件成立时执行的代码块
} else {
  // Alternate - 当条件不成立时执行的代码块
}
```

### `CallExpression`

函数调用表达式。

```
console.log("Hello"); // 整个函数调用是一个CallExpression
```

### `MemberExpression`

属性访问表达式，如`object.property`或`object[property]`。

```
console.log; // console.log是一个MemberExpression
array[0]; // array[0]是一个MemberExpression
```

### `ArrowFunctionExpression`

箭头函数表达式。

```
const add = (a, b) => a + b;  // (a, b) => a + b 是一个ArrowFunctionExpression
```

### `FunctionDeclaration` 与 `FunctionExpression`

函数声明与函数表达式。

```
function test() {} // 函数声明 - FunctionDeclaration
const fn = function() {}; // 函数表达式 - FunctionExpression
```

### `VariableDeclaration` 与 `VariableDeclarator`

变量声明与变量声明符。

```
const x = 1, y = 2; // 整体是VariableDeclaration，包含两个VariableDeclarator
```

# ESLint规则开发原理

### 规则的核心组成

ESLint规则是一个模块，通过`module.exports`导出一个包含`meta`和`create`的对象：

```
module.exports = {
  meta: {/* 元数据 */},
  create: function(context) {
    // 初始化阶段
    const variableStack = [];
    
    return {
      // 进入阶段 - 当遇到特定节点时
      FunctionDeclaration(node) {
        variableStack.push(new Set());
        // 处理节点
      },
      
      // 离开阶段 - 当处理完节点时
      'FunctionDeclaration:exit'(node) {
        variableStack.pop();
        // 清理工作
      }
    };
  }
};
```

### `meta` 对象

`meta` 对象包含规则的元数据：

```
meta: {
  type: "suggestion", // 规则类型：'problem'、'suggestion'或'layout'
  docs: {
    description: "禁止在useEffect中只调用setState", // 规则描述
    category: "Best Practices", // 规则分类
    recommended: true, // 是否推荐使用
    url: "https://example.com/rules/my-rule" // 规则文档URL
  },
  fixable: "code", // 是否可自动修复：'code'或'whitespace'或null
  schema: [], // 规则选项的JSON Schema
  messages: { // 定义可重用的错误消息
    unexpected: "不应该在useEffect中直接调用setState"
  }
}
```

- `type` - 规则类型，可以是 `"problem"`（代码错误）、`"suggestion"`（代码建议）或 `"layout"`（代码格式）
- `docs` - 规则文档
    - `description` - 规则描述
    - `category` - 规则类别
    - `recommended` - 是否包含在 `eslint:recommended` 中
    - `url` - 规则文档链接
- `fixable` - 是否可自动修复，可以是 `"code"` 或 `"whitespace"`
- `schema` - 规则选项的 JSON Schema 验证规则

### `create` 函数

`create` 函数是规则的核心。它接收`context`对象，返回一个AST节点访问器对象：

```
create: function(context) {
  // 初始化阶段 - 设置状态和辅助函数
  const stack = [];
  
  function checkNode(node) {
    // 检查节点逻辑
  }
  
  // 返回访问器对象
  return {
    // 当ESLint遍历到特定类型的节点时会调用对应的方法
    
    // 进入节点时的处理
    FunctionDeclaration(node) {
      stack.push(node);
      // 检查逻辑
    },
    
    // 离开节点时的处理
    'FunctionDeclaration:exit'(node) {
      stack.pop();
      // 清理工作
    },
    
    // 其他节点类型的处理
    IfStatement(node) {
      // 检查if语句
    }
  };
}
```

它的工作流程可以简化为三个关键步骤：

16. 解析：将代码解析为抽象语法树(AST)
17. 分析：遍历 AST，应用规则进行检查
18. 报告：收集并报告发现的问题

它接收一个 `context` 对象，并返回一个包含 AST 节点访问者的对象。

结合一个“检查不必要分号”的例子：

```
create: function(context) {
    const sourceCode = context.getSourceCode();
    
    function report(node) {
        context.report({
            node,
            message: 'Unnecessary semicolon.',
            fix: fixer => fixer.remove(node)
        });
    }
    
    function checkForPartOfClassBody(firstToken) {
        for (let token = firstToken;
            token.type === "Punctuator" && !astUtils.isClosingBraceToken(token);
            token = sourceCode.getTokenAfter(token)
        ) {
            if (astUtils.isSemicolonToken(token)) {
                report(token);
            }
        }
    }
    
    return {
        EmptyStatement(node) {
            report(node);
        },
        ClassBody(node) {
            checkForPartOfClassBody(sourceCode.getFirstToken(node, 1)); // 0 is `{`.
        },
        MethodDefinition(node) {
            checkForPartOfClassBody(sourceCode.getTokenAfter(node));
        }
    };
}
```

这个例子中：

19. `context.getSourceCode()` 获取源代码对象，用于访问代码的 tokens
20. `report` 函数用于报告错误，可以包括自动修复
21. `checkForPartOfClassBody` 是一个辅助函数，检查类体中的不必要分号
22. 返回的对象包含 AST 节点类型作为键，对应的处理函数作为值

当 ESLint 遍历代码的 AST 时，会在遇到特定类型的节点时调用对应的处理函数。例如，当遇到空语句（`EmptyStatement`）时，会调用 `EmptyStatement` 函数。

### context对象的关键方法

- 1. `context.report()` 报告问题

这是最常用的方法，用于报告发现的问题：

```
context.report({
  node: node, // 问题所在的AST节点
  message: '禁止使用var声明变量', // 错误消息
  data: { name: node.name }, // 用于替换消息中的占位符
  loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 10 } }, // 可选的位置信息
  fix: function(fixer) { // 可选的自动修复函数
    return fixer.replaceText(node, 'let ' + node.name);
  }
});
```

- 2. `context.getSourceCode()` 获取源代码

提供对源代码的访问，包括获取节点的文本、注释等功能：

```
const sourceCode = context.getSourceCode();

// 获取节点的源代码文本
const nodeText = sourceCode.getText(node);

// 获取节点的前一个和后一个token
const prevToken = sourceCode.getTokenBefore(node);
const nextToken = sourceCode.getTokenAfter(node);

// 获取注释
const comments = sourceCode.getAllComments();
```

- 3. `context.getFilename()` 获取当前文件名

```
const filename = context.getFilename();
if (filename.endsWith('.test.js')) {
  // 例如，对测试文件特殊处理
}
```

- 4. `context.getScope()` 获取作用域信息

提供对当前节点作用域的访问，用于分析变量声明和引用：

```
const scope = context.getScope();

// 检查变量声明
scope.variables.forEach(variable => {
  // 分析变量使用情况
});

// 获取上级作用域
const parentScope = scope.upper;
```

- 5. `context.options` 访问规则选项

获取规则配置中传递的选项：

```
const maxDepth = context.options[0] || 3; // 默认值为3

if (depth > maxDepth) {
  context.report({
    node: node,
    message: `嵌套深度超过了${maxDepth}层`
  });
}
```

- 6. `context.parserServices` 访问解析器服务

访问解析器提供的额外服务，特别是在TypeScript等环境中：

```
if (context.parserServices.hasFullTypeInformation) {
  const type = context.parserServices.getTypeAtLocation(node);
  // 基于类型信息进行检查
}
```

# 自定义规则实战：以`no-only-setstate-in-useeffect`规则为例

## 规则开发的完整流程

### 定义问题 - 为什么需要这个规则

开发规则的第一步是明确问题和目标：

问题：在React组件中，直接在`useEffect`钩子中调用`setState`可能导致以下问题：

- 可能引发无限渲染循环（尤其在依赖数组不完全正确的情况下）
- 降低代码可读性和可维护性，难以理解副作用的真正意图
- 可能隐藏逻辑错误或更好的架构设计

目标：创建一个ESLint规则，禁止在`useEffect`中仅调用`setState`函数，包括在条件语句中的情况。

替代方案：推荐使用以下方式替代：

```
// 不推荐
const A = ({a}) => {
  const [b, setB] = useState();
  useEffect(() => {
    setB(a + 1);
  }, [a]);
}

// 推荐方案1: 直接计算
const A = ({a}) => {
  const b = a + 1;
}

// 推荐方案2: 使用useMemo
const A = ({a}) => {
  const b = useMemo(() => a + 1, [a]);
}

// 推荐方案3: 使用初始值
const A = ({a}) => {
  const [b, setB] = useState(a + 1);
}
```

### 确定检测策略 - 如何识别不合规代码

为了检测违规情况，我们需要：

23. 识别`useState`调用并收集`setState`函数名称

- 查找`useState`调用的解构
- 将`setState`函数的标识符存储在集合中

24. 检查`useEffect`的回调函数体

- 识别`useEffect`调用
- 分析其回调函数的函数体
- 检查是否只包含`setState`调用（包括在条件语句中）

25. 递归分析条件分支

- 如果`useEffect`中包含`if`语句，需要递归检查这些条件分支
- 判断条件分支中是否只包含`setState`调用

### 编写规则 - 实现检测逻辑

代码地址：https://git.n.xiaomi.com/fe/eslint-plugin-fe-custom/-/merge_requests/1/diffs

#### 1. 定义 ESLint 规则的元数据 ([官方文档](https://zh-hans.eslint.org/docs/latest/extend/custom-rules)）

```
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow usage of only setState inside useEffect",
      category: "Best Practices",
      recommended: true,
    },
    schema: [],
  },
  // `create` 方法将在 ESLint 检查代码时被调用
  create(context) {
    const stateSetters = new Set();
    
    ...
  },
};
```

`create(context)` 在 ESLint 检查代码时被调用，ESLint本质上就是利用 AST 遍历机制，来实现代码的检查和错误报告。

26. #### 收集 `setState` 函数的名称
    

`VariableDeclarator` 这个方法在 ESLint 遍历到变量声明的节点时会被调用。

我们需要获取 `const [state,setState]=useState()` 中`setState`这个部分，并记录到stateSetters里面。后续的代码检查可以参考这个集合判断某个调用是否是 `setState`。

```
VariableDeclarator(node) {
  if (
    node.init && 
    node.init.type === "CallExpression" && 
    node.init.callee.name === "useState" &&
    node.id.type === "ArrayPattern" &&
    node.id.elements.length === 2
  ) {
    const setState = node.id.elements[1]();
    if (setState && setState.type === "Identifier") {
      stateSetters.add(setState.name);
    }
  }
}
```

27. #### 检查 `useEffect` 调用
    

`CallExpression`遍历到函数调用的节点时会被调用。

我们需要检查的是 `useEffect` 调用主体(传递给 `useEffect` 的回调函数)

```
CallExpression(node) {
  if (
    node.callee.name === "useEffect" &&
    node.arguments.length >= 1 &&
    node.arguments[0].type === "ArrowFunctionExpression"
  ) {
    const body = node.arguments[0].body;
    if (
      body.type === "BlockStatement" &&
      checkBlockStatement(body.body)
    ) {
      context.report({
        node,
        message: 
          "Avoid using only 'setState' inside useEffect; it's not Effect, don't use Effect as a listener.",
      });
    }
  }
}
```

28. #### (核心逻辑）递归检查useState是否正确使用
    

- 对 `IfStatement`，递归检查它的 `consequent` 和 `alternate` 部分
- 对于 `BlockStatement`，递归检查其内部的语句。
- 对于 `ExpressionStatement`，检查其是否是 `setState` 调用，且该调用在我们收集的 `stateSetters` 集合中
- 如果发现仅包含 `setState` 调用，则返回 `true`，报告违规行为

```
function checkBlockStatement(body) {
  let hasSetStateOnly = false;

  for (let i = 0; i < body.length; i += 1) {
    const statement = body[i];

    if (statement.type === "IfStatement") {
      if (
        (statement.consequent.type === "BlockStatement" &&
          checkBlockStatement(statement.consequent.body)) ||
        (statement.alternate &&
          statement.alternate.type === "BlockStatement" &&
          checkBlockStatement(statement.alternate.body))
      ) {
        hasSetStateOnly = true;
      }
    } else if (statement.type === "BlockStatement") {
      if (checkBlockStatement(statement.body)) {
        hasSetStateOnly = true;
      }
    } else {
      const expression =
        statement.type === "ExpressionStatement"
          ? statement.expression
          : null;
      if (
        expression &&
        expression.type === "CallExpression" &&
        expression.callee.type === "Identifier" &&
        stateSetters.has(expression.callee.name)
      ) {
        hasSetStateOnly = true;
      }
    }
  }

  return hasSetStateOnly;
}
```

为确保规则按预期工作，我们需要添加测试用例：

```
const { RuleTester } = require('eslint');
const rule = require('../rules/no-only-setstate-in-useeffect');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

ruleTester.run('no-only-setstate-in-useeffect', rule, {
  // 有效的用例 - 不应触发规则
  valid: [
    // useState和useEffect的基本用法，但不仅仅是setState
    `
    function Component() {
      const [count, setCount] = useState(0);
      useEffect(() => {
        document.title = count;
        setCount(count + 1);
      }, [count]);
      return <div>{count}</div>;
    }
    `,
    
    // 在useEffect外部使用setState
    `
    function Component() {
      const [count, setCount] = useState(0);
      const increment = () => setCount(count + 1);
      useEffect(() => {
        document.title = count;
      }, [count]);
      return <div onClick={increment}>{count}</div>;
    }
    `,
    
    // 空的useEffect
    `
    function Component() {
      const [count, setCount] = useState(0);
      useEffect(() => {
        // 只是注释，没有实际操作
      }, [count]);
      return <div>{count}</div>;
    }
    `
  ],
  
  // 无效的用例 - 应触发规则
  invalid: [
    // 简单情况：useEffect中只有setState
    {
      code: `
      function Component() {
        const [count, setCount] = useState(0);
        useEffect(() => {
          setCount(count + 1);
        }, [count]);
        return <div>{count}</div>;
      }
      `,
      errors: [{ messageId: "noSetStateInUseEffect" }]
    },
    
    // 条件语句中的setState
    {
      code: `
      function Component() {
        const [count, setCount] = useState(0);
        useEffect(() => {
          if (count < 10) {
            setCount(count + 1);
          } else {
            setCount(0);
          }
        }, [count]);
        return <div>{count}</div>;
      }
      `,
      errors: [{ messageId: "noSetStateInUseEffect" }]
    },
    
    // 嵌套的条件语句中的setState
    {
      code: `
      function Component() {
        const [count, setCount] = useState(0);
        const [visible, setVisible] = useState(true);
        useEffect(() => {
          if (count < 10) {
            if (visible) {
              setCount(count + 1);
            } else {
              setVisible(true);
            }
          }
        }, [count, visible]);
        return <div>{count}</div>;
      }
      `,
      errors: [{ messageId: "noSetStateInUseEffect" }]
    }
  ]
});
```

这些测试用例覆盖了：

- 有效用例：合法使用`useEffect`和`setState`的情况
- 无效用例：仅在`useEffect`中调用`setState`的情况，包括简单调用和条件语句中的调用

### 编写文档 - 解释规则的用途和配置

最后，为了让其他开发者理解和使用这个规则，应编写清晰的文档：

```
no-only-setstate-in-useeffect
禁止在useEffect中仅调用setState方法。

规则详情
在React中，useEffect钩子用于处理副作用。
如果useEffect仅用于调用setState，这通常表明设计可能不够优化。

错误示例
// ❌ 不好的做法
function Component({ value }) {
  const [state, setState] = useState();
  
  useEffect(() => {
    setState(value + 1);
  }, [value]);
  
  return <div>{state}</div>;
}

// ❌ 条件语句中仅有setState也不推荐
function Component({ value }) {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    if (value > 10) {
      setState(value);
    } else {
      setState(0);
    }
  }, [value]);
  
  return <div>{state}</div>;
}

正确示例
// ✅ 直接计算值，不使用useEffect
function Component({ value }) {
  const state = value + 1;
  return <div>{state}</div>;
}

// ✅ 使用useMemo缓存计算结果
function Component({ value }) {
  const state = useMemo(() => value + 1, [value]);
  return <div>{state}</div>;
}

// ✅ 使用useState的初始值
function Component({ value }) {
  const [state, setState] = useState(value + 1);
  return <div>{state}</div>;
}

// ✅ useEffect中有其他副作用，不仅是setState
function Component({ value }) {
  const [state, setState] = useState();
  
  useEffect(() => {
    document.title = `Value: ${value}`;
    setState(value + 1);
  }, [value]);
  
  return <div>{state}</div>;
}
```