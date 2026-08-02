# Gemini 文本对话

使用 Gemini 原生 `generateContent` 格式发送文本对话请求。

## 请求

```http
POST /v1beta/models/{model}:generateContent
```

```bash
curl "https://alltokenapi.com/v1beta/models/your-gemini-model-id:generateContent" \
  -H "x-goog-api-key: sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "systemInstruction": {
      "parts": [
        {"text": "Answer briefly."}
      ]
    },
    "contents": [
      {
        "role": "user",
        "parts": [
          {"text": "Hello"}
        ]
      }
    ],
    "generationConfig": {
      "maxOutputTokens": 512,
      "temperature": 0.7
    }
  }'
```

## 路径参数

| 参数 | 说明 |
| --- | --- |
| `{model}` | 当前 API Key 可用且支持 Gemini 端点的准确模型 ID |

## 请求字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `contents` | array | 是 | 对话内容，每条内容包含 `role` 和 `parts` |
| `systemInstruction` | object | 否 | 系统级指令 |
| `generationConfig` | object | 否 | 输出长度、采样和响应格式设置 |
| `safetySettings` | array | 否 | 模型支持时配置安全策略 |
| `tools` | array/object | 否 | 函数、搜索或代码执行工具 |
| `toolConfig` | object | 否 | 工具调用策略 |

常用 `generationConfig` 字段包括 `temperature`、`topP`、`topK`、`maxOutputTokens`、`stopSequences`、`responseMimeType` 和 `thinkingConfig`。具体支持范围取决于模型和渠道。

## 响应示例

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {"text": "Hello!"}
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 8,
    "candidatesTokenCount": 3,
    "totalTokenCount": 11
  }
}
```

## 流式请求

将 URL 中的动作改为 `streamGenerateContent`，并添加 `alt=sse`：

```bash
curl -N "https://alltokenapi.com/v1beta/models/your-gemini-model-id:streamGenerateContent?alt=sse" \
  -H "x-goog-api-key: sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {"role": "user", "parts": [{"text": "Count to five"}]}
    ]
  }'
```

## 常见问题

- 模型不支持：先请求 `/v1beta/models`，再确认 `generateContent` 支持。
- 路径错误：模型 ID 必须放在 URL 中，不要只写在请求体。
- Gemini CLI 404：`GOOGLE_GEMINI_BASE_URL` 应使用不带 `/v1` 的服务根地址。
- 参数错误：先移除 `generationConfig` 和工具字段，用最小 `contents` 请求验证。
