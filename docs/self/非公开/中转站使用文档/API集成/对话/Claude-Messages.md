# Claude Messages

使用 Anthropic Messages 原生格式调用支持 Claude 端点的模型。

## 请求

```http
POST /v1/messages
```

```bash
curl "https://alltokenapi.com/v1/messages" \
  -H "x-api-key: sk-your-api-key" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-claude-model-id",
    "max_tokens": 512,
    "system": "Answer briefly.",
    "messages": [
      {
        "role": "user",
        "content": "Hello"
      }
    ]
  }'
```

## 请求头

| 请求头 | 必填 | 说明 |
| --- | --- | --- |
| `x-api-key` | 是 | All Token API Key |
| `anthropic-version` | 是 | Anthropic 协议版本，常用值为 `2023-06-01` |
| `Content-Type` | 是 | 使用 `application/json` |

## 请求字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 支持 Anthropic 端点的模型 ID |
| `messages` | array | 是 | 用户和助手消息列表 |
| `max_tokens` | integer | 是 | 最大输出 Token 数 |
| `system` | string/array | 否 | 系统提示词 |
| `temperature` | number | 否 | 采样温度 |
| `top_p` | number | 否 | 核采样参数 |
| `top_k` | integer | 否 | Top-K 采样参数 |
| `stream` | boolean | 否 | 是否返回 SSE 流 |
| `tools` | array | 否 | Anthropic 工具定义 |
| `tool_choice` | object | 否 | 工具选择策略 |
| `thinking` | object | 否 | 模型支持时配置扩展思考 |

## 响应示例

```json
{
  "id": "msg_xxx",
  "type": "message",
  "role": "assistant",
  "model": "your-claude-model-id",
  "content": [
    {
      "type": "text",
      "text": "Hello!"
    }
  ],
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 4
  }
}
```

## Claude Code 配置

Claude Code 会自行附加 `/v1/messages`，因此 `ANTHROPIC_BASE_URL` 必须使用不带 `/v1` 的服务根地址：

```text
https://alltokenapi.com
```

## 常见问题

- 401：检查 `x-api-key`，不要误用网站登录凭证。
- 404：从 Claude Code 的 `ANTHROPIC_BASE_URL` 中删除 `/v1`。
- 参数无效：确认 `max_tokens` 已提供，并删除渠道不支持的 Beta 字段。
- 工具或思考功能异常：确认实际渠道支持对应 Anthropic 能力。
