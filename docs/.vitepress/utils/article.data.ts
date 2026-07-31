import { createContentLoader } from "vitepress";
import { Post } from "./types.js";
import { formatDate } from "./formatData.js"

declare const data: Post[];
export { data };

/**
 * 返回学习抽屉下所有 md 文档信息
 */
export default createContentLoader("/note/**/*.md", {
  transform(rawData): Post[] {
    return rawData
      .map(({ url, frontmatter }) => ({
        url,
        frontmatter,
        date: formatDate(frontmatter.updateTime),
      }))
      .filter((post) => !post.frontmatter.hidden && !post.url.endsWith('/note/'))
      .sort((a, b) => b.date.time - a.date.time);
  },
});
