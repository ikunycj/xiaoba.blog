<template>
  <section class="xb-comment-bg" aria-label="recent-comment-background">
    <div class="xb-comment-bg__veil" />

    <div v-if="floatingItems.length" class="xb-comment-bg__field">
      <article
        v-for="item in floatingItems"
        :key="item.renderKey"
        class="xb-comment-bubble"
        :style="{
          '--xb-left': `${item.left}%`,
          '--xb-delay': `${item.delay}s`,
          '--xb-duration': `${item.duration}s`,
          '--xb-width': `${item.width}px`,
          '--xb-opacity': `${item.opacity}`,
          '--xb-drift': `${item.drift}px`,
        }"
      >
        <p class="xb-comment-bubble__text">{{ item.commentText }}</p>
        <div class="xb-comment-bubble__meta">
          <span>{{ item.nick }}</span>
          <a :href="item.articleHref" target="_blank" rel="noopener noreferrer">查看文章</a>
        </div>
        <audio
          v-if="item.audioUrl"
          class="xb-comment-bubble__audio"
          controls
          preload="none"
          :src="item.audioUrl"
        />
      </article>
    </div>

    <div v-else class="xb-comment-bg__status">
      <p v-if="loading">评论流加载中...</p>
      <p v-else>暂无评论。先到文章页发布第一条留言吧。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { loadTwikoo } from '../../theme/utils/twikoo'

interface TwikooThemeConfig {
  envId?: string
  region?: string
  siteUrl?: string
}

interface RecentCommentItem {
  id: string
  nick: string
  url: string
  commentText: string
}

interface StreamItem {
  id: string
  nick: string
  articleHref: string
  commentText: string
  audioUrl: string
}

interface FloatingItem extends StreamItem {
  renderKey: string
  left: number
  delay: number
  duration: number
  width: number
  opacity: number
  drift: number
}

const { theme } = useData()
const loading = ref(false)
const comments = ref<StreamItem[]>([])
let refreshTimer: ReturnType<typeof setInterval> | null = null

const twikooConfig = computed<TwikooThemeConfig>(() => {
  return ((theme.value as Record<string, unknown>).twikoo as TwikooThemeConfig) || {}
})

const floatingItems = computed<FloatingItem[]>(() => {
  if (comments.value.length === 0) return []

  const total = Math.min(36, Math.max(12, comments.value.length * 3))
  return Array.from({ length: total }, (_value, index) => {
    const base = comments.value[index % comments.value.length]
    const seed = hashCode(`${base.id}-${index}`)

    return {
      ...base,
      renderKey: `${base.id}-${index}`,
      left: 4 + (seed % 92),
      delay: -1 * (seed % 30),
      duration: 16 + (seed % 18),
      width: 220 + (seed % 130),
      opacity: Number((0.36 + (seed % 34) / 100).toFixed(2)),
      drift: ((Math.floor(seed / 11) % 40) - 20),
    }
  })
})

function hashCode(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return hash
}

function normalizePath(url: string): string {
  if (!url) return '/'
  if (/^https?:\/\//i.test(url)) {
    try {
      return new URL(url).pathname || '/'
    } catch {
      return '/'
    }
  }
  return url.startsWith('/') ? url : `/${url}`
}

function normalizeEnvId(envId: string): string {
  const trimmed = envId.trim()
  if (!/^https?:\/\//i.test(trimmed)) return trimmed
  return trimmed.replace(/\/+$/, '')
}

function stripHtml(input: string): string {
  return (input || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function findAudioUrl(input: string): string {
  const audioByExt = input.match(
    /https?:\/\/[^\s)]+?\.(?:mp3|wav|m4a|ogg|aac|flac)(?:\?[^\s)]*)?/i
  )
  if (audioByExt?.[0]) return audioByExt[0]

  const markdownAudio = input.match(/\[(?:audio|录音)]\((https?:\/\/[^)]+)\)/i)
  return markdownAudio?.[1] || ''
}

function summarizeText(input: string): string {
  const clean = stripHtml(input)
  if (clean.length <= 120) return clean
  return `${clean.slice(0, 120)}...`
}

