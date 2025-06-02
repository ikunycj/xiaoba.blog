跨源资源共享（CORS，Cross-Origin Resource Sharing）是现代 Web 开发中至关重要的安全机制，其设计体现了**浏览器安全**与**功能扩展**的深层博弈。
## 一、什么是跨源资源共享（CORS）
**源(origin)**—— **域(domain)**+**端口(port)**+**协议(protocol)** 的组合
**跨源请求** —— 那些发送到其他域（即使是子域）、协议或端口的请求
**同源策略** ——（Same OriginPolicy）要求不同源之间是无法通信的，而CORS则是放宽同源策略以通过浏览器实现网站之间通信的机制
**跨源资源共享** —— 
- 是一种基于 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头的机制，该机制通过允许服务器标示除了它自己以外的其他[源](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)（域、协议或端口），使得浏览器允许这些源访问加载自己的资源。
- 跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的“预检”请求。在预检中，浏览器发送的头中标示有 HTTP 方法和真实请求中会用到的头。

跨源 HTTP 请求的一个例子：运行在 `https://domain-a.com` 的 JavaScript 代码使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 来发起一个到 `https://domain-b.com/data.json` 的请求。但是由于CORS的存在，这个请求很有可能被拒绝或者需要一些方式得到许可。

---

## 二、同源策略的哲学困境
同源策略（Same-Origin Policy）本质是浏览器对"**信任边界**"的强制划分：
- **信任的代价**：1995 年 Netscape 设计时，假设同域资源天然可信，但跨域即潜在威胁
- **现代性矛盾**：单页应用、微服务架构导致资源分布式部署，同源策略成为功能枷锁
- **CORS 的平衡**：CORS 的存在是为了保护互联网免受黑客攻击。在安全沙箱内开辟可控通道，实现"最小特权原则"的跨域访问
### 历史
**多年来，来自一个网站的脚本无法访问另一个网站的内容。**

这个简单有力的规则是互联网安全的基础。例如，来自 `hacker.com` 的脚本无法访问 `gmail.com` 上的用户邮箱。基于这样的规则，人们感到很安全。

在那时候，JavaScript 并没有任何特殊的执行网络请求的方法。它只是一种用来装饰网页的玩具语言而已。

但是 Web 开发人员需要更多功能。人们发明了各种各样的技巧去突破该限制，并向其他网站发出请求。
#### 1.使用`<form>`
其中一种和其他服务器通信的方法是在那里提交一个 `<form>`。人们将它提交到 `<iframe>`，只是为了停留在当前页面，像这样：
```html
<!-- 表单目标 -->
<iframe name="iframe"></iframe>

<!-- 表单提交目标 -->
<form target="iframe" method="POST" action="http://another.com/...">
 ...
</form>
```
因此，即使没有网络方法，也可以向其他网站发出 GET/POST 请求，因为表单可以将数据发送到任何地方。但是由于禁止从其他网站访问 `<iframe>` 中的内容，因此就无法读取响应。

确切地说，实际上有一些技巧能够解决这个问题，这在 iframe 和页面中都需要添加特殊脚本。因此，与 iframe 的通信在技术上是可能的。现在我们没必要讲其细节内容，我们还是让这些古董代码不要再出现了吧。

#### 2.使用`<script>`
另一个技巧是使用 `script` 标签。`script` 可以具有任何域的 `src`，例如 `<script src="http://another.com/…">`。也可以执行来自任何网站的 `script`。

如果一个网站，例如 `another.com` 试图公开这种访问方式的数据，则会使用所谓的 “JSONP (JSON with padding)” 协议。

这是它的工作方式。

假设在我们的网站，需要以这种方式从 `http://another.com` 网站获取数据，例如天气：

1. 首先，我们先声明一个全局函数来接收数据，例如 `gotWeather`。
```js
// 1. 声明处理天气数据的函数
function gotWeather({ temperature, humidity })
	{ alert(`temperature: ${temperature} , humidity: ${humidity}`);
}
```
2. 然后我们创建一个特性（attribute）为 `src="http://another.com/weather.json?callback=gotWeather"` 的 `<script>` 标签，使用我们的函数名作为它的 `callback` URL-参数。
```js
let script = document.creatElement('script');
script.scr = `http:another.com/weather.json?callback=gotWecher`;
document.body.append(script);
```
3. 远程服务器 `another.com` 动态生成一个脚本，该脚本调用 `gotWeather(...)`，发送它想让我们接收的数据。
```js
// 我们期望来自服务器的回答看起来像这样：
gotWeather({ 
	temperature: 25, 
	humidity: 78 
});
```
4. 当远程脚本加载并执行时，`gotWeather` 函数将运行，并且因为它是我们的函数，我们就有了需要的数据。

