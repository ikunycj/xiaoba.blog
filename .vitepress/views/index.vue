<template>
  <main class="home">
    <!-- 首屏：一行标识、一句定位、三个入口 -->
    <header class="hero">
      <div class="shell">
        <img
          class="avatar"
          src="/xiaoba/xiaoba-face.jpg"
          alt="小八"
          width="88"
          height="88"
          fetchpriority="high"
        />
        <h1>小八窝</h1>
        <p class="lead">
          整理 AI 应用开发与全栈开发的学习路线，让计算机知识变得温暖易懂。
        </p>
        <nav class="actions" aria-label="主要入口">
          <a class="btn btn-primary" href="/ai/">AI 应用开发</a>
          <a class="btn" href="/fullstack/">全栈开发</a>
          <a class="btn" href="/blog/">博客</a>
        </nav>
      </div>
    </header>

    <div class="shell body">
      <section class="block" aria-labelledby="recent">
        <h2 id="recent">最新文章</h2>
        <ul v-if="recentPosts.length" class="links">
          <li v-for="post in recentPosts" :key="post.url">
            <a :href="post.url">{{ post.title }}</a>：{{ post.summary }}
            <span class="date">{{ post.publishedText }}</span>
          </li>
        </ul>
        <p v-else class="empty">暂无文章</p>
        <p class="more"><a href="/blog/">阅读全部文章 →</a></p>
      </section>

      <section class="block" aria-labelledby="projects">
        <h2 id="projects">核心项目</h2>
        <ul class="links">
          <li v-for="p in coreProjects" :key="p.name">
            <a :href="p.link" target="_blank" rel="noopener noreferrer">{{ p.name }}</a>
            ：{{ p.description }}
          </li>
        </ul>
        <p class="more"><a href="/projects">查看全部项目 →</a></p>
      </section>

      <section class="block" aria-labelledby="featured">
        <h2 id="featured">精选文章</h2>

        <h3>AI 应用开发</h3>
        <ul class="links">
          <li v-for="post in featuredAI" :key="post.url">
            <a :href="post.url">{{ post.title }}</a>：{{ post.description }}
          </li>
        </ul>

        <h3>全栈开发</h3>
        <ul class="links">
          <li v-for="post in featuredStack" :key="post.url">
            <a :href="post.url">{{ post.title }}</a>：{{ post.description }}
          </li>
        </ul>
      </section>

      <section class="block" aria-labelledby="about">
        <h2 id="about">关于小八窝</h2>
        <p class="prose">
          小八窝是一个面向计算机与 AI 的学习站点。这里把散落的知识整理成可循的路线：
          AI 应用开发负责「怎么用起来」，全栈开发负责「怎么做得扎实」。
          不求面面俱到，只求每条路都能带你走通一次。
        </p>
        <p class="more"><a href="/about">了解更多 →</a></p>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

type RecentPost = {
  title: string
  summary: string
  url: string
  publishedText: string
}

const recentPosts = ref<RecentPost[]>([])

onMounted(async () => {
  try {
    const response = await fetch(withBase('/blog-index/all/page-1.json'))
    if (response.ok) {
      const data = await response.json()
      recentPosts.value = (data.items || []).slice(0, 3)
    }
  } catch (error) {
    console.error('Failed to load recent posts:', error)
  }
})

const coreProjects = [
  {
    name: 'xiaoba.blog',
    description: '小八窝站点源码：内容体系、主题定制与索引生成',
    link: 'https://github.com/ikunycj/xiaoba.blog',
  },
  {
    name: 'actionAgent',
    description: '面向自动化任务执行的 Agent 实践：工作流编排、工具调用与可观测性',
    link: 'https://github.com/ikunycj/actionAgent',
  },
  {
    name: 'docscode',
    description: '文档驱动开发与 AI Coding 的实践记录，把文档变成研发入口',
    link: 'https://github.com/ikunycj/docscode',
  },
]

const featuredAI = [
  {
    title: 'AI Coding 最佳实践（以 Codex 为例）',
    description: '把 AI 接进需求拆解、实现与迭代的完整工作流',
    url: '/note/AI/AI Coding/AI Coding最佳实践（codex为例子）',
  },
  {
    title: 'Agent 是什么？',
    description: '从基本概念和常见组成开始，认识一个 Agent 由什么构成',
    url: '/note/AI/Agent/Agent是什么？',
  },
  {
    title: 'Prompt 工程',
    description: '从设计原则到常见模式，建立可复用的提示词方法',
    url: '/note/AI/Agent/Prompt/Prompt工程',
  },
  {
    title: 'Building Effective Agents 解读',
    description: 'Anthropic 官方最佳实践的中文解读与工程取舍',
    url: '/note/AI/AI 文章解读/Building effective agents',
  },
  {
    title: 'Memory 系统怎么设计？',
    description: '记忆分层、写入、召回与更新策略',
    url: '/note/AI/Agent/Memory/Memory 系统怎么设计？',
  },
]

