<template>
  <section v-if="showComment" class="xb-comments">
    <h2>评论区</h2>
    <p class="xb-comments__tip">
      支持 Markdown。若需附带录音，请在评论里粘贴音频地址（如 mp3/wav/m4a/ogg）。
    </p>
    <div ref="containerRef" class="xb-comments__container" />
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { loadTwikoo } from '../utils/twikoo'
import { ensureTwikooEndpointReady } from '../utils/twikooEndpoint'
import { setupTwikooProfileCache } from '../utils/twikooProfileCache'

interface TwikooThemeConfig {
  envId?: string
  region?: string
  lang?: string
}

const route = useRoute()
const { frontmatter, theme } = useData()
const containerRef = ref<HTMLElement | null>(null)
let mountCounter = 0
let stopProfileCache: (() => void) | null = null

const twikooConfig = computed<TwikooThemeConfig>(() => {
  return ((theme.value as Record<string, unknown>).twikoo as TwikooThemeConfig) || {}
})

const showComment = computed(() => {
  const comment = frontmatter.value?.comment
  if (comment === true) return true
  if (comment === false) return false

  const path = normalizePath(route.path)
  if (/^\/(blog|share|note)\/?$/.test(path)) return false
  return /^\/(blog|share|note)\//.test(path) && !path.endsWith('/index')
})

function normalizePath(path: string): string {
  const plain = path.split('#')[0].split('?')[0]
  return plain.startsWith('/') ? plain : `/${plain}`
}

function normalizeEnvId(envId: string): string {
  const trimmed = envId.trim()
  if (!/^https?:\/\//i.test(trimmed)) return trimmed
  return trimmed.replace(/\/+$/, '')
}

function showError(message: string): void {
  if (!containerRef.value) return
  containerRef.value.innerHTML = `<p class="xb-comments__error">${message}</p>`
}

async function mountComments(): Promise<void> {
  if (!showComment.value || !containerRef.value) {
    stopProfileCache?.()
    stopProfileCache = null
    return
  }

  const envId = normalizeEnvId(twikooConfig.value.envId || '')
  if (!envId) {
    showError('缺少评论配置：请在 docs/.vitepress/config.mts 中设置 themeConfig.twikoo.envId。')
    return
  }

  const currentMount = ++mountCounter
  const mountId = `twikoo-mount-${currentMount}`
  containerRef.value.innerHTML = `<div id="${mountId}"></div>`

  try {
    await ensureTwikooEndpointReady(envId)
    const twikoo = await loadTwikoo()
    if (currentMount !== mountCounter) return

    await twikoo.init({
      envId,
      region: twikooConfig.value.region || undefined,
      lang: twikooConfig.value.lang || 'zh-CN',
      el: `#${mountId}`,
      path: normalizePath(route.path),
    })

    stopProfileCache?.()
    stopProfileCache = setupTwikooProfileCache(containerRef.value)
  } catch (error) {
    const message = error instanceof Error ? error.message : '评论加载失败'
    showError(message)
  }
}

onMounted(async () => {
  await nextTick()
  await mountComments()
})

watch(
  () => [route.path, showComment.value, twikooConfig.value.envId, twikooConfig.value.region, twikooConfig.value.lang],
  async () => {
    await nextTick()
    await mountComments()
  }
)

onBeforeUnmount(() => {
  stopProfileCache?.()
  stopProfileCache = null
})
</script>

<style scoped>
.xb-comments {
  margin-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.xb-comments h2 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.xb-comments__tip {
  margin: 0 0 1rem;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
}

.xb-comments__container {
  min-height: 220px;
}

.xb-comments__container :deep(.tk-meta-input) {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem;
}

.xb-comments__container :deep(.tk-meta-input .tk-input),
.xb-comments__container :deep(.tk-meta-input .el-input),
.xb-comments__container :deep(.tk-meta-input input) {
  width: 100%;
  min-width: 0;
}

.xb-comments__container :deep(.tk-meta-input .el-input__inner),
.xb-comments__container :deep(.tk-meta-input input) {
  border-radius: 10px;
  border: 1px solid var(--xb-border);
  background: color-mix(in srgb, var(--xb-surface-soft) 70%, transparent 30%);
}

.xb-comments__container :deep(.tk-meta-input .el-input__prefix),
.xb-comments__container :deep(.tk-meta-input .el-input__icon) {
  color: var(--xb-accent-strong);
}

.xb-comments__error {
  border-radius: 10px;
  border: 1px dashed var(--vp-c-divider);
  padding: 0.8rem;
  color: var(--vp-c-danger-1);
}
</style>
