<template>
  <section class="xb-page blog-page">
    <div class="blog-layout">
      <aside class="blog-left">
        <article class="xb-card profile-card">
          <img class="profile-card__avatar" :src="avatarSrc" :alt="copy.profileAlt" />
          <p class="xb-eyebrow">Profile</p>
          <h2>{{ copy.profileName }}</h2>
          <p class="xb-muted profile-card__intro">{{ copy.profileIntro }}</p>
          <div class="profile-card__stats">
            <div>
              <strong>{{ totalPostsCount }}</strong>
              <span>{{ copy.articleCount }}</span>
            </div>
            <div>
              <strong>{{ archiveTotalCount }}</strong>
              <span>{{ copy.archiveCount }}</span>
            </div>
            <div>
              <strong>{{ latestUpdatedText }}</strong>
              <span>{{ copy.latestUpdated }}</span>
            </div>
          </div>
          <div class="xb-chip-row profile-card__links">
            <a class="xb-chip" :href="toPath('/home')">{{ copy.home }}</a>
            <a class="xb-chip" :href="toPath('/projects')">{{ copy.projects }}</a>
            <a class="xb-chip" :href="toPath('/share')">{{ copy.share }}</a>
          </div>
        </article>

        <article class="xb-card archive-card">
          <p class="xb-eyebrow">Timeline</p>
          <h3>{{ copy.timelineTitle }}</h3>
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
          <h1>{{ copy.recentTitle }}</h1>
          <p class="xb-muted">{{ summaryText }}</p>
          <div class="xb-chip-row">
            <span class="xb-chip">{{ pageChipText }}</span>
            <span class="xb-chip">{{ pageSizeText }}</span>
            <a class="xb-chip" :href="toPath('/note/index')">{{ copy.noteOverview }}</a>
            <a class="xb-chip" :href="toPath('/blog/index#guestbook')">{{ copy.guestbook }}</a>
          </div>
        </header>

        <div v-if="loadError" class="xb-card status-card">
          <p class="xb-muted">{{ loadError }}</p>
          <div class="status-actions">
            <button type="button" class="pager-btn" @click="retryLoad">{{ copy.retry }}</button>
          </div>
        </div>

        <div v-else-if="isLoading && pagedPosts.length === 0" class="xb-card status-card">
          <p class="xb-muted">{{ copy.loading }}</p>
        </div>

        <div v-else-if="pagedPosts.length === 0" class="xb-card status-card">
          <p class="xb-muted">{{ copy.empty }}</p>
        </div>

        <div v-else class="blog-post-stack">
          <article v-for="post in pagedPosts" :key="post.url" class="xb-card post-card">
            <div class="post-card__meta">
              <span class="xb-tag">{{ post.section }}</span>
              <time class="xb-muted" :datetime="toIsoDate(post.publishedAt)">{{ formatDate(post.publishedAt) }}</time>
            </div>
            <h2>{{ post.title }}</h2>
            <p class="xb-muted">{{ post.summary }}</p>
            <a class="post-card__link" :href="toPath(post.url)">{{ copy.readMore }}</a>
          </article>
        </div>

        <nav class="xb-card pager" :aria-label="copy.pagerAriaLabel">
          <button
            type="button"
            class="pager-btn"
            :disabled="isLoading || currentPage <= 1"
            @click="goPrevPage"
          >
            {{ copy.prev }}
          </button>
          <span class="pager-text">{{ pageChipText }}</span>
          <button
            type="button"
            class="pager-btn"
            :disabled="isLoading || currentPage >= totalPages"
            @click="goNextPage"
          >
            {{ copy.next }}
          </button>
        </nav>
      </main>

      <aside class="blog-right">
        <article id="guestbook" class="xb-card discussion-card">
          <GiscusPanel :title="copy.commentTitle" mapping="specific" term="blog-guestbook" />
        </article>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
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
  totalPages: number
}

type BlogIndexManifest = {
  generatedAt: string
  pageSize: number
  latestUpdatedText: string
  all: ArchiveBucket
  archives: ArchiveBucket[]
}

type BlogIndexPage = {
  key: string
  page: number
  totalPages: number
  items: RecentPost[]
}

