# Shell 脚本笔记

## 一、终端快捷键

| 快捷键 | 作用 |
|--------|------|
| `Ctrl + C` | 强制终止当前运行的程序 |
| `Ctrl + D` | 退出当前 Shell / 登出（不可用于退出 Vim） |
| `Ctrl + L` / `clear` | 清空终端屏幕 |
| `Ctrl + A` | 光标跳到命令行开头 |
| `Ctrl + E` | 光标跳到命令行结尾 |
| `Ctrl + R` | 搜索历史命令（输入关键字匹配，回车执行，方向键取出不执行） |

---

### history：查看历史命令

作用：查看或重新执行历史命令记录。

```bash
# 查看历史命令列表
history

# 执行上一次以指定前缀开头的命令
!<命令前缀>
```

使用示例：

```bash
# 重新执行上一次以 ssh 开头的命令
!ssh

# 执行历史列表中第 42 条命令
!42
```

---

## 二、Shell 脚本基础

### 脚本格式

1. 脚本第一行必须声明解释器（shebang）：`#!/bin/bash`
2. 脚本文件默认以 `.sh` 结尾
3. 脚本需要有可执行权限（或通过 `sh` 直接执行）

### 脚本执行方式

```bash
# 方式一：赋予执行权限后直接执行（需要 x 权限）
chmod +x script.sh
./script.sh

# 方式二：用 sh 解释器执行（无需 x 权限）
sh script.sh

# 方式三：用 bash 解释器执行
bash script.sh
```

---

## 三、变量

### 系统变量

Shell 内置的环境变量，可直接使用：

| 变量 | 说明 |
|------|------|
| `$HOME` | 当前用户的主目录路径 |
| `$PWD` | 当前工作目录路径 |
| `$SHELL` | 当前使用的 Shell 解释器路径 |
| `$USER` | 当前登录用户名 |
| `$HOSTNAME` | 当前主机名 |
| `$PATH` | 命令搜索路径 |

```bash
# 查看所有 Shell 变量（含用户自定义变量）
set

# 查看所有环境变量
env
```

---

### 用户自定义变量

#### 定义与使用

```bash
# 定义变量（等号两侧不能有空格）
变量名=值

# 使用变量
echo $变量名
echo ${变量名}    # 推荐加花括号，避免歧义

# 撤销变量
unset 变量名

# 声明只读（静态）变量，不可修改和撤销
readonly 变量名=值
```

#### 变量命名规则

- 由字母、数字、下划线组成，**不能以数字开头**
- 等号两侧**不能有空格**
- 变量名习惯使用**大写**（约定俗成）

#### 将命令结果赋值给变量

```bash
# 方式一：反引号
A=`date`

# 方式二：$() 推荐（支持嵌套）
A=$(date)

echo $A
```

---

### 环境变量

环境变量可以被子进程继承，通常在配置文件中定义。

```bash
# 将变量导出为环境变量
export 变量名=变量值

# 让配置文件修改立即生效（当前 Shell 中重新加载）
source ~/.bashrc
# 或
. ~/.bashrc

# 查询环境变量的值
echo $变量名
```

---

### 位置参数变量

运行脚本时传入的参数，按位置依次存储在位置参数变量中。

| 变量 | 说明 |
|------|------|
| `$0` | 脚本本身的名称（含路径） |
| `$1` ~ `$9` | 第 1 ~ 9 个参数 |
| `${10}` | 第 10 个及以后的参数（需用花括号） |
| `$#` | 传入参数的总数量 |
| `$*` | 所有参数，视为一个整体字符串 |
| `$@` | 所有参数，每个参数独立（常用于循环遍历） |

使用示例：

```bash
#!/bin/bash

echo "脚本名称: $0"
echo "第一个参数: $1"
echo "第二个参数: $2"
echo "参数总数: $#"
echo "所有参数（整体）: $*"
echo "所有参数（独立）: $@"
```

执行：

```bash
./myscript.sh arg1 arg2 arg3
```

输出：

```
脚本名称: ./myscript.sh
第一个参数: arg1
第二个参数: arg2
参数总数: 3
所有参数（整体）: arg1 arg2 arg3
所有参数（独立）: arg1 arg2 arg3
```

---

### 预定义特殊变量

Shell 内置的特殊状态变量：

| 变量 | 说明 |
|------|------|
| `$?` | 上一条命令的退出状态码（`0` 表示成功，非 `0` 表示失败） |
| `$$` | 当前 Shell 进程的 PID |
| `$!` | 最近一个放入后台的进程 PID |

