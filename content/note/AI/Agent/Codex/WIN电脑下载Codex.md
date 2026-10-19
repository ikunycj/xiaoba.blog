就在最近，Windows 玩家心心念念的 [Computer Use](https://zhida.zhihu.com/search?content_id=276050522&content_type=Article&match_order=1&q=Computer+Use&zhida_source=entity) 功能正式上线了！

更新之后，Codex 可以直接识别你屏幕上的内容、自己点击按钮、自己输入文字，总之，非常好玩！


但问题来了，很多朋友的**Codex 在 Windows 上死活装不上。**

微软商店要么一直转圈，要么弹个"请稍等几分钟"然后就没下文了，要么直接给你甩一个 0x80080005 的错误码。

由于Codex 的 Windows 版没有传统的 exe 安装包，大家只走微软商店这一个渠道，所以一旦微软商店出问题了，大家就彻底没安装不了。

今天这篇文章我把市面上大家普遍遇到的问题和解决方法都整理出来了，同时我还在文章中分享一种绕过微软商店，离线安装Codex的方法。

## **一、先搞清楚为什么会装不上**

在讲解决方案之前，先说一下为什么这么多人翻车。

Codex 的 Windows 版目前只走微软商店这一个渠道。你去官网点"下载 Windows 版"，它会直接把你跳转到 [Microsoft Store](https://zhida.zhihu.com/search?content_id=276050522&content_type=Article&match_order=1&q=Microsoft+Store&zhida_source=entity)。

问题就出在这一步，微软商店在国内本身就是个"薛定谔的存在"，能不能正常用完全看运气。

大家遇到的报错基本就这么几种：

### **情况一：一直显示「请稍等几分钟」，然后就没然后了**

这是最常见的，商店的下载服务卡住了，然后大家等到天荒地老也下载不了。

![](https://pica.zhimg.com/v2-e140aac3a5b9afb4ed3c4e7b080a3a7a_1440w.jpg)

  

### **情况二：直接弹错误码**

比如 0x80080005、0x80070005、0x80070426 这些，本质上都是微软商店自身的服务组件出了问题。

![](https://pic4.zhimg.com/v2-37cead37d7162c45533ddb8c77f8c361_1440w.jpg)

### **情况三：页面显示"此应用在您所在的地区不可用"**

这个是地区限制导致的，商店判定你不在可用范围内，

解决方法也很简单，临时把系统地区切成美国就行。

打开设置 → 时间和语言 → 区域 → 把"国家或地区"改成美国 → 关掉商店重新打开，就能下载了。装完之后再改回国内，不影响任何东西。

不管你遇到的是哪种，下面都有对应的解决方法。

## **方案一：先试试修复微软商店本身**

如果你只是偶尔抽风，商店本身还能打开，可以先试试修复。

### **第一步：重置微软商店缓存**

按 Win + R 打开运行窗口，输入 [wsreset](https://zhida.zhihu.com/search?content_id=276050522&content_type=Article&match_order=1&q=wsreset&zhida_source=entity)，回车。

会弹出一个黑色窗口，等它自动关闭后微软商店会重新打开。这一步是清除商店的缓存，很多时候清一下就好了。

  

![](https://pic4.zhimg.com/v2-7733b8300b07dc145ef09c692d3add8d_1440w.jpg)

  

### **第二步：检查网络环境**

这个很关键，如果你开着魔法，先关掉试试。

微软商店对网络环境比较敏感，有时候挂着代理反而下不了。

反过来，如果你没开代理但也下不了，试试切换成手机热点。

### **第三步：重新登录微软账号**

打开微软商店，点右上角头像，先注销，再重新登录。有些报错就是账号验证过期导致的。

  

![](https://picx.zhimg.com/v2-7ca32388d6d68ba739340b358aa2fd29_1440w.jpg)

  

### **第四步：跑一下系统修复命令**

如果上面三步都没用，打开 [PowerShell](https://zhida.zhihu.com/search?content_id=276050522&content_type=Article&match_order=1&q=PowerShell&zhida_source=entity)（管理员模式），依次执行这两条命令：

> [DISM.exe](https://zhida.zhihu.com/search?content_id=276050522&content_type=Article&match_order=1&q=DISM.exe&zhida_source=entity) /Online /Cleanup-image /Restorehealth  
> [sfc /scannow](https://zhida.zhihu.com/search?content_id=276050522&content_type=Article&match_order=1&q=sfc+%2Fscannow&zhida_source=entity)

![](https://picx.zhimg.com/v2-cf79bf915aa6ce848ed5ee52088e9d1d_1440w.jpg)

等它跑完，重启电脑，再去商店试试。

如果到这一步还是不行，就别折腾了，直接看方案二，一步到位。

## **方案二(推荐)：绕过微软商店，离线安装**

这是目前最稳的方法，也是我最推荐的方案。

核心思路很简单：既然微软商店靠不住，那我们就自己把安装包从微软的服务器上扒下来，然后用命令手动装。

整个过程分三步，不需要任何技术基础，跟着做就行。

### **第一步：获取 Codex 离线安装包**

打开这个网站
[https://store.rg-adguard.net/](https://link.zhihu.com/?target=https%3A//store.rg-adguard.net/)

这个站点的作用是把微软商店里的应用下载链接解析出来，让你直接下载安装文件。

进去之后你会看到一个搜索框：

_1、把左边的下拉菜单选成 **ProductId**_

_2、在搜索框里输入 Codex 的产品 ID：**9PLM9XGG6VKS**_

_3、右边的下拉菜单保持默认（RP），然后点那个 ✓ 按钮_

![](https://pic2.zhimg.com/v2-5aa551f2e9290799f1cb5c8c6f4fcab7_1440w.jpg)

页面会刷出来一堆文件列表。

你要找的是文件名里带 **OpenAI.Codex** 并且后缀是 **.Msix** 或 **.Msixbundle** 的那个文件，而且要选 **x64** 版本（绝大多数人的电脑都是 x64 架构）。

文件名大概长这样：

`OpenAI.Codex_26.506.3741.0_x64__2p2nqsd0c76g0.Msix`

版本号会随着更新变化，不用在意具体数字，选最新的那个就行。

点击文件名下载。

如果点了没反应，大概率是被浏览器拦截了。

这时候右键点击链接，选"复制链接地址"，然后粘贴到浏览器地址栏里打开就能下载了。

如果还是下载不动，打开 PowerShell，用下面的命令下载（把引号里的链接换成你复制的那个）：

> curl.exe -L "你复制的下载链接" -o Codex.Msix

文件会下载到你当前 PowerShell 所在的目录。

### **第二步：启动 Codex**

安装完成后，按 Win 键打开开始菜单，搜索 **Codex**，你就能看到它了。点击打开，用你的 ChatGPT 账号登录即可。

  

![](https://pic4.zhimg.com/v2-f2d8fa5ec194d684586debdc3041b2c7_1440w.jpg)

  

目前免费的ChatGPT也可以使用Codex，但免费额度基本上就够你体验一下界面、跑两三个简单任务，稍微多使用一下就会碰到限额。

还有就是如果是重度编程玩家，Plus的额度基本也不够，如果你是想要体验的，可以先去订阅Plus，再上Pro。

关于订阅也是很多人卡住的地方，ChatGPT 不支持国内信用卡直接付款。

## **最后总结一下**

Windows 装 Codex 的推荐路径：

**大家可以先直接在微软商店安装，如果不行，就wsreset 清理一下缓存和换网络，如果各种各样的方法都不行。**

**那就直接使用离线安装包方案，一步安装到位。**

离线安装是目前社区里成功率最高的方案，不依赖微软商店的状态，也不需要魔法，基本上只要你的系统版本够，基本跟着步骤走就能装上。

而且这个方法不只能装 Codex，以后微软商店里任何应用装不上了，都可以用同样的思路解决，去 [http://store.rg-adguard.net](https://link.zhihu.com/?target=http%3A//store.rg-adguard.net) 扒安装包，PowerShell 手动装，万能方案。