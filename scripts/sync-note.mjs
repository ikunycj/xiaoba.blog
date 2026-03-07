import { existsSync, promises as fs, statSync } from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const sourceDir = path.join(cwd, "docs", "note");
const targetDir = path.join(cwd, "docs", "blogs", "note");
const invalidLinkPlaceholder = "about:blank";
const skippedMarkdownRelPaths = new Set([
  path.join("工具", "maven", "Maven详从入门到入土.md"),
  path.join("开发运维", "代理", "nginx", "nginx常见操作.md"),
  path.join("开发运维", "数据库", "Redis", "1.Redis入门", "1.Redis概念和下载安装.md"),
  path.join("开发运维", "服务端", "小型服务器", "TomCat.md"),
  path.join(
    "开发运维",
    "服务端",
    "SSM",
    "Spring",
    "第三方工具",
    "Spring Data Redis",
    "Spring Data Redis.md"
  ),
]);

const landingIndexContent = `---
layout: page
---

<script setup>
import Note from '../../../docs/.vitepress/views/Note/index.vue'
</script>

<Note />
`;

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath)));
      continue;
    }
    if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizeFsPath(input) {
  return path.normalize(input).toLowerCase();
}

function isExternalOrIgnoredRef(ref) {
  if (!ref) return true;
  const value = ref.trim();
  if (!value) return true;
  if (value.startsWith("#")) return true;
  if (value.startsWith("/")) return true;
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(value)) return true;
  if (/^(mailto|tel|javascript):/i.test(value)) return true;
  return false;
}

function parseMarkdownRefs(content) {
  const refs = new Set();

  const markdownLinkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;
  for (const match of content.matchAll(markdownLinkPattern)) {
    let raw = (match[1] || "").trim();
    if (!raw) continue;

    if (raw.startsWith("<") && raw.endsWith(">")) {
      raw = raw.slice(1, -1).trim();
    } else {
      raw = raw.split(/\s+/)[0];
    }
    refs.add(raw);
  }

  const htmlSrcHrefPattern =
    /<(?:img|a|source)\b[^>]*\b(?:src|href)=["']([^"']+)["'][^>]*>/gi;
  for (const match of content.matchAll(htmlSrcHrefPattern)) {
    refs.add((match[1] || "").trim());
  }

  const obsidianPattern = /!?\[\[([^[\]]+)\]\]/g;
  for (const match of content.matchAll(obsidianPattern)) {
    const raw = (match[1] || "")
      .split("|")[0]
      .split("#")[0]
      .trim();
    if (raw) refs.add(raw);
  }

  return refs;
}

function stripQueryAndHash(link) {
  const noHash = link.split("#")[0];
  return noHash.split("?")[0];
}

function isValidPublicAssetLink(linkTarget) {
  const normalized = stripQueryAndHash((linkTarget || "").trim());
  if (!normalized.startsWith("/")) return false;
  const publicPath = path.join(cwd, "docs", "public", normalized.slice(1));
  if (!existsSync(publicPath)) return false;
  try {
    return statSync(publicPath).isFile();
  } catch {
    return false;
  }
}

function resolveLocalLinkPath(markdownFilePath, rawLink) {
  let normalized = rawLink.trim();
  if (!normalized) return null;

  if (normalized.startsWith("<") && normalized.endsWith(">")) {
    normalized = normalized.slice(1, -1).trim();
  } else {
    normalized = normalized.split(/\s+/)[0];
  }

  if (isExternalOrIgnoredRef(normalized)) return null;

  let candidate = stripQueryAndHash(normalized);
  if (!candidate) return null;

  try {
    candidate = decodeURIComponent(candidate);
  } catch {
    // Keep original candidate if decode fails.
  }

  return path.resolve(path.dirname(markdownFilePath), candidate);
}

function replaceMissingLocalMarkdownLinks(content, markdownFilePath) {
  const markdownLinkPattern = /(!?\[[^\]]*]\()([^)]*)(\))/g;

  return content.replace(markdownLinkPattern, (fullMatch, prefix, rawTarget, suffix) => {
    if (!rawTarget || !rawTarget.trim()) {
      return `${prefix}${invalidLinkPlaceholder}${suffix}`;
    }
    if (rawTarget.trim().startsWith("/")) {
      return isValidPublicAssetLink(rawTarget)
        ? fullMatch
        : `${prefix}${invalidLinkPlaceholder}${suffix}`;
    }
    const resolvedPath = resolveLocalLinkPath(markdownFilePath, rawTarget);
    if (!resolvedPath) return fullMatch;
    if (existsSync(resolvedPath)) {
      try {
        if (statSync(resolvedPath).isFile()) return fullMatch;
      } catch {
        // Fall through to replacement.
      }
    }
    return `${prefix}${invalidLinkPlaceholder}${suffix}`;
  });
}

