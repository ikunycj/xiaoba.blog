<template>
  <section class="xb-page">
    <header class="xb-hero">
      <p class="xb-eyebrow">Knowledge Base</p>
      <h1>小八的笔记仓库</h1>
      <p class="xb-muted">
        这里集中整理前端、算法、面经与日常学习笔记。你可以从主题入口直接跳转到对应模块，快速开始阅读。
      </p>
      <div class="xb-chip-row">
        <a class="xb-chip" :href="toPath('/note/前端/JS/继承与原型链')">前端基础</a>
        <a class="xb-chip" :href="toPath('/note/计算机基础/数据结构与算法/相关资料')">算法资料</a>
        <a class="xb-chip" :href="toPath('/note/面经/前端面经/React/React简单')">面试整理</a>
      </div>
      <div class="xb-kpi-grid">
        <div class="xb-kpi">
          <strong>5 大主题</strong>
          <span class="xb-muted">前端 / 工具 / 科目一 / 算法 / 面经</span>
        </div>
        <div class="xb-kpi">
          <strong>持续更新</strong>
          <span class="xb-muted">按学习与项目实践同步补充</span>
        </div>
        <div class="xb-kpi">
          <strong>支持共建</strong>
          <span class="xb-muted">文章底部可直接编辑并提交</span>
        </div>
      </div>
    </header>

    <div class="xb-grid">
      <a v-for="item in sections" :key="item.title" class="xb-card" :href="toPath(item.link)">
        <p class="xb-eyebrow">{{ item.emoji }} {{ item.title }}</p>
        <p class="mt-2 text-sm xb-muted">{{ item.desc }}</p>
        <p class="mt-3 text-sm font-semibold">进入专题</p>
      </a>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { withBase } from "vitepress";

type Section = {
  title: string;
  emoji: string;
  desc: string;
  link: string;
};

const sections: Section[] = [
  {
    title: "前端",
    emoji: "⚡",
    desc: "JavaScript 基础与实战知识点，适合快速复盘与查漏补缺。",
    link: "/note/前端/JS/继承与原型链",
  },
  {
    title: "工具",
    emoji: "🛠️",
    desc: "围绕 Git 等高频工具整理操作技巧，覆盖常见工作流。",
    link: "/note/工具/Git/Git速查",
  },
  {
    title: "计算机基础",
    emoji: "🧠",
    desc: "以数据结构与算法为主线，按专题沉淀系统化内容。",
    link: "/note/计算机基础/数据结构与算法/相关资料",
  },
  {
    title: "面经",
    emoji: "🎯",
    desc: "前端高频面试题和思路整理，兼顾八股与实战表达。",
    link: "/note/面经/前端面经/JS/1.js八股(基础)",
  },
  {
    title: "科目一",
    emoji: "🚗",
    desc: "驾驶理论笔记和易错点整理，适合刷题前快速预览。",
    link: "/note/科目一/drive-course1",
  },
];

const toPath = (path: string) => withBase(encodeURI(path));
</script>
