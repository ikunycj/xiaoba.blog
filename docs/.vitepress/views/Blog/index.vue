<template>
  <section class="xb-page">
    <header class="xb-hero">
      <p class="xb-eyebrow">About Me</p>
      <h1>你好，我是小八</h1>
      <p class="xb-muted">
        记录技术学习、实践复盘和一些有趣的折腾。这个页面是博客入口页，下面提供常用导航与个人标签。
      </p>
      <div class="xb-chip-row">
        <span class="xb-chip">全栈学习者</span>
        <span class="xb-chip">产品与工程</span>
        <span class="xb-chip">持续分享</span>
      </div>
    </header>

    <div class="xb-grid">
      <a v-for="item in quickCards" :key="item.title" class="xb-card" :href="toPath(item.link)">
        <p class="xb-eyebrow">{{ item.emoji }} {{ item.title }}</p>
        <p class="mt-2 text-sm xb-muted">{{ item.desc }}</p>
        <p class="mt-3 text-sm font-semibold">立即前往</p>
      </a>
    </div>

    <section class="xb-grid">
      <article class="xb-card">
        <p class="xb-eyebrow">🎵 兴趣</p>
        <h3 class="mt-2 text-lg">音乐 / 创作 / 设计</h3>
        <p class="mt-2 text-sm xb-muted">喜欢把技术内容做成更好读、更好看的表达方式。</p>
      </article>
      <article class="xb-card">
        <p class="xb-eyebrow">💻 技术栈</p>
        <h3 class="mt-2 text-lg">Vue / React / Node / Go</h3>
        <p class="mt-2 text-sm xb-muted">优先沉淀可复用的方法，再沉淀代码模板。</p>
      </article>
      <article class="xb-card">
        <p class="xb-eyebrow">🧭 目标</p>
        <h3 class="mt-2 text-lg">做长期可维护的内容系统</h3>
        <p class="mt-2 text-sm xb-muted">保持更新节奏，让每篇笔记都能真正服务未来的自己。</p>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import { withBase } from "vitepress";

type QuickCard = {
  emoji: string;
  title: string;
  desc: string;
  link: string;
};

const quickCards: QuickCard[] = [
  {
    emoji: "📝",
    title: "笔记仓库",
    desc: "按专题整理的学习笔记与面试内容，适合快速检索。",
    link: "/note/index",
  },
  {
    emoji: "🔗",
    title: "分享导航",
    desc: "收录常用 AI 工具、社区和设计站点，开箱即用。",
    link: "/share",
  },
  {
    emoji: "🧪",
    title: "项目面板",
    desc: "查看博客改造进度与后续计划，持续迭代中。",
    link: "/projects",
  },
];

const toPath = (path: string) => withBase(path);
</script>
