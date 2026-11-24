<template>
  <main class="home">
    <header class="hero">
      <div class="hero-inner">
        <div class="hero-copy">
          <h1>欢迎来到小八博客</h1>
          <nav class="hero-actions" aria-label="主要入口">
            <a class="hero-primary" :href="withBase('/blog/')">
              阅读文章 <span aria-hidden="true">→</span>
            </a>
            <a class="hero-secondary" href="#topics">
              探索学习路线 <span aria-hidden="true">↓</span>
            </a>
          </nav>
        </div>
        <div class="hero-visual">
          <img
            :src="withBase('/xiaoba/home-coding-desk.webp')"
            alt="小八坐在窗前用笔记本电脑写代码"
            width="1729"
            height="910"
            fetchpriority="high"
          />
        </div>
      </div>
    </header>

    <div class="shell body">
      <div class="discovery">
        <section class="block recent-block" aria-labelledby="recent">
          <div class="section-heading">
            <h2 id="recent">最新文章</h2>
            <a class="more" :href="withBase('/blog/')">全部文章 <span aria-hidden="true">→</span></a>
          </div>
          <ul v-if="recentPosts.length" class="recent-list">
            <li v-for="post in recentPosts" :key="post.url">
              <a class="recent-entry" :href="withBase(post.url)">
                <span>{{ post.title }}</span>
                <time :datetime="post.dateTime">{{ post.publishedText.replaceAll('/', '.') }}</time>
              </a>
            </li>
          </ul>
          <p v-else class="empty">还没有发布文章，可以先从下方精选内容开始阅读。</p>
        </section>

        <nav class="block topics-block" aria-labelledby="topics">
          <div class="section-heading">
            <h2 id="topics">按主题浏览</h2>
          </div>
          <ul class="topics-list">
            <li v-for="group in featuredGroups" :key="group.id">
              <a class="topic-entry" :href="withBase(group.url)">
                <span>{{ group.title }}</span>
                <span class="topic-arrow" aria-hidden="true">→</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <section class="block projects-block" aria-labelledby="projects">
        <div class="section-heading">
          <h2 id="projects">核心项目</h2>
          <a class="more" :href="withBase('/projects')">全部项目 <span aria-hidden="true">→</span></a>
        </div>
        <ul class="directory-list">
          <li v-for="project in coreProjects" :key="project.name">
            <div class="directory-line">
              <a :href="project.url" target="_blank" rel="noopener noreferrer">
                {{ project.name }}<span class="external-mark" aria-hidden="true">↗</span>
                <span class="sr-only">（在新标签页打开）</span>
              </a>
              <span class="post-summary" :title="project.description">{{ project.description }}</span>
            </div>
          </li>
        </ul>
      </section>

      <section class="block" aria-labelledby="featured">
        <div class="section-heading">
          <h2 id="featured">精选文章</h2>
          <a class="more" :href="withBase('/note/')">全部笔记 <span aria-hidden="true">→</span></a>
        </div>
        <div v-for="group in featuredGroups" :key="group.id" class="topic-group">
          <div class="topic-heading">
            <h3 :id="group.id">{{ group.title }}</h3>
            <a class="more" :href="withBase(group.url)">{{ group.moreText }} <span aria-hidden="true">→</span></a>
          </div>
          <ul class="directory-list">
            <li v-for="post in group.posts" :key="post.url">
              <div class="directory-line">
                <a :href="withBase(post.url)">{{ post.title }}</a>
                <span class="post-summary" :title="post.description">{{ post.description }}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="block about-block" aria-labelledby="about">
        <div class="section-heading">
          <h2 id="about">关于小八博客</h2>
          <a class="more" :href="withBase('/about')">了解更多 <span aria-hidden="true">→</span></a>
        </div>
        <div class="prose">
          <p>你好，我是小八。这里是我整理计算机知识、记录 AI 开发实践的小窝。</p>
          <p>
            我希望把难懂的概念讲清楚，把零散的经验串起来：既关注 AI 应用怎么做，
            也认真补齐全栈开发与计算机基础。文章里有原理、有实践，也有学习过程中的思考。
          </p>
          <p>不求面面俱到，只求每次打开，都能带走一点真正理解的东西。</p>
        </div>
        <p class="about-links">
          <a :href="withBase('/ai/')">AI 应用开发路线</a>
          <a :href="withBase('/fullstack/')">全栈开发路线</a>
          <a href="https://github.com/ikunycj" target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span><span class="sr-only">（在新标签页打开）</span>
          </a>
        </p>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { data } from './home.data'

