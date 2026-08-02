# Chat Completions

使用 OpenAI Chat Completions 格式发送对话请求。该接口适合大多数 OpenAI 兼容 SDK 和聊天客户端。

## 请求

```http
POST /v1/chat/completions
```

```bash
curl "https://alltokenapi.com/v1/chat/completions" \
  -H "Authorization: Bearer sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model-id",
    "messages": [
      {
        "role": "system",
        "content": "You are a concise assistant."
      },
      {
        "role": "user",
        "content": "Hello"
      }
    ],
    "stream": false
  }'
```

## 请求字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 准确的模型 ID |
| `messages` | array | 是 | 按顺序排列的对话消息 |
| `temperature` | number | 否 | 模型支持时控制采样随机性 |
| `top_p` | number | 否 | 核采样参数 |
| `max_tokens` | integer | 否 | 最大生成 Token 数 |
| `max_completion_tokens` | integer | 否 | 部分新模型使用的最大补全 Token 数 |
| `stream` | boolean | 否 | 是否返回流式事件 |
| `tools` | array | 否 | 工具定义，需模型和渠道支持 |
| `tool_choice` | string/object | 否 | 工具选择策略 |
| `response_format` | object | 否 | JSON 等结构化输出设置，需模型支持 |
| `reasoning_effort` | string | 否 | 推理模型的推理强度 |

不要同时随意设置 `temperature` 和 `top_p`。不同模型支持的参数不同，未被支持的参数可能被上游拒绝。

## 响应示例

```json
{
  "id": "chatcmpl_xxx",
  "object": "chat.completion",
  "created": 1760000000,
  "model": "your-model-id",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello!"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 18,
    "completion_tokens": 4,
    "total_tokens": 22
  }
}
```

## 流式请求

将 `stream` 设为 `true`，并使用 `curl -N` 禁止客户端缓冲：

```bash
curl -N "https://alltokenapi.com/v1/chat/completions" \
  -H "Authorization: Bearer sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model-id",
    "messages": [
      {"role": "user", "content": "Count from one to five"}
    ],
    "stream": true
  }'
```

正常情况下，客户端会持续收到 `data:` 开头的 Server-Sent Events，最后以完成事件结束。

## 常见问题

- `model_not_found`：使用当前 API Key 请求 `/v1/models`，复制准确模型 ID。
- 参数错误：删除非必填参数，先用最小请求验证。
- 流式响应一次性返回：检查客户端、反向代理或 SDK 是否缓冲 SSE。
- 工具调用失败：确认模型和实际渠道支持工具调用，不要仅根据模型名称推断。
