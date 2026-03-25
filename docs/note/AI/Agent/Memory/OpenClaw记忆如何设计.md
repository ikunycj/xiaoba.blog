# OpenClaw 记忆如何设计

基于当前 `openclaw` 项目实现，对“记忆系统”和“上下文系统”做一次代码级分析，并给出可落地的详细设计方案。

## 1. 分析目标

这份文档回答四个问题：

1. OpenClaw 当前到底把什么当作“记忆”。
2. 当前 prompt、session、transcript、memory index 之间是怎么串起来的。
3. 这套设计已经做对了什么，还缺什么。
4. 如果要把它演进成更稳定、可维护、可扩展的 Agent 记忆体系，应该怎么设计。

本文基于当前代码实现，而不是只基于概念文档。重点参考了以下模块：

- `src/agents/system-prompt.ts`
- `src/agents/workspace.ts`
- `src/agents/memory-search.ts`
- `src/agents/pi-embedded-runner/run/attempt.ts`
- `src/context-engine/legacy.ts`
- `src/auto-reply/reply/session.ts`
- `src/auto-reply/reply/agent-runner-memory.ts`
- `src/auto-reply/reply/memory-flush.ts`
- `src/memory/manager.ts`
- `src/memory/manager-sync-ops.ts`
- `src/memory/search-manager.ts`
- `src/memory/session-files.ts`
- `src/hooks/bundled/session-memory/handler.ts`
- `docs/concepts/memory.md`
- `docs/concepts/context.md`
- `docs/concepts/system-prompt.md`

## 2. 一句话结论

OpenClaw 当前的真实架构不是“数据库式长期记忆”，而是一个分层体系：

- `Markdown 文件` 是长期记忆的可编辑真源。
- `Session transcript(JSONL)` 是会话事件日志。
- `SQLite/QMD 索引` 是可重建的检索层。
- `System prompt + 当前 session history` 是运行时上下文层。

换句话说，当前系统已经具备了一个不错的基础形态：

`可读写的文档记忆 + 会话日志 + 语义检索 + 会话压缩`

但它仍然缺少三个关键能力：

1. 明确的记忆分层与命名约定。
2. 一等公民的 memory write / consolidate 流程。
3. 真正拥有“检索、拼装、压缩、写回”职责的 context engine。

## 3. 当前体系总览

可以把 OpenClaw 当前实现拆成 4 层。

### 3.1 L0：运行时上下文层

这层是模型真正看到的输入，主要包括：

- system prompt
- workspace bootstrap files
- 当前 session transcript
- 必要时插入的 memory recall 结果
- compaction 之后保留下来的摘要或裁剪历史

对应代码核心：

- `src/agents/system-prompt.ts`
- `src/agents/workspace.ts`
- `src/agents/pi-embedded-runner/run/attempt.ts`
- `src/agents/compaction.ts`

### 3.2 L1：会话状态层

这层负责回答“当前是谁、在哪个会话、历史在哪、会话是否已重置、是否刚做过压缩、是否做过 memory flush”。

核心数据：

- `sessions.json` 中的 `SessionEntry`
- 每个 session 对应的 `.jsonl` transcript

对应代码核心：

- `src/auto-reply/reply/session.ts`
- `src/config/sessions/store.ts`
- `src/config/sessions/types.ts`

### 3.3 L2：长期记忆真源层

这层是当前真正意义上的长期记忆来源，主要是工作区中的 Markdown：

- `MEMORY.md`
- `memory.md`
- `memory/**/*.md`
- `extraPaths` 指向的额外 Markdown

对应代码核心：

- `src/memory/internal.ts`
- `src/memory/manager.ts`

### 3.4 L3：派生索引层

这层不是真源，而是为了检索性能与召回效果存在的派生物：

- builtin backend: SQLite + FTS5 + optional sqlite-vec
- qmd backend: 外部 QMD collection

这层可以删掉重建，不应成为唯一事实来源。

对应代码核心：

- `src/memory/manager.ts`
- `src/memory/manager-sync-ops.ts`
- `src/memory/search-manager.ts`
- `src/memory/qmd-manager.ts`

## 4. 当前真实运行链路

### 4.1 会话初始化

`initSessionState` 负责解析并落地当前 session 身份，处理内容包括：

