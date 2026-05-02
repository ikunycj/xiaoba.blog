# 📝 小八的博客列表

欢迎来到小八的博客空间！这里记录着技术学习的点点滴滴~ 🐾

---

<div class="xiaoba-blog-nav">
  <a href="/home" class="nav-chip">🏠 返回首页</a>
  <a href="/note/" class="nav-chip">📚 查看笔记</a>
  <a href="/projects" class="nav-chip">🚀 我的项目</a>
  <a href="#giscus-comments" class="nav-chip">💬 留言板</a>
</div>

---

## ✨ 最新文章

<div class="article-list">

<article class="article-card featured">
  <div class="card-badge">🔥 精选</div>
  <div class="card-date">📅 2026-05-02</div>
  <h3><a href="./文档驱动开发构建项目">文档驱动开发构建项目</a></h3>
  <p class="card-summary">
    探索以文档为中心的开发模式，如何通过 Markdown 驱动项目开发流程，提升团队协作效率和代码质量。
  </p>
  <div class="card-tags">
    <span class="tag">📝 方法论</span>
    <span class="tag">🛠️ 实践</span>
  </div>
  <a href="./文档驱动开发构建项目" class="read-more">阅读全文 →</a>
</article>

<article class="article-card">
  <div class="card-badge">💡 推荐</div>
  <div class="card-date">📅 2026-04-15</div>
  <h3><a href="./comment-feature">博客评论功能实现</a></h3>
  <p class="card-summary">
    基于 Giscus 的博客评论系统集成方案，利用 GitHub Discussions 构建互动社区，无需后端服务器。
  </p>
  <div class="card-tags">
    <span class="tag">🛠️ 实战</span>
    <span class="tag">💻 前端</span>
  </div>
  <a href="./comment-feature" class="read-more">阅读全文 →</a>
</article>

</div>

---

## 📊 博客统计

<div class="stats-grid">
  <div class="stat-box">
    <div class="stat-emoji">📝</div>
    <div class="stat-value">10+</div>
    <div class="stat-label">技术文章</div>
  </div>
  
  <div class="stat-box">
    <div class="stat-emoji">📚</div>
    <div class="stat-value">600+</div>
    <div class="stat-label">学习笔记</div>
  </div>
  
  <div class="stat-box">
    <div class="stat-emoji">🏷️</div>
    <div class="stat-value">5</div>
    <div class="stat-label">文章分类</div>
  </div>
  
  <div class="stat-box">
    <div class="stat-emoji">💬</div>
    <div class="stat-value">活跃</div>
    <div class="stat-label">评论互动</div>
  </div>
</div>

---

## 💬 留言板

<div class="guestbook-section" id="giscus-comments">
  <div class="guestbook-header">
    <h3>✨ 小八的留言板 ✨</h3>
    <p>欢迎在这里留下你的想法、建议或问题~ 小八会认真阅读每一条留言！🐾</p>
  </div>
</div>

---

<style scoped>
/* 导航芯片 */
.xiaoba-blog-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin: 2rem 0;
}

.nav-chip {
  padding: 0.6rem 1.2rem;
  background: var(--xb-gradient-pink);
  border: 3px solid var(--xb-primary);
  border-radius: 999px;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: var(--xb-shadow-sm);
}

.nav-chip:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: var(--xb-shadow);
}

/* 文章列表 */
.article-list {
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
}

.article-card {
  position: relative;
  background: var(--xb-surface);
  border: 3px solid var(--xb-border);
  border-radius: 24px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: var(--xb-shadow);
}

.article-card.featured {
  background: linear-gradient(135deg, 
    rgba(255, 183, 197, 0.08) 0%,
    rgba(255, 255, 255, 1) 50%
  );
  border-color: var(--xb-primary);
}

.article-card::before {
  content: "🐾";
  position: absolute;
  top: -10px;
  right: 20px;
  font-size: 3rem;
  opacity: 0.1;
}

.article-card:hover {
  transform: translateY(-8px) rotate(-0.5deg);
  box-shadow: var(--xb-shadow-lg);
  border-color: var(--xb-primary);
}

.card-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: var(--xb-gradient-pink);
  color: white;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.card-date {
  font-size: 0.85rem;
  color: var(--xb-muted);
  margin-bottom: 1rem;
}

.article-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: var(--xb-font-cute);
}

.article-card h3 a {
  color: var(--xb-ink);
  text-decoration: none;
  transition: color 0.3s ease;
}

.article-card h3 a:hover {
  color: var(--xb-primary);
}

.card-summary {
  color: var(--xb-muted);
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tag {
  padding: 0.3rem 0.75rem;
  background: var(--xb-gradient-warm);
  border: 2px solid var(--xb-accent);
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.tag:hover {
  transform: scale(1.1);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--xb-gradient-blue);
  color: white;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: var(--xb-shadow-sm);
}

.read-more:hover {
  transform: translateX(5px);
  box-shadow: var(--xb-shadow);
}

/* 统计网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin: 2rem 0;
}

.stat-box {
  background: var(--xb-surface);
  border: 3px dashed var(--xb-border);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-6px) scale(1.05);
  border-style: solid;
  border-color: var(--xb-secondary);
  background: var(--xb-gradient-blue);
}

.stat-emoji {
  font-size: 3rem;
  margin-bottom: 0.75rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.stat-value {
  font-size: 2rem;
  font-weight: 900;
  color: var(--xb-secondary);
  margin-bottom: 0.5rem;
  font-family: var(--xb-font-cute);
}

.stat-box:hover .stat-value {
  color: white;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--xb-muted);
  font-weight: 600;
}

.stat-box:hover .stat-label {
  color: rgba(255, 255, 255, 0.9);
}

/* 留言板区域 */
.guestbook-section {
  background: linear-gradient(135deg, 
    rgba(255, 244, 184, 0.2) 0%,
    rgba(168, 216, 255, 0.2) 100%
  );
  border: 3px solid var(--xb-border);
  border-radius: 32px;
  padding: 3rem 2rem;
  margin: 3rem 0;
  box-shadow: var(--xb-shadow);
}

.guestbook-header {
  text-align: center;
  margin-bottom: 2rem;
}

.guestbook-header h3 {
  font-size: 2rem;
  color: var(--xb-primary);
  margin-bottom: 1rem;
  font-family: var(--xb-font-cute);
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.guestbook-header p {
  font-size: 1.1rem;
  color: var(--xb-muted);
  line-height: 1.8;
}

/* 响应式 */
@media (max-width: 768px) {
  .xiaoba-blog-nav {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-chip {
    text-align: center;
  }

  .article-card {
    padding: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .guestbook-section {
    padding: 2rem 1.5rem;
  }
}
</style>
