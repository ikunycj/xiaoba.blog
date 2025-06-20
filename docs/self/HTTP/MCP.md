## 1. MCP概念

**MCP**全称**模型上下文协议**（[Model Context Protocol](https://modelcontextprotocol.io/introduction)），是由 Anthropic （Claude 模型的主体公司）（[在Claude中使用MCP](https://docs.anthropic.com/zh-CN/docs/agents-and-tools/mcp)）在2024年11月推出并开源的一项创新标准，旨在让大语言模型能够无缝连接至第三方的数据源。

该协议支持对接内容存储库、业务工具、开发环境等多种外部服务，从而赋能 AI 大模型获取更丰富的上下文信息，生成更加精准、相关且智能的回答。

![[Pasted image 20250523190746.png]]

**MCP 就像转接头，统一不同服务供所有人使用**

MCP 就像一个“转接头”或“通用插座”，它的核心作用是统一不同外部服务（如 Google Drive、GitHub、Slack、本地文件系统等），通过标准化接口与 AI 模型对接。这样，开发者只需基于 MCP 规范开发一次“接口适配器”（MCP 服务器），就能让所有兼容 MCP 的模型（MCP 客户端）无缝接入，无需针对每个模型单独适配，大幅提升兼容性与开发效率。MCP 里面还包含 SSE（Server-Sent Events），是一种允许服务器向浏览器推送实时更新的技术。

**传统的 API 就像不同的门和钥匙**

每扇门都需要自己的钥匙和特定的规则

![[Pasted image 20250523191047.png]]

**MCP是为AI模型量身定制的“USB-C接口”**

可以标准化地连接AI系统与各类外部工具和数据源

![[Pasted image 20250523191101.png]]

**MCP与传统API关键区别：**

- 单一协议： MCP像一个统一接口，只要一次整合，就能连接多个服务。
- 动态发现： AI模型能自动识别并使用可用的工具，不用提前写死每个接口。
- 双向通信： MCP支持类似WebSockets的实时双向通信，模型不仅能查询数据，还能主动触发操作。

![[Pasted image 20250523191334.png]]

LLM 也不是万能的，它缺失了很多能力，LLM 可以作为智能体的大脑，外部工具就是智能体的手和脚，协助智能体执行决策。一个典型的 Agent 的设计，LLM 充当大脑模块，通过多模态输入，处理信息，然后做出决策和规划行动。

MCP 就是想要通过一个开放的协议，为外部工具（或数据源）提供统一和 LLM 交互的统一集成，MCP 就是手脚连接身体的“关节”。

## 2.MCP架构

MCP 协议遵循互联网常见的 C / S 架构，即客户端（Client）- 服务器（Server）架构。

MCP 协议引入了主机（Host）的概念，组成了基本的主机（Host）- 客户端（Client）- 服务器（Server）架构。

![[d6697dfe-aa89-456b-83e0-433a0cb7c6ce.jpeg]]

### 主机 MCP Host

MCP 协议里的主机就是大模型应用，类似 Claude 桌面客户端、Cursor 编辑器这种应用。可以在主机内调度客户端进程，发起到服务器的连接。

主机充当协调者的角色：

- 创建和管理多个客户端实例
- 控制客户端连接权限和生命周期
- 执行安全政策和同意要求
- 处理用户授权决策
- 协调 AI / 大模型集成和采样
- 管理跨客户端的上下文聚合

### 客户端 MCP Client
MCP 协议里的客户端可以理解为**主机内的一个业务进程**，可以与服务器进程进行连接，实现数据交互，帮助主机应用获取外部资源。

客户端进程的主要职责：

- 为每个服务器建立一个有状态的会话
- 处理协议协商和能力交换
- 路由协议消息双向传输
- 管理订阅和通知
- 维护服务器之间的安全边界

一个主机应用可以创建和管理多个客户端进程，每个客户端进程与一个特定的服务器进程维持 1:1 的独立连接。

### 服务器 MCP Server

MCP 协议中的服务器是在主机外运行的，用于提供特定资源和能力的外部程序。

服务器程序的主要特点：

- 通过 MCP 协议提供资源、工具和提示词
- 独立运作，承担明确责任
- 通过客户端接口请求采样
- 必须遵守安全限制
- 可以是本地进程或远程服务

## 3.应用案例


### 1.AI搜索

1. 通过联网搜索向 AI 提供最新信息
![[Pasted image 20250523192609.png]]

常见的 AI 助手采用通过**联网搜索获取实时信息**。当用户开启联网搜索时，助手先将用户的请求发送至搜索引擎，再将返回内容与用户输入一起提供给大模型，最终生成回答。**搜索引擎在此作为实时信息源，为大语言模型提供额外的上下文。**

2. 通过 API 向 AI 提供自有系统数据

![[Pasted image 20250523192622.png]]

如果希望 AI 能提供**行业内部信息**、**或者研发的自有系统内的信息，** AI 联网搜索的效果就很不好，甚至无法实现。用户可以自行搭建 AI 代理，**将自有系统的数据通过 API 的形式接入 AI 助手，** 为大语言模型补充提供丰富的上下文信息。

3. **通过 MCP 服务器向 AI 提供上下文**
![[Pasted image 20250523192629.png]]


MCP 协议解决了 AI 大模型与数据源集成碎片化的问题，提供统一标准，**让开发者无需为每个数据源和 AI 助手单独开发连接器。** 通过 MCP，**数据源和 AI 工具可建立安全双向连接，** 使 AI 在不同工具和数据集间流畅协作，实现更可持续的架构。
### 2.Browser use

与Manus类似，Browser Use可以直接在终端中操控电脑浏览器的工具，能够跨越纯 API 数据获取的方式，进行指令的下发。

https://github.com/browser-use/browser-use?tab=readme-ov-file

**阅读简历并查找机器学习职位，并将其保存到文件中**

### 3.AI 代码沙盒

一个代码沙盒的MCP服务，能让AI助手使用沙盒以安全的方式运行任意代码。

https://github.com/302ai/302_browser_use_mcp
![[Pasted image 20250523193148.png]]![[Pasted image 20250523193154.png]]


## 4.MCP市场


主要分为MCP server和MCP client

### 1.MCP Servers

MCP Server的趋势

![[Pasted image 20250523193302.png]]

MCP Servers的一些例子：

控制电脑本地的文件读取；方便的管理 GitLab 项目信息；获取地图交通信息

![[Pasted image 20250523193322.png]]![[Pasted image 20250523193327.png]]![[Pasted image 20250523193332.png]]

网络爬虫，可以获取页面结构信息；让大语言模型能够与网页交互；让大语言模型能够访问数据库

![[Pasted image 20250523193348.png]]![[Pasted image 20250523193355.png]]![[Pasted image 20250523193401.png]]

支付宝MCP，可以将支付宝的交易创建、查询、退款等能力集成到 LLM 应用
![[Pasted image 20250523193419.png]]![[Pasted image 20250523193426.png]]

市面上目前也有越来越多的能力被挖掘出来，并被统一、分类，由不同的数据源和工具控制和供给，以便于用户快速的安装调用。

- [官方MCP Servers](https://github.com/modelcontextprotocol/servers)
- 其他MCP Servers
[国内最大中文MCP社区（3万+服务）](https://www.mcpservers.cn/)
[著名独立开发者idoubi开发的 MCP.so 导航，收录了2k多个Server](https://mcp.so/)
[个人开发者打造的产品](https://smithery.ai/)
[收录1,704个MCP服务器的生态图谱](https://www.pulsemcp.com/)
[每个MCP都可以生成一个SSE URL，开发者技能在自己应用中集成这个MCP的能力，无需从0开发](https://mcp.composio.dev/)
[涉及领域广泛的市场，有近一万个服务](https://himcp.ai/)

### 2.MCP Clients
- **主流客户端**

|                    |                                                                                |                                                                                                     |                                                                           |             |
| ------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------- |
| **客户端名称**          | **官网地址**                                                                       | **核心优势**                                                                                            | **主要局限**                                                                  | **适用场景**    |
| **Trae**           | https://www.trae.ai/                                                           | • **首个集成MCP市场的国产IDE**，支持一键配置50+常用MCP<br><br>• 独创Agent与MCP关联机制，支持多场景智能体并行<br><br>• 内置JSON配置生成器降低开发门槛 | • 界面功能层级较深（需通过Tab页切换）<br><br>• 部分MCP需要手动安装npm包<br><br>• 第三方MCP质量审核机制尚未透明化 | AI编程/跨领域自动化 |
| **Claude Desktop** | [https://claude.anthropic.com/](https://claude.anthropic.com/)                 | • 官方旗舰客户端，协议支持最完整<br><br>• 支持多服务器负载均衡<br><br>• 企业级权限管理系统                                            | • 仅支持Anthropic系模型<br><br>• 国内访问需要特殊网络配置<br><br>• 不支持本地MCP服务热加载            | 企业级AI助手     |
| **Cursor**         | [https://cursor.sh/](https://cursor.sh/)                                       | • 深度重构VSCode的AI原生编辑器<br><br>• 支持项目级上下文感知（自动识别代码架构）<br><br>• 内置调试工具链与70+开发专用MCP                      | • 社区版功能受限<br><br>• MCP配置需通过node命令操作<br><br>• 中文文档更新滞后                     | 软件开发        |
| **Continue**       | [https://continue.dev/](https://continue.dev/)                                 | • 开源可定制化程度高<br><br>• 支持VS Code/JetBrains全家桶<br><br>• 自动补全响应速度行业领先（<200ms）                           | • 无官方MCP市场<br>• 需要自行搭建服务发现机制<br><br>• 企业级功能需付费                            | 代码辅助开发      |
| **Cline**          | [https://github.com/modelcontext/cline](https://github.com/modelcontext/cline) | • 终端环境友好型客户端<br><br>• 支持完整的CI/CD流水线集成<br><br>• 提供开发者沙箱环境                                            | • 学习曲线陡峭<br><br>• 缺乏可视化界面<br><br>• 依赖第三方MCP市场                             | DevOps自动化   |
| **LibreChat**      | [https://librechat.ai/](https://librechat.ai/)                                 | • 支持多模型动态切换（GPT/Claude/PaLM等）<br><br>• 内置代码解释器<br><br>• 社区插件生态活跃                                    | • MCP管理模块未与核心功能解耦<br><br>• 移动端适配较差<br><br>• 企业部署复杂                        | 多模型协作       |
| **Windsurf**       | [https://windsurf.mcp/](https://windsurf.mcp/)                                 | • 基于浏览器的轻量化客户端<br><br>• 支持MCP服务动态发现<br><br>• 提供可视化流程编排器                                             | • 仅支持HTTP协议<br><br>• 本地资源访问受限<br><br>• 无法保存复杂会话历史                         | 快速原型验证      |

- **其他**

[比如扣子空间也支持一些特定的MCP](https://space.coze.cn/?from=landingpage)
![[Pasted image 20250523193532.png]]

# 参考文档

- https://modelcontextprotocol.io/introduction
- https://mp.weixin.qq.com/s/dRp02phUG4Z4o-K_VjtxNA
- https://mp.weixin.qq.com/s/uTsr06MnJ9t3sGDzLD99_g
- https://docs.anthropic.com/zh-CN/docs/agents-and-tools/mcp