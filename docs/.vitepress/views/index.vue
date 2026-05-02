<template>
  <div class="xiaoba-landing">
    <!-- 可爱的飘浮装饰 -->
    <div class="floating-decorations">
      <div class="deco deco-1">🐱</div>
      <div class="deco deco-2">✨</div>
      <div class="deco deco-3">🌸</div>
      <div class="deco deco-4">💖</div>
      <div class="deco deco-5">🐾</div>
      <div class="deco deco-6">⭐</div>
    </div>

    <!-- 主内容区 -->
    <div class="content-container">
      <!-- 小八 Logo 与名字 -->
      <div class="xiaoba-avatar-section">
        <div class="avatar-wrapper">
          <img src="/xiaoba-logo.png" alt="小八" class="avatar-img" />
          <div class="avatar-ring"></div>
          <div class="avatar-sparkle sparkle-1">✨</div>
          <div class="avatar-sparkle sparkle-2">💫</div>
        </div>
        <h1 class="xiaoba-name">
          <span class="name-text">小八</span>
          <span class="name-subtitle">Xiaoba</span>
        </h1>
      </div>

      <!-- 欢迎卡片 -->
      <div class="welcome-card">
        <div class="card-header">
          <span class="wave-hand">👋</span>
          <span class="greeting-text">欢迎来到小八的小窝</span>
        </div>
        
        <p class="welcome-tagline">
          一只爱写代码的小八<br/>
          记录技术学习 · 分享成长故事 · 探索AI世界
        </p>

        <!-- 小标签 -->
        <div class="tags-row">
          <span class="cute-tag">🤖 AI 探索者</span>
          <span class="cute-tag">💻 全栈开发</span>
          <span class="cute-tag">📝 技术写作</span>
        </div>

        <!-- 统计卡片 -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-emoji">📚</div>
            <div class="stat-number">600+</div>
            <div class="stat-label">技术笔记</div>
          </div>
          <div class="stat-card">
            <div class="stat-emoji">✍️</div>
            <div class="stat-number">10+</div>
            <div class="stat-label">技术文章</div>
          </div>
          <div class="stat-card">
            <div class="stat-emoji">🚀</div>
            <div class="stat-number">4</div>
            <div class="stat-label">开源项目</div>
          </div>
        </div>

        <!-- CTA 按钮 -->
        <div class="action-buttons">
          <button @click="router.go('./home')" class="btn-primary">
            <span class="btn-icon">🎉</span>
            <span>进入博客</span>
            <span class="btn-arrow">→</span>
          </button>
          <button @click="gotoGithub" class="btn-secondary">
            <Icon icon="fa:github" class="btn-icon-svg" />
            <span>GitHub</span>
          </button>
        </div>
      </div>

      <!-- 底部装饰 -->
      <div class="footer-deco">
        <span class="footer-emoji">🐾</span>
        <span class="footer-text">"You can call me 小八"</span>
        <span class="footer-emoji">🐾</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vitepress'
import { Icon } from '@iconify/vue'

const router = useRouter()

const gotoGithub = () => {
  window.open('https://github.com/ikunycj', '_blank')
}
</script>

<style scoped>
.xiaoba-landing {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    linear-gradient(135deg, #FFF8EF 0%, #FFF4E8 50%, #FFEFD8 100%);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
}

@keyframes gradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 飘浮装饰 */
.floating-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.deco {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.4;
  animation: float-random 10s ease-in-out infinite;
}

.deco-1 { top: 10%; left: 10%; animation-delay: 0s; }
.deco-2 { top: 15%; right: 15%; animation-delay: 2s; }
.deco-3 { bottom: 20%; left: 20%; animation-delay: 4s; }
.deco-4 { bottom: 15%; right: 10%; animation-delay: 1s; }
.deco-5 { top: 50%; left: 5%; animation-delay: 3s; }
.deco-6 { top: 40%; right: 8%; animation-delay: 5s; }

@keyframes float-random {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -20px) rotate(5deg);
  }
  50% {
    transform: translate(-15px, -10px) rotate(-5deg);
  }
  75% {
    transform: translate(20px, 15px) rotate(3deg);
  }
}

