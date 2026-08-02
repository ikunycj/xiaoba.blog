# 获取模型列表（Gemini 格式）

使用 Gemini 原生格式返回当前 API Key 可用的模型。

## 请求

```http
GET /v1beta/models
```

```bash
curl "https://alltokenapi.com/v1beta/models" \
  -H "x-goog-api-key: sk-your-api-key"
```

## 响应示例

```json
{
  "models": [
    {
      "name": "models/your-gemini-model-id",
      "displayName": "your-gemini-model-id",
      "supportedGenerationMethods": [
        "generateContent"
      ]
    }
  ]
}
```

## 字段说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `models` | array | 当前 API Key 可用的 Gemini 模型 |
| `models[].name` | string | Gemini 格式的模型名称，通常带 `models/` 前缀 |
| `models[].displayName` | string | 模型显示名称 |
| `models[].supportedGenerationMethods` | array | 模型声明支持的 Gemini 方法 |
| `nextPageToken` | string | 存在分页时用于获取下一页的 Token |

## 使用模型 ID

调用 `generateContent` 时，将模型 ID 放入 URL：

```text
/v1beta/models/your-gemini-model-id:generateContent
```

如果列表中的 `name` 带有 `models/` 前缀，请避免在路径中重复写成 `models/models/...`。

## 常见问题

- 返回 `401`：检查 `x-goog-api-key` 是否存在且 API Key 有效。
- 列表为空：检查 API Key 的分组、模型限制和 Gemini 端点支持。
- Gemini CLI 无法识别：确认使用不带 `/v1` 的服务根地址 `https://alltokenapi.com`。
