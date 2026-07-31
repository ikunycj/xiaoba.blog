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

        <div class="post-grid">
          <article class="post-card post-card-featured">
            <div class="post-meta">
              <span>
                <Icon icon="lucide:calendar-days" aria-hidden="true" />
                2026-05-02
              </span>
              <span class="post-topic">方法与实践</span>
            </div>
            <span class="post-card-note">最新</span>
            <h3>
              <a href="/blog/%E6%96%87%E6%A1%A3%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91%E6%9E%84%E5%BB%BA%E9%A1%B9%E7%9B%AE">
                文档驱动开发构建项目
              </a>
            </h3>
            <p>
              从需求文档、OpenSpec 到 Codex，把一套更顺手的 AI 项目启动方式完整记录下来。
            </p>
            <a
              class="read-link"
              href="/blog/%E6%96%87%E6%A1%A3%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91%E6%9E%84%E5%BB%BA%E9%A1%B9%E7%9B%AE"
            >
              阅读全文
              <Icon icon="lucide:arrow-up-right" aria-hidden="true" />
            </a>
          </article>

          <article class="post-card">
            <div class="post-meta">
              <span>
                <Icon icon="lucide:calendar-days" aria-hidden="true" />
                2026-03-08
              </span>
              <span class="post-topic">站点更新</span>
            </div>
            <span class="post-card-note post-card-note--pink">已经整理</span>
            <h3><a href="/blog/comment-feature">评论功能已上线：欢迎留言</a></h3>
            <p>
              博客已经接入 Giscus。这里记下留言入口、使用方式，以及评论数据的托管说明。
            </p>
            <a class="read-link" href="/blog/comment-feature">
              阅读全文
              <Icon icon="lucide:arrow-up-right" aria-hidden="true" />
            </a>
          </article>
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

        <nav class="collection-list" aria-label="内容分类">
          <a class="collection-link collection-link-drawer" href="/note/">
            <span class="collection-icon collection-icon-blue">
              <Icon icon="lucide:notebook-tabs" aria-hidden="true" />
            </span>
            <span class="collection-copy">
              <strong>学习笔记</strong>
              <small>按主题浏览笔记</small>
            </span>
            <Icon class="collection-arrow" icon="lucide:arrow-right" aria-hidden="true" />
          </a>

          <a class="collection-link" href="/projects">
            <span class="collection-icon collection-icon-yellow">
              <Icon icon="lucide:blocks" aria-hidden="true" />
            </span>
            <span class="collection-copy">
              <strong>项目</strong>
              <small>项目与实验记录</small>
            </span>
            <Icon class="collection-arrow" icon="lucide:arrow-right" aria-hidden="true" />
          </a>

          <a class="collection-link" href="/share">
            <span class="collection-icon collection-icon-pink">
              <Icon icon="lucide:wrench" aria-hidden="true" />
            </span>
            <span class="collection-copy">
              <strong>工具箱</strong>
              <small>常用工具和资源</small>
            </span>
            <Icon class="collection-arrow" icon="lucide:arrow-right" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </section>

    <section class="companion-section" aria-labelledby="companion-title">
      <div class="shell companion-layout">
        <img
          src="/xiaoba/xiaoba-face.jpg"
          alt="微笑的小八"
          width="240"
          height="240"
          loading="lazy"
        />
        <div class="companion-copy">
          <h2 id="companion-title">今天也辛苦了。</h2>
          <p>慢一点，继续就好。</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<style scoped>
.xiaoba-home {
  --home-blue: var(--xb-blue);
  --home-blue-deep: var(--xb-blue-deep);
  --home-blue-dark: color-mix(in srgb, var(--xb-blue-deep) 78%, var(--xb-ink));
  --home-ink: var(--xb-ink);
  --home-hero-ink: var(--xb-ink);
  --home-muted: var(--xb-muted);
  --home-page: var(--xb-page);
  --home-surface: var(--xb-paper);
  --home-soft-blue: var(--xb-blue-soft);
  --home-border: var(--xb-border);
  --home-blush: var(--xb-blush);
  --home-blush-soft: color-mix(in srgb, var(--xb-blush) 18%, var(--xb-paper));
  --home-yellow: var(--xb-yellow);
  --home-mint: var(--xb-mint);
  --home-success: var(--xb-success);
  min-height: 100vh;
  color: var(--home-ink);
  background: var(--home-page);
}

.shell {
  width: min(100% - 2rem, 1120px);
  margin-inline: auto;
}

.hero {
  position: relative;
  display: grid;
  align-items: center;
  min-height: min(700px, calc(100svh - 8rem));
  padding: 4.5rem 0 4rem;
  overflow: hidden;
  color: var(--home-hero-ink);
  background: var(--home-blue);
  border-bottom: 0;
}

