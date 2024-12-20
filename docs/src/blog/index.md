---
# 博客
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 小八博客
  text: welcome to my blog
  tagline: 这里是小八的知识"小金库"，记录生活和技术的点滴
  image:
    src: /xiaoba-smile.jpg
    alt: 小八
  actions:
    - text: 笔记仓库
      link: /note
    - text: 胡乱分享
      link: /share
    - text: 捻七杂八
      link: /daily-notes/
      theme: sponsor
features:
  - icon: 📖
    title: 前端
    details: 整理前端常用知识点<small>（或者）</small><br />如有异议按你的理解为主，不接受反驳
    link: /fe/javascript/types
    linkText: 前端常用知识
  - icon: 📘
    title: 后端
    details: 包含了java/go/python等后端技术的学习笔记<small>（还有好玩的小东西）</small><br />
    link: /analysis/utils/only-allow
    linkText: 源码阅读
  - icon: 💡
    title: Workflow
    details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
    link: /workflow/utils/library
    linkText: 常用工具库
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: /efficiency/online-tools
    linkText: 提效工具
  - icon: 🐞
    title: 杂记分享
    details: 一些乱七八糟的杂记<br />那些年我们踩过的坑
    link: /pit/npm
    linkText: 踩坑记录
  - icon: 💯
    title: 吾志所向，一往无前。
    details: '<small class="bottom-small">一个想躺平的小开发</small>'
    link: /mao
---

<script setup>
import Home from '../../../docs/.vitepress/views/Blog/index.vue'
</script>

<Home />