const featuredStack = [
  {
    title: '计算机网络八股',
    description: '面试与实战都绕不开的网络基础',
    url: '/note/面经/HTTP/计网八股',
  },
  {
    title: 'Git 详细教程',
    description: '从提交、分支到协作，最常用的一套流程',
    url: '/note/工具/Git/Git详细教程',
  },
  {
    title: 'Linux 命令',
    description: '日常排查与运维会反复用到的命令',
    url: '/note/软件工程/运维/Linux/Linux命令',
  },
  {
    title: 'JavaScript 基础',
    description: '前端语言的地基，讲清语法与数据类型',
    url: '/note/面经/JS/1.js八股%28基础%29',
  },
  {
    title: 'React Hooks',
    description: '函数式组件的状态与副作用组织方式',
    url: '/note/面经/React/7.Hooks',
  },
]
</script>

<style scoped>
/* 首页：文本优先，容器最少。
   一个首屏 + 若干链接小节；层级由字号、间距和链接色建立，不用卡片堆叠。 */
.home {
  min-height: 100svh;
  color: var(--text-primary);
  font-family: var(--xb-body-font);
}

.shell {
  width: min(100% - 3rem, 820px);
  margin-inline: auto;
}

/* ---------- 首屏 ---------- */
.hero {
  padding: clamp(3rem, 7vw, 5rem) 0 clamp(2rem, 4vw, 3rem);
  text-align: center;
}

.avatar {
  display: block;
  width: 88px;
  height: 88px;
  margin: 0 auto var(--space-5);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  object-fit: cover;
  background: var(--surface-raised);
}

.hero h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;
}

.lead {
  max-width: 44ch;
  margin: var(--space-4) auto 0;
  color: var(--text-secondary);
  font-size: 1.0625rem;
  line-height: 1.75;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.btn {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  padding: 0 var(--space-5);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-raised);
  color: var(--primary-700);
  font-size: 0.9375rem;
  font-weight: 650;
  text-decoration: none;
  transition: border-color 160ms var(--ease-smooth), background-color 160ms var(--ease-smooth);
}

.btn:hover {
  border-color: var(--primary-500);
  background: var(--primary-50);
}

.btn-primary {
  border-color: var(--primary-500);
  background: var(--primary-500);
  color: #fff;
}

.btn-primary:hover {
  border-color: var(--primary-700);
  background: var(--primary-700);
}

/* ---------- 内容小节 ---------- */
.body {
  padding-bottom: clamp(3rem, 6vw, 5rem);
}

.block {
  padding: clamp(2rem, 4vw, 2.75rem) 0;
  border-top: 1px solid var(--border);
}

.block h2 {
  margin: 0 0 var(--space-5);
  font-size: 1.5rem;
  font-weight: 750;
  line-height: 1.3;
}

.block h3 {
  margin: var(--space-6) 0 var(--space-3);
  color: var(--primary-700);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
}

.block h3:first-of-type {
  margin-top: 0;
}

.links {
  margin: 0;
  padding: 0;
  list-style: none;
}

.links li {
  padding: var(--space-2) 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.8;
}

.links a {
  color: var(--primary-700);
  font-weight: 650;
  text-decoration: none;
}

.links a:hover {
  color: var(--primary-500);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.date {
  display: inline-block;
  margin-left: var(--space-2);
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

.prose {
  max-width: 64ch;
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.85;
}

.more {
  margin: var(--space-5) 0 0;
}

.more a {
  color: var(--primary-700);
  font-size: 0.9375rem;
  font-weight: 650;
  text-decoration: none;
}

.more a:hover {
  color: var(--primary-500);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.empty {
  margin: 0;
  color: var(--text-tertiary);
}

.home :deep(a:focus-visible) {
  outline: 3px solid var(--primary-200);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

@media (max-width: 640px) {
  .shell {
    width: min(100% - 2rem, 820px);
  }

  .hero {
    padding-top: 2.5rem;
  }

  .avatar {
    width: 72px;
    height: 72px;
  }

  .actions .btn {
    flex: 1 1 auto;
    justify-content: center;
  }

  .links li {
    font-size: 0.9375rem;
    line-height: 1.75;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home *,
  .home *::before,
  .home *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
