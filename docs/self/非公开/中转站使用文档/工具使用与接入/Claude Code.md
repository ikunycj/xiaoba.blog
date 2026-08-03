# Claude Code

可通过 CC Switch 一键导入，或使用 Claude Code 官方支持的 LLM Gateway 环境变量手动接入。

> [!info] 配置核验
> 本文根据 Claude Code 官方的 LLM Gateway 与模型配置文档核验。All Token API 使用 Bearer Token，因此手动配置使用 `ANTHROPIC_AUTH_TOKEN`。

## 1. 准备 API Key 和模型

1. 在 [API Key 页面](https://alltokenapi.com/keys)创建或复制密钥。
2. 在[模型定价页面](https://alltokenapi.com/pricing)复制一个支持 Anthropic Messages 接口的准确模型 ID。
3. 更新 Claude Code，避免旧版本缺少网关或模型配置能力：

```bash
claude update
```

## 2. 使用 CC Switch 一键导入

1. 安装并打开 [CC Switch](https://github.com/farion1231/cc-switch/releases)。
2. 在 API Key 页打开密钥的操作菜单，选择 CC Switch 导入。
3. 客户端选择 **Claude**，模型选择刚才确认的 Claude 模型。
4. 保留生成的服务根地址 `https://alltokenapi.com`，不要手动添加 `/v1`。
5. 在 CC Switch 中保存并启用服务商，然后完全退出并重新打开 Claude Code。

详细步骤：[[CC Switch#一键导入CC Switch配置]]

## 3. 手动配置

### 3.1 推荐：写入用户 settings.json

用户配置对所有项目生效，也能被 Claude Code 的后台 Agent 读取。

| 系统 | 用户配置文件 |
| --- | --- |
| Windows | `%USERPROFILE%\.claude\settings.json` |
| macOS / Linux | `~/.claude/settings.json` |

将以下字段合并到现有 JSON 中，不要删除原有的权限、插件或 MCP 配置：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://alltokenapi.com",
    "ANTHROPIC_AUTH_TOKEN": "此处替换为 API Key"
  },
  "model": "此处替换为准确的模型 ID"
}
```

> [!warning] 不要提交密钥
> 不要把密钥写入项目共享的 `.claude/settings.json`。如需项目级配置，应使用已加入 `.gitignore` 的 `.claude/settings.local.json`。

### 3.2 临时测试：设置当前终端环境变量

macOS / Linux：

```bash
export ANTHROPIC_AUTH_TOKEN="此处替换为 API Key"
export ANTHROPIC_BASE_URL="https://alltokenapi.com"
export ANTHROPIC_MODEL="此处替换为准确的模型 ID"
```

PowerShell：

```powershell
$env:ANTHROPIC_AUTH_TOKEN = "此处替换为 API Key"
$env:ANTHROPIC_BASE_URL = "https://alltokenapi.com"
$env:ANTHROPIC_MODEL = "此处替换为准确的模型 ID"
```

这些变量只对当前终端及其启动的进程生效，适合先验证再写入配置文件。

### 3.3 为什么 Base URL 不带 /v1

Claude Code 会在 `ANTHROPIC_BASE_URL` 后请求 `/v1/messages`。如果配置为 `https://alltokenapi.com/v1`，最终可能形成重复路径并返回 404。

Claude Code 的凭据变量与请求头对应关系如下：

| 变量 | 请求头 | 适用场景 |
| --- | --- | --- |
| `ANTHROPIC_AUTH_TOKEN` | `Authorization: Bearer ...` | All Token API、Bearer Token 网关 |
| `ANTHROPIC_API_KEY` | `x-api-key: ...` | 明确要求 Anthropic `x-api-key` 的网关 |

不要同时设置两个变量，以免出现认证来源冲突。

## 4. 启动并验证

1. 使用与配置相同的终端启动 `claude`。
2. 如果出现登录页，说明网关凭据没有被读取；不要选择 Claude 订阅登录，先检查配置文件路径和 JSON 格式。
3. 进入会话后运行 `/status`，确认：
   - `Anthropic base URL` 为 `https://alltokenapi.com`；
   - `Auth token or API key` 显示 `ANTHROPIC_AUTH_TOKEN`；
   - 当前模型为预期模型 ID。
4. 发送一个简短测试请求，再到[使用日志](https://alltokenapi.com/usage-logs)确认请求模型和状态。

也可以在启动时临时指定模型：

```bash
claude --model "此处替换为准确的模型 ID"
```

## 5. 常见问题

### 启动后仍要求登录

- 确认配置写在 `~/.claude/settings.json`，而不是其他同名文件。
- 确认 `env` 位于 JSON 顶层。
- 如果只使用了 Shell 环境变量，请从同一个终端启动 Claude Code。
- 运行 `/logout` 可清除与网关凭据冲突的历史登录状态。

### 401、Unauthorized 或 Incorrect API key

- 确认密钥没有多余空格或引号。
- All Token API 应使用 `ANTHROPIC_AUTH_TOKEN`，不要误用只发送 `x-api-key` 的 `ANTHROPIC_API_KEY`。
- 确认密钥未过期，并在 API Key 页面检查其分组和模型权限。

### 404 Not Found

- `ANTHROPIC_BASE_URL` 应为 `https://alltokenapi.com`，不要带 `/v1` 或 `/v1/messages`。
- 所选模型必须支持 Anthropic Messages 接口。

### 模型不可用

- 使用模型定价页面显示的完整模型 ID，不要使用展示名称。
- 可用 `claude --model <模型ID>` 排除已保存模型选择的影响。
- 自定义网关只保证其声明支持的接口；部分 Beta、文件上传或远程功能可能无法透传。

## 6. 官方参考

- [连接 Claude Code 到 LLM Gateway](https://code.claude.com/docs/en/llm-gateway-connect)
- [Claude Code 模型配置](https://code.claude.com/docs/en/model-config)
- [Claude Code 设置文件](https://code.claude.com/docs/en/settings)
