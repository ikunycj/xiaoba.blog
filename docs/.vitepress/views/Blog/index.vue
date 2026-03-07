<template>
  <section class="xb-page blog-shell">
    <header id="blog-intro" class="xb-hero">
      <p class="xb-eyebrow">Blog Hub</p>
      <h1>小八的博客</h1>
      <p class="xb-muted">
        这里持续记录技术学习与项目实践。顶部是我的个人博客卡牌，下面按最近更新时间展示文章卡片，方便快速浏览最新内容。
      </p>
      <div class="xb-chip-row">
        <span class="xb-chip">最近更新 {{ recentPosts.length }} 篇</span>
        <span class="xb-chip">专题目录 {{ catalogs.length }} 个</span>
        <a class="xb-chip" :href="toPath('/note/index')">进入笔记总览</a>
      </div>
    </header>

    <section class="blog-intro-cards">
      <article v-for="card in introCards" :key="card.title" class="xb-card">
        <p class="xb-eyebrow">{{ card.emoji }} {{ card.title }}</p>
        <h3 class="mt-2 text-lg">{{ card.headline }}</h3>
        <p class="mt-2 text-sm xb-muted">{{ card.desc }}</p>
        <a class="mt-3 inline-block text-sm font-semibold" :href="toPath(card.link)">查看详情</a>
      </article>
    </section>

    <div class="blog-layout">
      <aside class="blog-sidebar">
        <div class="xb-card blog-dir-card">
          <p class="xb-eyebrow">博客目录</p>
          <a class="blog-dir-link" href="#recent-posts">
            <span>最近更新</span>
          </a>
          <a class="blog-dir-link" href="#blog-intro">
            <span>博客简介</span>
          </a>
          <a v-for="item in catalogs" :key="item.name" class="blog-dir-link" :href="toPath(item.link)">
            <span>{{ item.name }}</span>
            <span class="xb-muted">{{ item.count }}</span>
          </a>
        </div>
      </aside>

      <main id="recent-posts" class="blog-main">
        <header class="blog-main-header">
          <p class="xb-eyebrow">Recent Updates</p>
          <h2>最近更新文章</h2>
        </header>

        <div v-if="recentPosts.length === 0" class="xb-card">
          <p class="xb-muted">当前还没有可展示的最近更新文章。</p>
        </div>

        <div v-else class="blog-post-stack">
          <article v-for="post in recentPosts" :key="post.url" class="xb-card post-card">
            <div class="post-meta">
              <span class="xb-tag">{{ post.section }}</span>
              <span class="xb-muted">更新于 {{ post.updatedText }}</span>
            </div>
            <h3 class="mt-2 text-lg">{{ post.title }}</h3>
            <p class="mt-2 text-sm xb-muted">{{ post.summary }}</p>
            <a class="post-link" :href="toPath(post.url)">阅读全文</a>
          </article>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "vitepress";
import { data as posts } from "../../data/blogRecent.data";

type IntroCard = {
  emoji: string;
  title: string;
  headline: string;
  desc: string;
  link: string;
};

type RecentPost = {
  title: string;
  summary: string;
  section: string;
  url: string;
  updatedText: string;
};

type Catalog = {
  name: string;
  count: number;
  link: string;
};

const introCards: IntroCard[] = [
  {
    emoji: "🧭",
    title: "博客定位",
    headline: "记录可复用的技术经验",
    desc: "重点沉淀前端、工程化和项目实践过程中的可落地方法。",
    link: "/blog/index",
  },
  {
    emoji: "📅",
    title: "更新节奏",
    headline: "围绕真实项目持续更新",
    desc: "每次迭代都同步整理关键思路，保证内容长期可维护。",
    link: "/projects",
  },
  {
    emoji: "🔍",
    title: "阅读建议",
    headline: "先看最近更新，再按专题深入",
    desc: "左侧目录可快速跳转到高频专题，适合日常检索和复盘。",
    link: "/note/index",
  },
];

const recentPosts = computed<RecentPost[]>(() => (posts as RecentPost[]).slice(0, 18));

const catalogs = computed<Catalog[]>(() => {
  const map = new Map<string, Catalog>();

  recentPosts.value.forEach((post) => {
    const current = map.get(post.section);
    if (current) {
      current.count += 1;
      return;
    }
    map.set(post.section, {
      name: post.section,
      count: 1,
      link: post.url,
    });
  });

  return Array.from(map.values()).sort((a, b) => b.count - a.count);
});

const toPath = (path: string): string => withBase(encodeURI(path));
</script>

<style scoped>
.blog-intro-cards {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.85rem;
}

.blog-layout {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

.blog-sidebar {
  position: sticky;
  top: calc(var(--vp-nav-height) + 24px);
}

.blog-dir-card {
  padding: 0.9rem;
}

.blog-dir-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.55rem;
  padding: 0.5rem 0.65rem;
  border-radius: 10px;
  border: 1px solid var(--xb-border);
  background: color-mix(in srgb, var(--xb-surface-soft) 75%, transparent 25%);
  font-size: 0.88rem;
  transition: background 0.2s ease, transform 0.2s ease;
}

.blog-dir-link:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--xb-accent-soft) 45%, transparent 55%);
}

.blog-main {
  min-width: 0;
}

.blog-main-header h2 {
  margin-top: 0.45rem;
  font-size: clamp(1.3rem, 3.2vw, 1.9rem);
}

.blog-post-stack {
  margin-top: 0.8rem;
  display: grid;
  gap: 0.85rem;
}

.post-card {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-link {
  margin-top: 0.35rem;
  width: fit-content;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 960px) {
  .blog-layout {
    grid-template-columns: 1fr;
  }

  .blog-sidebar {
    position: static;
  }
}
</style>
