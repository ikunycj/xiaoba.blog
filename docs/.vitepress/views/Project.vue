<template>
  <section class="project-page">
    <header class="project-intro">
      <div class="project-intro__copy">
        <p class="project-kicker">
          <Icon icon="lucide:folder-kanban" aria-hidden="true" />
          项目记录
        </p>
        <h1>项目</h1>
        <p class="project-lead">正在维护、实验和迭代中的项目。</p>

        <nav class="project-actions" aria-label="项目页快捷入口">
          <a class="project-action project-action--primary" :href="profileUrl" target="_blank" rel="noopener noreferrer">
            <Icon icon="lucide:github" aria-hidden="true" />
            GitHub 主页
            <Icon icon="lucide:arrow-up-right" aria-hidden="true" />
          </a>
          <a class="project-action" :href="toPath('/blog')">
            <Icon icon="lucide:book-open" aria-hidden="true" />
            读博客文章
          </a>
        </nav>
      </div>

      <aside class="project-snapshot" aria-label="项目数据快照">
        <p class="project-snapshot__label">数据快照 · {{ snapshotDate }}</p>
        <dl class="project-snapshot__list">
          <div>
            <dt>置顶仓库</dt>
            <dd>{{ projects.length }}</dd>
          </div>
          <div>
            <dt>累计 Stars</dt>
            <dd>{{ totalStars }}</dd>
          </div>
          <div>
            <dt>最近更新</dt>
            <dd>{{ latestUpdatedText }}</dd>
          </div>
        </dl>
      </aside>
    </header>

    <div class="project-list" aria-label="项目列表">
      <article
        v-for="(item, index) in projects"
        :key="item.name"
        class="project-item"
        :class="{ 'project-item--featured': index === 0 }"
      >
        <div class="project-item__rail" aria-hidden="true">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <Icon :icon="item.icon" />
        </div>

        <div class="project-item__content">
          <div class="project-item__heading">
            <div>
              <div class="project-labels">
                <span class="project-label project-label--status">{{ item.badge }}</span>
                <span class="project-label">{{ item.stack }}</span>
              </div>
              <h2>
                <a :href="item.repoUrl" target="_blank" rel="noopener noreferrer">{{ item.name }}</a>
              </h2>
            </div>

            <a
              class="project-open"
              :href="item.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`打开 ${item.name} 的 GitHub 仓库`"
              :title="`打开 ${item.name} 的 GitHub 仓库`"
            >
              <Icon icon="lucide:arrow-up-right" aria-hidden="true" />
            </a>
          </div>

          <p class="project-description">{{ item.description }}</p>
          <p class="project-note">
            <Icon icon="lucide:message-square-more" aria-hidden="true" />
            {{ item.highlight }}
          </p>

          <ul class="project-facts" aria-label="项目数据">
            <li>
              <Icon icon="lucide:star" aria-hidden="true" />
              <span>Stars</span>
              <strong>{{ item.stars }}</strong>
            </li>
            <li>
              <Icon icon="lucide:git-fork" aria-hidden="true" />
              <span>Forks</span>
              <strong>{{ item.forks }}</strong>
            </li>
            <li>
              <Icon icon="lucide:calendar-days" aria-hidden="true" />
              <span>最近更新</span>
              <strong>{{ formatDate(item.updatedAt) }}</strong>
            </li>
          </ul>

          <div class="project-item__links">
            <a class="project-text-link" :href="item.repoUrl" target="_blank" rel="noopener noreferrer">
              查看仓库
              <Icon icon="lucide:arrow-up-right" aria-hidden="true" />
            </a>
            <a
              v-if="item.homepage"
              class="project-text-link"
              :href="item.homepage"
              target="_blank"
              rel="noopener noreferrer"
            >
              在线访问
              <Icon icon="lucide:external-link" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </div>

    <p class="project-footnote">
      <Icon icon="lucide:info" aria-hidden="true" />
      统计来自仓库页面的手动快照；想看最新提交和 issue，请以 GitHub 为准。
    </p>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
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
  icon: string
}

const profileUrl = 'https://github.com/ikunycj'
const snapshotDate = '2026-05-02'

