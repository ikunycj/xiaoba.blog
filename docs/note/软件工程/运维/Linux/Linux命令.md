# Linux 命令速查

## 一、用户与权限管理

### id：显示用户信息

id：identity

作用：显示当前用户或指定用户的 UID、GID 及所属组信息。

使用模版：

```bash
id [用户名]
```

使用示例：

```bash
# 显示当前用户信息
id

# 显示指定用户信息
id alice
```

---

### adduser / useradd：新建用户

adduser：add user

作用：新建系统用户。`adduser` 是交互式的高层封装，`useradd` 是底层命令。

使用模版：

```bash
sudo adduser <用户名>
# 或
sudo useradd <用户名>
```

使用示例：

```bash
sudo adduser alice

# 建立用户后可确认
cat /etc/passwd
```

---

### passwd：设置用户密码

passwd：password

作用：修改当前用户或指定用户的登录密码。

> 注意：设置密码时所有输入不会在屏幕显示。`echo $?` 可查看上一命令返回值，0 表示正常结束。

使用模版：

```bash
# 修改当前用户密码
passwd

# 修改指定用户密码（需管理员权限）
sudo passwd <用户名>
```

使用示例：

```bash
# 修改当前用户密码
passwd

# 修改 alice 用户的密码
sudo passwd alice
```

---

### su：切换用户

su：switch user

作用：切换到指定用户的 Shell 环境。

使用模版：

```bash
su [用户名]
```

使用示例：

```bash
# 切换到 alice 用户
su alice

# 切换到 root 用户
su root
```

---

### sudo：以其他身份执行命令

sudo：switch user do

作用：以指定用户（默认为 root）的身份执行命令。

使用模版：

```bash
# 以 root 身份执行
sudo <命令>

# 以指定用户身份执行
sudo -u <用户名> <命令>
```

使用示例：

```bash
sudo apt update

sudo -u www-data ls /var/www
```

---

### userdel / deluser：删除用户

userdel：user delete

作用：删除系统中的指定用户。

使用模版：

```bash
sudo userdel <用户名>
# 或
sudo deluser <用户名>
```

使用示例：

```bash
sudo userdel alice

# 同时删除用户的主目录
sudo userdel -r alice
```

---

### usermod：修改用户配置

usermod：user modify

作用：修改用户账户的相关属性，如用户名、主目录、所属组等。

使用模版：

```bash
sudo usermod <选项> <用户名>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-l <新用户名>` | 修改登录名 |
| `-d <目录>` | 修改主目录 |
| `-aG <组名>` | 将用户追加到指定组 |
| `-s <shell>` | 修改默认 Shell |

使用示例：

```bash
# 将 alice 加入 sudo 组
sudo usermod -aG sudo alice

# 修改 alice 的默认 Shell
sudo usermod -s /bin/bash alice
```

---

### groupadd / groupdel / groupmod：组管理

作用：对用户组进行新增、删除、修改操作。

使用示例：

```bash
# 新增组
sudo groupadd devgroup

# 删除组
sudo groupdel devgroup

# 修改组名
sudo groupmod -n newgroup devgroup
```

---

### chown：更改文件所有者/所属组

chown：change owner

作用：修改文件或目录的所有者和所属用户组。

使用模版：

```bash
chown [选项] <新所有者>[:<新组>] <文件或目录>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-R` | 递归修改目录中所有文件 |

> Linux 权限模型：每个文件有三类权限对象：**用户（User）**、**组（Group）**、**其他用户（Others）**，每类有 `r`（读）、`w`（写）、`x`（执行）三种权限。

使用示例：

```bash
# 修改文件所有者
sudo chown alice file.txt

# 同时修改所有者和所属组
sudo chown alice:developers file.txt

# 只修改所属组
sudo chown :developers file.txt

# 递归修改目录
sudo chown -R alice:developers /var/www/
```

---

### chmod：更改文件权限

chmod：change mode

作用：修改文件或目录的读写执行权限，支持符号模式和数字模式。

使用模版：

```bash
chmod [选项] <权限> <文件或目录>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-R` | 递归修改目录中所有文件权限 |

**符号模式：**

| 符号 | 含义 |
|------|------|
| `u` | 用户（owner） |
| `g` | 组（group） |
| `o` | 其他用户（others） |
| `a` | 所有用户（all） |
| `+` | 添加权限 |
| `-` | 移除权限 |
| `=` | 直接设置权限 |

