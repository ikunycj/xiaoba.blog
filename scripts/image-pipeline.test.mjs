import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  chmodSync, cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { checkPush, git, prepareImages, pushImages, rewriteMarkdown } from './image-pipeline.mjs'

const PROJECT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const RAW = 'https://images.example.invalid/master'

function write(root, path, value) {
  mkdirSync(dirname(resolve(root, path)), { recursive: true })
  writeFileSync(resolve(root, path), value)
}

function init(root, bare = false) {
  mkdirSync(root, { recursive: true })
  git(root, ['init', ...(bare ? ['--bare'] : []), '--initial-branch=master'])
  git(root, ['config', 'core.hooksPath', '.git/no-hooks'])
  if (!bare) {
    git(root, ['config', 'user.name', 'Image pipeline test'])
    git(root, ['config', 'user.email', 'test@example.invalid'])
  }
}

function fixture(t) {
  const directory = mkdtempSync(resolve(tmpdir(), 'blog-image-test-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const root = resolve(directory, 'blog')
  const remote = resolve(directory, 'images.git')
  const codeRemote = resolve(directory, 'blog.git')
  const seed = resolve(directory, 'seed')
  init(root)
  init(remote, true)
  init(codeRemote, true)
  init(seed)
  write(seed, 'README.md', 'Images\n')
  git(seed, ['add', '.'])
  git(seed, ['commit', '-m', 'Initial image repo'])
  git(seed, ['remote', 'add', 'origin', remote])
  git(seed, ['push', '-u', 'origin', 'master'])
  write(root, 'package.json', JSON.stringify({
    type: 'module', imageRepository: { remote, rawBase: RAW, branch: 'master' },
  }))
  write(root, '.gitignore', 'docs.source/\n')
  write(root, 'README.md', 'Blog\n')
  git(root, ['add', '.'])
  git(root, ['commit', '-m', 'Initial blog'])
  git(root, ['remote', 'add', 'origin', codeRemote])
  git(root, ['push', '-u', 'origin', 'master'])
  git(root, ['clone', remote, 'docs.source'])
  git(resolve(root, 'docs.source'), ['config', 'core.hooksPath', '.git/no-hooks'])
  git(resolve(root, 'docs.source'), ['config', 'user.name', 'Image pipeline test'])
  git(resolve(root, 'docs.source'), ['config', 'user.email', 'test@example.invalid'])
  return { root, remote, codeRemote }
}

function installHooks(root) {
  for (const name of ['image-pipeline.mjs', 'install-git-hooks.mjs']) {
    cpSync(resolve(PROJECT, 'scripts', name), resolve(root, 'scripts', name), { recursive: false })
  }
  for (const name of ['pre-commit', 'pre-push']) {
    write(root, `.githooks/${name}`, readFileSync(resolve(PROJECT, '.githooks', name)))
    chmodSync(resolve(root, '.githooks', name), 0o755)
  }
  const installed = spawnSync(process.execPath, ['scripts/install-git-hooks.mjs'], { cwd: root, encoding: 'utf8' })
  assert.equal(installed.status, 0, installed.stderr)
}

test('Markdown preserves code, comments, image titles and Obsidian captions', () => {
  const source = '![caption](<screen shot.png> "title")\n![[图.png|说明]]\n![[图.png|300]]\n'
    + '```md\n![[example.png]]\n```\n`![[inline.png]]`\n<!-- ![[hidden.png]] -->\n![r](https://example.invalid/a.png)\n'
  const local = []
  const result = rewriteMarkdown(source, (src, { remote }) => {
    if (remote) return null
    local.push(src)
    return `${RAW}/${encodeURIComponent(src)}`
  })
  assert.deepEqual(local, ['screen shot.png', '图.png', '图.png'])
  assert.ok(result.includes('![caption](' + RAW + '/screen%20shot.png "title")'))
  assert.ok(result.includes('![说明]('))
  assert.ok(result.includes('```md\n![[example.png]]\n```'))
  assert.ok(result.includes('`![[inline.png]]`'))
  assert.ok(result.includes('<!-- ![[hidden.png]] -->'))
})

test('shared images are copied once, URLs encoded and reruns idempotent', (t) => {
  const { root } = fixture(t)
  write(root, 'content/note/图 片.png', Buffer.from('first image'))
  write(root, 'content/note/a.md', '![[图 片.png]]\n')
  write(root, 'content/note/b.md', '![说明](<图 片.png>)\n')
  const first = prepareImages(root)
  assert.equal(first.assets.length, 1)
  assert.equal(first.documents.length, 2)
  assert.ok(readFileSync(resolve(root, 'content/note/a.md'), 'utf8').includes('%E5%9B%BE%20%E7%89%87.'))
  assert.equal(readFileSync(resolve(root, 'docs.source', first.assets[0]), 'utf8'), 'first image')
  assert.ok(existsSync(resolve(root, 'content/note/图 片.png')))
  assert.deepEqual(prepareImages(root).assets, [])
})

test('replacing same-name image never discards new bytes or overwrites historical URL', (t) => {
  const { root } = fixture(t)
  write(root, 'content/note/a.png', 'one')
  write(root, 'content/note/a.md', '![[a.png]]\n')
  const first = prepareImages(root)
  write(root, 'content/note/a.png', 'two')
  write(root, 'content/note/a.md', '![[a.png]]\n')
  const second = prepareImages(root)
  assert.notEqual(first.assets[0], second.assets[0])
  assert.equal(readFileSync(resolve(root, 'docs.source', first.assets[0]), 'utf8'), 'one')
  assert.equal(readFileSync(resolve(root, 'docs.source', second.assets[0]), 'utf8'), 'two')
})

test('missing new image fails before rewriting any file or index entry', (t) => {
  const { root } = fixture(t)
  write(root, 'content/note/good.png', 'good')
  write(root, 'content/note/a.md', '![[good.png]]\n')
  write(root, 'content/note/b.md', '![[missing.png]]\n')
  assert.throws(() => prepareImages(root), /找不到图片/)
  assert.equal(readFileSync(resolve(root, 'content/note/a.md'), 'utf8'), '![[good.png]]\n')
  assert.equal(git(resolve(root, 'docs.source'), ['status', '--porcelain']), '')
})

test('private/local content is never uploaded and cannot be selected explicitly', (t) => {
  const { root } = fixture(t)
  for (const directory of ['self', 'local', '.obsidian']) {
    write(root, `content/${directory}/secret.png`, 'not public')
    write(root, `content/${directory}/a.md`, '![[secret.png]]\n')
  }
  assert.deepEqual(prepareImages(root).assets, [])
  assert.throws(() => prepareImages(root, { files: ['content/self/a.md'] }), /非公开内容/)
})

test('staged Markdown and staged image bytes do not sweep in unstaged edits', (t) => {
  const { root } = fixture(t)
  write(root, 'content/note/a.md', 'staged\n![[a.png]]\n')
  write(root, 'content/note/a.png', 'staged image')
  git(root, ['add', 'content'])
  write(root, 'content/note/a.md', 'unstaged\n![[a.png]]\n')
  write(root, 'content/note/a.png', 'unstaged image')
  const prepared = prepareImages(root, { staged: true })
  const indexed = git(root, ['show', ':content/note/a.md'], { binary: true }).toString()
  assert.ok(indexed.startsWith('staged\n'))
  assert.ok(indexed.endsWith('\n'))
  assert.ok(indexed.includes(RAW))
  assert.equal(readFileSync(resolve(root, 'content/note/a.md'), 'utf8'), 'unstaged\n![[a.png]]\n')
  assert.equal(readFileSync(resolve(root, 'docs.source', prepared.assets[0]), 'utf8'), 'staged image')
})

test('existing missing references survive a rename; newly introduced missing images still fail', (t) => {
  const { root } = fixture(t)
  write(root, 'old/a.md', 'old article\n![[lost.png]]\n')
  git(root, ['add', 'old'])
  git(root, ['commit', '-m', 'Old incomplete article'])
  mkdirSync(resolve(root, 'content/note'), { recursive: true })
  git(root, ['mv', 'old/a.md', 'content/note/a.md'])
  assert.equal(prepareImages(root, { staged: true }).inheritedMissing, 1)
  write(root, 'content/note/a.md', 'old article\n![[lost.png]]\n![[new-missing.png]]\n')
  git(root, ['add', 'content/note/a.md'])
  assert.throws(() => prepareImages(root, { staged: true }), /new-missing.png/)
})

test('failed image push is retried from a clean image worktree', (t) => {
  const { root, remote } = fixture(t)
  write(root, 'content/note/a.md', '![[a.png]]\n')
  write(root, 'content/note/a.png', 'image')
  prepareImages(root)
  write(remote, 'hooks/pre-receive', '#!/bin/sh\nexit 1\n')
  chmodSync(resolve(remote, 'hooks/pre-receive'), 0o755)
  git(remote, ['config', 'core.hooksPath', 'hooks'])
  assert.throws(() => pushImages(root), /push/)
  assert.equal(git(resolve(root, 'docs.source'), ['status', '--porcelain']), '')
  write(remote, 'hooks/pre-receive', '#!/bin/sh\nexit 0\n')
  const head = pushImages(root)
  assert.equal(git(remote, ['rev-parse', 'master']), head)
})

test('unconverted committed local images block code push even if current worktree differs', (t) => {
  const { root } = fixture(t)
  const old = git(root, ['rev-parse', 'HEAD'])
  write(root, 'content/note/a.md', '![[a.png]]\n')
  write(root, 'content/note/a.png', 'image')
  git(root, ['add', 'content'])
  git(root, ['commit', '-m', 'Bypassed image conversion'])
  const head = git(root, ['rev-parse', 'HEAD'])
  write(root, 'content/note/a.md', 'Worktree no longer contains local images\n')
  assert.throws(() => checkPush(root, `refs/heads/master ${head} refs/heads/master ${old}\n`), /未转换的本地图片/)
})

test('real commit/push hooks upload images first, preserve previous hooks and push the exact committed code', (t) => {
  const { root, remote, codeRemote } = fixture(t)
  mkdirSync(resolve(root, 'scripts'), { recursive: true })
  write(root, 'old-hooks/pre-push', '#!/bin/sh\ncat > previous-hook-input.txt\n')
  chmodSync(resolve(root, 'old-hooks/pre-push'), 0o755)
  git(root, ['config', 'core.hooksPath', 'old-hooks'])
  installHooks(root)
  assert.equal(git(root, ['config', 'images.previousHooksPath']), 'old-hooks')
  write(root, 'content/note/a.md', '![[a.png]]\n')
  write(root, 'content/note/a.png', 'actual image')
  git(root, ['add', 'content'])
  git(root, ['commit', '-m', 'Article with images'])
  const article = git(root, ['show', 'HEAD:content/note/a.md'])
  assert.ok(article.includes(RAW))
  write(remote, 'hooks/pre-receive', '#!/bin/sh\nexit 1\n')
  chmodSync(resolve(remote, 'hooks/pre-receive'), 0o755)
  git(remote, ['config', 'core.hooksPath', 'hooks'])
  const before = git(codeRemote, ['rev-parse', 'master'])
  assert.throws(() => git(root, ['push', 'origin', 'master']), /push/)
  assert.equal(git(codeRemote, ['rev-parse', 'master']), before)
  write(remote, 'hooks/pre-receive', '#!/bin/sh\nexit 0\n')
  git(root, ['push', 'origin', 'master'])
  assert.equal(git(codeRemote, ['rev-parse', 'master']), git(root, ['rev-parse', 'HEAD']))
  assert.equal(git(remote, ['rev-parse', 'master']), git(resolve(root, 'docs.source'), ['rev-parse', 'HEAD']))
  assert.ok(readFileSync(resolve(root, 'previous-hook-input.txt'), 'utf8').includes('refs/heads/master'))
  assert.equal(git(root, ['config', 'core.hooksPath']), '.githooks')
})

test('an image-only staged update also updates the hosted URL in the committed article', (t) => {
  const { root } = fixture(t)
  write(root, 'content/note/a.md', '![[a.png]]\n')
  write(root, 'content/note/a.png', 'version one')
  git(root, ['add', 'content'])
  prepareImages(root, { staged: true })
  git(root, ['commit', '-m', 'First version'])
  const firstUrl = git(root, ['show', 'HEAD:content/note/a.md'])
  write(root, 'content/note/a.png', 'version two')
  git(root, ['add', 'content/note/a.png'])
  const result = prepareImages(root, { staged: true })
  assert.deepEqual(result.documents, ['content/note/a.md'])
  const nextUrl = git(root, ['show', ':content/note/a.md'])
  assert.notEqual(nextUrl, firstUrl)
  assert.equal(readFileSync(resolve(root, 'docs.source', result.assets[0]), 'utf8'), 'version two')
})

test('symlinks to private assets are rejected for both staged and worktree preparation', async (t) => {
  const { symlinkSync } = await import('node:fs')
  const { root } = fixture(t)
  write(root, 'content/self/key.png', 'private bytes')
  write(root, 'content/note/a.md', '![[linked.png]]\n')
  symlinkSync('../self/key.png', resolve(root, 'content/note/linked.png'))
  assert.throws(() => prepareImages(root), /拒绝越界图片/)
  git(root, ['add', 'content/note'])
  assert.throws(() => prepareImages(root, { staged: true }), /符号链接/)
})

test('pushing a new branch validates the full tree, not only its last commit', (t) => {
  const { root } = fixture(t)
  write(root, 'content/note/a.md', '![[unconverted.png]]\n')
  write(root, 'content/note/unconverted.png', 'image')
  git(root, ['add', 'content'])
  git(root, ['commit', '-m', 'Unconverted article'])
  write(root, 'README.md', 'Unrelated later change\n')
  git(root, ['add', 'README.md'])
  git(root, ['commit', '-m', 'Later change'])
  const head = git(root, ['rev-parse', 'HEAD'])
  assert.throws(() => checkPush(root, `refs/heads/master ${head} refs/heads/new ${'0'.repeat(40)}\n`), /未转换的本地图片/)
})