- `sessionKey` 归一化
- `sessionId` 生成或复用
- `/new`、`/reset` 等 reset 逻辑
- parent session fork
- transcript 文件路径解析
- `SessionEntry` 更新与写回

`SessionEntry` 里已经不只是“会话 ID”，而是承载了一批 runtime 元数据，例如：

- token 计数
- `compactionCount`
- `memoryFlushAt`
- `memoryFlushCompactionCount`
- model/provider override
- delivery/origin 元数据
- `systemPromptReport`
- ACP 元数据

这意味着 OpenClaw 现在的 session 层，实际上已经承担了“上下文运行状态机”的角色。

### 4.2 System prompt 拼装

`buildAgentSystemPrompt` 会按模块拼出完整 system prompt，当前内容非常丰富，主要包括：

- Tooling
- Tool Call Style
- Safety
- OpenClaw CLI Quick Reference
- Skills
- Memory 提示
- Self-update
- Model aliases
- Workspace
- Docs
- Sandbox
- User identity / timezone
- Workspace Files (injected)
- Reply tags
- Messaging
- Voice
- Project Context
- Silent Replies
- Heartbeats

并且存在三种 prompt mode：

- `full`
- `minimal`
- `none`

这套 system prompt 已经不仅是“人设描述”，而是整个 Agent runtime contract。

### 4.3 历史上下文拼装

当前主链路在 `src/agents/pi-embedded-runner/run/attempt.ts` 中，顺序大致是：

1. `sanitizeSessionHistory`
2. provider turn validation
   - `validateGeminiTurns`
   - `validateAnthropicTurns`
3. `limitHistoryTurns`
4. `sanitizeToolUseResultPairing`
5. `contextEngine.assemble`

这里有两个要点：

- 现在的 transcript 预处理链已经比较完整，说明 OpenClaw 很重视“给模型的上下文格式正确”。
- `contextEngine.assemble` 是挂在这条链路后面的，但默认 engine 仍然是 `LegacyContextEngine`。

### 4.4 当前 Context Engine 的真实状态

`LegacyContextEngine` 的行为几乎是兼容层：

- `ingest`: no-op
- `assemble`: pass-through
- `afterTurn`: no-op
- `compact`: 转调既有 compaction 逻辑

也就是说，OpenClaw 虽然已经抽象出了 `ContextEngine` 接口，但“检索、召回、预算分配、写回、压缩协调”这几个核心职责，还没有真正收拢到一个新的 engine 实现里。

### 4.5 长期记忆与检索

当前 builtin memory index 的思路很清晰：

- 扫描 `MEMORY.md`、`memory.md`、`memory/**/*.md`
- 可选加入额外 Markdown 路径
- 按块切分 Markdown
- 建立 SQLite 元数据、chunk、embedding cache、可选 FTS5、可选 sqlite-vec
- 查询时走 FTS-only 或 vector + FTS hybrid

这里还有一个很容易忽略的实现细节：当前记忆配置面实际上是分成两层的。

- `agents.defaults.memorySearch` / `agents.list[].memorySearch` 负责 builtin memory index 的 provider、sources、chunking、sync、query 等参数
- 顶层 `memory` 负责 memory tool backend、citations，以及 QMD backend 配置

所以从代码角度看，当前“记忆系统”不是单一 config subtree，而是 `memorySearch + memory` 的组合。

几个关键事实：

- 默认 chunk 大小约为 `400 tokens`
- 默认 overlap 约为 `80 tokens`
- 默认 sources 只有 `["memory"]`
- `sessions` 只有在 `experimental.sessionMemory` 开启后，才能作为检索源启用
- `search()` 查询路径在 provider 缺失时有 FTS-only 分支
- 但当前 sync 路径在无 provider 时会跳过 memory/session 重新索引，所以它更像“已有索引上的降级查询”，不是完整的 provider-free 闭环
- QMD backend 失败时可以回退到 builtin index

这套设计的优点是：索引被设计成派生层，不是主存储层；但 FTS-only 与无 provider 的全流程一致性，当前仍有进一步收敛空间。

### 4.6 Session transcript 进入记忆检索的方式

当前 session transcript 不是直接作为 canonical memory 被读取，而是经过“扁平化”后参与索引：