function replaceMissingLocalHtmlLinks(content, markdownFilePath) {
  const htmlLinkPattern =
    /(<(?:img|a|source)\b[^>]*\b(?:src|href)=["'])([^"']*)(["'][^>]*>)/gi;

  return content.replace(htmlLinkPattern, (fullMatch, prefix, rawTarget, suffix) => {
    if (!rawTarget || !rawTarget.trim()) {
      return `${prefix}${invalidLinkPlaceholder}${suffix}`;
    }
    if (rawTarget.trim().startsWith("/")) {
      return isValidPublicAssetLink(rawTarget)
        ? fullMatch
        : `${prefix}${invalidLinkPlaceholder}${suffix}`;
    }
    const resolvedPath = resolveLocalLinkPath(markdownFilePath, rawTarget);
    if (!resolvedPath) return fullMatch;

    if (existsSync(resolvedPath)) {
      try {
        if (statSync(resolvedPath).isFile()) return fullMatch;
      } catch {
        // Fall through to replacement.
      }
    }

    return `${prefix}${invalidLinkPlaceholder}${suffix}`;
  });
}

function replaceMissingReferenceLinks(content, markdownFilePath) {
  const referencePattern = /^(\[[^\]]+\]:\s*)(\S*)(.*)$/gm;

  return content.replace(referencePattern, (fullMatch, prefix, rawTarget, suffix) => {
    const target = (rawTarget || "").trim();
    if (!target) return `${prefix}${invalidLinkPlaceholder}${suffix || ""}`;
    if (target.startsWith("/")) {
      return isValidPublicAssetLink(target)
        ? fullMatch
        : `${prefix}${invalidLinkPlaceholder}${suffix || ""}`;
    }

    const resolvedPath = resolveLocalLinkPath(markdownFilePath, target);
    if (!resolvedPath) return fullMatch;

    if (existsSync(resolvedPath)) {
      try {
        if (statSync(resolvedPath).isFile()) return fullMatch;
      } catch {
        // Fall through to replacement.
      }
    }

    return `${prefix}${invalidLinkPlaceholder}${suffix || ""}`;
  });
}

function isMarkdownFile(filePath) {
  return path.extname(filePath).toLowerCase() === ".md";
}

async function copyFileWithDirs(sourceFile, destFile) {
  await fs.mkdir(path.dirname(destFile), { recursive: true });
  await fs.copyFile(sourceFile, destFile);
}

function sanitizeMarkdownForVitePress(content) {
  const escapedAngleBrackets = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const escapedProcessingInstruction = escapedAngleBrackets
    .replace(/<\?/g, "&lt;?")
    .replace(/\?>/g, "?&gt;");

  const escapedInvalidTagLikeContent = escapedProcessingInstruction.replace(
    /<([^>\n]+)>/g,
    (match, innerRaw) => {
      const inner = innerRaw.trim();
      if (!inner) return "&lt;&gt;";

      if (inner.startsWith("!--") && inner.endsWith("--")) return match;
      if (inner.startsWith("!DOCTYPE")) return match;

      const normalized = inner.startsWith("/") ? inner.slice(1).trim() : inner;
      const tagName = normalized.split(/\s+/)[0] || "";
      if (!/^[A-Za-z][\w:-]*$/.test(tagName)) {
        return `&lt;${innerRaw}&gt;`;
      }

      const attrPart = normalized.slice(tagName.length);
      if (/[\u3400-\u9fff，。；：“”‘’、《》【】（）]/u.test(attrPart)) {
        return `&lt;${innerRaw}&gt;`;
      }

      return match;
    }
  );

  // VitePress enables attrs-style parsing (`{...}`), which can turn prompt text
  // in blockquotes into invalid HTML attributes. Escape braces in quote lines.
  const escapedAttrsInQuotes = escapedInvalidTagLikeContent.replace(
    /\{([^{}\n]+)\}/g,
    (_match, inner) => `&#123;${inner}&#125;`
  );

  const escapedMustache = escapedAttrsInQuotes
    .replace(/\{\{/g, "&#123;&#123;")
    .replace(/\}\}/g, "&#125;&#125;");

  // Prevent plain shell snippets like "./nexus" in body text from being
  // interpreted as relative URLs by markdown tooling.
  return escapedMustache
    .split(/\r?\n/)
    .map((line) => {
      if (/\]\([^)]+\)/.test(line)) return line;
      if (/^\[[^\]]+\]:\s*\.\//.test(line)) return line;
      if (/(src|href)=["']\.\//i.test(line)) return line;
      if (line.includes("`")) return line;
      return line.replace(
        /(?<![`\\])(\.\/[^\s，。；：！？、）】>"'`)]*)/g,
        (_match, cmd) => `\`${cmd || "./"}\``
      );
    })
    .join("\n");
}