const projects: Project[] = [
  {
    name: 'xiaoba.blog',
    badge: '主站',
    stack: 'VitePress',
    description: '记录技术学习、实践和偶尔的生活观察。',
    highlight: '文章、笔记、项目和工具入口。',
    repoUrl: 'https://github.com/ikunycj/xiaoba.blog',
    homepage: 'https://xiaoba.blog',
    stars: 2,
    forks: 0,
    updatedAt: '2026-05-02T01:21:30Z',
    icon: 'lucide:book-open-check',
  },
  {
    name: 'actionAgent',
    badge: '研发中',
    stack: 'TypeScript',
    description: '面向自动化任务执行的 Agent 项目。',
    highlight: '探索工作流编排、工具调用与可观测性，先把智能体架构拆成可以逐步验证的小块。',
    repoUrl: 'https://github.com/ikunycj/actionAgent',
    stars: 1,
    forks: 0,
    updatedAt: '2026-04-15T10:30:00Z',
    icon: 'lucide:bot',
  },
  {
    name: 'auto-commit',
    badge: '工具实验',
    stack: 'Automation',
    description: '每日自动 commit 的轻量实验，用来熟悉 GitHub Actions。',
    highlight: '一个有点顽皮的自动化样本：把重复动作变成可观察、可复盘的流程。',
    repoUrl: 'https://github.com/ikunycj/auto-commit',
    stars: 21,
    forks: 21,
    updatedAt: '2026-03-17T02:06:36Z',
    icon: 'lucide:repeat-2',
  },
  {
    name: 'docscode',
    badge: '方法论',
    stack: 'Markdown',
    description: '关于文档驱动开发、测试驱动开发和 Vibe Coding 的实践记录。',
    highlight: '先把问题写清楚，再让代码跟上；把文档从说明书变成真正的研发入口。',
    repoUrl: 'https://github.com/ikunycj/docscode',
    stars: 1,
    forks: 0,
    updatedAt: '2026-03-14T14:32:41Z',
    icon: 'lucide:file-text',
  },
]

const totalStars = computed(() => projects.reduce((sum, item) => sum + item.stars, 0))
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
.project-page {
  --project-blue: var(--xb-blue, #2b78a6);
  --project-blue-deep: var(--xb-blue-deep, #174a70);
  --project-blush: var(--xb-blush, #f59caf);
  --project-yellow: var(--xb-yellow, #f2c94c);
  --project-paper: var(--xb-paper, #ffffff);
  --project-page: var(--xb-page, #f7fbfe);
  --project-ink: var(--xb-ink, #1d2b36);
  --project-muted: var(--xb-muted, #5f7180);
  --project-border: var(--xb-border, #cfe2ee);
  --project-soft: var(--xb-blue-soft, #e6f4fb);
  --project-blush-soft: color-mix(in srgb, var(--project-blush) 17%, var(--project-paper) 83%);
  --project-yellow-soft: color-mix(in srgb, var(--project-yellow) 23%, var(--project-paper) 77%);
  max-width: 1120px;
  margin: 0 auto 4.5rem;
  padding: 40px 32px 0;
  color: var(--project-ink);
}

.project-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(210px, 0.32fr);
  gap: 64px;
  align-items: end;
  padding: 0 0 2.25rem;
  border-bottom: 1px solid var(--project-border);
}

.project-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  margin: 0 0 0.9rem;
  color: var(--project-blue-deep);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0;
}

.project-kicker :deep(svg) {
  width: 1rem;
  height: 1rem;
  color: var(--project-blush);
}

.project-intro h1 {
  margin: 0;
  color: var(--project-blue-deep);
  font-size: 36px;
  line-height: 1.14;
  letter-spacing: 0;
}

.project-lead {
  max-width: 48rem;
  margin: 1rem 0 0;
  color: var(--project-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.35rem;
}

.project-action {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid var(--project-border);
  border-radius: 6px;
  padding: 0.62rem 0.78rem;
  color: var(--project-blue-deep);
  background: var(--project-paper);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  transition: border-color 160ms ease, background-color 160ms ease, color 160ms ease;
}

.project-action :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.project-action :deep(svg:last-child) {
  width: 0.85rem;
  height: 0.85rem;
}

.project-action:hover,
.project-action:focus-visible {
  border-color: var(--project-blue);
  background: var(--project-soft);
  color: var(--project-blue-deep);
}

.project-action--primary {
  border-color: var(--project-blue);
  color: #ffffff;
  background: var(--project-blue);
}

.project-action--primary:hover,
.project-action--primary:focus-visible {
  border-color: var(--project-blue-deep);
  color: #ffffff;
  background: var(--project-blue-deep);
}

.project-action:focus-visible,
.project-open:focus-visible,
.project-item h2 a:focus-visible,
.project-text-link:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--project-yellow) 72%, var(--project-blue) 28%);
  outline-offset: 3px;
}

.project-snapshot {
  border: 1px solid color-mix(in srgb, var(--project-blue) 36%, var(--project-border));
  border-radius: 8px;
  padding: 1rem 1.05rem;
  background: color-mix(in srgb, var(--project-soft) 76%, var(--project-blush-soft) 24%);
}

.project-snapshot__label {
  margin: 0;
  color: color-mix(in srgb, var(--project-blue-deep) 74%, var(--project-blush) 26%);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0;
}

.project-snapshot__list {
  display: grid;
  gap: 0.8rem;
  margin: 1rem 0 0;
}

.project-snapshot__list div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  border-bottom: 1px solid color-mix(in srgb, var(--project-blue) 18%, transparent);
  padding-bottom: 0.55rem;
}

.project-snapshot__list div:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.project-snapshot dt {
  color: var(--project-muted);
  font-size: 0.875rem;
}

.project-snapshot dd {
  margin: 0;
  color: var(--project-blue-deep);
  font-size: 1rem;
  font-weight: 800;
}

.project-list {
  border-top: 0;
}

.project-item {
  display: grid;
  grid-template-columns: 68px minmax(0, 1fr);
  gap: 1.25rem;
  padding: 1.65rem 0;
  border-bottom: 1px solid var(--project-border);
}

.project-item--featured {
  margin-top: 1.35rem;
  border: 1px solid color-mix(in srgb, var(--project-blue) 72%, var(--project-blush) 28%);
  border-radius: 8px;
  padding: 1.45rem 1.5rem;
  background: color-mix(in srgb, var(--project-paper) 90%, var(--project-soft) 10%);
  box-shadow: none;
}

.project-item__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  padding-top: 0.12rem;
  color: var(--project-blue);
}

.project-item:nth-child(3n) .project-item__rail {
  color: var(--project-blush);
}

.project-item:nth-child(4n) .project-item__rail {
  color: var(--project-yellow);
}

.project-item__rail span {
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  letter-spacing: 0;
}

.project-item__rail :deep(svg) {
  width: 1.4rem;
  height: 1.4rem;
  stroke-width: 1.65;
}

.project-item__content {
  min-width: 0;
}

.project-item__heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: start;
}

.project-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
}

.project-label {
  border: 1px solid color-mix(in srgb, var(--project-border) 76%, var(--project-blush) 24%);
  border-radius: 999px;
  padding: 0.2rem 0.5rem;
  color: var(--project-muted);
  font-size: 0.875rem;
  line-height: 1.2;
}

.project-label--status {
  border-color: color-mix(in srgb, var(--project-yellow) 58%, var(--project-border) 42%);
  color: var(--project-blue-deep);
  background: var(--project-yellow-soft);
  font-weight: 700;
}

.project-item h2 {
  margin: 0.65rem 0 0;
  color: var(--project-blue-deep);
  font-size: 24px;
  line-height: 1.3;
}

.project-item h2 a {
  color: inherit;
  text-decoration: none;
}

.project-item h2 a:hover,
.project-item h2 a:focus-visible {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.18em;
}

.project-open {
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--project-border);
  border-radius: 6px;
  color: var(--project-blue-deep);
  background: var(--project-page);
  transition: border-color 160ms ease, background-color 160ms ease;
}

.project-open :deep(svg) {
  width: 1.05rem;
  height: 1.05rem;
}

.project-open:hover,
.project-open:focus-visible {
  border-color: var(--project-blue);
  background: var(--project-soft);
}

.project-description {
  max-width: 66ch;
  margin: 0.65rem 0 0;
  color: var(--project-muted);
  line-height: 1.7;
}

.project-note {
  display: flex;
  gap: 0.48rem;
  align-items: flex-start;
  max-width: 76ch;
  margin: 0.9rem 0 0;
  color: var(--project-ink);
  font-size: 0.9rem;
  line-height: 1.65;
}

.project-note :deep(svg) {
  flex: 0 0 auto;
  width: 1rem;
  height: 1rem;
  margin-top: 0.2rem;
  color: var(--project-blue);
}

.project-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin: 1.15rem 0 0;
  padding: 0.85rem 0 0;
  border-top: 1px solid var(--project-border);
  list-style: none;
}

