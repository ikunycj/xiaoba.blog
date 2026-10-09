<template>
  <main class="xiaoba-home">
    <section class="hero" aria-labelledby="home-title">
      <span class="sky-cloud sky-cloud--one" aria-hidden="true"></span>
      <span class="sky-cloud sky-cloud--two" aria-hidden="true"></span>
      <span class="sky-cloud sky-cloud--three" aria-hidden="true"></span>
      <div class="shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">
            <Icon icon="lucide:sparkles" aria-hidden="true" />
            技术记录
          </p>

          <h1 id="home-title">小八博客</h1>
          <p class="hero-lead">
            写代码、记笔记，偶尔分享一些有趣的发现。
          </p>

          <div class="hero-actions" aria-label="首页快捷入口">
            <a class="button button-primary" href="/blog/">
              <Icon icon="lucide:book-open" aria-hidden="true" />
              阅读博客
              <Icon class="button-arrow" icon="lucide:arrow-right" aria-hidden="true" />
            </a>
            <a class="button button-secondary" href="/note/">
              <Icon icon="lucide:notebook-tabs" aria-hidden="true" />
              翻翻笔记
            </a>
            <a
              class="button button-github"
              href="https://github.com/ikunycj/xiaoba.blog"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="在 GitHub 查看小八博客源码"
            >
              <Icon icon="lucide:github" aria-hidden="true" />
              GitHub 源码
            </a>
          </div>

        </div>

        <figure class="hero-visual">
          <img
            src="/xiaoba/xiaoba-coding.jpg"
            alt="小八坐在电脑前陪我写代码"
            width="720"
            height="720"
            fetchpriority="high"
          />
          <figcaption>
            <span class="status-dot" aria-hidden="true"></span>
            正在写代码
          </figcaption>
        </figure>
      </div>
    </section>

    <section id="recent-posts" class="section recent-section" aria-labelledby="recent-title">
      <div class="shell">
        <header class="section-heading">
          <div>
            <p class="section-kicker">
              <Icon icon="lucide:pen-line" aria-hidden="true" />
              最近在写
            </p>
            <h2 id="recent-title">最近写下的文章</h2>
          </div>
          <a class="section-link" href="/blog/">
            全部文章
            <Icon icon="lucide:arrow-right" aria-hidden="true" />
          </a>
        </header>

        <div v-if="recentPosts.length > 0" class="post-grid">
          <article
            v-for="(post, index) in recentPosts"
            :key="post.url"
            class="post-card"
            :class="{ 'post-card-featured': index === 0 }"
          >
            <div class="post-meta">
              <span>
                <Icon icon="lucide:calendar-days" aria-hidden="true" />
                {{ post.publishedText }}
              </span>
              <span class="post-topic">{{ post.section }}</span>
            </div>
            <span v-if="index === 0" class="post-card-note">最新</span>
            <span v-else-if="index === 1" class="post-card-note post-card-note--pink">最近更新</span>
            <h3>
              <a :href="post.url">{{ post.title }}</a>
            </h3>
            <p>{{ post.summary }}</p>
            <a class="read-link" :href="post.url">
              阅读全文
              <Icon icon="lucide:arrow-up-right" aria-hidden="true" />
            </a>
          </article>
        </div>

        <div v-else class="post-grid-empty">
          <p>暂无文章</p>
        </div>
      </div>
    </section>

    <section class="section collection-section" aria-labelledby="collection-title">
      <div class="shell">
        <header class="section-heading compact-heading">
          <div>
            <p class="section-kicker">
              <Icon icon="lucide:archive" aria-hidden="true" />
              快速入口
            </p>
            <h2 id="collection-title">去看看</h2>
          </div>
        </header>

        <nav class="collection-list" aria-label="内容导航">
          <a class="collection-link" href="/share/">
            <Icon icon="lucide:wrench" class="collection-icon" aria-hidden="true" />
            <strong>工具箱</strong>
            <p>实用工具和资源收藏</p>
            <Icon class="collection-arrow" icon="lucide:arrow-right" aria-hidden="true" />
          </a>

          <a class="collection-link" href="/projects">
            <Icon icon="lucide:blocks" class="collection-icon" aria-hidden="true" />
            <strong>项目展示</strong>
            <p>一些有趣的项目记录</p>
            <Icon class="collection-arrow" icon="lucide:arrow-right" aria-hidden="true" />
          </a>

          <a class="collection-link collection-link-drawer" href="/note/">
            <Icon icon="lucide:notebook-text" class="collection-icon" aria-hidden="true" />
            <strong>学习笔记</strong>
            <p>技术学习与积累</p>
            <Icon class="collection-arrow" icon="lucide:arrow-right" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </section>

    <section class="section companion-section" aria-labelledby="companion-title">
      <div class="shell">
        <div class="companion-layout">
          <img
            src="/xiaoba/xiaoba-face.jpg"
            alt="小八头像"
            width="120"
            height="120"
            loading="lazy"
          />
          <div class="companion-copy">
            <h2 id="companion-title">关于小八</h2>
            <p>
              小八是 chiikawa 世界里的一只可爱猫咪，黑白双色，温暖治愈。
              这个博客借用小八的名字，希望能像小八一样，记录生活中的点点滴滴，
              分享技术路上的探索与思考。
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { Icon } from '@iconify/vue'

