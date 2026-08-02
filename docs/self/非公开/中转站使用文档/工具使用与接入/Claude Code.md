# Claude Code

通过 CC Switch 或 Anthropic 兼容的环境变量连接 Claude Code。

## 使用 CC Switch

API Key 页面可以将 Claude Code 配置直接发送到 CC Switch，包括服务根地址、API Key 和所选模型。

1. 打开 API Key 页面并选择 CC Switch 操作。
2. 选择 Claude（用于 Claude Code），并选择一个可用的 Claude 模型。
3. 同意导入，保存服务商，并切换到该服务商。
4. 重启 Claude Code，使其读取新配置。

[打开 API Key](https://alltokenapi.com/keys)

## 手动配置

在启动 Claude Code 的终端中设置 Anthropic 认证令牌、服务根地址和准确的模型 ID。

PowerShell：

```powershell
[Environment]::SetEnvironmentVariable(
  "ANTHROPIC_AUTH_TOKEN",
  "sk-your-api-key",
  "User"
)
[Environment]::SetEnvironmentVariable(
  "ANTHROPIC_BASE_URL",
  "https://alltokenapi.com",
  "User"
)
[Environment]::SetEnvironmentVariable(
  "ANTHROPIC_MODEL",
  "your-claude-model-id",
  "User"
)
```

macOS / Linux：

```bash
export ANTHROPIC_AUTH_TOKEN="sk-your-api-key"
export ANTHROPIC_BASE_URL="https://alltokenapi.com"
export ANTHROPIC_MODEL="your-claude-model-id"
```

> **Base URL 要求**
>
> 使用不带 `/v1` 的服务根地址。Claude Code 会自行附加 Anthropic API 路径。

## 重启并验证

1. 保存持久环境变量后打开新终端；如果使用 `export`，请继续使用当前终端。
2. 运行 `claude`，用一个简短提示开始新会话。
3. 打开使用日志，确认请求使用了预期模型。

```bash
claude
```

[打开使用日志](https://alltokenapi.com/usage-logs)

## 故障排查

1. 出现认证错误时，确认同一终端中可以读取 `ANTHROPIC_AUTH_TOKEN`。
2. 出现模型错误时，从定价页面复制准确的模型 ID，不要使用显示名称。
3. 出现 404 错误时，从 `ANTHROPIC_BASE_URL` 中删除 `/v1`，然后重启 Claude Code。
4. 如果远程工具或 Beta 功能失败，请确认所选渠道支持对应的 Anthropic 能力。

- [Claude Code 环境变量](https://code.claude.com/docs/en/env-vars)
- [Claude Code 模型配置](https://code.claude.com/docs/en/model-config)
