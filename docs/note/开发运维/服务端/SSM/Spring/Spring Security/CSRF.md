## CSRF漏洞原理攻击与防御

---

## 一、什么是CSRF?

CSRF (Cross-site request forgery，跨站请求伪造)也被称为One Click Attack或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。尽管听起来像跨站脚本(XSS)，但它与XSS非常不同，XSS利用站点内的信任用户，而CSRF则通过伪装成受信任用户请求受信任的网站。  
  
简单的说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己以前认证过的站点并运行一些操作（如发邮件，发消息，甚至财产操作（如转账和购买商品））。因为浏览器之前认证过，所以被访问的站点会觉得这是真正的用户操作而去运行。

## 二、CSRF攻击原理及过程

CSRF为什么能够攻击成功?

其本质原因是重要操作的所有参数都是可以被攻击者猜测到的。

攻击者只有预测出URL的所有参数与参数值，才能成功地构造一个伪造的请求;反之，攻击者将无法攻击成功。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ef9eed0b772951bc593c5d9f7c348c84.jpeg) 从上图能够看出，要完毕一次CSRF攻击，受害者必须依次完毕两个步骤：

```
        登录受信任站点A，并在本地生成Cookie。

        在不登出A的情况下，访问危急站点B。
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5468e3c01e7721ef3a25bbd9f4bfaab9.png)

1、客户端通过账户密码登录访问网站A。  
2、网站A验证客户端的账号密码，成功则生成一个sessionlD，并返回给客户端存储在浏览器中。  
3、该客户端Tab—个新页面访问了网站B。  
4、网站B自动触发要求该客户端访问网站A。(即在网站B中有链接指向网站A)  
5、客户端通过网站B中的链接访问网站A。(此时携带有合法的SessionID进行访问站A的)  
6、此时网站A只需检验sessionIlD是否合法，合法则执行相应的操作。(因此具体啥工具就得看链接，以及网站B要求访问时携带的数据)

所以要被CSRF攻击，必须同时满足两个条件：

登录受信任网站A，并在本地生成Cookie。  
在不登出A的情况下，访问危险网站B。

## 三、CSRF分类

CSRF(Cross-Site Request Forgery)，跟XSS漏洞攻击一样，存在巨大的危害性。

你可以这么来理解:攻击者盗用了你的身份，以你的名义发送恶意请求，对服务器来说这个请求是完全合法的，但是却完成了攻击者所期望的一个操作，比如以你的名义发送邮件、发消息，盗取你的账号，添加系统管理员，甚至于购买商品、虚拟货币转账等

### 1. GET类型的CSRF

1.GET类型的CSRF

仅仅须要一个HTTP请求。就能够构造一次简单的CSRF。

样例：

银行站点A：它以GET请求来完毕银行转账的操作，如：

```
http://www.mybank.com/Transfer.php?toBankId=11&money=1000 
```

危险站点B：它里面有一段HTML的代码例如以下：

```javascript
<img src=http://www.mybank.com/Transfer.php?toBankId=11&money=1000>
```

首先。你登录了银行站点A，然后访问危险站点B，噢，这时你会发现你的银行账户少了1000块。

为什么会这样呢？原因是银行站点A违反了HTTP规范，使用GET请求更新资源。

在访问危险站点B的之前。你已经登录了银行站点A，而B中的 一个合法的请求，但这里被不法分子利用了）。

所以你的浏览器会带上你的银行站点A的Cookie发出Get请求，去获取资源以GET的方式请求第三方资源（这里的第三方就是指银行站点了），

原本这是：

```javascript
http://www.mybank.com/Transfer.php?toBankId=11&money=1000
```

结果银行站点服务器收到请求后，觉得这是一个更新资源操作（转账操作），所以就立马进行转账操作。

### 2. POST类型的CSRF

在CSRF攻击流行之初，曾经有一种错误的观点，认为CSRF攻击只能由GET请求发起。因此很多开发者都认为只要把重要的操作改成只允许POST请求，就能防止CSRF攻击。

这样的错误观点形成的原因主要在于，大多数CSRF攻击发起时，使用的HTML标签都是<image>、<iframe>、<script>等带“src"属性的标签，这类标签只能够发起一次GET请求，而不能发起POST请求。

而对于很多网站的应用来说，一些重要操作并未严格地区分GET与POST，攻击者可以使用GET来请求表单的提交地址。比如在PHP中，如果使用的是$_REQUEST，而非$_POST获取变量，则会存在这个问题。

对于一个表单来说，用户往往也就可以使用GET方式提交参数。比如以下表单:

```html
<form action=" / register" id="register" method="post" >
<input type=text name="username" value="" />
<input type=password name="password" value="" />
<input type=submit name="submit" value="submit" />
</form>