**数字模式（八进制）：**

| 数字 | 权限 |
|------|------|
| `4` | 读（r） |
| `2` | 写（w） |
| `1` | 执行（x） |
| `7` | rwx |
| `6` | rw- |
| `5` | r-x |
| `4` | r-- |

使用示例：

```bash
# 查看文件权限
ls -l myfile.sh
# 输出：-rwxr--r-- 1 alice users 1024 Oct 25 myfile.sh

# 为所有者添加执行权限
chmod u+x myfile.sh

# 给所有人添加读权限
chmod a+r myfile.sh

# 移除其他用户的写权限
chmod o-w myfile.sh

# 使用数字模式设置权限（rwxr-xr-x）
chmod 755 myfile.sh

# 递归修改目录权限
chmod -R 755 /var/www/
```

---

## 二、文件操作

### ls：列出目录内容

ls：list

作用：列出目录中的文件和子目录信息。

使用模版：

```bash
ls [选项] [目录]
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-a` | 显示所有文件，包括隐藏文件（`.` 开头） |
| `-l` | 以长格式显示详细信息 |
| `-h` | human-readable，以易读方式显示大小 |
| `-F` | 分类显示，目录加 `/`，可执行文件加 `*` |
| `-R` | 递归列出子目录 |
| `-S` | 按文件大小排序 |
| `-t` | 按修改时间排序 |
| `-r` | 反向排序 |

使用示例：

```bash
# 列出当前目录
ls

# 列出所有文件（含隐藏文件）
ls -a

# 列出详细信息（常用 ll）
ls -al

# 以易读格式列出详细信息
ls -lh

# 按大小排序
ls -lS

# 按修改时间排序（最新优先）
ls -lt

# 递归列出所有子目录
ls -lR
```

---

### cd：切换目录

cd：change directory

作用：切换当前工作目录。

使用模版：

```bash
cd [目录路径]
```

使用示例：

```bash
# 切换到用户主目录
cd
cd ~

# 切换到指定目录
cd /var/log

# 切换到上级目录
cd ..

# 切换到上两级目录
cd ../..

# 切换回上一个目录
cd -

# 路径含空格时用引号
cd "my folder"
```

---

### pwd：显示当前工作目录

pwd：print working directory

作用：打印当前所在目录的完整路径。

使用模版：

```bash
pwd
```

使用示例：

```bash
pwd
# 输出示例：/home/alice/projects
```

---

### mkdir：创建目录

mkdir：make directories

作用：创建新目录（文件夹）。

使用模版：

```bash
mkdir [选项] <目录名>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-p` | 递归创建，若上级目录不存在则一并创建 |
| `-m <权限>` | 创建时指定目录权限 |

使用示例：

```bash
# 创建单个目录
mkdir mydir

# 递归创建多级目录
mkdir -p a/b/c

# 创建并设置权限（所有人可读写执行）
mkdir -m 777 shared
```

---

### find：查找文件或目录

find

作用：在指定路径下按条件递归查找文件或目录，功能强大但速度较慢。

使用模版：

```bash
find [路径] [条件]
```

常用条件：

| 条件 | 说明 |
|------|------|
| `-name <模式>` | 按文件名查找，支持通配符（`*`、`?`） |
| `-type f/d` | 只查找文件（f）或目录（d） |
| `-mmin [+/-]N` | N 分钟内（-）/外（+）变动的文件 |
| `-mtime [+/-]N` | N 天内（-）/外（+）变动的文件 |
| `-o` | 或（or），连接多个条件 |
| `-ls` | 列出查找结果的详细信息 |

使用示例：

```bash
# 列出当前目录下所有文件
find .

# 查找以 te 开头的文件
find . -name 'te*'

# 查找 te 开头 或 t 结尾的文件
find . -name 'te*' -o -name '*t'

# 查找名称符合 a?? 格式的文件（? 代表任意单个字符）
find . -name 'a??'

# 只查找文件（不含目录）
find . -type f -name '*.log'

# 查找 5 分钟内变动过的文件
find . -mmin -5

# 查找 2 天前变动的文件并显示详情
find . -mtime +2 -ls
```

---

### locate：快速查找文件

locate

作用：通过预建数据库快速查找文件，速度远快于 `find`，但实时性较差（依赖数据库更新频率）。

> 首次使用或新增文件后需运行 `sudo updatedb` 更新数据库。

