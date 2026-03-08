import { createContentLoader } from "vitepress";

type RecentPost = {
  title: string;
  summary: string;
  section: string;
  url: string;
  updated: number;
  updatedText: string;
};

declare const data: RecentPost[];
export { data };

const BLOG_ROOT = "/blog/";
const NOTE_ROOT = "/note/";

const isArticlePage = (url: string, root: string): boolean => {
  if (!url.startsWith(root)) {
    return false;
  }
  return url !== `${root}index` && !url.endsWith("/index");
};

const isBlogPost = (url: string): boolean => {
  return isArticlePage(url, BLOG_ROOT) || isArticlePage(url, NOTE_ROOT);
};

const stripHtml = (value: string): string => value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const resolveSection = (url: string): string => {
  const parts = decodeURI(url).split("/").filter(Boolean);
  if (parts[0] === "blog") {
    return "博客";
  }
  return parts[1] || "其他";
};

const resolveTitle = (url: string, frontmatter: Record<string, unknown>): string => {
  const rawTitle = frontmatter.title;
  if (typeof rawTitle === "string" && rawTitle.trim().length > 0) {
    return rawTitle.trim();
  }
  const fileName = decodeURI(url).split("/").filter(Boolean).pop() || "未命名文章";
  return fileName.trim();
};

const resolveSummary = (
  frontmatter: Record<string, unknown>,
  excerpt: string | undefined,
  section: string
): string => {
  const desc = frontmatter.description;
  if (typeof desc === "string" && desc.trim().length > 0) {
    return desc.trim();
  }
  const pureExcerpt = stripHtml(excerpt || "");
  if (pureExcerpt.length > 0) {
    return pureExcerpt.slice(0, 120);
  }
  return `来自「${section}」专题的最近更新文章。`;
};

const resolveUpdated = (lastUpdated: unknown, frontmatter: Record<string, unknown>): number => {
  if (typeof lastUpdated === "number" && lastUpdated > 0) {
    return lastUpdated;
  }

  const rawDate = frontmatter.date;
  if (typeof rawDate === "string" || typeof rawDate === "number") {
    const parsed = new Date(rawDate).getTime();
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return 0;
};

const formatDate = (timestamp: number): string => {
  if (!timestamp) {
    return "未知时间";
  }
  return new Date(timestamp).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default createContentLoader("**/*.md", {
  excerpt: true,
  transform(rawData): RecentPost[] {
    return rawData
      .filter((item) => typeof item.url === "string" && isBlogPost(item.url))
      .map((item) => {
        const frontmatter = (item.frontmatter || {}) as Record<string, unknown>;
        const updated = resolveUpdated(item.lastUpdated, frontmatter);
        const section = resolveSection(item.url);

        return {
          title: resolveTitle(item.url, frontmatter),
          summary: resolveSummary(frontmatter, item.excerpt, section),
          section,
          url: item.url,
          updated,
          updatedText: formatDate(updated),
        };
      })
      .sort((a, b) => b.updated - a.updated)
      .slice(0, 24);
  },
});
