<template>
  <section class="blog-page" aria-labelledby="blog-title">
    <div class="blog-shell">
      <header class="blog-hero">
        <div class="hero-copy">
          <p class="eyebrow">
            <Icon icon="lucide:book-open-check" aria-hidden="true" />
            <span>博客</span>
          </p>
          <h1 id="blog-title">博客文章</h1>
          <p class="hero-description">整理好的技术实践、项目复盘和方法记录。</p>
          <nav class="hero-actions" aria-label="博客入口">
            <a class="action action--primary" :href="toPath('/')">
              <Icon icon="lucide:house" aria-hidden="true" />
              <span>返回首页</span>
            </a>
            <a class="action action--secondary" :href="toPath('/note/')">
              <Icon icon="lucide:notebook-tabs" aria-hidden="true" />
              <span>浏览笔记</span>
            </a>
          </nav>
        </div>

        <div class="hero-portrait" aria-label="博客状态">
          <img :src="avatarSrc" alt="小八头像" />
          <div class="hero-portrait__note">
            <Icon icon="lucide:calendar-days" aria-hidden="true" />
            <span>最近更新 {{ latestUpdatedText }}</span>
          </div>
        </div>
      </header>

      <div class="blog-content">
        <aside class="blog-sidebar" aria-label="博客筛选与导航">
          <section class="sidebar-section">
            <div class="section-label">
              <Icon icon="lucide:calendar-range" aria-hidden="true" />
              <span>按时间归档</span>
            </div>
            <ul class="archive-list">
              <li v-for="bucket in archiveBuckets" :key="bucket.key">
                <button
                  type="button"
                  class="archive-button"
                  :class="{ 'archive-button--active': selectedArchiveKey === bucket.key }"
                  :aria-pressed="selectedArchiveKey === bucket.key"
                  @click="selectArchive(bucket.key)"
                >
                  <span>{{ bucket.label }}</span>
                  <span class="archive-count">{{ bucket.count }}</span>
                </button>
              </li>
            </ul>
          </section>

          <section class="sidebar-section sidebar-section--links">
            <div class="section-label">
              <Icon icon="lucide:compass" aria-hidden="true" />
              <span>其他入口</span>
            </div>
            <nav class="sidebar-links" aria-label="博客相关页面">
              <a :href="toPath('/projects')">
                <Icon icon="lucide:blocks" aria-hidden="true" />
                <span>项目</span>
                <Icon class="link-arrow" icon="lucide:arrow-up-right" aria-hidden="true" />
              </a>
              <a :href="toPath('/share')">
                <Icon icon="lucide:wrench" aria-hidden="true" />
                <span>工具箱</span>
                <Icon class="link-arrow" icon="lucide:arrow-up-right" aria-hidden="true" />
              </a>
              <a href="#guestbook">
                <Icon icon="lucide:message-circle" aria-hidden="true" />
                <span>博客留言板</span>
                <Icon class="link-arrow" icon="lucide:arrow-down" aria-hidden="true" />
              </a>
            </nav>
          </section>
        </aside>

        <main class="blog-results">
          <header class="results-header">
            <div>
              <p class="eyebrow">文章列表</p>
              <h2>{{ activeArchiveLabel }}</h2>
            </div>
            <div class="results-meta" role="status" aria-live="polite">
              <strong>{{ activeArchiveCount }}</strong>
              <span>篇文章</span>
              <span class="results-meta__dot" aria-hidden="true">·</span>
              <span>{{ pageChipText }}</span>
            </div>
          </header>

          <div v-if="loadError" class="state-panel state-panel--error" role="alert">
            <Icon icon="lucide:triangle-alert" aria-hidden="true" />
            <div>
              <h3>暂时拿不到文章</h3>
              <p>{{ loadError }}</p>
              <button type="button" class="action action--secondary" @click="retryLoad">
                <Icon icon="lucide:refresh-cw" aria-hidden="true" />
                <span>重新加载</span>
              </button>
            </div>
          </div>

          <div v-else-if="isLoading && pagedPosts.length === 0" class="state-panel">
            <Icon icon="lucide:loader-circle" class="state-panel__spin" aria-hidden="true" />
            <p>{{ copy.loading }}</p>
          </div>

          <div v-else-if="pagedPosts.length === 0" class="state-panel">
            <Icon icon="lucide:inbox" aria-hidden="true" />
            <p>{{ copy.empty }}</p>
          </div>

          <ol v-else class="post-list">
            <li v-for="(post, index) in pagedPosts" :key="post.url" class="post-row">
              <span class="post-row__index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="post-row__body">
                <div class="post-row__meta">
                  <span class="post-label">{{ post.section }}</span>
                  <time :datetime="toIsoDate(post.publishedAt)">{{ post.publishedText || formatDate(post.publishedAt) }}</time>
                </div>
                <h3>
                  <a :href="toPath(post.url)">{{ post.title }}</a>
                </h3>
                <p>{{ post.summary }}</p>
              </div>
              <a class="post-row__link" :href="toPath(post.url)" :aria-label="`${copy.readMore}：${post.title}`">
                <span>{{ copy.readMore }}</span>
                <Icon icon="lucide:arrow-up-right" aria-hidden="true" />
              </a>
            </li>
          </ol>

          <nav class="pager" :aria-label="copy.pagerAriaLabel">
            <button
              type="button"
              class="pager-button"
              :disabled="isLoading || currentPage <= 1"
              @click="goPrevPage"
            >
              <Icon icon="lucide:arrow-left" aria-hidden="true" />
              <span>{{ copy.prev }}</span>
            </button>
            <span class="pager-status">{{ pageChipText }}</span>
            <button
              type="button"
              class="pager-button"
              :disabled="isLoading || currentPage >= totalPages"
              @click="goNextPage"
            >
              <span>{{ copy.next }}</span>
              <Icon icon="lucide:arrow-right" aria-hidden="true" />
            </button>
          </nav>
        </main>
      </div>

      <section id="guestbook" class="guestbook" aria-labelledby="guestbook-title">
        <div class="guestbook__heading">
          <div>
            <p class="eyebrow">留言</p>
            <h2 id="guestbook-title">博客留言板</h2>
          </div>
          <Icon icon="lucide:message-circle-heart" aria-hidden="true" />
        </div>
        <p class="guestbook__description">欢迎留言、补充或勘误。</p>
        <GiscusPanel mapping="specific" term="blog-guestbook" />
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { Icon } from '@iconify/vue'
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