.hero::before {
  position: absolute;
  right: 8%;
  bottom: 0;
  width: 180px;
  height: 6px;
  border-radius: 6px 6px 0 0;
  background: var(--home-yellow);
  content: '';
  opacity: 0.9;
}

.sky-cloud {
  position: absolute;
  z-index: 0;
  width: 170px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.56);
  pointer-events: none;
  animation: cloud-drift 22s ease-in-out infinite alternate;
}

.sky-cloud::before,
.sky-cloud::after {
  position: absolute;
  bottom: 8px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: inherit;
  content: '';
}

.sky-cloud::before {
  left: 24px;
}

.sky-cloud::after {
  right: 22px;
  width: 40px;
  height: 40px;
}

.sky-cloud--one {
  top: 16%;
  left: -28px;
}

.sky-cloud--two {
  top: 10%;
  right: 22%;
  width: 132px;
  opacity: 0.38;
  animation-delay: -8s;
  animation-duration: 28s;
}

.sky-cloud--three {
  right: -42px;
  bottom: 18%;
  width: 210px;
  opacity: 0.32;
  animation-delay: -14s;
  animation-duration: 26s;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.82fr);
  gap: 3.5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-copy {
  max-width: 650px;
}

.eyebrow,
.section-kicker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: var(--home-hero-ink);
  font-size: 0.875rem;
  font-weight: 650;
  line-height: 1.4;
}

.section-kicker {
  color: var(--home-blue-deep);
}

.eyebrow {
  width: fit-content;
  padding: 0;
  border: 0;
  background: transparent;
}

.eyebrow svg,
.section-kicker svg {
  width: 1.125rem;
  height: 1.125rem;
  flex: 0 0 auto;
}

.hero h1 {
  max-width: 9ch;
  margin: 1rem 0 1.25rem;
  color: var(--home-hero-ink);
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0;
}

.hero h1::after {
  display: inline-block;
  width: 0.22em;
  height: 0.22em;
  margin-left: 0.12em;
  border-radius: 50%;
  content: '';
  background: var(--home-blush);
  vertical-align: 0.08em;
}

.hero-lead {
  max-width: 37rem;
  margin: 0;
  color: var(--home-hero-ink);
  font-size: 1rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.7rem 1.1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 650;
  line-height: 1.2;
  text-decoration: none;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease,
    transform 180ms ease;
}

.button svg {
  width: 1.1rem;
  height: 1.1rem;
  flex: 0 0 auto;
}

.button-primary {
  color: var(--home-blue-deep);
  background: var(--home-surface);
  border-color: var(--home-surface);
}

.button-primary:hover {
  color: var(--home-ink);
  background: var(--home-yellow);
  border-color: var(--home-yellow);
}

.button-secondary {
  color: var(--home-ink);
  background: var(--home-yellow);
  border-color: var(--home-yellow);
}

.button-secondary:hover {
  color: var(--home-blue-deep);
  background: var(--home-surface);
  border-color: var(--home-surface);
}

.button-github {
  color: var(--home-hero-ink);
  background: transparent;
  border-color: color-mix(in srgb, var(--home-hero-ink) 50%, transparent);
}

.button-github:hover {
  color: var(--home-blue-deep);
  background: var(--home-surface);
  border-color: var(--home-surface);
}

.button-arrow {
  transition: transform 180ms ease;
}

.button-primary:hover .button-arrow {
  transform: translateX(3px);
}

.hero-visual {
  position: relative;
  width: min(100%, 460px);
  margin: 0 auto;
  padding: 0.65rem;
  border: 3px solid var(--home-surface);
  border-radius: 8px;
  background: var(--home-surface);
  box-shadow: 7px 7px 0 var(--home-yellow);
  animation: xiaoba-float 6s ease-in-out infinite;
}

.hero-visual img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
  object-fit: contain;
}

.hero-visual figcaption {
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin-top: 0.6rem;
  color: var(--home-ink);
  font-size: 0.875rem;
  font-weight: 650;
  line-height: 1.4;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--home-success);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--home-success) 18%, transparent);
  animation: status-pulse 1.8s ease-out infinite;
}

.section {
  padding: 5.5rem 0;
}

.recent-section {
  background: var(--home-surface);
  scroll-margin-top: calc(var(--vp-nav-height, 64px) + 1rem);
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
}

.section-heading h2,
.companion-copy h2 {
  margin: 0.65rem 0 0;
  color: var(--home-blue-deep);
  font-size: 2.25rem;
  font-weight: 750;
  line-height: 1.25;
  letter-spacing: 0;
}

.section-link,
.read-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.4rem;
  color: var(--home-blue-deep);
  font-weight: 650;
  text-decoration: none;
}

