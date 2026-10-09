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
                  <time :datetime="post.publishedAt">{{ post.publishedText }}</time>
                  <span class="post-label">{{ post.section }}</span>
                </div>
                <h3>
                  <a :href="toPath(post.url)">{{ post.title }}</a>
                </h3>
                <p v-if="post.summary">{{ post.summary }}</p>
              </div>
              <a class="post-row__link" :href="toPath(post.url)">
                <span>{{ copy.readMore }}</span>
                <Icon icon="lucide:arrow-up-right" aria-hidden="true" />
              </a>
            </li>
          </ol>

          <nav v-if="totalPages > 1" class="pager" :aria-label="copy.pagerAriaLabel">
            <button
              type="button"
              class="pager-button action action--secondary"
              :disabled="currentPage <= 1"
              @click="goPrevPage"
            >
              <Icon icon="lucide:chevron-left" aria-hidden="true" />
              <span>{{ copy.prev }}</span>
            </button>
            <div class="pager-status">{{ pageChipText }}</div>
            <button
              type="button"
              class="pager-button action action--secondary"
              :disabled="currentPage >= totalPages"
              @click="goNextPage"
            >
              <span>{{ copy.next }}</span>
              <Icon icon="lucide:chevron-right" aria-hidden="true" />
            </button>
          </nav>

          <section id="guestbook" class="guestbook">
            <header class="guestbook__heading">
              <Icon icon="lucide:message-square-heart" aria-hidden="true" />
              <div>
                <h2>博客留言板</h2>
                <p class="guestbook__description">
                  欢迎留下你的想法、建议或问题。评论数据由 GitHub Discussions 托管。
                </p>
              </div>
            </header>
            <GiscusPanel />
          </section>
        </main>
      </div>
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
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function toPath(path: string): string {
  return withBase(path)
}
</script>

<style scoped>
.blog-page {
  --blog-ink: var(--text-primary);
  --blog-muted: var(--text-secondary);
  --blog-page: var(--surface);
  --blog-paper: var(--surface-raised);
  --blog-soft: var(--surface-soft);
  --blog-border: var(--border);
  --blog-border-subtle: var(--border-subtle);
  --blog-blue: var(--accent);
  --blog-blue-deep: var(--accent-fg);
  --blog-blue-soft: var(--primary-50);
  --blog-yellow: var(--accent-butter);
  --blog-yellow-soft: var(--accent-butter-soft);
  --blog-blush: var(--accent-peach);
  --blog-mint: var(--accent-mint);
  --blog-mint-ink: var(--primary-700);

  min-height: 100svh;
  background: var(--blog-page);
  color: var(--blog-ink);
}

.blog-shell {
  width: min(100% - 3rem, 1200px);
  margin-inline: auto;
  padding: var(--space-8) 0 var(--space-12);
}

.blog-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-7);
  align-items: center;
  padding: var(--space-7) var(--space-8);
  border: 1px solid var(--blog-border-subtle);
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, var(--blog-paper) 0%, var(--blog-blue-soft) 100%);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-8);
}

.hero-copy {
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0 0 var(--space-3);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--primary-200);
  border-radius: var(--radius-full);
  background: var(--primary-100);
  color: var(--primary-700);
  font-size: 0.875rem;
  font-weight: 650;
}

.blog-hero h1 {
  margin: 0 0 var(--space-3);
  color: var(--blog-ink);
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.25;
}

.hero-description {
  max-width: 50ch;
  margin: 0 0 var(--space-5);
  color: var(--blog-muted);
  font-size: 1.0625rem;
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.action {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 650;
  text-decoration: none;
  transition: all 200ms var(--ease-smooth);
  cursor: pointer;
}

.action:hover {
  transform: translateY(-1px);
}

.action:active {
  transform: translateY(0) scale(0.98);
}

.action--primary {
  background: var(--blog-blue-deep);
  border-color: var(--blog-blue-deep);
  color: white;
  box-shadow: var(--shadow-xs);
}

.action--primary:hover {
  background: var(--primary-800);
  border-color: var(--primary-800);
  box-shadow: var(--shadow-sm);
}

.action--secondary {
  background: var(--blog-paper);
  border-color: var(--blog-border);
  color: var(--blog-blue-deep);
}

.action--secondary:hover {
  background: var(--blog-soft);
  border-color: var(--blog-blue);
}

.action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action:disabled:hover {
  transform: none;
}

.hero-portrait {
  display: grid;
  grid-template-columns: auto;
  gap: var(--space-3);
  justify-items: center;
}

.hero-portrait img {
  width: 120px;
  height: 120px;
  border: 3px solid var(--primary-100);
  border-radius: var(--radius-xl);
  object-fit: cover;
  background: var(--blog-blue-soft);
  box-shadow: var(--shadow-sm);
}

.hero-portrait__note {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--blog-border);
  border-radius: var(--radius-full);
  background: var(--blog-paper);
  color: var(--blog-muted);
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: var(--shadow-xs);
}

