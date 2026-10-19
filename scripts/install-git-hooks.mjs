import { chmodSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { git } from './image-pipeline.mjs'

try {
  const root = git(process.cwd(), ['rev-parse', '--show-toplevel'], { optional: true })
  // npm install also runs in source archives and CI build environments without .git.
  if (root && existsSync(resolve(root, '.githooks/pre-push'))) {
    const current = git(root, ['config', '--get', 'core.hooksPath'], { optional: true })
    if (current && resolve(root, current) !== resolve(root, '.githooks')) {
      git(root, ['config', '--local', 'images.previousHooksPath', current])
    }
    chmodSync(resolve(root, '.githooks/pre-commit'), 0o755)
    chmodSync(resolve(root, '.githooks/pre-push'), 0o755)
    git(root, ['config', '--local', 'core.hooksPath', '.githooks'])
    console.log('已安装本仓库图片流水线；原有 hooksPath 已保留并串联，不修改全局配置。')
  }
} catch (error) {
  console.error(`安装 Git hooks 失败：${error.message}`)
  process.exitCode = 1
}
