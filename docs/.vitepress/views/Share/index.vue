<template>
  <section class="xb-page share-shell">
    <header class="xb-hero">
      <p class="xb-eyebrow">Resource Hub</p>
      <h1>分享与资源导航</h1>
      <p class="xb-muted">
        把常用的 AI 工具、设计站点、开发社区和效率工具整合在同一页。
        你可以先从常用入口开始，再按分类探索更多资源。
      </p>
      <div class="xb-chip-row">
        <a v-for="item in quickLinks" :key="item.text" class="xb-chip" :href="toPath(item.link)">
          {{ item.text }}
        </a>
      </div>
    </header>

    <Navlink />
  </section>
</template>

<script lang="ts" setup>
import { withBase } from "vitepress";
import Navlink from "../Components/Navlink.vue";

const quickLinks = [
  { text: "博客建站", link: "/share/blogbuild/choose" },
  { text: "效率工具", link: "/share/tool/tool" },
  { text: "AI 推荐", link: "/share/AI/ai" },
  { text: "山大资料", link: "/share/sdu" },
];

const toPath = (path: string) => withBase(encodeURI(path));
</script>

<style scoped>
.share-shell {
  margin-bottom: 4rem;
}
</style>
