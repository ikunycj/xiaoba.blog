<template>
  <section class="xb-comment-bg" aria-label="recent-comment-background">
    <div class="xb-comment-bg__veil" />

    <div v-if="floatingItems.length" class="xb-comment-bg__field">
      <article
        v-for="item in floatingItems"
        :key="item.renderKey"
        class="xb-comment-bubble"
        @animationend="handleBubbleAnimationEnd(item.renderKey)"
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

  <FloatingCommentCard
    comment-path="/home/"
    title="首页留言卡片"
    description="支持 Markdown。填写昵称、QQ 邮箱、网址后将自动记忆。"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { loadTwikoo } from '../../theme/utils/twikoo'
import FloatingCommentCard from '../../theme/components/FloatingCommentCard.vue'

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
const HOME_FOOTER_HIDE_CLASS = 'xb-home-no-footer'
const MAX_VISIBLE_BUBBLES = 6
const FLOATING_TICK_MS = 1_800
const BUBBLE_SIDE_GUTTER_PX = 12
const BUBBLE_DRIFT_GUARD_PX = 24
const loading = ref(false)
const comments = ref<StreamItem[]>([])
const floatingItems = ref<FloatingItem[]>([])
let refreshTimer: ReturnType<typeof setInterval> | null = null
let bubbleTickTimer: ReturnType<typeof setInterval> | null = null

const twikooConfig = computed<TwikooThemeConfig>(() => {
  return ((theme.value as Record<string, unknown>).twikoo as TwikooThemeConfig) || {}
})

const sourceComments = computed<StreamItem[]>(() => {
  const deduped: StreamItem[] = []
  const seen = new Set<string>()
  for (const item of comments.value) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    deduped.push(item)
  }
  return deduped.slice(0, 24)
})

function createFloatingItem(base: StreamItem): FloatingItem {
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const seed = hashCode(`${base.id}-${stamp}`)
  const width = 220 + (seed % 110)

  return {
    ...base,
    renderKey: `${base.id}-${stamp}`,
    left: resolveSafeLeft(width),
    delay: Number(((seed % 7) / 10).toFixed(2)),
    duration: 10 + (seed % 7),
    width,
    opacity: Number((0.45 + (seed % 28) / 100).toFixed(2)),
    drift: ((Math.floor(seed / 11) % 36) - 18),
  }
}

function handleBubbleAnimationEnd(renderKey: string): void {
  const next = floatingItems.value.filter((item) => item.renderKey !== renderKey)
  if (next.length === floatingItems.value.length) return
  floatingItems.value = next
  tickFloatingItems()
}

function pickRandom<T>(items: T[]): T {
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}

function tickFloatingItems(): void {
  const source = sourceComments.value
  if (source.length === 0) {
    floatingItems.value = []
    return
  }

  const sourceIds = new Set(source.map((item) => item.id))
  const uniqueCurrent: FloatingItem[] = []
  const currentSeen = new Set<string>()

  floatingItems.value.forEach((item) => {
    if (!sourceIds.has(item.id) || currentSeen.has(item.id)) return
    currentSeen.add(item.id)
    uniqueCurrent.push(item)
  })

  const maxVisible = Math.min(MAX_VISIBLE_BUBBLES, source.length)
  if (uniqueCurrent.length < maxVisible) {
    const currentIds = new Set(uniqueCurrent.map((item) => item.id))
    const candidates = source.filter((item) => !currentIds.has(item.id))
    if (candidates.length > 0) {
      uniqueCurrent.push(createFloatingItem(pickRandom(candidates)))
    }
    floatingItems.value = uniqueCurrent
    return
  }

  const currentIds = new Set(uniqueCurrent.map((item) => item.id))
  const offscreenCandidates = source.filter((item) => !currentIds.has(item.id))
  if (offscreenCandidates.length === 0) {
    floatingItems.value = uniqueCurrent
    return
  }

  const next = uniqueCurrent.slice()
  const replaceIndex = Math.floor(Math.random() * next.length)
  next[replaceIndex] = createFloatingItem(pickRandom(offscreenCandidates))
  floatingItems.value = next
}

function hashCode(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return hash
}

function resolveSafeLeft(width: number): number {
  if (typeof window === 'undefined') return 50

  const viewportWidth = Math.max(window.innerWidth || 0, 320)
  const bubbleWidth = Math.min(width, viewportWidth * 0.86)
  const safePadding = BUBBLE_SIDE_GUTTER_PX + BUBBLE_DRIFT_GUARD_PX
  const minLeft = safePadding
  const maxLeft = Math.max(minLeft, viewportWidth - bubbleWidth - safePadding)
  const leftPx = minLeft + Math.random() * Math.max(0, maxLeft - minLeft)
  return Number(((leftPx / viewportWidth) * 100).toFixed(2))
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
    if (floatingItems.value.length === 0) {
      tickFloatingItems()
    }
  } catch {
    comments.value = []
    floatingItems.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  document.documentElement.classList.add(HOME_FOOTER_HIDE_CLASS)
  await refreshComments()

  const initialWarmup = Math.min(3, sourceComments.value.length)
  for (let i = 0; i < initialWarmup; i += 1) {
    tickFloatingItems()
  }

  bubbleTickTimer = setInterval(() => {
    tickFloatingItems()
  }, FLOATING_TICK_MS)

  refreshTimer = setInterval(() => {
    void refreshComments()
  }, 60_000)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove(HOME_FOOTER_HIDE_CLASS)
  if (bubbleTickTimer) {
    clearInterval(bubbleTickTimer)
    bubbleTickTimer = null
  }
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
  left: clamp(1rem, var(--xb-left), calc(100% - min(86vw, var(--xb-width)) - 1rem));
  bottom: -160px;
  width: min(86vw, var(--xb-width));
  padding: 0.72rem 0.82rem;
  border-radius: 14px;
  border: 1px solid rgb(148 163 184 / 45%);
  backdrop-filter: blur(8px);
  background: linear-gradient(145deg, rgb(15 23 42 / 72%), rgb(30 41 59 / 58%));
  color: rgb(248 250 252 / 99%);
  box-shadow: 0 16px 40px rgb(15 23 42 / 22%);
  opacity: var(--xb-opacity);
  pointer-events: auto;
  animation: xb-float-up var(--xb-duration) linear 1 both;
  animation-delay: var(--xb-delay);
}

.xb-comment-bubble:hover,
.xb-comment-bubble:focus-within {
  animation-play-state: paused;
}

.xb-comment-bubble__text {
  margin: 0;
  line-height: 1.45;
  font-size: 0.86rem;
  text-shadow: 0 1px 1px rgb(2 6 23 / 45%);
}

.xb-comment-bubble__meta {
  margin-top: 0.45rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.74rem;
  color: rgb(226 232 240 / 96%);
}

.xb-comment-bubble__meta a {
  color: rgb(125 211 252 / 100%);
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

:global(.xb-home-no-footer .VPFooter) {
  display: none;
}

@keyframes xb-float-up {
  0% {
    transform: translate3d(0, 0, 0) scale(0.94);
    opacity: 0;
  }
  6% {
    opacity: var(--xb-opacity);
  }
  85% {
    opacity: var(--xb-opacity);
  }
  100% {
    transform: translate3d(var(--xb-drift), calc(-100vh - 280px), 0) scale(1.05);
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


