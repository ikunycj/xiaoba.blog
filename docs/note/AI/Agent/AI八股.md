# Agent 架构、记忆与工程八股

> 本文聚焦 Agent / Workflow、MCP、记忆与上下文管理、工程安全隔离、工具生态和实战案例。
>
> 与模型原理、KV Cache、Attention、Mask、训练对齐相关的内容已拆分到 [LLM 原理与训练八股](/note/AI/AI%20算法/LLM原理与训练八股)。

## 文档导航

| 模块 | 覆盖内容 | 适合场景 |
| --- | --- | --- |
| **一、架构与方法论** | Agent vs Workflow、企业级架构、MCP、产品方法论 | Agent 面试、系统设计 |
| **二、记忆与上下文** | 长短期记忆、上下文读取、超 Token 处理 | 记忆系统设计、RAG / Context 工程 |
| **三、工程执行与工具生态** | Sandbox、代码执行、Retriever / Reranker、LangChain 对比 | 工程落地、安全隔离 |
| **四、实战案例** | SQL 复杂度分析、TodoList、工具编排 | 展示 Agent 真实执行链路 |

---

## 1. Agent vs Workflow 的区别是什么？在什么场景下选哪种？

> **面试重点**：这是架构选型的核心问题，需要清晰表达两者的本质差异和选型依据。

### 核心区别

| 维度       | Agent                  | Workflow             |
| -------- | ---------------------- | -------------------- |
| **执行路径** | 动态生成，运行时才确定            | 预定义，设计阶段已确定          |
| **决策能力** | 基于上下文和中间结果做策略决策        | 按固定规则执行，无决策能力        |
| **任务结构** | 运行时动态拆解、扩展（如 TodoList） | 静态 DAG/Pipeline，步骤固定 |
| **适应性**  | 能根据数据特征调整分析策略          | 无法根据中间结果调整执行路径       |
| **复杂度**  | 适合不确定性高的复杂任务           | 适合确定性高的规则化任务         |

### 详细对比

**Workflow（Pipeline/DAG）适用前提：**
- 任务阶段划分是确定的
- 各阶段依赖关系在执行前已知
- 执行路径可以在设计阶段被完整枚举
- 执行过程不会因中间结果而改变策略

**Agent 的核心优势：**
1. **路径由数据驱动生成** - 根据代码结构、协议分布动态决定分析深度
2. **策略动态调整** - 基于当前证据决定是否追加分析维度
3. **动态 DAG 生成** - 运行时生成和演化任务图
4. **不确定性封装** - 将不可完全形式化的判断限制在模型推理中

### 选型建议

| 场景 | 推荐方案 | 原因 |
|------|----------|------|
| 日志处理、指标计算、规则扫描 | Workflow | 确定性高，步骤固定 |
| 代码分析、协议识别、跨仓库追溯 | Agent | 需要动态决策和路径生成 |
| 预定义的 CI/CD 流程 | Workflow | 步骤确定，重复执行 |
| 智能代码审查、自动化测试生成 | Agent | 需要根据代码特征调整策略 |

### Code-Miner 的选择

Code-Miner 选择 **Agent 架构** 的原因：

> "微信支付代码分析 Agent 面对的不是单次、交互式的'问答型'代码理解问题，而是一个长期、离线、无人值守的大规模代码资产智能分析问题。"

具体场景：
- 某个仓库是否包含 XCGI/XWI 协议，必须在扫描后才能判断
- 某个接口是否需要跨仓库追溯调用链，取决于中间分析结果
- 某条分析路径是否终止，取决于是否已得到足够"证据密度"

### 面试回答模板

```
面试官：请解释 Agent 和 Workflow 的区别？

回答框架：

1. 开篇定义（30秒）
   "Agent 和 Workflow 是两种不同的任务执行范式。
    Workflow 是预定义的流水线，执行路径在设计时就确定了。
    Agent 是智能代理，执行路径在运行时动态生成。"

2. 核心差异（1分钟）
   "本质区别在于'决策能力'：
   - Workflow：按固定规则执行，无决策能力
   - Agent：能基于上下文做策略决策
   
   用一个类比：
   - Workflow 像'流水线工人'，重复执行固定步骤
   - Agent 像'程序员'，根据问题动态调整解决方案"

3. 项目实践（1分钟）
   "在 Code-Miner 项目中，我们选择 Agent 架构，因为：
   - 代码分析任务的执行路径在运行前不可确定
   - 需要根据中间结果动态决定后续分析策略
   - 比如：某个仓库是否包含 XCGI 协议，必须扫描后才能判断"

4. 总结（30秒）
   "简单说：确定性任务用 Workflow，不确定性任务用 Agent。
    两者不是互斥的，复杂系统往往是 Agent 编排多个 Workflow。"
```

### 深度追问及应对

**追问 1：什么时候应该组合使用 Agent 和 Workflow？**

```
回答要点：

组合模式：Agent 作为决策中心，Workflow 作为执行单元

示例架构：
┌─────────────────────────────────────────────────────────────┐
│                    Agent（决策中心）                          │
│  • 分析任务类型                                              │
│  • 决定调用哪个 Workflow                                     │
│  • 根据结果决定下一步                                        │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  Workflow A   │ │  Workflow B   │ │  Workflow C   │
│  (代码扫描)   │ │  (协议分析)   │ │  (报告生成)   │
│  确定性流程   │ │  确定性流程   │ │  确定性流程   │
└───────────────┘ └───────────────┘ └───────────────┘

Code-Miner 实际应用：
- Agent 决策：根据代码特征选择分析策略
- Workflow 执行：具体的 AST 解析、协议提取等确定性步骤
```

**追问 2：Agent 架构的主要挑战是什么？如何解决？**

| 挑战        | 说明        | Code-Miner 解决方案          |
| --------- | --------- | ------------------------ |
| **不可预测性** | 执行路径不固定   | TodoList 机制外化任务状态        |
| **成本控制**  | 可能无限循环    | maxIterations 限制 + 死循环检测 |
| **调试困难**  | 执行路径复杂    | 详细日志 + 数据库记录执行历史         |
| **性能问题**  | LLM 调用开销大 | 父子 Agent 并行 + 工具并发执行     |

**追问 3：如何评估一个任务应该用 Agent 还是 Workflow？**

```
决策 checklist：

□ 执行路径是否能在设计时完全枚举？
  └─ 是 → Workflow
  └─ 否 → 继续

□ 中间结果是否会影响后续策略？
  └─ 是 → Agent
  └─ 否 → 继续

□ 是否需要处理大量异常情况和边界条件？
  └─ 是 → Agent（更灵活）
  └─ 否 → Workflow（更可控）

□ 对执行时间是否有严格 SLA 要求？
  └─ 是 → Workflow（可预测）
  └─ 否 → Agent（可接受一定不确定性）
```

### Code-Miner ReAct Loop 实现详解

```typescript
// src/agent/agent.ts 核心循环
export class Agent implements IAgent {
  async run(task: string): Promise<string> {
    this.status = AgentStatus.RUNNING;
    this.abortController = new AbortController();
    
    while (this.iterationCount < this.options.maxIterations) {
      this.iterationCount++;
      
      // ========== ReAct Loop 核心步骤 ==========
      
      // Step 1: Thought - 思考下一步做什么
      const thought = await this.think();
      
      // Step 2: Action - 决定执行什么动作
      const action = await this.decideAction(thought);
      
      if (action.type === 'finish') {
        // 任务完成，退出循环
        return action.result;
      }
      
      // Step 3: Execute - 执行动作（调用工具）
      const observation = await this.executeAction(action);
      
      // Step 4: Observe - 观察结果，更新上下文
      await this.observe(observation);
      
      // 死循环检测
      if (this.isStuck()) {
        this.logger.warn('检测到死循环，强制退出');
        break;
      }
    }

    return this.generateFinalReport();
  }
  
  /**
   * 检测死循环
   * 如果连续 N 次没有实际动作，判定为死循环
   */
  private isStuck(): boolean {
    if (this.lastAction === 'none') {
      this.consecutiveNoActionCount++;
      return this.consecutiveNoActionCount >= MAX_CONSECUTIVE_NO_ACTION;
    }
    this.consecutiveNoActionCount = 0;
    return false;
  }
}
```

### 性能对比数据

```
Code-Miner 实测数据（分析 100 个微信支付仓库）：

Workflow 模式（假设）：
- 预设分析路径：固定的 5 步流程
- 执行时间：每个仓库约 2 分钟
- 成功率：60%（无法处理异常情况）
- 人工干预：需要处理大量边界情况

Agent 模式（实际）：
- 动态分析路径：平均 8 步，最多 25 步
- 执行时间：每个仓库约 3-5 分钟
- 成功率：92%（自动处理异常）
- 人工干预：基本无需

结论：虽然 Agent 单次执行稍慢，但整体成功率大幅提升，
减少了人工介入成本，整体效率更高。
```

---

## 2. 企业级 Agent 架构怎么设计？

> **面试重点**：展示你对复杂系统架构的理解，以及如何在企业环境中落地 Agent 系统。

### 2.1 多组件拆分（BFF / Tool Server / Worker）

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client 层                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   CLI 工具   │  │  Web 控制台  │  │   API 接口   │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
└─────────┼────────────────┼────────────────┼───────────────────┘
          │                │                │
          └────────────────┴────────────────┘
                             │
┌─────────────────────────────▼──────────────────────────────────┐
│                      BFF 层 (Backend for Frontend)              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • 请求路由与负载均衡                                       │  │
│  │  • 统一认证与鉴权                                          │  │
│  │  • 协议转换（REST/GraphQL → 内部协议）                      │  │
│  │  • 限流与熔断                                             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────┬──────────────────────────────────┘
                              │
┌─────────────────────────────▼──────────────────────────────────┐
│                     Agent Core 层                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ Task Runner │  │ ReAct Loop  │  │   Parent-Child Agent    │ │
│  │   任务调度   │  │   执行引擎   │  │      父子协作            │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────┬──────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
┌─────────▼─────────┐ ┌───────▼────────┐ ┌────────▼────────┐
│   Tool Server     │ │  Worker Pool   │ │  MCP Servers    │
│  ┌─────────────┐  │ │  ┌──────────┐  │ │  ┌───────────┐  │
│  │ 代码分析工具 │  │ │  │ Worker 1 │  │ │  │ MCP Server│  │
│  │ AST Parser  │  │ │  │ Worker 2 │  │ │  │    A      │  │
│  │ Grep/Search │  │ │  │ Worker N │  │ │  │ MCP Server│  │
│  │ File I/O    │  │ │  └──────────┘  │ │  │    B      │  │
│  └─────────────┘  │ │                │ │  └───────────┘  │
└───────────────────┘ └────────────────┘ └─────────────────┘
```

**各层职责：**

| 组件 | 职责 | Code-Miner 实现 |
|------|------|-----------------|
| **BFF** | 统一接入、认证、路由 | Koa Web 服务器 + Router |
| **Agent Core** | ReAct Loop、任务调度、父子协作 | `agent.ts`, `sub-agent.ts` |
| **Tool Server** | 工具注册、管理、执行 | `tool-registry.ts` |
| **Worker** | 并发执行、资源隔离 | `child-process-manager.ts` |
| **MCP Server** | 外部工具扩展 | `mcp-tool.ts` |

### 2.2 安全与隔离怎么做？

#### 文件写入隔离

```typescript
// 白名单目录限制
const allowedDirs = ['/data/ai_analysis', '/tmp'];
const resolvedPath = path.resolve(normalizedPath);

const isAllowed = allowedDirs.some(allowedDir => {
  const resolvedAllowedDir = path.resolve(allowedDir);
  return resolvedPath.startsWith(resolvedAllowedDir + path.sep) 
      || resolvedPath === resolvedAllowedDir;
});

if (!isAllowed) {
  throw new Error(`File path must be under one of the allowed directories`);
}
```

#### 子进程隔离

```typescript
// 通过子进程实现任务隔离
const childProcess = await createChildProcess('分析任务', {
  workingDirectory: '/path/to/project',
  provider: 'venus'
});
```

**隔离机制：**

| 层面       | 隔离方式    | 说明                |
| -------- | ------- | ----------------- |
| **文件系统** | 白名单目录限制 | 只允许写入指定目录         |
| **进程**   | 子进程隔离   | 每个任务独立进程，崩溃不影响主进程 |
| **网络**   | 沙箱环境    | 限制外部网络访问          |
| **资源**   | 资源配额限制  | CPU/内存/超时控制       |

#### 工具执行安全

- **只读工具优先**：如 `read-file-tool`, `grep-tool`
- **受控写操作**：`write-file-tool` 限制在白名单目录
- **危险操作禁用**：不暴露 `rm -rf` 等危险命令
- **命令审计**：所有执行命令记录日志

### 面试回答模板

```
面试官：请设计一个企业级 Agent 架构？

回答框架：

1. 分层设计理念（30秒）
   "企业级 Agent 架构需要考虑四个核心问题：
   可扩展性、安全性、可观测性、成本控制。
   我建议采用分层架构设计。"

2. 架构分层说明（1.5分钟）
   "第一层：BFF 层
    - 统一接入、认证、路由
    - 限流熔断、协议转换
    - Code-Miner 用 Koa 实现

    第二层：Agent Core 层
    - ReAct Loop 执行引擎
    - 父子 Agent 协作
    - 任务调度和状态管理

    第三层：工具层
    - 内置工具（文件、搜索、执行）
    - MCP 扩展（契约、配置、日志）
    - 工具注册和生命周期管理

    第四层：Worker 层
    - 并发执行、资源隔离
    - 子进程管理
    - 沙箱环境"

3. 安全设计（1分钟）
   "安全是企业级的重中之重：
   - 文件写入：白名单目录限制
   - 命令执行：firejail 沙箱隔离
   - 资源限制：CPU/内存/进程数控制
   - 权限控制：工具级、Agent 级分级权限"

4. 可观测性（30秒）
   "完整的日志和监控体系：
   - 操作日志：工具调用记录
   - API 日志：LLM 调用追踪
   - 审计日志：用户操作审计
   - 监控告警：资源使用、任务成功率"
```

### 深度追问及应对

**追问 1：如何实现 Agent 的水平扩展？**

```
回答要点：

Code-Miner 的扩展策略：

┌─────────────────────────────────────────────────────────────┐
│                    Load Balancer                            │
│                    (任务分发)                                │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  Agent Pod 1  │ │  Agent Pod 2  │ │  Agent Pod N  │
│  • 独立进程   │ │  • 独立进程   │ │  • 独立进程   │
│  • 独立存储   │ │  • 独立存储   │ │  • 独立存储   │
└───────────────┘ └───────────────┘ └───────────────┘
        │               │               │
        └───────────────┼───────────────┘
                        ▼
              ┌─────────────────┐
              │  Shared Storage │
              │  (SQLite/Redis) │
              └─────────────────┘

关键设计：
1. 无状态设计：Agent 实例间无依赖
2. 共享存储：任务状态持久化到共享数据库
3. 任务队列：通过队列分发任务
4. 资源隔离：每个 Agent 独立的资源配额
```

**追问 2：父子 Agent 协作如何设计？**

```typescript
// Code-Miner 父子 Agent 实现
export class Agent {
  /**
   * 委派任务给子 Agent
   * 用于并行处理复杂任务
   */
  async delegateToSubAgent(
    task: string,
    options: SubAgentOptions
  ): Promise<SubAgentResult> {
    // 1. 创建子 Agent
    const subAgent = await this.createSubAgent({
      task,
      parentAgentId: this.agentId,
      workingDirectory: options.workingDirectory,
      timeout: options.timeout || 300000, // 默认 5 分钟
      tools: options.tools || this.getAvailableTools(),
    });
    
    // 2. 注册到管理器
    this.subAgentManager.register(subAgent);
    
    // 3. 等待完成（或超时）
    const result = await Promise.race([
      subAgent.run(task),
      this.createTimeoutPromise(options.timeout),
    ]);
    
    // 4. 汇报结果给父 Agent
    await this.receiveSubAgentResult(subAgent.agentId, result);
    
    return result;
  }
}

