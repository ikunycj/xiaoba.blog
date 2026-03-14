# AI Coding 最佳实践（以 Codex 为例）

最近我在尝试一套更“顺手”的新项目启动方式。

不是先闷头建目录、搭脚手架、写 `README`，而是让 AI 从需求整理、方案拆分，到代码落地和后续补全，全程参与。

这篇笔记记录的是我当前这套工作流，也欢迎后续继续迭代。

## 使用工具

### 1. OpenSpec：把模糊需求拆成清晰任务

链接：[https://github.com/Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)

OpenSpec 是一款基于 SPEC 范式的轻量代码提示词辅助工具，核心价值是把原本“一句话让 AI 直接开干”的输入，拆成结构化文档。

常见的四个文档是：

- `proposal`：为什么要做
- `specs`：需求和场景
- `design`：技术设计
- `tasks`：具体实施清单

### 2. Codex CLI：真正的落地入口

CLI 相对 IDE 对话式 Agent 有几个明显优势：

- 方便并发工作，可以同时开启多个终端协作
- 能直接执行命令，过程更透明
- 工具链和命令行生态更丰富，更容易接入现有工程流

## 面向文档开发的两个核心

### 1. 面向文档编程

Documentation-Oriented Programming 的核心主张是：文档即代码，文档先于代码。

#### 核心理念

- Markdown 是 AI 时代的重要源代码
- 编程重点正在从“直接写代码”转向“先写清楚需求和约束”

#### 关键实践

建议在项目根目录维护一套清晰的文档结构：

```text
README.md                     # 项目介绍
AGENTS.md                     # 给 AI 编程工具阅读的项目概览和约束
.codex/
  rules/                      # AI 规则、电子围栏、宏命令
docs/
  requirements/
    archive/                  # 已完成需求归档
    requirename-date/         # 某次具体需求
      require.md              # 需求描述
      test.md                 # 测试用例与验证说明
  PRD.md                      # 产品宏观描述，最终形态
  CURRENT.md                  # 当前产品状态
  ARCHITETUCTURE.md           # 系统架构
  API.md                      # 项目 API 文档
```

### 2. 面向测试编程

面向测试编程是保证交付质量的核心手段，最典型的代表就是 TDD。

#### 核心范式：TDD

TDD 遵循一个很经典的循环：

1. `Red`：先写一个一定会失败的测试，因为功能还没实现。
2. `Green`：写最少量的代码，让测试通过。
3. `Refactor`：在测试保护下重构代码，优化结构、去掉冗余，但不改变行为。

## 核心步骤

1. 根据 `PRD`、`CURRENT`、`ARCHITETUCTURE`、`API`、`AGENTS` 生成某次需求对应的 `requirename-date` 文件夹，并补齐 `require.md` 和 `test.md`。
2. 执行 `opsx-propose`，以 `requirename-date` 为输入，生成 `proposal.md`、`task.md`、`design.md`、`spec.md`。
3. 执行 `opsx-apply` 生成代码，并依据 `test.md` 进行验证。
4. 需求完成后，把对应 `requirename-date` 目录归档。