使用模版：

```bash
locate [选项] <关键词>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-i` | 忽略大小写（ignore-case） |
| `-e` | 只输出实际存在的文件（existing） |

使用示例：

```bash
# 查找包含 passwd 的文件
locate passwd

# 忽略大小写查找
locate -i readme

# 只输出实际存在的文件
locate -e nginx.conf

# 更新数据库
sudo updatedb
```

---

### cp：复制文件/目录

cp：copy

作用：复制文件或目录到指定位置。

使用模版：

```bash
cp [选项] <源> <目标>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-r` | 递归复制目录 |
| `-i` | 覆盖前询问 |
| `-v` | 显示执行信息 |
| `-p` | 保留原文件的属性（时间戳、权限等） |

使用示例：

```bash
# 复制文件
cp file.txt /tmp/file_backup.txt

# 将文件复制到目录中
cp file.txt /tmp/

# 递归复制目录（目标不存在则创建）
cp -r mydir /tmp/mydir_backup

# 复制并询问是否覆盖
cp -i file.txt /tmp/
```

---

### mv：移动或重命名文件/目录

mv：move

作用：移动文件或目录，也可用于重命名。

使用模版：

```bash
mv [选项] <源> <目标>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-f` | 强制覆盖（force） |
| `-b` | 覆盖前先备份，备份文件加 `~` 后缀 |
| `-S <后缀>` | 配合 `-b`，指定备份文件后缀 |
| `-i` | 覆盖前询问 |
| `-v` | 显示执行信息 |

使用示例：

```bash
# 重命名文件
mv old.txt new.txt

# 移动文件到目录
mv file.txt /tmp/

# 移动时备份已有的同名文件（加 ~ 后缀）
mv -b file.txt /tmp/file.txt

# 备份时使用自定义后缀
mv -b -S .bak file.txt /tmp/file.txt
```

---

### rm：删除文件或目录

rm：remove

> ⚠️ **删除操作不可撤销，使用时请务必谨慎！**

作用：删除指定的文件或目录。

使用模版：

```bash
rm [选项] <文件或目录>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-i` | 删除前逐一询问 |
| `-f` | 强制删除，不询问（force） |
| `-r` / `-R` | 递归删除目录及其所有内容 |
| `-v` | 显示执行信息 |

使用示例：

```bash
# 删除单个文件
rm file.txt

# 删除前逐一询问
rm -i file.txt

# 递归删除目录（交互式，相对安全）
rm -ri mydir/

# 强制递归删除目录（危险！）
rm -rf mydir/
```

---

### cat：查看/连接文件内容

cat：concatenate（连接）

作用：将文件内容输出到标准输出，也可连接多个文件或创建文件。

使用模版：

```bash
cat [选项] <文件名>...
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-n` | 显示行号 |
| `-A` | 显示所有字符，包括不可见字符 |

使用示例：

```bash
# 查看文件内容
cat file.txt

# 显示行号
cat -n file.txt

# 连接多个文件输出
cat file1.txt file2.txt

# 将多个文件合并写入目标文件（覆盖）
cat file1.txt file2.txt > merged.txt

# 将多个文件内容追加到目标文件
cat file1.txt file2.txt >> merged.txt
```

---

### ./filename：执行文件

作用：在当前目录下执行具有执行权限的脚本或二进制文件。

> 当前目录不在 `$PATH` 中，因此执行本地文件需要加 `./` 前缀。

使用模版：

```bash
./文件名
```

使用示例：

```bash
# 执行脚本
./run.sh

# 若无执行权限，先赋予权限再执行
chmod +x run.sh && ./run.sh
```

---

## 三、文本搜索

### grep：搜索文件中的字符串

grep：Globally search a Regular Expression and Print

作用：在文件或标准输入中搜索匹配正则表达式的行并输出。

使用模版：

```bash
grep [选项] <模式> [文件或目录]
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-n` | 显示匹配行的行号 |
| `-i` | 忽略大小写 |
| `-r` | 递归搜索目录 |
| `-l` | 只输出匹配的文件名 |
| `-L` | 只输出不匹配的文件名 |
| `-w` | 完整单词匹配 |
| `-v` | 反向匹配（输出不匹配的行） |
| `-A <N>` | 显示匹配行及其后 N 行（after） |
| `-B <N>` | 显示匹配行及其前 N 行（before） |