- 从 `.jsonl` 中抽取 `user` / `assistant` 文本
- 归一成 `User: ...` / `Assistant: ...`
- 做敏感信息脱敏
- 建立 `lineMap`，把扁平化行映射回原 JSONL 行号

这意味着它更接近“可检索会话材料”，不是“稳定事实记忆”。

另外还有一个重要限制：

- `memory_search` 可以搜到 session 来源的片段
- 但 `memory_get` 当前只允许读取 memory markdown 或允许的额外 Markdown 路径
- 它并不直接打开 session JSONL 作为读取目标

因此当前 `sessions source` 更像“检索提示层”，而不是完整的 memory file layer。

> Tip: 这块可以进一步向市场上更成熟的“双层记忆”靠拢。Letta 明确把 `conversation search` 和 `archival memory` 分开，Mem0 也把记忆拆成 conversation / session / user / organization 四层。对 OpenClaw 来说，最稳妥的做法是把 `sessions` 正式定义成 session-scoped evidence，只参与召回与回溯，不直接视为 durable memory；只有经过提炼和确认的内容才允许进入 `MEMORY.md` 或 `memory/bank/*`。

### 4.7 记忆写回

当前默认实现中，没有一等公民的 `memory_write` 工具。

长期记忆写回主要通过三条路径发生：

1. 模型使用通用文件工具直接改 `MEMORY.md` 或 `memory/*.md`
2. `runMemoryFlushIfNeeded` 在高上下文压力时触发 silent memory flush
3. `/new` 或 `/reset` 时，`session-memory` hook 把上个 session 生成一个 `memory/YYYY-MM-DD-<slug>.md` 快照

其中 memory flush 的触发条件比较成熟，会综合考虑：

- 预计 prompt token
- transcript usage snapshot
- 上次 output token
- transcript byte size
- 是否 heartbeat
- 是否 CLI
- 当前工作区是否可写

这说明 OpenClaw 已经开始把“记忆写回”当作上下文控制的一部分，而不是单独功能。

> Tip: LangGraph 官方把 memory write 分成 `hot path` 和 `background` 两种，Letta Code 也同时提供即时 `/remember` 和 sleep-time compute / reflection。OpenClaw 最值得优化的地方，是把“当轮必须可见的写入”与“后台整理”拆开：例如 `memory/daily` append 可以走热路径，而 bank merge、去重、周摘要、冲突收敛更适合放后台任务，避免把记忆整理成本直接打到用户响应延迟上。

## 5. 当前设计的优点

### 5.1 Markdown 作为真源是正确的

这是当前体系最重要的优点。

原因很简单：

- 人可直接阅读、编辑、审查
- 易于版本管理
- 易于从工具链之外维护
- 索引损坏时可重建
- 不被某个向量库或后端锁死

如果未来要增强记忆能力，正确方向应该是“增强 Markdown 周围的流程”，而不是改成“数据库即真源”。

### 5.2 Session 与 long-term memory 是分开的

这也是一个正确决策。

- session transcript 适合保留事件流
- markdown memory 适合保留经过提炼的稳定知识

把二者混成一个存储层，会导致长期记忆污染、噪音过高、事实可信度下降。

### 5.3 索引层是派生层，失败可回退

builtin index 和 qmd backend 都是“可重建”的，这使得系统韧性更强：

- 查询层已经有 FTS-only 降级分支；如果 FTS 表中已有可用索引，provider 不可用时仍可能继续关键词检索
- qmd 挂了还能 builtin
- embedding 失败不等于记忆不可用

### 5.4 ContextEngine 抽象已经留好接口

虽然默认还是 legacy，但接口已经具备演进空间：

- `bootstrap`
- `assemble`
- `afterTurn`
- `compact`
- `prepareSubagentSpawn`
- `onSubagentEnded`

这意味着后续不需要推翻 runtime，只需要补一个真正工作的 engine。

## 6. 当前问题与代码/文档漂移

### 6.1 记忆命名空间不统一

当前至少存在两套“按天写记忆”的约定：

- 文档与 memory flush prompt 偏向 `memory/YYYY-MM-DD.md`
- `session-memory` hook 实际写的是 `memory/YYYY-MM-DD-<slug>.md`

结果是：

- daily memory
- session snapshot
- durable note

三类东西都可能落在 `memory/` 根目录，命名意图不清晰。

### 6.2 缺少显式 memory write contract

