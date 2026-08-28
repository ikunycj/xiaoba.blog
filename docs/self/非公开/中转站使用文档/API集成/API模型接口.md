# API 模型接口

## 1. 准备信息

- API Key：在 API Key 页面创建。
- 模型 ID：从对应协议的模型列表接口返回结果中复制。
- 服务地址：根据客户端填写 Base URL。

API Key 只放在服务端配置或环境变量中，不要提交到代码仓库、网页前端或公开日志。

| 客户端 | Base URL |
| --- | --- |
| OpenAI SDK、Cursor 等兼容客户端 | `https://alltokenapi.com/v1` |
| Claude Code、Gemini CLI | `https://alltokenapi.com` |
| 直接发送 HTTP 请求 | `https://alltokenapi.com` |

## 2. 获取模型 ID

OpenAI 兼容接口和 Claude 使用 `/v1/models`；Gemini 原生接口使用 `/v1beta/models`。不要把 Gemini 的 `x-goog-api-key` 请求发到 `/v1/models`。

### OpenAI 兼容接口
```bash
curl https://alltokenapi.com/v1/models \
  -H "Authorization: Bearer sk-your-api-key"
```

复制响应中的 `data[].id`，例如：

```json
{
  "id": "your-model-id",
  "object": "model"
}
```

### Gemini 原生接口

```bash
curl https://alltokenapi.com/v1beta/models \
  -H "x-goog-api-key: sk-your-api-key"
```

复制响应中的 `models[].name`。调用 `generateContent` 时，使用模型名称中的模型 ID，例如 `gemini-2.5-flash`。

模型 ID 必须完全一致。不同 API Key 返回的模型可能不同。

## 3. 选择接口

| 用途            | 本站接口                                          | 官方文档                                                                    |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| 普通聊天          | `POST /v1/chat/completions`                   | [Chat Completions](https://platform.openai.com/docs/api-reference/chat) |
| 推理、工具调用、Codex | `POST /v1/responses`                          | [Responses](https://platform.openai.com/docs/api-reference/responses)   |
| Claude 协议     | `POST /v1/messages`                           | [Anthropic Messages](https://docs.anthropic.com/en/api/messages)        |
| Gemini 原生协议   | `POST /v1beta/models/{model}:generateContent` | [Gemini Generate Content](https://ai.google.dev/api/generate-content)   |
| 图片            | `POST /v1/images/generations`                 | [Images](https://platform.openai.com/docs/api-reference/images)         |
| 音频（暂无模型）      | `POST /v1/audio/speech`                       | [Audio](https://platform.openai.com/docs/api-reference/audio)           |
| 视频（暂无模型）      | `POST /v1/videos`                             | [Videos](https://platform.openai.com/docs/api-reference/videos)         |

官方文档用于查询完整参数；本站文档只补充本站地址、认证方式和最小示例。

OpenAI 格式的模型响应还会返回 `supported_endpoint_types`。如果某个模型请求报接口不支持，先检查该字段，再换用对应接口。

## 4. 第一次请求

```bash
curl https://alltokenapi.com/v1/chat/completions \
  -H "Authorization: Bearer sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model-id",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

OpenAI SDK 配置：

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-api-key",
    base_url="https://alltokenapi.com/v1",
)
response = client.chat.completions.create(
    model="your-model-id",
    messages=[{"role": "user", "content": "你好"}],
)
print(response.choices[0].message.content)
```

## 认证头

| 协议 | 请求头 |
| --- | --- |
| OpenAI 兼容接口 | `Authorization: Bearer sk-your-api-key` |
| Anthropic | `x-api-key: sk-your-api-key`、`anthropic-version: 2023-06-01` |
| Gemini | `x-goog-api-key: sk-your-api-key` |

## 详细说明

- [文本与对话](文本与对话.md)
- [多模态接口](多模态接口.md)
- [兼容性与限制](兼容性与限制.md)
