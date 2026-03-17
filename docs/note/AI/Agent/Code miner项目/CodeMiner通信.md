# 通信协议与父子 Agent 通信结论

## 1. 是否使用 A2A 协议

结论：当前代码库**未使用 A2A（Agent-to-Agent）协议**。

依据：全仓检索 `a2a/A2A/agent2agent` 无命中。

## 2. 主要通信协议（按场景）

### 2.1 Agent 与大模型 Provider

主要是 **OpenAI 兼容 HTTP API**（`/v1/chat/completions` 等）。

- `OpenAIClient` 通过 OpenAI SDK，传入 `baseURL` 与 headers 发起请求：
  - `src/utils/openai-client.ts:149`
- Batch 场景调用 OpenAI Batch API，endpoint 为 `/v1/chat/completions`：
  - `src/batch/api/providers/openai-batch-api-client.ts:136`

### 2.2 MCP 外部工具通信

代码实现支持以下 MCP 传输：

- `stdio`
- `sse`
- `streamableHttp`

对应定义与实现：

- 传输类型联合定义：`src/interfaces/mcp.interface.ts:62`
- 客户端连接实现：`src/mcp/client-manager.ts:150`

说明：README 有 `websocket` 文案，但当前核心类型定义与客户端实现里，实际落地的是 `stdio/sse/streamableHttp`。

### 2.3 Web 控制台

内置可观测性服务使用 Node `http` 服务器：

- `src/web/server/index.mjs:307`

## 3. 父子 Agent 通信机制

### 3.1 普通（非 Batch）模式

结论：父子 Agent 不是通过网络协议（如 A2A/gRPC/WebSocket）通信，而是**进程内工具调用 + 方法返回**。

通信路径：

1. 父 Agent 在工具层注册 `delegateTask`：
   - `src/agent/agent.ts:1435`
2. 父 Agent ReAct `act()` 阶段执行工具调用，调用 `delegateTask`：
   - `src/agent/agent.ts:1192`
3. `delegateTask` 内部创建 `SubAgent` 实例并执行 `subAgent.execute(taskDescription)`：
   - `src/tools/sub-agent-tool.ts:264`
   - `src/tools/sub-agent-tool.ts:289`
4. 子 Agent 执行完成后返回 `SubAgentResult`（`success/data/error`），父 Agent 仅拿结果：
   - `src/interfaces/sub-agent.interface.ts:38`
   - `src/tools/sub-agent-tool.ts:297`

要点：

- 传递的是 `taskDescription` 字符串与返回结果对象，不是独立网络协议。
- 子 Agent 自己再通过 OpenAI 兼容 HTTP 与模型交互：
  - `src/agent/sub-agent.ts:324`

### 3.2 Batch 模式

结论：Batch 父子任务通信采用**数据库状态协同（SQLite）**，不是实时网络协议。

通信路径：

1. `delegateBatchTask` 创建子任务记录（`task_type='sub'`），父任务置为 `waiting_sub_agent`：
   - `src/batch/tools/batch-sub-agent-tool.ts:401`
   - `src/batch/tools/batch-sub-agent-tool.ts:423`
2. 协调器轮询父任务是否可恢复：
   - `src/batch/core/batch-sub-task-coordinator.ts:39`
3. 所有子任务完成后，汇总子任务结果写回父任务消息历史，再将父任务恢复为 `in_progress`：
   - `src/batch/core/batch-sub-task-coordinator.ts:52`
   - `src/batch/core/batch-sub-task-coordinator.ts:69`
4. `BatchDatabaseManager` 提供 `waiting_sub_agent` 查询、子任务完成判定与结果汇总读取：
   - `src/batch/memory/batch-database-manager.ts:712`
   - `src/batch/memory/batch-database-manager.ts:724`
   - `src/batch/memory/batch-database-manager.ts:738`

## 4. 总结（一句话）

这个项目的主通信形态是：

- 对模型：OpenAI 兼容 HTTP
- 对 MCP：`stdio/sse/streamableHttp`
- 父子 Agent：普通模式走进程内调用，Batch 模式走 SQLite 状态协同

当前未发现 A2A 协议实现。