// 使用场景：并行分析多个仓库
const results = await Promise.all([
  agent.delegateToSubAgent('分析仓库 A', { workingDirectory: '/repo/a' }),
  agent.delegateToSubAgent('分析仓库 B', { workingDirectory: '/repo/b' }),
  agent.delegateToSubAgent('分析仓库 C', { workingDirectory: '/repo/c' }),
]);
```

**追问 3：如何实现 Agent 的断点续传？**

```
Code-Miner 的断点续传机制：

1. 状态持久化
   ├── 任务状态：保存到 SQLite 数据库
   ├── TodoList：持久化任务列表
   ├── 消息历史：保存对话上下文
   └── 中间结果：保存分析结果

2. 恢复机制
   ┌─────────────────────────────────────────────────────────────┐
   │                    Agent 启动时                              │
   │                                                             │
   │  1. 检查是否有未完成的任务                                   │
   │     └─ 查询 SQLite 中的 Agent 状态                          │
   │                                                             │
   │  2. 恢复上下文                                              │
   │     ├── 加载消息历史                                        │
   │     ├── 恢复 TodoList 状态                                  │
   │     └── 加载中间结果                                         │
   │                                                             │
   │  3. 从断点继续执行                                          │
   │     └─ 从当前 in_progress 的 Todo 继续                      │
   │                                                             │
   └─────────────────────────────────────────────────────────────┘

3. 配置选项
   interface AgentOptions {
     // 启用断点续传
     enableResume: boolean;  // 默认 true
     
     // 启用持久化
     enablePersistence: boolean;  // 默认 false
   }
```

### Code-Miner 完整架构实现

```typescript
// src/agent/agent.ts - Agent 核心类
export class Agent implements IAgent {
  // 核心组件
  private openaiClient: OpenAIClient;        // LLM 客户端
  private tools: Map<string, ITool>;          // 工具注册表
  private toolRegistry: ToolRegistry;         // 工具管理器
  private mcpManager: MCPManager | null;      // MCP 管理
  private agentDbManager: AgentDatabaseManager; // 数据库管理
  
  // 运行时状态
  private status: AgentStatus;
  private iterationCount: number;
  private abortController: AbortController | null;
  
  // 配置选项
  private options: {
    maxIterations: number;      // 最大迭代次数
    maxTokens: number;          // 单次输出限制
    contextWindow: number;      // 上下文窗口大小
    enablePersistence: boolean; // 启用持久化
    enableResume: boolean;      // 启用断点续传
  };
  
  constructor(tools: ITool[] = [], options: AgentOptions = {}) {
    // 1. 生成唯一 Agent ID
    this.agentId = Agent.generateAgentId();
    
    // 2. 初始化日志
    this.logger = new Logger({
      logDir: path.join(os.homedir(), 'codeminer', 'logs', this.agentId),
    });
    
    // 3. 初始化工具注册表
    this.toolRegistry = new ToolRegistry();
    this.registerTools(tools);
    
    // 4. 初始化 LLM 客户端
    this.openaiClient = new OpenAIClient({
      provider: options.provider,
      model: options.model,
      apiKey: options.apiKey,
    });
    
    // 5. 初始化持久化（如果启用）
    if (options.enablePersistence) {
      this.agentDbManager = getAgentDatabaseManager();
    }
  }
}
```

### 企业级架构最佳实践

| 实践 | 说明 | Code-Miner 实现 |
|------|------|-----------------|
| **配置外置** | 敏感信息不放代码 | `~/.codeminer/config.json` |
| **日志分级** | 不同级别不同处理 | DEBUG/INFO/WARN/ERROR |
| **资源隔离** | 防止资源耗尽 | firejail + cgroup |
| **优雅降级** | 部分失败不影响整体 | 子 Agent 独立超时 |
| **监控告警** | 实时感知系统状态 | 资源监控 + 任务成功率 |

### 2.3 权限、审计、日志怎么做？

#### 权限控制

```typescript
// 工具级别权限控制
interface ToolPermission {
  toolName: string;
  allowedUsers?: string[];
  allowedRoles?: string[];
  readOnly?: boolean;
}

// Agent 级别权限
interface AgentPermission {
  canWriteFile: boolean;
  canExecuteCommand: boolean;
  canAccessNetwork: boolean;
  maxIterations: number;
}
```

#### 审计日志

**日志分层：**

| 日志类型 | 内容 | 存储位置 |
|----------|------|----------|
| **操作日志** | 工具调用、参数、结果 | SQLite 数据库 |
| **API 日志** | LLM 调用请求/响应 | `~/codeminer/logs/{agent-id}/agent-api_log{agent-id}-{date}.log` |
| **执行日志** | Agent 执行流程、决策过程 | `~/codeminer/logs/{agent-id}/agent-{agent-id}-{date}.log` |
| **审计日志** | 用户操作、配置变更 | 独立审计系统 |

**Code-Miner 日志实现：**

```typescript
// Agent 数据库记录
interface AgentMessage {
  id: string;
  agentId: string;
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  toolCalls?: ToolCall[];
  timestamp: number;
}

// Todo 任务追踪
interface AgentTodo {
  id: string;
  agentId: string;
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  parentId?: string;
}
```

#### 监控与告警

| 监控维度 | 指标 | 告警阈值 |
|----------|------|----------|
| **资源使用** | CPU、内存、磁盘 | > 80% |
| **任务执行** | 成功率、平均耗时 | 成功率 < 95% |
| **API 调用** | Token 消耗、调用次数 | 超出预算 |
| **安全事件** | 越权访问、异常操作 | 实时告警 |

---

## 3. MCP (Model Context Protocol) 是什么？

### 定义

**MCP (Model Context Protocol)** 是由 Anthropic 推出的开放协议，用于标准化 AI 模型与外部工具、数据源之间的集成方式。

> 在 Code-Miner 中："除了内置工具，我们还支持通过 MCP（Model Context Protocol）协议集成外部工具服务。"

### 核心概念

```
┌─────────────────────────────────────────────────────────────┐
│                      MCP 架构                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐         MCP Protocol      ┌───────────┐  │
│   │   AI Agent  │ ◄───── (stdio/SSE/WS) ───►│ MCP Server│  │
│   │  (Client)   │                           │ (Tool)    │  │
│   └─────────────┘                           └─────┬─────┘  │
│                                                   │         │
│                                              ┌────┴────┐    │
│                                              │External │    │
│                                              │Services │    │
│                                              └─────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### MCP vs 传统工具调用

| 特性 | 传统工具调用 | MCP |
|------|--------------|-----|
| **协议** | 各平台自定义 | 标准化协议 |
| **发现** | 硬编码注册 | 动态发现工具 |
| **传输** | HTTP/自定义 | stdio / SSE / WebSocket |
| **上下文** | 手动传递 | 协议级支持 |
| **生态** | 孤立 | 可复用的工具生态 |

### Code-Miner 中的 MCP 实现

#### 配置方式

```json
{
  "mcpServers": [
    {
      "name": "xcontract-mcp-server",
      "description": "契约MCP服务器，提供契约查询、错误码管理等功能",
      "transport": {
        "type": "stdio",
        "config": {
          "command": "npx",
          "args": ["-y", "@tencent/xcontract-mcp-server"]
        }
      },
      "env": {},
      "autoReconnect": true,
      "connectionTimeout": 10000
    }
  ]
}
```

#### 代码集成

```typescript
// MCP 工具注册
async initializeMCPToolsFromConfig(): Promise<void> {
  const mcpServers = await this.configLoader.getMCPServers();
  
  for (const serverConfig of mcpServers) {
    // 连接到 MCP 服务器
    await this.mcpClientManager.registerServer(serverConfig);
    
    // 获取并注册可用工具
    const availableTools = await this.mcpClientManager.getAvailableTools(serverConfig.name);
    await this.registerMCPBatch(availableTools);
  }
}
```

#### MCP 工具使用示例

```bash
# 查询契约信息
code-miner run "查询支付相关的接口契约信息"

# 查询 TDesign 组件
code-miner run "帮我找到适合做表格的 TDesign 组件"

# 查询错误码
code-miner run "查询微信支付相关的错误码列表"
```

### MCP 传输类型

| 类型            | 说明                 | 适用场景   |
| ------------- | ------------------ | ------ |
| **stdio**     | 标准输入输出             | 本地进程通信 |
| **sse**       | Server-Sent Events | 服务端推送  |
| **websocket** | 双向实时通信             | 高频交互   |

### MCP 工具分类（Code-Miner）

| 工具类别    | 示例                   | 功能             |
| ------- | -------------------- | -------------- |
| **契约类** | xcontract-mcp-server | 接口契约查询、错误码管理   |
| **组件类** | tdesign-mcp-server   | TDesign 组件文档查询 |
| **配置类** | xconfig-mcp-server   | 配置中心操作         |
| **日志类** | xlog-mcp-server      | 日志查询分析         |
| **测试类** | xautotest-mcp-server | 测试工具执行         |

---

## 3.x MCP 深度解析

### 3.1 MCP 有哪些分类？

#### 按功能维度分类

| 分类                  | 说明                            | 典型示例             |
| ------------------- | ----------------------------- | ---------------- |
| **资源类 (Resources)** | 提供只读数据访问，如文件、数据库、API 数据       | 文件系统、数据库查询、配置读取  |
| **工具类 (Tools)**     | 可执行的操作，有副作用                   | 代码执行、文件写入、部署操作   |
| **提示类 (Prompts)**   | 预定义的提示模板                      | 代码审查模板、分析 Prompt |
| **采样类 (Sampling)**  | 允许 Server 请求 Client 进行 LLM 推理 | 复杂推理委托           |

#### 按集成深度分类
```
┌─────────────────────────────────────────────────────────────────┐
│                      MCP Server 分类                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  原生工具集成  │  │  服务代理集成  │  │  混合集成     │         │
│  │  (Native)    │  │  (Proxy)     │  │  (Hybrid)    │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │
│         │                 │                 │                   │
│         ▼                 ▼                 ▼                   │
│  • 本地文件系统      • REST API 代理     • 本地缓存 +             │
│  • 本地数据库       • 第三方服务封装       远程服务调用            │
│  • 本地命令执行     • 微服务网关                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Code-Miner 中的 MCP 分类实例

| 分类 | Server 名称 | 功能说明 |
|------|-------------|----------|
| **契约类** | xcontract-mcp-server | Proto 契约查询、接口详情获取 |
| **错误码类** | errorcode-mcp-server | 错误码查询、转义管理 |
| **配置类** | xconfig-mcp-server | XConfig 配置查询与推送 |
| **日志类** | xlog-mcp-server | XLog 日志查询与分析 |
| **元数据类** | unimeta-mcp-server | MMData/OLTP/OLAP 元数据查询 |
| **IDKey 类** | idkey-mcp-server | 监控 IDKey 查询与管理 |
| **测试类** | xautotest-mcp-server | 测试工具执行与数据生成 |
| **组件类** | tdesign-mcp-server | TDesign 组件文档查询 |

---

### 3.2 MCP Server 如何开发？

#### 开发流程

```
┌──────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   定义能力    │──▶│  实现协议    │──▶│  注册工具    │───▶│  发布部署    │
│(Capabilities)│     │  (Protocol) │     │  (Register) │     │  (Deploy)   │
└──────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
• 分析业务场景        • 选择传输方式       • 工具元数据定义     • 包管理器发布
• 设计工具接口        • 实现 MCP 协议      • 参数 Schema 定义   • 容器化部署
• 定义输入输出        • 错误处理机制       • 权限控制          • 服务注册发现
```

#### 基础实现示例（TypeScript）

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// 1. 创建 Server 实例
const server = new Server(
  {
    name: 'my-custom-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},  // 声明支持工具能力
    },
  }
);

// 2. 注册工具列表处理器
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'query_data',
        description: '查询业务数据',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: '查询条件',
            },
            limit: {
              type: 'number',
              description: '返回数量限制',
              default: 10,
            },
          },
          required: ['query'],
        },
      },
    ],
  };
});

// 3. 注册工具调用处理器
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === 'query_data') {
    const { query, limit = 10 } = args;
    
    try {
      // 执行业务逻辑
      const result = await businessQuery(query, limit);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `查询失败: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
  
  throw new Error(`未知工具: ${name}`);
});

// 4. 启动 Server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server 已启动');
}

main().catch(console.error);
```

#### 关键组件说明

| 组件 | 职责 | 实现要点 |
|------|------|----------|
| **Server** | MCP 协议实现 | 处理连接、生命周期管理 |
| **Transport** | 通信层 | stdio/SSE/WS 选择 |
| **Tool Registry** | 工具注册中心 | 动态发现、元数据管理 |
| **Request Handler** | 请求处理器 | 参数校验、业务逻辑、错误处理 |
| **Capability Declaration** | 能力声明 | 让 Client 知道支持什么 |

#### 开发最佳实践

1. **工具设计原则**
   - 单一职责：每个工具只做一件事
   - 明确输入输出：完善的 JSON Schema 定义
   - 幂等性：相同输入产生相同输出（无副作用工具）
   - 错误处理：详细的错误信息和状态码

2. **安全性考虑**
   ```typescript
   // 参数校验示例
   const validateParams = (args: unknown): QueryParams => {
     if (typeof args !== 'object' || args === null) {
       throw new Error('参数必须是对象');
     }
     
     const { query, limit } = args as Record<string, unknown>;
     
     if (typeof query !== 'string' || query.length > 1000) {
       throw new Error('query 必须是长度不超过1000的字符串');
     }
     
     if (limit !== undefined && (typeof limit !== 'number' || limit < 1 || limit > 100)) {
       throw new Error('limit 必须是 1-100 之间的数字');
     }
     
     return { query, limit: limit ?? 10 };
   };
   ```

3. **性能优化**
   - 连接复用：避免频繁创建连接
   - 批量处理：支持批量操作减少往返
   - 缓存机制：静态数据本地缓存
   - 超时控制：防止长时间阻塞

---

### 3.3 Transport 层有哪些？

#### 传输层对比

| 传输方式 | 协议 | 方向 | 适用场景 | 特点 |
|----------|------|------|----------|------|
| **stdio** | 标准输入输出 | 双向 | 本地进程 | 简单、安全、适合 CLI |
| **SSE** | Server-Sent Events | 服务端→客户端 | 服务端推送 | 单向流、HTTP 兼容 |
| **Streamable HTTP** | HTTP/2 或长轮询 | 双向 | Web 服务 | 可穿越防火墙 |
| **WebSocket** | WS/WSS | 全双工 | 实时交互 | 低延迟、双向通信 |

#### 详细说明

**1. stdio（标准输入输出）**

```typescript
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const transport = new StdioServerTransport();
await server.connect(transport);
```

- **工作原理**：通过进程的标准输入输出流通信
- **优点**：
  - 简单直接，无需网络配置
  - 进程隔离，安全性高
  - 适合本地工具集成
- **缺点**：
  - 只能本地使用
  - 不适合分布式场景

**2. SSE（Server-Sent Events）**

```typescript
// 服务端
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

app.get('/sse', async (req, res) => {
  const transport = new SSEServerTransport('/message', res);
  await server.connect(transport);
});

app.post('/message', async (req, res) => {
  // 处理客户端消息
});
```

- **工作原理**：HTTP 长连接，服务端单向推送
- **优点**：
  - HTTP 兼容，易穿越防火墙
  - 支持自动重连
  - 适合服务端主动推送场景
- **缺点**：
  - 仅服务端可主动推送
  - 客户端发送需额外 HTTP 请求

**3. Streamable HTTP**

```typescript
// HTTP 长轮询或 HTTP/2 流
const transport = new StreamableHTTPTransport({
  url: 'https://api.example.com/mcp',
  headers: {
    'Authorization': 'Bearer token',
  },
});
```

- **工作原理**：基于 HTTP 的双向流
- **优点**：
  - 标准 HTTP，广泛兼容
  - 可穿越防火墙和代理
  - 支持负载均衡
- **缺点**：
  - 相比 WebSocket 延迟稍高
  - HTTP/1.1 需要长轮询

**4. WebSocket**

```typescript
import { WebSocketServerTransport } from '@modelcontextprotocol/sdk/server/websocket.js';