> 正则：`.` 匹配任意单个字符；`\.` 匹配字面量 `.`；`*` 表示零次或多次。

使用示例：

```bash
# 在所有 .c 文件中查找含 #include 的行，并显示行号
grep -n '#include' *.c

# 查找 int 所在行及其前 1 行、后 2 行
grep -n -B1 -A2 'int' *

# 递归查找包含 sleep 的文件，只显示文件名
grep -lr 'sleep' /home/ubuntu/

# 结合管道：从进程列表中筛选 root 相关进程
ps axu | grep root

# 结合管道：筛选有 rwx 权限的文件
ls -al /home/ubuntu/ | grep 'rwx'

# 查找 .c 文件并保存结果到文件
find /home/ubuntu/ | grep '\.c' > result.txt
```

---

## 四、输入输出

> **Linux 中一切皆文件**：所有资源抽象为文件，通过文件描述符操作。
>
> 文件类型：`-` 普通文件、`d` 目录、`l` 链接、`b` 块设备、`c` 字符设备、`p` 管道、`s` 套接字
>
> 程序默认打开 3 个 I/O 文件：`0` 标准输入（stdin）、`1` 标准输出（stdout）、`2` 标准错误（stderr）

---

### 重定向

重定向分为**输入重定向**和**输出重定向**。

**输入重定向**（将文件内容作为命令输入）：

```bash
命令 < 文件
```

**输出重定向**（将命令输出写入文件）：

```bash
# 覆盖写入（文件不存在则创建）
命令 > 文件

# 追加写入
命令 >> 文件

# 标准输出重定向（覆盖），1 可省略
命令 1> 文件

# 标准错误重定向（覆盖）
命令 2> 文件

# 标准输出和标准错误分别输出到不同文件
命令 1> 文件1 2> 文件2

# 标准输出和标准错误输出到同一文件
命令 1> 文件 2>&1

# 追加标准输出
命令 1>> 文件

# 追加标准错误
命令 2>> 文件

# 丢弃所有输出（/dev/null 是系统黑洞）
命令 > /dev/null 2>&1
```

使用示例：

```bash
# 将 ls 输出写入文件
ls -al > filelist.txt

# 将错误信息追加到日志
./script.sh 2>> error.log

# 同时丢弃标准输出和错误输出
./script.sh > /dev/null 2>&1
```

---

### 管道：|

作用：将前一个命令的标准输出作为后一个命令的标准输入，实现命令的链式组合。

使用模版：

```bash
命令1 | 命令2 | 命令3
```

使用示例：

```bash
# 在所有进程中查找与 root 相关的进程
ps axu | grep root

# 分页查看长输出
ls -al | less

# 统计当前目录下的文件数量
ls | wc -l
```

---

### tee：同时输出到终端和文件

tee

作用：从标准输入读取，同时将内容输出到屏幕和文件（T 形分流），常配合管道使用。

使用模版：

```bash
命令 | tee [选项] <文件>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-a` | 追加写入（append），默认覆盖 |

使用示例：

```bash
# 输出到屏幕并写入文件
ls -al | tee output.txt

# 追加写入
ls -al | tee -a output.txt
```

---

### \ ：命令行换行续写

作用：在命令末尾加 `\` 可在下一行继续输入命令，便于编写长命令。

使用示例：

```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"key":"value"}' \
     http://localhost:8080/api
```

---

## 五、进程与作业管理

### top：实时查看系统进程

top

作用：实时动态显示系统资源占用和进程信息，类似任务管理器。按 `q` 退出。

使用模版：

```bash
top
```

使用示例：

```bash
top

# 按 CPU 使用率排序（进入 top 后按 P）
# 按内存使用率排序（进入 top 后按 M）
# 按进程 ID 排序（进入 top 后按 N）
```

---

### ps：查看进程快照

ps：process status

作用：查看当前系统中运行的进程信息（静态快照）。

使用模版：

```bash
ps [选项]
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-a` | 显示所有终端下的进程 |
| `-u` | 显示用户信息 |
| `-x` | 显示无终端的进程 |
| `-axu` | 常用组合，显示所有进程的详细信息 |

使用示例：

```bash
# 查看当前用户进程
ps

# 查看所有进程的详细信息
ps -axu