现在模型写记忆主要依赖通用文件工具，这会带来几个问题：

- 写入格式不一致
- 同类信息无法结构化归档
- 很难做去重和合并
- 很难区分“临时观察”与“稳定事实”

### 6.3 ContextEngine 仍未真正接管上下文策略

当前上下文预算、检索召回、压缩、写回仍然分散在：

- session
- memory flush
- compaction
- runner attempt

这会让后续继续扩展时，职责边界越来越模糊。

### 6.4 Session source 的定位还不够清楚

现在 session transcript 可以参与 search，但不能像 memory markdown 一样被稳定读取。

这本身没有错，但说明系统里还缺一个清晰定义：

- session transcript 是“证据材料”
- 还是“记忆候选源”
- 还是“真正可注入的 recall 内容”

### 6.5 Bootstrap 注入策略和文档存在漂移

这里有三个值得记录的代码级偏差：

1. 文档说 `MEMORY.md` 只在 main private session 里加载，但代码实际并不是按这个规则做的；`filterBootstrapFilesForSession` 只对 `subagent` / `cron` session 做最小化过滤，普通 session 会保留 bootstrap files。
2. 文档说 sub-agent 只注入 `AGENTS.md` 和 `TOOLS.md`，但代码中的最小 allowlist 还包含 `SOUL.md`、`IDENTITY.md`、`USER.md`。
3. 文档里的 daily memory 命名与 hook 实际输出命名不一致。

这三个漂移都说明：当前概念设计已经领先于落地实现，但尚未统一。

### 6.6 Durable memory 与 episodic memory 没有显式分层

现在所有东西都可能进入：

- `MEMORY.md`
- `memory/*.md`

但项目没有明确规定：

- 什么进 profile
- 什么进 preference
- 什么进 project fact
- 什么只进 daily note
- 什么只保留在 transcript

没有分层，就很容易出现“长期记忆被短期噪音污染”。

## 7. 推荐的目标架构

推荐把 OpenClaw 的记忆系统正式定义为：

`Markdown canonical memory + session event log + derived retrieval index + retrieval-aware context engine`

### 7.1 设计原则

1. Markdown 继续作为长期记忆真源，不改。
2. Session transcript 保持事件日志定位，不直接等同于 durable memory。
3. 检索索引永远是派生层，可以重建。
4. 上下文注入以“少量核心注入 + 检索召回”为主，而不是把所有 memory 一股脑塞进 prompt。
5. 写记忆必须有显式分类流程。
6. durable memory、episodic memory、session evidence 必须分层。
7. context engine 要成为检索、拼装、压缩、写回的单一协调入口。

## 8. 详细设计方案

### 8.1 存储布局

建议保留兼容性，但把语义边界做清楚。

推荐目录：

```text
MEMORY.md
memory/
  bank/
    profile.md
    preferences.md
    project.md
    rules.md
  daily/
    2026-03-25.md
  snapshots/
    2026-03-25-reset-from-session-a1b2.md
  summaries/
    2026-W13.md
```

各层职责：

- `MEMORY.md`
  - 极短、极稳定、最高优先级的核心记忆摘要
  - 更像“agent constitution + high-value memory index”
- `memory/bank/*.md`
  - durable memory
  - 经过筛选、去重、可长期保留
- `memory/daily/*.md`
  - episodic memory
  - 当天观察、任务进展、暂未确认的上下文
- `memory/snapshots/*.md`
  - reset/new 时生成的会话快照
  - 不与 daily note 混在同一目录
- `memory/summaries/*.md`
  - 周摘要/月摘要/专题摘要
  - 由 consolidate 流程生成

这样做的关键收益是：命名空间一眼就能看懂。

> Tip: 如果继续坚持 Markdown 作为真源，可以借鉴 Letta MemFS 和 memory blocks 的文件化做法，在 `memory/bank/*` 和 `memory/daily/*` 中加入极轻量 frontmatter，比如 `description`、`scope`、`owner`、`retention`、`read_only`。这样既保留可读可改的文件优势，又能让 agent 在写入时更清楚“这个文件是干什么的、能不能改、多久该清理”。

### 8.2 记忆类型定义

建议正式定义 4 类记忆。

#### A. Core memory

高稳定、必须常驻、极短内容。

例如：