const wss = new WebSocketServer({ port: 8080 });
const transport = new WebSocketServerTransport(wss);
await server.connect(transport);
```

- **工作原理**：全双工 TCP 连接
- **优点**：
  - 真正的双向实时通信
  - 低延迟
  - 适合高频交互场景
- **缺点**：
  - 某些防火墙会阻止
  - 需要额外的心跳机制

#### 选型建议

| 场景 | 推荐 Transport | 原因 |
|------|----------------|------|
| 本地 CLI 工具 | stdio | 简单、安全、无需网络 |
| 服务端推送通知 | SSE | HTTP 兼容、支持重连 |
| Web 应用集成 | Streamable HTTP | 防火墙友好、可扩展 |
| 实时协作工具 | WebSocket | 低延迟双向通信 |

---

### 3.4 为什么 MCP 在 Agent 生态里重要？

#### 核心价值

```
┌─────────────────────────────────────────────────────────────────┐
│                    MCP 的核心价值                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
│   │  标准化     │   │  生态互通    │   │  动态扩展    │           │
│   │  (Standard) │   │  (Ecosystem)│   │  (Dynamic)  │           │ 
│   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘           │
│          │                 │                 │                  │
│          ▼                 ▼                 ▼                  │
│   • 统一协议规范      • 工具可复用       • 热插拔能力              │
│   • 降低集成成本      • 跨平台兼容       • 灵活适配业务            │
│   • 开发者友好        • 避免重复造轮子   • 快速演进迭代            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 1. 解决"N x M"问题

**传统模式**：每个 Agent 都要适配每个工具

```
Agent A ──┬── Tool 1
Agent B ──┼── Tool 2
Agent C ──┴── Tool 3
          ...
          └── Tool N

复杂度：O(N x M)
```

**MCP 模式**：一次适配，到处可用

```
Agent A ──┐
Agent B ──┼── MCP Protocol ──┬── Tool 1
Agent C ──┘                  ├── Tool 2
                             ├── Tool 3
                             └── Tool N

复杂度：O(N + M)
```

#### 2. 工具生态的"USB 接口"

就像 USB 统一了外设接口，MCP 统一了 AI 工具接口：

| USB 类比 | MCP 实现 |
|----------|----------|
| 即插即用 | 动态发现工具能力 |
| 统一接口 | 标准化协议定义 |
| 广泛兼容 | 跨平台、跨语言支持 |
| 热插拔 | 运行时添加/移除工具 |

#### 3. Agent 能力边界扩展

```
┌─────────────────────────────────────────────────────────────────┐
│                     Agent 能力演进                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  基础 Agent ────────▶ MCP 增强 Agent ────────▶ 生态 Agent      │
│                                                                 │
│  ┌──────────┐        ┌──────────────┐        ┌──────────────┐  │
│  │ 内置工具  │   +    │ MCP 外部工具  │   =    │ 无限扩展能力  │  │
│  │ • 读文件  │        │ • 代码搜索    │        │ • 数据库查询  │  │
│  │ • 写文件  │        │ • 契约查询    │        │ • 日志分析    │  │
│  │ • Grep   │        │ • 错误码查询  │        │ • 部署操作    │  │
│  └──────────┘        └──────────────┘        └──────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 4. 对 Code-Miner 的意义

| 方面 | 价值 |
|------|------|
| **工具扩展** | 无需修改核心代码即可接入新业务工具 |
| **团队协作** | 业务团队可独立开发 MCP Server |
| **能力复用** | 一个 MCP Server 可被多个 Agent 使用 |
| **快速迭代** | 新能力通过配置即可上线 |

---

## 4. Claude Code / Codex / Manus 这类 Agent 产品的理解与评价

> **Code-Miner 定位**：微信支付内部代码分析 Agent，专注于大规模代码资产的智能分析，而非通用编程助手。

### 4.1 产品概述

| 产品              | 定位                 | 核心特点                  |
| --------------- | ------------------ | --------------------- |
| **Claude Code** | 命令行编程助手            | 深度 IDE 集成、代码编辑能力强     |
| **Codex**       | OpenAI AI 编程 Agent | 端到端任务执行、GitHub 生态深度整合 |
| **Manus**       | 通用 AI Agent        | 多模态、任务规划能力强           |

### 4.2 架构逻辑

```
┌─────────────────────────────────────────────────────────────────┐
│              现代 AI Agent 产品通用架构                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     交互层 (UI/CLI)                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                │   │
│  │  │   Chat   │  │ 编辑器   │  │ 文件管理 │                 │   │
│  │  └──────────┘  └──────────┘  └──────────┘                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                  │
│  ┌───────────────────────────▼──────────────────────────────┐   │
│  │                    Agent Core 层                         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │ Planning │  │  Memory  │  │  Reason  │  │  Action  │  │   │
│  │  │  任务规划 │  │  记忆管理 │  │  推理决策 │  │  执行控制│  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │   │
│  └───────────────────────────┬──────────────────────────────┘   │
│                              │                                  │
│  ┌───────────────────────────▼──────────────────────────────┐   │
│  │                     工具层 (Tools)                        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │   │
│  │  │ File Ops │  │ Terminal │  │   API    │  │ Browser  │  │   │
│  │  │ 文件操作  │  │ 终端执行  │  │ API 调用  │  │ 浏览器  │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**架构特点：**

1. **分层设计**：清晰的职责分离
2. **ReAct 循环**：思考 → 行动 → 观察 → 反思
3. **工具丰富**：文件、终端、浏览器、API 全覆盖
4. **记忆持久**：跨会话上下文保持

### 4.3 与传统 Chat Agent 的差别

| 维度 | 传统 Chat Agent | 现代 Agent (Claude Code/Codex) |
|------|-----------------|--------------------------------|
| **交互模式** | 一问一答 | 自主执行多步骤任务 |
| **工具能力** | 有限或没有 | 丰富的工具集 |
| **执行权限** | 只读建议 | 可实际修改代码/执行命令 |
| **上下文** | 单轮对话 | 完整项目上下文 |
| **反馈机制** | 人工确认 | 自动执行 + 结果反馈 |
| **错误处理** | 人工介入 | 自动重试、自我修复 |

**关键差异点：**

```
传统 Chat Agent:
用户: "帮我修复这个 bug"
Agent: "你可以尝试修改第 X 行的 Y 为 Z"
用户: (手动修改)

现代 Agent (Claude Code/Codex):
用户: "帮我修复这个 bug"
Agent: 
  1. 读取相关文件
  2. 分析错误原因
  3. 生成修复代码
  4. 写入文件
  5. 运行测试验证
  6. 报告结果
```

### 4.4 工程能力如何实现？

#### 1. 沙箱执行环境

```typescript
// 安全的代码执行环境
interface Sandbox {
  // 文件系统隔离
  fs: RestrictedFileSystem;
  
  // 网络访问控制
  network: NetworkPolicy;
  
  // 命令执行限制
  exec: RestrictedExecutor;
  
  // 资源限制
  resources: ResourceLimits;
}
```

#### 2. 工具调用框架

```typescript
// 工具定义
interface Tool {
  name: string;
  description: string;
  parameters: JSONSchema;
  execute: (params: any) => Promise<ToolResult>;
}

// 工具执行结果
interface ToolResult {
  success: boolean;
  output: string;
  error?: string;
  artifacts?: Artifact[];
}
```

#### 3. 上下文管理

| 层级 | 内容 | 管理方式 |
|------|------|----------|
| **系统上下文** | 项目结构、配置文件 | 自动加载 |
| **任务上下文** | 当前任务目标、约束 | 显式传递 |
| **执行上下文** | 工具调用历史、中间结果 | 自动维护 |
| **记忆上下文** | 用户偏好、历史会话 | 持久化存储 |

#### 4. 错误恢复机制

```
执行流程:
  尝试执行
      │
      ▼
  成功? ──Yes──▶ 继续下一步
      │
      No
      │
      ▼
  分析错误原因
      │
      ▼
  可恢复? ──Yes──▶ 自动修复重试
      │
      No
      │
      ▼
  回滚变更
      │
      ▼
  报告用户
```

---

## 5. Claude 的 Agent Research 方法论

> **Code-Miner 的 Research 能力**：项目支持 Batch 批处理模式，可对大规模代码仓库进行离线分析。

### 5.1 Deep Research 要配备哪些工具？

#### 核心工具集

```
┌─────────────────────────────────────────────────────────────────┐
│                   Deep Research 工具栈                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    信息收集层                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │ Web Search│  │  Scholar │  │  Arxiv   │  │ GitHub   │ │  │
│  │  │ 网页搜索  │  │ 学术论文  │  │ 预印本   │  │ 代码库   │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│  ┌───────────────────────────▼──────────────────────────────┐  │
│  │                    分析处理层                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │ PDF Parse│  │  HTML    │  │  Code    │  │  Data    │ │  │
│  │  │ PDF 解析  │  │ 网页解析  │  │ 代码分析  │  │ 数据处理  │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│  ┌───────────────────────────▼──────────────────────────────┐  │
│  │                    知识管理层                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │  │
│  │  │ Vector DB│  │ Graph DB │  │ Document │               │  │
│  │  │ 向量存储  │  │ 知识图谱  │  │ 文档存储  │               │  │
│  │  └──────────┘  └──────────┘  └──────────┘               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 工具详细说明

| 类别     | 工具                          | 用途      |
| ------ | --------------------------- | ------- |
| **搜索** | Web Search API              | 实时信息检索  |
|        | Google Scholar              | 学术论文搜索  |
|        | Arxiv API                   | 最新研究预印本 |
|        | Semantic Scholar            | 语义化论文搜索 |
| **解析** | PDF Parser                  | 论文/报告提取 |
|        | HTML Parser                 | 网页内容提取  |
|        | Markdown Parser             | 文档解析    |
|        | Code Parser                 | 代码库分析   |
| **存储** | Vector DB (Pinecone/Milvus) | 语义检索    |
|        | Graph DB (Neo4j)            | 关系建模    |
|        | Document Store (MongoDB)    | 原始存储    |
| **分析** | Citation Network            | 引用关系分析  |
|        | Topic Modeling              | 主题聚类    |
|        | Trend Analysis              | 趋势识别    |

### 5.2 基础设施如何搭？

#### 架构设计

```
┌─────────────────────────────────────────────────────────────────┐
│                   Research Agent 基础设施                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    API Gateway                            │  │
│  │         (路由 / 限流 / 认证 / 负载均衡)                      │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────────────────▼────────────────────────────────┐  │
│  │                   Agent Orchestrator                      │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │ Scheduler│  │  Queue   │  │ Worker   │  │ Monitor  │ │  │
│  │  │ 任务调度  │  │ 消息队列  │  │ 工作节点  │  │ 监控告警  │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────────────────┼────────────────────────────────┐  │
│  │                         ▼                                 │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │  │
│  │  │ Research │  │ Analysis │  │ Synthesis│  │ Report   │  │  │
│  │  │ 研究模块  │  │ 分析模块  │  │ 综合模块  │  │ 报告模块  │  │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────────────────▼────────────────────────────────┐  │
│  │                    Data Layer                             │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │  Cache   │  │  Vector  │  │  Object  │  │   Log    │ │  │
│  │  │  缓存层   │  │ 向量数据库 │  │ 对象存储  │  │ 日志存储  │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 技术栈推荐

| 层级         | 组件                   | 推荐方案 |
| ---------- | -------------------- | ---- |
| **网关**     | Kong / Nginx         | 统一入口 |
| **队列**     | Redis / RabbitMQ     | 任务调度 |
| **Worker** | Celery / Bull        | 异步执行 |
| **向量存储**   | Pinecone / Milvus    | 语义检索 |
| **图数据库**   | Neo4j / Dgraph       | 知识图谱 |
| **对象存储**   | S3 / MinIO           | 原始文档 |
| **缓存**     | Redis                | 热点数据 |
| **监控**     | Prometheus + Grafana | 指标监控 |

#### 部署架构

```
                    ┌──────────────┐
                    │   CDN        │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  Load Balancer│
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌─────▼─────┐      ┌────▼────┐
   │ Agent   │       │   Agent   │      │  Agent  │
   │ Pod 1   │       │   Pod 2   │      │  Pod N  │
   └────┬────┘       └─────┬─────┘      └────┬────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────▼────┐ ┌─────▼────┐ ┌────▼─────┐
        │  Redis   │ │  Vector  │ │  Object  │
        │  Cluster │ │   DB     │ │ Storage  │
        └──────────┘ └──────────┘ └──────────┘
```

### 5.3 安全和基建的挑战是什么？

#### 安全挑战

| 挑战 | 风险 | 应对策略 |
|------|------|----------|
| **信息泄露** | 敏感数据被 LLM 学习 | 数据脱敏、私有化部署 |
| **提示注入** | 恶意输入操控 Agent | 输入过滤、沙箱执行 |
| **权限滥用** | Agent 执行越权操作 | 最小权限、操作审计 |
| **数据污染** | 错误信息影响结论 | 多源验证、可信度评分 |
| **网络攻击** | 外部搜索引入恶意内容 | URL 白名单、内容过滤 |

#### 基建挑战

| 挑战 | 问题描述 | 解决方案 |
|------|----------|----------|
| **成本控制** | LLM API 调用成本高 | 缓存策略、模型分级、批量处理 |
| **延迟优化** | 研究任务耗时长 | 流式输出、异步处理、预加载 |
| **质量保证** | 生成内容准确性不稳定 | 多模型交叉验证、人工审核 |
| **扩展性** | 高并发场景下的性能 | 水平扩展、无状态设计 |
| **数据 freshness** | 知识更新不及时 | 增量更新、实时搜索 |

#### 安全架构建议

```
┌─────────────────────────────────────────────────────────────────┐
│                      安全分层架构                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layer 1: 输入层                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • 输入验证 (Validation)                                  │  │
│  │  • 敏感信息检测 (PII Detection)                            │  │
│  │  • 提示注入防护 (Prompt Injection Guard)                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Layer 2: 执行层                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • 沙箱环境 (Sandbox)                                     │  │
│  │  • 权限控制 (RBAC)                                        │  │
│  │  • 资源限制 (Resource Limits)                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Layer 3: 数据层                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • 数据加密 (Encryption)                                  │  │
│  │  • 访问审计 (Audit Log)                                   │  │
│  │  • 数据脱敏 (Data Masking)                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Layer 4: 输出层                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • 内容审核 (Content Moderation)                          │  │
│  │  • 来源引用 (Source Citation)                             │  │
│  │  • 置信度标注 (Confidence Score)                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 阶段总结：架构与方法论

| 问题类别 | 核心要点 | Code-Miner 实现 |
|----------|----------|-----------------|
| **Agent vs Workflow** | Agent 适合动态决策，Workflow 适合确定性任务 | 选择 Agent 架构处理不确定的代码分析任务 |
| **企业级架构** | BFF + Agent Core + Tool Server + Worker 分层设计 | `agent.ts` + `tool-registry.ts` + MCP 扩展 |
| **MCP 协议** | 标准化工具集成协议，解决 N x M 问题 | 支持 8+ MCP Server（契约、配置、日志等） |
| **现代 Agent 产品** | 从"建议"到"执行"的范式转变 | ReAct Loop + 31 个内置工具 |
| **Research Agent** | 信息收集 → 分析处理 → 知识管理三层架构 | 支持 Batch 批处理模式 |

### Code-Miner 核心能力映射

```
┌─────────────────────────────────────────────────────────────────┐
│                 Code-Miner 能力全景                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  架构层                                                         │
│  ────────                                                       │
│  ├── ReAct Loop        → src/agent/agent.ts                    │
│  ├── 父子 Agent        → src/agent/sub-agent.ts                │
│  ├── MCP 扩展          → src/mcp/                              │
│  └── Batch 批处理      → src/batch/                            │
│                                                                 │
│  记忆层                                                         │
│  ────────                                                       │
│  ├── 短期记忆          → src/memory/base-memory.ts             │
│  ├── 持久化记忆        → src/memory/persistent-memory.ts       │
│  ├── 滑动窗口+总结     → src/memory/conversation-summary-*.ts  │
│  └── 任务状态          → src/tools/persistent-todolist-tool.ts │
│                                                                 │
│  工具层                                                         │
│  ────────                                                       │
│  ├── 代码分析          → ast-tool.ts, xcgi-proto-tool.ts       │
│  ├── 文件操作          → read-file-tool.ts, write-file-tool.ts │
│  ├── 代码搜索          → grep-tool.ts, find-files-tool.ts      │
│  ├── 命令执行          → bash-tool.ts, python-tool.ts          │
│  └── MCP 工具          → mcp-tool.ts                           │
│                                                                 │
│  安全层                                                         │
│  ────────                                                       │
│  ├── 文件隔离          → 白名单目录 /data/ai_analysis          │
│  ├── 沙箱执行          → firejail + cgroup                     │
│  └── 资源限制          → 内存 512MB, CPU 60s, 进程 50          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. 多轮对话中的长短期记忆怎么做？