const { recentPosts } = data

const coreProjects = [
  {
    name: 'xiaoba.blog',
    description: '小八博客的开源站点，记录内容组织、主题定制与博客搭建实践',
    url: 'https://github.com/ikunycj/xiaoba.blog',
  },
]

const featuredGroups = [
  {
    id: 'ai-development',
    title: 'AI 应用开发',
    url: '/ai/',
    moreText: '学习路线',
    posts: [
      {
        title: 'AI Coding 最佳实践（以 Codex 为例）',
        description: '把 AI 接入需求拆解、代码实现与迭代的开发流程',
        url: '/note/AI/AI Coding/AI Coding最佳实践（codex为例子）',
      },
      {
        title: 'Agent 是什么？',
        description: '从基本概念和常见组件开始，认识智能体的工作方式',
        url: '/note/AI/Agent/Agent是什么？',
      },
      {
        title: 'Prompt 工程',
        description: '从设计原则到常见模式，建立可复用的提示词方法',
        url: '/note/AI/Agent/Prompt/Prompt工程',
      },
      {
        title: 'RAG：从检索原理到工程评估',
        description: '串起分块、索引、检索、生成与评估的完整链路',
        url: '/note/AI/Agent/RAG/RAG',
      },
      {
        title: 'Memory 系统怎么设计？',
        description: '理解记忆分层、写入、召回与更新策略',
        url: '/note/AI/Agent/Memory/Memory 系统怎么设计？',
      },
      {
        title: 'Building Effective Agents 解读',
        description: '阅读 Anthropic 的实践建议，理解 Agent 开发中的工程取舍',
        url: '/note/AI/AI 文章解读/Building effective agents',
      },
    ],
  },
  {
    id: 'computer-science',
    title: '计算机基础',
    url: '/fullstack/#四、计算机基础',
    moreText: '基础目录',
    posts: [
      {
        title: '计算机网络八股',
        description: '梳理 HTTP、TCP/IP 等面试与实战绕不开的网络基础',
        url: '/note/面经/HTTP/计网八股',
      },
      {
        title: '算法复杂度',
        description: '理解时间与空间复杂度，学会分析算法的效率',
        url: '/note/计算机知识/数据结构与算法/数据结构/1.算法基础/2.算法复杂度',
      },
      {
        title: 'Redis 概念与安装',
        description: '从基本概念和环境安装开始，认识内存数据库',
        url: '/note/软件工程/数据库/Redis/1.Redis入门/1.Redis概念和下载安装',
      },
    ],
  },
  {
    id: 'fullstack-development',
    title: '全栈开发',
    url: '/fullstack/',
    moreText: '学习路线',
    posts: [
      {
        title: 'JavaScript 基础',
        description: '前端语言的地基，从语法、数据类型到常用特性',
        url: '/note/面经/JS/1.js八股%28基础%29',
      },
      {
        title: 'React Hooks',
        description: '理解函数式组件中的状态、副作用与逻辑复用',
        url: '/note/面经/React/7.Hooks',
      },
      {
        title: 'Vue 基础',
        description: '从模板语法和响应式数据开始，逐步认识 Vue',
        url: '/note/面经/Vue/1.Vue基础',
      },
      {
        title: 'Node.js 基础',
        description: '从运行环境、模块机制开始了解 JavaScript 服务端开发',
        url: '/note/软件工程/服务端/Node.js/Node.js',
      },
    ],
  },
  {
    id: 'development-tools',
    title: '开发工具与实践',
    url: '/fullstack/#五、开发工具',
    moreText: '工具目录',
    posts: [
      {
        title: 'Git 详细教程',
        description: '从提交、分支到团队协作，掌握常用的版本管理流程',
        url: '/note/工具/Git/Git详细教程',
      },
      {
        title: 'Linux 命令',
        description: '整理日常开发、服务器排查与运维常用的命令',
        url: '/note/软件工程/运维/Linux/Linux命令',
      },
      {
        title: '从 0 开始 Vibe Coding',
        description: '从需求文档到执行与测试，记录 AI 辅助开发的实践步骤',
        url: '/note/AI/AI Coding/从0开始Vibe Coding',
      },
    ],
  },
]
</script>

