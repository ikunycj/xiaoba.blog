# API 模型接口

本文档列出 All Token API 当前提供的主要模型接口。所有示例均使用以下服务地址：

```text
https://alltokenapi.com
```

## 认证方式

不同协议使用不同的认证请求头：

| 协议 | 认证方式 |
| --- | --- |
| OpenAI 兼容接口 | `Authorization: Bearer sk-your-api-key` |
| Anthropic Messages | `x-api-key: sk-your-api-key`，并提供 `anthropic-version` |
| Gemini 原生接口 | `x-goog-api-key: sk-your-api-key` |

请仅在服务端、受信任的本地客户端或安全的环境变量中保存 API Key。

## 模型

- [获取模型列表（OpenAI 格式）](获取模型列表（OpenAI格式）.md)
- [获取模型列表（Gemini 格式）](获取模型列表（Gemini格式）.md)

## 对话与生成

- [Chat Completions](Chat-Completions.md)
- [Responses API](Responses-API.md)
- [Claude Messages](Claude-Messages.md)
- [Gemini 文本对话](Gemini文本对话.md)
- [Gemini 多模态理解](Gemini多模态理解.md)

## 传统补全

- [文本补全](文本补全.md)

## Embeddings

- [OpenAI Embeddings](OpenAI-Embeddings.md)
- [Gemini Embeddings](Gemini-Embeddings.md)

## 异步视频

- [创建异步视频任务](创建异步视频任务.md)
- [查询异步视频任务](查询异步视频任务.md)

## 选择正确的接口

模型名称相似，不代表支持相同协议。调用前应完成以下检查：

1. 使用当前 API Key 请求模型列表。
2. 在[模型定价页面](https://alltokenapi.com/pricing)确认模型支持的端点类型。
3. 使用与端点匹配的请求格式，不要仅根据模型名称推测兼容性。
4. 先发送小型非流式请求，再启用流式输出、工具调用或多模态内容。

## 常见状态码

| 状态码 | 含义 |
| --- | --- |
| `400` | 请求格式、参数或模型不正确 |
| `401` | API Key 缺失或无效 |
| `404` | 接口、模型或任务不存在 |
| `429` | 触发速率限制或可用额度不足 |
| `5xx` | 中转站或上游模型服务未能完成请求 |

排查失败请求时，请记录请求时间、HTTP 状态码、错误消息、请求 ID、模型和端点，并在[使用日志](https://alltokenapi.com/usage-logs)中核对。
