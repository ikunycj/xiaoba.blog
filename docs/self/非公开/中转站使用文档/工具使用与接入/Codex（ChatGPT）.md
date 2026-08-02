# Codex

可选择 CC Switch 一键导入，或手动修改 `config.toml` 接入 Codex。

## 1. 使用 CC Switch 一键导入

CC Switch 是最快的接入方式，无需手动编辑 TOML，即可导入 API Key、所选模型和 Codex 服务地址。

1. 安装 CC Switch，并确认系统已注册 `ccswitch://` 协议。
2. 打开 API Key 页面，找到要使用的密钥。
3. 打开该行的操作菜单，选择 CC Switch 导入。
4. 选择 Codex，再选择当前 API Key 可用的主模型，并保留自动生成的 `/v1` 地址。
5. 确认浏览器提示，然后在 CC Switch 中检查并保存导入的服务商。

- [打开 API Key](https://alltokenapi.com/keys)
- [下载 CC Switch](https://github.com/farion1231/cc-switch/releases)

> **导入的配置**
>
> Codex 导入内容包含所选 API Key、主模型和以 `/v1` 结尾的服务地址。请仅在自己的设备上确认导入。

## 2. 手动配置 config.toml

Codex 从用户目录中的配置文件读取设置。

| 系统 | 配置文件路径 |
| --- | --- |
| Windows | `%USERPROFILE%\.codex\config.toml` |
| macOS / Linux | `~/.codex/config.toml` |

### 设置 API Key 环境变量

将 API Key 保存到独立的环境变量中，不要把密钥直接写入 `config.toml`。

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

### 编辑 config.toml

保留现有 Codex 配置，并合并下面的服务商配置块。需要时，将示例模型替换为当前 API Key 可用的模型。

```toml
model = "gpt-5.6-sol"
model_provider = "alltokenapi"

[model_providers.alltokenapi]
name = "All Token API"
base_url = "https://alltokenapi.com/v1"
env_key = "ALLTOKEN_API_KEY"
wire_api = "responses"
```

### 重启并验证

1. 保存 `config.toml`，然后重启终端以及正在运行的 Codex 应用或 IDE 扩展。
2. 在新的终端中运行 `codex`，发起一个测试任务。
3. 如启动失败，请检查环境变量、模型名称和 Base URL 后重试。

```bash
codex
```

> **配置说明**
>
> 请保持 `wire_api = "responses"`，并确保本服务的 Base URL 以 `/v1` 结尾。

[Codex 配置参考](https://developers.openai.com/codex/config-reference)
