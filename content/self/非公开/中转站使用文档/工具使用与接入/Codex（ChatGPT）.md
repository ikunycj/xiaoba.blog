# Codex

可选择 CC Switch 一键导入，或手动修改 `config.toml` 接入 Codex。

## 1. 使用 CC Switch 一键导入

CC Switch 是最快的接入方式，无需手动编辑 TOML，即可导入 API Key、所选模型和 Codex 服务地址。

1. [点击下载 CC Switch](https://github.com/farion1231/cc-switch/releases)  
2. [打开 API Key](https://alltokenapi.com/keys)页面，找到要使用的密钥。
3. 打开该行的操作菜单，。择 CC Switch 导入。
4. 选择 Codex，再选择当前 API Key 可用的主模型，并保留自动生成的 `/v1` 地址。
5. 确认浏览器提示，然后在 CC Switch 中检查并保存导入的服务商。

详细教程：[[CC Switch#CC Switch下载]]
## 2. 手动修改配置文件

| 系统            | 配置文件路径                    |
| ------------- | ------------------------- |
| Windows       | `用户目录\.codex\config.toml` |
| macOS / Linux | `~/.codex/config.toml`    |

### 1. 编辑 config.toml
>[!tip] 注意 
>如果model_provider参数和之前不一样，可能会导致Codex的历史记录丢失，可以配置好后交给Codex自行解决，也可以通过CC Switch进行管理避免这种问题

```toml
model_provider = "AllTokenAPI"  //此处替换为对应的模型供应商名称
model = "gpt-5.5"
review_model = "gpt-5.5"
model_reasoning_effort = "xhigh"
disable_response_storage = true
network_access = "enabled"
windows_wsl_setup_acknowledged = true

[model_providers.AllTokenAPI]
name = "alltokenapi"
base_url = "https://alltokenapi.com"
wire_api = "responses"
requires_openai_auth = false
http_headers = { "x-openai-actor-authorization" = "local-image-extension" }


[features]
goals = true
```

### 2. 编辑~/.codex/auth.json
>[!tip] 注意 
1.如果没有auth.json，创建一个这个文件就行
2.如果原来是账号密码登录，之间用下面的配置替换掉原来的就行

```json
{
  "OPENAI_API_KEY": "此处替换为API 密钥"
}
```

### 3. 重启并验证
1. 保存 `config.toml`和`auth.json`，然后重启终端以及正在运行的 Codex 应用或 IDE 扩展。
2. 在新的终端中运行 `codex`，发起一个测试任务。
3. 如启动失败，请检查环境变量、模型名称和 Base URL 后重试。

## 3.常见问题
### 1. OpenAI官方Codex配置参考
- [Codex 配置参考](https://developers.openai.com/codex/config-reference)

### 2. 报错：Unauthrized Incorrect API key或者 Invalid API key
原因可能如下：
1. `config.toml`文件的`base_url`未被配置为`https://alltokenapi.com`
2. `auth.json`文件的`OPENAI_API_KEY`错误
3. API Key过期