> **面试重点**：这是 Agent 工程的核心问题，展示你对上下文管理的理解。

### 记忆分类体系

```
┌─────────────────────────────────────────────────────────────────┐
│                    Agent 记忆分层架构                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    长期记忆 (Long-term)                    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │  │
│  │  │ 用户画像  │  │ 项目知识  │  │ 偏好设置  │               │  │
│  │  │ Profile  │  │Knowledge │  │Preference│               │  │
│  │  └──────────┘  └──────────┘  └──────────┘               │  │
│  │                    持久化存储 (DB/File)                   │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────────────────▼────────────────────────────────┐  │
│  │                    任务记忆 (Task Memory)                  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │  │
│  │  │ TodoList │  │ 执行历史  │  │ 中间结果  │               │  │
│  │  │  任务列表 │  │History   │  │ Results  │               │  │
│  │  └──────────┘  └──────────┘  └──────────┘               │  │
│  │                    会话级持久化                           │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  ┌─────────────────────────▼────────────────────────────────┐  │
│  │                    短期记忆 (Short-term)                   │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │  │
│  │  │ 对话历史  │  │ 上下文窗口 │  │ 工具调用  │               │  │
│  │  │ History  │  │ Context  │  │ ToolCalls│               │  │
│  │  └──────────┘  └──────────┘  └──────────┘               │  │
│  │                    内存存储 (In-Memory)                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.1 Short-term Memory 怎么实现？

#### 基础实现（BaseMemory）

```typescript
/**
 * 基础 Memory 实现 - 简单的缓冲区模式
 */
export class BaseMemory implements IMemory {
  /** 消息历史 */
  protected messages: ChatCompletionMessageParam[] = [];
  
  /** 系统提示词 */
  protected systemPrompt?: string;
  
  /** Token 估算器 */
  protected tokenEstimator: ITokenEstimator;
  
  /**
   * 添加用户消息
   */
  addUserMessage(content: string): void {
    this.messages.push({
      role: 'user',
      content
    });
  }
  
  /**
   * 添加助手消息
   */
  addAssistantMessage(content: string, toolCalls?: any[]): void {
    const message: ChatCompletionMessageParam = {
      role: 'assistant',
      content
    };
    
    if (toolCalls && toolCalls.length > 0) {
      (message as any).tool_calls = toolCalls;
    }
    
    this.messages.push(message);
  }
  
  /**
   * 添加工具调用结果
   */
  addToolResult(result: ToolCallResultForMemory): void {
    this.messages.push({
      role: 'tool',
      tool_call_id: result.tool_call_id,
      content: result.output
    });
  }
  
  /**
   * 获取所有消息
   */
  getMessages(): ChatCompletionMessageParam[] {
    return [...this.messages];
  }
}
```

#### Token 估算策略

```typescript
/**
 * 简单的 Token 估算器
 * 使用混合策略：中文按 2 字符/token，其他按 4 字符/token
 */
export class SimpleTokenEstimator implements ITokenEstimator {
  estimateText(text: string): number {
    if (!text) return 0;
    
    // 统计中文字符数
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const otherChars = text.length - chineseChars;
    
    // 中文约 2 字符/token，其他约 4 字符/token
    return Math.ceil(chineseChars / 2) + Math.ceil(otherChars / 4);
  }
  
  estimate(messages: ChatCompletionMessageParam[]): number {
    let totalTokens = 0;
    
    for (const msg of messages) {
      // 角色 token（约 4 个）
      totalTokens += 4;
      
      // 内容 token
      if (typeof msg.content === 'string') {
        totalTokens += this.estimateText(msg.content);
      }
      
      // 工具调用 token
      if ('tool_calls' in msg && msg.tool_calls) {
        for (const toolCall of msg.tool_calls) {
          totalTokens += 10; // 工具调用结构开销
          if ('function' in toolCall) {
            totalTokens += this.estimateText(toolCall.function.name);
            totalTokens += this.estimateText(toolCall.function.arguments);
          }
        }
      }
    }
    
    return totalTokens;
  }
}
```

### 6.2 Long-term Memory 怎么实现？

#### 持久化 Memory（PersistentMemory）

```typescript
/**
 * 持久化 Memory 实现
 * 将对话历史存储到 SQLite 数据库，支持跨会话恢复
 */
export class PersistentMemory implements IMemory {
  private readonly agentId: string;
  private readonly dbManager: AgentDatabaseManager;
  private systemPrompt?: string;
  private tokenEstimator: SimpleTokenEstimator;

  /** 内存缓存的消息（避免频繁读取数据库） */
  private cachedMessages: ChatCompletionMessageParam[] = [];
  private cacheValid: boolean = false;

  constructor(config: PersistentMemoryConfig) {
    this.agentId = config.agentId;
    this.dbManager = config.dbManager || getAgentDatabaseManager();
    this.systemPrompt = config.systemPrompt ?? '';
    this.tokenEstimator = new SimpleTokenEstimator();

    // 尝试从数据库恢复
    this.reload();
  }
  
  /**
   * 从数据库恢复消息
   */
  private reload(): void {
    const dbMessages = this.dbManager.getMessages(this.agentId);
    this.cachedMessages = dbMessages.map(dbMsg => this.dbMessageToOpenAI(dbMsg));
    this.cacheValid = true;
  }
  
  /**
   * 添加用户消息（同步到数据库）
   */
  addUserMessage(content: string): void {
    this.dbManager.addMessage(this.agentId, 'user', content);
    this.invalidateCache();
  }
  
  /**
   * 使缓存失效
   */
  private invalidateCache(): void {
    this.cacheValid = false;
    this.cachedMessages = [];
  }
}
```

#### 历史总结策略（ConversationSummaryBufferMemory）
```typescript
/**
 * ConversationSummaryBufferMemory 实现
 * 结合滑动窗口和历史总结的混合策略
 * 
 * 工作原理：
 * 1. 保留最近 N 轮完整对话（滑动窗口）
 * 2. 超出窗口的历史消息会被总结压缩
 * 3. 总结内容作为系统消息的一部分保留
 */
export class ConversationSummaryBufferMemory extends BaseMemory 
  implements ISummarizableMemory {
  
  /** 总结配置 */
  private summarizationConfig: SummarizationConfig;
  
  /** 当前总结内容 */
  private summary: string = '';
  
  /** 总结器 */
  private summarizer: ISummarizer | null = null;

  /**
   * 构造函数
   */
  constructor(
    config: Partial<SummarizationConfig> = {},
    summarizer?: ISummarizer,
    tokenEstimator?: ITokenEstimator
  ) {
    super({}, tokenEstimator);
    
    this.summarizationConfig = {
      enabled: true,
      triggerTokenThreshold: 80000,  // 80K tokens 触发总结
      keepRecentTurns: 5,            // 保留最近 5 轮对话
      summaryMaxTokens: 2000,        // 总结最多 2000 tokens
      summaryPrompt: DEFAULT_SUMMARY_PROMPT,
      ...config
    };
    
    this.summarizer = summarizer || null;
  }
  
  /**
   * 检查是否需要总结
   */
  needsSummarization(): boolean {
    const tokenCount = this.estimateTokenCount();
    return tokenCount > this.summarizationConfig.triggerTokenThreshold;
  }
  
  /**
   * 强制执行总结
   */
  async forceSummarize(): Promise<void> {
    if (!this.summarizer) {
      throw new Error('未设置总结器，无法执行总结');
    }

    // 识别对话轮次
    const turns = this.identifyTurns();
    
    // 如果轮次不足，不执行总结
    if (turns.length <= this.summarizationConfig.keepRecentTurns) {
      return;
    }

    // 获取需要总结的历史消息（超出保留窗口的部分）
    const messagesToSummarize = this.getMessagesToSummarize(turns);
    
    // 生成总结
    const newSummary = await this.summarizer.summarize(
      messagesToSummarize,
      this.summary // 增量更新现有总结
    );
    
    // 更新总结
    this.summary = newSummary;
    
    // 只保留最近 N 轮完整对话
    this.retainRecentTurns(turns);
    
    // 更新系统消息
    this.updateSystemMessageWithSummary();
  }
}
```

### 6.3 Task Memory 是什么？

Task Memory 是指与**当前任务执行状态**相关的记忆，主要包括：

| 类型 | 内容 | 用途 | Code-Miner 实现 |
|------|------|------|-----------------|
| **任务列表** | TodoList 状态 | 追踪任务进度 | `PersistentTodoListTool` |
| **执行历史** | 工具调用链 | 分析执行路径 | `AgentDatabaseManager` |
| **中间结果** | 文件分析结果 | 避免重复计算 | 内存缓存 + 持久化 |
| **断点状态** | 执行进度标记 | 支持任务恢复 | `enableResume` 机制 |

```typescript
/**
 * 持久化 TodoList 工具
 * 将任务状态持久化到数据库
 */
export class PersistentTodoListTool extends BaseTool {
  private agentDbManager: AgentDatabaseManager;
  private agentId: string;

  async execute(args: { action: string; todo?: TodoItem }): Promise<ToolResult> {
    switch (args.action) {
      case 'add':
        this.agentDbManager.addTodo(this.agentId, args.todo);
        break;
      case 'update':
        this.agentDbManager.updateTodo(this.agentId, args.todo.id, args.todo);
        break;
      case 'getAll':
        return {
          todos: this.agentDbManager.getTodos(this.agentId)
        };
    }
  }
}
```

### 面试回答模板

```
面试官：请设计 Agent 的记忆机制？

回答框架：

1. 记忆分层设计（1分钟）
   "Agent 的记忆需要分层设计：
   
   第一层：短期记忆（Working Memory）
   - 当前对话上下文
   - 存储在内存中
   - Code-Miner 用 BaseMemory 实现
   
   第二层：任务记忆（Task Memory）
   - TodoList 状态、执行历史
   - 会话级持久化
   - Code-Miner 用 SQLite 存储
   
   第三层：长期记忆（Long-term Memory）
   - 用户画像、项目知识
   - 跨会话持久化
   - 可用向量数据库实现"

2. 关键技术点（1分钟）
   "核心挑战是 Token 限制，解决方案：
   
   - Token 估算：实时估算上下文大小
   - 触发机制：超过阈值自动压缩
   - 滑动窗口：保留最近 N 轮完整对话
   - 历史总结：压缩早期对话为摘要

   Code-Miner 的 ConversationSummaryBufferMemory
   就是滑动窗口 + 历史总结的混合策略。"

3. 持久化策略（30秒）
   "持久化确保 Agent 可以恢复状态：
   - SQLite 存储消息历史和 TodoList
   - 支持断点续传
   - 2 天数据保留期"

4. 性能优化（30秒）
   "内存缓存 + 数据库持久化：
   - 读多写少场景用缓存
   - 写操作同步到数据库
   - 批量写入减少 IO"
```

### 深度追问及应对

**追问 1：如何处理超长对话历史？**

```
回答要点：

Code-Miner 的三段式策略：

┌─────────────────────────────────────────────────────────────┐
│                    上下文组成                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  第一段：系统消息 + 历史总结（约 20% Token）                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [系统提示词]                                         │   │
│  │ [历史对话总结]  ←── 早期对话压缩后的摘要              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  第二段：近期完整对话（约 40% Token）                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ User: 最近 5 轮完整对话                              │   │
│  │ Assistant: ...                                       │   │
│  │ User: ...                                            │   │
│  │ Assistant: ...                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  第三段：相关检索内容（约 40% Token）                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [从向量数据库检索的相关历史]                          │   │
│  │ [根据当前 Query 动态加载]                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

触发条件：
- Token 数超过 80,000（可配置）
- 自动执行滚动总结
```

**追问 2：Token 估算如何实现？**

```typescript
// Code-Miner 的 Token 估算实现
export class SimpleTokenEstimator implements ITokenEstimator {
  /**
   * 估算单个文本的 Token 数
   * 混合策略：中文 2 字符/token，其他 4 字符/token
   */
  estimateText(text: string): number {
    if (!text) return 0;
    
    // 统计中文字符
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const otherChars = text.length - chineseChars;
    
    // 混合计算
    return Math.ceil(chineseChars / 2) + Math.ceil(otherChars / 4);
  }
  
  /**
   * 估算消息数组的 Token 数
   */
  estimate(messages: ChatCompletionMessageParam[]): number {
    let totalTokens = 0;
    
    for (const msg of messages) {
      // 角色开销
      totalTokens += 4;
      
      // 内容
      if (typeof msg.content === 'string') {
        totalTokens += this.estimateText(msg.content);
      }
      
      // 工具调用
      if ('tool_calls' in msg && msg.tool_calls) {
        for (const toolCall of msg.tool_calls) {
          totalTokens += 10; // 结构开销
          totalTokens += this.estimateText(toolCall.function.name);
          totalTokens += this.estimateText(toolCall.function.arguments);
        }
      }
    }
    
    return totalTokens;
  }
}
```

**追问 3：记忆系统如何保证一致性？**

```
回答要点：

Code-Miner 的状态一致性保障：

1. 原子性写入
   ├── 数据库事务保证
   └── 写入失败自动回滚

2. 版本控制
   ├── 每次更新增加版本号
   ├── 乐观锁防止并发冲突
   └── 冲突时提示刷新

3. 缓存一致性
   ├── 写后失效（Write-through）
   ├── 读取时检查版本
   └── 定期刷新缓存

4. 定期快照
   ├── 每隔 N 步保存完整状态
   ├── 崩溃后可从快照恢复
   └── 保留多个历史版本
```

---

## 7. 上下文机制的完整实现流程是什么？

### 7.1 写入策略（Memory Gating）

```
┌─────────────────────────────────────────────────────────────────┐
│                    Memory Gating 流程                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  消息输入                                                       │
│      │                                                          │
│      ▼                                                          │
│  ┌──────────────┐                                               │
│  │  消息分类    │                                               │
│  │ Categorize   │                                               │
│  └──────┬───────┘                                               │
│         │                                                       │
│    ┌────┴────┬────────┬─────────┐                               │
│    ▼         ▼        ▼         ▼                               │
│ ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐                            │
│ │User │  │Asst │  │Tool │  │Sys  │                            │
│ └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘                            │
│    │        │        │        │                                 │
│    ▼        ▼        ▼        ▼                                 │
│ ┌─────────────────────────────────┐                            │
│ │      Token 估算                 │                            │
│ │  estimateTokenCount()           │                            │
│ └───────────┬─────────────────────┘                            │
│             │                                                   │
│             ▼                                                   │
│     ┌───────────────┐                                           │
│     │ 阈值检查      │                                           │
│     │ > threshold?  │                                           │
│     └───────┬───────┘                                           │
│             │                                                   │
│      ┌──────┴──────┐                                            │
│      ▼             ▼                                            │
│   否 / No      是 / Yes                                         │
│      │             │                                            │
│      ▼             ▼                                            │
│ ┌────────┐    ┌─────────────────┐                               │
│ │ 直接   │    │ 触发压缩/总结   │                               │
│ │ 写入   │    │ compress()      │                               │
│ └────────┘    └────────┬────────┘                               │
│                        │                                        │
│                        ▼                                        │
│                ┌───────────────┐                                │
│                │ 写入 Memory   │                                │
│                │ (更新缓存)    │                                │
│                └───────────────┘                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**写入过滤策略：**

| 策略 | 说明 | 实现 |
|------|------|------|
| **去重** | 过滤重复消息 | 内容哈希比对 |
| **敏感信息过滤** | 移除 PII 数据 | 正则匹配 + NLP 检测 |
| **压缩大消息** | 超大工具输出截断 | 超过阈值自动摘要 |
| **批量写入** | 减少 IO 次数 | 聚合后批量持久化 |

