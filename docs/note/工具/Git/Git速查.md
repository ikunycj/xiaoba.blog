**忽略文件**：`.gitignore` 文件
# [Git 的三种状态](https://javaguide.cn/tools/git/git-intro.html#git-%E7%9A%84%E4%B8%89%E7%A7%8D%E7%8A%B6%E6%80%81)

Git 有三种状态，你的文件可能处于其中之一：

1. **已提交（committed）**：数据已经安全的保存在本地数据库中。
2. **已修改（modified）**：已修改表示修改了文件，但还没保存到数据库中。
3. **已暂存（staged）**：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。

由此引入 Git 项目的三个工作区域的概念：
	**Git 仓库(.git directory)**
	**工作目录(Working Directory)** 
	**暂存区域(Staging Area)** 

![](https://oss.javaguide.cn/github/javaguide/tools/git/2019-3areas.png)

**基本的 Git 工作流程如下：**

1. 在工作目录中修改文件。
2. 暂存文件，将文件的快照放入暂存区域。
3. 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。

# [Git 使用](https://javaguide.cn/tools/git/git-intro.html#git-%E4%BD%BF%E7%94%A8%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)

## 一.获取 Git 仓库

有两种取得 Git 项目仓库的方法。
#### 1.创建仓库
1. 在现有目录中初始化仓库: 进入项目目录运行 `git init` 命令,该命令将创建一个名为 `.git` 的子目录。
```bash
git init
```

#### 2.拉取远程仓库
 从一个服务器克隆一个现有的 Git 仓库: `git clone [url]` 自定义本地仓库的名字: `git clone [url] directoryname`
```bash
git clone [url] 

自定义本地仓库
git clone [url] local-repository-name
```

## 二.更新仓库

#### 1.检测当前文件状态: 
```bash
git status
```

#### 2.提出更改（把它们添加到暂存区）：
```bash
git add filename (针对特定文件)
git add *        (所有文件)
git add *.txt （支持通配符，所有 .txt 文件）
```

#### 3.提交更新
每次准备提交前，先用 `git status` 看下，是不是都已暂存起来了， 然后再运行提交命令 `git commit`）
```bash
git commit -m "代码提交信息"
```

#### 4.跳过使用暂存区域更新的方式
`git commit` 加上 `-a` 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add` 步骤。
```bash
git commit -a -m "代码提交信息"
```

#### 5.移除文件
（从暂存区域移除，然后提交。)
```bash
git rm fileName
```

#### 6.对文件重命名
(这个命令相当于`mv README.md README`、`git rm README.md`、`git add README` 这三条命令的集合)
```
git mv README.md README
```

## 三.推送到远程仓库

#### 1.添加远程仓库
如果你还没有克隆现有仓库，并欲将你的仓库连接到某个远程服务器，你可以使用如下命令添加：`git remote add origin <server>` ,比如我们要让本地的一个仓库和 GitHub 上创建的一个仓库关联可以这样`git remote add origin https://github.com/Snailclimb/test.git`
```bash
git remote add origin <server>
```

#### 2.提交到远程仓库
将这些改动提交到远端仓库：`git push origin master` (可以把 _master_ 换成你想要推送的任何分支)
如此你就能够将你的改动推送到所添加的服务器上去了。
```bash
git push origin master
```


## 四.远程仓库的移除与重命名

#### 1.重命名
将 test 重命名为 test1
```bash
git remote rename test test1
```
#### 2.移除
移除远程仓库 test1
```bash
git remote rm test1
```

## 五.查看提交历史
#### 1.查看历史
```bash
git log
```
在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史。 完成这个任务最简单而又有效的工具是 `git log` 命令。`git log` 会按提交时间列出所有的更新，最近的更新排在最上面。

**可以添加一些参数来查看自己希望看到的内容：**

#### 2.只看某个人的提交记录：
```bash
git log --author=bob
```

## 六.撤销操作

#### 1.重新提交
有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 `--amend` 选项的提交命令尝试重新提交：
```bash
git commit --amend
```

#### 2.取消暂存的文件
```
git reset filename
```

#### 3.撤消对文件的修改:
```
git checkout -- filename
```

#### 4.假如你想丢弃你在本地的所有改动与提交，可以到服务器上获取最新的版本历史，并将你本地主分支指向它：
```
git fetch origin
git reset --hard origin/master
```

## 七.分支

分支是用来将特性开发绝缘开来的。在你创建仓库的时候，_master_ 是“默认”的分支。在其他分支上进行开发，完成后再将它们合并到主分支上。

我们通常在开发新功能、修复一个紧急 bug 等等时候会选择创建分支。单分支开发好还是多分支开发好，还是要看具体场景来说。

#### 1.创建一个名字叫做 test 的分支
```bash
git branch test
```

#### 2.切换当前分支到 test
（当你切换分支的时候，Git 会重置你的工作目录，使其看起来像回到了你在那个分支上最后一次提交的样子。 Git 会自动添加、删除、修改文件以确保此时你的工作目录和这个分支最后一次提交时的样子一模一样）
```bash
git checkout test
```

![](https://oss.javaguide.cn/github/javaguide/tools/git/2019-3%E5%88%87%E6%8D%A2%E5%88%86%E6%94%AF.png)

#### 3.创建分支并切换
你也可以直接这样创建分支并切换过去(上面两条命令的合写)
```bash
git checkout -b feature_x
```

#### 4.合并分支(可能会有冲突)
```bash
 git merge test
```

#### 5.删除分支
```bash
git branch -d feature_x
```