.section-link {
  flex: 0 0 auto;
  padding-inline: 0.4rem;
  font-size: 0.875rem;
}

.section-link svg,
.read-link svg {
  width: 1rem;
  height: 1rem;
  transition: transform 180ms ease;
}

.section-link:hover svg,
.read-link:hover svg {
  transform: translateX(3px);
}

.post-grid {
  display: grid;
  grid-template-columns: minmax(0, 860px);
  gap: 0;
}

.post-card {
  display: flex;
  min-height: 0;
  flex-direction: column;
  padding: 1.6rem 0;
  border-top: 1px solid var(--home-border);
  background: transparent;
  transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.post-card-featured {
  border-top-color: var(--home-blue);
}

.post-card:hover {
  border-color: var(--home-blue);
  background: var(--home-page);
  transform: translateX(4px);
}

.post-card:nth-child(2) {
  border-top-color: color-mix(in srgb, var(--home-blush) 68%, var(--home-border));
}

.post-card-note {
  align-self: flex-start;
  margin-top: 1rem;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  color: var(--home-blue-deep);
  background: color-mix(in srgb, var(--home-yellow) 34%, var(--home-surface));
  font-size: 0.8125rem;
  font-weight: 750;
  line-height: 1.35;
}

.post-card-note--pink {
  color: var(--home-blue-deep);
  background: var(--home-blush-soft);
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--home-muted);
  font-size: 0.875rem;
  line-height: 1.4;
}

.post-meta > span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.post-meta svg {
  width: 0.9rem;
  height: 0.9rem;
}

.post-topic {
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  color: var(--home-blue-deep);
  background: var(--home-mint);
  font-weight: 650;
}

.post-card h3 {
  margin: 1.35rem 0 0.8rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0;
}

.post-card h3 a {
  color: var(--home-ink);
  text-decoration: none;
}

.post-card h3 a:hover {
  color: var(--home-blue-deep);
}

.post-card p {
  margin: 0;
  color: var(--home-muted);
  font-size: 1rem;
  line-height: 1.75;
}

.read-link {
  align-self: flex-start;
  margin-top: auto;
  padding-top: 1.25rem;
  font-size: 0.875rem;
}

.collection-section {
  background: var(--home-soft-blue);
  border-block: 2px solid var(--home-border);
}

.compact-heading {
  margin-bottom: 1.5rem;
}

.collection-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.collection-link {
  display: grid;
  min-width: 0;
  min-height: 136px;
  grid-template-columns: 44px minmax(0, 1fr) 24px;
  gap: 0.9rem;
  align-items: start;
  padding: 1.5rem;
  border: 2px solid var(--home-border);
  border-radius: 8px;
  background: var(--home-surface);
  color: var(--home-ink);
  text-decoration: none;
  transition: background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease,
    color 180ms ease, transform 180ms ease;
}

.collection-link-drawer {
  grid-column: 1 / -1;
  min-height: 118px;
  border-color: var(--home-blue);
  background: var(--home-blue);
  color: var(--home-surface);
}

.collection-link-drawer .collection-icon {
  color: var(--home-blue-deep);
  background: var(--home-surface);
}

.collection-link-drawer .collection-copy small,
.collection-link-drawer .collection-arrow {
  color: color-mix(in srgb, var(--home-surface) 86%, var(--home-blue));
}

.collection-link.collection-link-drawer:hover {
  color: var(--home-ink);
  border-color: var(--home-yellow);
  background: var(--home-yellow);
}

.collection-link-drawer:hover .collection-icon {
  color: var(--home-ink);
}

.collection-link-drawer:hover .collection-copy small,
.collection-link-drawer:hover .collection-arrow {
  color: var(--home-ink);
}

.collection-link:first-child {
  padding-left: 1.5rem;
}

.collection-link:last-child {
  padding-right: 1.5rem;
}

.collection-link:hover {
  color: var(--home-blue-deep);
  border-color: var(--home-blue);
  background: var(--home-surface);
  transform: translateY(-2px);
}

.collection-icon {
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--home-ink);
}

.collection-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.collection-icon-blue {
  background: color-mix(in srgb, var(--home-blue) 22%, var(--home-surface));
}

.collection-icon-yellow {
  background: color-mix(in srgb, var(--home-yellow) 42%, var(--home-surface));
}

.collection-icon-pink {
  background: var(--home-blush-soft);
}

.collection-copy {
  min-width: 0;
}

.collection-copy strong,
.collection-copy small {
  display: block;
}

.collection-copy strong {
  margin-top: 0.15rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
}

.collection-copy small {
  margin-top: 0.5rem;
  color: var(--home-muted);
  font-size: 0.875rem;
  line-height: 1.65;
}

.collection-arrow {
  width: 1rem;
  height: 1rem;
  margin-top: 0.85rem;
  color: var(--home-blue-deep);
  transition: transform 180ms ease;
}

