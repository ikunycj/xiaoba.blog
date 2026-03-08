<template>
  <section class="xb-float-comment" :class="{ 'xb-float-comment--open': isOpen }">
    <button
      type="button"
      class="xb-float-comment__toggle"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? '收起评论卡片' : '展开评论卡片'"
      @click="toggleOpen"
    >
      <span class="xb-float-comment__toggle-dot" />
      <span>{{ isOpen ? '收起评论' : '展开评论' }}</span>
    </button>

    <transition name="xb-float-card">
      <article v-if="isOpen" class="xb-float-comment__panel">
        <header v-if="title && title.trim().length > 0" class="xb-float-comment__header">
          <p class="xb-eyebrow">Comment</p>
          <h3>{{ title }}</h3>
        </header>
        <p v-if="description" class="xb-float-comment__tip">{{ description }}</p>

        <p v-if="errorMessage" class="xb-float-comment__error">{{ errorMessage }}</p>
        <p v-else-if="loading && !mountedOnce" class="xb-float-comment__tip">评论区加载中...</p>

        <div ref="containerRef" class="xb-float-comment__mount" />
      </article>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { loadTwikoo } from '../utils/twikoo'
import { ensureTwikooEndpointReady } from '../utils/twikooEndpoint'
import { formatTwikooError } from '../utils/twikooError'
import { setupTwikooProfileCache } from '../utils/twikooProfileCache'

type TwikooThemeConfig = {
  envId?: string
  region?: string
  lang?: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    commentPath: string
    defaultOpen?: boolean
    storageKey?: string
  }>(),
  {
    title: '评论卡片',
    description: '支持 Markdown。昵称、QQ 邮箱、网址会自动记忆。',
    defaultOpen: false,
    storageKey: '',
  }
)

const { theme } = useData()
const isOpen = ref(!!props.defaultOpen)
const loading = ref(false)
const mountedOnce = ref(false)
const errorMessage = ref('')
const containerRef = ref<HTMLElement | null>(null)
let mountCounter = 0
let stopProfileCache: (() => void) | null = null

const twikooConfig = computed<TwikooThemeConfig>(() => {
  return ((theme.value as Record<string, unknown>).twikoo as TwikooThemeConfig) || {}
})

function normalizeEnvId(envId: string): string {
  const trimmed = envId.trim()
  if (!/^https?:\/\//i.test(trimmed)) return trimmed
  return trimmed.replace(/\/+$/, '')
}

function resolveStorageKey(path: string): string {
  if (props.storageKey.trim().length > 0) return props.storageKey.trim()
  return `xb:twikoo:profile:${path}`
}

function cleanupProfileCache(): void {
  stopProfileCache?.()
  stopProfileCache = null
}

function toggleOpen(): void {
  isOpen.value = !isOpen.value
}

async function mountCommentPanel(): Promise<void> {
  if (!isOpen.value || !containerRef.value) {
    cleanupProfileCache()
    return
  }

  const envId = normalizeEnvId(twikooConfig.value.envId || '')
  if (!envId) {
    errorMessage.value = '缺少评论配置：请先设置 twikoo.envId。'
    cleanupProfileCache()
    return
  }

  const currentMount = ++mountCounter
  const mountId = `xb-float-comment-${currentMount}`
  containerRef.value.innerHTML = `<div id="${mountId}"></div>`
  loading.value = true
  errorMessage.value = ''

  try {
    await ensureTwikooEndpointReady(envId)
    const twikoo = await loadTwikoo()
    if (currentMount !== mountCounter) return

    await twikoo.init({
      envId,
      region: twikooConfig.value.region || undefined,
      lang: twikooConfig.value.lang || 'zh-CN',
      el: `#${mountId}`,
      path: props.commentPath,
    })

    cleanupProfileCache()
    stopProfileCache = setupTwikooProfileCache(containerRef.value, resolveStorageKey(props.commentPath))
    mountedOnce.value = true
  } catch (error) {
    errorMessage.value = formatTwikooError(error, envId)
    cleanupProfileCache()
  } finally {
    loading.value = false
  }
}

watch(
  () => [isOpen.value, twikooConfig.value.envId, twikooConfig.value.region, twikooConfig.value.lang, props.commentPath],
  async () => {
    await nextTick()
    await mountCommentPanel()
  }
)

onMounted(async () => {
  await nextTick()
  await mountCommentPanel()
})

onBeforeUnmount(() => {
  cleanupProfileCache()
})
</script>

<style scoped>
.xb-float-comment {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 36;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.65rem;
  pointer-events: none;
}

.xb-float-comment__toggle,
.xb-float-comment__panel {
  pointer-events: auto;
}

.xb-float-comment__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--xb-accent) 35%, var(--xb-border) 65%);
  background: color-mix(in srgb, var(--xb-surface) 84%, var(--xb-accent-soft) 16%);
  padding: 0.45rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--xb-accent-strong);
  box-shadow: var(--xb-shadow);
}

