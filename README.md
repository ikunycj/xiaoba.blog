# 小八博客 ✨

<div align="center">

![小八博客](docs/blogs/public/xiaoba-logo.png)

**基于 VitePress 的现代化技术博客系统**

[![GitHub stars](https://img.shields.io/github/stars/ikunycj/xiaoba.blog?style=social)](https://github.com/ikunycj/xiaoba.blog)
[![License](https://img.shields.io/github/license/ikunycj/xiaoba.blog)](https://github.com/ikunycj/xiaoba.blog/blob/master/LICENSE)
[![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://xioaba.blog)

[在线预览](https://xioaba.blog) · [更新日志](docs/blogs/CHANGELOG.md) · [优化报告](docs/blogs/OPTIMIZATION.md)

</div>

---

## ✨ 特性

- 🎨 **现代化设计** - 清新配色、流畅动效、响应式布局
- 📚 **结构化笔记** - 涵盖 AI、全栈开发、工程化等全栈知识体系
- 🔍 **本地搜索** - 无需外部服务，即时响应
- 💬 **评论系统** - 基于 GitHub Discussions 的 Giscus 集成
- ⚡ **性能优化** - 代码分割、缓存策略、Vercel 部署优化
- 🌙 **暗色模式** - 护眼的夜间主题
- 📱 **移动优先** - 完美适配各种设备
- 🚀 **SEO 友好** - Sitemap、meta 标签、语义化标签

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- npm >= 8

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
npm run docs:dev
```

访问 http://localhost:5173

### 构建部署
```bash
npm run docs:build
npm run docs:preview  # 本地预览构建结果
```

---

## 📁 项目结构

```
xiaoba.blog/
├── docs/                    # 文档根目录
│   ├── .vitepress/          # VitePress 配置
│   │   ├── config.mts       # 主配置文件
│   │   ├── theme/           # 主题自定义
│   │   │   ├── index.ts     # 主题入口
│   │   │   ├── tailwind.css # 样式文件
│   │   │   └── components/  # 自定义组件
│   │   └── views/           # 页面视图
│   ├── blogs/               # 博客内容
│   │   ├── home.md          # 首页
│   │   ├── blog/            # 技术博客
│   │   ├── share/           # 资源分享
│   │   └── public/          # 静态资源
│   ├── note/                # 学习笔记
│   │   ├── AI/              # AI 相关
│   │   ├── 编程语言/        # 各语言学习
│   │   ├── 软件工程/        # 工程化实践
│   │   └── 计算机知识/      # CS 基础
│   ├── local/               # 本地文件（不上传）
│   └── self/                # 私有文件（不展示）
├── scripts/                 # 构建脚本
├── vercel.json             # Vercel 配置
├── package.json
└── README.md
```

---

## 🎨 最新优化 (2026-05-02)

### UI 美观性
- ✅ 全新蓝青色配色方案
- ✅ 优化渐变背景和动效
- ✅ 增强卡片悬停效果
- ✅ 改进移动端体验

### 功能增强
- ✅ 添加阅读进度条
- ✅ 添加返回顶部按钮
- ✅ 集成本地搜索功能
- ✅ 优化导航结构

### 性能提升
- ✅ 代码分割优化
- ✅ Vercel 部署配置
- ✅ 静态资源缓存策略
- ✅ SEO 优化（Sitemap、robots.txt）

详细优化内容查看 [优化报告](docs/blogs/OPTIMIZATION.md)

---

## 🛠️ 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - 基于 Vite 和 Vue 的静态站点生成器
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **评论**: [Giscus](https://giscus.app/) - 基于 GitHub Discussions
- **部署**: [Vercel](https://vercel.com/) - 边缘计算平台
- **图标**: [@iconify/vue](https://iconify.design/)

---

## 📝 内容分类

### 📖 技术博客
- 项目复盘与技术分享
- 开发经验总结
- 问题解决方案

### 🤖 AI 学习
- 大语言模型原理
- Agent 架构设计
- 提示工程实践

### 💻 全栈开发
- 编程语言学习（Java、Python、Go、C++）
- 前后端技术栈
- 数据库与缓存

### 🏗️ 软件工程
- 架构设计模式
- 工程化实践
- DevOps 运维

### 🛠️ 开发工具
- Git 版本控制
- 构建工具（Maven、Gradle）
- IDE 使用技巧

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

[MIT License](LICENSE)

---

## 🔗 相关链接

- **博客主站**: https://xioaba.blog
- **GitHub**: https://github.com/ikunycj
- **actionAgent 项目**: https://github.com/ikunycj/actionAgent

---

## 📮 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 📧 GitHub Issues
- 💬 博客评论区
- 🐛 [提交 Bug](https://github.com/ikunycj/xiaoba.blog/issues/new)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！**

Made with ❤️ by [小八](https://github.com/ikunycj)

</div>
