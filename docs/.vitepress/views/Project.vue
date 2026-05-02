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
const snapshotDate = '2026-05-02'

const projects: Project[] = [
  {
    name: 'xiaoba.blog',
    badge: '主站',
    stack: 'VitePress',
    description: '小八博客 - 技术学习与实践分享，AI、全栈开发、工程化笔记',
    highlight: '基于 VitePress 构建的现代化博客系统，集成了技术博客、学习笔记和项目展示。采用响应式设计，优化了 Vercel 部署性能。',
    repoUrl: 'https://github.com/ikunycj/xiaoba.blog',
    homepage: 'https://xioaba.blog',
    stars: 2,
    forks: 0,
    updatedAt: '2026-05-02T01:21:30Z',
    accent: '#0ea5e9',
  },
  {
    name: 'actionAgent',
    badge: '研发中',
    stack: 'TypeScript',
    description: '面向自动化任务执行的 Agent 项目',
    highlight: '专注工作流编排、工具调用与可观测性建设。探索 AI Agent 在自动化场景中的应用，构建可扩展的智能体架构。',
    repoUrl: 'https://github.com/ikunycj/actionAgent',
    stars: 1,
    forks: 0,
    updatedAt: '2026-04-15T10:30:00Z',
    accent: '#22d3ee',
  },
  {
    name: 'auto-commit',
    badge: '工具',
    stack: 'Automation',
    description: '每日自动 commit，纯制造主页视觉活跃度的小工具实验',
    highlight: '典型的个人自动化项目，用最轻量的方式把重复动作包装成可见成果，适合作为 GitHub Actions 学习案例。',
    repoUrl: 'https://github.com/ikunycj/auto-commit',
    stars: 21,
    forks: 21,
    updatedAt: '2026-03-17T02:06:36Z',
    accent: '#06b6d4',
  },
  {
    name: 'docscode',
    badge: '方法论',
    stack: 'Markdown',
    description: '文档驱动开发、测试驱动开发，Markdown 是 Vibe Coding 时代的源代码',
    highlight: '强调先写清楚再落代码，把文档从说明书提升到真正的研发入口。探索以文档为中心的开发模式。',
    repoUrl: 'https://github.com/ikunycj/docscode',
    stars: 1,
    forks: 0,
    updatedAt: '2026-03-14T14:32:41Z',
    accent: '#0891b2',
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
