# Repository Guidelines

## Project Structure & Module Organization

This repository is a VitePress and Vue 3 static blog. Site configuration lives in `docs/.vitepress/config.mts`; custom UI code is split across `docs/.vitepress/theme/components/`, `views/`, and `utils/`. Public articles and pages are stored under `docs/blogs/`, while long-form notes live under `docs/note/`. Put browser-served images and other static files in `docs/blogs/public/`. Build helpers belong in `scripts/`; design references live in `DESIGN.md`, `PRODUCT.md`, and `design-preview/`. `docs/local/` and `docs/self/` are excluded from the public site and must not be treated as secure storage.

## Build, Test, and Development Commands

Use Node.js 18+ and npm 8+.

- `npm install` installs dependencies.
- `npm run docs:dev` regenerates the blog index and starts the development server.
- `npm run docs:build` performs the production VitePress build and is the required pre-PR check.
- `npm run docs:preview` serves the generated build locally.
- `npm run blog:index` rebuilds `docs/blogs/public/blog-index/` without starting VitePress.

Run `npm run images:prepare` only when updating image assets. `npm run images:push` publishes to the separate image repository and should be used deliberately.

## Coding Style & Naming Conventions

Use ES modules, single quotes in TypeScript/JavaScript, and two-space indentation with no tabs. The checked-in ESLint rules also require spaces before blocks and two-space Vue template/script indentation. No lint script exists, and the current flat config fails Vue plugin resolution; do not treat lint as a working gate until that configuration is repaired. Name Vue components in PascalCase (`ReadingProgress.vue`), utility modules in camelCase (`formatData.ts`), and scripts with descriptive kebab-case names. Preserve established Chinese content paths because renaming Markdown files changes public URLs.

## Testing Guidelines

There is currently no automated test framework or coverage threshold. Treat `npm run docs:build` as the minimum regression check. For UI work, inspect affected routes with `npm run docs:dev` at desktop and mobile widths, including dark mode when colors change. Verify navigation, search, images, and internal links relevant to the change.

## Commit & Pull Request Guidelines

History favors short Chinese summaries such as `优化UI`, with occasional `feat:` prefixes. Keep commits focused; prefer `<type>: <concise summary>`, for example `feat: 优化博客导航`. PRs should explain intent, list affected routes, report validation commands, and link an issue when applicable. Include before/after screenshots for visual changes and avoid unrelated `.obsidian` workspace churn.