function toStreamItem(item: RecentCommentItem, siteUrl: string): StreamItem {
  const path = normalizePath(item.url)
  const audioUrl = findAudioUrl(item.commentText)
  const text = summarizeText(item.commentText).replace(audioUrl, '').trim()

  return {
    id: item.id,
    nick: item.nick || '匿名用户',
    articleHref: `${siteUrl.replace(/\/$/, '')}${path}`,
    commentText: text || '（该评论仅包含附件或链接）',
    audioUrl,
  }
}

async function refreshComments(): Promise<void> {
  const envId = normalizeEnvId(twikooConfig.value.envId || '')
  if (!envId) return

  loading.value = true
  try {
    const twikoo = await loadTwikoo()
    const result = await twikoo.getRecentComments({
      envId,
      region: twikooConfig.value.region || undefined,
      pageSize: 24,
      includeReply: false,
    })

    const siteUrl = (twikooConfig.value.siteUrl || 'https://xiaoba.blog').trim()
    comments.value = (Array.isArray(result) ? result : [])
      .map((item) => item as RecentCommentItem)
      .filter((item) => !!item?.id)
      .map((item) => toStreamItem(item, siteUrl))
  } catch {
    comments.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await refreshComments()
  refreshTimer = setInterval(() => {
    void refreshComments()
  }, 60_000)
})

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
})
</script>

<style scoped>
.xb-comment-bg {
  position: fixed;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.xb-comment-bg__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 14% 10%, rgb(255 255 255 / 18%), transparent 40%),
    radial-gradient(circle at 86% 16%, rgb(56 189 248 / 14%), transparent 46%),
    linear-gradient(to top, rgb(15 23 42 / 26%), rgb(15 23 42 / 8%) 42%, rgb(15 23 42 / 0%));
}

.xb-comment-bg__field {
  position: absolute;
  inset: 0;
}

.xb-comment-bubble {
  position: absolute;
  left: var(--xb-left);
  bottom: -220px;
  width: min(86vw, var(--xb-width));
  padding: 0.72rem 0.82rem;
  border-radius: 14px;
  border: 1px solid rgb(255 255 255 / 28%);
  backdrop-filter: blur(8px);
  background: linear-gradient(145deg, rgb(255 255 255 / 28%), rgb(148 163 184 / 16%));
  color: rgb(248 250 252 / 96%);
  box-shadow: 0 16px 40px rgb(15 23 42 / 22%);
  opacity: var(--xb-opacity);
  pointer-events: auto;
  animation: xb-float-up var(--xb-duration) linear infinite;
  animation-delay: var(--xb-delay);
}

.xb-comment-bubble__text {
  margin: 0;
  line-height: 1.45;
  font-size: 0.86rem;
}

.xb-comment-bubble__meta {
  margin-top: 0.45rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.74rem;
  color: rgb(241 245 249 / 86%);
}

.xb-comment-bubble__meta a {
  color: rgb(186 230 253 / 96%);
  text-decoration: underline;
}

.xb-comment-bubble__audio {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  height: 30px;
}

.xb-comment-bg__status {
  position: absolute;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  border-radius: 999px;
  padding: 0.5rem 0.92rem;
  color: rgb(241 245 249 / 90%);
  border: 1px solid rgb(255 255 255 / 28%);
  background: rgb(15 23 42 / 34%);
  backdrop-filter: blur(8px);
  font-size: 0.84rem;
}

.xb-comment-bg__status p {
  margin: 0;
}

:global(.VPHome) {
  position: relative;
  isolation: isolate;
}

:global(.VPHome .VPHomeHero),
:global(.VPHome .VPHomeFeatures),
:global(.VPHome .container) {
  position: relative;
  z-index: 2;
}

@keyframes xb-float-up {
  0% {
    transform: translate3d(0, 0, 0) scale(0.94);
    opacity: 0;
  }
  10% {
    opacity: var(--xb-opacity);
  }
  85% {
    opacity: var(--xb-opacity);
  }
  100% {
    transform: translate3d(var(--xb-drift), calc(-100vh - 320px), 0) scale(1.05);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .xb-comment-bubble {
    border-radius: 12px;
    padding: 0.62rem 0.72rem;
  }

  .xb-comment-bubble__text {
    font-size: 0.8rem;
  }

  .xb-comment-bubble__meta {
    font-size: 0.7rem;
  }
}
</style>