<style scoped>
.home {
  --home-gutter: max(clamp(1.25rem, 3.65vw, 4rem), (100vw - 85rem) / 2);
  --home-hero-surface: #f0faff;
  --home-hero-ink: #153346;
  --home-rule: #c5e0ec;
  --home-link: var(--primary-700);
  min-height: 100svh;
  color: var(--text-primary);
  font-family: var(--xb-body-font);
}

.dark .home {
  --home-hero-surface: oklch(27% 0.028 239);
  --home-hero-ink: var(--text-primary);
  --home-rule: var(--border-subtle);
  --home-link: var(--primary-400);
}

.shell {
  width: calc(100% - 2 * var(--home-gutter));
  margin-inline: auto;
}

.hero {
  background: var(--home-hero-surface);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 43fr) minmax(0, 57fr);
  max-width: 96rem;
  min-height: clamp(22rem, 35vw, 33rem);
  margin-inline: auto;
}

.hero-copy {
  align-self: center;
  padding: var(--space-7) var(--space-4) var(--space-7) min(var(--home-gutter), 5.5rem);
}

.hero-copy h1 {
  color: var(--home-hero-ink);
  font-size: clamp(3rem, 5.35vw, 5.25rem);
  font-weight: 800;
  line-height: 1.13;
  text-wrap: balance;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-5);
  margin-top: var(--space-5);
}

.hero-actions a {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  gap: var(--space-2);
  font-size: 1rem;
  font-weight: 700;
}

.hero-actions .hero-primary {
  padding-inline: var(--space-5);
  border-radius: var(--radius-sm);
  background: var(--primary-700);
  color: white;
}

.hero-actions .hero-primary:hover {
  background: var(--primary-800);
  text-decoration: none;
}

.dark .hero-actions .hero-primary {
  background: var(--primary-300);
  color: var(--surface-raised);
}

.dark .hero-actions .hero-primary:hover {
  background: var(--primary-200);
}

.hero-visual {
  position: relative;
  clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
}

.hero-visual img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dark .hero-visual img {
  filter: brightness(0.8) saturate(0.85);
}

.body {
  padding-top: var(--space-7);
  padding-bottom: var(--space-10);
}

.discovery {
  display: grid;
  grid-template-columns: minmax(0, 2.15fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 3vw, 3rem);
}

.body > .block {
  margin-top: var(--space-8);
}

.section-heading,
.topic-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
}

.section-heading {
  min-height: 44px;
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--home-rule);
}

.block h2,
.block h3 {
  margin: 0;
  font-weight: 700;
  line-height: 1.5;
  scroll-margin-top: calc(var(--vp-nav-height) + var(--space-5));
}

.block h2 {
  font-size: clamp(1.5rem, 2.1vw, 2rem);
}

.block h3 {
  font-size: 1.0625rem;
}

.discovery .section-heading {
  align-items: center;
  margin-bottom: 0;
  padding-bottom: var(--space-3);
}

.topics-block {
  padding-inline-start: clamp(1.5rem, 3vw, 3rem);
  border-inline-start: 1px solid var(--home-rule);
}

.topics-block .section-heading {
  border-bottom: 0;
}

.projects-block .directory-list {
  padding: var(--space-3) var(--space-5) var(--space-3) var(--space-7);
  border-radius: var(--radius-sm);
  background: var(--home-hero-surface);
}

.topic-group {
  margin-top: var(--space-4);
}

.topic-group + .topic-group {
  margin-top: var(--space-5);
}

.topic-heading {
  min-height: 44px;
}

.home a {
  color: var(--home-link);
  text-decoration: none;
  text-underline-offset: 4px;
}

.home a:hover {
  text-decoration: underline;
}