.project-facts li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--project-muted);
  font-size: 0.875rem;
}

.project-facts li :deep(svg) {
  width: 0.92rem;
  height: 0.92rem;
  color: var(--project-blue);
}

.project-facts li:nth-child(2) :deep(svg) {
  color: var(--project-blush);
}

.project-facts li:nth-child(3) :deep(svg) {
  color: var(--project-yellow);
}

.project-facts strong {
  color: var(--project-ink);
  font-weight: 700;
}

.project-item__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.project-text-link {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  gap: 0.35rem;
  color: var(--project-blue-deep);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
}

.project-text-link:hover,
.project-text-link:focus-visible {
  color: var(--project-blue);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.project-text-link :deep(svg) {
  width: 0.9rem;
  height: 0.9rem;
}

.project-footnote {
  display: flex;
  gap: 0.45rem;
  align-items: flex-start;
  margin: 1.25rem 0 0;
  color: var(--project-muted);
  font-size: 0.875rem;
  line-height: 1.6;
}

.project-footnote :deep(svg) {
  flex: 0 0 auto;
  width: 0.95rem;
  height: 0.95rem;
  margin-top: 0.15rem;
  color: var(--project-blush);
}

@media (max-width: 720px) {
  .project-page {
    padding: 32px 20px 0;
  }

  .project-intro {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .project-snapshot {
    max-width: 26rem;
  }

  .project-intro h1 {
    font-size: 30px;
  }

  .project-item,
  .project-item--featured {
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 0.75rem;
    padding: 1.2rem 0;
  }

  .project-item--featured {
    padding: 1.2rem;
  }

  .project-item__heading {
    gap: 0.65rem;
  }

  .project-facts {
    gap: 0.75rem 1rem;
  }
}

@media (max-width: 460px) {
  .project-page {
    padding-inline: 14px;
  }

  .project-actions,
  .project-action {
    width: 100%;
  }

  .project-action {
    justify-content: center;
  }

  .project-item__heading {
    grid-template-columns: minmax(0, 1fr);
  }

  .project-open {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-action,
  .project-open {
    transition: none;
  }
}
</style>
