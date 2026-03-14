import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";
import { createContentLoader } from "vitepress";

type RecentPost = {
  title: string;
  summary: string;
  section: string;
  url: string;
  publishedAt: number;
  publishedText: string;
  updatedAt: number;
  updatedText: string;
};

declare const data: RecentPost[];
export { data };

const BLOG_ROOT = "/blog/";
const NOTE_ROOT = "/note/";
const MAX_RECENT_POSTS = 120;
const REPO_ROOT = process.cwd();
const DOCS_ROOT = resolve(REPO_ROOT, "docs");
const SAFE_DIRECTORY = REPO_ROOT.replace(/\\/g, "/");
const createdAtCache = new Map<string, number>();

const normalizeContentUrl = (url: string): string => {
  let normalized = url.trim();
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  if (normalized.startsWith("/blogs/")) {
    normalized = normalized.slice("/blogs".length);
  }
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
};

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

const parseTimestamp = (value: unknown): number => {
  if (value instanceof Date) {
    const parsed = value.getTime();
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value).getTime();
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  return 0;
};

const resolveSourcePath = (url: string): string | null => {
  const routePath = decodeURI(normalizeContentUrl(url)).replace(/^\/+/, "");
  if (!routePath) {
    return null;
  }

  const directPath = resolve(DOCS_ROOT, `${routePath}.md`);
  if (existsSync(directPath)) {
    return directPath;
  }

  const indexPath = resolve(DOCS_ROOT, routePath, "index.md");
  if (existsSync(indexPath)) {
    return indexPath;
  }

  const blogDirectPath = resolve(DOCS_ROOT, "blogs", `${routePath}.md`);
  if (existsSync(blogDirectPath)) {
    return blogDirectPath;
  }

  const blogIndexPath = resolve(DOCS_ROOT, "blogs", routePath, "index.md");
  if (existsSync(blogIndexPath)) {
    return blogIndexPath;
  }

  return null;
};

const getGitCreatedTimestamp = (filePath: string): number => {
  const cached = createdAtCache.get(filePath);
  if (typeof cached === "number") {
    return cached;
  }

  let timestamp = 0;

  try {
    const gitPath = relative(REPO_ROOT, filePath).replace(/\\/g, "/");
    const output = execFileSync(
      "git",
      ["-c", `safe.directory=${SAFE_DIRECTORY}`, "log", "--diff-filter=A", "--follow", "--format=%aI", "--", gitPath],
      { cwd: REPO_ROOT, encoding: "utf8" }
    ).trim();

    const firstLine = output.split(/\r?\n/).find((line) => line.trim().length > 0) || "";
    timestamp = parseTimestamp(firstLine);
  } catch {
    timestamp = 0;
  }

  createdAtCache.set(filePath, timestamp);
  return timestamp;
};

const getFileModifiedTimestamp = (filePath: string): number => {
  try {
    const modifiedAt = statSync(filePath).mtimeMs;
    return Number.isFinite(modifiedAt) && modifiedAt > 0 ? modifiedAt : 0;
  } catch {
    return 0;
  }
};

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

  const explicitUpdated = parseTimestamp(frontmatter.lastUpdated);
  if (explicitUpdated > 0) {
    return explicitUpdated;
  }

  return parseTimestamp(frontmatter.date);
};

const resolvePublished = (
  url: string,
  frontmatter: Record<string, unknown>,
  lastUpdated: unknown
): number => {
  const explicitDate = parseTimestamp(frontmatter.date);
  if (explicitDate > 0) {
    return explicitDate;
  }

  const sourcePath = resolveSourcePath(url);
  if (sourcePath) {
    const createdAt = getGitCreatedTimestamp(sourcePath);
    if (createdAt > 0) {
      return createdAt;
    }

    const modifiedAt = getFileModifiedTimestamp(sourcePath);
    if (modifiedAt > 0) {
      return modifiedAt;
    }
  }

  return resolveUpdated(lastUpdated, frontmatter);
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
      .map((item) => {
        const normalizedUrl = typeof item.url === "string" ? normalizeContentUrl(item.url) : "";
        return {
          ...item,
          url: normalizedUrl,
        };
      })
      .filter((item) => typeof item.url === "string" && isBlogPost(item.url))
      .map((item) => {
        const frontmatter = (item.frontmatter || {}) as Record<string, unknown>;
        const rawLastUpdated = (item as { lastUpdated?: unknown }).lastUpdated;
        const publishedAt = resolvePublished(item.url, frontmatter, rawLastUpdated);
        const updatedAt = resolveUpdated(rawLastUpdated, frontmatter) || publishedAt;
        const section = resolveSection(item.url);

        return {
          title: resolveTitle(item.url, frontmatter),
          summary: resolveSummary(frontmatter, item.excerpt, section),
          section,
          url: item.url,
          publishedAt,
          publishedText: formatDate(publishedAt),
          updatedAt,
          updatedText: formatDate(updatedAt),
        };
      })
      .sort((a, b) => b.publishedAt - a.publishedAt || b.updatedAt - a.updatedAt)
      .slice(0, MAX_RECENT_POSTS);
  },
});