.recent-list,
.topics-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.recent-list li,
.topics-list li {
  border-bottom: 1px solid var(--home-rule);
}

.home .recent-entry,
.home .topic-entry {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  min-height: 44px;
  gap: var(--space-3);
  color: var(--text-primary);
  line-height: 1.5;
}

.home .recent-entry {
  padding-block: var(--space-4);
  font-size: clamp(1rem, 1.35vw, 1.1875rem);
  font-weight: 650;
}

.recent-entry > span,
.topic-entry > span:first-child {
  overflow-wrap: anywhere;
}

.recent-entry time {
  flex: none;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}

.home .topic-entry {
  padding-block: var(--space-3);
  font-size: clamp(1rem, 1.25vw, 1.125rem);
}

.topic-arrow {
  color: var(--home-link);
}

.directory-list {
  margin: 0;
  padding-left: 1.125rem;
  list-style: disc;
}

.directory-list li {
  font-size: 1rem;
  line-height: 1.8;
}

.directory-list li::marker {
  color: var(--text-tertiary);
  font-size: 0.75em;
}

.directory-line > a {
  font-weight: 650;
}

.directory-line {
  display: flex;
  align-items: baseline;
  min-width: 0;
}

.directory-line > a {
  display: inline-flex;
  min-height: 44px;
  flex-shrink: 0;
  align-items: center;
  max-width: 100%;
}

.post-summary {
  display: block;
  min-width: 0;
  overflow: hidden;
  color: var(--text-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.directory-line .post-summary::before {
  content: '：';
  padding-inline: 0.25rem;
}

.external-mark {
  display: inline-block;
  margin-left: var(--space-1);
  font-size: 0.875rem;
  font-weight: 400;
}

.more {
  display: inline-flex;
  min-height: 44px;
  flex-shrink: 0;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.875rem;
  line-height: 1.5;
}

.prose {
  max-width: 76ch;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.9;
}

.prose p {
  margin: 0;
}

.prose p + p {
  margin-top: var(--space-3);
}

.about-links {
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--space-5);
  margin: var(--space-3) 0 0;
}

.about-links a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.9375rem;
}

.empty {
  margin: var(--space-3) 0;
  color: var(--text-secondary);
}

.home a:focus-visible {
  outline: 3px solid var(--primary-400);
  outline-offset: 4px;
  border-radius: 4px;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .hero-copy {
    padding-block: var(--space-6);
  }

  .hero-copy h1 {
    font-size: clamp(2.5rem, 5vw, 3.25rem);
  }

  .hero-visual {
    align-self: center;
    aspect-ratio: 1729 / 910;
    margin-inline-end: var(--home-gutter);
    overflow: hidden;
    border-radius: var(--radius-sm);
    clip-path: none;
  }
}

@media (max-width: 767px) {
  .hero-inner,
  .discovery {
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-inner {
    min-height: 0;
  }

  .hero-copy {
    padding: var(--space-6) var(--home-gutter) var(--space-5);
  }

  .hero-copy h1 {
    font-size: clamp(2.25rem, 8.5vw, 3.25rem);
  }

  .hero-actions {
    margin-top: var(--space-4);
  }

  .hero-visual {
    aspect-ratio: 1729 / 910;
    clip-path: none;
  }

  .body {
    padding-top: var(--space-5);
  }

  .discovery {
    gap: var(--space-6);
  }

  .topics-block {
    padding-inline-start: 0;
    border-inline-start: 0;
  }

  .topics-block .section-heading {
    border-bottom: 1px solid var(--home-rule);
  }

  .body > .block {
    margin-top: var(--space-6);
  }

  .home .recent-entry {
    display: grid;
    gap: var(--space-1);
    padding-block: var(--space-3);
  }

  .directory-line {
    display: block;
  }

  .directory-line .post-summary::before {
    content: none;
  }

  .directory-line .post-summary {
    font-size: 0.9375rem;
  }

  .directory-list li {
    padding-bottom: var(--space-2);
  }

  .projects-block .directory-list {
    padding-inline: var(--space-6) var(--space-4);
  }

  .projects-block .directory-list li:last-child {
    padding-bottom: 0;
  }
}
</style>
