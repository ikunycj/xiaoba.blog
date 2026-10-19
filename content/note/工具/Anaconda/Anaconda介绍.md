## Anaconda 介绍

**Anaconda** 是一个开源的 Python 发行版，他预装了 pandas、numpy、jupyter 等科学工具包，还预装了 Pycharm for community 等 Python 开发工具，能够帮助使用者无感的使用这些工具更好地进行数据分析等科学工作。Anaconda 的核心程式是 **conda**。

## Windows 用户

### 下载、安装 Anaconda

1. 访问 Anaconda 官网：[https://www.anaconda.com/download](https://www.anaconda.com/download)
2. 点击 Download 开始下载  
    ![](https://img2023.cnblogs.com/blog/3365361/202312/3365361-20231229222030505-786041346.png)
3. 双击下载完成的安装包，并按照提示安装，注意请按照图中选项勾选  
    选择下载路径时，请尽量**不要包含中文！！！**  
    如果您的电脑只有一个用户，那么建议选择“为所有用户安装”这个选项，方便之后的卸载和使用  
    ![](https://img2023.cnblogs.com/blog/3365361/202312/3365361-20231229222338714-113592082.png)

> 如果你不知道"Add Anaconda3 to my PATH environment variable"是什么意思或者电脑上没有 Python，请勾选

  ![](https://img2023.cnblogs.com/blog/3365361/202312/3365361-20231229222341893-351235279.png)

### conda 换源

由于conda软件仓库架设在国外，如果直接安装包，下载速度会非常慢，故需添加至少一个国内源

1. 在开始菜单中找到 Anaconda Prompt，打开
2. 输入下列指令：

```Shell
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/pro
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
conda config --set show_channel_urls yes
conda config --show channels
```

### 安装 mamba

1. 什么是 **mamba**？  
    mamba 是一个多线程的、用 C++ 重新实现的包管理器，他对环境中包的依赖冲突解析比 conda 要快速很多（用 conda 安装一个包 20-40 分钟真的是很常见的事情。。。）
2. 安装 mamba  
    在 Anaconda Prompt 中输入 `conda install mamba -n base -c conda-forge`，待解析完成后键入 y，回车，等待安装完成  
    ![](https://img2023.cnblogs.com/blog/3365361/202312/3365361-20231229231227236-263751733.png)  
    出现下列界面即安装完成  
    ![安装完成](https://img2023.cnblogs.com/blog/3365361/202312/3365361-20231229231230078-976140688.png)

### Anaconda 常用命令

**基础命令**

| 命令                                              | 作用                          |
| ----------------------------------------------- | --------------------------- |
| `conda --help`                                  | 查看帮助                        |
| `conda --version`                               | 查看 conda 版本                 |
| `conda config --show`                           | 查看 conda 的环境配置              |
| `conda update Anaconda`                         | 更新 Anaconda                 |
| `conda update conda`                            | 更新 conda（慎用）                |
| `conda <指令> --help`                             | 查看某一个指令的详细帮助                |
| `conda list`                                    | 查看当前环境安装了哪些包                |
| `conda list <包名>`                               | 查询是否已经安装了该包，包名支持通配符         |
| `conda search <包名>`                             | 查询 Anaconda 仓库中有没有你想要的包     |
| 若刚才已经安装了mamba                                   | 则下面几条可以将“conda”换为“mamba”来加速 |
| `conda install <包名>`                            | 在当前环境安装包                    |
| `conda install <包名>=<版本> -n <ENV_NAME> -c <仓库>` | 指定版本、环境等，除包名外都是可选项          |
| `conda remove/uninstall <包名>`                   | 在当前环境删除包                    |

**环境管理相关命令**，你也可以使用 Anaconda Navigator 进行可视化虚拟环境管理

| 命令                                       | 作用                         |
| ---------------------------------------- | -------------------------- |
| `conda create -n <ENV_NAME> python=<版本>` | 创建一个新的虚拟环境并指定 Python 版本    |
| `conda env list`                         | 查看有哪些虚拟环境，*号代表当前环境         |
| `conda activate <ENV_NAME>`              | 激活（切换到）一个虚拟环境，缺省值为 base 环境 |
| `conda deactivate`                       | 退出当前虚拟环境                   |
| `conda remove --name <ENV_NAME> --all`   | 删除这个虚拟环境的所有包和虚拟环境          |

**卸载/清理相关命令**，下载的包实际上会留在缓存里

|命令|作用|
|---|---|
|`conda clean -p`|清理没有用，没有安装的包|
|`conda clean -t`|清理 tarball|
|`conda clean --all`|清理所有包和 conda 的缓存文件|

### .condarc 配置文件

**.condarc**是 Anaconda 的配置文件，遵循 YAML 语法。  
该文件的位置可通过 `conda info` 查看，一般来说位于用户目录下  
Windows 下位于 `C:\Users\<Your_name>\.condarc`，即 `%USERPROFILE%\.condarc`  
MacOS/Linux 下位于 `$HOME/.condarc`

## Try Miniconda

> **Miniconda** 是什么？Anaconda 和它应该选谁？
> 
> - conda 是一种通用包管理系统，旨在构建和管理任何语言和任何类型的软件。举个例子：包管理与 Pip 的使用类似，环境管理则允许用户方便地安装不同版本的 Python 并可以快速切换。
> - Anaconda 则是一个打包的集合，里面预装好了 conda、最新版本的 Python、众多 Packages（不一定最新但稳定）、科学计算工具等等，就是把很多常用的、不常用的库都给你装好了。
> - Miniconda，顾名思义，它是 Anaconda 官方推出的“简洁版Anaconda”，只包含最基本的内容——Python 与 conda，以及相关的必须依赖项。对于存储空间要求严格的用户，Miniconda 是一个选择，它只包含最基本的东西，其他库需自己装。
> - 如果你是 Python 新手，或者你需要的所有库都在 Anaconda 的预装库中，那么 Anaconda 可能是更好的选择。它可以让你迅速开始你的项目，而无需担心库的安装和管理。
> - Miniconda 的环境更为简洁，可以根据实际需求来安装必要的包，避免不必要的存储占用。二者的安装包下载时间也会有明显区别。

安装 Miniconda，官网：[https://docs.conda.io/projects/miniconda/en/latest/](https://docs.conda.io/projects/miniconda/en/latest/)  
Miniconda 中的 conda 和 Anaconda 一致，指令完全一样，建议也下载 mamba

> 如果你不知道"Add Miniconda3 to my PATH environment variable"是什么意思或者电脑上没有 Python，请勾选

![](https://img2023.cnblogs.com/blog/3365361/202312/3365361-20231229235403042-2142026574.png)

## MacOS 用户

**所有安装流程跟 Windows 一样**，但教程中使用 cmd/Powershell 的地方你应该使用**“终端”**

> MacOS 的默认“终端”程序其实是 **zsh**，这是一个 UNIX shell  
> 如果你更倾向于使用 shell，那你可以使用 **Homebrew** 帮你完成安装 Python 的工作

### 打开终端：

在 Mac 上，请执行以下操作：

- 点按程序坞中的“启动台”图标 ，在搜索栏中键入“终端”，然后点按“终端”。
- 在“访达”中，打开“/应用程序/实用工具”文件夹，然后点按“终端”。

## Linux 用户

~~有人说 Anaconda 在 Linux 下的使用体验比 Windows 好一万倍~~  
对于 Linux 用户，常见的发行版仓库并没有提供 Anaconda，但官网给出了安装脚本  
进入 Anaconda 官网，在“Get Additional Installers”中下载 Linux 版本

```bash
$ cd Downloads                                  ## 切换到下载目录
$ chmod +x Anaconda3-2023.09-0-Linux-x86_64.sh  ## 修改为可执行属性
$ ./Anaconda3-2023.09-0-Linux-x86_64.sh         ## 运行安装脚本，注意不需要 sudo
$                                               ## 按照提示进行安装
```

**注意：**安装完成后检查自己的_shell配置文件_（如_.bashrc_），Anaconda 可能会默认让 shell 启动时自带 Anaconda 的虚拟环境，这会**严重影响 shell 启动速度**，一种可行的解决方法是删掉 Anaconda 初始化（Initialize）的段落，并重写 _$PATH_，使不用激活虚拟环境也能用 Anaconda 的软件

```bash
$ cd $HOME
$ vi .bashrc
删除所有 Anaconda 初始化有关的段落，在文件开头添加
export $PATH=<Anaconda安装目录>/bin:$PATH        ## 修改 PATH
:wq                                             ## 保存修改
$ source .bashrc                                ## 立即在当前 shell 生效
$ conda info                                    ## 查看是否成功
```

## 删除 Anaconda

Anaconda 配置文件较多，主要是用户目录下的 .condarc 还有其他各种文件夹内的配置文件

1. 打开 Anaconda Prompt，输入 `conda install anaconda-clean` 安装配置清理工具  
    输入 `anaconda-clean` 清理配置文件，此时本体还未删除
2. - 对于 Windows 用户，在 Anaconda 安装目录下找到 **Uninstall-Anaconda3.exe**，打开，根据提示卸载即可
    - 对于 MacOS/Linux 用户，清理完配置文件后直接删除整个 Anaconda 安装目录即可