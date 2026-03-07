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
      link: /note/index

features:
  - icon: 📝
    title: 博客
    details: 查看文章、项目复盘与技术分享。
    link: /blog/index
    linkText: 立即查看
  - icon: 📚
    title: 个人笔记
    details: 系统化整理的学习笔记与知识卡片。
    link: /note/index
    linkText: 进入笔记
  - icon: 🛠️
    title: actionAgent 项目（研发中）
    details: 正在持续开发迭代，记录进度与关键方案。
    link: /projects
    linkText: 查看进展
  - icon: 🤝
    title: 友链分享
    details: 推荐优质站点与实用资源。
    link: /share/map
    linkText: 去逛逛
---

<script setup>
import Home from '../../docs/.vitepress/views/Home/index.vue'
</script>

<Home />
