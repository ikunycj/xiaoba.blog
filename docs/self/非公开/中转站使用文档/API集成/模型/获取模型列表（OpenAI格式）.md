# 获取模型列表（OpenAI 格式）

返回当前 API Key 实际可用的模型列表。

## 请求

```http
GET /v1/models
```

```bash
curl "https://alltokenapi.com/v1/models" \
  -H "Authorization: Bearer sk-your-api-key"
```

## 响应示例

```json
{
  "object": "list",
  "data": [
    {
      "id": "your-model-id",
      "object": "model",
      "created": 1626777600,
      "owned_by": "provider"
    }
  ]
}
```

## 字段说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `object` | string | 列表对象类型，通常为 `list` |
| `data` | array | 当前 API Key 可用的模型数组 |
| `data[].id` | string | 调用接口时使用的准确模型 ID |
| `data[].owned_by` | string | 模型对应的服务商标识 |
| `data[].supported_endpoint_types` | array | 配置可用时返回该模型支持的端点类型 |

## 可见范围

响应结果会根据当前 API Key 的路由分组、模型限制和可计费模型范围进行筛选。不同 API Key 返回的模型列表可能不同，因此不要使用账号级模型目录替代此接口的结果。

## 常见问题

- 返回 `401`：检查 `Authorization` 请求头和 API Key 是否完整。
- 模型未出现：检查 API Key 的分组、模型限制和模型定价配置。
- 模型存在但调用失败：继续确认该模型是否支持准备调用的端点类型。
