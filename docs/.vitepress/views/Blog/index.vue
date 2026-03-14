<template>
  <section class="xb-page blog-page">
    <div class="blog-layout">
      <aside class="blog-left">
        <article class="xb-card profile-card">
          <img class="profile-card__avatar" :src="avatarSrc" alt="小八头像" />
          <p class="xb-eyebrow">Profile</p>
          <h2>小八</h2>
          <p class="xb-muted profile-card__intro">持续记录前端、工程化和真实项目里的可复用经验。</p>
          <div class="profile-card__stats">
            <div>
              <strong>{{ allPosts.length }}</strong>
              <span>文章</span>
            </div>
            <div>
              <strong>{{ archiveBuckets.length - 1 }}</strong>
              <span>归档</span>
            </div>
            <div>
              <strong>{{ latestUpdatedText }}</strong>
              <span>最近更新</span>
            </div>
          </div>
          <div class="xb-chip-row profile-card__links">
            <a class="xb-chip" :href="toPath('/home')">首页</a>
            <a class="xb-chip" :href="toPath('/projects')">项目</a>
            <a class="xb-chip" :href="toPath('/share')">分享</a>
          </div>
        </article>

        <article class="xb-card archive-card">
          <p class="xb-eyebrow">Timeline</p>
          <h3>时间线归档</h3>
          <ul class="archive-list">
            <li v-for="bucket in archiveBuckets" :key="bucket.key">
              <button
                type="button"
                class="archive-btn"
                :class="{ 'archive-btn--active': selectedArchiveKey === bucket.key }"
                @click="selectArchive(bucket.key)"
              >
                <span>{{ bucket.label }}</span>
                <span class="xb-muted">{{ bucket.count }}</span>
              </button>
            </li>
          </ul>
        </article>
      </aside>

      <main class="blog-main">
        <header class="xb-hero blog-main__hero">
          <p class="xb-eyebrow">Recent Posts</p>
          <h1>最近发布</h1>
          <p class="xb-muted">
            当前筛选：{{ activeArchiveLabel }}，共 {{ filteredPosts.length }} 篇，按时间线分页展示。
          </p>
          <div class="xb-chip-row">
            <span class="xb-chip">第 {{ currentPage }} / {{ totalPages }} 页</span>
            <span class="xb-chip">每页 {{ PAGE_SIZE }} 篇</span>
            <a class="xb-chip" :href="toPath('/note/index')">进入笔记总览</a>
            <a class="xb-chip" :href="toPath('/blog/index#guestbook')">博客留言板</a>
          </div>
        </header>

        <div v-if="pagedPosts.length === 0" class="xb-card">
          <p class="xb-muted">当前没有符合筛选条件的文章。</p>
        </div>

        <div v-else class="blog-post-stack">
          <article v-for="post in pagedPosts" :key="post.url" class="xb-card post-card">
            <div class="post-card__meta">
              <span class="xb-tag">{{ post.section }}</span>
              <time class="xb-muted" :datetime="toIsoDate(post.publishedAt)">{{ formatDate(post.publishedAt) }}</time>
            </div>
            <h2>{{ post.title }}</h2>
            <p class="xb-muted">{{ post.summary }}</p>
            <a class="post-card__link" :href="toPath(post.url)">阅读全文</a>
          </article>
        </div>

        <nav class="xb-card pager" aria-label="博客分页">
          <button type="button" class="pager-btn" :disabled="currentPage <= 1" @click="goPrevPage">
            上一页
          </button>
          <span class="pager-text">第 {{ currentPage }} / {{ totalPages }} 页</span>
          <button type="button" class="pager-btn" :disabled="currentPage >= totalPages" @click="goNextPage">
            下一页
          </button>
        </nav>
      </main>

      <aside class="blog-right">
        <article id="guestbook" class="xb-card discussion-card">
          <GiscusPanel
            title="留言板"
            mapping="specific"
            term="blog-guestbook"
          />
        </article>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../../data/blogRecent.data'
import GiscusPanel from '../../theme/components/GiscusPanel.vue'

type RecentPost = {
  title: string
  summary: string
  section: string
  url: string
  publishedAt: number
  publishedText: string
  updatedAt: number
  updatedText: string
}

type ArchiveBucket = {
  key: string
  label: string
  count: number
  latest: number
}

const PAGE_SIZE = 6
const avatarSrc = withBase('/xiaoba-smile.jpg')

const selectedArchiveKey = ref('all')
const currentPage = ref(1)

const allPosts = computed<RecentPost[]>(() => {
  return (posts as RecentPost[]).filter((post) => typeof post.url === 'string' && post.url.length > 0)
})

const latestUpdatedText = computed(() => {
  const latest = allPosts.value.find((post) => post.updatedAt > 0)
  return latest ? formatDate(latest.updatedAt) : '未知'
})

const archiveBuckets = computed<ArchiveBucket[]>(() => {
  const map = new Map<string, ArchiveBucket>()

  allPosts.value.forEach((post) => {
    const key = resolveArchiveKey(post.publishedAt)
    const current = map.get(key)
    if (current) {
      current.count += 1
      if (post.publishedAt > current.latest) current.latest = post.publishedAt
      return
    }

    map.set(key, {
      key,
      label: resolveArchiveLabel(key),
      count: 1,
      latest: post.publishedAt,
    })
  })

  const buckets = Array.from(map.values()).sort((a, b) => {
    if (a.key === 'unknown') return 1
    if (b.key === 'unknown') return -1
    return b.latest - a.latest
  })

  return [
    {
      key: 'all',
      label: '全部',
      count: allPosts.value.length,
      latest: allPosts.value[0]?.publishedAt || 0,
    },
    ...buckets,
  ]
})

