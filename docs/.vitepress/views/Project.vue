<template>
  <section class="xb-page">
    <header class="xb-hero">
      <p class="xb-eyebrow">Projects</p>
      <h1>项目与计划</h1>
      <p class="xb-muted">
        这里是博客相关项目的进度面板，包含已完成模块、正在迭代内容和下一步计划。
      </p>
      <div class="xb-chip-row">
        <a class="xb-chip" href="https://github.com/ikunycj/xiaoba.my" target="_blank" rel="noopener">仓库地址</a>
        <a class="xb-chip" :href="toPath('/home')">博客首页</a>
        <a class="xb-chip" :href="toPath('/share')">资源导航</a>
      </div>
    </header>

    <div class="xb-grid">
      <article v-for="item in projects" :key="item.title" class="xb-card project-card">
        <div>
          <span class="xb-tag">{{ item.status }}</span>
          <span class="xb-tag">{{ item.stack }}</span>
        </div>
        <h2 class="mt-3 text-xl">{{ item.title }}</h2>
        <p class="mt-2 xb-muted text-sm">{{ item.desc }}</p>
        <p class="mt-3 text-sm">{{ item.goal }}</p>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { withBase } from "vitepress";

type Project = {
  status: string;
  stack: string;
  title: string;
  desc: string;
  goal: string;
};

const projects: Project[] = [
  {
    status: "已上线",
    stack: "VitePress",
    title: "个人博客主站",
    desc: "基础内容系统、路由结构和静态部署流程已经可用。",
    goal: "下一步：提升文章检索与标签聚合能力。",
  },
  {
    status: "迭代中",
    stack: "Vue + Tailwind",
    title: "页面视觉统一改造",
    desc: "对未优化页面补齐信息结构、卡片层级和移动端适配。",
    goal: "下一步：补充项目截图和发布日志。",
  },
  {
    status: "计划中",
    stack: "Automation",
    title: "内容发布自动化",
    desc: "希望把笔记同步、构建发布和变更摘要串成一条自动流水线。",
    goal: "下一步：接入 CI 并生成自动更新记录。",
  },
];

const toPath = (path: string) => withBase(path);
</script>

<style scoped>
.project-card {
  min-height: 210px;
}
</style>
