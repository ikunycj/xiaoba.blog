<template>
  <section class="xb-giscus">
    <header v-if="hasHeader" class="xb-giscus__header">
      <p v-if="eyebrow" class="xb-eyebrow">{{ eyebrow }}</p>
      <h3 v-if="title">{{ title }}</h3>
      <p v-if="description" class="xb-giscus__tip">{{ description }}</p>
    </header>

    <p v-if="resolvedError" class="xb-giscus__error">{{ resolvedError }}</p>
    <div v-else ref="containerRef" class="xb-giscus__container" />
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

type GiscusThemeConfig = {
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number'
  term?: string
  strict?: '0' | '1'
  reactionsEnabled?: '0' | '1'
  emitMetadata?: '0' | '1'
  inputPosition?: 'top' | 'bottom'
  lang?: string
  theme?: string
  lightTheme?: string
  darkTheme?: string
  loading?: 'lazy' | 'eager'
}

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    mapping?: GiscusThemeConfig['mapping'] | ''
    term?: string
    strict?: GiscusThemeConfig['strict']
    reactionsEnabled?: GiscusThemeConfig['reactionsEnabled']
    emitMetadata?: GiscusThemeConfig['emitMetadata']
    inputPosition?: GiscusThemeConfig['inputPosition']
    loading?: GiscusThemeConfig['loading']
  }>(),
  {
    eyebrow: '',
    title: '',
    description: '',
    mapping: '',
    term: '',
    strict: undefined,
    reactionsEnabled: undefined,
    emitMetadata: undefined,
    inputPosition: undefined,
    loading: undefined,
  }
)

const route = useRoute()
const { theme, isDark } = useData()
const containerRef = ref<HTMLElement | null>(null)
let mountCounter = 0

const giscusConfig = computed<GiscusThemeConfig>(() => {
  return ((theme.value as Record<string, unknown>).giscus as GiscusThemeConfig) || {}
})

const hasHeader = computed(() => {
  return !!(props.eyebrow || props.title || props.description)
})

const resolvedMapping = computed<GiscusThemeConfig['mapping']>(() => {
  return props.mapping || giscusConfig.value.mapping || 'pathname'
})

const resolvedTerm = computed(() => {
  return props.term || giscusConfig.value.term || ''
})

const resolvedTheme = computed(() => {
  if (isDark.value) {
    return giscusConfig.value.darkTheme || giscusConfig.value.theme || 'dark'
  }
  return giscusConfig.value.lightTheme || giscusConfig.value.theme || 'light'
})

const resolvedError = computed(() => {
  const missing: string[] = []

  if (!giscusConfig.value.repo) missing.push('repo')
  if (!giscusConfig.value.repoId) missing.push('repoId')
  if (!giscusConfig.value.category) missing.push('category')
  if (!giscusConfig.value.categoryId) missing.push('categoryId')
  if ((resolvedMapping.value === 'specific' || resolvedMapping.value === 'number') && !resolvedTerm.value) {
    missing.push('term')
  }

  if (missing.length === 0) return ''
  return `Giscus 尚未完成配置，请先在 docs/.vitepress/config.mts 中补齐：${missing.join(', ')}。`
})

function applyTheme(): void {
  const iframe = containerRef.value?.querySelector('iframe.giscus-frame') as HTMLIFrameElement | null
  if (!iframe?.contentWindow) return

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: resolvedTheme.value,
        },
      },
    },
    'https://giscus.app'
  )
}

function mountGiscus(): void {
  if (!containerRef.value) return

  if (resolvedError.value) {
    containerRef.value.innerHTML = ''
    return
  }

  const currentMount = ++mountCounter
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'

  script.setAttribute('data-repo', giscusConfig.value.repo || '')
  script.setAttribute('data-repo-id', giscusConfig.value.repoId || '')
  script.setAttribute('data-category', giscusConfig.value.category || '')
  script.setAttribute('data-category-id', giscusConfig.value.categoryId || '')
  script.setAttribute('data-mapping', resolvedMapping.value || 'pathname')
  script.setAttribute('data-strict', props.strict ?? giscusConfig.value.strict ?? '0')
  script.setAttribute('data-reactions-enabled', props.reactionsEnabled ?? giscusConfig.value.reactionsEnabled ?? '1')
  script.setAttribute('data-emit-metadata', props.emitMetadata ?? giscusConfig.value.emitMetadata ?? '0')
  script.setAttribute('data-input-position', props.inputPosition ?? giscusConfig.value.inputPosition ?? 'bottom')
  script.setAttribute('data-lang', giscusConfig.value.lang || 'zh-CN')
  script.setAttribute('data-theme', resolvedTheme.value)
  script.setAttribute('data-loading', props.loading ?? giscusConfig.value.loading ?? 'lazy')

  if (resolvedTerm.value) {
    script.setAttribute('data-term', resolvedTerm.value)
  }

  script.addEventListener('load', () => {
    if (currentMount !== mountCounter) return
    window.setTimeout(() => applyTheme(), 120)
  })

  containerRef.value.innerHTML = ''
  containerRef.value.appendChild(script)
}

onMounted(async () => {
  await nextTick()
  mountGiscus()
})

watch(
  () => [
    route.path,
    giscusConfig.value.repo,
    giscusConfig.value.repoId,
    giscusConfig.value.category,
    giscusConfig.value.categoryId,
    giscusConfig.value.mapping,
    giscusConfig.value.term,
    giscusConfig.value.strict,
    giscusConfig.value.reactionsEnabled,
    giscusConfig.value.emitMetadata,
    giscusConfig.value.inputPosition,
    giscusConfig.value.lang,
    giscusConfig.value.lightTheme,
    giscusConfig.value.darkTheme,
    giscusConfig.value.theme,
    giscusConfig.value.loading,
    props.mapping,
    props.term,
    props.strict,
    props.reactionsEnabled,
    props.emitMetadata,
    props.inputPosition,
    props.loading,
  ],
  async () => {
    await nextTick()
    mountGiscus()
  }
)

watch(
  () => resolvedTheme.value,
  () => {
    applyTheme()
  }
)

onBeforeUnmount(() => {
  mountCounter += 1
})
</script>

<style scoped>
.xb-giscus__header h3 {
  margin-top: 0.35rem;
  font-size: 1.05rem;
}

.xb-giscus__tip {
  margin-top: 0.45rem;
  font-size: 0.86rem;
  color: var(--xb-muted);
}

.xb-giscus__container {
  min-height: 220px;
}

.xb-giscus__error {
  border-radius: 12px;
  border: 1px dashed var(--vp-c-divider);
  padding: 0.75rem 0.85rem;
  color: var(--vp-c-danger-1);
  font-size: 0.86rem;
  line-height: 1.5;
}
</style>