type BlogDirectoryEntry = Pick<RecentPost, 'title' | 'url' | 'updatedAt' | 'updatedText'>

type ArchiveBucket = {
  key: string
  label: string
  count: number
  latest: number
  totalPages: number
}

type BlogIndexManifest = {
  generatedAt: string
  pageSize: number
  latestUpdatedText: string
  all: ArchiveBucket
  archives: ArchiveBucket[]
  blogDirectory?: BlogDirectoryEntry[]
}

type BlogIndexPage = {
  key: string
  page: number
  totalPages: number
  items: RecentPost[]
}

const copy = {
  loading: '正在读取博客目录…',
  empty: '当前归档还没有文章。',
  readMore: '阅读全文',
  prev: '上一页',
  next: '下一页',
  pagerAriaLabel: '博客分页',
  unknown: '未知时间',
} as const

const avatarSrc = withBase('/xiaoba-smile.jpg')
const manifest = ref<BlogIndexManifest | null>(null)
const selectedArchiveKey = ref('all')
const currentPage = ref(1)
const pageItems = ref<RecentPost[]>([])
const isLoading = ref(false)
const loadError = ref('')
const pageCache = new Map<string, RecentPost[]>()
let requestId = 0

const archiveBuckets = computed<ArchiveBucket[]>(() => {
  if (!manifest.value) return []
  return [manifest.value.all, ...manifest.value.archives]
})