/* 内容容器 */
.content-container {
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 90%;
  animation: bounceIn 1s ease-out;
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 头像区域 */
.xiaoba-avatar-section {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.avatar-img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 5px solid #FFB7C5;
  box-shadow: 
    0 10px 30px rgba(255, 183, 197, 0.4),
    0 0 0 10px rgba(255, 183, 197, 0.1);
  transition: all 0.3s ease;
}

.avatar-img:hover {
  transform: scale(1.1) rotate(5deg);
}

.avatar-ring {
  position: absolute;
  inset: -15px;
  border: 3px dashed #FFB7C5;
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.avatar-sparkle {
  position: absolute;
  font-size: 1.5rem;
  animation: twinkle 2s ease-in-out infinite;
}

.sparkle-1 {
  top: -10px;
  right: -10px;
  animation-delay: 0s;
}

.sparkle-2 {
  bottom: -10px;
  left: -10px;
  animation-delay: 1s;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.3) rotate(180deg);
  }
}

/* 名字样式 */
.xiaoba-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.name-text {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FFB7C5 0%, #FFA3B5 50%, #FF90A8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 0 rgba(255, 255, 255, 0.5);
  animation: nameGlow 3s ease-in-out infinite;
}

@keyframes nameGlow {
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(255, 183, 197, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(255, 183, 197, 0.8));
  }
}

.name-subtitle {
  font-size: 1.1rem;
  color: #9B8B7E;
  font-weight: 600;
  font-style: italic;
}

/* 欢迎卡片 */
.welcome-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 4px solid #FFB7C5;
  padding: 2.5rem;
  box-shadow: 
    0 20px 60px rgba(255, 183, 197, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.4s ease;
}

.welcome-card:hover {
  transform: translateY(-5px) rotate(-1deg);
  box-shadow: 
    0 25px 80px rgba(255, 183, 197, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.wave-hand {
  font-size: 2rem;
  display: inline-block;
  animation: wave 2.5s ease-in-out infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0%, 60%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(-15deg); }
  20%, 40% { transform: rotate(15deg); }
  50% { transform: rotate(10deg); }
}

.greeting-text {
  font-size: 1.4rem;
  font-weight: 700;
  color: #5C4D3C;
}

/* 标语 */
.welcome-tagline {
  text-align: center;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #7A6B5E;
  margin-bottom: 1.5rem;
}

/* 可爱标签 */
.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.cute-tag {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #FFF4B8 0%, #FFEFC8 100%);
  border: 2px solid #FFD700;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #7A6B5E;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
}

.cute-tag:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
}

/* 统计卡片 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #A8D8FF 0%, #C5E6FF 100%);
  border: 3px solid #A8D8FF;
  border-radius: 20px;
  padding: 1.2rem 0.8rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 10px 30px rgba(168, 216, 255, 0.4);
}

.stat-emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 900;
  color: white;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

/* 按钮 */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border-radius: 16px;
  font-size: 1.05rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, #FFB7C5 0%, #FF90A8 100%);
  color: white;
  flex: 1;
}

.btn-primary:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 24px rgba(255, 183, 197, 0.5);
}

.btn-primary:active {
  transform: translateY(-2px) scale(1.02);
}

.btn-secondary {
  background: rgba(168, 216, 255, 0.3);
  color: #5C4D3C;
  border: 3px solid #A8D8FF;
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: #A8D8FF;
  color: white;
  transform: translateY(-4px) scale(1.05);
}

.btn-icon {
  font-size: 1.3rem;
}

.btn-icon-svg {
  width: 24px;
  height: 24px;
}

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(5px);
}

/* 底部装饰 */
.footer-deco {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
  opacity: 0.7;
}

.footer-emoji {
  font-size: 1.2rem;
  animation: bounce-paw 2s ease-in-out infinite;
}

@keyframes bounce-paw {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.footer-text {
  font-size: 0.95rem;
  color: #9B8B7E;
  font-style: italic;
  font-weight: 600;
}

/* 响应式 */
@media (max-width: 768px) {
  .welcome-card {
    padding: 2rem 1.5rem;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .deco {
    font-size: 1.8rem;
  }

  .avatar-img {
    width: 120px;
    height: 120px;
  }

  .name-text {
    font-size: 2.5rem;
  }
}
</style>