.blog-content {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: var(--space-8);
}

.blog-sidebar {
  position: sticky;
  top: calc(var(--vp-nav-height, 64px) + var(--space-6));
  align-self: start;
}

.sidebar-section + .sidebar-section {
  margin-top: var(--space-7);
  padding-top: var(--space-7);
  border-top: 1px solid var(--blog-border-subtle);
}

.section-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  color: var(--blog-blue-deep);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.archive-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.archive-list li + li {
  margin-top: var(--space-1);
}

.archive-button {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  padding-left: var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--blog-muted);
  font-size: 0.9375rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 200ms var(--ease-smooth);
}

.archive-button::before {
  content: '';
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 3px;
  height: 1.2em;
  background: var(--blog-blue);
  border-radius: var(--radius-full);
  transition: transform 260ms var(--ease-elastic);
}

.archive-button:hover {
  background: var(--blog-soft);
  color: var(--blog-ink);
}

.archive-button--active {
  background: var(--blog-blue-soft);
  border-color: var(--primary-100);
  color: var(--blog-blue-deep);
  font-weight: 650;
}

.archive-button--active::before {
  transform: translateY(-50%) scaleY(1);
}

.archive-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 24px;
  padding: 0 var(--space-2);
  border-radius: var(--radius-full);
  background: var(--blog-soft);
  font-size: 0.8125rem;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

.archive-button--active .archive-count {
  background: var(--blog-blue);
  color: white;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sidebar-links a {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--blog-muted);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 180ms var(--ease-smooth);
}

.sidebar-links a:hover {
  background: var(--blog-soft);
  color: var(--blog-ink);
}

.link-arrow {
  margin-left: auto;
  opacity: 0.5;
  transition: all 180ms var(--ease-smooth);
}

.sidebar-links a:hover .link-arrow {
  opacity: 1;
  transform: translate(2px, -2px);
}

.blog-results {
  min-width: 0;
}

.results-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-5);
  margin-bottom: var(--space-7);
}

.results-header .eyebrow {
  margin-bottom: var(--space-2);
}

.results-header h2 {
  margin: 0;
  color: var(--blog-ink);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  line-height: 1.3;
}

.results-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--blog-muted);
  font-size: 0.9375rem;
}

.results-meta strong {
  color: var(--blog-blue-deep);
  font-size: 1.125rem;
  font-weight: 700;
}

.results-meta__dot {
  opacity: 0.4;
}

.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.post-row {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) auto;
  gap: var(--space-5);
  align-items: start;
  padding: var(--space-6) 0;
  border-bottom: 1px solid var(--blog-border-subtle);
  transition: all 220ms var(--ease-smooth);
}

.post-row:first-child {
  padding-top: 0;
}

.post-row:hover {
  padding-left: var(--space-3);
  padding-right: var(--space-3);
  margin-left: calc(-1 * var(--space-3));
  margin-right: calc(-1 * var(--space-3));
  border-radius: var(--radius-md);
  background: var(--blog-soft);
  border-bottom-color: transparent;
}

.post-row__index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-md);
  background: var(--blog-blue-soft);
  color: var(--blog-blue-deep);
  font-size: 1.125rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.post-row:nth-child(3n + 2) .post-row__index {
  background: var(--accent-peach-soft);
  color: var(--blog-yellow);
}

.post-row:nth-child(3n + 3) .post-row__index {
  background: var(--accent-mint-soft);
  color: var(--blog-mint-ink);
}

.post-row__body {
  min-width: 0;
}

.post-row__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
  color: var(--blog-muted);
  font-size: 0.875rem;
}

