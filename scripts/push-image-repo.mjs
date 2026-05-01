/**
 * images:push
 *
 * 将 docs.source/ 作为独立 git 仓库执行 add / commit / push
 *
 * 前提：docs.source/ 已经预先 git init 并设置好 remote
 *   cd docs.source
 *   git init
 *   git remote add origin https://github.com/ikunycj/xiaoba.blog-images.git
 */

import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const REPO_ROOT = process.cwd()
const SOURCE_ROOT = resolve(REPO_ROOT, 'docs.source')

function run(cmd, cwd) {
  return execSync(cmd, { cwd, encoding: 'utf8', stdio: 'pipe' }).trim()
}

function main() {
  console.log('▶ images:push 开始')
  console.log(`  图床目录：${SOURCE_ROOT}`)

  // 检查 docs.source 是否存在
  if (!existsSync(SOURCE_ROOT)) {
    console.error('✖ docs.source/ 目录不存在，请先运行 images:prepare')
    process.exit(1)
  }

  // 检查是否已初始化 git
  const gitDir = resolve(SOURCE_ROOT, '.git')
  if (!existsSync(gitDir)) {
    console.error('✖ docs.source/ 尚未初始化为 git 仓库')
    console.error('  请先执行：')
    console.error('    cd docs.source')
    console.error('    git init')
    console.error('    git remote add origin https://github.com/ikunycj/xiaoba.blog-images.git')
    process.exit(1)
  }

  // 检查是否有 remote
  let remotes = ''
  try {
    remotes = run('git remote', SOURCE_ROOT)
  } catch {
    remotes = ''
  }
  if (!remotes) {
    console.error('✖ docs.source/ 尚未配置 git remote')
    console.error('  请先执行：')
    console.error('    cd docs.source')
    console.error('    git remote add origin https://github.com/ikunycj/xiaoba.blog-images.git')
    process.exit(1)
  }

  // git add .
  console.log('\n  git add ...')
  run('git add .', SOURCE_ROOT)

  // 检查是否有可提交的变更
  let status = ''
  try {
    status = run('git status --porcelain', SOURCE_ROOT)
  } catch {
    status = ''
  }

  if (!status) {
    console.log('  没有新变更，跳过 commit 和 push')
    console.log('\n✅ images:push 完成（无变更）')
    return
  }

  // git commit
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const commitMsg = `sync images ${timestamp}`
  console.log(`  git commit -m "${commitMsg}"`)
  run(`git commit -m "${commitMsg}"`, SOURCE_ROOT)

  // git push
  console.log('  git push...')
  try {
    // 第一次推送时自动设置上游分支
    const pushOutput = run('git push --set-upstream origin HEAD', SOURCE_ROOT)
    console.log(`  ${pushOutput || 'push 成功'}`)
  } catch (err) {
    console.error('✖ git push 失败：')
    console.error(err.message || err)
    process.exit(1)
  }

  console.log('\n✅ images:push 完成')
}

main()
