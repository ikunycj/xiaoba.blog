# OpenClaw

将 All Token API 注册为 OpenClaw 中的自定义 OpenAI Responses 服务商。

## 准备模型和 API Key

1. 创建一个 API Key，并将其保存到安全的密码管理器中。
2. 选择一个支持 Responses 端点的模型，并复制其准确的模型 ID。
3. 在用于启动 OpenClaw Gateway 的环境中设置 `ALLTOKEN_API_KEY`。

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

如果 OpenClaw 以服务方式运行，请将同一变量添加到服务环境中，使 Gateway 进程能够读取。

## 编辑 openclaw.json

默认用户配置文件路径：

```text
~/.openclaw/openclaw.json
```

将服务商和默认模型配置块合并到现有文件中，保留其他 Gateway、Agent 和工具设置。

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "alltokenapi": {
        "baseUrl": "https://alltokenapi.com/v1",
        "apiKey": "${ALLTOKEN_API_KEY}",
        "api": "openai-responses",
        "models": [
          {
            "id": "your-model-id",
            "name": "your-model-id"
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "alltokenapi/your-model-id"
      }
    }
  }
}
```

> **模型标识符**
>
> 替换两处 `your-model-id`。OpenClaw 使用 `alltokenapi/your-model-id` 标识最终模型。

## 验证并重启

在重启 Gateway 进程或服务前运行内置检查：

```bash
openclaw config file
openclaw config validate
openclaw models status
openclaw doctor
```

1. 重启 Gateway 前修复所有验证错误。
2. 使用日常服务命令重启 OpenClaw Gateway。
3. 启动一个简短的 Agent 任务，确认它出现在使用日志中。

## 故障排查

1. 如果没有显示服务商，请确认 `models.mode` 为 `merge`，并检查 JSON 结构是否合法。
2. 如果 API Key 为空，请确保 Gateway 服务继承了 `ALLTOKEN_API_KEY`。
3. 如果模型被拒绝，请确认模型 ID 准确，并在定价页面检查 Responses 端点支持。
4. 不要随意填写 `contextWindow` 或 `maxTokens`；除非模型要求明确限制，否则应省略这些字段。

[OpenClaw 配置参考](https://github.com/openclaw/openclaw/blob/main/docs/gateway/configuration-reference.md)
