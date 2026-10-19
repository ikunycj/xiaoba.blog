# OpenCode

在 OpenCode 中保存 All Token API 凭据，并将其注册为自定义 OpenAI 兼容服务商。

> [!info] 配置核验
> OpenCode 官方推荐用 `/connect` 保存凭据，再用 `opencode.json` 定义自定义服务商。凭据默认存放在 `~/.local/share/opencode/auth.json`，无需把 API Key 写入项目配置。

## 1. 选择配置范围

OpenCode 支持 JSON 和 JSONC，多个配置源会合并，后加载的配置覆盖冲突字段。

| 范围 | 配置文件 |
| --- | --- |
| 全局 | `~/.config/opencode/opencode.json` |
| 项目 | 项目根目录的 `opencode.json` |
| 自定义文件 | `OPENCODE_CONFIG` 指向的文件 |

服务商通常适合放在全局配置。项目配置可以提交到 Git，因此不要在其中写明文密钥。

## 2. 准备模型和接口类型

1. 在 [API Key 页面](https://alltokenapi.com/keys)创建密钥。
2. 在[模型定价页面](https://alltokenapi.com/pricing)复制准确模型 ID。
3. 确认模型使用的接口：

| 模型接口 | `npm` 适配器 | Base URL |
| --- | --- | --- |
| `/v1/chat/completions` | `@ai-sdk/openai-compatible` | `https://alltokenapi.com/v1` |
| `/v1/responses` | `@ai-sdk/openai` | `https://alltokenapi.com/v1` |

以下主教程按 Chat Completions 编写。Responses 模型必须切换适配器，不能只修改模型 ID。

## 3. 推荐：使用 /connect 保存密钥

1. 启动 OpenCode。
2. 输入 `/connect`。
3. 滚动到并选择 **Other**。
4. Provider ID 输入 `alltokenapi`。
5. 粘贴 API Key。

Provider ID 必须与后续配置中的 `provider.alltokenapi` 完全一致。

## 4. 编辑 opencode.json

将以下配置合并到全局或项目配置文件：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "alltokenapi/此处替换为准确的模型 ID",
  "small_model": "alltokenapi/此处替换为准确的模型 ID",
  "provider": {
    "alltokenapi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "All Token API",
      "options": {
        "baseURL": "https://alltokenapi.com/v1"
      },
      "models": {
        "此处替换为准确的模型 ID": {
          "name": "此处替换为准确的模型 ID"
        }
      }
    }
  }
}
```

需要替换四处模型 ID。`small_model` 用同一模型可避免标题生成等轻量任务落到其他服务商；有更便宜且兼容的模型时，可以单独替换。

### Responses 模型

如果模型明确使用 `/v1/responses`，只修改这一项：

```json
"npm": "@ai-sdk/openai"
```

其余 Provider ID、Base URL 和模型引用保持不变。

## 5. 备选：使用环境变量，不保存到 auth.json

先设置密钥：

```bash
export ALLTOKEN_API_KEY="此处替换为 API Key"
```

```powershell
$env:ALLTOKEN_API_KEY = "此处替换为 API Key"
```

然后在 `options` 中增加 `apiKey`：

```json
{
  "baseURL": "https://alltokenapi.com/v1",
  "apiKey": "{env:ALLTOKEN_API_KEY}"
}
```

此方式不需要 `/connect`。OpenCode 在环境变量缺失时会把 `{env:ALLTOKEN_API_KEY}` 替换为空字符串，因此认证失败时应先检查启动进程的环境。

## 6. 选择并验证模型

1. 启动 `opencode`。
2. 如果使用 `/connect`，先执行以下命令确认凭据已保存：

```bash
opencode auth list
```

3. 在 TUI 中输入 `/models`，选择 `alltokenapi/模型ID`。
4. 发送一个简短提示，或执行一次非交互测试：

```bash
opencode run "只回复 OK"
```

5. 在[使用日志](https://alltokenapi.com/usage-logs)确认请求模型、状态和费用。

## 7. 常见问题

### /models 中没有 alltokenapi

- 检查 `opencode.json` 的生效范围和 JSON/JSONC 语法。
- Provider ID 必须在 `/connect` 和 `provider` 配置中都写成 `alltokenapi`。
- 模型必须定义在 `provider.alltokenapi.models` 中。

### 认证失败

- `/connect` 方式：运行 `opencode auth list` 检查凭据。
- 环境变量方式：确认从包含 `ALLTOKEN_API_KEY` 的终端启动 OpenCode。
- 不要同时保留错误的 auth.json 凭据和正确的环境变量而不确认实际优先级；排障时只保留一种来源。

### 404、流式输出或工具调用失败

- Chat Completions 使用 `@ai-sdk/openai-compatible`。
- Responses 使用 `@ai-sdk/openai`。
- Base URL 对这两种 OpenAI 兼容接口都应以 `/v1` 结尾。
- 普通对话成功但工具调用失败，通常表示模型或接口不完整支持 Tool Calling。

### 上下文长度显示不准确

确认准确数值后，可在模型下添加：

```json
"limit": {
  "context": 128000,
  "output": 32000
}
```

不要从模型名称猜测限制；错误值会影响 OpenCode 的上下文压缩判断。

## 8. 官方参考

- [OpenCode 服务商配置](https://opencode.ai/docs/providers/)
- [OpenCode 配置文件](https://opencode.ai/docs/config/)
- [OpenCode 官方仓库](https://github.com/anomalyco/opencode)