type RecentPost = {
  title: string
  summary: string
  section: string
  url: string
  publishedAt: number
  publishedText: string
  updatedAt: number
  updatedText: string
}

const recentPosts = ref<RecentPost[]>([])

onMounted(async () => {
  try {
    const response = await fetch(withBase('/blog-index/all/page-1.json'))
    if (response.ok) {
      const data = await response.json()
      recentPosts.value = (data.items || []).slice(0, 2)
    }
  } catch (error) {
    console.error('Failed to load recent posts:', error)
  }
})
</script>

<style scoped>
.xiaoba-home {
  --home-ink: var(--text-primary);
  --home-hero-ink: oklch(95% 0.02 240);
  --home-muted: var(--text-secondary);
  --home-page: var(--surface);
  --home-surface: var(--surface-raised);
  --home-soft-blue: var(--primary-50);
  --home-border: var(--border);
  --home-blue: var(--accent);
  --home-blue-deep: var(--accent-fg);
  --home-blue-dark: var(--primary-800);
  --home-yellow: var(--accent-butter);
  --home-yellow-soft: var(--accent-butter-soft);
  --home-mint: var(--accent-mint);
  --home-mint-ink: var(--primary-700);
  --home-blush: var(--accent-peach);
  --home-blush-soft: var(--accent-peach-soft);
  --home-success: var(--accent-mint);

  min-height: 100svh;
  background: linear-gradient(
    to bottom,
    var(--primary-50) 0%,
    var(--surface) 30%,
    var(--surface) 100%
  );
  color: var(--home-ink);
  font-family: var(--xb-body-font);
}

.shell {
  width: min(100% - 3rem, 1120px);
  margin-inline: auto;
}

.hero {
  position: relative;
  min-height: min(740px, calc(100svh - 10rem));
  display: flex;
  align-items: center;
  padding: clamp(4rem, 8vw, 7rem) 0 clamp(3rem, 6vw, 5rem);
  overflow: hidden;
}

.sky-cloud {
  position: absolute;
  width: clamp(120px, 15vw, 200px);
  height: clamp(60px, 8vw, 100px);
  border-radius: var(--radius-full);
  background: white;
  opacity: 0.4;
  pointer-events: none;
  animation: cloud-drift-gentle 12s ease-in-out infinite;
}

.sky-cloud::before,
.sky-cloud::after {
  content: '';
  position: absolute;
  border-radius: var(--radius-full);
  background: white;
}

.sky-cloud::before {
  width: 60%;
  height: 80%;
  top: -30%;
  left: 15%;
}

.sky-cloud::after {
  width: 50%;
  height: 70%;
  top: -20%;
  right: 15%;
}

.sky-cloud--one {
  top: 8%;
  left: 10%;
  animation-delay: -2s;
  animation-duration: 14s;
}

.sky-cloud--two {
  top: 15%;
  right: 8%;
  animation-delay: -5s;
  animation-duration: 16s;
}

