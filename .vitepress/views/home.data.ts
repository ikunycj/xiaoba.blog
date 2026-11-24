import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineLoader } from 'vitepress'

interface RecentPost {
  title: string
  summary: string
  url: string
  publishedText: string
  dateTime: string
}

export declare const data: { recentPosts: RecentPost[] }

const indexFile = fileURLToPath(
  new URL('../../content/blogs/public/blog-index/all/page-1.json', import.meta.url),
)

export default defineLoader({
  watch: [indexFile],
  load() {
    const index = JSON.parse(readFileSync(indexFile, 'utf8'))

    // 索引已按发布时间倒序排列。首页只取前三篇，不影响博客的完整列表和分页。
    // 通过 data loader 预渲染，首屏不必等待请求，也不会先闪现「暂无文章」。
    return {
      recentPosts: index.items.slice(0, 3).map((post: RecentPost) => ({
        title: post.title,
        summary: post.summary,
        url: post.url,
        publishedText: post.publishedText,
        dateTime: post.publishedText.replaceAll('/', '-'),
      })),
    }
  },
})
