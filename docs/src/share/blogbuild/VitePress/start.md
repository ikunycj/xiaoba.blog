---
order: 1
---
# 快速上手
## 新建项目
VitePress 构建初始化项目极其简单，只需要简单几步即可完成。
[这是官网推荐的快速上手教程](https://vitepress.dev/zh/guide/getting-started)

::: tip 提示
当然，如果你觉得官网配置太少，配置太麻烦，也可以基于别人的模版进行配置。
:::

## 使用我的博客模版

>[!TIP]
>我的[小八博客](https://github.com/ikunycj/xiaoba.my)可以作为模版，基本上完成了绝大部分配置，如果想做一个和我的博客差不多的博客，可以直接下载我的博客作为模版进行修改。


### 1.前置准备
- 安装 Node.js 20+

### 2.克隆模版
#### 命令行操作
在对应的目录下，执行以下命令克隆模版：
```bash
git init # 初始化 Git 仓库
git clone https://github.com/ikunycj/xiaoba.my.git # 克隆模版仓库
```
#### 手动克隆
![s](/src/share/blogbuild/VitePress/githubblog.png)

### 3.安装依赖
然后进入项目目录，安装依赖：
::: danger 警告
此处使用[pnpm](https://pnpm.io/zh/)作为包管理器，而不是[npm](https://www.npmjs.com/)！
:::
```bash
pnpm install # 安装依赖
```
### 4.启动开发环境
```bash
pnpm dev # 启动开发环境
```
这时候你可以尝试访问 http://localhost:5173 看到你的博客首页了。
### 5.自动化部署同步
你可以把你克隆下来的项目传送到github上，实现自动化部署(每当你更新github仓库，你的博客也就会自动同步)
下面我推荐两种方式
1. 使用github action
2. 使用vercel

## 使用其他人的模版
当然你也可以在网上找到许多优秀的vitpress模版，然后直接下载使用。
不过不同的模版可能有不同的配置，你可能需要自己修改才能让它正常工作。