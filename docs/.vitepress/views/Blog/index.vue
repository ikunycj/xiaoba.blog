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
          </div>
        </header>

        <div v-if="pagedPosts.length === 0" class="xb-card">
          <p class="xb-muted">当前没有符合筛选条件的文章。</p>
        </div>

        <div v-else class="blog-post-stack">
          <article v-for="post in pagedPosts" :key="post.url" class="xb-card post-card">
            <div class="post-card__meta">
              <span class="xb-tag">{{ post.section }}</span>
              <time class="xb-muted" :datetime="toIsoDate(post.updated)">{{ formatDate(post.updated) }}</time>
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
        <article class="xb-card recent-comments-card">
          <p class="xb-eyebrow">Recent Comments</p>
          <h3>最新评论</h3>
          <p v-if="commentsLoading" class="xb-muted">最新评论加载中...</p>
          <p v-else-if="commentsError" class="comment-error">{{ commentsError }}</p>
          <ul v-else-if="latestComments.length" class="comment-list">
            <li v-for="comment in latestComments" :key="comment.id" class="comment-item">
              <p class="comment-item__text">{{ comment.summary }}</p>
              <div class="comment-item__meta">
                <span>{{ comment.nick }} · {{ comment.createdText }}</span>
                <a :href="toPath(comment.url)">原文</a>
              </div>
            </li>
          </ul>
          <p v-else class="xb-muted">暂时还没有评论，欢迎抢沙发。</p>
        </article>

        <article class="xb-card global-comments-card">
          <p class="xb-eyebrow">Comment</p>
          <h3>留言评论</h3>
          <p v-if="globalCommentError" class="global-comments-card__error">{{ globalCommentError }}</p>
          <p v-else-if="globalCommentLoading && !globalCommentMounted" class="xb-muted global-comments-card__tip">
            评论区加载中...
          </p>
          <div ref="globalCommentRef" class="global-comments-card__mount" />
        </article>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as posts } from '../../data/blogRecent.data'
import { loadTwikoo } from '../../theme/utils/twikoo'
import { ensureTwikooEndpointReady } from '../../theme/utils/twikooEndpoint'
import { formatTwikooError } from '../../theme/utils/twikooError'
import { setupTwikooProfileCache } from '../../theme/utils/twikooProfileCache'

type RecentPost = {
  title: string
  summary: string
  section: string
  url: string
  updated: number
  updatedText: string
}

type ArchiveBucket = {
  key: string
  label: string
  count: number
  latest: number
}

type TwikooThemeConfig = {
  envId?: string
  region?: string
  lang?: string
}

type RawRecentComment = {
  id?: string
  nick?: string
  url?: string
  commentText?: string
  created?: string | number
  createdAt?: string | number
  created_at?: string | number
  updated?: string | number
}

type RecentComment = {
  id: string
  nick: string
  url: string
  summary: string
  createdText: string
}

const PAGE_SIZE = 6
const GLOBAL_COMMENT_PATH = '/blog/'
const { theme } = useData()
const avatarSrc = withBase('/xiaoba-smile.jpg')

const selectedArchiveKey = ref('all')
const currentPage = ref(1)

const commentsLoading = ref(false)
const commentsError = ref('')
const latestComments = ref<RecentComment[]>([])
let commentRefreshTimer: ReturnType<typeof setInterval> | null = null
const globalCommentRef = ref<HTMLElement | null>(null)
const globalCommentLoading = ref(false)
const globalCommentError = ref('')
const globalCommentMounted = ref(false)
let globalCommentMountVersion = 0
let stopGlobalProfileCache: (() => void) | null = null

const twikooConfig = computed<TwikooThemeConfig>(() => {
  return ((theme.value as Record<string, unknown>).twikoo as TwikooThemeConfig) || {}
})

const allPosts = computed<RecentPost[]>(() => {
  return (posts as RecentPost[]).filter((post) => typeof post.url === 'string' && post.url.length > 0)
})

const latestUpdatedText = computed(() => {
  const latest = allPosts.value.find((post) => post.updated > 0)
  return latest ? formatDate(latest.updated) : '未知'
})

