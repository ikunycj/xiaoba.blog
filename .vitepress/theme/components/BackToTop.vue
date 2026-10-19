<template>
  <Transition name="fade">
    <button
      v-if="isVisible"
      type="button"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="返回顶部"
    >
      <Icon icon="lucide:arrow-up" aria-hidden="true" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--xb-blue, var(--vp-c-brand-1));
  border-radius: 8px;
  color: var(--xb-blue-deep, var(--vp-c-brand-1));
  background: var(--xb-paper, var(--vp-c-bg));
  box-shadow: 2px 2px 0 var(--xb-blue-soft, var(--vp-c-brand-soft));
  cursor: pointer;
  transition: color 180ms ease-out, background-color 180ms ease-out,
    border-color 180ms ease-out, box-shadow 180ms ease-out, transform 180ms ease-out;
  z-index: 50;
}

.back-to-top :deep(svg) {
  width: 18px;
  height: 18px;
}

.back-to-top:hover {
  border-color: var(--xb-blue-deep, var(--vp-c-brand-2));
  color: #ffffff;
  background: var(--xb-blue, var(--vp-c-brand-1));
  box-shadow: 3px 3px 0 var(--xb-blue-soft, var(--vp-c-brand-soft));
  transform: translateY(-2px);
}

.back-to-top:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--xb-yellow, #f2c94c) 78%, transparent);
  outline-offset: 3px;
}

.back-to-top:active {
  box-shadow: none;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-to-top,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
