<template>
  <section class="share-page">
    <header class="share-intro">
      <p class="share-kicker">
        <Icon icon="lucide:tool-case" aria-hidden="true" />
        资源
      </p>
      <h1>工具箱</h1>
      <p class="share-lead">常用的 AI、社区、设计与开发入口。</p>

      <nav class="share-quick-links" aria-label="资源分类快捷入口">
        <a v-for="item in quickLinks" :key="item.text" class="share-quick-link" :href="toPath(item.link)">
          <Icon :icon="item.icon" aria-hidden="true" />
          <span>{{ item.text }}</span>
          <Icon class="share-quick-link__arrow" icon="lucide:arrow-right" aria-hidden="true" />
        </a>
      </nav>
    </header>

    <div class="share-context">
      <span class="share-context__mark" aria-hidden="true"></span>
      <p>链接可能随时间变化。</p>
    </div>

    <Navlink />
  </section>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { withBase } from 'vitepress'
import Navlink from '../Components/Navlink.vue'

const quickLinks = [
  { text: '博客建站', link: '/share/blogbuild/choose', icon: 'lucide:layout-template' },
  { text: '效率工具', link: '/share/tool/tool', icon: 'lucide:wrench' },
  { text: 'AI 推荐', link: '/share/AI/ai', icon: 'lucide:sparkles' },
  { text: '山大资料', link: '/share/sdu', icon: 'lucide:graduation-cap' },
]

function toPath(path: string): string {
  return withBase(encodeURI(path))
}
</script>

<style scoped>
.share-page {
  --share-blue: var(--xb-blue, #2b78a6);
  --share-blue-deep: var(--xb-blue-deep, #174a70);
  --share-blush: var(--xb-blush, #f59caf);
  --share-yellow: var(--xb-yellow, #f2c94c);
  --share-paper: var(--xb-paper, #ffffff);
  --share-page: var(--xb-page, #f7fbfe);
  --share-ink: var(--xb-ink, #1d2b36);
  --share-muted: var(--xb-muted, #5f7180);
  --share-border: var(--xb-border, #cfe2ee);
  --share-soft: var(--xb-blue-soft, #e6f4fb);
  --share-blush-soft: color-mix(in srgb, var(--share-blush) 17%, var(--share-paper) 83%);
  --share-yellow-soft: color-mix(in srgb, var(--share-yellow) 23%, var(--share-paper) 77%);
  max-width: 1120px;
  margin: 0 auto 4.5rem;
  padding: 40px 32px 0;
  color: var(--share-ink);
}

.share-intro {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--share-border);
}

.share-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  margin: 0 0 0.9rem;
  color: var(--share-blue-deep);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0;
}

.share-kicker :deep(svg) {
  width: 1rem;
  height: 1rem;
  color: var(--share-blush);
}

.share-intro h1 {
  margin: 0;
  color: var(--share-blue-deep);
  font-size: 36px;
  line-height: 1.14;
  letter-spacing: 0;
}

.share-lead {
  max-width: 58ch;
  margin: 1rem 0 0;
  color: var(--share-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.share-quick-links {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.6rem;
  margin-top: 1.35rem;
}

.share-quick-link {
  display: flex;
  min-height: 52px;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--share-blue) 38%, var(--share-border) 62%);
  border-radius: 6px;
  padding: 0.65rem 0.72rem;
  color: var(--share-blue-deep);
  background: var(--share-paper);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  transition: border-color 160ms ease, background-color 160ms ease;
}

.share-quick-link:hover,
.share-quick-link:focus-visible {
  border-color: var(--share-blue);
  background: var(--share-soft);
}

.share-quick-link:nth-child(2) {
  border-color: color-mix(in srgb, var(--share-blush) 54%, var(--share-border) 46%);
}

.share-quick-link:nth-child(3) {
  border-color: color-mix(in srgb, var(--share-yellow) 66%, var(--share-border) 34%);
}

.share-quick-link:nth-child(2):hover,
.share-quick-link:nth-child(2):focus-visible {
  border-color: var(--share-blush);
  background: var(--share-blush-soft);
}

.share-quick-link:nth-child(3):hover,
.share-quick-link:nth-child(3):focus-visible {
  border-color: var(--share-yellow);
  background: var(--share-yellow-soft);
}

.share-quick-link:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--share-yellow) 72%, var(--share-blue) 28%);
  outline-offset: 3px;
}

.share-quick-link :deep(svg) {
  flex: 0 0 auto;
  width: 1.05rem;
  height: 1.05rem;
  color: var(--share-blue);
}

.share-quick-link:nth-child(2) > :deep(svg:first-child) {
  color: var(--share-blush);
}

.share-quick-link:nth-child(3) > :deep(svg:first-child) {
  color: var(--share-yellow);
}

.share-quick-link__arrow {
  width: 0.85rem !important;
  height: 0.85rem !important;
  margin-left: auto;
  color: var(--share-muted) !important;
}

.share-context {
  display: flex;
  gap: 0.55rem;
  align-items: flex-start;
  margin: 1.15rem 0 0;
  color: var(--share-muted);
  font-size: 0.875rem;
  line-height: 1.6;
}

.share-context p {
  max-width: 72ch;
  margin: 0;
}

.share-context__mark {
  flex: 0 0 auto;
  width: 0.55rem;
  height: 0.55rem;
  margin-top: 0.38rem;
  border-radius: 50%;
  background: var(--share-blush);
  box-shadow: 0 0 0 4px var(--share-blush-soft);
}

@media (max-width: 760px) {
  .share-page {
    padding: 32px 20px 0;
  }

  .share-intro h1 {
    font-size: 30px;
  }

  .share-quick-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 460px) {
  .share-page {
    padding-inline: 14px;
  }

  .share-quick-links {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .share-quick-link {
    transition: none;
  }
}
</style>