async function syncNotes() {
  if (!(await exists(sourceDir))) {
    throw new Error(`Source note directory not found: ${sourceDir}`);
  }

  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(targetDir, { recursive: true });

  const sourceFiles = await walkFiles(sourceDir);
  const markdownFiles = sourceFiles.filter(isMarkdownFile);
  let skippedMarkdownCount = 0;
  let autoSkippedDotSlashCount = 0;

  const assetSourcePaths = new Set();
  const sourceDirNormalized = normalizeFsPath(sourceDir);

  for (const sourceMarkdown of markdownFiles) {
    const relPath = path.relative(sourceDir, sourceMarkdown);
    if (skippedMarkdownRelPaths.has(relPath)) {
      skippedMarkdownCount += 1;
      continue;
    }
    const destMarkdown = path.join(targetDir, relPath);
    const originalContent = await fs.readFile(sourceMarkdown, "utf8");
    const sanitizedContent = sanitizeMarkdownForVitePress(originalContent);
    const markdownSafeContent = replaceMissingLocalMarkdownLinks(
      sanitizedContent,
      sourceMarkdown
    );
    const referenceSafeContent = replaceMissingReferenceLinks(
      markdownSafeContent,
      sourceMarkdown
    );
    const finalContent = replaceMissingLocalHtmlLinks(referenceSafeContent, sourceMarkdown);

    if (finalContent.includes("./")) {
      skippedMarkdownCount += 1;
      autoSkippedDotSlashCount += 1;
      continue;
    }

    await fs.mkdir(path.dirname(destMarkdown), { recursive: true });
    await fs.writeFile(destMarkdown, finalContent, "utf8");

    const refs = parseMarkdownRefs(originalContent);
    const markdownDir = path.dirname(sourceMarkdown);

    for (const ref of refs) {
      if (isExternalOrIgnoredRef(ref)) continue;

      let candidate = stripQueryAndHash(ref);
      if (!candidate) continue;

      try {
        candidate = decodeURIComponent(candidate);
      } catch {
        // Keep original candidate if decode fails.
      }

      const absPath = path.resolve(markdownDir, candidate);
      const absPathNormalized = normalizeFsPath(absPath);
      if (!absPathNormalized.startsWith(sourceDirNormalized)) continue;
      if (!(await exists(absPath))) continue;

      const stat = await fs.stat(absPath);
      if (!stat.isFile()) continue;
      if (isMarkdownFile(absPath)) continue;

      assetSourcePaths.add(absPath);
    }
  }

  for (const assetSourcePath of assetSourcePaths) {
    const relPath = path.relative(sourceDir, assetSourcePath);
    const destAssetPath = path.join(targetDir, relPath);
    await copyFileWithDirs(assetSourcePath, destAssetPath);
  }

  const sourceIndexPath = path.join(sourceDir, "index.md");
  if (!(await exists(sourceIndexPath))) {
    await fs.writeFile(path.join(targetDir, "index.md"), landingIndexContent, "utf8");
  }

  console.log(
    `[notes:sync] Markdown files: ${
      markdownFiles.length - skippedMarkdownCount
    } (skipped: ${skippedMarkdownCount}, auto-dot-slash: ${autoSkippedDotSlashCount}), referenced assets: ${assetSourcePaths.size}`
  );
}

syncNotes().catch((error) => {
  console.error("[notes:sync] Failed:", error.message);
  process.exit(1);
});