const archiveBuckets = computed<ArchiveBucket[]>(() => {
  const map = new Map<string, ArchiveBucket>()

  allPosts.value.forEach((post) => {
    const key = resolveArchiveKey(post.updated)
    const current = map.get(key)
    if (current) {
      current.count += 1
      if (post.updated > current.latest) current.latest = post.updated
      return
    }

    map.set(key, {
      key,
      label: resolveArchiveLabel(key),
      count: 1,
      latest: post.updated,
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
      latest: allPosts.value[0]?.updated || 0,
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
  return allPosts.value.filter((post) => resolveArchiveKey(post.updated) === selectedArchiveKey.value)
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

watch(
  () => [twikooConfig.value.envId, twikooConfig.value.region, twikooConfig.value.lang],
  () => {
    void refreshLatestComments()
    void mountGlobalComments()
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

function normalizeEnvId(envId: string): string {
  const trimmed = envId.trim()
  if (!/^https?:\/\//i.test(trimmed)) return trimmed
  return trimmed.replace(/\/+$/, '')
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

function normalizePath(url: string): string {
  if (!url) return '/'

  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url)
      return parsed.pathname || '/'
    } catch {
      return '/'
    }
  }

  const plain = url.split('#')[0].split('?')[0]
  return plain.startsWith('/') ? plain : `/${plain}`
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function summarizeComment(value: string): string {
  const clean = stripHtml(value || '')
  if (clean.length <= 100) return clean
  return `${clean.slice(0, 100)}...`
}

function resolveCommentTimestamp(input: RawRecentComment): number {
  const candidate = input.created ?? input.createdAt ?? input.created_at ?? input.updated
  if (typeof candidate === 'number') return candidate
  if (typeof candidate === 'string') {
    const parsed = new Date(candidate).getTime()
    if (Number.isFinite(parsed)) return parsed
  }
  return 0
}

function formatCommentDate(value: number): string {
  if (!value) return '刚刚'
  return new Date(value).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function toPath(path: string): string {
  return withBase(encodeURI(path))
}

function cleanupGlobalProfileCache(): void {
  stopGlobalProfileCache?.()
  stopGlobalProfileCache = null
}

async function refreshLatestComments(): Promise<void> {
  const envId = normalizeEnvId(twikooConfig.value.envId || '')
  if (!envId) {
    commentsError.value = '缺少评论配置：请在 themeConfig.twikoo.envId 中填写服务地址。'
    latestComments.value = []
    return
  }

  commentsLoading.value = true
  commentsError.value = ''

  try {
    await ensureTwikooEndpointReady(envId)
    const twikoo = await loadTwikoo()
    const result = await twikoo.getRecentComments({
      envId,
      region: twikooConfig.value.region || undefined,
      pageSize: 8,
      includeReply: false,
    })

    latestComments.value = (Array.isArray(result) ? result : [])
      .map((item) => item as RawRecentComment)
      .filter((item) => typeof item.id === 'string' && item.id.length > 0)
      .map((item) => {
        const timestamp = resolveCommentTimestamp(item)
        return {
          id: item.id || '',
          nick: item.nick || '匿名用户',
          url: normalizePath(item.url || '/blog/'),
          summary: summarizeComment(item.commentText || '') || '（该评论仅包含附件或链接）',
          createdText: formatCommentDate(timestamp),
        }
      })
  } catch (error) {
    commentsError.value = formatTwikooError(error, envId)
    latestComments.value = []
  } finally {
    commentsLoading.value = false
  }
}

async function mountGlobalComments(): Promise<void> {
  const mountContainer = globalCommentRef.value
  if (!mountContainer) {
    cleanupGlobalProfileCache()
    return
  }

  const envId = normalizeEnvId(twikooConfig.value.envId || '')
  if (!envId) {
    globalCommentError.value = '缺少评论配置：请在 themeConfig.twikoo.envId 中填写服务地址。'
    cleanupGlobalProfileCache()
    return
  }

  const currentVersion = ++globalCommentMountVersion
  const mountId = `blog-global-comment-${currentVersion}`
  mountContainer.innerHTML = `<div id="${mountId}"></div>`
  globalCommentLoading.value = true
  globalCommentError.value = ''
  globalCommentMounted.value = false

  try {
    await ensureTwikooEndpointReady(envId)
    const twikoo = await loadTwikoo()
    if (currentVersion !== globalCommentMountVersion) return

    await twikoo.init({
      envId,
      region: twikooConfig.value.region || undefined,
      lang: twikooConfig.value.lang || 'zh-CN',
      el: `#${mountId}`,
      path: GLOBAL_COMMENT_PATH,
    })

    cleanupGlobalProfileCache()
    stopGlobalProfileCache = setupTwikooProfileCache(mountContainer, `xb:twikoo:profile:${GLOBAL_COMMENT_PATH}`)
    globalCommentMounted.value = true
  } catch (error) {
    globalCommentError.value = formatTwikooError(error, envId)
    globalCommentMounted.value = false
    cleanupGlobalProfileCache()
  } finally {
    globalCommentLoading.value = false
  }
}

onMounted(async () => {
  await refreshLatestComments()
  await nextTick()
  await mountGlobalComments()
  commentRefreshTimer = setInterval(() => {
    void refreshLatestComments()
  }, 60_000)
})

onBeforeUnmount(() => {
  if (commentRefreshTimer) {
    clearInterval(commentRefreshTimer)
    commentRefreshTimer = null
  }
  cleanupGlobalProfileCache()
})
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
  grid-template-columns: 250px minmax(0, 1fr) 300px;
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
.archive-card h3,
.recent-comments-card h3,
.global-comments-card h3 {
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

.comment-list {
  margin-top: 0.75rem;
  display: grid;
  gap: 0.65rem;
}

.comment-item {
  border-radius: 12px;
  border: 1px solid var(--xb-border);
  padding: 0.56rem;
  background: color-mix(in srgb, var(--xb-surface-soft) 68%, transparent 32%);
}

.comment-item__text {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.42;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.comment-item__meta {
  margin-top: 0.45rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.74rem;
  color: var(--xb-muted);
}

.comment-item__meta a {
  font-weight: 600;
}

.comment-error {
  margin-top: 0.5rem;
  border-radius: 10px;
  border: 1px dashed var(--vp-c-danger-1);
  padding: 0.6rem;
  color: var(--vp-c-danger-1);
  font-size: 0.86rem;
}

.global-comments-card__tip {
  margin-top: 0.45rem;
  font-size: 0.84rem;
}

.global-comments-card__error {
  margin-top: 0.5rem;
  border-radius: 10px;
  border: 1px dashed var(--vp-c-danger-1);
  padding: 0.6rem;
  color: var(--vp-c-danger-1);
  font-size: 0.84rem;
}

.global-comments-card__mount {
  margin-top: 0.65rem;
  min-height: 220px;
  min-width: 0;
  overflow-x: hidden;
}

.global-comments-card__mount :deep(.tk-meta-input) {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.56rem;
}

.global-comments-card__mount :deep(.tk-meta-input > *),
.global-comments-card__mount :deep(.tk-meta-input .tk-meta-input-item),
.global-comments-card__mount :deep(.tk-meta-input .tk-input),
.global-comments-card__mount :deep(.tk-meta-input .el-input) {
  margin-left: 0 !important;
}

.global-comments-card__mount :deep(.tk-meta-input .tk-input),
.global-comments-card__mount :deep(.tk-meta-input .el-input),
.global-comments-card__mount :deep(.tk-meta-input input) {
  width: 100%;
  min-width: 0;
}

.global-comments-card__mount :deep(.tk-meta-input .el-input__inner),
.global-comments-card__mount :deep(.tk-meta-input input) {
  border-radius: 10px;
  border: 1px solid var(--xb-border);
  background: color-mix(in srgb, var(--xb-surface-soft) 72%, transparent 28%);
  min-height: 40px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
}

.global-comments-card__mount :deep(.tk-meta-input .el-input__inner) {
  padding-left: 2.15rem;
}

.global-comments-card__mount :deep(.tk-meta-input .el-input__prefix) {
  left: 0.7rem;
  width: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--xb-accent-strong);
}

.global-comments-card__mount :deep(.tk-meta-input .el-input__icon) {
  line-height: 1;
  font-size: 0.92rem;
}

@media (max-width: 1200px) {
  .blog-layout {
    grid-template-columns: 220px minmax(0, 1fr) 280px;
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