.sky-cloud--three {
  top: 35%;
  left: 5%;
  opacity: 0.25;
  animation-delay: -8s;
  animation-duration: 18s;
}

@keyframes cloud-drift-gentle {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  50% {
    transform: translateX(24px) translateY(-10px);
  }
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.85fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

.hero-copy {
  max-width: 580px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--primary-200);
  border-radius: var(--radius-full);
  background: var(--primary-100);
  color: var(--primary-700);
  font-size: 0.875rem;
  font-weight: 650;
  letter-spacing: 0.01em;
}

.hero h1 {
  margin: var(--space-5) 0 var(--space-4);
  color: var(--home-ink);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hero-lead {
  max-width: 46ch;
  margin: 0;
  color: var(--home-muted);
  font-size: var(--space-5);
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.button {
  position: relative;
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: all 220ms var(--ease-smooth);
}

.button:hover {
  transform: translateY(-2px);
}

.button:active {
  transform: translateY(0) scale(0.98);
}

.button-primary {
  background: var(--home-blue-deep);
  border-color: var(--home-blue-deep);
  color: white;
  box-shadow: var(--shadow-sm);
}

.button-primary:hover {
  background: var(--primary-800);
  border-color: var(--primary-800);
  box-shadow: var(--shadow-md);
}

.button-primary:active {
  box-shadow: var(--shadow-xs);
}

.button-secondary {
  background: var(--home-surface);
  border-color: var(--home-border);
  color: var(--home-blue-deep);
}

.button-secondary:hover {
  background: var(--home-soft-blue);
  border-color: var(--home-blue);
}

.button-github {
  background: var(--home-ink);
  border-color: var(--home-ink);
  color: white;
}

.button-github:hover {
  background: var(--neutral-800);
  border-color: var(--neutral-800);
}

.button-arrow {
  transition: transform 220ms var(--ease-smooth);
}

.button:hover .button-arrow {
  transform: translateX(3px);
}

.hero-visual {
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0;
  justify-self: end;
}

.hero-visual img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  border: 3px solid white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  object-fit: cover;
  animation: gentle-float 4.5s ease-in-out infinite;
}

@keyframes gentle-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

.hero-visual figcaption {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: max-content;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-full);
  background: var(--home-surface);
  box-shadow: var(--shadow-sm);
  color: var(--home-muted);
  font-size: 0.875rem;
  font-weight: 600;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--home-success);
  animation: status-pulse-soft 2.5s ease-in-out infinite;
}

@keyframes status-pulse-soft {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--home-success),
                0 0 0 4px color-mix(in srgb, var(--home-success) 20%, transparent);
  }
  50% {
    box-shadow: 0 0 0 2px var(--home-success),
                0 0 0 10px color-mix(in srgb, var(--home-success) 0%, transparent);
  }
}

.section {
  padding: clamp(4rem, 8vw, 6rem) 0;
}

.recent-section {
  background: var(--home-page);
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-5);
  margin-bottom: var(--space-7);
}

.compact-heading {
  margin-bottom: var(--space-6);
}

.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0 0 var(--space-3);
  color: var(--home-blue-deep);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.section-heading h2 {
  margin: 0;
  color: var(--home-ink);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.25;
}

.section-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--home-border);
  border-radius: var(--radius-md);
  background: var(--home-surface);
  color: var(--home-blue-deep);
  font-size: 0.9375rem;
  font-weight: 650;
  text-decoration: none;
  transition: all 200ms var(--ease-smooth);
}

.section-link:hover {
  border-color: var(--home-blue);
  background: var(--home-soft-blue);
  transform: translateX(3px);
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: var(--space-6);
}

.post-grid-empty {
  padding: var(--space-8);
  text-align: center;
  color: var(--home-muted);
  border: 1px dashed var(--home-border);
  border-radius: var(--radius-lg);
}

.post-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: var(--space-7);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  background: var(--home-surface);
  box-shadow: var(--shadow-xs);
  transition: all 260ms var(--ease-smooth);
}

