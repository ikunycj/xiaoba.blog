# OpenClaw

将 All Token API 注册为 OpenClaw 的自定义模型服务商，再把默认 Agent 指向该服务商。

> [!info] 配置核验
> OpenClaw 当前使用 `~/.openclaw/openclaw.json`，格式为 JSON5。自定义服务商配置位于 `models.providers`，默认模型位于 `agents.defaults.model.primary`。

## 1. 准备 API Key 和模型

1. 在 [API Key 页面](https://alltokenapi.com/keys)创建密钥。
2. 在[模型定价页面](https://alltokenapi.com/pricing)复制准确的模型 ID，并确认它支持的接口：

| 模型接口 | OpenClaw 的 `api` 值 | Base URL |
| --- | --- | --- |
| `/v1/responses` | `openai-responses` | `https://alltokenapi.com/v1` |
| `/v1/chat/completions` | `openai-completions` | `https://alltokenapi.com/v1` |
| `/v1/messages` | `anthropic-messages` | `https://alltokenapi.com` |

不要只根据模型名称猜测接口类型。

## 2. 保存 API Key

OpenClaw 会读取父进程环境变量、当前目录的 `.env`，以及 `~/.openclaw/.env`。Gateway 以服务方式运行时，使用全局 `.env` 最稳定。

macOS / Linux：

```bash
mkdir -p ~/.openclaw
```

在 `~/.openclaw/.env` 中添加：

```dotenv
ALLTOKEN_API_KEY=此处替换为 API Key
```

Windows 对应路径为 `%USERPROFILE%\.openclaw\.env`。

也可以临时设置环境变量：

```bash
export ALLTOKEN_API_KEY="此处替换为 API Key"
```

```powershell
$env:ALLTOKEN_API_KEY = "此处替换为 API Key"
```

## 3. 编辑 openclaw.json

先查看当前实际生效的配置文件：

```bash
openclaw config file
```

将以下内容合并到该文件。示例按 Responses 接口编写；如果所选模型只支持 Chat Completions，请把 `api` 改为 `openai-completions`。

```json5
{
  models: {
    mode: "merge",
    providers: {
      alltokenapi: {
        baseUrl: "https://alltokenapi.com/v1",
        apiKey: "${ALLTOKEN_API_KEY}",
        api: "openai-responses",
        models: [
          {
            id: "此处替换为准确的模型 ID",
            name: "此处替换为准确的模型 ID",
          },
        ],
      },
    },
  },
  agents: {
    defaults: {
      model: {
        primary: "alltokenapi/此处替换为准确的模型 ID",
      },
    },
  },
}
```

需要替换三处模型 ID，且大小写必须一致。

> [!tip] JSON5 与环境变量
> OpenClaw 允许注释、未加引号的键和尾随逗号。`${ALLTOKEN_API_KEY}` 会在加载配置时解析；变量缺失或为空会直接导致配置加载失败。

`models.mode` 默认为 `merge`，显式写出是为了避免误用 `replace` 后隐藏内置模型目录。

## 4. 验证配置

先执行只读检查：

```bash
openclaw config validate
openclaw models list --provider alltokenapi
openclaw models status
```

验证结果应满足：

- `config validate` 成功；
- 模型列表中出现 `alltokenapi/模型ID`；
- `models status` 的默认模型与认证状态正确。

需要真实发起一次最小模型请求时，可执行：

```bash
openclaw models status --probe --probe-provider alltokenapi
```

`--probe` 会产生真实请求，可能消耗少量 Token 并触发限流。完成后再启动一个简短 Agent 任务，并在[使用日志](https://alltokenapi.com/usage-logs)确认请求。

## 5. 配置何时生效

OpenClaw 默认使用 `gateway.reload.mode: "hybrid"`。`models` 和 `agents` 的修改可热加载，通常不需要手动重启 Gateway。

如果已将热加载设为 `off`，或运行中的会话仍保留旧模型，可按当前部署方式重启 Gateway。已有会话可能继续使用创建时的模型，新会话会读取新默认值。

## 6. 常见问题

### Invalid config 或 Gateway 拒绝启动

```bash
openclaw config validate
openclaw doctor
```

- 检查 JSON5 层级和逗号。
- 检查 `ALLTOKEN_API_KEY` 是否可被 Gateway 进程读取。
- 不要添加文档中不存在的字段；OpenClaw 会拒绝未知字段。

### 404 或请求路径错误

- Responses 与 Chat Completions 的 Base URL 都以 `/v1` 结尾。
- `anthropic-messages` 使用不带 `/v1` 的服务根地址。
- 自定义 OpenAI 兼容服务商未填写 `api` 时默认走 `openai-completions`，不会自动改用 Responses。

### 模型显示但无法调用

- 检查 `models.providers.alltokenapi.models[].id` 与默认模型中的 ID 是否完全一致。
- 确认模型支持工具调用；能普通对话不代表能完成 Agent 工具循环。
- 运行 `openclaw models status --probe --probe-provider alltokenapi` 区分认证、格式和模型错误。

### 不确定 contextWindow 或 maxTokens

不要猜测这些值。未确认时省略 `reasoning`、`input`、`cost`、`contextWindow`、`contextTokens` 和 `maxTokens`，让服务端限制请求；只有拿到准确模型元数据后再补充。

## 7. 官方参考

- [OpenClaw 配置指南](https://docs.openclaw.ai/gateway/configuration)
- [自定义服务商与 Base URL](https://docs.openclaw.ai/gateway/config-tools#custom-providers-and-base-urls)
- [OpenClaw config 命令](https://docs.openclaw.ai/cli/config)
- [OpenClaw models 命令](https://docs.openclaw.ai/cli/models)