```

用户可尝试构造一个GET请求

```htnl
http: //host/register?username=test&password=passwd
```

来提交，若服务器端未对请求方法进行限制，则这个请求会通过。

如果服务器端已经区分了GET与POST，那么攻击者有什么方法呢?对于攻击者来说，若干种方法可以构造出一个POST请求。

最简单的方法，就是在一个页面中构造好一个表单表单，然后使用JavaScript自动提交这个表单。比如，攻击者在www.b.com/test.html中编写如下代码：

```html
<form action="http: / / www . a.com/register" id="register" method="post" ><input type=text name="username" value=""/>
<input type=password name="password" value=""/><input type=submit name="submit" value="submit"/></ form>
<script>
var f = document.getElementById ( "register");
f.inputs [0].value = "test";
f.inputs [1].value = "passwd" ;
f.submit ();
</script>

```

攻击者甚至可以将这个页面隐藏在一个不可见的iframe窗口中，那么整个自动提交表单的过程，对于用户来说也是不可见的。

在2007年的Gmail CSRF漏洞攻击过程中，安全研究者pdp展示了这一技巧。首先，用户需要登录Gmail账户，以便让浏览器获得Gmail的临时Cookie。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5697d96b4fca2727e7ed56565c86c49d.png)  
用户登录Gmail

然后，攻击者诱使用户访问一个恶意页面。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2d7ce2033e56bc63baf77f58917f8663.png)  
攻击者诱使用户访问恶意页面

在这个恶意页面中，隐藏了一个iframe，iframe的地址指向pdp写的CSRF构造页面。

```jav
http: //www.gnucitizen.org/util/csrf?_method=POST&_enctype=multipart/form-data&_action=https%3A//mail.google.com/mail/h/ewtljmuj4ddv/%3Fv%3Dprf&cf2_emc=true&cf2_email=evilinboxmailinator.com&cfl_from&cfl_toucf1_subjicf1_has&cfl_hasnotscf1_attach=truestfi&S=z&irf=on&nvp bu_cftb=Create%20Filter
```

这个链接的实际作用就是把参数生成一个POST的表单，并自动提交。  
由于浏览器中已经存在Gmail的临时Cookie，所以用户在iframe中对Gmail发起的这次请求会成功―—邮箱的Filter中会新创建一条规则，将所有带附件的邮件都转发到攻击者的邮箱中。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a4ccb96ee22d66057446d2ea618e3e79.png)  
恶意站点通过CSRF在用户的Gmail中建立一条规则。

**如果上述例子看得还是有点懵逼，那再举一个例子：**

在普通用户的眼中，点击网页->打开试看视频->购买视频是一个很正常的一个流程。可是在攻击者的眼中可以算正常但又不正常的，当然不正常的情况下，是在开发者安全意识不足所造成的。攻击者在购买处抓到购买时候网站处理购买(扣除)用户余额的地址。

比如:

```
/coures/user/handler666buy.php</font>
```

通过提交表单，buy.php处理购买的信息，这里的666为视频ID。那么攻击者现在构造一个链接，链接中包含以下内容。

```html
<form action=/coures/user/handler/666/buy method=POST>
<input type="text" name="xx" value="xx" />
</form>
<script> document.forms[0].submit(); </script> 
```

当用户访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作，自动购买了id为666的视频，从而导致受害者余额扣除。

## 四、CSRF漏洞的挖掘

1、最简单的方法就是抓取一个正常请求的数据包，如果没有Referer字段和token，那么极有可能存在CSRF漏洞。

2、如果有**Referer**字段，但是去掉Referer字段后再重新提交，如果该提交还有效，那么基本上可以确定存在CSRF漏洞。

3、随着对CSRF漏洞研究的不断深入，不断涌现出一些专门针对CSRF漏洞进行检测的工具，如CSRFTester，CSRF Request Builder等。以CSRFTester工具为例，CSRF漏洞检测工具的测试原理如下:

使用CSRFTester进行测试时，首先需要抓取我们在浏览器中访问过的所有链接以及所有的表单等信息，然后通过在CSRFTester中修改相应的表单等信息，重新提交，这相当于一次伪造客户端请求。

如果修改后的测试请求成功被网站服务器接受，则说明存在CSRF漏洞，当然此款工具也可以被用来进行CSRF攻击。

## 五、CSRF漏洞的防御

### 1、验证码

验证码被认为是对抗CSRF攻击最简洁而有效的防御方法。

CSRF攻击的过程，往往是在用户不知情的情况下构造了网络请求。而验证码，则强制用户必须与应用进行交互，才能完成最终请求。因此在通常情况下，验证码能够很好地遏制CSRF攻击。

但是验证码并非万能。很多时候，出于用户体验考虑，网站不能给所有的操作都加上验证码。因此，验证码只能作为防御CSRF的一种辅助手段，而不能作为最主要的解决方案。

### 2、在请求地址中添加 token 并验证

CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。

要抵御 CSRF关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。

可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这==token==，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/dcfafcc3787181847ec6fe751a3786ed.png)  
这种方法要比检查 Referer要安全一些，token 可以在用户登陆后产生并放于 session 之中，然后在每次请求时把 token 从 session 中拿出，与请求中的 token 进行比对，但这种方法的难点在于如何把 token 以参数的形式加入请求。

对于 GET 请求，token 将附在请求地址之后，这样 URL 就变成 http://url?csrftoken=tokenvalue。 而对于 POST 请求来说，要在 form 的最后加上 ，这样就把 token 以参数的形式加入请求了。

但是，在一个网站中，可以接受请求的地方非常多，要对于每一个请求都加上 token 是很麻烦的，并且很容易漏掉，通常使用的方法就是在每次页面加载时，使用 javascript 遍历整个 dom 树，对于 dom 中所有的 a 和 form 标签后加入 token。

这样可以解决大部分的请求，但是对于在页面加载之后动态生成的 html 代码，这种方法就没有作用，还需要程序员在编码时手动添加 token。

该方法还有一个缺点是难以保证 token 本身的安全。特别是在一些论坛之类支持用户自己发表内容的网站，黑客可以在上面发布自己个人网站的地址。由于系统也会在这个地址后面加上 token，黑客可以在自己的网站上得到这个 token，并马上就可以发动 CSRF 攻击。

为了避免这一点，系统可以在添加 token 的时候增加一个判断，如果这个链接是链到自己本站的，就在后面添加 token，如果是通向外网则不加。

不过，即使这个 csrftoken 不以参数的形式附加在请求之中，黑客的网站也同样可以通过 Referer 来得到这个 token 值以发动 CSRF 攻击。这也是一些用户喜欢手动关闭浏览器 Referer 功能的原因。

### 3、在 HTTP 头中自定义属性并验证

这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。

这样解决了上种方法在请求中加入 token 的不便，同时，通过XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。

> 然而这种方法的局限性非常大，XMLHttpRequest 请求通常用于 Ajax 方法中对于页面局部的异步刷新，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。

另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。

### 4、验证 HTTP Referer 字段

根据 HTTP 协议，在 HTTP 头中有一个字段叫==Referer==，它记录了该 HTTP 请求的来源地址。在通常情况下，访问一个安全受限页面的请求来自于同一个网站，比如需要访问 ：

```ja
http://bank.example/withdraw?account=bob&amount=1000000&for=Mallory
```

用户必须先登陆 bank.example，然后通过点击页面上的按钮来触发转账事件。

这时，该转帐请求的 Referer 值就会是转账按钮所在的页面的 URL，通常是以 bank.example 域名开头的地址。而如果黑客要对银行网站实施 CSRF 攻击，他只能在他自己的网站构造请求，当用户通过黑客的网站发送请求到银行时，该请求的 Referer 是指向黑客自己的网站。

因此，要防御 CSRF 攻击，银行网站只需要对于每一个转账请求验证其 Referer 值，如果是以 bank.example 开头的域名，则说明该请求是来自银行网站自己的请求，是合法的。如果 Referer 是其他网站的话，则有可能是黑客的 CSRF 攻击，拒绝该请求。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/3142260eac5dc46a59510897cd5679e7.gif)  
这种方法的显而易见的好处就是简单易行，网站的普通开发人员不需要操心 CSRF 的漏洞，只需要在最后给所有安全敏感的请求统一增加一个拦截器来检查 Referer 的值就可以。特别是对于当前现有的系统，不需要改变当前系统的任何已有代码和逻辑，没有风险，非常便捷。

然而，这种方法并非万无一失。Referer 的值是由浏览器提供的，虽然 HTTP 协议上有明确的要求，但是每个浏览器对于 Referer 的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。

使用验证 Referer 值的方法，就是把安全性都依赖于第三方（即浏览器）来保障，从理论上来讲，这样并不安全。

事实上，对于某些浏览器，比如 IE6 或 FF2，目前已经有一些方法可以篡改 Referer 值。如果 bank.example 网站支持 IE6 浏览器，黑客完全可以把用户浏览器的 Referer 值设为以 bank.example 域名开头的地址，这样就可以通过验证，从而进行 CSRF 攻击。

即便是使用最新的浏览器，黑客无法篡改 Referer 值，这种方法仍然有问题。因为 Referer 值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权，特别是有些组织担心 Referer 值会把组织内网中的某些信息泄露到外网中。

因此，用户自己可以设置浏览器使其在发送请求时不再提供 Referer。当他们正常访问银行网站时，网站会因为请求没有 Referer 值而认为是 CSRF 攻击，拒绝合法用户的访问。

## 总结

CSRF攻击是攻击者利用用户的身份操作用户账户的一种攻击方式。设计CSRF的防御方案必须先理解CSRF攻击的原理和本质。我们通常使用Anti CSRF Token来防御CSRF攻击，在使用Token时，要注意Token的保密性和随机性。