# Gemini CLI

可通过 CC Switch 一键导入，或使用 Gemini CLI 官方支持的 API Key、模型和自定义 Base URL 环境变量手动接入。

> [!info] 配置核验
> Gemini CLI 仅在 `gemini-api-key` 认证方式下使用 `GOOGLE_GEMINI_BASE_URL`。本文配置不适用于 Google 登录或 Vertex AI 认证。

## 1. 准备 API Key 和模型

1. 在 [API Key 页面](https://alltokenapi.com/keys)创建或复制密钥。
2. 在[模型定价页面](https://alltokenapi.com/pricing)复制一个支持 Gemini 原生接口的准确模型 ID。
3. 确保 Gemini CLI 为较新版本，自定义 Base URL 是当前版本的正式配置项。

## 2. 使用 CC Switch 一键导入

1. 安装并打开 [CC Switch](https://github.com/farion1231/cc-switch/releases)。
2. 在 API Key 页打开密钥的操作菜单，选择 CC Switch 导入。
3. 客户端选择 **Gemini**，再选择支持 Gemini 接口的模型。
4. 保留服务根地址 `https://alltokenapi.com`，不要添加 `/v1` 或 `/v1beta`。
5. 保存并启用服务商，完全退出并重新打开 Gemini CLI。

详细步骤：[[CC Switch#一键导入CC Switch配置]]

## 3. 手动配置

### 3.1 推荐：写入 Gemini CLI 的用户 .env

| 系统 | 用户环境文件 |
| --- | --- |
| Windows | `%USERPROFILE%\.gemini\.env` |
| macOS / Linux | `~/.gemini/.env` |

文件内容：

```dotenv
GEMINI_API_KEY=此处替换为 API Key
GOOGLE_GEMINI_BASE_URL=https://alltokenapi.com
GEMINI_MODEL=此处替换为准确的模型 ID
```

Gemini CLI 从当前目录向上查找 `.env`，再读取用户级 `~/.gemini/.env`，并使用找到的第一份环境文件而不是合并所有文件。如果项目目录已有 `.env`，请确认它没有覆盖或遗漏上述变量。

### 3.2 临时测试：设置当前终端环境变量

macOS / Linux：

```bash
export GEMINI_API_KEY="此处替换为 API Key"
export GOOGLE_GEMINI_BASE_URL="https://alltokenapi.com"
export GEMINI_MODEL="此处替换为准确的模型 ID"
```

PowerShell：

```powershell
$env:GEMINI_API_KEY = "此处替换为 API Key"
$env:GOOGLE_GEMINI_BASE_URL = "https://alltokenapi.com"
$env:GEMINI_MODEL = "此处替换为准确的模型 ID"
```

### 3.3 Base URL 和认证头说明

- `GOOGLE_GEMINI_BASE_URL` 使用服务根地址，不带 `/v1` 或 `/v1beta`；Google Gen AI SDK 会自行拼接 API 版本和模型路径。
- 默认情况下，Gemini CLI 按 Gemini 原生方式发送 `x-goog-api-key`。
- 只有网关明确要求 `Authorization: Bearer` 时，才额外设置：

```dotenv
GEMINI_API_KEY_AUTH_MECHANISM=bearer
```

不要在没有认证错误的情况下随意切换认证头。

## 4. 启动并验证

1. 运行 `gemini`。
2. 首次提示认证方式时选择 **Use Gemini API key**，不要选择 Google 登录或 Vertex AI。
3. 发送一个简短提示并等待完整响应。
4. 打开[使用日志](https://alltokenapi.com/usage-logs)，确认请求使用预期的 Gemini 模型。

可以用命令行参数覆盖一次模型选择：

```bash
gemini --model "此处替换为准确的模型 ID"
```

模型选择优先级为：`--model`、`GEMINI_MODEL`、`settings.json` 中的 `model.name`、默认模型。

## 5. 常见问题

### Gemini CLI 仍使用 Google 登录

- 重新启动 CLI，并选择 **Use Gemini API key**。
- 检查 `GEMINI_API_KEY` 是否在启动进程中可见。
- 项目目录中的 `.env` 可能抢先于 `~/.gemini/.env` 被加载。

### 401 或 Invalid API key

- 确认密钥、分组和模型权限有效。
- 默认先使用 `x-goog-api-key`；如果使用日志或网关说明明确要求 Bearer Token，再设置 `GEMINI_API_KEY_AUTH_MECHANISM=bearer`。
- 不要同时用 `GOOGLE_API_KEY` 配置 Vertex AI，这会改变认证路径。

### 404 Not Found

- `GOOGLE_GEMINI_BASE_URL` 应为 `https://alltokenapi.com`，不要带 API 版本路径。
- 模型必须支持 Gemini 原生接口；OpenAI 兼容模型不能只靠修改模型 ID 在 Gemini CLI 中使用。

### 自定义地址被拒绝

Gemini CLI 要求远程 Base URL 使用 HTTPS。只有 `localhost`、`127.0.0.1` 和 `[::1]` 可以使用 HTTP。

## 6. 官方参考

- [Gemini CLI 认证设置](https://geminicli.com/docs/get-started/authentication/)
- [Gemini CLI 配置参考](https://geminicli.com/docs/reference/configuration/)
- [Gemini CLI 模型路由](https://geminicli.com/docs/cli/model-routing/)
- [Gemini CLI 官方仓库](https://github.com/google-gemini/gemini-cli)
