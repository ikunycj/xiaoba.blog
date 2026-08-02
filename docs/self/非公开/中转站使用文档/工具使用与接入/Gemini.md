# Gemini CLI

通过 CC Switch 或 Gemini API Key 环境变量连接 Gemini CLI。

## 使用 CC Switch

1. 打开 API Key 页面并选择 CC Switch 操作。
2. 选择 Gemini，并选择一个可用的 Gemini 模型。
3. 同意导入，保存服务商，并切换到该服务商。
4. 重启 Gemini CLI，使其读取新配置。

[打开 API Key](https://alltokenapi.com/keys)

## 设置环境变量

启动 Gemini CLI 前，设置 API Key、服务根地址和准确的 Gemini 模型 ID。

PowerShell：

```powershell
[Environment]::SetEnvironmentVariable(
  "GEMINI_API_KEY",
  "sk-your-api-key",
  "User"
)
[Environment]::SetEnvironmentVariable(
  "GOOGLE_GEMINI_BASE_URL",
  "https://alltokenapi.com",
  "User"
)
[Environment]::SetEnvironmentVariable(
  "GEMINI_MODEL",
  "your-gemini-model-id",
  "User"
)
```

macOS / Linux：

```bash
export GEMINI_API_KEY="sk-your-api-key"
export GOOGLE_GEMINI_BASE_URL="https://alltokenapi.com"
export GEMINI_MODEL="your-gemini-model-id"
```

> **Base URL 要求**
>
> `GOOGLE_GEMINI_BASE_URL` 必须使用不带 `/v1` 的 HTTPS 服务根地址。Gemini CLI 仅允许 `localhost` 使用 HTTP。

## 启动并验证 Gemini CLI

1. 保存持久环境变量后打开新终端；如果使用 `export`，请继续使用当前终端。
2. 运行 `gemini`，并在提示时选择使用 Gemini API Key。
3. 发送一个简短提示，并等待完整响应。
4. 打开使用日志，确认 Gemini 模型和请求状态。

```bash
gemini
```

[打开使用日志](https://alltokenapi.com/usage-logs)

## 故障排查

1. 如果 Gemini CLI 使用 Google 登录，请重启并选择 API Key 认证。
2. 出现 404 错误时，从 `GOOGLE_GEMINI_BASE_URL` 中删除 `/v1`。
3. 出现模型错误时，确认所选模型支持 Gemini 端点类型。
4. 出现证书错误时，请使用公开的 HTTPS 服务地址，不要使用不安全的远程 URL。

[Gemini CLI 文档](https://github.com/google-gemini/gemini-cli)
