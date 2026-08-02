# OpenAI Embeddings

将文本转换为向量，可用于语义搜索、检索增强生成、聚类、推荐和相似度计算。

## 请求

```http
POST /v1/embeddings
```

```bash
curl "https://alltokenapi.com/v1/embeddings" \
  -H "Authorization: Bearer sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-embedding-model-id",
    "input": [
      "The first document",
      "The second document"
    ],
    "encoding_format": "float"
  }'
```

## 请求字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 支持 Embeddings 端点的模型 ID |
| `input` | string/array | 是 | 单条文本或文本数组 |
| `encoding_format` | string | 否 | 向量编码格式，常用值为 `float` |
| `dimensions` | integer | 否 | 模型支持时指定输出向量维度 |
| `user` | string | 否 | 调用方自定义的用户标识 |

批量输入时，响应 `data[].index` 与输入数组顺序对应。请求前应确认模型允许的单次输入数量和最大 Token 数。

## 响应示例

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.0123, -0.0456, 0.0789]
    }
  ],
  "model": "your-embedding-model-id",
  "usage": {
    "prompt_tokens": 6,
    "total_tokens": 6
  }
}
```

示例向量经过截断，实际响应通常包含更多浮点数。

## 使用建议

1. 文档入库和查询时必须使用相同模型与维度。
2. 向量库字段维度必须与接口输出完全一致。
3. 批量输入前先按模型限制切分文本，避免单次请求过大。
4. 保存原文、模型 ID、维度和向量版本，方便后续迁移。

## 常见问题

- 输入为空：确认 `input` 是非空字符串或字符串数组。
- 维度不匹配：删除 `dimensions` 使用模型默认值，或同步修改向量库结构。
- 返回 400：确认模型支持 Embeddings 端点，而不是普通聊天端点。
- 相似度结果异常：确认所有向量经过一致的归一化和距离度量流程。
