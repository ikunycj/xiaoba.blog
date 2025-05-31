## [一键生成 Github 简历 & Github 年报](https://javaguide.cn/tools/git/github-tips.html#%E4%B8%80%E9%94%AE%E7%94%9F%E6%88%90-github-%E7%AE%80%E5%8E%86-github-%E5%B9%B4%E6%8A%A5)

通过 [https://resume.github.io/open in new window](https://resume.github.io/) 这个网站你可以一键生成一个在线的 Github 简历。

当时我参加的校招的时候，个人信息那里就放了一个在线的 Github 简历。我觉得这样会让面试官感觉你是一个内行，会提高一些印象分。

但是，如果你的 Github 没有什么项目的话还是不要放在简历里面了。生成后的效果如下图所示。

![Github简历](https://oss.javaguide.cn/2020-11/image-20201108192205620.png)

Github简历

通过 [https://www.githubtrends.io/wrappedopen in new window](https://www.githubtrends.io/wrapped) 这个网站，你可以生成一份 Github 个人年报，这个年报会列举出你在这一年的项目贡献情况、最常使用的编程语言、详细的贡献信息。

## [个性化 Github 首页](https://javaguide.cn/tools/git/github-tips.html#%E4%B8%AA%E6%80%A7%E5%8C%96-github-%E9%A6%96%E9%A1%B5)

Github 目前支持在个人主页自定义展示一些内容。展示效果如下图所示。

![个性化首页展示效果](https://oss.javaguide.cn/java-guide-blog/image-20210616221212259.png)

个性化首页展示效果

想要做到这样非常简单，你只需要`创建一个和你的 Github 账户同名的仓库`，然后自定义`README.md`的内容即可。

展示在你主页的自定义内容就是`README.md`的内容（_不会 Markdown 语法的小伙伴自行面壁 5 分钟_）。

![创建一个和你的Github账户同名的仓库](https://oss.javaguide.cn/java-guide-blog/image-20201107110309341.png)

创建一个和你的Github账户同名的仓库

这个也是可以玩出花来的！比如说：通过 [github-readme-statsopen in new window](https://hellogithub.com/periodical/statistics/click/?target=https://github.com/anuraghazra/github-readme-stats) 这个开源项目，你可以 README 中展示动态生成的 GitHub 统计信息。展示效果如下图所示。

![通过github-readme-stats动态生成GitHub统计信息](https://oss.javaguide.cn/java-guide-blog/image-20210616221312426.png)

通过github-readme-stats动态生成GitHub统计信息

关于个性化首页这个就不多提了，感兴趣的小伙伴自行研究一下。

## [自定义项目徽章](https://javaguide.cn/tools/git/github-tips.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%A1%B9%E7%9B%AE%E5%BE%BD%E7%AB%A0)

你在 Github 上看到的项目徽章都是通过 [https://shields.io/open in new window](https://shields.io/) 这个网站生成的。我的 JavaGuide 这个项目的徽章如下图所示。

![项目徽章](https://oss.javaguide.cn/2020-11/image-20201107143136559.png)

项目徽章

并且，你不光可以生成静态徽章，[shield.ioopen in new window](http://shield.io/) 还可以动态读取你项目的状态并生成对应的徽章。

![自定义项目徽章](https://oss.javaguide.cn/2020-11/image-20201107143502356.png)

自定义项目徽章

生成的描述项目状态的徽章效果如下图所示。

![描述项目状态的徽章](https://oss.javaguide.cn/2020-11/image-20201107143752642.png)

描述项目状态的徽章

## [自动为项目添加贡献情况图标](https://javaguide.cn/tools/git/github-tips.html#%E8%87%AA%E5%8A%A8%E4%B8%BA%E9%A1%B9%E7%9B%AE%E6%B7%BB%E5%8A%A0%E8%B4%A1%E7%8C%AE%E6%83%85%E5%86%B5%E5%9B%BE%E6%A0%87)

通过 repobeats 这个工具可以为 Github 项目添加如下图所示的项目贡献基本情况图表，挺不错的 👍

地址：[https://repobeats.axiom.co/open in new window](https://repobeats.axiom.co/) 。

## [Github 表情](https://javaguide.cn/tools/git/github-tips.html#github-%E8%A1%A8%E6%83%85)

![Github表情](https://oss.javaguide.cn/2020-11/image-20201107162254582.png)

Github表情

如果你想要在 Github 使用表情的话，可以在这里找找：[www.webfx.com/tools/emoji-cheat-sheet/open in new window](https://www.webfx.com/tools/emoji-cheat-sheet/)。

![在线Github表情](https://oss.javaguide.cn/2020-11/image-20201107162432941.png)

在线Github表情

## [高效阅读 Github 项目的源代码](https://javaguide.cn/tools/git/github-tips.html#%E9%AB%98%E6%95%88%E9%98%85%E8%AF%BB-github-%E9%A1%B9%E7%9B%AE%E7%9A%84%E6%BA%90%E4%BB%A3%E7%A0%81)

Github 前段时间推出的 Codespaces 可以提供类似 VS Code 的在线 IDE，不过目前还没有完全开发使用。

简单介绍几种我最常用的阅读 Github 项目源代码的方式。

### [Chrome 插件 Octotree](https://javaguide.cn/tools/git/github-tips.html#chrome-%E6%8F%92%E4%BB%B6-octotree)

这个已经老生常谈了，是我最喜欢的一种方式。使用了 Octotree 之后网页侧边栏会按照树形结构展示项目，为我们带来 IDE 般的阅读源代码的感受。

![Chrome插件Octotree](https://oss.javaguide.cn/2020-11/image-20201107144944798.png)

Chrome插件Octotree

### [Chrome 插件 SourceGraph](https://javaguide.cn/tools/git/github-tips.html#chrome-%E6%8F%92%E4%BB%B6-sourcegraph)

我不想将项目 clone 到本地的时候一般就会使用这种方式来阅读项目源代码。SourceGraph 不仅可以让我们在 Github 优雅的查看代码，它还支持一些骚操作，比如：类之间的跳转、代码搜索等功能。

当你下载了这个插件之后，你的项目主页会多出一个小图标如下图所示。点击这个小图标即可在线阅读项目源代码。

![](https://oss.javaguide.cn/2020-11/image-20201107145749659.png)

使用 SourceGraph 阅读代码的就像下面这样，同样是树形结构展示代码，但是我个人感觉没有 Octotree 的手感舒服。不过，SourceGraph 内置了很多插件，而且还支持类之间的跳转！

![](https://oss.javaguide.cn/2020-11/image-20201107150307314.png)

### [克隆项目到本地](https://javaguide.cn/tools/git/github-tips.html#%E5%85%8B%E9%9A%86%E9%A1%B9%E7%9B%AE%E5%88%B0%E6%9C%AC%E5%9C%B0)

先把项目克隆到本地，然后使用自己喜欢的 IDE 来阅读。可以说是最酸爽的方式了！

如果你想要深入了解某个项目的话，首选这种方式。一个`git clone` 就完事了。

## [扩展 Github 的功能](https://javaguide.cn/tools/git/github-tips.html#%E6%89%A9%E5%B1%95-github-%E7%9A%84%E5%8A%9F%E8%83%BD)

**Enhanced GitHub** 可以让你的 Github 更好用。这个 Chrome 插件可以可视化你的 Github 仓库大小，每个文件的大小并且可以让你快速下载单个文件。

![](https://oss.javaguide.cn/2020-11/image-20201107160817672.png)

## [自动为 Markdown 文件生成目录](https://javaguide.cn/tools/git/github-tips.html#%E8%87%AA%E5%8A%A8%E4%B8%BA-markdown-%E6%96%87%E4%BB%B6%E7%94%9F%E6%88%90%E7%9B%AE%E5%BD%95)

如果你想为 Github 上的 Markdown 文件生成目录的话，通过 VS Code 的 **Markdown Preview Enhanced** 这个插件就可以了。

生成的目录效果如下图所示。你直接点击目录中的链接即可跳转到文章对应的位置，可以优化阅读体验。

![](https://oss.javaguide.cn/2020-11/iShot2020-11-07%2016.14.14%20(1).png)

不过，目前 Github 已经自动为 Markdown 文件生成了目录，只是需要通过点击的方式才能显示出来。

![](https://oss.javaguide.cn/github/cosy/image-20211227093215005.png)

## [善用 Github Explore](https://javaguide.cn/tools/git/github-tips.html#%E5%96%84%E7%94%A8-github-explore)

其实，Github 自带的 Explore 是一个非常强大且好用的功能。不过，据我观察，国内很多 Github 用户都不知道这个到底是干啥的。

简单来说，Github Explore 可以为你带来下面这些服务：

1. 可以根据你的个人兴趣为你推荐项目；
2. Githunb Topics 按照类别/话题将一些项目进行了分类汇总。比如 [Data visualizationopen in new window](https://github.com/topics/data-visualization) 汇总了数据可视化相关的一些开源项目，[Awesome Listsopen in new window](https://github.com/topics/awesome) 汇总了 Awesome 系列的仓库；
3. 通过 Github Trending 我们可以看到最近比较热门的一些开源项目，我们可以按照语言类型以及时间维度对项目进行筛选；
4. Github Collections 类似一个收藏夹集合。比如 [Teaching materials for computational social scienceopen in new window](https://github.com/collections/teaching-computational-social-science) 这个收藏夹就汇总了计算机课程相关的开源资源，[Learn to Codeopen in new window](https://github.com/collections/learn-to-code) 这个收藏夹就汇总了对你学习编程有帮助的一些仓库；
5. ……

![](https://oss.javaguide.cn/github/javaguide/github-explore.png)

## [GitHub Actions 很强大](https://javaguide.cn/tools/git/github-tips.html#github-actions-%E5%BE%88%E5%BC%BA%E5%A4%A7)

你可以简单地将 GitHub Actions 理解为 Github 自带的 CI/CD ，通过 GitHub Actions 你可以直接在 GitHub 构建、测试和部署代码，你还可以对代码进行审查、管理 API、分析项目依赖项。总之，GitHub Actions 可以自动化地帮你完成很多事情。

关于 GitHub Actions 的详细介绍，推荐看一下阮一峰老师写的 [GitHub Actions 入门教程open in new window](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html) 。

GitHub Actions 有一个官方市场，上面有非常多别人提交的 Actions ，你可以直接拿来使用。

![](https://oss.javaguide.cn/github/javaguide/image-20211227100147433.png)