### 7.2 读取策略（Recency + Relevance）

```typescript
/**
 * 上下文读取策略
 * 综合考虑时间衰减和相关性
 */
interface ContextRetrievalStrategy {
  /**
   * 时间衰减权重
   * 越近的消息权重越高
   */
  recencyWeight: number;
  
  /**
   * 语义相关性权重
   * 与当前查询越相关的消息权重越高
   */
  relevanceWeight: number;
  
  /**
   * 重要性权重
   * 关键决策点、错误信息等重要性高
   */
  importanceWeight: number;
}

/**
 * 计算消息得分
 */
function calculateMessageScore(
  message: ChatCompletionMessageParam,
  currentQuery: string,
  messageIndex: number,
  totalMessages: number
): number {
  // 时间衰减得分 (越新越高)
  const recencyScore = messageIndex / totalMessages;
  
  // 语义相关性得分 (需要嵌入模型)
  const relevanceScore = calculateSemanticSimilarity(
    message.content as string,
    currentQuery
  );
  
  // 重要性得分 (基于消息类型和模式)
  const importanceScore = calculateImportance(message);
  
  // 加权综合
  return (
    recencyScore * 0.4 +
    relevanceScore * 0.4 +
    importanceScore * 0.2
  );
}
```

### 7.3 Rerank 如何做？

```
┌─────────────────────────────────────────────────────────────────┐
│                    Rerank 流程                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1: 粗排 (Recall)                                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  基于关键词/向量检索，召回候选集                            │  │
│  │  Top-K (如 100 条)                                         │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  Step 2: 精排 (Rerank)                                       │
│  ┌─────────────────────────▼────────────────────────────────┐  │
│  │                                                          │  │
│  │  方法一：Cross-Encoder                                   │  │
│  │  - 使用 BERT 等模型计算查询-文档相关性                     │  │
│  │  - 精度高但速度慢                                         │  │
│  │                                                          │  │
│  │  方法二：LLM Reranker                                    │  │
│  │  - 让 LLM 判断相关性                                      │  │
│  │  - 灵活但成本高                                           │  │
│  │                                                          │  │
│  │  方法三：规则 Reranker                                   │  │
│  │  - 基于业务规则排序                                       │  │
│  │  - 速度快、可解释                                         │  │
│  │                                                          │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  Step 3: 选择 (Selection)                                    │
│  ┌─────────────────────────▼────────────────────────────────┐  │
│  │  基于 Token 预算选择最终上下文                            │  │
│  │  - 按得分排序                                             │  │
│  │  - 累加 Token 直到达到预算上限                            │  │
│  │  - 保证系统消息和最近 N 轮对话                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.4 如何保证状态稳定？

#### 状态一致性机制

```typescript
/**
 * 状态管理策略
 */
interface StateConsistencyStrategy {
  /**
   * 原子性写入
   * 使用数据库事务保证操作原子性
   */
  atomicWrites: boolean;
  
  /**
   * 版本控制
   * 每次更新增加版本号，支持乐观锁
   */
  versioning: boolean;
  
  /**
   * 定期快照
   * 定时保存完整状态快照
   */
  periodicSnapshots: boolean;
  
  /**
   * 恢复机制
   * 支持从快照恢复状态
   */
  recoveryFromSnapshot: boolean;
}

/**
 * Code-Miner 状态保证实现
 */
class StateManager {
  /**
   * 带版本控制的更新
   */
  async updateWithVersion(
    agentId: string,
    update: StateUpdate
  ): Promise<void> {
    return await this.db.transaction(async (trx) => {
      // 1. 获取当前版本
      const current = await trx
        .select('version')
        .from('agent_state')
        .where('agent_id', agentId)
        .forUpdate()
        .first();
      
      // 2. 检查版本冲突
      if (current.version !== update.expectedVersion) {
        throw new Error('状态版本冲突，请刷新后重试');
      }
      
      // 3. 执行更新
      await trx('agent_state')
        .where('agent_id', agentId)
        .update({
          ...update.data,
          version: current.version + 1,
          updated_at: new Date()
        });
    });
  }
  
  /**
   * 创建状态快照
   */
  async createSnapshot(agentId: string): Promise<void> {
    const state = await this.getFullState(agentId);
    await this.db('agent_snapshots').insert({
      agent_id: agentId,
      snapshot: JSON.stringify(state),
      created_at: new Date()
    });
  }
}
```

---

## 8. 超 Token 怎么处理？

### 8.1 Rolling Summary（滚动总结）

```typescript
/**
 * 滚动总结策略
 * 当历史消息超过阈值时，自动触发总结
 */
interface RollingSummaryConfig {
  /** 触发总结的 Token 阈值 */
  triggerThreshold: number;
  
  /** 保留最近 N 轮完整对话不被总结 */
  preserveRecentTurns: number;
  
  /** 总结的最大 Token 数 */
  maxSummaryTokens: number;
  
  /** 总结间隔（最少多少轮总结一次） */
  minTurnsBetweenSummaries: number;
}

/**
 * 执行滚动总结
 */
async function performRollingSummary(
  memory: ConversationSummaryBufferMemory,
  config: RollingSummaryConfig
): Promise<void> {
  // 1. 检查 Token 数
  const tokenCount = memory.estimateTokenCount();
  
  if (tokenCount <= config.triggerThreshold) {
    return; // 未达到阈值
  }
  
  // 2. 获取最近轮次
  const turns = memory.identifyTurns();
  
  if (turns.length <= config.preserveRecentTurns) {
    return; // 轮次不足，不总结
  }
  
  // 3. 识别需要总结的消息（保留最近 N 轮）
  const cutoffIndex = turns[turns.length - config.preserveRecentTurns].startIndex;
  const messagesToSummarize = memory.getMessages().slice(0, cutoffIndex);
  
  // 4. 生成总结
  const summary = await generateSummary(messagesToSummarize, {
    maxTokens: config.maxSummaryTokens,
    preserveKeyInfo: ['task_list', 'current_focus', 'key_decisions']
  });
  
  // 5. 更新记忆状态
  memory.setSummary(summary);
  memory.removeMessages(0, cutoffIndex);
}
```

### 8.2 State Extraction（状态提取）
```typescript
/**
 * 关键状态提取
 * 从对话中提取核心状态，大幅减少 Token 占用
 */
interface ExtractedState {
  /** 用户意图 */
  userIntent: string;
  
  /** 当前任务 */
  currentTask: string;
  
  /** 任务进度 */
  taskProgress: number;
  
  /** 关键决策点 */
  keyDecisions: string[];
  
  /** 发现的文件/代码 */
  discoveredFiles: string[];
  
  /** 待处理问题 */
  pendingIssues: string[];
  
  /** 上下文变量 */
  contextVars: Record<string, any>;
}

/**
 * 状态提取提示词
 */
const STATE_EXTRACTION_PROMPT = `
请从以下对话中提取关键状态信息，输出 JSON 格式：

{
  "userIntent": "用户的主要意图",
  "currentTask": "当前正在进行的任务",
  "taskProgress": 50, // 进度百分比
  "keyDecisions": ["关键决策1", "关键决策2"],
  "discoveredFiles": ["/path/to/file1", "/path/to/file2"],
  "pendingIssues": ["待处理问题1"],
  "contextVars": {
    "key": "value"
  }
}

要求：
1. 只保留关键信息，删除所有闲聊内容
2. 保留所有文件路径、函数名、错误信息
3. 保留任务列表状态
4. 输出必须是合法 JSON
`;

/**
 * 状态提取函数
 */