.post-card:hover {
  border-color: var(--border);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.post-card-featured {
  background: linear-gradient(
    135deg,
    var(--home-surface) 0%,
    var(--home-soft-blue) 100%
  );
  border-color: var(--primary-100);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  color: var(--home-muted);
  font-size: 0.875rem;
}

.post-meta span {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.post-topic {
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  background: var(--home-surface);
  font-weight: 650;
}

.post-card-note {
  position: absolute;
  top: -10px;
  right: var(--space-6);
  padding: var(--space-1) var(--space-4);
  border: 1.5px solid var(--primary-100);
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--accent-peach-soft) 100%);
  color: var(--primary-700);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: var(--shadow-sm);
}

.post-card-note--pink {
  background: linear-gradient(135deg, var(--accent-peach-soft) 0%, var(--accent-butter-soft) 100%);
  border-color: color-mix(in srgb, var(--accent-peach) 30%, transparent);
  color: var(--primary-700);
}

.post-card h3 {
  margin: 0 0 var(--space-3);
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.4;
}

.post-card h3 a {
  color: var(--home-ink);
  text-decoration: none;
  transition: color 180ms var(--ease-smooth);
}

.post-card h3 a:hover {
  color: var(--home-blue);
}

.post-card > p {
  max-width: 65ch;
  margin: 0;
  color: var(--home-muted);
  font-size: 1rem;
  line-height: 1.7;
  flex-grow: 1;
}

.read-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
  padding: var(--space-2) 0;
  color: var(--home-blue-deep);
  font-size: 0.9375rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 180ms var(--ease-smooth);
}

.read-link:hover {
  color: var(--home-blue);
  gap: var(--space-3);
}

.collection-section {
  background: var(--home-page);
}

.collection-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-5);
}

.collection-link {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 160px;
  padding: var(--space-6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  background: var(--home-surface);
  box-shadow: var(--shadow-xs);
  color: var(--home-ink);
  text-decoration: none;
  transition: all 240ms var(--ease-smooth);
}

.collection-link:hover {
  border-color: var(--border);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.collection-link:first-child {
  background: linear-gradient(135deg, var(--home-surface) 0%, var(--accent-butter-soft) 100%);
  border-color: color-mix(in srgb, var(--accent-butter) 30%, transparent);
}

.collection-link:last-child {
  background: linear-gradient(135deg, var(--home-surface) 0%, var(--accent-mint-soft) 100%);
  border-color: color-mix(in srgb, var(--accent-mint) 30%, transparent);
}

.collection-icon {
  width: 2rem;
  height: 2rem;
  margin-bottom: var(--space-3);
  color: var(--home-blue);
}

.collection-link strong {
  margin-bottom: var(--space-2);
  color: var(--home-ink);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.4;
}

.collection-link p {
  margin: 0;
  color: var(--home-muted);
  font-size: 0.9375rem;
  line-height: 1.6;
  flex-grow: 1;
}

.collection-arrow {
  position: absolute;
  right: var(--space-5);
  bottom: var(--space-5);
  opacity: 0.5;
  transition: all 200ms var(--ease-smooth);
}

.collection-link:hover .collection-arrow {
  opacity: 1;
  transform: translate(3px, -3px);
}

.companion-section {
  background: var(--home-surface);
  border-top: 1px solid var(--border-subtle);
}

.companion-layout {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-6);
  align-items: center;
}

.companion-layout > img {
  width: 120px;
  height: 120px;
  border: 3px solid var(--primary-100);
  border-radius: var(--radius-xl);
  object-fit: cover;
  background: var(--primary-50);
}

.companion-copy h2 {
  margin: 0 0 var(--space-4);
  color: var(--home-ink);
  font-size: 1.875rem;
  font-weight: 800;
  line-height: 1.3;
}

.companion-copy > p {
  max-width: 62ch;
  margin: 0;
  color: var(--home-muted);
  font-size: 1.0625rem;
  line-height: 1.8;
}

@media (max-width: 959px) {
  .hero {
    min-height: min(680px, calc(100svh - 9rem));
    padding-top: 5.5rem;
  }

  .hero-grid {
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.7fr);
    gap: var(--space-6);
  }

  .hero h1 {
    font-size: 3.5rem;
  }

  .hero-visual {
    max-width: 360px;
  }

  .collection-list {
    grid-template-columns: 1fr;
  }

  .collection-link,
  .collection-link:first-child,
  .collection-link:last-child {
    min-height: 0;
    padding: var(--space-5);
  }
}

