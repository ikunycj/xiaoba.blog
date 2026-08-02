# Responses API

Responses API 面向新一代文本生成、推理和工具调用工作流，也是 Codex 使用的主要协议。

## 请求

```http
POST /v1/responses
```

```bash
curl "https://alltokenapi.com/v1/responses" \
  -H "Authorization: Bearer sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model-id",
    "instructions": "Answer briefly.",
    "input": "Explain what an API gateway does.",
    "stream": false
  }'
```

## 请求字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 支持 Responses 端点的模型 ID |
| `input` | string/array | 否 | 文本、消息或多模态输入 |
| `instructions` | string | 否 | 本次请求的系统级指令 |
| `max_output_tokens` | integer | 否 | 最大输出 Token 数 |
| `stream` | boolean | 否 | 是否返回流式事件 |
| `tools` | array | 否 | 函数、网页搜索等工具定义 |
| `tool_choice` | string/object | 否 | 工具选择策略 |
| `reasoning` | object | 否 | 推理强度和摘要配置 |
| `previous_response_id` | string | 否 | 在上游支持时延续先前响应 |
| `temperature` | number | 否 | 模型支持时控制采样随机性 |
| `top_p` | number | 否 | 核采样参数 |

## 响应示例

```json
{
  "id": "resp_xxx",
  "object": "response",
  "created_at": 1760000000,
  "status": "completed",
  "model": "your-model-id",
  "output": [
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "An API gateway provides a unified entry point for services."
        }
      ]
    }
  ],
  "usage": {
    "input_tokens": 12,
    "output_tokens": 15,
    "total_tokens": 27
  }
}
```

## 流式请求

```bash
curl -N "https://alltokenapi.com/v1/responses" \
  -H "Authorization: Bearer sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model-id",
    "input": "Write a two-line greeting.",
    "stream": true
  }'
```

Responses 流会返回带事件类型的 SSE。客户端应根据事件类型拼接文本，而不是把每个事件当作完整响应。

## 兼容性说明

- Codex 的 Base URL 应以 `/v1` 结尾，并保持 `wire_api = "responses"`。
- 只有模型和渠道声明支持 Responses 端点时才应调用此接口。
- 工具、推理、流式事件和错误结构的兼容程度取决于具体渠道。
- 原生 Claude 渠道不能被默认视为完整的 Responses 兼容渠道。

## 常见问题

- 返回 404：检查 Base URL 是否意外重复了 `/v1`。
- 模型拒绝请求：在模型定价页确认 Responses 端点支持。
- 工具事件不完整：先移除工具，以纯文本请求验证基础链路。
- 续写失败：确认上游支持 `previous_response_id`，并且先前响应仍然有效。
