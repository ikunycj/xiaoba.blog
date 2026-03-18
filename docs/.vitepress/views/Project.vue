<template>
  <section class="xb-page projects-page">
    <header class="xb-hero projects-hero">
      <p class="xb-eyebrow">Pinned Repositories</p>

      <div class="xb-chip-row">
        <a class="xb-chip" :href="profileUrl" target="_blank" rel="noopener noreferrer">GitHub 主页</a>
        <a class="xb-chip" :href="toPath('/home')">博客首页</a>
        <a class="xb-chip" :href="toPath('/blog/index')">博客文章</a>
        <span class="xb-chip">快照：{{ snapshotDate }}</span>
        <span class="xb-chip">Fork 合计：{{ totalForks }}</span>
      </div>

      <div class="xb-kpi-grid">
        <div class="xb-kpi">
          <strong>{{ projects.length }}</strong>
          <span>置顶仓库</span>
        </div>
        <div class="xb-kpi">
          <strong>{{ totalStars }}</strong>
          <span>累计 Stars</span>
        </div>
        <div class="xb-kpi">
          <strong>{{ latestUpdatedText }}</strong>
          <span>最近更新</span>
        </div>
      </div>
    </header>

    <div class="projects-grid">
      <article
        v-for="item in projects"
        :key="item.name"
        class="xb-card project-card"
        :style="{ '--project-accent': item.accent }"
      >
        <div class="project-card__meta">
          <span class="xb-tag">{{ item.badge }}</span>
          <span class="xb-tag">{{ item.stack }}</span>
          <span class="xb-tag">Stars {{ item.stars }}</span>
        </div>

        <h2>
          <a class="project-card__name" :href="item.repoUrl" target="_blank" rel="noopener noreferrer">
            {{ item.name }}
          </a>
        </h2>

        <p class="project-card__description xb-muted">{{ item.description }}</p>
        <p class="project-card__highlight">{{ item.highlight }}</p>

        <div class="project-card__stats">
          <div>
            <strong>{{ item.stars }}</strong>
            <span>Stars</span>
          </div>
          <div>
            <strong>{{ item.forks }}</strong>
            <span>Forks</span>
          </div>
          <div>
            <strong>{{ formatDate(item.updatedAt) }}</strong>
            <span>更新日期</span>
          </div>
        </div>

        <div class="xb-chip-row project-card__links">
          <a class="xb-chip" :href="item.repoUrl" target="_blank" rel="noopener noreferrer">查看仓库</a>
          <a
            v-if="item.homepage"
            class="xb-chip"
            :href="item.homepage"
            target="_blank"
            rel="noopener noreferrer"
          >
            在线访问
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

type Project = {
  name: string
  badge: string
  stack: string
  description: string
  highlight: string
  repoUrl: string
  homepage?: string
  stars: number
  forks: number
  updatedAt: string
  accent: string
}

const profileUrl = 'https://github.com/ikunycj'
const snapshotDate = '2026-03-17'

