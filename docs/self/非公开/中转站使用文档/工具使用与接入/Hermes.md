# Hermes Agent

通过 `hermes model` 向导或 `~/.hermes/config.yaml` 将 All Token API 配置为 Hermes 的命名自定义服务商。

> [!info] 配置核验
> Hermes 当前推荐使用 `providers.<名称>` 定义自定义端点，并用 `model.provider: custom:<名称>` 选择它。旧版 `custom_providers` 列表和 `model.base_url/api_mode` 仍兼容，但不是本文主配置格式。

## 1. 准备 API Key、模型和接口类型

1. 在 [API Key 页面](https://alltokenapi.com/keys)创建密钥。
2. 在[模型定价页面](https://alltokenapi.com/pricing)复制准确的模型 ID。
3. 确认模型接口与 Hermes Transport：

| 模型接口 | Hermes `transport` | Base URL |
| --- | --- | --- |
| `/v1/chat/completions` | `chat_completions` | `https://alltokenapi.com/v1` |
| `/v1/responses` | `codex_responses` | `https://alltokenapi.com/v1` |
| `/v1/messages` | `anthropic_messages` | `https://alltokenapi.com` |

## 2. 推荐：使用 hermes model 向导

在 Hermes 会话外的系统终端运行：

```bash
hermes model
```

1. 选择 **Custom endpoint**。
2. 输入与接口匹配的 Base URL。
3. 输入 API Key 和准确模型 ID。
4. 选择 API compatibility mode：
   - Chat Completions：`chat_completions`；
   - Responses / Codex：`codex_responses`；
   - Anthropic Messages：`anthropic_messages`。
5. 保存并退出向导。

`hermes model` 是完整的服务商配置向导；会话内的 `/model` 只能切换已经配置好的服务商，不能新增端点或录入密钥。

## 3. 手动配置

### 3.1 保存密钥

Hermes 的密钥文件为：

| 系统 | 密钥文件 |
| --- | --- |
| Windows | `%USERPROFILE%\.hermes\.env` |
| macOS / Linux | `~/.hermes/.env` |

添加：

```dotenv
ALLTOKEN_API_KEY=此处替换为 API Key
```

也可以使用命令写入 Hermes 的 `.env`：

```bash
hermes config set ALLTOKEN_API_KEY "此处替换为 API Key"
```

### 3.2 编辑 config.yaml

以下示例按 Chat Completions 编写。Responses 模型请把 `transport` 改为 `codex_responses`；Anthropic Messages 模型还要把 `api` 改为不带 `/v1` 的服务根地址。

```yaml
providers:
  alltokenapi:
    api: https://alltokenapi.com/v1
    key_env: ALLTOKEN_API_KEY
    transport: chat_completions
    default_model: 此处替换为准确的模型 ID

model:
  provider: custom:alltokenapi
  default: 此处替换为准确的模型 ID
```

将配置合并到现有 `~/.hermes/config.yaml`，不要覆盖终端、工具、Gateway 或其他服务商设置。

如果希望端点不请求 `/models`，可增加：

```yaml
providers:
  alltokenapi:
    discover_models: false
```

如果希望在配置中直接引用环境变量，也支持：

```yaml
providers:
  alltokenapi:
    api_key: ${ALLTOKEN_API_KEY}
```

不过 `key_env: ALLTOKEN_API_KEY` 更适合当前 `providers` 格式。`${VAR}` 和 `${env:VAR}` 都能解析；变量缺失时 Hermes 会保留占位符并记录警告，而不是静默使用空值。

## 4. 验证配置

先确认当前配置和密钥文件路径：

```bash
hermes config path
hermes config env-path
```

再检查配置与最终模型路由：

```bash
hermes config check
hermes config get providers.alltokenapi --json
hermes config get model --json
hermes status
```

最后执行一次最小请求：

```bash
hermes -z "只回复 OK"
```

到[使用日志](https://alltokenapi.com/usage-logs)确认实际模型、接口和请求状态。

## 5. 配置何时生效

- 新启动的 CLI 会话会读取新配置。
- 已经运行的会话继续使用创建时的模型；会话内可用 `/model` 切换已配置服务商。
- Messaging Gateway 的新会话读取新默认模型。需要强制所有会话重新读取时，可运行：

```bash
hermes gateway restart
```

## 6. 常见问题

### 404 或接口路径错误

- `chat_completions` 和 `codex_responses` 的 `api` 通常以 `/v1` 结尾。
- `anthropic_messages` 使用服务根地址，由 Hermes 拼接 `/v1/messages`。
- `transport` 留空时 Hermes 会尝试按 URL 自动判断，但中转地址通常无法可靠反映协议，建议显式设置。

### Hermes 仍使用旧服务商

- `model.provider` 必须为 `custom:alltokenapi`，不是 `alltokenapi` 或 `custom`。
- `model.default` 与 `providers.alltokenapi.default_model` 应使用相同的准确模型 ID。
- 已运行会话不会自动切换，启动新会话或使用 `/model`。

### 认证失败

- 运行 `hermes config env-path`，确认密钥写入当前 Profile 的 `.env`。
- 检查 `key_env` 拼写与 `.env` 中的变量名一致。
- 如果 Hermes 以服务方式运行，重启 Gateway 以重新载入密钥环境。

### 普通对话成功但 Agent 工具调用失败

- 确认模型支持 Tool Calling。
- 确认 `transport` 与模型实际接口一致。
- Responses 接口必须使用 `codex_responses`，不能用 `chat_completions` 侥幸兼容。

## 7. 官方参考

- [Hermes AI Providers](https://hermes-agent.nousresearch.com/docs/integrations/providers)
- [Hermes Configuration](https://hermes-agent.nousresearch.com/docs/user-guide/configuration)
- [Hermes Configuring Models](https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models)
- [Hermes CLI Commands](https://hermes-agent.nousresearch.com/docs/reference/cli-commands)
- [Hermes Agent 官方仓库](https://github.com/NousResearch/hermes-agent)
