## 一、用户管理

### 1. id：显示本用户信息

```bash
id [用户名(缺省情况下为当前用户)]
```

![](https://i-blog.csdnimg.cn/blog_migrate/bc3edffd16509fd73e4b70188a5e5fe9.png)

### 2. adduser：建立新用户

```bash
sudo adduser 用户名 # 也可以是以下命令：sudo useradd 用户名
```

![](https://i-blog.csdnimg.cn/blog_migrate/dba2c5c5fb46fe4515bf4ae661af84c5.png)

可以通过以下命令查看刚刚添加的用户：

```bash
cat /etc/passwd
```

### 3. passwd：为用户设置密码

```bash
# 更改当前用户密码passwd
```

![](https://i-blog.csdnimg.cn/blog_migrate/3badce710a9d4d94098520d0412f762f.png)

```bash
# 更改其他用户密码（需要有管理员权限）passwd 用户名
```

![](https://i-blog.csdnimg.cn/blog_migrate/8df923d7a23e881e86c69657d3bdb43f.png)

注释：echo $?是输出上一命令返回值，0表示上一命令正常结束

注意：为了安全，设置密码的时候，所有的输入都不会在屏幕上输出。

### 4. su：切换用户

su 是switch user 的简写

```bash
# 切换到某用户的命令如下su 用户名
```

![](https://i-blog.csdnimg.cn/blog_migrate/91a827fd7a7dbb32fdfbef96ad159734.png)

### 5. sudo：以其他身份执行命令

sudo意为switch user do，sudo默认使用root的身份执行命令

```bash
sudo 命令 # 也可以使用指定的用户身份去执行命令（但是要注意权限问题）sudo -u 用户 命令
```

![](https://i-blog.csdnimg.cn/blog_migrate/e66c8683f5d1fcf2db75a4a757d14cef.png)

### 6. userdel：删除用户

userdel 是 user delete 的简写

```bash
sudo userdel 用户名 # 也可以使用以下命令：sudo deluser 用户名
```

![](https://i-blog.csdnimg.cn/blog_migrate/dae23bf1d742deebc20468bc3786a8c3.png)

### 7. usermod：修改用户配置

usermod 是 user modefy 的简写

```bash
sudo usermod 对应的参数 用户名
```

![](https://i-blog.csdnimg.cn/blog_migrate/59043456bb0dcfe91552e2bb2ad07ead.png)

### 8. 组操作

不同的用户组也有类似的操作命令，如groupadd、groupdel、groupmod，分布对应新增组、删除组、修改组设置，类似于用户操作，此处不再一一列举。

## 二、系统管理

### 1. uname：显示系统信息

```bash
uname -a

lsb_release -a
```

![](https://i-blog.csdnimg.cn/blog_migrate/45cbea90c95b8ec8a58e8506903b3afa.png)

### 2. date：查看/设置 系统的 时间/日期

```bash
date
```

![](https://i-blog.csdnimg.cn/blog_migrate/ccdae52b9eeb2023164fc1e05535210a.png)

### 3. w：查看当前登录系统的用户信息

w是who的简写。

```bash
w # 也可以使用whowho
```

![](https://i-blog.csdnimg.cn/blog_migrate/6e93886ae62f1441a5e67d9594a3a575.png)

### 4. last：查看登录信息

```bash
last
```

![](https://i-blog.csdnimg.cn/blog_migrate/91f1aa89e64614ba2217606164201065.png)

### 5. alias：设置命令别名（仅本次登录有效）

```bash
# alias命令，相关示例如下 # 列出所有别名设置alias # 设置别名alias 别名="命令" # 删除别名unalias 别名 # 如果想要每次登录都生效，需要修改 .bashrc 文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/5a8ffc7f644128b979dc8395c4874b1d.png)

```bash
# 在别名不与系统命令冲突的情况下，还可以对一组命令设置别名# chp不是系统命令（可用type命令检测该命令是否存在），下面的单引号之间的命令意味：# 切换到当前用户目录（home），打印出当前工作目录，输出“123！！！”alias chp='cd ~;pwd;echo "123!!!"'
```

![](https://i-blog.csdnimg.cn/blog_migrate/8e79051ecafffa001661c7e7d29ae821.png)

### 6. export：显示/设置 系统变量

```bash
# 显示环境变量，-p参数表示显示所有变量export -p
```

![](https://i-blog.csdnimg.cn/blog_migrate/98db48bf6c16d203ea206071bff7cf1f.png)

```bash
# 设置环境变量export 变量名称=变量值 # 屏蔽某变量（变量被屏蔽，不会输出到后续命令的执行环境中，但是并未被删除）export -n 变量名称
```

![](https://i-blog.csdnimg.cn/blog_migrate/d85d311416b977456481bdea3de92af3.png)

### 7. free：查看内存状态

```bash
# 默认是以KB为单位free # 以适合人们（human）查看的方式free -h # 以Byte为单位查看内存free -b # 以KB为单位查看内存free -k # 以GB为单位查看内存free -g
```

![](https://i-blog.csdnimg.cn/blog_migrate/134343f941c239bf7375ba4097751423.png)

### 8. df：查看磁盘与文件系统使用状态

df是disk free的简写

```bash
df # 可以使用以下命令查看磁盘大小并输出文件系统类型（Type）# 参数 -T 表示输出文件系统类型# 参数 -h 表示human-readable，即以人们易读的方式输出df -Th
```

### 9. top：显示与管理执行中的程序

```bash
top
```

![](https://i-blog.csdnimg.cn/blog_migrate/1bd39c8dbebc8516ec8da4c475c4f99c.png)

### 10. ps：查看程序状态

ps是process status的简写

```bash
ps # 输出系统中运行的所有程序信息# 可以使用man命令来详细查看各个参数的作用ps -axu
```

![](https://i-blog.csdnimg.cn/blog_migrate/e5c977c865eaa00b0e88bb0a64e40423.png)

```bash
# 若果想要以树状图显示程序状态，还可以使用以下命令# pstree是process status tree的简写pstree
```

![](https://i-blog.csdnimg.cn/blog_migrate/a45394baccb1b77f3a1b72603c3d29c5.png)

### 11. kill：向指定程序发送信息/结束进程

```bash
# 查看所有的编号与信息对应表kill -l # 查看指定编号对应信息kill -l 编号 # 向进程发送指定信号（进程ID可通过ps命令查看）kill -s 编号 进程ID# 或者直接写为kill -编号 进程ID
```

![](https://i-blog.csdnimg.cn/blog_migrate/95cbd42503b6793e9694bb9d1eb58475.png)

### 12. exit：退出当前shell

```bash
exit
```

### 13. sleep：休眠/暂停执行命令

```bash
sleep 时间与单位 #休眠10s，并在休眠结束后输出“end”。 & 表示程序在后台运行(sleep 10s; echo "end") &
```

![](https://i-blog.csdnimg.cn/blog_migrate/b33a16911c260af6d98e15d159780554.png)

![](https://i-blog.csdnimg.cn/blog_migrate/3afaeffa32e76003b3e9babe89efd70b.png)

### 14. shutdown：关机与重启

```bash
# 重启
sudo reboot 

# 关机
sudo halt -p 

# 立即关机
shutdown -h now 

# 立即重启
shut down -r now  

# 晚上11点关机
shutdown -h 22:00 

# 2分钟后关机，并发送给登录的用户警告信息
shutdown +2 "we will shutdown this computer" 

# 10秒后关机
shutdown -t 10
```

### 15. pwd：显示工作目录

pwd为print working directory 的简写

```bash
pwd
```

![](https://i-blog.csdnimg.cn/blog_migrate/510b38496ee3b38f8b949bdbee9fba3f.png)

### 16. whereis：查找命令的位置（源代码文件、二进制文件、man手册）

```bash
# 首先介绍一下whereis命令的参数# -b#     只查找二进制文件# -m#     只查找帮助文件# -s#     只查找帮助文件# -l#     列出查找的路径 # 具体用法whereis [-参数] 命令
```

![](https://i-blog.csdnimg.cn/blog_migrate/0b823a8e679c9558182a43b15cca9c0c.png)

### 17. which：在环境变量$PATH设定目录中查找符合条件的命令

```bash
# which可以在环境变量中查找符合条件的命令（不带参数时返回首个找到的命令路径）# 有点类似于whereis# 如果加上参数 -a 可以返回所有找到的命令路径
```

![](https://i-blog.csdnimg.cn/blog_migrate/9a5e5eaf54fad87fa90edb7597439e8e.png)

### 18. type：查看命令的类型

![](https://i-blog.csdnimg.cn/blog_migrate/997331acbe08db3b21d9c6971051571b.png)

## 三、输入输出操作

在介绍输入输出和文件操作之前，有这么一种说法“linux中一切皆文件”，我简单理解为：所有的东西都是按照文件的方式去组织的，对文件的操作也都是通过文件描述符（标识文件的一个整数）来进行的。Linux中的文件可以分为7类：普通文件（文件符号“-”）、目录文件（文件符号“d”，directory）、链接文件（文件符号“l”，link）、块设备（文件符号“b”，block）、字符设备（文件符号“c”，character）、管道文件（文件符号“p”，pipe）、套接字文件（文件符号“s”，socket）。文件的类别可以通过ls命令查看：

![](https://i-blog.csdnimg.cn/blog_migrate/abb44b9b9c46e8b5b7efe0d49d4f5c17.png)

在启动一个连接时，程序默认会打开3个I/O文件：标准输入文件（stdin）、标准输出文件（stdout）、标准错误文件（stderr），其文件描述符是分别是0、1、2。

![](https://i-blog.csdnimg.cn/blog_migrate/2300551aaef8b9f9c15f79a157488199.png)

在一条命令的执行过程中，一般是用户从键盘或其他设备通过标准输入文件进行输入，命令执行完毕后，通过标准输出文件输出到设备，如果存在错误则会通过标准错误文件输出到设备。在一般的情况下都是从终端进行输入输出的。

### 1. 重定向

重定向 可以分为 输入重定向 和 输出重定向 。

输入重定向 是将命令的输入从 标准输入 重定向为 指定的文件 ，可以使用 < 或者 << 重定向标准输入。输入重定向较少使用，因此仅举一个简单的例子：

![](https://i-blog.csdnimg.cn/blog_migrate/5dad281b5b1f997155f77f565c519cfe.png)

输出重定向 是将命令的 标准输出 或 标准错误 重定向为 指定的文件，可以使用 >、 >> 、1>、 2>、 1>>、 2>>重定向标准输出与标准错误。

```bash
# 输出重定向符  >  的使用 # 如果目标文件不存在，会创建该文件；如果存在，会覆盖原文件内容# 将标准输入重定向到文件命令 > 指定文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/f9e7eb74405fb01e45515da9628d60e3.png)

```bash
# 输出重定向符  >>  的使用 # 如果目标文件不存在，会创建该文件；如果存在，会向原文件中追加内容# 将标准输入重定向到文件命令 >> 指定文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/747bc0a13e2d987332386a8f0c73e090.png)

```bash
# 输出重定向符  1>  的使用 # 如果目标文件不存在，会创建该文件；如果存在，会覆盖原文件内容# 将标准输入重定向到文件命令 1> 指定文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/a54950552bdd1d965b92f16767a6bbd9.png)

```bash
# 输出重定向符  2>  的使用 # 如果目标文件不存在，会创建该文件；如果存在，会覆盖原文件内容# 将标准错误重定向到文件命令 2> 指定文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/2d7ac3f4b4fdfdf08f4fd55b908fee96.png)

可以将标准输出和标准错误分别输出。

![](https://i-blog.csdnimg.cn/blog_migrate/f76ea718e8c87a247b829be8cf72cbea.png)

也可以将标准输出和标准错误重定向到同一个文件（使用 2>&1 将标准错误重定向到标准输出，再将标准输出重定向到文件）

```bash
命令 1> 目标文件 2>&1
```

![](https://i-blog.csdnimg.cn/blog_migrate/d285024567e5a0daff24ce049bffb1d1.png)

```bash
# 输出重定向符 1>> 和 2>> 也是向文件中追加内容命令 1>> 指定文件命令 2>> 指定文件 # 将标准输出和标准错误分别向不同文件追加命令 1>> 指定文件1 2>> 指定文件2 # 1>> 和 2>可以混用命令 1>> 指定文件1 2> 指定文件2 # 1> 和 2>>也可以混用命令 1> 指定文件1 2>> 指定文件2 # 向同一文件追加标准输出与标准错误的方式与前面一样，使用2>&1将标准错误重定向到标准输出即可命令 1> 指定文件 2>&1
```

![](https://i-blog.csdnimg.cn/blog_migrate/8c42d0d84bbbb05f0268c5bf4ad7c097.png)

```bash
# Linux提供了一个文件 /dev/null ，输出到这个文件的所有信息都会被丢弃，就像一个很大的垃圾桶# 如果程序有标准输出或者标准错误输出，可以选择将其重定向到该文件。
```

### 2. 管道

管道操作符为 | 。

可以将管道理解为输出输出重定向，即，将前一个命令的标准输出重定向到后一个命令的标准输入。简单地说，就是把前面命令的输出作为后面命令的输入。

比如，希望找到当前进程中，跟root有关的进程，可以使用ps命令查看所有进程，再使用[grep命令](https://so.csdn.net/so/search?q=grep%E5%91%BD%E4%BB%A4&spm=1001.2101.3001.7020)对其进行筛选。

```bash
# 找到当前跟root有关的进程ps axu | grep root
```

![](https://i-blog.csdnimg.cn/blog_migrate/f69132ed79769a7bcbb6eb58c452203c.png)

### 3. tee：从标准输入读取并输出到标准输出和文件

有时想要既在屏幕终端进行输出，又把输出保存到文件中，这个时候，tee命令就派上用场了。

tee可以从标准输入设备读取输入内容，同时将内容输出到屏幕终端和文件。

```bash
# 简要介绍tee的一些参数# -a#     默认情况下，如果如果目的文件存在，是会覆盖该文件内容的#     加上 -a （append的意思）参数，表明将输出信息追加到该文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/bfa42afef756a429d0b3b14562bb542f.png)

### 4. cat：将文件连接并输出到标准输出设备（常用作查看文件内容）

cat是concatenate（连接）的简写

```bash
# cat 默认向屏幕输出文件的内容cat 文件名
```

![](https://i-blog.csdnimg.cn/blog_migrate/c34bf38a46ca696e74ffabfaa43da9a8.png)

```bash
# 输出内容并标出行号cat -n 文件名
```

![](https://i-blog.csdnimg.cn/blog_migrate/b93307355902979cfe868e50d0e1af85.png)

```bash
# 连续输出若干文件的内容cat -n 文件名1 文件名2 文件名3 .....
```

![](https://i-blog.csdnimg.cn/blog_migrate/4d22e1792745c0d99e5d6637bdc2ee90.png)

```bash
# 输出若干文件内容，输出目标为另一个文件# 若目标文件不存在，则创建并输出，若目标文件存在，则覆盖目标文件cat 文件名1 文件名2 > 目标文件# 若目标文件不存在，则创建并输出，若目标文件存在，则向目标文件后追加新内容cat 文件名1 文件名2 > 目标文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/8d3047ea840521344db036238b78373b.png)

### 5. \ 输入时换行

有时在命令行输入的内容过长，或者为了便于观察，希望能在输入时换行，这个时候就可以使用 \ 了。

![](https://i-blog.csdnimg.cn/blog_migrate/dcc2636c19da696a84ba8949c34f2426.png)

## 四、文件操作

### 1. ls：列出目录的内容（ll常用）

ls是list的简写

```bash
# 首先介绍一下ls命令的参数# -a#     显示所有的文件和目录，包括以 . 开头的文件# -l#     每行仅显示一个文件或目录名称，分别显示：#     权限标识、硬链接数目、拥有者、组名称、文件或目录大小、最后更改时间# -F#     分类显示，可执行文件后加*  目录后加/  Socket后加=  符号链接后加@  管道名称后加|# -h#     human readable 以便于人查看的方式显示目录大小# -R#     递归处理，将子目录名称也一并列出# -S#     按照文件和目录的大小排序（-s 以块为单位显示文件或目录的大小）# -t#     按照文件的变更时间排序# -X#     以文件或目录的扩展名排序# -r #     反向排序，用相反的顺序列出文件和目录的名称
```

```bash
# 列出当前路径下的文件和目录ls # 列出当前路径下的所有文件和目录ls -a # 列出当前路径下的所有文件和目录及其详细信息ls -al
```

![](https://i-blog.csdnimg.cn/blog_migrate/4bcb90dca20a5504aa649c5d69f482e6.png)

```bash
# 列出指定目录下的文件，以人们易读的方式显示其详细信息，并分类显示ls -lhF 指定目录
```

![](https://i-blog.csdnimg.cn/blog_migrate/78d9f9680bca4a227c07e95b3de3af5f.png)

```bash
# 递归列出当前目录中的所有内容，包括子文件夹中的内容ls -lR
```

![](https://i-blog.csdnimg.cn/blog_migrate/a45f584afa50f4a2b7a31b5107c5f2c9.png)

```bash
# 按照文件的大小排序显示文件夹中的内容ls -lSls -lSr
```

![](https://i-blog.csdnimg.cn/blog_migrate/8fb9cfbe9788d6e1c1847d2a5a389494.png)

```bash
# 按照最后修改时间，列出当前目录中的文件ls -ltls -ltr
```

![](https://i-blog.csdnimg.cn/blog_migrate/beb51583bd207132558271238ed9a543.png)

### 2. cd：切换目录

cd是change directory的简写

```bash
# 切换到用户目录cd # 切换到用户目录也可以用cd ~ # 切换到指定目录cd 指定目录路径# 切换到的目录含有空格，可以使用引号引起来cd "指定目录路径" # 切换到上级目录cd ../# 上述命令可简写为cd ..
```

![](https://i-blog.csdnimg.cn/blog_migrate/5986b9e8fe030d68f7c6a65586011e7e.png)

### 3. mkdir：建立目录（文件夹）

mkdir是make directories的简写

```bash
# 首先介绍一下ls命令的参数# -p#     parents，如果要建立的目录上层目录未建立，加上该参数会连同上层目录一起建立# -m <目录属性>#     建立目录的时候为目录设置权限
```

```bash
# 在目录下建立子目录mkdir 目录
```

![](https://i-blog.csdnimg.cn/blog_migrate/4b378ebeee90168032629d236655117a.png)

```bash
# 在当前目录下建立子目录，授予所有成员读写执行权限mkdir -m <权限> 目录
```

![](https://i-blog.csdnimg.cn/blog_migrate/c978e51c974d041a2d89eb26ef9249f0.png)

### 4. find：查找文件/目录

```bash
# 列出某路径下的所有目录和文件（默认为当前文件夹）find [路径]
```

![](https://i-blog.csdnimg.cn/blog_migrate/5f375f6431396dc11c49e9f5957bc58b.png)

```bash
# 查找某目录下以te开头的文件/目录find [路径] -name ‘te*’ # 查找某目录下以t结尾的文件/目录find [路径] -name ‘*t’
```

![](https://i-blog.csdnimg.cn/blog_migrate/5340985e36dfd0b083cf282643d23922.png)

```bash
# 可以使用 -o或者-a 连接不同的判断条件（-o： or，满足一个条件即可，-a：and，满足所有条件）# 查找某目录下以te开头或者以t结尾的文件/目录find [路径] -name ‘te*’ -o -name ‘*t’
```

![](https://i-blog.csdnimg.cn/blog_migrate/c29a2bbc58067cf43712597351e193f1.png)

```bash
# 查找某路径下形如a??的字符，其中一个“？”代表任意一个字符find [路径] -name 'a??'
```

![](https://i-blog.csdnimg.cn/blog_migrate/eda7c61ace041fe2cb5bfb8387a6d361.png)

```bash
# 查找指定时间内变动过的文件 下面的“+“表示指定时间之前，“-“表示指定时间之后# 可以加上-ls参数，列出文件/目录的详细信息find [路径] -mmin [+或-]分钟find [路径] -mtime [+或-]天数
```

![](https://i-blog.csdnimg.cn/blog_migrate/75737db64a79a0bc723d1f6f38fff62e.png)

![](https://i-blog.csdnimg.cn/blog_migrate/ccd1d43945636d5a9f43f926209ff12f.png)

### 5. locate：一种高效快速的查找文件方式

locate是使用数据库查找文件的一个命令，具有更高的速度和效率，但是实时性较差（取决于数据库更新的频率）。在最开始的时候，数据库可能并不存在，因此需要使用updatedb命令更新数据库。如果创建文件（删除文件），并且没有更新数据库的情况下，也是找不到对应文件的（查到的路径不存在）。

```bash
# 首先介绍一下locate命令的参数# -i#     ignore-case，忽略大小写# -e#     existing，查询时会确认文件是否存在，如果存在才输出
```

![](https://i-blog.csdnimg.cn/blog_migrate/0fcab8e7a8e601712bca6ff1c3a421fe.png)

### 6. cp：复制文件/文件夹（目录）

cp为copy的简写

```bash
# 将文件1复制为某路径下的文件2cp 文件1 某路径下的某文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/a129e0de3422aafa440bc622edfd3f74.png)

```bash
# 将文件1复制到某文件夹cp 文件1 某文件夹的目录
```

![](https://i-blog.csdnimg.cn/blog_migrate/059acdfb6e9f6f6c60ffa587351e1b2b.png)

```bash
# 将某文件夹 复制到另一个文件夹中：# 如果目的文件夹存在，则将该文件夹复制到对应文件夹中，作为其子文件夹# 如果目的文件夹不存在，则创建该文件夹，并将该文件夹中的内容复制到新创建的文件夹中cp -r 文件夹 目的文件夹
```

![](https://i-blog.csdnimg.cn/blog_migrate/2d9856fa717fdf7de78a3e52bf3731b3.png)

### 7. scp：在网络上不同主机间 安全地复制文件

OpenSSH secure file copy，可以在两台主机之间进行文件的拷贝。它使用ssh进行安全的拷贝，并且需要通过密码验证。

```bash
# scp命令的参数有很多，这里只是简要介绍部分# -P#     指定端口号，默认为22号端口# -r#     递归复制文件夹中的内容
```

```bash
# scp命令的格式为：scp -P 端口号（默认为22） 源文件 ... 目的文件 # 将本地文件复制到远程主机scp -P 端口号（默认为22） 本地的文件 远程主机用户名@远程主机IP:路径比如：scp -P 22 /home/ubuntu/myfiles  auser@10.15.65.62:/home/auser/store # 将远程主机的文件复制到本地只需交换源文件和目的文件的位置即可scp -P 端口号（默认为22）  远程主机用户名@远程主机IP:路径  本地的文件比如：scp -P 22  auser@10.15.65.62:/home/auser/store  /home/ubuntu/myfiles
```

![](https://i-blog.csdnimg.cn/blog_migrate/f43f381f06d3276d5bd4558febc6a681.png)

在windows的命令行中复制文件和文件夹也是同样的操作：

![](https://i-blog.csdnimg.cn/blog_migrate/14b5e95368b3d0073285b3a1b7ef6d9d.png)

### 8. mv：移动或重命名现有目录/文件

mv为move的简写

```bash
# 首先介绍一下mv命令的参数# -f#     force，强行移动或重命名，即目的文件/目录名与现有的文件/目录重复的情况下会强行覆盖原有文件# -b#     bakup，如果需要覆盖原有文件，则先将源文件备份，备份名称默认加上~后缀# -S <后缀>#     配合-b使用，指定备份文件所要附加的后缀# -v#     执行时输出相关信息
```

```bash
# 重命名某目录/文件mv  源目录/文件  目的目录/文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/ec23ea2b9dc164299100538d21cb796e.png)

```bash
# 移动重命名mv  源目录/文件  目的目录/文件
```

![](https://i-blog.csdnimg.cn/blog_migrate/ee3e97e18d88dfb1ba1505af604523a4.png)

```bash
# 将当前目录下的abc移动到dir1下并重命名为a.txt，以默认备份方式备份a.txtmv -b abc dir1/a.txt
```

![](https://i-blog.csdnimg.cn/blog_migrate/d236db7957df2edbd615e9bd6171e2c8.png)

```bash
# 将当前目录下的abc移动到dir1下并重命名为a.txt，备份原有的文件（添加.bakup后缀）mv -b -S .bakup abc dir1/a.txt
```

![](https://i-blog.csdnimg.cn/blog_migrate/90bb3ae387171780fb16211562452d23.png)

### 9. rm：删除文件或目录

rm为remove的简写

```bash
# 首先介绍一下rm命令的参数# -i#     删除文件或目录之前询问用户# -f#     force，强制删除目录或文件# -r （或者是-R）#     递归处理，删除指定目录及所有子目录和子文件# -v#     执行时输出相关信息 #################### 执行删除操作时，一定要万分谨慎 ####################
```

```bash
# 删除当前文件夹下的某文件rm 文件名
```

![](https://i-blog.csdnimg.cn/blog_migrate/b52d13234fba0d45c9285a7fb0772784.png)

```bash
# 删除某个目录，删除前询问文件是否需要被删除（可进行选择性删除）rm -ri 目录
```

![](https://i-blog.csdnimg.cn/blog_migrate/77a1f97a7ede467af610e241f4779869.png)

```bash
# 强制删除某个目录及其子目录和子文件rm -rf 目录
```

谨慎使用rm命令！！！

![](https://i-blog.csdnimg.cn/blog_migrate/78117cc09a3c9a5b908972a4013cc315.png)


### 10.chown: 更改文件用户/用户组
基本语法
```
chown [选项] <新所有者>:<新组> <文件或目录>
```
- **`<新所有者>`**：要设置的文件或目录的新所有者用户名。
- **`<新组>`**：要设置的文件或目录的新所属组名（可选）。
- **`<文件或目录>`**：要更改权限的目标文件或目录路径。
#### **Linux 权限模型**

在 Linux 中，每个文件或目录都有三类权限：

1. **用户（User）**：文件的所有者。
2. **组（Group）**：文件所属的用户组。
3. **其他用户（Others）**：所有其他用户。

每类用户可以有以下权限：

- **`r`**：读取权限（read）。
- **`w`**：写入权限（write）。
- **`x`**：执行权限（execute）。

### 11.chmod：更改文件权限
#### **基本语法**
```
chmod [选项] <权限> <文件或目录
```
- **`<权限>`**：可以使用 **符号模式** 或 **数字模式**。
- **`<文件或目录>`**：要更改权限的目标文件或目录。
- `-R <选项>` ：递归更改目录中的所有文件权限
---
#### **符号模式和数字模式**

##### **1. 符号模式**

- **`u`**：用户（owner）。
- **`g`**：组（group）。
- **`o`**：其他用户（others）。
- **`+`**：添加权限。
- **`-`**：移除权限。
- **`=`**：直接赋值权限。
##### **2. 数字模式**

数字模式使用 **八进制数**表示权限：

- **`4`**：读取权限（`r`）。
- **`2`**：写入权限（`w`）。
- **`1`**：执行权限（`x`）。
- **`0`**：没有权限。

权限的组合：

- **`7`**：`rwx`（读取、写入、执行）。
- **`6`**：`rw-`（读取、写入）。
- **`5`**：`r-x`（读取、执行）。
- **`4`**：`r--`（读取）。

---

#### **查看文件权限**

使用 **`ls -l`** 查看文件的权限：
```
ls -l myfile.sh
```

```
`-rwxr--r-- 1 ikunycj users 1024 Oct 25 15:00 myfile.sh`
```

- **`-rwxr--r--`**：表示文件的权限（用户：`rwx`，组：`r--`，其他用户：`r--`）。
- **`ikunycj`**：文件所有者。
- **`users`**：文件所属组。

### ./fileName 执行文件
## 五、其他

### 1. man：查询命令手册

man为manual 的简写

```bash
# 查找某命令的手册，以查看相关操作man 命令
```

比如man ls （点击q退出，q的意思的quit）

![](https://i-blog.csdnimg.cn/blog_migrate/6cb413b2982e0aa5b9329483957b3497.png)

### 2. grep：查找文件中符合条件的字符串

grep是Globally search a Regular Expression and Print的简写

```bash
grep [参数] 样式 [文件或目录(如果缺省则表示从标准输入设备输入)] # 首先介绍一些参数的使用# -A行数#    after，显示对应行之后的若干行# -B行数#    before，显示对应行之前的若干行# -d 操作#    该参数指定了对于目录的处理方式 #    这里的操作是read（当作字符串处理）、recurse（递归处理）、skip（跳过）。#    默认情况下是read#    -d recurse 也可以写作 -r# -i#    --ignore-case,表示忽略大小写# -l#    只列出符合条件的文件名# -L#    列出不符合条件的文件名# -n#    列出对应的行号# -w#    查找完全符合样式的单词，如，查找int，原本可以被查找到的interesting在加了-w之后不会被查出 # 如果某一字符为任意字符，可以使用.替代# 比如要查找aaa,aba,aca,ada,......可以使用  a.a  来进行匹配# 如果要查找带有字符 . 的文件，需要使用 \. 替代，可以查看下面图片示例。
```

![](https://i-blog.csdnimg.cn/blog_migrate/20fd631457e69ef0a67033ea5ec1147b.png)

```bash
# 在当前目录的所有后缀为.c文件中，查找包含“#include”的所有行，并显示行号grep -n '#include' *.c
```

![](https://i-blog.csdnimg.cn/blog_migrate/5256d9ec01f32e2aa9c36847ffcb4ac8.png)

```bash
# 在当前目录的所有文件中，查找包含“intf”行及该行之前的1行和之后的2行，并显示行号grep -n -B1 -A2 'int' *
```

![](https://i-blog.csdnimg.cn/blog_migrate/5dd01e577749c7599b926ef04f720d28.png)

```bash
# 查找某指定路径中的所有文件（包括子目录中的文件），找到含有‘sleep’的文件，只输出文件名grep -lr 'sleep' 指定路径
```

![](https://i-blog.csdnimg.cn/blog_migrate/adde1f4ee41442f8a4865870eaa37e84.png)

```bash
# 通过使用管道，可以把前一命令的输出变成后一命令是输入，管道符为 | # 由此可以从某程序的输出结果中，找到满足某条件的行并输出# 该方法很适合从大量的输出中筛选出所要的信息# 比如找到/home/ubuntu/下某一身份用户同时具有读、写、执行权限的文件（包含rwx）la -al /home/ubuntu/ | grep 'rwx'# 也可以从某一文件中找到包含int这个单词的行
```

![](https://i-blog.csdnimg.cn/blog_migrate/d36405bd39fefabb4840b21a5989fc26.png)

```bash
# 找到某一目录下所有的.c文件，并将其结果保存到result.txt文件中# 当然，使用之前用过的find命令“find /home/ubuntu/ -name '*.c*'”是完全可以的。find /home/ubuntu/ | grep '\.c' > result.txt
```

![](https://i-blog.csdnimg.cn/blog_migrate/f76f1a28ca7ad53fde0405e8d8a8530f.png)

```bash
# 输出当前跟root有关的所有进程信息ps aux
```

![](https://i-blog.csdnimg.cn/blog_migrate/efe721bcd572c5ae17993e3ecf02bfdd.png)

### 3. jobs：查看作业状态

test.o为一个每隔一秒输出一个数字的程序，在执行程序时，可以使用Ctrl + Z 暂停程序执行。

![](https://i-blog.csdnimg.cn/blog_migrate/d93ae3e841327ebe3cb48ada54d6e7d3.png)

### 3. bg：后台执行程序

bg为background的简写

```bash
# 使用bg 工作编号 的格式将任务放到后台执行bg 作业编号 #因为这个程序是有输出的，所以依然会向屏幕终端输出信息，但是程序确实是在后台执行的。
```

![](https://i-blog.csdnimg.cn/blog_migrate/20a44053b6eb1555f14317351e189df9.png)

### 4. fg：前台执行程序

fg为foreground的简写

```bash
# 使用fg 工作编号 的格式将任务放到后台执行fg 作业编号
```

![](https://i-blog.csdnimg.cn/blog_migrate/51e8d10e97e79a2269455e6d397a8eca.png)

如有不当或错误之处，恳请您的指正，谢谢！！！