.collection-link:hover .collection-arrow {
  transform: translateX(3px);
}

.companion-section {
  padding: 4.5rem 0 6rem;
  background: var(--home-blush-soft);
  border-bottom: 2px solid color-mix(in srgb, var(--home-blush) 40%, var(--home-border));
}

.companion-layout {
  display: grid;
  grid-template-columns: 128px minmax(0, 650px);
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.companion-layout > img {
  display: block;
  width: 140px;
  height: 140px;
  padding: 0.35rem;
  border: 3px solid var(--home-blue);
  object-fit: cover;
  border-radius: 8px;
  background: var(--home-yellow);
}

.companion-copy {
  padding: 0;
}

.companion-copy h2 {
  font-size: 1.75rem;
}

.companion-copy > p:last-child {
  max-width: 38rem;
  margin: 0.8rem 0 0;
  color: var(--home-muted);
  font-size: 1rem;
  line-height: 1.75;
}

.button:focus-visible,
.section-link:focus-visible,
.read-link:focus-visible,
.post-card h3 a:focus-visible,
.collection-link:focus-visible {
  outline: 3px solid var(--home-yellow);
  outline-offset: 3px;
}

@media (max-width: 959px) {
  .hero {
    min-height: min(680px, calc(100svh - 9rem));
    padding-top: 5.5rem;
  }

  .hero-grid {
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.7fr);
    gap: 2rem;
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
    padding: 1.25rem;
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
    gap: 1.25rem;
  }

  .hero h1 {
    margin: 0.7rem 0 0.85rem;
    font-size: 2.5rem;
  }

  .hero-lead {
    font-size: 1rem;
    line-height: 1.7;
  }

  .hero-actions {
    margin-top: 1.35rem;
  }

  .button {
    flex: 1 1 0;
    min-width: 0;
    padding-inline: 0.75rem;
  }

  .button-github {
    flex-basis: 100%;
  }

  .hero-visual {
    width: min(100%, 330px);
    margin-top: 0.4rem;
  }

  .hero-visual figcaption {
    position: static;
    width: auto;
    justify-content: center;
    text-align: center;
  }

  .section {
    padding: 4rem 0;
  }

  .section-heading {
    align-items: flex-start;
    gap: 1rem;
  }

  .section-heading h2,
  .companion-copy h2 {
    font-size: 1.75rem;
  }

  .section-link {
    margin-top: 1.7rem;
  }

  .post-grid {
    grid-template-columns: 1fr;
  }

  .post-card {
    min-height: 0;
    padding: 1.35rem 0;
  }

  .post-card-featured {
    padding-top: 1.35rem;
  }

  .post-card h3 {
    font-size: 1.25rem;
  }

  .read-link {
    margin-top: 0.85rem;
  }

  .companion-section {
    padding: 3.5rem 0 4.5rem;
  }

  .companion-layout {
    grid-template-columns: 82px minmax(0, 1fr);
    gap: 1rem;
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
    margin-top: 0.7rem;
  }

  .post-meta {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }

  .companion-layout {
    grid-template-columns: 1fr;
  }

  .companion-copy {
    padding: 0;
  }
}

:global(.dark) .xiaoba-home {
  --home-ink: var(--xb-ink);
  --home-hero-ink: #0d2f3d;
  --home-muted: var(--xb-muted);
  --home-page: var(--xb-page);
  --home-surface: var(--xb-paper);
  --home-soft-blue: var(--xb-blue-soft);
  --home-border: var(--xb-border);
  --home-blue: var(--xb-blue);
  --home-blue-deep: var(--xb-blue-deep);
  --home-blue-dark: color-mix(in srgb, var(--xb-blue-deep) 78%, var(--xb-ink));
}

:global(.dark) .button-primary {
  color: var(--home-blue-deep);
  background: var(--home-surface);
  border-color: var(--home-surface);
}

:global(.dark) .button-primary:hover {
  color: var(--home-ink);
  background: var(--home-yellow);
  border-color: var(--home-yellow);
}

:global(.dark) .collection-link:hover {
  background: rgba(255, 255, 255, 0.04);
}

:global(.dark) .collection-link.collection-link-drawer:hover {
  color: var(--home-ink);
  background: var(--home-yellow);
}

@keyframes xiaoba-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

@keyframes cloud-drift {
  from {
    transform: translateX(-8px);
  }

  to {
    transform: translateX(26px);
  }
}

@keyframes status-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--home-success) 16%, transparent);
  }

  50% {
    box-shadow: 0 0 0 7px color-mix(in srgb, var(--home-success) 0%, transparent);
  }
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
  .hero-visual,
  .status-dot {
    animation: none !important;
  }
}
</style>