.post-label {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--blog-blue-soft);
  color: var(--blog-blue-deep);
  font-size: 0.8125rem;
  font-weight: 700;
}

.post-row:nth-child(3n + 2) .post-label {
  background: var(--accent-peach-soft);
  color: var(--blog-blue-deep);
}

.post-row:nth-child(3n + 3) .post-label {
  background: var(--accent-mint-soft);
  color: var(--blog-mint-ink);
}

.post-row h3 {
  margin: 0 0 var(--space-2);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
}

.post-row h3 a {
  color: var(--blog-ink);
  text-decoration: none;
  transition: color 180ms var(--ease-smooth);
}

.post-row h3 a:hover {
  color: var(--blog-blue);
}

.post-row p {
  max-width: 68ch;
  margin: 0;
  color: var(--blog-muted);
  font-size: 1rem;
  line-height: 1.7;
}

.post-row__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--blog-border);
  border-radius: var(--radius-md);
  background: var(--blog-paper);
  color: var(--blog-blue-deep);
  font-size: 0.875rem;
  font-weight: 650;
  text-decoration: none;
  white-space: nowrap;
  transition: all 200ms var(--ease-smooth);
}

.post-row__link:hover {
  border-color: var(--blog-blue);
  background: var(--blog-blue-soft);
  transform: translateY(-1px);
  box-shadow: var(--shadow-xs);
}

.state-panel {
  display: flex;
  min-height: 180px;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-5);
  padding: var(--space-7);
  border: 1px dashed var(--blog-border);
  border-radius: var(--radius-xl);
  background: var(--blog-soft);
  color: var(--blog-muted);
  text-align: center;
}

.state-panel--error {
  align-items: flex-start;
  justify-content: flex-start;
  color: var(--blog-ink);
  text-align: left;
}

.state-panel--error > :deep(.icon) {
  flex-shrink: 0;
  color: var(--blog-blush);
}

.state-panel h3 {
  margin: 0 0 var(--space-2);
  color: var(--blog-blue-deep);
  font-size: 1.125rem;
  font-weight: 700;
}

.state-panel p {
  margin: 0 0 var(--space-4);
  color: var(--blog-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
}

.state-panel .action {
  margin-top: var(--space-2);
}

.state-panel__spin {
  animation: blog-spin 1s linear infinite;
}

@keyframes blog-spin {
  to {
    transform: rotate(360deg);
  }
}

.pager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-7);
  padding-top: var(--space-6);
  border-top: 1px solid var(--blog-border-subtle);
}

.pager-button {
  background: var(--blog-paper);
}

.pager-status {
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--primary-200);
  border-radius: var(--radius-md);
  background: var(--blog-blue-soft);
  color: var(--blog-blue-deep);
  font-size: 0.875rem;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

.guestbook {
  margin-top: var(--space-10);
  padding-top: var(--space-8);
  border-top: 1px solid var(--blog-border);
}

.guestbook__heading {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.guestbook__heading > :deep(.icon) {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--blog-blush);
}

.guestbook h2 {
  margin: 0 0 var(--space-3);
  color: var(--blog-blue-deep);
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.3;
}

.guestbook__description {
  max-width: 62ch;
  margin: 0;
  color: var(--blog-muted);
  font-size: 1.0625rem;
  line-height: 1.7;
}

@media (max-width: 860px) {
  .blog-content {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .blog-sidebar {
    order: 2;
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
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
  .blog-shell {
    width: 100%;
    padding-inline: var(--space-4);
  }

  .blog-hero {
    grid-template-columns: 1fr;
    gap: var(--space-5);
    padding: var(--space-6);
  }

  .blog-hero h1 {
    font-size: 1.75rem;
  }

  .hero-portrait {
    justify-items: start;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: var(--space-4);
  }

  .hero-portrait img {
    width: 88px;
    height: 88px;
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
    gap: var(--space-3);
  }

  .results-meta {
    justify-content: start;
  }

  .post-row {
    grid-template-columns: 2.5rem minmax(0, 1fr);
    gap: var(--space-4);
  }

  .post-row__link {
    grid-column: 2;
    justify-self: start;
  }

  .pager-button {
    padding-inline: var(--space-3);
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
  .post-row,
  .post-row__link {
    transition: none;
  }
}
</style>
