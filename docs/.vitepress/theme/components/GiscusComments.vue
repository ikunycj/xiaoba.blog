<template>
  <div v-if="showComment" class="xiaoba-comments">
    <div class="comments-header">
      <span class="comments-emoji">💬</span>
      <h3 class="comments-title">小八的评论区</h3>
      <span class="comments-emoji">💬</span>
    </div>
    <p class="comments-subtitle">
      欢迎留下你的想法！小八会认真阅读每一条评论~ 🐾
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
  margin: 4rem 0 2rem;
  padding: 3rem 2.5rem;
  background: linear-gradient(135deg, 
    rgba(255, 183, 197, 0.08) 0%,
    rgba(168, 216, 255, 0.08) 100%
  );
  border: 3px solid var(--xb-border);
  border-radius: 32px;
  box-shadow: var(--xb-shadow);
  position: relative;
  overflow: hidden;
}

.xiaoba-comments::before {
  content: "✨";
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 3rem;
  opacity: 0.1;
  animation: twinkle 3s ease-in-out infinite;
}

.xiaoba-comments::after {
  content: "🐱";
  position: absolute;
  bottom: 20px;
  left: 30px;
  font-size: 3rem;
  opacity: 0.1;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.1;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.2;
    transform: rotate(15deg);
  }
}

.comments-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.comments-emoji {
  font-size: 2rem;
  animation: bounce-emoji 2s ease-in-out infinite;
}

@keyframes bounce-emoji {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.comments-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #FFB7C5, #FFA3B5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--xb-font-cute);
  margin: 0;
}

.comments-subtitle {
  text-align: center;
  font-size: 1.05rem;
  color: var(--xb-muted);
  margin-bottom: 2rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .xiaoba-comments {
    padding: 2rem 1.5rem;
    border-radius: 24px;
  }

  .comments-title {
    font-size: 1.5rem;
  }

  .comments-emoji {
    font-size: 1.5rem;
  }
}
</style>
