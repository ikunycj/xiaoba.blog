---
title: 学习抽屉
sidebar: false
---

<div class="note-index">
  <section class="note-intro">
    <div>
      <p class="note-kicker">603 篇笔记</p>
      <h1>学习抽屉</h1>
      <p class="note-lead">按主题整理的学习笔记、查阅表与复盘。</p>
      <div class="note-actions">
        <a href="/note/AI/">浏览 AI 笔记</a>
        <a href="/note/编程语言/">浏览编程语言</a>
      </div>
    </div>
    <figure class="note-character">
      <img src="/xiaoba/xiaoba-face.jpg" alt="小八头像" />
    </figure>
  </section>

  <div class="note-stats" aria-label="笔记统计">
    <div><strong>603</strong><span>篇笔记</span></div>
    <div><strong>7</strong><span>个主题</span></div>
    <div><strong>持续</strong><span>更新中</span></div>
  </div>

  <section class="note-section">
    <p class="note-kicker">主题</p>
    <h2>按主题回看</h2>
    <div class="note-paths">
      <a class="note-path" href="/note/AI/"><strong>AI</strong><span>模型、Agent、提示工程与 AI Coding</span><b>打开</b></a>
      <a class="note-path" href="/note/编程语言/"><strong>编程语言</strong><span>Java、Python、Go、C++ 和前端语言</span><b>打开</b></a>
      <a class="note-path" href="/note/软件工程/"><strong>软件工程</strong><span>工程化、架构、数据库、服务端与运维</span><b>打开</b></a>
      <a class="note-path" href="/note/计算机知识/"><strong>计算机基础</strong><span>网络、组成原理、数据结构与数学</span><b>打开</b></a>
      <a class="note-path" href="/note/工具/"><strong>开发工具</strong><span>Git、构建工具、环境管理与效率技巧</span><b>打开</b></a>
      <a class="note-path" href="/note/面经/"><strong>面试准备</strong><span>把遇到过的问题整理成可复习的答案</span><b>打开</b></a>
      <a class="note-path" href="/note/其他/"><strong>其他</strong><span>还没来得及归类的零散记录</span><b>打开</b></a>
    </div>
  </section>

  <section class="note-section note-tip">
    <p class="note-kicker">使用建议</p>
    <h2>笔记怎么用</h2>
    <p>先搜索关键词，再用侧边栏确认上下文。短笔记适合快速查，长文可从头读；值得展开的内容，再写成<a href="/blog/">博客</a>。</p>
  </section>
</div>

<style>
.note-index {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 0 72px;
}

.note-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 40px;
  align-items: center;
  padding: 40px 0;
  border-bottom: 1px solid var(--xb-border);
}

.note-kicker {
  margin: 0;
  color: var(--xb-blue-deep);
  font-size: 14px;
  font-weight: 750;
  line-height: 1.4;
  letter-spacing: 0;
}

.note-intro h1 {
  margin: 12px 0 0;
  font-size: 40px;
  line-height: 1.2;
}

.note-lead {
  max-width: 52ch;
  margin: 16px 0 0;
  color: var(--xb-muted);
  font-size: 17px;
  line-height: 1.75;
}

.note-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.note-actions a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  padding: 10px 16px;
  border: 1px solid var(--xb-border);
  border-radius: 8px;
  background: var(--xb-paper);
  color: var(--xb-blue-deep);
  font-weight: 700;
  text-decoration: none;
}

.note-actions a:first-child {
  border-color: var(--xb-blue);
  background: var(--xb-blue);
  color: #fff;
}

.note-actions a:hover {
  border-color: var(--xb-blue-deep);
}

.note-character {
  margin: 0;
}

.note-character img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 0.82;
  object-fit: cover;
  border: 1px solid var(--xb-border);
  border-radius: 8px;
}

.note-character figcaption {
  margin-top: 8px;
  color: var(--xb-muted);
  font-size: 14px;
  line-height: 1.5;
}

.note-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin: 32px 0 0;
  border: 1px solid var(--xb-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--xb-border);
}

.note-stats div {
  padding: 16px;
  background: var(--xb-paper);
}

.note-stats strong,
.note-stats span {
  display: block;
}

.note-stats strong {
  color: var(--xb-blue-deep);
  font-size: 22px;
  line-height: 1.3;
}

.note-stats span {
  margin-top: 4px;
  color: var(--xb-muted);
  font-size: 14px;
}

.note-section {
  padding-top: 56px;
}

.note-section h2 {
  margin: 8px 0 0;
  padding: 0;
  border: 0;
  font-size: 26px;
}

.note-paths {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 24px;
  margin-top: 24px;
}

.note-path {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  min-height: 72px;
  padding: 12px 0;
  border-bottom: 1px solid var(--xb-border);
  color: var(--xb-ink);
  text-decoration: none;
}

.note-path strong {
  color: var(--xb-blue-deep);
  font-size: 17px;
}

.note-path span {
  color: var(--xb-muted);
  font-size: 14px;
  line-height: 1.5;
}

.note-path b {
  color: var(--xb-blue);
  font-size: 14px;
  font-weight: 700;
}

.note-path:hover strong,
.note-path:hover b {
  color: var(--xb-blue-deep);
}

.note-tip {
  max-width: 68ch;
}

.note-tip p:last-child {
  margin-top: 12px;
  color: var(--xb-muted);
}

@media (max-width: 720px) {
  .note-index {
    padding-top: 8px;
  }

  .note-intro {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 0;
  }

  .note-intro h1 {
    font-size: 32px;
  }

  .note-character {
    max-width: 280px;
  }

  .note-paths {
    grid-template-columns: 1fr;
  }

  .note-path {
    grid-template-columns: 104px minmax(0, 1fr) auto;
  }
}

@media (max-width: 420px) {
  .note-stats strong {
    font-size: 20px;
  }

  .note-path {
    grid-template-columns: 1fr auto;
    gap: 4px 12px;
  }

  .note-path span {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .note-path b {
    grid-column: 2;
    grid-row: 1;
  }
}
</style>