这是可行的，并且不违反安全规定，因为双方都同意以这种方式传递数据。而且，既然双方都同意这种行为，那这肯定不是黑客攻击了。现在仍然有提供这种访问的服务，因为即使是非常旧的浏览器它依然适用。

不久之后，网络方法出现在了浏览器 JavaScript 中。

起初，跨源请求是被禁止的。但是，经过长时间的讨论，跨源请求被允许了，但是任何新功能都需要服务器明确允许，以特殊的 header 表述。


## 三、CORS 请求类型
### 1. 简单请求（Simple Request）
简单请求也称为安全请求，如果一个请求满足下面这两个条件，则该请求是安全的：
 1. [安全的方法](https://fetch.spec.whatwg.org/#cors-safelisted-method)：GET，POST 或 HEAD
 2. [安全的 header](https://fetch.spec.whatwg.org/#cors-safelisted-request-header) —— 仅允许自定义下列 header：
    - `Accept`，
    - `Accept-Language`，
    - `Content-Language`，
    - `Content-Type` 的值为 `application/x-www-form-urlencoded`，`multipart/form-data` 或 `text/plain`。
除此之外，任何其他请求都被认为是“非安全”请求。
例如，具有 `PUT` 方法或 `API-Key` HTTP-header 的请求就不是安全请求。

- **应用**：可以使用 `<form>` 或 `<script>` 进行安全请求，而无需任何其他特殊方法。无预检，但响应头仍需包含 CORS 声明

### 2. 复杂请求（Preflighted Request）
- **二次握手协议**：OPTIONS + 实际请求构成原子操作
- **状态一致性**：预检响应与实际响应头必须一致

---


## 四、CORS 的协议实现

完成CORS实现示例图
![](https://mdn.github.io/shared-assets/images/diagrams/http/cors/preflight-correct.svg)

### 1. 预检请求（Preflight）
在 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS) 中，可以使用[OPTIONS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Methods/OPTIONS) 方法发起一个[预检请求](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)，以检测实际请求是否可以被服务器所接受，它是 HTTP/1.1 协议中定义的方法，用于从服务器获取更多信息，是[安全](https://developer.mozilla.org/zh-CN/docs/Glossary/Safe/HTTP)的方法。该方法不会对服务器资源产生影响

预检请求示例：
```http
OPTIONS /service.json HTTP/1.1
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH 
Access-Control-Request-Headers: Content-Type,API-Key
```

预检请求使用 `OPTIONS` 方法，它没有 `body`，但是有三个 `header`：

- 方法：`OPTIONS`。
- 路径 —— 与主请求完全相同：`/service.json`。
- 特殊跨源头：
    - `Origin` —— 来源。
    - `Access-Control-Request-Method` —— 请求方法。
    - `Access-Control-Request-Headers` —— 以逗号分隔的“非安全” header 列表。

>[!tip] 请注意：
预检请求发生在“幕后”，它对 `JavaScript` 不可见。
JavaScript 仅获取对主请求的响应，如果没有服务器许可，则获得一个 `error`。

#### [Origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Origin)
请求标头 **`Origin`** 表示了请求的[来源](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)（协议、主机、端口）。

>[!tip] 此处注意Origin和Referer区别
>Origin 参数的值为源站 URL(或者null)。它不包含任何路径信息，只是服务器名称。
>Refere 参数的值为源站 URL(或者null) + 路径信息
>```HTTP
Origin: http://javascript.info
Referer: http://javascript.info/some/url
>```



如果一个请求是跨源的，浏览器始终会向其添加 `Origin` header。浏览器自动注入请求来源（协议+域名+端口），**按道理来说不可伪造**。

> [!tip] Origin请求标头伪造
> 1. **非浏览器客户端**：使用 curl/Postman 等工具可任意设置Origin头
> 2. **浏览器扩展权限**：拥有 `webRequest` 权限的 Chrome 扩展可修改请求头：
> 3. **协议级劫持**：中间人攻击（MITM）中可修改 Origin 头：
> 4. **无头浏览器**：Selenium等自动化测试，网页爬虫工具也能伪造


 浏览器在这里扮演受被信任的中间人的角色：
1. 它确保发送的跨源请求带有正确的 `Origin`。
2. 它检查响应中的许可 `Access-Control-Allow-Origin`，如果存在，则允许 JavaScript 访问响应，否则将失败并报错。

带有服务器许可的响应示例
```http
200 OK
Contrent-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: https://javascript.info
Vary: Origin
```
- **Vary: Origin**：防止 CDN 缓存污染的关键头，参见[7.缓存投毒攻击]


#### [Access-Control-Request-Method](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Request-Method)
`Access-Control-Request-Method` 标头字段用于预检请求。其作用是，将实际请求所使用的 HTTP 方法告诉服务器。

#### [`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Request-Headers)
 `Access-Control-Request-Headers`标头字段用于预检请求。其作用是，将实际请求所携带的标头字段（通过 [`setRequestHeader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader "setRequestHeader()") 等设置的）告诉服务器。这个浏览器端标头将由互补的服务器端标头 [`Access-Control-Allow-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers) 回答。

- **触发条件**（符合任一）：
  - 非简单方法（PUT/DELETE 等）
  - 自定义头（X-Requested-By 等）
  - Content-Type 非简单值（application/json）
- **OPTIONS 探针**：浏览器发送预检包含：
```http
  Access-Control-Request-Method: DELETE
  Access-Control-Request-Headers: X-Custom-Header
```

- **服务端应答策略**：
```http
  Access-Control-Allow-Methods: GET, POST, DELETE
  Access-Control-Allow-Headers: X-Custom-Header
  Access-Control-Max-Age: 86400  // 预检缓存时间
```
### 2.预检响应（preflight response）
如果服务器同意处理请求，那么它会进行响应，此响应的状态码应该为 200，没有 body，具有 header：

响应展示了允许的Origin，Methods，Headers 还有 Max-Age

响应示例：
```http
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

#### Access-Control-Allow-Origin
`Access-Control-Allow-Origin` 响应标头指定了该响应的资源是否被允许与给定的[来源（origin）](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)共享。

```HTTP
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: <origin>
Access-Control-Allow-Origin: null
```

来源：
- `*`
	对于**不包含凭据**的请求，服务器会以“`*`”作为通配符，从而允许任意来源的请求代码都具有访问资源的权限。尝试使用通配符来响应包含凭据的请求[会导致错误](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS/Errors/CORSNotSupportingCredentials)。
- `<origin>`
	指定一个来源（只能指定一个）。如果服务器支持多个来源的客户端，其必须以与指定客户端匹配的来源来响应请求。
- `null`
	指定来源为“null”。

>[!tip]
>如果服务端指定了具体的单个源（作为允许列表的一部分，可能会根据请求的来源而动态改变）而非通配符“`*`”，那么响应标头中的 [`Vary`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Vary) 字段的值必须包含 `Origin`。这将告诉客户端：服务器对不同的 [`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Origin) 返回不同的内容。

![](https://zh.javascript.info/article/fetch-crossorigin/xhr-another-domain.svg)
#### [Access-Control-Allow-Methods](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Methods)
指明了实际请求所允许使用的一个或多个HTTP方法
#### [Access-Control-Allow-Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers)
指明了实际请求中允许携带的标头字段
#### [Access-Control-Allow-Max-Age](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Max-Age)
指定了 preflight 请求的结果能够被缓存多久

如果 `Access-Control-Max-Age` 带有一个表示秒的数字，则在给定的时间内，预检权限会被缓存。上面的响应将被缓存 86400 秒，也就是一天。在此时间范围内，后续请求将不会触发预检。假设它们符合缓存的配额，则将直接发送它们。
#### [Access-Control-Allow-Credentials](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Credentials)
告诉浏览器服务器是否允许 HTTP 跨源请求携带凭据。

**凭据**包括 cookie、[TLS](https://developer.mozilla.org/zh-CN/docs/Glossary/TLS) 客户端证书，或包含用户名和密码的认证标头。默认情况下，这些凭据不会在跨源请求中发送，因为这样做可能会使站点容易受到[跨站请求伪造](https://developer.mozilla.org/zh-CN/docs/Glossary/CSRF)攻击。

```http
Access-Control-Allow-Credentials: true
```

客户端可以通过以下两种方式之一在跨站请求中包含凭据：

- 使用 [`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch) 时，通过将 [`Request()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request "Request()") 构造函数中的 [`credentials`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request#credentials) 选项设置为 `"include"`。
- 使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 时，通过将 [`XMLHttpRequest.withCredentials`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials) 属性设置为 `true`。

如果客户端已请求时包含凭据：

- 如果请求是[预检请求](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)，那么在预检请求时不会包含凭据。如果服务器对预检请求的响应将 `Access-Control-Allow-Credentials` 标头设置为 `true`，则实际请求时将包含凭据；否则，浏览器将报告网络错误。
- 如果请求时未经过预检，则请求将包含凭据；如果服务器的响应没有将 `Access-Control-Allow-Credentials` 标头设置为 `true`，浏览器将报告网络错误。

>[!tip] 请注意：
对于具有凭据的请求，禁止 `Access-Control-Allow-XXX` 使用星号 `*`。如上所示，它必须有一个确切的Origin/Methods/Headers。这是另一项安全措施，以确保服务器真的知道它信任的发出此请求的是谁。

#### [Access-Control-Expose-Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Expose-Headers)
响应标头 **`Access-Control-Expose-Headers`** 允许服务器指示那些响应标头可以暴露给浏览器中运行的脚本，以响应跨源请求。

默认情况下，仅暴露[列入 CORS 白名单的请求标头](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS-safelisted_response_header)。如果想要让客户端可以访问到其他的标头，服务器必须将它们在 `Access-Control-Expose-Headers` 里面列出来。

### 3. 实际请求(actual request)
预检成功后，浏览器现在发出主请求。这里的过程与安全请求的过程相同。

主请求具有 `Origin` header（因为它是跨源的）：

```http
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
```
### 4.实际响应(actual response)

服务器不应该忘记在主响应中添加 `Access-Control-Allow-Origin`。成功的预检并不能免除此要求：
```http
Access-Control-Allow-Origin: https://javascript.info
```

然后，JavaScript 可以读取主服务器响应了。

---

## 五、安全问题

### 1. **通配符滥用漏洞**

开发者错误地使用通配符，或者正则表达式匹配不严格，导致允许了不应该允许的子域。攻击者可能构造恶意子域名，或者利用现有子域名的漏洞，发送跨域请求，窃取数据。

1. **漏洞成因**
	- **宽松的 CORS 配置** ：开发者使用通配符允许所有子域名（如 `Access-Control-Allow-Origin: *.example.com`），但未严格限制子域层级或域名归属。
	- **域名解析漏洞** ：某些 DNS 服务允许用户注册类似 `legit.example.com.attacker.net` 的子域名（需结合解析器缺陷），使攻击者伪装成合法子域。
	- **正则匹配缺陷** ：服务器使用不严谨的正则表达式（如 `.*\.example\.com`），可能匹配到非预期域名（如 `evil-example.com`）。

2. **攻击场景示例**
	- **恶意子域注册** ：攻击者注册 `attacker.example.com`（若允许用户自定义子域），托管恶意脚本发起跨域请求。
	- **公共子域滥用** ：利用目标已存在的公开子域（如 `blog.example.com`）的 XSS 漏洞，通过该子域发起跨域请求窃取主站数据。
	- **通配符层级逃逸** ：配置 `*.example.com` 时，部分服务器可能允许 `a.b.example.com`，导致子域权限过度扩散。

### 2. **反射型 Origin 漏洞**
反射型Origin漏洞是指攻击者通过某种方式让服务器反射或错误地返回Origin头，从而导致CORS配置错误。
```python
# 危险的后端实现
origin = request.headers.get('Origin')
response.headers['Access-Control-Allow-Origin'] = origin  # 无过滤直接反射
```
- **漏洞模式**：
  - 攻击者伪造 Origin 头：`Origin: https://attacker.com`
  - 服务端不加验证直接返回 `Access-Control-Allow-Origin: https://attacker.com`
- **利用条件**：需要诱导用户访问恶意页面发起跨域请求

### 3. **预检请求绕过漏洞**
预检请求绕过漏洞可能出现在服务器没有正确验证预检请求，或者错误地处理某些请求，导致攻击者可以绕过预检步骤直接发送实际请求。比如，服务器可能对OPTIONS请求返回200，但未正确设置CORS头，或者对某些HTTP方法或头没有限制，导致攻击者可以发送恶意请求。
```http
Access-Control-Allow-Methods: PUT, DELETE  # 允许危险方法
Access-Control-Allow-Headers: *  # 通配符允许任意请求头
```
- **攻击方式**：
  - 通过构造特殊请求头执行敏感操作
  ```javascript
  fetch('https://api.example.com/data', {
    method: 'PUT',
    headers: {'X-Dangerous-Header': 'payload'}
  })
  ```

### 4. **凭证泄漏漏洞**
```http
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://legit-site.com
```
- **跨站攻击**：若 `legit-site.com` 存在 XSS，攻击者可：
  ```javascript
  // 在合法站点的XSS中执行
  fetch('https://api.example.com/session', {credentials: 'include'})
    .then(res => res.text())
    .then(data => sendToAttacker(data))
  ```

### 5. **协议降级漏洞**
攻击者通过**中间人（MitM）** 干预通信协商过程，强制客户端与服务端使用**低安全性协议版本** （如 TLS 1.0 → SSL 3.0）或**弱加密算法** ，从而绕过高版本协议的安全机制，实现数据窃取或篡改。

```http
Access-Control-Allow-Origin: http://insecure.example.com  # 未强制HTTPS
```
- **中间人攻击**：通过 HTTP 协议劫持获取敏感数据

### 6. **Null Origin 攻击**

攻击者可能诱使用户打开一个本地HTML文件，该文件使用file://协议发起跨域请求。这时，请求的Origin头会是null。如果服务器允许null Origin，那么攻击者的脚本就能读取响应数据，导致数据泄露

1. **Null Origin 的成因**
	- **本地文件触发** ：当请求来自 `file://` 协议（如本地 HTML 文件），浏览器会将 `Origin` 设为 `null`。
	- **沙盒化 iframe** ：使用 且未指定 `allow-same-origin` 属性时，其内容源的 `Origin` 为 `null`。
	- **非常规重定向** ：某些跨协议重定向或非标准跳转可能导致 `Origin` 被置为 `null`。

2. **攻击原理**
	- **CORS 配置缺陷** ：若服务器响应头包含 `Access-Control-Allow-Origin: null`，攻击者可构造 `Origin: null` 的请求绕过同源限制。
	- **敏感数据泄露** ：通过诱导用户执行本地文件或嵌入恶意沙盒 iframe，攻击脚本可窃取跨域数据。

### 7. **缓存投毒攻击**
CDN通常会缓存响应，但如果不同来源的请求被缓存同一个响应，可能会导致安全问题。

1. **缓存机制的基本逻辑**
	当 CDN 或浏览器缓存响应时，默认**仅根据 URL 路径** 作为缓存键（Cache Key）。例如：

	- 请求 `GET /api/data` → 缓存键为 `/api/data`
	- 不同用户访问同一 URL 时，可能得到相同的缓存响应。

2. **CORS 场景下的致命问题**
	假设两个不同源的请求访问同一接口：

	- **请求A** （Origin: `https://siteA.com`）→ 响应头 `Access-Control-Allow-Origin: https://siteA.com`
	- **请求B** （Origin: `https://hacker.com`）→ 应拒绝跨域访问

3. **若无 `Vary: Origin`** ：
	- 请求A先到达服务器，响应被 CDN 缓存（缓存键为 `/api/data`）
	- 请求B命中缓存，CDN 返回请求A的响应（含 `Access-Control-Allow-Origin: https://siteA.com`）

4. **后果** ：
	浏览器发现响应头中的 `Access-Control-Allow-Origin` 包含请求B的 Origin（但实际是 siteA 的），错误允许跨域访问 → **安全漏洞** 。
	
5. **`Vary: Origin` 的解决方案**
	通过 `Vary: Origin` 声明：
	- 缓存键 = **URL路径 + `Origin` 请求头**
	- 不同 Origin 的请求会生成独立的缓存条目

6. **修正后的流程** ：
	- 请求A（Origin: siteA）→ 缓存键为 `/api/data + Origin:siteA` → 缓存响应A
	- 请求B（Origin: hacker）→ 缓存键为 `/api/data + Origin:hacker` → 未命中缓存，向源服务器请求 → 服务器返回拒绝跨域的响应（或无 CORS 头）

---

参考：
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS)
- [JSINFO](https://zh.javascript.info/fetch-crossorigin)
- [CORS漏洞挖掘](https://github.com/KRookieSec/WebSecurityStudy/blob/main/1x15%E6%BC%8F%E6%B4%9E%E5%8E%9F%E7%90%86%E2%80%94%E2%80%94cors%E8%B7%A8%E5%9F%9F%E8%B5%84%E6%BA%90%E5%85%B1%E4%BA%AB.md)
- [CORS跨域资源共享漏洞的复现、分析、利用及修复过程](https://cloud.tencent.com/developer/article/2225047)