async function extractState(
  messages: ChatCompletionMessageParam[],
  llmClient: LLMClient
): Promise<ExtractedState> {
  const extractionPrompt = {
    role: 'system',
    content: STATE_EXTRACTION_PROMPT
  };
  
  const response = await llmClient.chat.completions.create({
    messages: [extractionPrompt, ...messages],
    response_format: { type: 'json_object' }
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

### 8.3 RAG / Retrieval（检索增强）

```
┌─────────────────────────────────────────────────────────────────┐
│                    RAG 上下文管理                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 文档切分与索引                                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  原始文档 → 文本切分 → 向量化 → 向量数据库                 │  │
│  │  (Document) (Chunking) (Embedding)  (Vector DB)          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│  2. 检索阶段                                                   │
│  ┌───────────────────────────▼──────────────────────────────┐  │
│  │  用户查询 → 向量化 → 相似度检索 → 获取 Top-K 片段         │  │
│  │  (Query)  (Embed)   (Similarity)    (Chunks)             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│  3. 上下文组装                                                 │
│  ┌───────────────────────────▼──────────────────────────────┐  │
│  │                                                          │  │
│  │  系统提示词                                              │  │
│  │  + 总结信息                                              │  │
│  │  + 检索到的相关片段                                      │  │
│  │  + 最近 N 轮对话                                         │  │
│  │  ─────────────────────────                               │  │
│  │  = 完整上下文（控制在 Token 限制内）                      │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 8.4 三段式组合策略

```typescript
/**
 * 三段式上下文管理策略
 * 结合多种技术，在不同阶段应用不同策略
 */
interface ThreeStageContextStrategy {
  /**
   * 第一段：近期上下文（保留完整对话）
   * 保留最近 N 轮完整对话，确保短期记忆完整
   */
  recentContext: {
    enabled: boolean;
    preserveTurns: number;  // 保留轮数
  };
  
  /**
   * 第二段：中期上下文（滚动总结）
   * 对中期历史进行滚动总结
   */
  midTermContext: {
    enabled: boolean;
    summaryTriggerTokens: number;
    maxSummaryTokens: number;
  };
  
  /**
   * 第三段：长期上下文（RAG 检索）
   * 对长期历史进行向量化存储和检索
   */
  longTermContext: {
    enabled: boolean;
    vectorStore: VectorStore;
    retrievalTopK: number;
  };
}

/**
 * 三段式上下文组装
 */
async function assembleThreeStageContext(
  strategy: ThreeStageContextStrategy,
  fullHistory: ChatCompletionMessageParam[],
  currentQuery: string
): Promise<ChatCompletionMessageParam[]> {
  const context: ChatCompletionMessageParam[] = [];
  let tokenBudget = MAX_CONTEXT_TOKENS;
  
  // ===== 第一段：近期上下文 =====
  if (strategy.recentContext.enabled) {
    const recentTurns = extractRecentTurns(
      fullHistory, 
      strategy.recentContext.preserveTurns
    );
    const recentTokens = estimateTokens(recentTurns);
    
    context.unshift(...recentTurns);
    tokenBudget -= recentTokens;
  }
  
  // ===== 第二段：中期上下文（总结）=====
  if (strategy.midTermContext.enabled && tokenBudget > 0) {
    const midTermHistory = extractMidTermHistory(fullHistory);
    
    if (estimateTokens(midTermHistory) > strategy.midTermContext.summaryTriggerTokens) {
      const summary = await generateSummary(midTermHistory, {
        maxTokens: Math.min(
          strategy.midTermContext.maxSummaryTokens,
          tokenBudget * 0.3  // 最多占用 30% 预算
        )
      });
      
      context.unshift({
        role: 'system',
        content: `[历史总结] ${summary}`
      });
      tokenBudget -= estimateTokens(summary);
    }
  }
  
  // ===== 第三段：长期上下文（检索）=====
  if (strategy.longTermContext.enabled && tokenBudget > 0) {
    const relevantChunks = await strategy.longTermContext.vectorStore.similaritySearch(
      currentQuery,
      strategy.longTermContext.retrievalTopK
    );
    
    const relevantContext = formatRetrievedChunks(relevantChunks);
    const relevantTokens = estimateTokens(relevantContext);
    
    if (relevantTokens <= tokenBudget * 0.4) {  // 最多占用 40% 预算
      context.unshift({
        role: 'system',
        content: `[相关历史] ${relevantContext}`
      });
    }
  }
  
  // 添加系统提示词
  context.unshift({
    role: 'system',
    content: SYSTEM_PROMPT
  });
  
  return context;
}
```

**三段式策略对比：**

| 阶段      | 时间范围   | 策略     | Token 占比 | 完整性  |
| ------- | ------ | ------ | -------- | ---- |
| **第一段** | 最近 N 轮 | 完整保留   | 30%      | 100% |
| **第二段** | 中期历史   | 滚动总结   | 30%      | ~20% |
| **第三段** | 长期历史   | RAG 检索 | 40%      | 按需检索 |

---

## 9. 如何保证代码能运行？

> **面试重点**：展示你对安全隔离和沙箱技术的深入理解，这是企业级 Agent 的必备能力。

### 代码执行 sandbox 是什么？

```
Sandbox（沙箱）= 一个受控的执行环境

目的：
• 隔离代码执行，防止影响主机系统
• 限制资源使用（CPU、内存、网络）
• 防止恶意代码攻击

类比：
就像给代码一个"游乐场"，它可以在里面随意玩耍，
但无法破坏"游乐场"之外的任何东西。
```

### 是否真实执行代码？

```
是的，真实执行，但在隔离环境中

Code-Miner 的实现策略：
┌─────────────────────────────────────────────────────────────────┐
│                     代码执行策略                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PythonTool / BashTool 执行流程：                                │
│                                                                 │
│  1. 接收代码                                                    │
│     ┌─────────┐                                                 │
│     │ Python  │ 或  │ Bash │                                    │
│     │  代码   │     │ 命令 │                                    │
│     └────┬────┘     └───┬──┘                                    │
│          │               │                                      │
│          └───────┬───────┘                                      │
│                  ▼                                               │
│  2. 安全检查     ┌─────────────────┐                            │
│     • 危险命令检测│ Security Check  │                            │
│     • 路径白名单 │                 │                            │
│     • 代码注入检查└────────┬────────┘                            │
│                            │                                     │
│  3. 沙箱隔离                 ▼                                     │
│     ┌──────────────────────────────┐                            │
│     │      firejail Sandbox        │                            │
│     │  • 网络隔离（默认禁用）       │                            │
│     │  • 文件系统隔离              │                            │
│     │  • 资源限制（内存、CPU）      │                            │
│     │  • 进程隔离                  │                            │
│     └─────────────┬────────────────┘                            │
│                   │                                              │
│  4. 执行代码      ▼                                              │
│              ┌─────────┐                                         │
│              │ 执行    │  ◄── 真实执行，但受限于沙箱              │
│              │ 代码    │                                         │
│              └────┬────┘                                         │
│                   │                                              │
│  5. 收集结果      ▼                                              │
│              ┌─────────┐                                         │
│              │ 返回    │  • stdout                               │
│              │ 结果    │  • stderr                               │
│              │         │  • 执行状态                              │
│              └─────────┘                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 沙箱原理是什么？

#### Linux 沙箱技术栈

```
┌─────────────────────────────────────────────────────────────────┐
│                  Linux 沙箱技术层次                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  应用层沙箱（Code-Miner 使用）                                    │
│  ─────────────────────────────                                   │
│  ┌─────────────────────────────────────────┐                    │
│  │  firejail                               │                    │
│  │  • namespace 隔离（PID、Network、Mount） │                    │
│  │  • seccomp-bpf 系统调用过滤              │                    │
│  │  • cgroup 资源限制                       │                    │
│  │  • capabilities 权限控制                 │                    │
│  └─────────────────────────────────────────┘                    │
│                              │                                  │
│  系统调用层                   │                                  │
│  ───────────                 ▼                                  │
│  ┌─────────────────────────────────────────┐                    │
│  │  seccomp-bpf                            │                    │
│  │  过滤危险的系统调用                      │                    │
│  └─────────────────────────────────────────┘                    │
│                              │                                  │
│  内核层                       ▼                                  │
│  ───────                    ┌──────────────────────────────┐    │
│                             │  Linux Namespaces            │    │
│                             │  • PID namespace: 进程隔离    │    │
│                             │  • NET namespace: 网络隔离    │    │
│                             │  • MNT namespace: 文件系统隔离 │    │
│                             │  • IPC namespace: IPC 隔离    │    │
│                             └──────────────────────────────┘    │
│                                              │                  │
│                                              ▼                  │
│                             ┌──────────────────────────────┐    │
│                             │  cgroups (v1/v2)             │    │
│                             │  • CPU 限制                  │    │
│                             │  • 内存限制                  │    │
│                             │  • IO 限制                   │    │
│                             │  • 进程数限制                │    │
│                             └──────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Code-Miner 的 firejail 沙箱实现

```typescript
// PythonTool 中的沙箱配置
interface SandboxConfig {
  /** 是否启用沙箱，默认 true */
  enabled: boolean;
  /** 是否禁用网络，默认 true */
  networkDisabled: boolean;
  /** 只读路径列表 */
  readOnlyPaths?: string[];
  /** 白名单路径 */
  whitelistPaths?: string[];
  /** 内存限制，如 '512m' */
  memoryLimit?: string;
  /** CPU 时间限制（秒） */
  cpuLimit?: number;
  /** 进程数限制 */
  processLimit?: number;
  /** 文件大小限制 */
  fileSizeLimit?: string;
}

// 默认沙箱配置（安全默认值）
const DEFAULT_SANDBOX_CONFIG: SandboxConfig = {
  enabled: true,
  networkDisabled: true,
  readOnlyPaths: ['/usr', '/lib', '/lib64', '/bin', '/sbin'],
  memoryLimit: '512m',
  cpuLimit: 60,
  processLimit: 50,
  fileSizeLimit: '50m'
};

/**
 * 构建 firejail 命令
 */
private buildFirejailCommand(
  pythonPath: string,
  scriptPath: string,
  config: SandboxConfig
): string {
  const args: string[] = ['firejail'];
  
  // 网络隔离
  if (config.networkDisabled) {
    args.push('--net=none');
  }
  
  // 内存限制
  if (config.memoryLimit) {
    args.push(`--rlimit-as=${config.memoryLimit}`);
  }
  
  // CPU 限制
  if (config.cpuLimit) {
    args.push(`--rlimit-cpu=${config.cpuLimit}`);
  }
  
  // 进程数限制
  if (config.processLimit) {
    args.push(`--rlimit-nproc=${config.processLimit}`);
  }
  
  // 文件大小限制
  if (config.fileSizeLimit) {
    args.push(`--rlimit-fsize=${config.fileSizeLimit}`);
  }
  
  // 只读路径
  if (config.readOnlyPaths) {
    for (const path of config.readOnlyPaths) {
      args.push(`--read-only=${path}`);
    }
  }
  
  // 白名单路径
  if (config.whitelistPaths) {
    for (const path of config.whitelistPaths) {
      args.push(`--whitelist=${path}`);
    }
  }
  
  // 私有 home 和 tmp
  if (config.privateHome) {
    args.push('--private');
  }
  if (config.privateTmp) {
    args.push('--private-tmp');
  }
  
  // 执行命令
  args.push(pythonPath, scriptPath);
  
  return args.join(' ');
}
```

### 用 Docker / VM / Container 隔离？

#### 不同隔离方案对比

| 方案 | 隔离级别 | 启动速度 | 资源占用 | 适用场景 |
|------|----------|----------|----------|----------|
| **firejail** | 进程级 | 毫秒级 | 极低 | 单次代码执行 |
| **Docker** | 容器级 | 秒级 | 低 | 复杂环境、多服务 |
| **VM** | 系统级 | 分钟级 | 高 | 强隔离要求 |
| **Kata Container** | VM 级 | 秒级 | 中 | 安全 + 效率兼顾 |

#### Code-Miner 的选择

```
为什么选择 firejail 而非 Docker？

1. 启动速度
   • firejail: 毫秒级启动
   • Docker: 秒级启动
   • Agent 需要频繁执行代码，速度很重要

2. 资源开销
   • firejail: 几乎没有额外开销
   • Docker: 需要容器运行时

3. 复杂度
   • firejail: 简单直接
   • Docker: 需要镜像管理、网络配置等

4. 适用场景
   • firejail: 适合短期、简单的代码执行
   • Docker: 适合长期运行的服务

但 firejail 也有局限：
• 在 Docker 容器内运行时隔离能力受限
• 无法提供完整的系统环境
• 不适合需要复杂依赖的场景
```

### 资源限制如何实现？

#### cgroup 资源限制

```bash
# CPU 限制（限制使用 1 个核心）
echo 100000 > /sys/fs/cgroup/cpu/app/cpu.cfs_quota_us
echo 100000 > /sys/fs/cgroup/cpu/app/cpu.cfs_period_us

# 内存限制（限制 512MB）
echo 536870912 > /sys/fs/cgroup/memory/app/memory.limit_in_bytes

# 进程数限制（限制最多 50 个进程）
echo 50 > /sys/fs/cgroup/pids/app/pids.max
```

#### Code-Miner 的资源限制实现

```typescript
// firejail 资源限制参数映射
const resourceLimits = {
  // 内存限制
  memory: (limit: string) => `--rlimit-as=${limit}`,
  
  // CPU 时间限制（秒）
  cpu: (seconds: number) => `--rlimit-cpu=${seconds}`,
  
  // 进程数限制
  nproc: (count: number) => `--rlimit-nproc=${count}`,
  
  // 文件大小限制
  fsize: (limit: string) => `--rlimit-fsize=${limit}`,
  
  // 堆栈大小限制
  stack: (limit: string) => `--rlimit-stack=${limit}`,
  
  // 打开文件数限制
  nofile: (count: number) => `--rlimit-nofile=${count}`
};

// 超时控制
const executeWithTimeout = (
  command: string,
  timeoutMs: number
): Promise<ExecutionResult> => {
  return new Promise((resolve, reject) => {
    const child = exec(command, { timeout: timeoutMs }, 
      (error, stdout, stderr) => {
        if (error) {
          if (error.killed) {
            resolve({
              success: false,
              stdout,
              stderr: `Execution timeout after ${timeoutMs}ms`,
              exitCode: -1
            });
          } else {
            resolve({
              success: false,
              stdout,
              stderr: stderr || error.message,
              exitCode: error.code || -1
            });
          }
        } else {
          resolve({ success: true, stdout, stderr, exitCode: 0 });
        }
      }
    );
  });
};
```

#### 资源限制策略

```
┌─────────────────────────────────────────────────────────────────┐
│                    资源限制策略                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  默认限制（保守）：                                              │
│  • 内存: 512MB                                                  │
│  • CPU: 60 秒                                                   │
│  • 进程数: 50                                                   │
│  • 文件大小: 50MB                                               │
│  • 网络: 禁用                                                   │
│                                                                 │
│  可配置级别：                                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  config.json 配置                                         │  │
│  │  {                                                        │  │
│  │    "pythonTool": {                                        │  │
│  │      "sandbox": {                                         │  │
│  │        "memoryLimit": "1g",                               │  │
│  │        "cpuLimit": 120,                                   │  │
│  │        "networkDisabled": false  // 谨慎开启               │  │
│  │      }                                                    │  │
│  │    }                                                      │  │
│  │  }                                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  重要：                                                          │
│  • 模型无法通过参数覆盖安全配置                                   │
│  • 只能通过配置文件或命令行修改                                   │
│  • 防止 prompt injection 攻击导致的安全配置绕过                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 面试回答模板

```
面试官：Agent 如何安全执行代码？

回答框架：

1. 安全威胁分析（30秒）
   "Agent 执行代码面临多种威胁：
   - 文件系统破坏：删除/覆盖重要文件
   - 资源耗尽：死循环占用 CPU/内存
   - 网络攻击：访问恶意 URL、数据外泄
   - 权限提升：利用漏洞获取更高权限"

2. 沙箱隔离方案（1分钟）
   "Code-Miner 采用多层防护：

   第一层：文件系统隔离
   - 白名单目录限制（/data/ai_analysis）
   - 只读路径保护（/usr, /lib）
   - 写入前路径检查

   第二层：进程隔离
   - firejail 沙箱
   - namespace 隔离（PID、网络、文件系统）
   - seccomp-bpf 系统调用过滤

   第三层：资源限制
   - 内存限制（默认 512MB）
   - CPU 时间限制（默认 60 秒）
   - 进程数限制（默认 50）"

3. 为什么选择 firejail（30秒）
   "- 启动快：毫秒级，适合频繁执行
    - 开销小：几乎没有额外资源占用
    - 安全性：Linux 内核级隔离
    - 相比 Docker：更轻量，更适合单次代码执行"

4. 安全最佳实践（30秒）
   "- 最小权限原则：默认禁用所有危险操作
    - 配置不可覆盖：模型无法绕过安全配置
    - 全面审计：记录所有执行命令
    - 超时保护：防止死循环"
```

### 深度追问及应对

**追问 1：firejail 和 Docker 的区别？什么场景选哪个？**

```
回答要点：

┌─────────────────────────────────────────────────────────────────┐
│                    firejail vs Docker 对比                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  维度          firejail              Docker                     │
│  ─────────────────────────────────────────────────────────────  │
│  隔离级别      进程级                容器级                      │
│  启动时间      毫秒级                秒级                        │
│  资源开销      极低                  中等                        │
│  隔离强度      中等                  较强                        │
│  环境完整性    依赖宿主机            完整独立环境                 │
│  网络隔离      支持                  支持                        │
│  文件系统      隔离                  完全隔离                    │
│  使用场景      单次命令/代码执行     服务部署、复杂环境           │
│                                                                 │
│  Code-Miner 选型依据：                                          │
│  ─────────────────────                                          │
│  ✓ 需要频繁执行短时任务（代码片段、命令）                         │
│  ✓ 启动速度优先                                                 │
│  ✓ 不需要复杂的环境依赖                                         │
│  ✓ 资源开销要小                                                 │
│                                                                 │
│  什么时候用 Docker：                                             │
│  ─────────────────────                                          │
│  ✓ 需要完整独立环境（特定 Python 版本、依赖库）                   │
│  ✓ 长时间运行的服务                                             │
│  ✓ 需要更强的隔离性                                             │
│  ✓ 需要网络服务暴露                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**追问 2：如何防止 Prompt Injection 导致的安全绕过？**
```
回答要点：

Code-Miner 的多层防护：

1. 配置层防护
   ├── 安全配置只能通过 config.json 设置
   ├── 模型无法通过对话参数修改
   └── 命令行参数优先级最高

2. 输入验证
   ├── 危险命令黑名单检测
   │   - rm -rf
   │   - sudo
   │   - chmod 777
   │   - curl | bash
   └── 路径穿越检测（../）

3. 执行层防护
   ├── 所有命令在沙箱内执行
   ├── 资源限制防止资源耗尽攻击
   └── 超时机制防止死循环

4. 代码示例
   ```typescript
   // PythonTool 中的安全检查
   private validateCode(code: string): void {
     const dangerousPatterns = [
       /rm\s+-rf/,           // 删除命令
       /sudo\s+/,            // 提权命令
       /chmod\s+777/,        // 权限修改
       />\s*\//,            // 根目录写入
       /curl.*\|.*bash/,     // 远程脚本执行
     ];
     
     for (const pattern of dangerousPatterns) {
       if (pattern.test(code)) {
         throw new SecurityError(
           `检测到危险操作模式: ${pattern.source}`
         );
       }
     }
   }
   
   // 执行时忽略模型传入的 sandbox 参数
   private getEffectiveSandboxConfig(): SandboxConfig {
     // 只使用配置文件的设置，忽略模型参数
     return this.configSandbox || DEFAULT_SANDBOX_CONFIG;
   }
   ```
```

**追问 3：沙箱逃逸有哪些方式？如何防范？**

```
回答要点：

常见沙箱逃逸方式：

┌─────────────────────────────────────────────────────────────────┐
│                    沙箱逃逸攻击向量                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 符号链接攻击                                                │
│     攻击：ln -s /etc/passwd /tmp/fake                           │
│     防范：禁止符号链接或解析真实路径                              │
│                                                                 │
│  2. 文件描述符泄露                                              │
│     攻击：通过 /proc/self/fd 访问宿主机文件                      │
│     防范：屏蔽 /proc 目录                                        │
│                                                                 │
│  3. Namespace 逃逸                                              │
│     攻击：利用内核漏洞逃逸 namespace                             │
│     防范：保持内核更新，使用 seccomp 限制                        │
│                                                                 │
│  4. 资源耗尽                                                    │
│     攻击：fork 炸弹消耗系统资源                                  │
│     防范：进程数限制 + 内存限制                                  │
│                                                                 │
│  5. 网络侧信道                                                  │
│     攻击：通过 DNS 查询泄露数据                                  │
│     防范：默认禁用网络                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Code-Miner 的防范措施：

1. 符号链接处理
   ```typescript
   // 解析真实路径，防止符号链接攻击
   const realPath = fs.realpathSync(requestedPath);
   if (!isAllowedPath(realPath)) {
     throw new SecurityError('路径不在白名单内');
   }
   ```

2. /proc 目录屏蔽
   ```bash
   firejail --blacklist=/proc/self/fd
   ```

3. 资源限制
   ```bash
   firejail --rlimit-nproc=50 --rlimit-as=512m
   ```

4. 网络隔离
   ```bash
   firejail --net=none
   ```
```

---

## 10. LangChain 用了什么工具？

> **Code-Miner 工具集**：项目内置 31 个工具，支持 MCP 协议扩展，覆盖代码分析全流程。

### Code-Miner vs LangChain 工具对比

| 维度         | LangChain  | Code-Miner            |
| ---------- | ---------- | --------------------- |
| **工具数量**   | 数百个（社区贡献）  | 31 个内置 + 无限 MCP 扩展    |
| **代码分析**   | 有限支持       | ✅ 深度支持（AST、Proto、RPC） |
| **微信支付生态** | ❌ 无        | ✅ 深度集成（契约、配置、日志）      |
| **扩展方式**   | 自定义 Tool 类 | MCP 协议（标准化）           |
| **沙箱执行**   | 需自行实现      | ✅ 内置 firejail 隔离      |

### Retriever

#### 什么是 Retriever？

```
Retriever = 检索器 = 从向量数据库中检索相关文档

作用：
• 根据查询找到最相关的文档片段
• 为 LLM 提供上下文信息
• 实现 RAG (Retrieval-Augmented Generation)

类比：
就像图书管理员，根据你的问题找到最相关的书籍章节
```

#### Retriever 工作流程

```
┌─────────────────────────────────────────────────────────────────┐
│                    Retriever 工作流程                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 文档切分                                                     │
│     ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│     │ 长文档   │→│ 切分    │→│ 短片段   │                      │
│     │         │  │ chunk   │  │ chunks  │                      │
│     └─────────┘  └─────────┘  └─────────┘                      │
│                                                                 │
│  2. 向量化                                                       │
│     ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│     │ 文本片段 │→│ Embedding│→│ 向量    │                      │
│     │ chunk   │  │ Model   │  │ vector  │                      │
│     └─────────┘  └─────────┘  └─────────┘                      │
│                                                                 │
│  3. 存储到向量数据库                                              │
│     ┌─────────────────────────────────────────┐                  │
│     │  Vector Store (FAISS, Pinecone, etc.)   │                  │
│     │  • 向量索引                              │                  │
│     │  • 元数据存储                            │                  │
│     └─────────────────────────────────────────┘                  │
│                                                                 │
│  4. 检索（Runtime）                                              │
│     ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│     │ 用户查询 │→│ Embedding│→│ 相似度  │                      │
│     │ query   │  │         │  │ 搜索    │                      │
│     └─────────┘  └─────────┘  └────┬────┘                      │
│                                    │                            │
│                                    ▼                            │
│                              ┌─────────┐                        │
│                              │ Top-K   │                        │
│                              │ 相关文档 │                        │
│                              └─────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### LangChain Retriever 类型

| Retriever | 特点 | 适用场景 |
|-----------|------|----------|
| **VectorStoreRetriever** | 基于向量相似度 | 通用场景 |
| **MultiQueryRetriever** | 生成多查询 | 提高召回率 |
| **ContextualCompression** | 压缩检索结果 | 长文档处理 |
| **EnsembleRetriever** | 多路召回融合 | 高召回要求 |
| **SelfQueryRetriever** | 结构化查询 | 元数据过滤 |

### Reranker

#### 什么是 Reranker？

```
Reranker = 重排序器 = 对初筛结果进行精排

为什么需要？
• 向量检索是粗排，速度快但精度有限
• Reranker 是精排，速度慢但精度高
• 两者结合：快 + 准

类比：
Retriever 像海选，找出 100 个候选人
Reranker 像决赛评委，从中选出最棒的 5 个
```

#### Reranker 工作流程

```
┌─────────────────────────────────────────────────────────────────┐
│                    Reranker 工作流程                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 初始检索（Retriever）                                        │
│     Query → Vector Search → Top 100 候选文档                     │
│                              ↓                                  │
│  2. 精排（Reranker）              ↓                              │
│     ┌──────────────────────────────────────────────────────┐   │
│     │  Cross-Encoder / LLM Reranker                        │   │
│     │                                                      │   │
│     │  输入: Query + Document                              │   │
│     │  输出: 相关性分数 (0-1)                               │   │
│     │                                                      │   │
│     │  score₁ = Reranker(Query, Doc₁)                      │   │
│     │  score₂ = Reranker(Query, Doc₂)                      │   │
│     │  ...                                                 │   │
│     │  score₁₀₀ = Reranker(Query, Doc₁₀₀)                  │   │
│     └──────────────────────────────────────────────────────┘   │
│                              ↓                                  │
│  3. 最终选择                                                    │
│     按分数排序 → 取 Top 5                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Reranker vs Retriever 对比

| 特性 | Retriever | Reranker |
|------|-----------|----------|
| **阶段** | 粗排 | 精排 |
| **输入** | Query | Query + Document |
| **计算** | 向量点积（快） | 交叉编码（慢） |
| **数量** | 处理大量（Top-K 大） | 处理少量（Top-K 小） |
| **精度** | 较低 | 较高 |
| **典型模型** | Embedding (BGE, OpenAI) | Cross-Encoder (BGE-Reranker, Cohere) |

#### 代码示例

```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CrossEncoderReranker
from langchain_community.cross_encoders import HuggingFaceCrossEncoder

# 1. 基础 Retriever
base_retriever = vectorstore.as_retriever(search_kwargs={"k": 10})

# 2. 添加 Reranker
model = HuggingFaceCrossEncoder(model_name="BAAI/bge-reranker-base")
compressor = CrossEncoderReranker(model=model, top_n=3)

# 3. 组合使用
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=base_retriever
)

# 4. 检索
docs = compression_retriever.get_relevant_documents("什么是 Transformer?")
# 返回经过 Reranker 精排的 Top 3 文档
```

### LangChain 工具生态

```
┌─────────────────────────────────────────────────────────────────┐
│                    LangChain 工具生态                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Document Loaders                                               │
│  ────────────────                                               │
│  • TextLoader, PDFLoader, CSVLoader                            │
│  • WebBaseLoader, ArxivLoader, WikipediaLoader                 │
│  • UnstructuredFileLoader                                       │
│                                                                 │
│  Text Splitters                                                 │
│  ──────────────                                                 │
│  • RecursiveCharacterTextSplitter                              │
│  • TokenTextSplitter                                            │
│  • MarkdownHeaderTextSplitter                                   │
│                                                                 │
│  Vector Stores                                                  │
│  ────────────                                                   │
│  • FAISS, Chroma, Pinecone, Weaviate                           │
│  • Milvus, Qdrant, PGVector                                     │
│                                                                 │
│  Retrievers                                                     │
│  ─────────                                                      │
│  • VectorStoreRetriever                                        │
│  • MultiQueryRetriever                                          │
│  • EnsembleRetriever                                            │
│  • ContextualCompressionRetriever (含 Reranker)                 │
│                                                                 │
│  Tools (Agent 使用)                                              │
│  ──────────────────                                              │
│  • Search (Google, Bing, DuckDuckGo)                           │
│  • Calculator, WolframAlpha                                     │
│  • Arxiv, PubMed, Wikipedia                                     │
│  • ShellTool, PythonREPL                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Code-Miner 工具全景

```
┌─────────────────────────────────────────────────────────────────┐
│                 Code-Miner 内置工具分类                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  代码分析类                                                     │
│  ───────────                                                   │
│  ├── ast-tool.ts          AST 语法树分析                        │
│  ├── xcgi-proto-tool.ts   XCGI 协议解析                         │
│  ├── xwi-proto-tool.ts    XWI 协议解析                          │
│  ├── check-rpc-tool.ts    RPC 接口检查                          │
│  └── har-tool.ts          HAR 文件分析                          │
│                                                                 │
│  文件操作类                                                     │
│  ───────────                                                   │
│  ├── read-file-tool.ts    读取文件                              │
│  ├── write-file-tool.ts   写入文件（白名单限制）                 │
│  ├── edit-file-tool.ts    编辑文件                              │
│  ├── ls-tool.ts           列出目录                              │
│  ├── mv-tool.ts           移动文件                              │
│  └── find-files-tool.ts   查找文件                              │
│                                                                 │
│  搜索查询类                                                     │
│  ───────────                                                   │
│  ├── grep-tool.ts         代码搜索（基于 ripgrep）               │
│  └── opengrok-tool.ts     OpenGrok 集成                         │
│                                                                 │
│  执行类                                                         │
│  ───────────                                                   │
│  ├── bash-tool.ts         Shell 命令执行                        │
│  └── python-tool.ts       Python 代码执行                       │
│                                                                 │
│  任务管理类                                                     │
│  ───────────                                                   │
│  ├── todolist-tool.ts           内存 TodoList                   │
│  ├── persistent-todolist-tool.ts 持久化 TodoList                │
│  └── complete-all-todos-tool.ts 批量完成 Todo                   │
│                                                                 │
│  Agent 能力类                                                   │
│  ───────────                                                   │
│  ├── sub-agent-tool.ts    创建子 Agent                          │
│  ├── mcp-tool.ts          MCP 工具调用                          │
│  ├── finish-task-tool.ts  结束任务                              │
│  └── reporter-tool.ts     生成报告                              │
│                                                                 │
│  工具类                                                         │
│  ───────────                                                   │
│  ├── json-utils-tool.ts   JSON 处理                             │
│  ├── fetch-url-tool.ts    URL 获取                              │
│  └── git-tool.ts          Git 操作                              │
│                                                                 │
│  MCP 扩展（8+）                                                 │
│  ───────────                                                   │
│  ├── xcontract-mcp-server 契约查询                               │
│  ├── xconfig-mcp-server   配置管理                              │
│  ├── xlog-mcp-server      日志查询                              │
│  ├── idkey-mcp-server     IDKey 监控                            │
│  ├── xautotest-mcp-server 测试工具                              │
│  └── tdesign-mcp-server   组件文档                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 附录：Code-Miner 项目关键文件索引

| 模块             | 文件路径                                               | 说明             |
| -------------- | -------------------------------------------------- | -------------- |
| **Agent 核心**   | `src/agent/agent.ts`                               | ReAct Loop 主循环 |
| **子 Agent**    | `src/agent/sub-agent.ts`                           | 任务委派实现         |
| **工具注册**       | `src/tools/tool-registry.ts`                       | 31 个工具管理       |
| **Memory 基类**  | `src/memory/base-memory.ts`                        | 短期记忆实现         |
| **持久化 Memory** | `src/memory/persistent-memory.ts`                  | SQLite 持久化     |
| **总结 Memory**  | `src/memory/conversation-summary-buffer-memory.ts` | 滑动窗口 + 总结      |
| **MCP 管理**     | `src/mcp/manager.ts`                               | MCP 协议实现       |
| **Python 沙箱**  | `src/tools/python-tool.ts`                         | firejail 隔离    |
| **Bash 沙箱**    | `src/tools/bash-tool.ts`                           | 命令执行隔离         |
| **数据库管理**      | `src/agent/agent-database-manager.ts`              | 消息/任务持久化       |
| **配置加载**       | `src/utils/config-loader/config-loader.ts`         | 配置管理           |
| **CLI 入口**     | `src/cli/index.ts`                                 | 命令行入口          |

---

## 实战案例：复杂SQL识别与分析

> **案例背景**：这是一个真实的代码分析场景，展示Code-Miner如何识别和分析复杂SQL语句，提取其中的表关系、查询逻辑和潜在性能问题。

### 场景描述
**用户输入**：
```
请分析这个SQL文件的复杂度和潜在问题：
文件径：/data/mm64/yohanzhang/QQMail/biz_config_op/app/mmpayxdcxitilapplication/src/db/sql/db.sql
```

**预期目标**：
1. 识别SQL语句类型（SELECT/INSERT/UPDATE/DELETE）
2. 提取涉及的表和字段
3. 分析JOIN关系和查询复杂度
4. 识别潜在性能问题（如全表扫描、缺少索引等）
5. 生成分析报告

---

### 第一步：任务拆解（Task Planning）
**Agent思考过程**：
```
用户要求分析SQL文件，这是一个典型的代码分析任务。

我需要：
1. 先读取SQL文件内容
2. 解析SQL语句结构
3. 分析复杂度和潜在问题
4. 生成报告

让我创建TodoList来跟踪这个任务：
```

**创建的TodoList**：
```typescript
// Agent内部状态
[
  {
    id: "1",
    content: "读取SQL文件内容",
    status: "pending",
    parentId: null
  },
  {
    id: "2", 
    content: "解析SQL语句，识别语句类型和结构",
    status: "pending",
    parentId: null
  },
  {
    id: "2-1",
    content: "提取所有SELECT语句",
    status: "pending", 
    parentId: "2"
  },
  {
    id: "2-2",
    content: "提取所有INSERT/UPDATE/DELETE语句",
    status: "pending",
    parentId: "2"
  },
  {
    id: "3",
    content: "分析表关系和JOIN复杂度",
    status: "pending",
    parentId: null
  },
  {
    id: "4",
    content: "识别潜在性能问题",
    status: "pending",
    parentId: null
  },
  {
    id: "5",
    content: "生成分析报告",
    status: "pending",
    parentId: null
  }
]
```

---

### 第二步：读取文件（Tool Execution）

**Agent决策**：
```
第一个任务是读取SQL文件。我应该使用read-file-tool来读取文件内容。

工具选择：read-file-tool
理由：
- 文件在指定路径存在
- 需要获取完整内容进行分析
- 文件大小在合理范围内
```

**工具调用**：

```json
{
  "tool": "read-file-tool",
  "arguments": {
    "filePath": "/data/mm64/yohanzhang/QQMail/biz_config_op/app/mmpayxdcxitilapplication/src/db/sql/db.sql"
  }
}
```

**执行结果**（部分展示）：

```sql
-- db.sql 内容（406行）
-- 表结构定义
CREATE TABLE IF NOT EXISTS config_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(255) NOT NULL,
    config_value TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_config_key (config_key),
    INDEX idx_category (category)
);

-- 复杂查询1：多表JOIN查询
SELECT 
    ci.id,
    ci.config_key,
    ci.config_value,
    cc.name as category_name,
    u.username as created_by_name
FROM config_items ci
LEFT JOIN config_categories cc ON ci.category = cc.code
LEFT JOIN users u ON ci.created_by = u.id
WHERE ci.category IN (
    SELECT code FROM config_categories 
    WHERE is_active = 1 AND priority > 5
)
AND ci.updated_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY ci.updated_at DESC
LIMIT 100;

-- 复杂查询2：嵌套子查询
SELECT 
    category,
    COUNT(*) as config_count,
    AVG(CHAR_LENGTH(config_value)) as avg_value_length
FROM config_items
WHERE config_key LIKE 'payment_%'
GROUP BY category
HAVING config_count > 10
ORDER BY config_count DESC;

-- 更新语句：潜在性能问题
UPDATE config_items 
SET config_value = REPLACE(config_value, 'old_value', 'new_value')
WHERE category = 'payment';
```

**更新Todo状态**：
```typescript
// 任务1完成
{
  id: "1",
  content: "读取SQL文件内容",
  status: "completed",
  result: "成功读取406行SQL代码"
}
```

---

### 第三步：SQL解析（Analysis Strategy）

**Agent思考**：
```
文件已读取，现在需要解析SQL语句。我有几个选择：

方案1：使用正则表达式提取（简单但不精确）
方案2：使用SQL解析器（准确但复杂）
方案3：调用Python工具使用sqlparse库（平衡）

我选择方案3，因为：
- Code-Miner的python-tool支持在沙箱中执行Python代码
- sqlparse库可以准确解析SQL结构
- 可以处理复杂的嵌套查询
```

**工具调用**：

```json
{
  "tool": "python-tool",
  "arguments": {
    "code": "
import sqlparse
import json
import re

# SQL内容（从文件读取）
sql_content = '''...上一步读取的内容...'''

# 解析SQL语句
statements = sqlparse.split(sql_content)

results = {
    'total_statements': len(statements),
    'statement_types': {},
    'complex_queries': [],
    'tables': set(),
    'issues': []
}

for stmt in statements:
    stmt = stmt.strip()
    if not stmt:
        continue
    
    # 解析SQL
    parsed = sqlparse.parse(stmt)[0]
    stmt_type = parsed.get_type()
    
    # 统计语句类型
    results['statement_types'][stmt_type] = 
        results['statement_types'].get(stmt_type, 0) + 1
    
    # 提取表名
    from_seen = False
    for token in parsed.tokens:
        if token.ttype in (sqlparse.tokens.Keyword, sqlparse.tokens.Keyword.DML):
            if token.value.upper() == 'FROM':
                from_seen = True
            elif from_seen and token.ttype == sqlparse.tokens.Name:
                results['tables'].add(token.value)
                from_seen = False
    
    # 分析复杂度
    complexity_score = 0
    query_info = {
        'type': stmt_type,
        'length': len(stmt),
        'has_join': 'JOIN' in stmt.upper(),
        'has_subquery': 'SELECT' in stmt.upper()[stmt.upper().find('FROM'):],
        'has_group_by': 'GROUP BY' in stmt.upper(),
        'has_order_by': 'ORDER BY' in stmt.upper(),
        'has_limit': 'LIMIT' in stmt.upper()
    }
    
    # 计算复杂度分数
    if query_info['has_join']:
        join_count = stmt.upper().count('JOIN')
        complexity_score += join_count * 2
        query_info['join_count'] = join_count
    
    if query_info['has_subquery']:
        complexity_score += 3
    
    if query_info['has_group_by']:
        complexity_score += 2
    
    if query_info['has_order_by']:
        complexity_score += 1
    
    query_info['complexity_score'] = complexity_score
    
    # 识别复杂查询（分数>3）
    if complexity_score > 3:
        results['complex_queries'].append({
            'sql_preview': stmt[:200] + '...' if len(stmt) > 200 else stmt,
            'complexity_score': complexity_score,
            'details': query_info
        })
    
    # 识别潜在问题
    # 问题1：SELECT * 
    if re.search(r'SELECT\s+\*', stmt, re.IGNORECASE):
        results['issues'].append({
            'type': 'SELECT_STAR',
            'severity': 'MEDIUM',
            'description': '使用SELECT *可能影响性能，建议指定具体字段',
            'sql_preview': stmt[:100]
        })
    
    # 问题2：缺少WHERE条件的UPDATE/DELETE
    if stmt_type in ('UPDATE', 'DELETE') and 'WHERE' not in stmt.upper():
        results['issues'].append({
            'type': 'MISSING_WHERE',
            'severity': 'HIGH',
            'description': f'{stmt_type}语句缺少WHERE条件，可能误操作全表数据',
            'sql_preview': stmt[:100]
        })
    
    # 问题3：OFFSET过大（深度分页问题）
    offset_match = re.search(r'OFFSET\s+(\d+)', stmt, re.IGNORECASE)
    if offset_match and int(offset_match.group(1)) > 10000:
        results['issues'].append({
            'type': 'DEEP_PAGINATION',
            'severity': 'MEDIUM',
            'description': f'OFFSET值过大({offset_match.group(1)})，建议改用游标分页',
            'sql_preview': stmt[:100]
        })
    
    # 问题4：NOT IN子查询（可能导致性能问题）
    if re.search(r'NOT\s+IN\s*\(', stmt, re.IGNORECASE):
        results['issues'].append({
            'type': 'NOT_IN_SUBQUERY',
            'severity': 'LOW',
            'description': 'NOT IN子查询在NULL值处理上可能有问题，建议使用NOT EXISTS或LEFT JOIN',
            'sql_preview': stmt[:100]
        })

# 转换set为list以便JSON序列化
results['tables'] = list(results['tables'])

print(json.dumps(results, indent=2, ensure_ascii=False))
    "
  }
}
```

**执行结果**：

```json
{
  "total_statements": 12,
  "statement_types": {
    "CREATE": 3,
    "SELECT": 5,
    "INSERT": 2,
    "UPDATE": 2
  },
  "tables": [
    "config_items",
    "config_categories", 
    "users"
  ],
  "complex_queries": [
    {
      "sql_preview": "SELECT ci.id, ci.config_key, ci.config_value, cc.name...",
      "complexity_score": 6,
      "details": {
        "type": "SELECT",
        "has_join": true,
        "join_count": 2,
        "has_subquery": true,
        "has_group_by": false,
        "has_order_by": true,
        "has_limit": true
      }
    },
    {
      "sql_preview": "SELECT category, COUNT(*) as config_count...",
      "complexity_score": 5,
      "details": {
        "type": "SELECT",
        "has_join": false,
        "has_subquery": false,
        "has_group_by": true,
        "has_order_by": true,
        "has_limit": false
      }
    }
  ],
  "issues": [
    {
      "type": "SELECT_STAR",
      "severity": "MEDIUM",
      "description": "使用SELECT *可能影响性能，建议指定具体字段",
      "sql_preview": "SELECT * FROM config_items WHERE category = 'payment'"
    },
    {
      "type": "MISSING_WHERE",
      "severity": "HIGH", 
      "description": "UPDATE语句缺少WHERE条件，可能误操作全表数据",
      "sql_preview": "UPDATE config_items SET config_value = REPLACE..."
    }
  ]
}
```

**更新Todo状态**：
```typescript
// 任务2完成
{
  id: "2",
  content: "解析SQL语句，识别语句类型和结构",
  status: "completed",
  result: "识别12条语句，3个复杂查询，2个潜在问题"
}
```

---

### 第四步：深度分析（Deep Analysis）

**Agent思考**：
```
基础解析已完成，现在需要更深入的分析：
1. 分析JOIN性能（驱动表选择、索引使用）
2. 分析子查询是否可以优化
3. 检查是否有重复查询模式

我需要使用bash-tool来执行一些额外的检查。
```

**工具调用 - 检查索引使用情况**：

```json
{
  "tool": "bash-tool",
  "arguments": {
    "command": "
# 使用explain分析查询执行计划
mysql -u root -p password -e \"
EXPLAIN SELECT 
    ci.id,
    ci.config_key,
    ci.config_value,
    cc.name as category_name
FROM config_items ci
LEFT JOIN config_categories cc ON ci.category = cc.code
WHERE ci.category IN (
    SELECT code FROM config_categories WHERE is_active = 1
)
ORDER BY ci.updated_at DESC
LIMIT 100;
\" 2>&1 || echo 'Note: MySQL not available, using mock analysis'
    
# 分析SQL文件中的表结构
echo '=== Table Structure Analysis ==='
grep -A 10 'CREATE TABLE' /data/mm64/yohanzhang/QQMail/biz_config_op/app/mmpayxdcxitilapplication/src/db/sql/db.sql
    
# 统计JOIN数量
echo '=== JOIN Analysis ==='
grep -o 'JOIN' /data/mm64/yohanzhang/QQMail/biz_config_op/app/mmpayxdcxitilapplication/src/db/sql/db.sql | wc -l
echo 'total JOIN keywords found'
    
# 统计子查询
echo '=== Subquery Analysis ==='
grep -c 'SELECT.*SELECT' /data/mm64/yohanzhang/QQMail/biz_config_op/app/mmpayxdcxitilapplication/src/db/sql/db.sql
echo 'nested queries found'
    
# 检查是否使用了索引
echo '=== Index Usage ==='
grep -E 'INDEX|PRIMARY KEY|UNIQUE' /data/mm64/yohanzhang/QQMail/biz_config_op/app/mmpayxdcxitilapplication/src/db/sql/db.sql
    "
  }
}
```

**执行结果**：

```
=== Table Structure Analysis ===
CREATE TABLE IF NOT EXISTS config_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(255) NOT NULL,
    config_value TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_config_key (config_key),
    INDEX idx_category (category)
);

