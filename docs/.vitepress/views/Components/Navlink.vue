<template>
  <section class="share-nav-grid">
    <article v-for="group in datas" :key="group.title" class="group-card">
      <header class="group-head">
        <h2>{{ group.title }}</h2>
        <p>{{ group.desc }}</p>
      </header>

      <div class="link-grid">
        <a
          v-for="item in group.items"
          :key="`${group.title}-${item.title}`"
          :href="item.link"
          :title="item.title"
          target="_blank"
          rel="external nofollow noopener"
          class="link-card"
        >
          <img :src="item.icon" :alt="item.title" loading="lazy" @error="handleImgError" />
          <div class="link-copy">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc || "实用站点，点击查看详情。" }}</p>
          </div>
        </a>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { NAV_DATA } from "../../data/nav";

type NavItem = {
  icon: string;
  title: string;
  desc?: string;
  link: string;
};

type NavGroup = {
  title: string;
  desc: string;
  items: NavItem[];
};

const datas = NAV_DATA as NavGroup[];
const fallbackIcon = "https://bu.dusays.com/2023/03/03/6401a7902b8de.png";

const handleImgError = (event: Event) => {
  const target = event.target as HTMLImageElement | null;
  if (target) target.src = fallbackIcon;
};
</script>

<style scoped>
.share-nav-grid {
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
}

.group-card {
  border: 1px solid var(--xb-border);
  border-radius: 18px;
  padding: 1rem;
  background: color-mix(in srgb, var(--xb-surface) 94%, var(--xb-surface-soft) 6%);
  box-shadow: var(--xb-shadow);
}

.group-head {
  margin-bottom: 0.85rem;
}

.group-head h2 {
  margin: 0;
  font-size: 1.12rem;
  font-family: var(--xb-display-font);
}

.group-head p {
  margin: 0.3rem 0 0;
  color: var(--xb-muted);
  font-size: 0.92rem;
}

.link-grid {
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.link-card {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  border-radius: 14px;
  border: 1px solid var(--xb-border);
  padding: 0.72rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.link-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--xb-accent) 45%, var(--xb-border) 55%);
}

.link-card img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}

.link-copy {
  min-width: 0;
}

.link-copy h3 {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.35;
}

.link-copy p {
  margin: 0.3rem 0 0;
  color: var(--xb-muted);
  font-size: 0.84rem;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .group-card {
    border-radius: 14px;
    padding: 0.8rem;
  }

  .link-grid {
    grid-template-columns: 1fr;
  }
}
</style>
