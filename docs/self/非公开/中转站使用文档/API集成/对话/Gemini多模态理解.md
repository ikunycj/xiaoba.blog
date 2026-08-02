# Gemini 多模态理解

在 Gemini `generateContent` 请求中同时提交文本和图片、音频或视频，让支持多模态的模型分析媒体内容。

## 使用 Base64 图片

```http
POST /v1beta/models/{model}:generateContent
```

```bash
curl "https://alltokenapi.com/v1beta/models/your-gemini-model-id:generateContent" \
  -H "x-goog-api-key: sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [
          {"text": "Describe the important information in this image."},
          {
            "inlineData": {
              "mimeType": "image/jpeg",
              "data": "BASE64_IMAGE_DATA"
            }
          }
        ]
      }
    ]
  }'
```

`data` 只填写 Base64 数据，不要重复附加 `data:image/jpeg;base64,` 前缀，除非所选渠道明确要求完整 Data URL。

## 使用媒体 URL

部分模型和渠道支持 `fileData`：

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {"text": "Summarize this media file."},
        {
          "fileData": {
            "mimeType": "image/png",
            "fileUri": "https://example.com/image.png"
          }
        }
      ]
    }
  ]
}
```

媒体 URL 必须能被实际的上游服务访问。内网地址、需要 Cookie 的链接、临时过期链接或受防盗链保护的资源通常不可用。

## 关键字段

| 字段 | 说明 |
| --- | --- |
| `parts[].text` | 与媒体一起发送的任务说明 |
| `parts[].inlineData.mimeType` | 媒体 MIME 类型，如 `image/jpeg` |
| `parts[].inlineData.data` | Base64 编码的媒体内容 |
| `parts[].fileData.fileUri` | 可被上游访问的媒体 URL |
| `generationConfig.maxOutputTokens` | 最大输出 Token 数 |

## 支持范围

- 模型必须支持 Gemini 端点和对应媒体类型。
- 图片、音频、视频和文档的大小限制可能因渠道而异。
- 多模态输入可能采用独立 Token 或媒体计费规则。
- 即使文本对话可用，也不代表同一模型一定支持媒体输入。

## 性能与安全

1. 上传前压缩图片和视频，避免发送远高于识别需求的分辨率。
2. 不要在媒体 URL 中包含长期有效的访问凭证。
3. 对敏感文件使用短时有效链接，并确认上游处理范围符合业务要求。
4. 长视频和大文件可能显著增加请求耗时，客户端超时应覆盖完整处理时间。

## 常见问题

- 400：检查 Base64、MIME 类型和 JSON 结构。
- 模型只返回文本错误：确认模型确实支持当前媒体类型。
- URL 无法读取：换成公开可访问的短时链接，或改用 `inlineData`。
- 请求时间过长：减小文件体积，并检查调用方总超时时间。