=== JOIN Analysis ===
5

=== Subquery Analysis ===
3
nested queries found

=== Index Usage ===
    id INT PRIMARY KEY AUTO_INCREMENT,
    INDEX idx_config_key (config_key),
    INDEX idx_category (category)
```

---

### 第五步：生成报告（Report Generation）

**Agent思考**：
```
所有分析已完成，现在需要生成一份结构化的分析报告。
我应该整理成清晰的格式，包含：
1. 执行摘要
2. 详细分析
3. 问题列表和建议
4. 优化建议
```

**工具调用 - 生成分析报告**：

```json
{
  "tool": "python-tool",
  "arguments": {
    "code": "
import json
from datetime import datetime

# 整合所有分析结果
analysis_result = {
    'report_title': 'SQL文件复杂度分析报告',
    'file_path': '/data/mm64/yohanzhang/QQMail/biz_config_op/app/mmpayxdcxitilapplication/src/db/sql/db.sql',
    'analysis_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
    
    'executive_summary': {
        'total_statements': 12,
        'complexity_level': 'MEDIUM',
        'risk_level': 'MEDIUM',
        'critical_issues': 1,
        'warnings': 1,
        'suggestions': 4
    },
    
    'statement_breakdown': {
        'CREATE': 3,
        'SELECT': 5,
        'INSERT': 2,
        'UPDATE': 2
    },
    
    'table_analysis': {
        'tables_found': ['config_items', 'config_categories', 'users'],
        'table_count': 3,
        'indexed_columns': [
            'config_items.id (PRIMARY KEY)',
            'config_items.config_key (INDEX)',
            'config_items.category (INDEX)'
        ]
    },
    
    'complexity_analysis': {
        'total_joins': 5,
        'nested_queries': 3,
        'complex_queries': [
            {
                'description': '多表JOIN + 子查询',
                'complexity_score': 6,
                'risk': '查询性能可能较慢，建议优化',
                'sql': 'SELECT ... FROM config_items ci LEFT JOIN config_categories cc...'
            },
            {
                'description': '聚合查询 + HAVING',
                'complexity_score': 5,
                'risk': 'GROUP BY可能影响性能',
                'sql': 'SELECT category, COUNT(*) ... GROUP BY category HAVING...'
            }
        ]
    },
    
    'issues': [
        {
            'id': 'ISSUE-001',
            'severity': 'HIGH',
            'type': 'MISSING_WHERE',
            'description': 'UPDATE语句缺少WHERE条件',
            'impact': '可能误更新全表数据，造成数据丢失',
            'recommendation': '添加WHERE条件指定更新的记录范围',
            'code_example': '''
-- 危险的写法
UPDATE config_items SET config_value = 'new_value';

-- 安全的写法
UPDATE config_items 
SET config_value = 'new_value' 
WHERE category = 'payment' AND id = ?;
            '''
        },
        {
            'id': 'ISSUE-002',
            'severity': 'MEDIUM',
            'type': 'SELECT_STAR',
            'description': '使用SELECT *查询',
            'impact': '可能返回不必要的字段，增加网络传输和内存占用',
            'recommendation': '明确指定需要的字段',
            'code_example': '''
-- 优化前
SELECT * FROM config_items WHERE category = 'payment';

-- 优化后
SELECT id, config_key, config_value, updated_at 
FROM config_items 
WHERE category = 'payment';
            '''
        }
    ],
    
    'performance_recommendations': [
        {
            'priority': 'HIGH',
            'description': '为经常查询的字段添加复合索引',
            'reasoning': 'config_items表经常按category和updated_at一起查询',
            'sql': 'CREATE INDEX idx_category_updated_at ON config_items(category, updated_at);'
        },
        {
            'priority': 'MEDIUM',
            'description': '优化嵌套子查询',
            'reasoning': 'IN子查询可以改为JOIN，通常性能更好',
            'sql': '''
-- 优化前
SELECT * FROM config_items 
WHERE category IN (SELECT code FROM config_categories WHERE is_active = 1);

-- 优化后
SELECT ci.* FROM config_items ci
INNER JOIN config_categories cc ON ci.category = cc.code
WHERE cc.is_active = 1;
            '''
        },
        {
            'priority': 'MEDIUM',
            'description': '添加查询超时限制',
            'reasoning': '防止复杂查询长时间占用连接',
            'sql': 'SET SESSION MAX_EXECUTION_TIME=30000; -- 30秒超时'
        }
    ],
    
    'best_practices': [
        '所有UPDATE/DELETE语句必须包含WHERE条件',
        '避免在生产环境使用SELECT *',
        '为常用查询条件添加索引',
        '定期使用EXPLAIN分析慢查询',
        '考虑使用连接池管理数据库连接'
    ]
}

# 生成Markdown报告
report_md = f'''
# {analysis_result['report_title']}

**分析文件**: `{analysis_result['file_path']}`  
**分析时间**: {analysis_result['analysis_time']}

---

## 执行摘要

| 指标 | 值 |
|------|-----|
| SQL语句总数 | {analysis_result['executive_summary']['total_statements']} |
| 复杂度等级 | {analysis_result['executive_summary']['complexity_level']} |
| 风险等级 | {analysis_result['executive_summary']['risk_level']} |
| 严重问题 | {analysis_result['executive_summary']['critical_issues']} |
| 警告 | {analysis_result['executive_summary']['warnings']} |
| 优化建议 | {analysis_result['executive_summary']['suggestions']} |

---

## 语句分布

```
CREATE: 3
SELECT: 5
INSERT: 2
UPDATE: 2


---

## 发现的表

{chr(10).join(['- ' + t for t in analysis_result['table_analysis']['tables_found']])}

### 索引信息

{chr(10).join(['- ' + idx for idx in analysis_result['table_analysis']['indexed_columns']])}

---

## 复杂查询分析

**总JOIN数**: {analysis_result['complexity_analysis']['total_joins']}  
**嵌套查询数**: {analysis_result['complexity_analysis']['nested_queries']}

### 高复杂度查询

'''
for i, query in enumerate(analysis_result['complexity_analysis']['complex_queries'], 1):
    report_md += f
'''
#### 查询 {i}

- **复杂度分数**: {query['complexity_score']}/10
- **风险**: {query['risk']}
- **SQL预览**:
```sql
{query['sql']}
```


report_md += '''

---

## 发现的问题

'''

for issue in analysis_result['issues']:
    severity_emoji = '🔴' if issue['severity'] == 'HIGH' else '🟡'
    report_md += f'''
### {severity_emoji} {issue['id']} - {issue['type']}

**严重程度**: {issue['severity']}  
**描述**: {issue['description']}  
**影响**: {issue['impact']}

**修复建议**:
{issue['recommendation']}

**代码示例**:
{issue['code_example']}

---
'''

report_md += '''
## 性能优化建议

'''

for rec in analysis_result['performance_recommendations']:
    priority_emoji = '🔴' if rec['priority'] == 'HIGH' else '🟡'
    report_md += f'''
### {priority_emoji} {rec['description']}

**原因**: {rec['reasoning']}

**SQL**:
```sql
{rec['sql']}
```

---
'''

report_md += f'''
## 最佳实践建议

{chr(10).join([str(i+1) + '. ' + bp for i, bp in enumerate(analysis_result['best_practices'])])}

---

*报告由Code-Miner SQL分析Agent自动生成*
'''

print(report_md)
    "
  }
}
```

**生成的报告**（部分）：

```markdown
# SQL文件复杂度分析报告

**分析文件**: `/data/mm64/yohanzhang/QQMail/biz_config_op/app/mmpayxdcxitilapplication/src/db/sql/db.sql`  
**分析时间**: 2026-03-01 14:30:00

---

## 执行摘要

| 指标 | 值 |
|------|-----|
| SQL语句总数 | 12 |
| 复杂度等级 | MEDIUM |
| 风险等级 | MEDIUM |
| 严重问题 | 1 |
| 警告 | 1 |
| 优化建议 | 4 |

---

## 发现的问题

### 🔴 ISSUE-001 - MISSING_WHERE

**严重程度**: HIGH  
**描述**: UPDATE语句缺少WHERE条件  
**影响**: 可能误更新全表数据，造成数据丢失

**修复建议**: 添加WHERE条件指定更新的记录范围

**代码示例**:
```sql
-- 危险的写法
UPDATE config_items SET config_value = 'new_value';

-- 安全的写法
UPDATE config_items 
SET config_value = 'new_value' 
WHERE category = 'payment' AND id = ?;
```

---

*报告由Code-Miner SQL分析Agent自动生成*
```

---

### 完整执行流程图

```
┌─────────────────────────────────────────────────────────────────┐
│                    SQL分析Agent完整执行流程                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  用户输入                                                        │
│  "分析SQL文件复杂度"                                             │
│      │                                                          │
│      ▼                                                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. Task Planning                                          │  │
│  │    • 创建TodoList                                         │  │
│  │    • 规划5个分析步骤                                       │  │
│  └───────────────────────┬───────────────────────────────────┘  │
│                          │                                       │
│      ┌───────────────────┼───────────────────┐                  │
│      ▼                   ▼                   ▼                  │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐             │
│  │ 2.读取文件 │ 并行 │ 3.解析SQL │ 并行 │ 4.深度分析 │             │
│  │          │ 执行 │          │ 执行 │          │             │
│  │ read-    │      │ python-  │      │ bash-    │             │
│  │ file-tool│      │ tool     │      │ tool     │             │
│  └────┬─────┘      └────┬─────┘      └────┬─────┘             │
│       │                 │                 │                    │
│       └─────────────────┼─────────────────┘                    │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 5. Report Generation                                      │  │
│  │    • 整合所有分析结果                                      │  │
│  │    • 生成Markdown报告                                     │  │
│  │    • 包含问题列表和优化建议                                │  │
│  └───────────────────────┬───────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 输出结果                                                  │  │
│  │ • 结构化JSON（便于程序处理）                               │  │
│  │ • Markdown报告（便于人工阅读）                             │  │
│  │ • 优化建议（可直接执行）                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

执行统计：
• 总耗时: ~3.5秒
• 工具调用次数: 3次
• 迭代轮数: 1轮（任务规划清晰，无需回退）
• Token消耗: ~2,500 tokens
• 识别问题: 2个（1个高危，1个警告）
```

---

### 关键技术点总结

| 技术点 | 实现方式 | Code-Miner工具 |
|--------|----------|----------------|
| **文件读取** | 直接读取指定路径文件 | `read-file-tool` |
| **SQL解析** | Python + sqlparse库 | `python-tool`（沙箱执行） |
| **命令执行** | bash脚本分析 | `bash-tool`（firejail隔离） |
| **报告生成** | Python格式化输出 | `python-tool` |
| **任务管理** | TodoList跟踪进度 | `persistent-todolist-tool` |
| **安全隔离** | firejail + 资源限制 | 内置安全机制 |

### 面试回答模板

```
面试官：请举例说明Agent如何解决实际问题？

回答框架：

1. 场景选择（30秒）
   "我以SQL复杂度分析为例，这是实际工作中常见的代码审查需求。"

2. 问题拆解（1分钟）
   "Agent首先进行任务规划：
   - 读取SQL文件
   - 解析语句结构
   - 识别复杂查询
   - 检测潜在问题
   - 生成分析报告
   
   使用TodoList跟踪每个步骤的状态。"

3. 工具调用（1分钟）
   "Agent根据任务选择合适的工具：
   - read-file-tool读取文件
   - python-tool解析SQL（使用sqlparse库）
   - bash-tool执行额外检查
   
   所有工具调用都在沙箱中执行，确保安全。"

4. 结果处理（30秒）
   "整合所有分析结果，生成结构化报告：
   - 执行摘要
   - 问题列表（按严重程度分类）
   - 优化建议（带代码示例）
   - 最佳实践"

5. 技术亮点（30秒）
   "这个案例展示了Agent的核心能力：
   - 任务自主规划
   - 多工具协同
   - 安全沙箱执行
   - 结构化输出"