# 以树状图显示进程关系
pstree
```

---

### kill：向进程发送信号

kill

作用：向指定进程发送信号，常用于终止进程（进程 ID 可通过 `ps` 命令查看）。

使用模版：

```bash
kill [选项] <进程ID>
```

常用信号：

| 信号 | 编号 | 说明 |
|------|------|------|
| `SIGTERM` | 15 | 请求进程正常退出（默认） |
| `SIGKILL` | 9 | 强制终止进程，不可被捕获 |
| `SIGHUP` | 1 | 挂起，常用于让进程重新加载配置 |

使用示例：

```bash
# 查看所有信号
kill -l

# 正常终止进程（SIGTERM）
kill 1234

# 强制终止进程（SIGKILL）
kill -9 1234
```

---

### jobs：查看后台作业

jobs

作用：列出当前 Shell 会话中所有后台作业（暂停或运行中）。

> 按 `Ctrl + Z` 可将当前前台任务暂停并移入后台。

使用模版：

```bash
jobs
```

使用示例：

```bash
jobs
# 输出示例：
# [1]+  Stopped    ./myprogram
# [2]-  Running    sleep 100 &
```

---

### bg：后台恢复作业

bg：background

作用：将已暂停的作业在后台继续执行。

使用模版：

```bash
bg <作业编号>
```

使用示例：

```bash
# 将作业 1 在后台继续执行
bg 1
```

> 注意：若程序有标准输出，即使在后台运行，输出仍会打印到终端。

---

### fg：将作业调回前台

fg：foreground

作用：将后台作业调回前台执行。

使用模版：

```bash
fg <作业编号>
```

使用示例：

```bash
# 将作业 1 调回前台
fg 1
```

---

### sleep：暂停执行

sleep

作用：让当前进程暂停执行指定时间，常用于脚本中的延时控制。

使用模版：

```bash
sleep <时间><单位>
```

时间单位：`s`（秒）、`m`（分钟）、`h`（小时）、`d`（天）

使用示例：

```bash
# 暂停 5 秒
sleep 5s

# 后台执行：休眠 10 秒后输出 "end"
(sleep 10s; echo "end") &
```

---

## 六、系统管理

### uname：显示系统信息

uname：unix name

作用：显示操作系统内核名称、版本及硬件架构等信息。

使用模版：

```bash
uname [选项]
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-a` | 显示所有信息 |
| `-r` | 只显示内核版本号 |
| `-m` | 只显示硬件架构 |

使用示例：

```bash
# 显示所有系统信息
uname -a

# 查看发行版详细信息
lsb_release -a
```

---

### date：查看/设置系统时间

date

作用：查看或设置系统的日期与时间。

使用模版：

```bash
date [格式化字符串]
```

使用示例：

```bash
# 查看当前时间
date

# 按指定格式输出
date "+%Y-%m-%d %H:%M:%S"
```

---

### w / who：查看登录用户

w：who 的简写

作用：显示当前已登录系统的用户及其活动信息。

使用模版：

```bash
w
# 或
who
```

使用示例：

```bash
# 查看当前登录用户及活动
w

# 更简洁的方式
who
```

---

### last：查看登录记录

last

作用：查看系统用户的历史登录记录。

使用模版：

```bash
last [用户名]
```

使用示例：

```bash
# 查看所有用户的登录记录
last

# 查看指定用户的登录记录
last alice
```

---

### free：查看内存状态

free

作用：查看系统内存（RAM）和交换空间（Swap）的使用情况。

使用模版：

```bash
free [选项]
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-h` | 以人类可读方式显示（human-readable） |
| `-b` | 以 Byte 为单位 |
| `-k` | 以 KB 为单位（默认） |
| `-g` | 以 GB 为单位 |

使用示例：

```bash
# 以人类可读方式查看内存
free -h

# 以 GB 为单位查看
free -g
```

---

### df：查看磁盘使用状态

df：disk free

作用：查看磁盘分区和文件系统的挂载及使用情况。

使用模版：

```bash
df [选项]
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-h` | human-readable，人类易读格式 |
| `-T` | 显示文件系统类型 |

使用示例：

```bash
# 查看磁盘使用情况
df

# 以易读格式显示并输出文件系统类型
df -Th
```

---

### shutdown：关机与重启

shutdown

作用：安全地关闭或重启系统，支持定时执行和广播警告。

使用模版：

```bash
shutdown [选项] [时间] [警告信息]
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-h` | halt，关机 |
| `-r` | reboot，重启 |
| `now` | 立即执行 |
| `+N` | N 分钟后执行 |
| `HH:MM` | 指定时刻执行 |

使用示例：

```bash
# 立即关机
shutdown -h now