使用示例：

```bash
ls /nonexistent
echo $?   # 输出非 0，表示上一命令失败

echo $$   # 输出当前 Shell 的 PID
```

---

## 四、运算符

### 算术运算

```bash
# 方式一：$(( ))  推荐
result=$((3 + 5))
result=$((10 * 2))

# 方式二：expr（运算符两侧必须有空格；乘法 * 需转义为 \*）
result=$(expr 3 + 5)
result=$(expr 10 \* 2)
```

常用算术运算符：

| 运算符 | 说明 |
|--------|------|
| `+` | 加法 |
| `-` | 减法 |
| `*` | 乘法（expr 中需写 `\*`） |
| `/` | 除法（整数除法） |
| `%` | 取模（取余） |

---

### 比较运算符（整数）

用于 `[ ]` 条件判断中：

| 运算符 | 说明 | 英文全称 |
|--------|------|----------|
| `-eq` | 等于 | equal |
| `-ne` | 不等于 | not equal |
| `-lt` | 小于 | less than |
| `-le` | 小于等于 | less than or equal |
| `-gt` | 大于 | greater than |
| `-ge` | 大于等于 | greater than or equal |

> ⚠️ 方括号 `[ ]` 内侧与判断内容之间必须有空格：`[ $a -eq $b ]`

---

### 字符串运算符

| 运算符 | 说明 |
|--------|------|
| `=` | 字符串相等 |
| `!=` | 字符串不相等 |
| `-z` | 字符串为空（zero length） |
| `-n` | 字符串非空（non-zero length） |

---

### 逻辑运算符

| 运算符 | 说明 |
|--------|------|
| `&&` | 逻辑与，前一条命令成功（返回 0）才执行后一条 |
| `\|\|` | 逻辑或，前一条命令失败才执行后一条 |
| `!` | 逻辑非，取反 |
| `-a` | `[ ]` 内的逻辑与 |
| `-o` | `[ ]` 内的逻辑或 |

---

### 赋值运算符

| 运算符 | 说明 |
|--------|------|
| `=` | 赋值 |
| `+=` | 追加赋值（数字或字符串） |
| `-=` | 减法赋值 |
| `*=` | 乘法赋值 |
| `/=` | 除法赋值 |
| `%=` | 取模赋值 |

---

## 五、条件判断

### [ ] 条件判断

```bash
[ 判断语句 ]
```

- 方括号与判断语句之间**必须有空格**
- 返回值：`0` 表示 true，非 `0` 表示 false
- 可用 `$?` 查看上一次判断结果

```bash
[ 1 -eq 1 ]
echo $?   # 输出 0（true）

[ 1 -eq 2 ]
echo $?   # 输出 1（false）
```

---

### test 命令

`test` 与 `[ ]` 等价，用于条件测试，返回 0（true）或 1（false）。

#### 文件测试

| 表达式 | 说明 |
|--------|------|
| `-e <路径>` | 文件或目录是否存在（exist） |
| `-f <路径>` | 是否为普通文件（file） |
| `-d <路径>` | 是否为目录（directory） |
| `-r <路径>` | 文件是否可读（readable） |
| `-w <路径>` | 文件是否可写（writable） |
| `-x <路径>` | 文件是否可执行（executable） |

```bash
if [ -e /etc/passwd ]; then
    echo "文件存在"
fi

if test -d /home; then
    echo "是一个目录"
fi
```

#### 字符串比较

| 表达式 | 说明 |
|--------|------|
| `"$a" = "$b"` | 两字符串相等 |
| `"$a" != "$b"` | 两字符串不相等 |
| `-n "$a"` | 字符串非空 |
| `-z "$a"` | 字符串为空 |

```bash
if [ "$str1" = "$str2" ]; then
    echo "字符串相等"
fi
```

#### 整数比较

```bash
if [ $num1 -gt $num2 ]; then
    echo "$num1 大于 $num2"
fi
```

#### 逻辑组合

```bash
# 文件存在且可执行
if [ -e script.sh ] && [ -x script.sh ]; then
    echo "文件可执行"
fi

# [ ] 内部使用 -a / -o
if [ -f file.txt -a -r file.txt ]; then
    echo "文件存在且可读"
fi

# 取反
if [ ! -e /tmp/lockfile ]; then
    echo "锁文件不存在"
fi
```

---

## 六、流程控制

### if / elif / else