- 用户身份
- 长期偏好
- 绝对规则
- 项目不可违反约束

承载位置：

- `MEMORY.md`
- `memory/bank/profile.md`
- `memory/bank/rules.md`

#### B. Durable memory

经过确认、值得长期保留，但不一定每轮都注入。

例如：

- 项目约定
- 长期技术决策
- 用户稳定偏好
- 固定工作流

承载位置：

- `memory/bank/*.md`

#### C. Episodic memory

时间相关、近期有用、未来会衰减的内容。

例如：

- 今天在做什么
- 某次讨论的结论
- 某个 issue 的临时背景

承载位置：

- `memory/daily/*.md`

#### D. Session evidence

原始会话材料，只作为检索证据或回溯来源。

承载位置：

- session `.jsonl`
- index 中的 `sessions` source

### 8.3 读路径设计

推荐使用“固定注入 + 分层检索”的双轨模型。

#### 固定注入

默认始终注入的内容应该非常少：

- system prompt
- 必要 bootstrap files
- `MEMORY.md`
- 与当前 session 类型匹配的极小型 bank summary

不要把整个 `memory/` 全量塞进 prompt。

> Tip: 这块可以直接吸收 OpenAI Prompt Caching 和 Anthropic 长上下文提示的实践。两家官方都强调：静态可复用内容尽量放在 prompt 前部，动态内容放在后部；Anthropic 还建议长文档在前、查询在末尾。落到 OpenClaw 上，system prompt、tool schema、稳定 bootstrap、`MEMORY.md` 和 pinned bank summary 应尽量形成固定前缀，而 daily/session recall 与当前用户问题放在更靠后的位置，这样既利于缓存命中，也更利于长上下文质量。

#### 分层检索顺序

召回顺序建议如下：

1. `MEMORY.md`
2. `memory/bank/*`
3. `memory/daily/*`
4. `sessions source`
5. 额外自定义知识路径

信任等级建议：

1. curated bank
2. `MEMORY.md`
3. daily episodic
4. session transcript evidence

也就是说，session transcript 可以帮助模型“想起来”，但不应自动覆盖 curated facts。

#### 读取工具建议

在现有 `memory_search` 和 `memory_get` 基础上，建议新增一组“会话内可调用”的工具或命令：

- `memory_write`
- `memory_append_daily`
- `memory_upsert_bank`
- `memory_open_citation`
- `memory_status`

说明：

- CLI 侧其实已经有 `openclaw memory status`
- 这里建议补的是“会话内”版本，让 agent 在聊天/运行时也能查看当前 memory backend、sources、dirty 状态和 recall 预算

其中最重要的是 `memory_open_citation`：

- 如果 citation 指向的是 `sessions` source，就通过 `lineMap` 反查对应 transcript 行
- 如果 citation 指向的是 markdown source，就继续走现有 `memory_get`

这样 session recall 才算真正闭环。

> Tip: LangGraph 在长期记忆里区分 `profile` 和 `collection` 两种更新形态，这对 OpenClaw 很有借鉴价值。`MEMORY.md` 和少量 bank summary 更适合做 profile 式“持续更新的单体真相”，而 `memory/daily/*`、`memory/snapshots/*` 更适合做 collection 式“持续追加的事件集合”。一旦把这两类更新模型分开，后面的 upsert、去重和摘要策略会更稳定。

### 8.4 写路径设计

这是当前 OpenClaw 最该补的一块。

建议把写路径做成三段式：

#### 阶段 1：捕获候选记忆

触发源包括：

- turn 结束后
- memory flush
- `/new` / `/reset`
- compaction 前后

目标不是直接写 durable memory，而是先产生 candidate。

#### 阶段 2：分类

候选内容按规则进入：

- durable fact -> `memory/bank/*`
- episodic note -> `memory/daily/YYYY-MM-DD.md`
- reset snapshot -> `memory/snapshots/*`
- 无价值内容 -> 丢弃

这里必须有明确判断标准：

- 是否跨天仍然有效
- 是否与用户长期偏好相关
- 是否是项目长期约束
- 是否只是一次性任务状态

#### 阶段 3：合并与去重

对 bank 类写入不建议直接 append，建议 upsert：

- 相同事实合并
- 相似偏好合并
- 冲突时保留最近确认版本
- 写入时附带更新时间

