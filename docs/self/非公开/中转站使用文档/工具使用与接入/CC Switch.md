# CC Switch 一键导入

## CC Switch是什么？

CC Switch 是一款跨平台桌面应用，专为使用 AI 编程工具的开发者设计。它帮助你统一管理 **Claude Code**、**Claude Desktop**、**Codex**、**Gemini CLI**、**OpenCode**、**OpenClaw** 和 **Hermes** 等受管应用的配置。

## 解决什么问题

在日常Agent（智能体）使用中，你可能会遇到这些痛点：

- **多供应商切换麻烦**：使用不同的 API 供应商（官方、中转服务商），需要手动修改配置文件
- **配置分散难管理**：Claude Code、Claude Desktop、Codex、Gemini、OpenCode、OpenClaw、Hermes 各有独立的配置文件，格式不同
- **无法监控用量**：不知道 API 调用了多少次，花了多少钱
- **服务不稳定**：单一供应商出问题时，整个工作流中断

CC Switch 通过统一的界面解决这些问题。

点击[CC Switch官网](https://ccswitch.io/zh/)，去查看更多cc switch的细节‘

## CC Switch下载
1. 点击进入[下载 CC Switch](https://github.com/farion1231/cc-switch/releases)
2. 进入下载页面后，选择最新的版本号，一直下滑到底部，就会有安装包列表，选择适配自己电脑型号的安装包（如果不清楚，请把页面截图还有自己电脑的型号信息交给AI判断）
![[f8b8e36b0e2118aa95130e4404ddbc34.png]]

3. 此处是更详细的：[官方安装指南]

## 使用和导入
- [官方文档](https://ccswitch.io/zh/docs)
- [快速上手](https://ccswitch.io/zh/docs?section=getting-started&item=quickstart)
### 一键导入CC Switch配置
1. 登录官网，进入控制台的 [API秘钥页面](https://alltokenapi.com/keys)，然后创建秘钥
![[180885b0db3fe0723f100047bd46f02b.png]]

2. 填写秘钥名称，选择分组，然后保存密钥
   [点击了解更多分组与计费信息]()
![[60dee7d0d4a8f8e7cf99e141c1b1362c.png]]

3. 创建密钥后，点击cc switch的小图标
![[c2631bec9d3d4b4ed7357054457051fb.png]]

4. 在导入前，进行导入前的选择和设置，选择对应的AGent客户端（目前只支持Claude、Codex、Gemini，其他客户端需要手动导入）
![[ac4a9712e7a58f1ac13208986fe4bae7.png]]

5. 最后，cc swich会弹出导入信息确认，确认无误后点击导入
![[74e4ee8dd6f109c13a50a9c506d47ccb.png]]

6. 最终，导入成功，点击启用按钮。
   ！！！导入成功后记得重启Agent客户端使配置生效
![[88840668e7792d0e7f2ab7e7344dbbc6.png]]

### 手动配置CC Switch
1. 打开CC Switch，点击右上角＋号，添加模型供应商

![[f5de7f56519a46a0f159ca9b39f9578d.png]]

2. 此处选择统一供应商和Codex供应商均可，自定义配置，然后下滑填写具体配置
![[c0d0455350ac703a01c537b4d6960468.png]]

3. 按照图示，填写信息，其中红框圈起来的是必须要填写的。完成填写后点击添加
	[不知道API秘钥？点击获取](https://alltokenapi.com/keys)
![[7baccf19a4e37a80731edcde5bcb7368.png]]

4. 最后，点击启用。
   ！！！记得重启所对应的Agent（智能体客户端），否则配置修改无法生效
![[3ecbd61ee8ef9c1e5aba8a1373e751c2.png]]


## 高级用法
### [在CLade Code中使用ChatGPT](https://ccswitch.io/zh/tutorials/claude-codex-routing-guide)
### [在 Codex 中使用 Claude 模型](https://ccswitch.io/zh/tutorials/codex-claude-routing-guide)
### [更多高级用法请见CC Switch官网](https://ccswitch.io/zh/tutorials)