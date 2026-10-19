# 图片与代码推送流水线

图床使用独立仓库 `ikunycj/xiaoba.blog-images`，本地检出目录为 `docs.source/`，不进入博客仓库。
脚本来自博客根目录的 `package.json`；`new-api/electron/package.json` 没有图片上传命令。

## 日常使用

首次在克隆目录执行 `npm install`（会自动安装 hooks），或者执行：

```bash
npm run hooks:install
```

以后仍使用常规 Git 命令：

```bash
git add <本次文章、图片和代码>
git commit -m "更新文章"
git push
```

流水线顺序：

1. **pre-commit**：只处理暂存的公开 Markdown，以及暂存图片所对应的文章。复制图片到图床工作区，将暂存正文中的本地图片替换为带 SHA-256 内容标识的 URL。保持本地原图，不删除附件，不把正文中未暂存的编辑带入提交。
2. **pre-push**：检查本次实际待推送提交，而不是工作区。先提交并推送图床，再核对正文引用的图床路径存在，最后才允许博客代码 push。
3. 图片上传失败时，博客 push 被阻止。修复网络或认证后重新 `git push`，即便图床工作区已干净也会重试未推送的图片提交。

`pre-push` 阶段不会创建博客提交或自动修改分支引用，避免 Git 已计算待推送 SHA 后又生成提交、最终实际推送旧 SHA。绕过 pre-commit 的本地图片提交会被 pre-push 拦截；重新暂存并提交即可。删除分支和推送非提交标签不处理文章图片。

## 手动命令

```bash
# 指定文章；不传参数则扫描公开 content/
npm run images:prepare -- content/note/AI/Agent/Codex/ChatGPT保姆级安装教程.md

# 提交并上传已准备的图片
npm run images:push

# 扫描并上传
npm run images:sync

# 真实本地裸仓库集成测试，不访问生产仓库
npm run test:images
```

首次同步会自动克隆图床。使用 sparse/partial clone，避免拉取整个历史图床的二进制文件。
如需要 SSH 推送，可单独设置图床仓库 push URL：

```bash
git -C docs.source remote set-url --push origin git@github.com:ikunycj/xiaoba.blog-images.git
```

## 安全和边界

- 不处理 `content/local/`、`content/self/`、`.obsidian/`、隐藏目录、代码块和注释中的示例。
- 新增缺图、符号链接图片、越界图片、图床仓库中的非图片变更/删除会停止流水线。
- 原有缺失图片在文章迁移/普通编辑中保持不变并报告，不会生成虚假的 URL；新引入的缺图仍会失败。
- 图床使用内容哈希文件名，同名图片替换不会丢失新内容或覆盖旧图片。
- 不自动公开 PDF；PDF 是单独的发布文件，不属于图片上传任务。
- 安装只设置当前仓库的 `core.hooksPath`；原有钩子路径记录到本地配置并串联执行，不改全局配置。
- 图片仓库只接受快进合并；远端并行更新导致分叉时停止，不强推、不自动覆盖，请单独处理图床分支后重试。
- hooks 属于本地 Git 流程，`git push --no-verify` 可绕过；新克隆必须安装依赖或运行 `hooks:install`。CI 的只读构建不负责写图床或提交正文。