daily note 则可以 append。

### 8.5 记忆写回策略

推荐替换“只有通用文件写”的方式，增加一等 memory 工具，但底层仍然写 Markdown。

建议保留两类动作：

#### `memory_append_daily`

适合：

- 当日任务进展
- 今天讨论的背景
- 近期上下文

写入目标：

- `memory/daily/YYYY-MM-DD.md`

#### `memory_upsert_bank`

适合：

- 长期偏好
- 项目事实
- 固定规则

写入目标：

- `memory/bank/*.md`

这样可以让模型不再自己决定文件名与落点，而是走统一策略。

### 8.6 Context Engine 演进方案

推荐新增一个真正工作的 engine，例如：

- `legacy` 保留
- 新增 `retrieval-v1`

`retrieval-v1` 负责：

1. `bootstrap`
   - 初始化 recall cache
   - 预热最近 daily summary
2. `assemble`
   - 计算 token budget
   - 决定注入哪些固定记忆
   - 决定是否检索 bank/daily/sessions
   - 生成 `systemPromptAddition`
3. `afterTurn`
   - 提取 candidate memories
   - 触发 memory write / daily append
   - 更新近期摘要
4. `compact`
   - 与记忆写回协同
   - 保证 compaction 前有一次 durable extraction

也就是说，context engine 不只是“压缩适配器”，而是“上下文编排器”。

### 8.7 上下文预算设计

建议把 context budget 显式分桶，而不是只靠历史裁剪。

推荐预算思路：

- 10% 到 15%: system prompt + bootstrap
- 30% 到 45%: 当前 session transcript
- 10% 到 20%: retrieved memory
- 5% 到 10%: tool result / citations buffer
- 20% 到 30%: response headroom

如果上下文窗口较小，优先牺牲顺序建议为：

1. session transcript 旧消息
2. daily episodic recall
3. session evidence recall
4. bank recall
5. core memory

也就是说，`MEMORY.md` 和小型 curated bank summary 应尽量最后才被牺牲。

### 8.8 不同会话类型的注入策略

这部分建议做成明确矩阵。

#### Direct / private session

- 可注入 `MEMORY.md`
- 可注入 user/profile bank
- 可召回 daily 与 sessions

#### Group session

- 默认不注入完整私有 user memory
- 只注入共享 project / group-safe memory
- sessions recall 只用当前 group scope

#### Subagent session

- 保持最小 bootstrap
- 不自动加载全量 memory
- 由父 session 显式传 recall package

#### Cron / heartbeat

- 只加载任务相关 minimal context
- 不做广泛 recall

这样才能真正把“隐私边界”和“上下文成本”控制住。

> Tip: Mem0 和 LangGraph 都强调 memory scope 不能只靠“这一轮在哪个线程”来猜，而要显式落到 session / user / org / namespace。OpenClaw 如果后续要减少 group、private、subagent 之间的串味，建议把 memory key 或文件命名规则升级成显式层级，例如 `agentId / scopeType / subjectId / namespace`，而不是只靠 `memory/` 目录里的自然语言文件名承载全部边界。

### 8.9 Consolidation 机制

推荐增加周期性 consolidate，而不是让 daily note 无限增长。

建议节奏：

- turn 级：抽取 candidate
- day 级：写 daily
- week 级：daily -> summary
- milestone 级：summary -> bank update

consolidate 的作用不是压缩文本长度，而是提升记忆质量：

- 去重
- 合并
- 冲突解决
- 时间衰减
- 提升 durable facts 密度

> Tip: Letta Code 已经把 reflection / defragmenting memory 做成长期运行 agent 的标准维护动作，LangGraph 也明确建议部分记忆生成走后台。OpenClaw 可以把 consolidate 视为“记忆卫生系统”而不是“摘要脚本”：定期扫描 `memory/daily/*`、收敛重复偏好、提升高置信事实到 bank、归档过期 daily，这样长期运行后记忆质量才不会随时间退化。

### 8.10 可观测性与调试

当前已经有 `/context` 和 system prompt report，这很好，但还不够。

另外，CLI 侧已经有：

- `openclaw memory status`
- `openclaw memory index`
- `openclaw memory search`

建议进一步补齐“会话内”和“recall/write 维度”的可观测能力：

