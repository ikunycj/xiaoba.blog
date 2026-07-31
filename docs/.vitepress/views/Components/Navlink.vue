<template>
  <section class="resource-directory" aria-label="常用资源目录">
    <section v-for="(group, groupIndex) in datas" :key="group.title" class="resource-section">
      <header class="resource-section__head">
        <div>
          <p class="resource-section__index">{{ String(groupIndex + 1).padStart(2, '0') }}</p>
          <h2>{{ group.title }}</h2>
          <p class="resource-section__desc">{{ group.desc }}</p>
        </div>
        <span class="resource-section__count">{{ group.items.length }} 个入口</span>
      </header>

      <ul class="resource-list">
        <li v-for="item in group.items" :key="`${group.title}-${item.title}-${item.link}`" class="resource-list__item">
          <a
            :href="item.link"
            :title="item.title"
            target="_blank"
            rel="external nofollow noopener"
            class="resource-link"
          >
            <span class="resource-link__icon" aria-hidden="true">
              <img :src="item.icon" alt="" loading="lazy" decoding="async" @error="handleImgError" />
            </span>
            <span class="resource-link__copy">
              <strong>{{ item.title }}</strong>
              <small>{{ item.desc || '实用站点，点击查看详情。' }}</small>
            </span>
            <Icon class="resource-link__arrow" icon="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { NAV_DATA } from '../../data/nav'

type NavItem = {
  icon: string
  title: string
  desc?: string
  link: string
}

type NavGroup = {
  title: string
  desc: string
  items: NavItem[]
}

const datas = NAV_DATA as NavGroup[]
const fallbackIcon = '/xiaoba-logo.png'

function handleImgError(event: Event): void {
  const target = event.target as HTMLImageElement | null
  if (!target || target.dataset.fallbackApplied === 'true') return

  target.dataset.fallbackApplied = 'true'
  target.src = fallbackIcon
}
</script>

<style scoped>
.resource-directory {
  --resource-blue: var(--xb-blue, #2b78a6);
  --resource-blue-deep: var(--xb-blue-deep, #174a70);
  --resource-paper: var(--xb-paper, #ffffff);
  --resource-page: var(--xb-page, #f7fbfe);
  --resource-ink: var(--xb-ink, #1d2b36);
  --resource-muted: var(--xb-muted, #5f7180);
  --resource-border: var(--xb-border, #cfe2ee);
  --resource-soft: var(--xb-blue-soft, #e6f4fb);
  margin-top: 2rem;
}

.resource-section {
  padding: 1.5rem 0 1.8rem;
  border-top: 1px solid var(--resource-border);
}

.resource-section:last-child {
  border-bottom: 1px solid var(--resource-border);
}

.resource-section__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.25rem;
}

.resource-section__index {
  margin: 0 0 0.35rem;
  color: var(--resource-blue);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  letter-spacing: 0;
}

.resource-section h2 {
  margin: 0;
  color: var(--resource-blue-deep);
  font-size: 24px;
  line-height: 1.3;
}

.resource-section__desc {
  max-width: 64ch;
  margin: 0.42rem 0 0;
  color: var(--resource-muted);
  font-size: 0.875rem;
  line-height: 1.6;
}

.resource-section__count {
  flex: 0 0 auto;
  border: 1px solid var(--resource-border);
  border-radius: 999px;
  padding: 0.28rem 0.55rem;
  color: var(--resource-muted);
  font-size: 0.875rem;
  white-space: nowrap;
}

.resource-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 0.75rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.resource-list__item {
  min-width: 0;
}

.resource-link {
  display: flex;
  min-height: 64px;
  align-items: center;
  gap: 0.7rem;
  border: 1px solid var(--resource-border);
  border-radius: 6px;
  padding: 0.62rem 0.7rem;
  color: var(--resource-ink);
  background: var(--resource-paper);
  text-decoration: none;
  transition: border-color 160ms ease, background-color 160ms ease;
}

.resource-link:hover,
.resource-link:focus-visible {
  border-color: var(--resource-blue);
  background: var(--resource-soft);
}

.resource-link__icon {
  display: inline-flex;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--resource-border);
  border-radius: 6px;
  background: var(--resource-page);
}

.resource-link__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.resource-link__copy {
  display: grid;
  min-width: 0;
  gap: 0.2rem;
}

.resource-link__copy strong {
  overflow: hidden;
  color: var(--resource-blue-deep);
  font-size: 0.875rem;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.resource-link__copy small {
  display: -webkit-box;
  overflow: hidden;
  color: var(--resource-muted);
  font-size: 0.875rem;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.resource-link__arrow {
  width: 0.95rem;
  height: 0.95rem;
  flex: 0 0 auto;
  margin-left: auto;
  color: var(--resource-muted);
}

@media (max-width: 720px) {
  .resource-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 460px) {
  .resource-section__head {
    display: block;
  }

  .resource-section__count {
    display: inline-block;
    margin-top: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .resource-link {
    transition: none;
  }
}
</style>