# 立即重启
shutdown -r now

# 晚上 22 点关机
shutdown -h 22:00

# 2 分钟后关机并广播警告
shutdown +2 "System will shutdown in 2 minutes"

# 快捷重启
sudo reboot

# 快捷关机
sudo halt -p
```

---

### exit：退出当前 Shell

exit

作用：退出当前 Shell 会话或脚本，可返回退出码。

使用模版：

```bash
exit [退出码]
```

使用示例：

```bash
# 正常退出（退出码 0）
exit

# 以错误码退出（非 0 表示异常）
exit 1
```

---

## 七、Shell 环境

### alias：设置命令别名

alias

作用：为命令设置自定义别名，默认仅本次登录有效。若要永久生效，需写入 `~/.bashrc` 或 `~/.zshrc`。

使用模版：

```bash
# 列出所有别名
alias

# 设置别名
alias <别名>="<命令>"

# 删除别名
unalias <别名>
```

使用示例：

```bash
# 列出所有别名
alias

# 设置 ll 为 ls -alh
alias ll="ls -alh"

# 删除别名
unalias ll

# 设置组合命令别名
alias gohome='cd ~; pwd; echo "You are home!"'
```

---

### export：设置环境变量

export

作用：设置或显示环境变量，使变量可以被子进程继承。

使用模版：

```bash
# 显示所有环境变量
export -p

# 设置环境变量
export <变量名>=<变量值>

# 取消导出某变量（变量未删除，只是不传给子进程）
export -n <变量名>
```

使用示例：

```bash
# 查看所有环境变量
export -p

# 设置变量
export MY_APP_PORT=8080

# 取消导出
export -n MY_APP_PORT
```

---

### type：查看命令类型

type

作用：查看一个命令是内建命令、外部命令、别名还是函数，可用于检测命令是否存在。

使用模版：

```bash
type <命令>
```

使用示例：

```bash
# 查看 cd（内建命令）
type cd

# 查看 ls（外部命令或别名）
type ls

# 查看是否存在某命令
type docker
```

---

### which：查找命令路径

which

作用：在环境变量 `$PATH` 的目录中查找命令的完整路径。

使用模版：

```bash
which [选项] <命令>
```

使用示例：

```bash
# 查找 python 的路径
which python

# 返回所有匹配路径（当存在多个版本时）
which -a python
```

---

### whereis：查找命令相关文件

whereis

作用：查找命令的二进制文件、源代码文件及 man 手册的位置。比 `which` 返回信息更全面。

使用模版：

```bash
whereis [选项] <命令>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-b` | 只查找二进制文件 |
| `-m` | 只查找帮助文件（man） |
| `-s` | 只查找源码文件 |

使用示例：

```bash
# 查找 ls 相关文件（二进制、man 手册）
whereis ls

# 只查找二进制文件
whereis -b ls
```

---

## 八、网络与远程

### scp：跨主机安全复制文件

scp：OpenSSH secure file copy

作用：通过 SSH 协议在本地与远程主机之间安全地传输文件，需要 SSH 密码或密钥认证。

使用模版：

```bash
scp [选项] <源> <目标>
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-P <端口>` | 指定 SSH 端口（默认 22） |
| `-r` | 递归复制目录 |
| `-i <密钥文件>` | 指定私钥文件 |

使用示例：

```bash
# 将本地文件上传到远程主机
scp /home/ubuntu/myfile.txt user@192.168.1.100:/home/user/

# 将远程文件下载到本地
scp user@192.168.1.100:/home/user/myfile.txt /home/ubuntu/

# 指定端口上传
scp -P 2222 /home/ubuntu/myfile.txt user@192.168.1.100:/home/user/

# 递归上传目录
scp -r ./mydir user@192.168.1.100:/home/user/
```

---

## 九、帮助文档

### man：查看命令手册

man：manual

作用：查看指定命令的官方使用手册，内容详尽。按 `q` 退出，按方向键/`PgUp`/`PgDn` 翻页。

使用模版：

```bash
man <命令>
```

使用示例：

```bash
# 查看 ls 命令的手册
man ls

# 查看 grep 命令的手册
man grep

# 查看 chmod 的手册
man chmod
```

> 也可使用 `命令 --help` 或 `命令 -h` 查看简短帮助说明。