.xb-float-comment__toggle-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--xb-accent);
}

.xb-float-comment__panel {
  width: min(92vw, 360px);
  max-height: min(72vh, 620px);
  overflow: auto;
  border-radius: 18px;
  border: 1px solid var(--xb-border);
  background: color-mix(in srgb, var(--xb-surface) 96%, var(--xb-surface-soft) 4%);
  padding: 0.85rem;
  box-shadow: var(--xb-shadow);
}

.xb-float-comment__header h3 {
  margin-top: 0.35rem;
  font-size: 1.02rem;
}

.xb-float-comment__tip {
  margin-top: 0.45rem;
  font-size: 0.84rem;
  color: var(--xb-muted);
}

.xb-float-comment__mount {
  margin-top: 0.65rem;
  min-height: 220px;
}

.xb-float-comment__error {
  margin-top: 0.6rem;
  border-radius: 10px;
  border: 1px dashed var(--vp-c-danger-1);
  padding: 0.62rem;
  color: var(--vp-c-danger-1);
  font-size: 0.84rem;
}

.xb-float-comment__mount :deep(.tk-meta-input) {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.56rem;
}

.xb-float-comment__mount :deep(.tk-meta-input > *),
.xb-float-comment__mount :deep(.tk-meta-input .tk-meta-input-item),
.xb-float-comment__mount :deep(.tk-meta-input .tk-input),
.xb-float-comment__mount :deep(.tk-meta-input .el-input) {
  margin-left: 0 !important;
}

.xb-float-comment__mount :deep(.tk-meta-input .tk-input),
.xb-float-comment__mount :deep(.tk-meta-input .el-input),
.xb-float-comment__mount :deep(.tk-meta-input input) {
  width: 100%;
  min-width: 0;
}

.xb-float-comment__mount :deep(.tk-meta-input .el-input__inner),
.xb-float-comment__mount :deep(.tk-meta-input input) {
  border-radius: 10px;
  border: 1px solid var(--xb-border);
  background: color-mix(in srgb, var(--xb-surface-soft) 72%, transparent 28%);
  min-height: 40px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
}

.xb-float-comment__mount :deep(.tk-meta-input .el-input__inner) {
  padding-left: 2.15rem;
}

.xb-float-comment__mount :deep(.tk-meta-input .el-input__prefix) {
  left: 0.7rem;
  width: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--xb-accent-strong);
}

.xb-float-comment__mount :deep(.tk-meta-input .el-input__icon) {
  line-height: 1;
  font-size: 0.92rem;
}

.xb-float-card-enter-active,
.xb-float-card-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.xb-float-card-enter-from,
.xb-float-card-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

@media (max-width: 960px) {
  .xb-float-comment {
    right: 0.6rem;
    bottom: 0.6rem;
  }
}
</style>
