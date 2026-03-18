<template>
  <GiscusPanel v-if="showComment" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import GiscusPanel from './GiscusPanel.vue'

const route = useRoute()
const { frontmatter } = useData()

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
</script>