const activeBucket = computed<ArchiveBucket | null>(() => {
  return archiveBuckets.value.find((bucket) => bucket.key === selectedArchiveKey.value) || manifest.value?.all || null
})

const latestUpdatedText = computed(() => manifest.value?.latestUpdatedText || copy.unknown)
const activeArchiveLabel = computed(() => activeBucket.value?.label || '全部文章')
const activeArchiveCount = computed(() => activeBucket.value?.count || 0)
const totalPages = computed(() => activeBucket.value?.totalPages || 1)
const pagedPosts = computed(() => pageItems.value)
const pageChipText = computed(() => `第 ${currentPage.value} / ${totalPages.value} 页`)

onMounted(async () => {
  await loadManifest()
  await loadPage()
})

async function loadManifest(): Promise<void> {
  if (manifest.value) return

  try {
    manifest.value = await fetchJson<BlogIndexManifest>(withBase('/blog-index/manifest.json'))
  } catch (error) {
    loadError.value = toErrorMessage(error)
  }
}

async function loadPage(): Promise<void> {
  const bucket = activeBucket.value
  if (!bucket) {
    pageItems.value = []
    return
  }

  const nextPage = Math.min(Math.max(currentPage.value, 1), bucket.totalPages)
  if (nextPage !== currentPage.value) {
    currentPage.value = nextPage
  }

  const cacheKey = buildCacheKey(selectedArchiveKey.value, nextPage)
  const cachedItems = pageCache.get(cacheKey)
  if (cachedItems) {
    pageItems.value = cachedItems
    loadError.value = ''
    return
  }

  const localRequestId = ++requestId
  isLoading.value = true
  loadError.value = ''

  try {
    const page = await fetchJson<BlogIndexPage>(buildPageUrl(selectedArchiveKey.value, nextPage))
    if (localRequestId !== requestId) return
    const items = Array.isArray(page.items) ? page.items : []
    pageCache.set(cacheKey, items)
    pageItems.value = items
  } catch (error) {
    if (localRequestId !== requestId) return
    pageItems.value = []
    loadError.value = toErrorMessage(error)
  } finally {
    if (localRequestId === requestId) {
      isLoading.value = false
    }
  }
}

function selectArchive(key: string): void {
  if (selectedArchiveKey.value === key) return
  selectedArchiveKey.value = key
  currentPage.value = 1
  void loadPage()
}

function goPrevPage(): void {
  if (currentPage.value <= 1) return
  currentPage.value -= 1
  void loadPage()
}

function goNextPage(): void {
  if (currentPage.value >= totalPages.value) return
  currentPage.value += 1
  void loadPage()
}

async function retryLoad(): Promise<void> {
  if (!manifest.value) {
    await loadManifest()
  }
  await loadPage()
}

function buildCacheKey(key: string, page: number): string {
  return `${key}:${page}`
}

function buildPageUrl(key: string, page: number): string {
  if (key === 'all') {
    return withBase(`/blog-index/all/page-${page}.json`)
  }
  return withBase(`/blog-index/archive/${encodeURIComponent(key)}/page-${page}.json`)
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return (await response.json()) as T
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return `加载失败：${error.message}`
  }
  return '加载失败，请稍后再试。'
}

