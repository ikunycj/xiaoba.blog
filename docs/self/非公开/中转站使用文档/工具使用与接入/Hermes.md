# Hermes

使用自定义端点向导或 `config.yaml` 配置 Hermes Agent。

## 使用向导配置

模型向导是推荐的配置方式，因为它会写入当前 Hermes 使用的配置格式。

```bash
hermes model
```

1. 运行 `hermes model`，选择 `Custom endpoint`。
2. 输入以 `/v1` 结尾的服务地址：`https://alltokenapi.com/v1`。
3. 输入 API Key 和定价页面中的准确模型 ID。
4. 除非所选模型明确要求其他 API 模式，否则选择 `chat_completions`。
5. 保存配置并启动新的 Hermes 会话。

## 手动编辑 config.yaml

Hermes 将主配置存储在 `~/.hermes/config.yaml`。先将 API Key 保存在环境变量中，再把 `model` 配置块合并到现有文件。

### 设置 API Key 环境变量

在 Windows 上设置持久用户变量后，请打开新终端。在 macOS 和 Linux 上，除非将其加入 Shell 配置文件，否则 `export` 只对当前 Shell 生效。

PowerShell：

```powershell
[Environment]::SetEnvironmentVariable(
  "ALLTOKEN_API_KEY",
  "sk-your-api-key",
  "User"
)
```

macOS / Linux：

```bash
export ALLTOKEN_API_KEY="sk-your-api-key"
```

### 编辑 config.yaml

```yaml
model:
  default: your-model-id
  provider: custom
  base_url: https://alltokenapi.com/v1
  api_key: ${ALLTOKEN_API_KEY}
  api_mode: chat_completions
```

> **当前配置格式**
>
> Hermes 加载 `config.yaml` 时会展开 `${VAR}` 和 `${env:VAR}` 引用。自定义端点不再使用 `LLM_MODEL`。

## 验证配置

开始实际任务前，检查解析后的模型设置和 Hermes 状态。

```bash
hermes config path
hermes config env-path
hermes config check
hermes config get model --json
hermes status
```

1. 运行 `hermes config check`，修复报告的所有配置错误。
2. 确认 `provider` 为 `custom`、`base_url` 以 `/v1` 结尾，且 `api_key` 仍为环境变量引用。
3. 开始新会话并发送一个简短提示。
4. 在使用日志中检查所选模型和请求状态。

## 故障排查

1. 出现 404 错误时，确认自定义 `base_url` 只以一个 `/v1` 结尾。
2. 出现模型错误时，将显示名称替换为准确的模型 ID。
3. 调用 `/v1/chat/completions` 时使用 `chat_completions`，调用 `/v1/responses` 时使用 `codex_responses`，调用 `/v1/messages` 时使用 `anthropic_messages`。
4. 如果认证失败，请确认启动 Hermes 的进程可以读取 `ALLTOKEN_API_KEY`。

[Hermes Agent 文档](https://github.com/NousResearch/hermes-agent)
