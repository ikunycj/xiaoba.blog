# OpenCode

将 All Token API 作为 OpenAI 兼容服务商添加到 OpenCode。

## 选择配置范围

可以使用全局配置让所有项目共享设置，也可以在单个项目中放置 `opencode.json`，仅覆盖该项目的设置。

| 范围 | 配置文件路径 |
| --- | --- |
| 全局配置 | `~/.config/opencode/opencode.json` |
| 项目配置 | `opencode.json` |

## 添加服务商

1. 在启动 OpenCode 前设置 `ALLTOKEN_API_KEY`。
2. 从定价页面复制准确的模型 ID，并替换所有 `your-model-id` 占位符。
3. 将服务商配置块合并到选定的配置文件中。

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

### 编辑 opencode.json

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "alltokenapi/your-model-id",
  "provider": {
    "alltokenapi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "All Token API",
      "options": {
        "baseURL": "https://alltokenapi.com/v1",
        "apiKey": "{env:ALLTOKEN_API_KEY}"
      },
      "models": {
        "your-model-id": {
          "name": "your-model-id"
        }
      }
    }
  }
}
```

> **选择正确的 SDK 适配器**
>
> 本示例使用 `@ai-sdk/openai-compatible` 调用 `/v1/chat/completions`。仅当所选模型明确使用 `/v1/responses` 时，才使用 `@ai-sdk/openai`。

## 选择并验证模型

1. 在新的终端中启动 OpenCode。
2. 运行 `/models`，选择 `alltokenapi/your-model-id`。
3. 发送一个简短提示，并等待完整响应。
4. 打开使用日志，确认模型和费用。

```text
opencode
/models
```

[打开使用日志](https://alltokenapi.com/usage-logs)

## 故障排查

1. 如果没有显示服务商，请验证 `opencode.json`，并确认文件位于当前生效的配置范围内。
2. 如果认证失败，请从包含 `ALLTOKEN_API_KEY` 的终端启动 OpenCode。
3. 如果请求路径不受支持，请使 SDK 适配器与模型端点类型保持一致。

[OpenCode 服务商文档](https://opencode.ai/docs/providers/)