const projects: Project[] = [
  {
    name: 'xiaoba.blog',
    badge: '主站',
    stack: 'JavaScript',
    description: '小八博客项目 https://xiaoba.blog',
    highlight: '当前博客、笔记、分享和项目页都落在这个仓库里，这次项目页改造本身也是它的一部分。',
    repoUrl: 'https://github.com/ikunycj/xiaoba.blog',
    homepage: 'https://xiaoba.blog',
    stars: 2,
    forks: 0,
    updatedAt: '2026-03-17T06:41:40Z',
    accent: '#0f766e',
  },
  {
    name: 'auto-commit',
    badge: '工具',
    stack: 'Automation',
    description: '每日自动 commit，纯制造主页视觉活跃度的小工具实验。',
    highlight: '典型的个人自动化项目，用最轻量的方式把重复动作包装成可见成果，也很适合放进项目页展示风格。',
    repoUrl: 'https://github.com/ikunycj/auto-commit',
    stars: 21,
    forks: 21,
    updatedAt: '2026-03-17T02:06:36Z',
    accent: '#b45309',
  },
  {
    name: 'closeai-chatgpt',
    badge: '停更',
    stack: 'HTML',
    description: 'ChatGPT 镜像（2024 版，当前已停更，仅供借鉴）。',
    highlight: '这是一个有明确阶段性的 AI Web 尝试，适合在项目页中保留为能力轨迹和方案存档。',
    repoUrl: 'https://github.com/ikunycj/closeai-chatgpt',
    stars: 2,
    forks: 0,
    updatedAt: '2026-03-12T14:40:34Z',
    accent: '#c2410c',
  },
  {
    name: 'docscode',
    badge: '方法论',
    stack: 'Markdown',
    description: '文档驱动开发、测试驱动开发，Markdown 是 Vibe Coding 时代的源代码。',
    highlight: '它和博客内容流很契合，强调先写清楚再落代码，把文档从说明书提升到真正的研发入口。',
    repoUrl: 'https://github.com/ikunycj/docscode',
    stars: 1,
    forks: 0,
    updatedAt: '2026-03-14T14:32:41Z',
    accent: '#334155',
  },
]

const totalStars = computed(() => {
  return projects.reduce((sum, item) => sum + item.stars, 0)
})

const totalForks = computed(() => {
  return projects.reduce((sum, item) => sum + item.forks, 0)
})

const latestUpdatedText = computed(() => {
  const latestTimestamp = Math.max(...projects.map((item) => Date.parse(item.updatedAt)))
  return formatDate(latestTimestamp)
})

function formatDate(value: string | number): string {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return '未知'

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

function toPath(path: string): string {
  return withBase(encodeURI(path))
}
</script>

<style scoped>
.projects-page {
  margin-bottom: 4rem;
}

.projects-hero p {
  max-width: 52rem;
}

.projects-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.9rem;
}

.project-card {
  position: relative;
  overflow: hidden;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 3px solid var(--project-accent);
  background:
    radial-gradient(circle at top right, color-mix(in srgb, var(--project-accent) 16%, transparent 84%), transparent 38%),
    color-mix(in srgb, var(--xb-surface) 94%, var(--xb-surface-soft) 6%);
}

.project-card::after {
  content: '';
  position: absolute;
  inset: auto -42px -48px auto;
  width: 126px;
  height: 126px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--project-accent) 18%, transparent 82%), transparent 70%);
  pointer-events: none;
}

.project-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.project-card h2 {
  margin-top: 0.7rem;
  font-size: 1.16rem;
}

.project-card__name {
  color: var(--xb-ink);
  text-decoration: none;
}

.project-card__name:hover {
  color: var(--project-accent);
}

.project-card__description {
  margin-top: 0.45rem;
  font-size: 0.92rem;
  line-height: 1.65;
}

.project-card__highlight {
  margin-top: 0.8rem;
  border: 1px dashed color-mix(in srgb, var(--project-accent) 28%, var(--xb-border) 72%);
  border-radius: 14px;
  padding: 0.75rem 0.85rem;
  font-size: 0.88rem;
  line-height: 1.65;
  background: color-mix(in srgb, var(--project-accent) 8%, transparent 92%);
}

.project-card__stats {
  margin-top: 0.85rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
}

.project-card__stats div {
  border-radius: 12px;
  border: 1px solid var(--xb-border);
  padding: 0.55rem;
  background: color-mix(in srgb, var(--xb-surface-soft) 72%, transparent 28%);
}

.project-card__stats strong {
  display: block;
  font-size: 0.92rem;
}

.project-card__stats span {
  font-size: 0.75rem;
  color: var(--xb-muted);
}

.project-card__links {
  margin-top: auto;
  padding-top: 0.85rem;
}

.project-card__links .xb-chip {
  font-size: 0.76rem;
  padding: 0.36rem 0.62rem;
}

@media (max-width: 640px) {
  .project-card__stats {
    grid-template-columns: 1fr;
  }
}
</style>
