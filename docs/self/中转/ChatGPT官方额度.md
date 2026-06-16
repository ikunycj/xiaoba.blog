下面是我按 **OpenAI 官方帮助页 / Codex 开发者文档 / 官方定价页** 查到的 Codex 额度情况。时间口径：**2026-05-10**。

## 先给结论

Codex 的额度现在不是简单的“每天多少次”，而是按 **模型、任务复杂度、本地/云端执行、是否代码审查、是否用 Fast mode、是否触发图片生成** 等因素消耗。官方给了“每 5 小时窗口”的大致范围，但同一个套餐里，简单任务和大代码库任务消耗会差很多。OpenAI 明确说明：小脚本/简单函数可能只消耗一小部分额度；大代码库、长时间运行任务、长上下文会显著消耗更多。([OpenAI开发者](https://developers.openai.com/codex/pricing "Pricing – Codex | OpenAI Developers"))

## 各套餐 Codex 可用性

| 套餐                       | Codex 定位                  | 是否有明确 5 小时额度表                                                                      |
| ------------------------ | ------------------------- | ---------------------------------------------------------------------------------- |
| **Free**                 | 体验 quick coding tasks     | 官方定价页说有 Codex，但没有给出详细 5 小时数值                                                       |
| **Go**                   | 轻量 coding tasks           | 官方定价页说有 Codex，但没有给出详细 5 小时数值                                                       |
| **Plus $20/月**           | 每周几个专注 coding sessions    | 有明确 5 小时额度表                                                                        |
| **Pro $100/月 / Pro 5x**  | 更长、更高强度 coding sessions   | 有明确 5 小时额度表；到 2026-05-31 有 2x Codex 促销                                             |
| **Pro $200/月 / Pro 20x** | 最重度 Codex 使用              | 有明确 5 小时额度表；到 2026-05-31 5 小时额度为 25x Plus                                          |
| **Business**             | 团队使用，可标准座席或 Codex-only 座席 | 有明确表，基础额度大致等同 Plus；可用 workspace credits 扩展                                         |
| **Enterprise / Edu**     | 企业/教育组织                   | flexible pricing 下无固定 rate limit，随 credits 扩展；无 flexible pricing 时多数功能按 Plus 每座席额度 |

官方 Codex 定价页明确写着：Codex 包含在 ChatGPT **Free、Go、Plus、Pro、Business、Edu、Enterprise** 计划中。Free 是“quick coding tasks”，Go 是“lightweight coding tasks”，Plus 开始才列出 web、CLI、IDE extension、iOS、自动代码审查、Slack 集成、GPT-5.5 / GPT-5.4 / GPT-5.3-Codex 等更完整能力。([OpenAI开发者](https://developers.openai.com/codex/pricing "Pricing – Codex | OpenAI Developers"))

## Plus 的 Codex 额度

官方 Codex pricing 页给出的 Plus 额度如下，窗口都是 **每 5 小时**：

|模型|Local Messages / 5h|Cloud Tasks / 5h|Code Reviews / 5h|
|---|--:|--:|--:|
|**GPT-5.5**|15–80|不可用|不可用|
|**GPT-5.4**|20–100|不可用|不可用|
|**GPT-5.4-mini**|60–350|不可用|不可用|
|**GPT-5.3-Codex**|30–150|10–60|20–50|

这些本地消息和云任务共享同一个 5 小时窗口，并且官方说还可能有额外周限制。([OpenAI开发者](https://developers.openai.com/codex/pricing "Pricing – Codex | OpenAI Developers"))

另外，ChatGPT 总定价页显示 Plus 有 “Expanded Codex usage”，并且 **Plus 的正常 Codex usage 在 2026-05-31 前翻倍**。([OpenAI](https://openai.com/chatgpt/pricing "ChatGPT Plans | Free, Go, Plus, Pro, Business, and Enterprise")) 这里需要注意：官方表格里的范围和促销文字并列存在，实际账号里最终可用量应以 Codex Usage Dashboard 或 CLI `/status` 为准。

## Pro $100 / Pro 5x 的 Codex 额度

Pro $100 标准上是 **Plus 的 5x**，但官方当前促销是 **到 2026-05-31 给 2x 额外 Codex usage**，也就是临时变成 **10x Plus**。([OpenAI开发者](https://developers.openai.com/codex/pricing "Pricing – Codex | OpenAI Developers"))

官方 5x 表格如下：

|模型|Local Messages / 5h|Cloud Tasks / 5h|Code Reviews / 5h|
|---|--:|--:|--:|
|**GPT-5.5**|80–400|不可用|不可用|
|**GPT-5.4**|100–500|不可用|不可用|
|**GPT-5.4-mini**|300–1750|不可用|不可用|
|**GPT-5.3-Codex**|150–750|50–300|100–250|

促销期内，Pro $100 获得上述用量的 **2x**，也就是官方描述的 **10x Plus**。([OpenAI开发者](https://developers.openai.com/codex/pricing "Pricing – Codex | OpenAI Developers"))

## Pro $200 / Pro 20x 的 Codex 额度

Pro $200 是 **20x Plus**，官方还说明到 **2026-05-31** 前会继续保留更高的 5 小时 Codex 限额，也就是 **25x Plus**，而不是标准 20x。([OpenAI开发者](https://developers.openai.com/codex/pricing "Pricing – Codex | OpenAI Developers"))

标准 20x 表格如下：

|模型|Local Messages / 5h|Cloud Tasks / 5h|Code Reviews / 5h|
|---|--:|--:|--:|
|**GPT-5.5**|300–1600|不可用|不可用|
|**GPT-5.4**|400–2000|不可用|不可用|
|**GPT-5.4-mini**|1200–7000|不可用|不可用|
|**GPT-5.3-Codex**|600–3000|200–1200|400–1000|

Pro 还有一个 Plus 没有的点：**GPT-5.3-Codex-Spark research preview**，这是更快、偏实时迭代的 Codex 模型，目前给 ChatGPT Pro 用户。([OpenAI开发者](https://developers.openai.com/codex/models "Models – Codex | OpenAI Developers"))

## Business / Codex-only seat

Business 有两种相关座席：

|座席类型|包含什么|计费|
|---|---|---|
|**Standard ChatGPT seat**|ChatGPT + Codex|固定每用户每月费用|
|**Codex seat**|只含 Codex，不含 ChatGPT workspace 访问|按使用量计费，无固定每用户月费|

OpenAI 的 Business 帮助页说明：Standard ChatGPT seats 包含 ChatGPT 以及 Codex；Codex seats 只提供 Codex，不提供 ChatGPT 访问，并且需要 workspace credits。([OpenAI Help Center](https://help.openai.com/en/articles/8792828-what-is-chatgpt-business "What is ChatGPT Business? | OpenAI Help Center"))

Business 的基础 Codex 额度表和 Plus 类似：

|模型|Local Messages / 5h|Cloud Tasks / 5h|Code Reviews / 5h|
|---|--:|--:|--:|
|**GPT-5.5**|15–80|不可用|不可用|
|**GPT-5.4**|20–100|不可用|不可用|
|**GPT-5.4-mini**|60–350|不可用|不可用|
|**GPT-5.3-Codex**|30–150|10–60|20–50|

Business 可通过 workspace credits 在超出内含额度后继续使用。([OpenAI开发者](https://developers.openai.com/codex/pricing "Pricing – Codex | OpenAI Developers"))

## Credits：超额后怎么继续用

Plus 和 Pro 用户达到 Codex 限制后，可以购买 credits 继续用，不一定要升级套餐。OpenAI 说明：先消耗套餐内置额度，达到限制后再从 credit balance 扣；可在 **Codex Settings > Usage > Credits** 查看、购买，也可以设置 auto top-up。([OpenAI Help Center](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-freegopluspro-sora "Using Credits for Flexible Usage in ChatGPT (Free/Go/Plus/Pro)  | OpenAI Help Center"))

现在 Codex credits 是按 token 消耗计价，而不是简单平均每条消息。官方 rate card 显示每 100 万 token 的 credits 消耗如下：([OpenAI Help Center](https://help.openai.com/en/articles/20001106-codex-rate-card "Codex rate card | OpenAI Help Center"))

|模型|Input / 1M tokens|Cached input / 1M tokens|Output / 1M tokens|
|---|--:|--:|--:|
|**GPT-5.5**|125 credits|12.50 credits|750 credits|
|**GPT-5.4**|62.50 credits|6.250 credits|375 credits|
|**GPT-5.4-mini**|18.75 credits|1.875 credits|113 credits|
|**GPT-5.3-Codex**|43.75 credits|4.375 credits|350 credits|
|**GPT-5.2**|43.75 credits|4.375 credits|350 credits|
|**GPT-Image-2.0 image**|200 credits|50 credits|750 credits|
|**GPT-Image-2.0 text**|125 credits|31.25 credits|250 credits|

## 什么会让额度消耗更快

几个官方明确提到的高消耗因素：

**大代码库、长任务、长上下文** 会显著增加每条消息消耗。([OpenAI开发者](https://developers.openai.com/codex/pricing "Pricing – Codex | OpenAI Developers"))

**Fast mode** 会更快，但更贵：GPT-5.5 的 Fast mode 是标准速率的 **2.5x credits**，GPT-5.4 是 **2x credits**。([OpenAI开发者](https://developers.openai.com/codex/speed "Speed – Codex | OpenAI Developers"))

**图片生成** 也算进 Codex general usage limits，平均比不生成图片的类似轮次快 **3–5x** 消耗内置额度；Free plan 不支持 Codex 里的 image generation。([OpenAI开发者](https://developers.openai.com/codex/pricing "Pricing – Codex | OpenAI Developers"))

**ChatGPT for Excel** 对 Plus/Pro 来说会和 Codex 共享同一个 agentic usage limit。([OpenAI Help Center](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-freegopluspro-sora "Using Credits for Flexible Usage in ChatGPT (Free/Go/Plus/Pro)  | OpenAI Help Center"))

## ChatGPT 登录 vs API Key 登录

Codex 有两种认证方式：用 ChatGPT 登录，或者用 API key。Codex Cloud 必须用 ChatGPT 登录；CLI 和 IDE extension 两种都支持。用 API key 时，按 OpenAI Platform 标准 API 价格计费，而且一些依赖 ChatGPT credits 的功能，比如 Fast mode，只在 ChatGPT 登录时可用。([OpenAI开发者](https://developers.openai.com/codex/auth "Authentication – Codex | OpenAI Developers"))

## 实用建议

如果你只是偶尔让 Codex 写小函数、解释代码、修小 bug，**Free/Go 可以试水，但额度和能力不透明且更轻量**。

如果你每周有几个真实项目、会用 CLI/IDE、偶尔云任务或代码审查，**Plus 是入门性价比档**。

如果你打算把 Codex 当主要编程助手，每天长时间用，**Pro $100 当前很划算**，因为到 **2026-05-31** 是 10x Plus 的 Codex 促销。

如果你是多项目并行、长上下文、大仓库、频繁自动审查/云任务，才更适合 **Pro $200**，尤其是你经常碰到 5 小时窗口限制。