- 会话内 `memory status` / `/memory status`
  - 当前 backend
  - sources
  - files/chunks
  - last sync
  - fallback 状态
- `context report`
  - 本轮注入了哪些 recall
  - 每部分用了多少 tokens
  - 哪些 recall 被截断
- `memory write report`
  - 本轮提取了哪些 candidate
  - 写入了哪里
  - 哪些被丢弃

这会大幅降低“Agent 为什么记住/没记住”的调试成本。

## 9. 推荐的最小落地路径

不建议一口气重写。推荐分四期。

### Phase 1：统一命名与文档

先做最小一致性修复：

- 统一 daily 目录为 `memory/daily/YYYY-MM-DD.md`
- 把 reset/new 快照改到 `memory/snapshots/`
- 修正文档与代码漂移
- 明确 `MEMORY.md`、bank、daily、sessions 的职责边界

这是性价比最高的一步。

### Phase 2：补一等 memory write 工具

新增，并把部分状态能力下沉到会话内：

- `memory_append_daily`
- `memory_upsert_bank`
- `memory_open_citation`
- 会话内 `memory_status`

同时保留 `memory_search`、`memory_get` 兼容旧流程。

### Phase 3：实现 `retrieval-v1` context engine

把以下职责收拢进去：

- recall 预算
- recall 排序
- memory writeback 协调
- compaction 前 durable extraction

这样 runner 层会明显变干净。

### Phase 4：做 consolidation 与多会话策略

最终补齐：

- daily -> weekly summary
- bank 去重合并
- direct/group/subagent 差异化 recall policy

## 10. 对当前代码的具体修改建议

### 10.1 先改命名空间

优先改这些位置：

- `src/hooks/bundled/session-memory/handler.ts`
- `src/auto-reply/reply/memory-flush.ts`
- `docs/concepts/memory.md`

目标：

- 不再让 session snapshot 与 daily memory 共用同一命名规则

### 10.2 新增 memory write tool

优先改这些位置：

- `src/agents/tools/memory-tool.ts`
- `extensions/memory-core/index.ts`
- 相关 schema / tests

目标：

- 给模型一个比“直接写文件”更稳定的记忆写接口

### 10.3 新增 retrieval-aware context engine

优先改这些位置：

- `src/context-engine/`
- `src/agents/pi-embedded-runner/run/attempt.ts`
- `src/auto-reply/reply/post-compaction-context.ts`

目标：

- 让 assemble / afterTurn / compact 进入统一编排

### 10.4 补 session citation 打开能力

优先改这些位置：

- `src/memory/session-files.ts`
- `src/memory/manager.ts`
- `src/agents/tools/memory-tool.ts`

目标：

- 让 `sessions` source 不止能“搜到”，还能被安全展开

## 11. 最终建议

如果只保留一句设计原则，我建议是：

`把 Markdown 当真源，把 transcript 当事件流，把 index 当派生层，把 context engine 当编排器。`

在这个原则下，OpenClaw 不需要推倒重来，只需要把已经存在的几条能力线收拢成一个统一体系：

- memory files 负责“存什么”
- transcript 负责“发生过什么”
- retrieval 负责“该想起什么”
- context engine 负责“这轮应该给模型什么”
- consolidation 负责“什么值得留下”

这会让 OpenClaw 的记忆系统从“可用的功能集合”，演进成“清晰可维护的架构”。

## 12. 市场最佳实践参考

- Letta Stateful Agents / Memory: https://docs.letta.com/guides/core-concepts/stateful-agents
- Letta Memory Blocks: https://docs.letta.com/guides/core-concepts/memory/memory-blocks
- Letta External Memory Overview: https://docs.letta.com/guides/agents/memory
- Letta Code Memory / MemFS: https://docs.letta.com/letta-code/memory/
- LangGraph Memory Overview: https://docs.langchain.com/oss/python/langgraph/memory
- LangGraph Long-term Memory: https://docs.langchain.com/oss/python/langchain/long-term-memory
- Mem0 Memory Types: https://docs.mem0.ai/core-concepts/memory-types
- OpenAI Conversation State: https://developers.openai.com/api/docs/guides/conversation-state
- OpenAI Prompt Caching: https://platform.openai.com/docs/guides/prompt-caching
- Anthropic Long Context Prompting Tips: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips
- Anthropic Prompt Caching: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
