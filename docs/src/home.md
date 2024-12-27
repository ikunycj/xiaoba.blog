---
# 博客
layout: home

hero:
  name: 小八博客
  text: welcome to my blog
  tagline: 这里是小八的知识"小金库"，记录生活和学习的点滴
  image:
    src: /xiaoba-logo.png
    alt: 小八
  actions:
    - text: 近期更新
      link: /share/blogbuild/choose
    - text: 笔记仓库
      link: /note
    - text: 胡乱分享
      link: /share
      theme: sponsor
    - text: 捻七杂八
      link: /share
      theme: sponsor
features:
  - icon: 🐞
    title: 博客搭建
    details: 基于VitePress搭建的博客<br />低代码、零配置、自动化部署，让你专注于内容创作
    link: /share/blogbuild/choose
    linkText: 踩坑记录
  - icon: 📖
    title: 笔记仓库
    details: 同步OneNote笔记到博客<small>（当然）</small><br />其他任何本地文件其实都能同步
    link: /note
    linkText: 暂时更新了数据结构与算法笔记
  - icon: 📘
    title: 后端
    details: 包含了java/go/python等后端技术的学习笔记<small>（还有好玩的小东西）</small><br />
    link: /note
    linkText: 源码阅读
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: /note
    linkText: 提效工具
---

<script setup>
import Home from '../../docs/.vitepress/views/Home/index.vue'
</script>

<Home />