const activeArchiveLabel = computed(() => {
  const current = archiveBuckets.value.find((item) => item.key === selectedArchiveKey.value)
  return current?.label || '全部'
})

const filteredPosts = computed<RecentPost[]>(() => {
  if (selectedArchiveKey.value === 'all') return allPosts.value
  return allPosts.value.filter((post) => resolveArchiveKey(post.publishedAt) === selectedArchiveKey.value)
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredPosts.value.length / PAGE_SIZE))
})

const pagedPosts = computed<RecentPost[]>(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredPosts.value.slice(start, start + PAGE_SIZE)
})

watch(selectedArchiveKey, () => {
  currentPage.value = 1
})

watch(
  () => filteredPosts.value.length,
  () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  }
)

function selectArchive(key: string): void {
  selectedArchiveKey.value = key
}

function goPrevPage(): void {
  currentPage.value = Math.max(1, currentPage.value - 1)
}

function goNextPage(): void {
  currentPage.value = Math.min(totalPages.value, currentPage.value + 1)
}

function resolveArchiveKey(timestamp: number): string {
  if (!timestamp) return 'unknown'
  const date = new Date(timestamp)
  if (!Number.isFinite(date.getTime())) return 'unknown'
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  return `${date.getFullYear()}-${month}`
}

function resolveArchiveLabel(key: string): string {
  if (key === 'unknown') return '未知时间'
  const [year, month] = key.split('-')
  return `${year}年${month}月`
}

function formatDate(timestamp: number): string {
  if (!timestamp) return '未知时间'
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

function toIsoDate(timestamp: number): string {
  if (!timestamp) return ''
  return new Date(timestamp).toISOString()
}

function toPath(path: string): string {
  return withBase(encodeURI(path))
}
</script>

<style scoped>
.blog-page {
  width: calc(100% - 1.25rem);
  max-width: none;
  overflow-x: clip;
  margin-bottom: 4rem;
}

.blog-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr) 320px;
  gap: 1rem;
  align-items: start;
}

.blog-left,
.blog-right {
  position: sticky;
  top: calc(var(--vp-nav-height) + 24px);
  display: grid;
  gap: 0.9rem;
}

.blog-right {
  min-width: 0;
}

.profile-card__avatar {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid color-mix(in srgb, var(--xb-accent) 45%, var(--xb-border) 55%);
  margin-bottom: 0.7rem;
}

.profile-card h2,
.archive-card h3 {
  margin-top: 0.4rem;
  font-size: 1.12rem;
}

.profile-card__intro {
  margin-top: 0.45rem;
  font-size: 0.92rem;
}

.profile-card__stats {
  margin-top: 0.85rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.45rem;
}

.profile-card__stats div {
  border-radius: 12px;
  border: 1px dashed var(--xb-border);
  padding: 0.45rem;
  background: color-mix(in srgb, var(--xb-accent-soft) 35%, transparent 65%);
}

.profile-card__stats strong {
  display: block;
  font-size: 0.95rem;
}

.profile-card__stats span {
  font-size: 0.75rem;
  color: var(--xb-muted);
}

.profile-card__links .xb-chip {
  font-size: 0.76rem;
  padding: 0.34rem 0.6rem;
}

.archive-list {
  margin-top: 0.7rem;
  display: grid;
  gap: 0.45rem;
}

.archive-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.48rem 0.62rem;
  border-radius: 10px;
  border: 1px solid var(--xb-border);
  background: color-mix(in srgb, var(--xb-surface-soft) 80%, transparent 20%);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.archive-btn:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--xb-accent) 35%, var(--xb-border) 65%);
}

.archive-btn--active {
  border-color: color-mix(in srgb, var(--xb-accent) 55%, var(--xb-border) 45%);
  background: color-mix(in srgb, var(--xb-accent-soft) 62%, transparent 38%);
}

.blog-main {
  min-width: 0;
}

.blog-main__hero p {
  max-width: 46rem;
}

.blog-post-stack {
  margin-top: 0.95rem;
  display: grid;
  gap: 0.85rem;
}

.post-card h2 {
  margin-top: 0.45rem;
  font-size: 1.06rem;
}

.post-card__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.post-card__link {
  margin-top: 0.3rem;
  width: fit-content;
  font-size: 0.9rem;
  font-weight: 700;
}

.pager {
  margin-top: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.pager-btn {
  border-radius: 10px;
  border: 1px solid var(--xb-border);
  background: color-mix(in srgb, var(--xb-accent-soft) 50%, transparent 50%);
  padding: 0.42rem 0.75rem;
  font-size: 0.86rem;
  font-weight: 600;
}

.pager-btn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.pager-text {
  font-size: 0.86rem;
  color: var(--xb-muted);
}

.discussion-card {
  min-width: 0;
}

@media (max-width: 1200px) {
  .blog-layout {
    grid-template-columns: 220px minmax(0, 1fr) 300px;
  }
}

@media (max-width: 1024px) {
  .blog-layout {
    grid-template-columns: 1fr;
  }

  .blog-left,
  .blog-right {
    position: static;
  }
}
</style>
