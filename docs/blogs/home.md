---
layout: home

hero:
  name: 小八博客
  text: welcome to my blog
  tagline: 记录技术学习与实践，持续更新中。
  image:
    src: /xiaoba-logo.png
    alt: 小八
  actions:
    - theme: brand
      text: 进入博客
      link: /blog/index
    - theme: alt
      text: 个人笔记
      link: /note/

features:
  - icon: 📑
    title: 博客
    details: 查看文章、项目复盘与技术分享。
    link: /blog/index
    linkText: 立刻查看
  - icon: 📝
    title: 个人笔记
    details: 系统化整理的学习笔记与知识卡片。
    link: /note/
    linkText: 进入笔记
  - icon: 🛰️
    title: actionAgent 项目（研发中）
    details: 面向自动化任务执行的 Agent 项目，聚焦工作流编排、工具调用与可观测性建设。
    link: https://github.com/ikunycj/actionAgent
    linkText: 查看 GitHub
    target: _blank
    rel: noopener noreferrer
  - icon: 🧭
    title: 友情链接分享
    details: 推荐优质站点与实用资源。
    link: /share
    linkText: 去逛逛
---

<script setup>
import Home from '../../docs/.vitepress/views/Home/index.vue'
</script>

<Home />