@media (max-width: 700px) {
  .shell {
    width: min(100% - 2rem, 1120px);
  }

  .sky-cloud--one {
    display: none;
  }

  .sky-cloud--two {
    top: 7%;
    right: -1.5rem;
    opacity: 0.26;
  }

  .hero {
    min-height: min(600px, calc(100svh - 8rem));
    padding: 5.25rem 0 2.75rem;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  .hero h1 {
    margin: var(--space-4) 0 var(--space-3);
    font-size: 2.5rem;
  }

  .hero-lead {
    font-size: 1rem;
    line-height: 1.7;
  }

  .hero-actions {
    margin-top: var(--space-5);
  }

  .button {
    flex: 1 1 0;
    min-width: 0;
    padding-inline: var(--space-3);
  }

  .button-github {
    flex-basis: 100%;
  }

  .hero-visual {
    width: min(100%, 330px);
    margin-top: var(--space-3);
  }

  .hero-visual figcaption {
    position: static;
    width: auto;
    justify-content: center;
    text-align: center;
  }

  .section {
    padding: var(--space-10) 0;
  }

  .section-heading {
    align-items: flex-start;
    gap: var(--space-4);
  }

  .section-heading h2,
  .companion-copy h2 {
    font-size: 1.75rem;
  }

  .section-link {
    margin-top: var(--space-6);
  }

  .post-grid {
    grid-template-columns: 1fr;
  }

  .post-card {
    min-height: 0;
    padding: var(--space-5);
  }

  .post-card-featured {
    padding-top: var(--space-5);
  }

  .post-card h3 {
    font-size: 1.25rem;
  }

  .read-link {
    margin-top: var(--space-3);
  }

  .companion-section {
    padding: var(--space-8) 0;
  }

  .companion-layout {
    grid-template-columns: 82px minmax(0, 1fr);
    gap: var(--space-4);
  }

  .companion-layout > img {
    width: 92px;
    height: 92px;
  }

  .companion-copy {
    padding: 0;
  }
}

@media (max-width: 380px) {
  .hero {
    padding-top: 4rem;
    padding-bottom: 1rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .button {
    width: 100%;
  }

  .hero-visual {
    width: min(100%, 290px);
  }

  .hero-visual figcaption {
    width: auto;
    font-size: 0.875rem;
  }

  .section-heading {
    display: block;
  }

  .section-link {
    margin-top: var(--space-3);
  }

  .post-meta {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--space-2);
  }

  .companion-layout {
    grid-template-columns: 1fr;
  }

  .companion-copy {
    padding: 0;
  }
}

:global(.dark) .xiaoba-home {
  --home-ink: var(--text-primary);
  --home-hero-ink: oklch(15% 0.02 240);
  --home-muted: var(--text-secondary);
  --home-page: var(--surface);
  --home-surface: var(--surface-raised);
  --home-soft-blue: var(--primary-800);
  --home-border: var(--border);
  --home-blue: var(--primary-500);
  --home-blue-deep: var(--primary-400);
  --home-blue-dark: var(--primary-200);

  background: linear-gradient(
    to bottom,
    var(--primary-800) 0%,
    var(--surface) 30%,
    var(--surface) 100%
  );
}

:global(.dark) .button-primary {
  background: var(--primary-500);
  border-color: var(--primary-500);
  color: var(--neutral-900);
}

:global(.dark) .button-primary:hover {
  background: var(--primary-400);
  border-color: var(--primary-400);
}

:global(.dark) .collection-link:hover {
  background: var(--surface-soft);
}

:global(.dark) .collection-link.collection-link-drawer:hover {
  background: var(--surface-soft);
}

@media (prefers-reduced-motion: reduce) {
  .xiaoba-home *,
  .xiaoba-home *::before,
  .xiaoba-home *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .sky-cloud,
  .hero-visual img,
  .status-dot {
    animation: none !important;
  }
}
</style>