const copy = {
  profileAlt: '\u5C0F\u516B\u5934\u50CF',
  profileName: '\u5C0F\u516B',
  profileIntro:
    '\u6301\u7EED\u8BB0\u5F55\u524D\u7AEF\u3001\u5DE5\u7A0B\u5316\u548C\u771F\u5B9E\u9879\u76EE\u91CC\u7684\u53EF\u590D\u7528\u7ECF\u9A8C\u3002',
  articleCount: '\u6587\u7AE0',
  archiveCount: '\u5F52\u6863',
  latestUpdated: '\u6700\u8FD1\u66F4\u65B0',
  home: '\u9996\u9875',
  projects: '\u9879\u76EE',
  share: '\u5206\u4EAB',
  timelineTitle: '\u65F6\u95F4\u7EBF\u5F52\u6863',
  recentTitle: '\u6700\u8FD1\u53D1\u5E03',
  noteOverview: '\u8FDB\u5165\u7B14\u8BB0\u603B\u89C8',
  guestbook: '\u535A\u5BA2\u7559\u8A00\u677F',
  loading: '\u6B63\u5728\u52A0\u8F7D\u6587\u7AE0\u2026',
  empty: '\u5F53\u524D\u6CA1\u6709\u7B26\u5408\u7B5B\u9009\u6761\u4EF6\u7684\u6587\u7AE0\u3002',
  retry: '\u91CD\u8BD5',
  readMore: '\u9605\u8BFB\u5168\u6587',
  prev: '\u4E0A\u4E00\u9875',
  next: '\u4E0B\u4E00\u9875',
  pagerAriaLabel: '\u535A\u5BA2\u5206\u9875',
  commentTitle: '\u7559\u8A00\u677F',
  all: '\u5168\u90E8',
  unknown: '\u672A\u77E5',
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

const totalPostsCount = computed(() => manifest.value?.all.count || 0)
const archiveTotalCount = computed(() => manifest.value?.archives.length || 0)
const latestUpdatedText = computed(() => manifest.value?.latestUpdatedText || copy.unknown)
const totalPages = computed(() => activeBucket.value?.totalPages || 1)
const activeArchiveLabel = computed(() => activeBucket.value?.label || copy.all)
const activeArchiveCount = computed(() => activeBucket.value?.count || 0)
const pagedPosts = computed(() => pageItems.value)
const pageChipText = computed(() => `\u7B2C ${currentPage.value} / ${totalPages.value} \u9875`)
const pageSizeText = computed(() => `\u6BCF\u9875 ${manifest.value?.pageSize || 0} \u7BC7`)
const summaryText = computed(
  () =>
    `\u5F53\u524D\u7B5B\u9009\uFF1A${activeArchiveLabel.value}\uFF0C\u5171 ${activeArchiveCount.value} \u7BC7\uFF0C\u6309\u65F6\u95F4\u7EBF\u5206\u9875\u5C55\u793A\u3002`
)

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

function retryLoad(): void {
  void loadPage()
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
    return `\u52A0\u8F7D\u5931\u8D25\uFF1A${error.message}`
  }
  return '\u52A0\u8F7D\u5931\u8D25'
}

function formatDate(timestamp: number): string {
  if (!timestamp) return '\u672A\u77E5\u65F6\u95F4'
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
  grid-template-columns: 280px minmax(0, 1fr) 300px;
  gap: 1.15rem;
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

.blog-left {
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
  line-height: 1.65;
}

.profile-card__stats {
  margin-top: 0.85rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
}

.profile-card__stats div:last-child {
  grid-column: 1 / -1;
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
  gap: 0.7rem;
  padding: 0.48rem 0.62rem;
  border-radius: 10px;
  border: 1px solid var(--xb-border);
  background: color-mix(in srgb, var(--xb-surface-soft) 80%, transparent 20%);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  text-align: left;
}

.archive-btn span:first-child {
  min-width: 0;
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

.status-card {
  margin-top: 0.95rem;
}

.status-actions {
  margin-top: 0.8rem;
  display: flex;
  gap: 0.6rem;
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
    grid-template-columns: 248px minmax(0, 1fr) 280px;
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
