<template>
  <div v-if="showComment" class="xiaoba-comments">
    <div class="comments-header">
      <span class="comments-rule" aria-hidden="true"></span>
      <h3 class="comments-title">评论区</h3>
      <span class="comments-rule" aria-hidden="true"></span>
    </div>
    <p class="comments-subtitle">
      欢迎留言、补充或勘误。
    </p>
    <GiscusPanel />
  </div>
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

<style scoped>
.xiaoba-comments {
  margin: 56px auto 24px;
  padding: 24px 0;
  border-top: 1px solid var(--xb-border);
  border-bottom: 1px solid var(--xb-border);
}

.comments-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.comments-rule {
  width: 24px;
  height: 2px;
  background: var(--xb-blush);
}

.comments-title {
  margin: 0;
  color: var(--xb-ink);
  font-size: 1.25rem;
  font-weight: 750;
  line-height: 1.4;
  letter-spacing: 0;
}

.comments-subtitle {
  text-align: center;
  font-size: 1rem;
  color: var(--xb-muted);
  margin-bottom: 2rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .xiaoba-comments {
    padding: 20px 0;
  }

  .comments-title {
    font-size: 1.125rem;
  }
}
</style>
