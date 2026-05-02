---
layout: home

hero:
  name: 小八博客
  text: Welcome to My Tech Journey
  tagline: 记录技术学习与实践 · 探索 AI 与开发之美 · 持续成长中 ✨
  image:
    src: /xiaoba-logo.png
    alt: 小八
  actions:
    - theme: brand
      text: 📖 阅读博客
      link: /blog/index
    - theme: alt
      text: 📚 查看笔记
      link: /note/
    - theme: alt
      text: 🚀 探索项目
      link: /projects

features:
  - icon: 📝
    title: 技术博客
    details: 分享开发经验、项目复盘与技术洞察。从实践中来，到实践中去。
    link: /blog/index
    linkText: 进入博客 →
  - icon: 🤖
    title: AI 深度学习
    details: 探索大语言模型、Agent 架构、提示工程等 AI 前沿技术，记录学习与实验。
    link: /note/AI/
    linkText: AI 笔记 →
  - icon: 💻
    title: 系统化笔记
    details: 涵盖编程语言、软件工程、算法数据结构等全栈知识体系的学习笔记。
    link: /note/
    linkText: 浏览笔记 →
  - icon: 🛠️
    title: 开发工具箱
    details: Git、Maven、Gradle 等开发工具的使用技巧与最佳实践分享。
    link: /note/工具/
    linkText: 工具指南 →
  - icon: 🎯
    title: actionAgent 项目
    details: 面向自动化任务执行的 Agent 项目，专注工作流编排、工具调用与可观测性建设。
    link: https://github.com/ikunycj/actionAgent
    linkText: GitHub →
    target: _blank
    rel: noopener noreferrer
  - icon: 🌐
    title: 资源分享站
    details: 精选优质技术资源、博客建站指南、效率工具推荐，助力开发者成长。
    link: /share
    linkText: 探索资源 →
---

<style>
/* Hero 区域增强 */
.VPHome {
  padding-bottom: 4rem;
}

.VPHomeHero {
  padding: 4rem 1.5rem;
}

.VPHomeHero .name {
  background: linear-gradient(120deg, #0ea5e9 0%, #22d3ee 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: clamp(2.5rem, 6vw, 4rem);
  animation: gradientAnimation 6s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradientAnimation {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.VPHomeHero .text {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  margin-top: 1rem;
  color: var(--vp-c-text-1);
  opacity: 0.9;
}

.VPHomeHero .tagline {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.8;
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.VPHomeHero .image {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.VPHomeHero .actions {
  margin-top: 2.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.VPButton {
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.VPButton.brand {
  background: linear-gradient(135deg, #0ea5e9, #06b6d4);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3);
}

.VPButton.brand:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.5);
}

.VPButton.alt {
  background: rgba(14, 165, 233, 0.1);
  border: 2px solid rgba(14, 165, 233, 0.3);
  color: var(--vp-c-brand-1);
}

.VPButton.alt:hover {
  background: rgba(14, 165, 233, 0.2);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
}

/* Features Bento Grid 布局 */
.VPHomeFeatures {
  padding: 3rem 1.5rem;
}

.VPFeatures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.VPFeature {
  position: relative;
  padding: 2rem;
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.VPFeature::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #0ea5e9, #22d3ee, #06b6d4);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.VPFeature:hover::before {
  transform: scaleX(1);
}

.VPFeature:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: var(--vp-c-brand-1);
  box-shadow: 
    0 20px 60px rgba(14, 165, 233, 0.15),
    0 0 0 1px rgba(14, 165, 233, 0.1);
  background: linear-gradient(
    135deg,
    var(--vp-c-bg-soft) 0%,
    rgba(14, 165, 233, 0.03) 100%
  );
}

.VPFeature .icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.VPFeature:hover .icon {
  transform: scale(1.2) rotate(5deg);
}

.VPFeature .title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.VPFeature .details {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.VPFeature .link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.VPFeature .link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--vp-c-brand-1);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.VPFeature:hover .link::after {
  transform: scaleX(1);
  transform-origin: left;
}

.VPFeature .link:hover {
  gap: 0.75rem;
  color: var(--vp-c-brand-2);
}

/* 特殊卡片样式（第1、5个卡片） */
.VPFeature:nth-child(1),
.VPFeature:nth-child(5) {
  background: linear-gradient(
    135deg,
    rgba(14, 165, 233, 0.08) 0%,
    rgba(34, 211, 238, 0.05) 100%
  );
}

/* 响应式优化 */
@media (max-width: 768px) {
  .VPHomeHero {
    padding: 3rem 1rem;
  }

  .VPHomeFeatures {
    padding: 2rem 1rem;
  }

  .VPFeatures {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .VPFeature {
    padding: 1.5rem;
  }

  .VPButton {
    width: 100%;
    justify-content: center;
  }
}

/* 暗色模式优化 */
.dark .VPFeature {
  background: rgba(255, 255, 255, 0.03);
}

.dark .VPFeature:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(14, 165, 233, 0.08) 100%
  );
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(14, 165, 233, 0.2);
}

.dark .VPFeature:nth-child(1),
.dark .VPFeature:nth-child(5) {
  background: rgba(14, 165, 233, 0.06);
}

/* 页脚装饰 */
.VPHome::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(
    to top,
    rgba(14, 165, 233, 0.05),
    transparent
  );
  pointer-events: none;
}
</style>
