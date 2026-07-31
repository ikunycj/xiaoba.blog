<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <main class="xiaoba-not-found" aria-labelledby="not-found-title">
    <div class="xiaoba-not-found__copy">
      <p class="xiaoba-not-found__code">404 / NOT FOUND</p>
      <h1 id="not-found-title">这张纸条不在抽屉里。</h1>
      <p class="xiaoba-not-found__lead">
        链接可能已移动，或地址有误。
      </p>
      <nav aria-label="404 页面导航">
        <a class="xiaoba-not-found__primary" href="/">
          <Icon icon="lucide:house" aria-hidden="true" />
          <span>返回首页</span>
        </a>
        <a href="/note/">
          <Icon icon="lucide:book-open" aria-hidden="true" />
          <span>打开笔记</span>
        </a>
      </nav>
    </div>

    <figure>
      <img src="/xiaoba/xiaoba-sparkle.jpg" alt="正在寻找页面" />
      <figcaption>换一条路试试。</figcaption>
    </figure>
  </main>
</template>

<style scoped>
.xiaoba-not-found {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 56px;
  align-items: center;
  width: min(960px, calc(100% - 32px));
  min-height: calc(100svh - 160px);
  margin: 0 auto;
  padding: 48px 0;
  color: var(--xb-ink, #1d2b36);
}

.xiaoba-not-found__code {
  margin: 0;
  color: var(--xb-blue-deep, #174a70);
  font-size: 14px;
  font-weight: 750;
}

.xiaoba-not-found h1 {
  max-width: 12ch;
  margin: 12px 0 0;
  color: var(--xb-ink, #1d2b36);
  font-size: 36px;
  line-height: 1.2;
  text-wrap: balance;
}

.xiaoba-not-found__lead {
  max-width: 48ch;
  margin: 16px 0 0;
  color: var(--xb-muted, #5f7180);
  font-size: 16px;
  line-height: 1.75;
}

.xiaoba-not-found nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.xiaoba-not-found nav a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--xb-border, #cfe2ee);
  border-radius: 8px;
  color: var(--xb-blue-deep, #174a70);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.xiaoba-not-found nav a:hover,
.xiaoba-not-found nav a:focus-visible {
  border-color: var(--xb-blue, #2b78a6);
  background: var(--xb-blue-soft, #e6f4fb);
}

.xiaoba-not-found nav a:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--xb-blue, #2b78a6) 24%, transparent);
  outline-offset: 2px;
}

.xiaoba-not-found nav .xiaoba-not-found__primary {
  border-color: var(--xb-blue, #2b78a6);
  background: var(--xb-blue, #2b78a6);
  color: #fff;
}

.xiaoba-not-found nav .xiaoba-not-found__primary:hover,
.xiaoba-not-found nav .xiaoba-not-found__primary:focus-visible {
  border-color: var(--xb-blue-deep, #174a70);
  background: var(--xb-blue-deep, #174a70);
}

.xiaoba-not-found figure {
  margin: 0;
}

.xiaoba-not-found img {
  display: block;
  width: 100%;
  border: 1px solid var(--xb-border, #cfe2ee);
  border-radius: 8px;
}

.xiaoba-not-found figcaption {
  margin-top: 8px;
  color: var(--xb-muted, #5f7180);
  font-size: 14px;
}

@media (max-width: 700px) {
  .xiaoba-not-found {
    grid-template-columns: 1fr;
    gap: 32px;
    min-height: 0;
    padding: 56px 0 72px;
  }

  .xiaoba-not-found h1 {
    font-size: 28px;
  }

  .xiaoba-not-found figure {
    max-width: 280px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .xiaoba-not-found nav a {
    transition: none;
  }
}
</style>