function formatDate(timestamp: number): string {
  if (!timestamp) return copy.unknown
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
  --blog-page: var(--xb-page, #f7fbfe);
  --blog-paper: var(--xb-paper, #ffffff);
  --blog-ink: var(--xb-ink, #1d2b36);
  --blog-muted: var(--xb-muted, #5f7180);
  --blog-border: var(--xb-border, #cfe2ee);
  --blog-blue: var(--xb-blue, #2b78a6);
  --blog-blue-deep: var(--xb-blue-deep, #174a70);
  --blog-blue-soft: var(--xb-blue-soft, #e6f4fb);
  --blog-blush: var(--xb-blush, #f59caf);
  --blog-yellow: var(--xb-yellow, #f2c94c);
  --blog-blush-soft: color-mix(in srgb, var(--blog-blush) 16%, var(--blog-paper));
  --blog-yellow-soft: color-mix(in srgb, var(--blog-yellow) 24%, var(--blog-paper));
  --blog-mint: color-mix(in srgb, var(--xb-success) 14%, var(--blog-paper));
  --blog-mint-ink: var(--xb-success);
  max-width: 1180px;
  margin: 0 auto 4rem;
  padding: 1.25rem 1rem 0;
  color: var(--blog-ink);
}

.blog-shell {
  min-width: 0;
}

.blog-page :where(a, button):focus-visible {
  outline: 3px solid var(--blog-yellow);
  outline-offset: 3px;
}

.blog-page :deep(.icon) {
  width: 1.1rem;
  height: 1.1rem;
  flex: 0 0 auto;
}

.blog-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 2rem;
  align-items: center;
  overflow: hidden;
  padding: 40px;
  border: 1px solid color-mix(in srgb, var(--blog-blue) 34%, var(--blog-border));
  border-radius: 8px;
  background: var(--blog-paper);
}

.blog-hero::before {
  position: absolute;
  top: 0;
  left: 2rem;
  width: 96px;
  height: 5px;
  border-radius: 0 0 4px 4px;
  background: var(--blog-yellow);
  content: '';
}

.hero-copy {
  min-width: 0;
}

.eyebrow,
.section-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  color: var(--blog-blue-deep);
  font-size: 0.875rem;
  font-weight: 750;
  letter-spacing: 0;
  line-height: 1.4;
  text-transform: none;
}

.eyebrow :deep(.icon),
.section-label :deep(.icon) {
  color: var(--blog-blush);
}

.blog-hero h1 {
  max-width: 30rem;
  margin: 0.8rem 0 0;
  color: var(--blog-blue-deep);
  font-size: 36px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0;
  text-wrap: balance;
}

.hero-description {
  max-width: 65ch;
  margin: 1rem 0 0;
  color: var(--blog-muted);
  font-size: 1.03rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.35rem;
}

.action,
.pager-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border: 1px solid var(--blog-border);
  border-radius: 8px;
  padding: 0.55rem 0.85rem;
  color: var(--blog-blue-deep);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  transition: border-color 160ms ease, background-color 160ms ease, color 160ms ease;
}

.action--primary {
  border-color: var(--blog-blue-deep);
  background: var(--blog-blue-deep);
  color: #ffffff;
}

.action--primary:hover {
  border-color: var(--blog-blue);
  background: var(--blog-blue);
  color: #ffffff;
}

.action--secondary {
  border-color: color-mix(in srgb, var(--blog-yellow) 40%, var(--blog-border));
  background: var(--blog-yellow-soft);
}

.action--secondary:hover,
.pager-button:not(:disabled):hover {
  border-color: var(--blog-blue);
  background: var(--blog-mint);
  color: var(--blog-blue-deep);
}

.hero-portrait {
  display: grid;
  justify-items: center;
  gap: 0.75rem;
}

.hero-portrait img {
  width: 132px;
  height: 132px;
  border: 3px solid var(--blog-yellow);
  border-radius: 50%;
  box-shadow: none;
  object-fit: cover;
}

.hero-portrait__note {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 32px;
  border: 1px solid color-mix(in srgb, var(--blog-mint-ink) 30%, var(--blog-border));
  border-radius: 8px;
  padding: 0.25rem 0.65rem;
  color: var(--blog-mint-ink);
  background: var(--blog-mint);
  font-size: 0.875rem;
  text-align: center;
}

.blog-content {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 2rem;
  margin-top: 2.25rem;
}

.blog-sidebar {
  align-self: start;
  position: sticky;
  top: calc(var(--vp-nav-height) + 1.25rem);
}

.sidebar-section + .sidebar-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--blog-border);
}

.archive-list,
.sidebar-links {
  display: grid;
  gap: 0.35rem;
  margin: 0.8rem 0 0;
  padding: 0;
  list-style: none;
}

.archive-button,
.sidebar-links a {
  display: flex;
  width: 100%;
  min-height: 44px;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.55rem 0.65rem;
  color: var(--blog-muted);
  background: transparent;
  font: inherit;
  font-size: 0.9rem;
  line-height: 1.3;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}

.archive-button:hover,
.sidebar-links a:hover {
  border-color: color-mix(in srgb, var(--blog-mint-ink) 30%, var(--blog-border));
  color: var(--blog-blue-deep);
  background: var(--blog-mint);
}

.archive-button--active {
  border-color: var(--blog-blue);
  color: var(--blog-blue-deep);
  background: var(--blog-blue-soft);
  font-weight: 750;
}

.archive-button > span:first-child,
.sidebar-links a > span:not(.link-arrow) {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.archive-count {
  margin-left: auto;
  border-radius: 999px;
  padding: 0.1rem 0.45rem;
  color: var(--blog-blue-deep);
  background: var(--blog-yellow-soft);
  font-size: 0.875rem;
}

.sidebar-links .link-arrow {
  width: 0.9rem;
  height: 0.9rem;
  margin-left: auto;
}

.blog-results {
  min-width: 0;
}

.results-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid color-mix(in srgb, var(--blog-mint-ink) 28%, var(--blog-border));
  border-radius: 8px;
  background: var(--blog-mint);
}

.results-header h2 {
  margin: 0.45rem 0 0;
  color: var(--blog-blue-deep);
  font-size: 1.7rem;
  line-height: 1.25;
}

.results-meta {
  display: inline-flex;
  min-height: 36px;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: end;
  gap: 0.35rem;
  border: 1px solid color-mix(in srgb, var(--blog-yellow) 44%, var(--blog-border));
  border-radius: 8px;
  padding: 0.35rem 0.7rem;
  color: var(--blog-muted);
  background: var(--blog-yellow-soft);
  font-size: 0.875rem;
  white-space: nowrap;
}

.results-meta strong {
  color: var(--blog-blue-deep);
  font-size: 1.15rem;
}

.results-meta__dot {
  color: var(--blog-blush);
  font-size: 1.25rem;
}

.post-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.post-row {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: start;
  margin-inline: -0.75rem;
  padding: 1.35rem 0.75rem;
  border-bottom: 1px solid var(--blog-border);
  transition: background-color 160ms ease, border-color 160ms ease;
}

.post-row:hover {
  border-bottom-color: color-mix(in srgb, var(--blog-blue) 35%, var(--blog-border));
  background: var(--blog-page);
}

.post-row__index {
  padding-top: 0.2rem;
  color: var(--blog-blush);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  font-weight: 750;
}

.post-row:nth-child(3n + 2) .post-row__index {
  color: var(--blog-yellow);
}

.post-row:nth-child(3n + 3) .post-row__index {
  color: var(--blog-mint-ink);
}

.post-row__body {
  min-width: 0;
}

.post-row__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.55rem;
  color: var(--blog-muted);
  font-size: 0.875rem;
}

.post-label {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  color: var(--blog-blue-deep);
  background: var(--blog-blue-soft);
  font-weight: 750;
}

.post-row:nth-child(3n + 2) .post-label {
  color: var(--blog-blue-deep);
  background: var(--blog-blush-soft);
}

.post-row:nth-child(3n + 3) .post-label {
  color: var(--blog-mint-ink);
  background: var(--blog-mint);
}

.post-row h3 {
  margin: 0.5rem 0 0;
  font-size: 1.22rem;
  line-height: 1.4;
}

.post-row h3 a {
  color: var(--blog-ink);
  text-decoration: none;
}

.post-row h3 a:hover {
  color: var(--blog-blue);
}

.post-row p {
  max-width: 72ch;
  margin: 0.45rem 0 0;
  color: var(--blog-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.post-row__link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.3rem;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.45rem 0.6rem;
  color: var(--blog-blue-deep);
  font-size: 0.875rem;
  font-weight: 750;
  white-space: nowrap;
  text-decoration: none;
}

.post-row__link:hover {
  border-color: color-mix(in srgb, var(--blog-yellow) 42%, var(--blog-border));
  background: var(--blog-yellow-soft);
  color: var(--blog-blue);
}

.state-panel {
  display: flex;
  min-height: 150px;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-top: 1.25rem;
  border: 1px dashed var(--blog-border);
  border-radius: 8px;
  padding: 1.25rem;
  color: var(--blog-muted);
  background: var(--blog-page);
  text-align: center;
}

.state-panel--error {
  align-items: flex-start;
  justify-content: flex-start;
  color: var(--blog-ink);
  text-align: left;
}

.state-panel--error > :deep(.icon) {
  color: var(--blog-blush);
}

.state-panel h3 {
  margin: 0;
  color: var(--blog-blue-deep);
  font-size: 1rem;
}

.state-panel p {
  margin: 0.3rem 0 0;
  color: var(--blog-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.state-panel .action {
  margin-top: 0.8rem;
}

.state-panel__spin {
  animation: blog-spin 900ms linear infinite;
}

.pager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.25rem;
}

.pager-button {
  background: var(--blog-paper);
  cursor: pointer;
}

.pager-button:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.pager-status {
  border: 1px solid color-mix(in srgb, var(--blog-yellow) 42%, var(--blog-border));
  border-radius: 8px;
  color: var(--blog-muted);
  background: var(--blog-yellow-soft);
  padding: 0.3rem 0.65rem;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}

.guestbook {
  margin-top: 3rem;
  border-top: 1px solid var(--blog-border);
  padding-top: 2rem;
}

.guestbook__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.guestbook__heading > :deep(.icon) {
  width: 2rem;
  height: 2rem;
  color: var(--blog-blush);
}

.guestbook h2 {
  margin: 0.45rem 0 0;
  color: var(--blog-blue-deep);
  font-size: 1.55rem;
}

.guestbook__description {
  max-width: 60ch;
  margin: 0.7rem 0 1.25rem;
  color: var(--blog-muted);
  line-height: 1.7;
}

@keyframes blog-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .state-panel__spin {
    animation: none;
  }

  .action,
  .pager-button,
  .archive-button,
  .sidebar-links a,
  .post-row {
    transition: none;
  }
}

@media (max-width: 860px) {
  .blog-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .blog-sidebar {
    order: 2;
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .blog-results {
    order: 1;
  }

  .sidebar-section + .sidebar-section {
    margin-top: 0;
    padding-top: 0;
    border-top: 0;
  }
}

@media (max-width: 620px) {
  .blog-page {
    width: 100%;
    padding-inline: 0.75rem;
  }

  .blog-hero {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 28px 20px 24px;
  }

  .blog-hero h1 {
    font-size: 28px;
  }

  .hero-portrait {
    justify-items: start;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  .hero-portrait img {
    width: 84px;
    height: 84px;
  }

  .hero-portrait__note {
    text-align: left;
  }

  .blog-sidebar {
    grid-template-columns: 1fr;
  }

  .results-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .results-meta {
    justify-content: start;
  }

  .post-row {
    grid-template-columns: 2rem minmax(0, 1fr);
    gap: 0.75rem;
  }

  .post-row__link {
    grid-column: 2;
    justify-self: start;
    padding-top: 0.2rem;
  }

  .pager-button {
    padding-inline: 0.65rem;
  }
}
</style>