```bash
if [ 条件1 ]
then
    # 条件1 为真时执行
elif [ 条件2 ]
then
    # 条件2 为真时执行
else
    # 所有条件都不满足时执行
fi
```

使用示例：

```bash
#!/bin/bash

score=$1

if [ $score -ge 90 ]
then
    echo "优秀"
elif [ $score -ge 60 ]
then
    echo "及格"
else
    echo "不及格"
fi
```

---

### case / esac

作用：对变量进行多分支匹配，类似其他语言的 switch。

```bash
case $变量 in
    "模式1")
        # 匹配模式1时执行
        ;;
    "模式2")
        # 匹配模式2时执行
        ;;
    *)
        # 未匹配任何模式时执行（默认分支）
        ;;
esac
```

使用示例：

```bash
#!/bin/bash

case $1 in
    "start")
        echo "启动服务"
        ;;
    "stop")
        echo "停止服务"
        ;;
    "restart")
        echo "重启服务"
        ;;
    *)
        echo "用法: $0 {start|stop|restart}"
        ;;
esac
```

---

### for 循环

**语法一：遍历列表**

```bash
for 变量 in 值1 值2 值3 ...
do
    # 循环体
done
```

使用示例：

```bash
for fruit in apple banana cherry
do
    echo "水果: $fruit"
done
```

**语法二：C 风格计数循环**

```bash
for (( 初始值; 循环条件; 变量变化 ))
do
    # 循环体
done
```

使用示例：

```bash
for (( i=1; i<=5; i++ ))
do
    echo "第 $i 次循环"
done
```

---

### while 循环

作用：条件为真时持续执行循环体。

```bash
while [ 条件 ]
do
    # 循环体
done
```

使用示例：

```bash
#!/bin/bash

count=1

while [ $count -le 5 ]
do
    echo "count = $count"
    count=$((count + 1))
done
```

---

### until 循环

作用：与 `while` 相反，条件为**假**时执行循环体，条件为**真**时退出。

```bash
until [ 条件 ]
do
    # 循环体（条件为假时执行）
done
```

使用示例：

```bash
#!/bin/bash

count=1

until [ $count -gt 5 ]
do
    echo "count = $count"
    count=$((count + 1))
done
```

---

### read：读取用户输入

作用：从标准输入（或用户键盘）读取数据，赋值给变量。

```bash
read [选项] 变量名
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-p <提示信息>` | 显示提示信息 |
| `-t <秒数>` | 设置等待超时时间 |
| `-s` | 静默输入（不回显，适合输入密码） |

使用示例：

```bash
# 基本读取
echo "What's your name?"
read name
echo "Hello, $name!"

# 带提示信息
read -p "请输入你的年龄: " age
echo "你的年龄是 $age 岁"

# 带超时
if read -t 5 -p "请在 5 秒内输入选项: " choice; then
    echo "你选择了: $choice"
else
    echo "超时，未收到输入"
fi

# 密码输入（不回显）
read -s -p "请输入密码: " password
echo ""
echo "密码已接收"
```

---

## 七、注释

```bash
# 这是单行注释

: << 'COMMENT'
这是
多行注释块
COMMENT

# 也可以用感叹号作为分隔符
:<<!
这也是
多行注释
!
```

---

## 八、软件包管理

### apt：Ubuntu / Debian 系

apt：Advanced Package Tool

作用：Ubuntu/Debian 系 Linux 的包管理工具，自动处理依赖关系。

使用模版：

```bash
apt [-y] [install/remove/search] <软件名>
```

常用命令：

```bash
# 更新软件包列表
sudo apt update

# 安装软件（-y 自动确认）
sudo apt install -y nginx

# 卸载软件
sudo apt remove nginx

# 卸载软件并删除配置文件
sudo apt purge nginx

# 搜索软件
apt search nginx

# 升级已安装的所有软件包
sudo apt upgrade
```

---

### yum：CentOS / RHEL 系

yum：Yellowdog Updater Modified

作用：CentOS/RHEL 系 Linux 的 RPM 软件包管理器，自动解决依赖问题。需要 root 权限及网络连接。

使用模版：

```bash
yum [-y] [install/remove/search] <软件名>
```

常用命令：

```bash
# 安装软件（-y 自动确认）
sudo yum install -y nginx

# 卸载软件
sudo yum remove nginx

# 搜索软件
yum search nginx

# 更新所有软件包
sudo yum update

# 查看已安装的软件包
yum list installed
```

> CentOS 8 及更新版本推荐使用 `dnf` 代替 `yum`，用法基本相同。
