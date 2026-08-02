# Gemini Embeddings

使用 Gemini 原生 `embedContent` 格式生成文本向量。

## 请求

```http
POST /v1beta/models/{model}:embedContent
```

```bash
curl "https://alltokenapi.com/v1beta/models/your-gemini-embedding-model-id:embedContent" \
  -H "x-goog-api-key: sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "content": {
      "parts": [
        {"text": "A document to embed"}
      ]
    },
    "taskType": "RETRIEVAL_DOCUMENT",
    "title": "Example document",
    "outputDimensionality": 768
  }'
```

## 请求字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `content` | object | 是 | 需要嵌入的内容，文本放在 `parts[].text` |
| `taskType` | string | 否 | 检索文档、检索查询等任务类型 |
| `title` | string | 否 | 文档标题，部分任务类型可使用 |
| `outputDimensionality` | integer | 否 | 模型支持时指定输出维度 |

模型 ID 位于 URL 中，不需要在请求体中重复填写。中转站会根据路径中的模型完成路由。

## 响应示例

```json
{
  "embedding": {
    "values": [0.0123, -0.0456, 0.0789]
  }
}
```

示例向量经过截断，实际响应包含完整维度。

## 批量嵌入

模型和渠道支持时，可调用：

```http
POST /v1beta/models/{model}:batchEmbedContents
```

请求体使用 `requests` 数组，每个元素包含 `content`、`taskType`、`title` 或 `outputDimensionality`。

## 兼容性说明

本站 Gemini 原生嵌入接口使用 `/v1beta/models/{model}:embedContent`。不要将其他平台的异步任务接口或旧式 Embeddings 路径直接套用到本接口。

调用前应确认：

1. API Key 可见该模型。
2. 模型支持 Gemini Embeddings。
3. 文档向量和查询向量使用兼容的 `taskType`。
4. 向量库存储维度与 `outputDimensionality` 一致。

## 常见问题

- 404：检查模型 ID 和 `:embedContent` 动作是否完整。
- 400：检查 `content.parts` 是否存在文本。
- 维度不支持：删除 `outputDimensionality`，先使用模型默认维度。
- 批量请求失败：改用单条 `embedContent` 验证模型和渠道能力。
