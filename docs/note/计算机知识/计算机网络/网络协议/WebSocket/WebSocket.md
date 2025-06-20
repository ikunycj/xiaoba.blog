## websocket简介
WebSocket 是一种在单个 TCP 连接上进行全双工（Full-Duplex）实时通信的网络协议。它于 2011 年成为标准（[RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455)），主要用于在客户端（通常是浏览器）与服务器之间建立持久化、实时的通信通道，避免了传统 HTTP 通信在需要实现双向数据传输时的复杂操作和较高开销。

对于需要连续数据交换的服务，例如网络游戏，实时交易系统等，WebSocket 尤其有用。

---
### 一个简单例子
要打开一个 WebSocket 连接，我们需要在 url 中使用特殊的协议 `ws` 创建 `new WebSocket`：
```js
let socket = new WebSocket("ws://javascript.info");
```

同样也有一个加密的 `wss://` 协议。类似于 WebSocket 中的 HTTPS。

>[!tip] 始终使用 `wss://`
`wss://` 协议不仅是被加密的，而且更可靠。
因为 `ws://` 数据不是加密的，对于任何中间人来说其数据都是可见的。并且，旧的代理服务器不了解 WebSocket，它们可能会因为看到“奇怪的” header 而中止连接。
另一方面，`wss://` 是基于 TLS 的 WebSocket，类似于 HTTPS 是基于 TLS 的 HTTP），传输安全层在发送方对数据进行了加密，在接收方进行解密。因此，数据包是通过代理加密传输的。它们看不到传输的里面的内容，且会让这些数据通过。

一旦 socket 被建立，我们就应该监听 socket 上的事件。一共有 4 个事件：

- **`open`** —— 连接已建立，
- **`message`** —— 接收到数据，
- **`error`** —— WebSocket 错误，
- **`close`** —— 连接已关闭。

……如果我们想发送一些东西，那么可以使用 `socket.send(data)`。

### WebSocket 与传统 HTTP 通信的差异
#### 1.1 轮询与长轮询的缺陷

在 WebSocket 出现之前，如果前端要接收服务器端的实时数据，往往需要使用**轮询（polling）** 或**长轮询（long polling）** 等方式 ：
1. **轮询 (Polling)**  
    客户端会隔固定时间段（如 2 秒、5 秒）发送一次 HTTP 请求，让服务器告知是否有新数据。如果有新数据则返回，没有则返回空结果或使用保持连接一段时间后再返回。这种做法导致较大的网络开销。
2. **长轮询 (Long Polling)**  
    客户端发起一次请求后，服务器会在有新数据时立即返回，否则会保持住这条连接，直到超时或有新数据返回后，客户端再继续发起下一次请求。尽管它比短轮询减轻了请求次数，但在大量用户和高并发情况下仍有一定的性能和延迟问题，并且管理连接比较麻烦。

#### 1.2 WebSocket 的优势

- [**全双工通信** ](https://www.cnblogs.com/kungfupanda/archive/2009/12/22/1629972.html)
    服务器和客户端都可以随时主动发送数据，不再是传统的“请求-响应”模式。
- **减少开销**  
    在建立连接后，不必像轮询那样不断发送 HTTP 请求头等信息。数据传输以更轻量的帧（**frame**）进行传递，通信效率更高。
- **实时性更强**  
    客户端和服务器端可以在任何时间点相互推送更新，极大地降低延迟。

---

### 2. WebSocket 的工作原理

#### 2.1 建立连接（握手过程）
WebSocket 的连接基于 HTTP(S) 进行一次“握手”（handshake）升级，流程大致如下：
![](https://zh.javascript.info/article/websocket/websocket-handshake.svg)


1. **客户端发起 HTTP 请求，带有特殊的头部**
    
    - 请求方法通常为 `GET /chat HTTP/1.1`
    - 关键 HTTP 头部示例：
```http
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```
- `Sec-WebSocket-Key` 是客户端生成的 Base64 编码的随机字符串，用于服务器端计算校验值。
- `Upgrade` 和 `Connection: Upgrade` 表示请求升级协议为 WebSocket。

>[!tip] 无法模拟 WebSocket 握手
我们不能使用 `XMLHttpRequest` 或 `fetch` 来进行这种 HTTP 请求，因为不允许 JavaScript 设置这些 header。

2. **服务器检查并响应握手请求**

    - 如果服务器支持 WebSocket，则返回 101 状态码（HTTP 1.1 规定的“Switching Protocols”），以及相应的头部示例：

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```
- `Sec-WebSocket-Accept` 是服务器根据客户端提供的 `Sec-WebSocket-Key` 通过拼接魔数、再做 SHA-1 计算并 Base64 编码后得到的字符串，用来验证双方的握手协议匹配。

3. **建立成功并升级连接**

    - 一旦握手成功，客户端和服务器的协议从 HTTP 切换为 WebSocket，后续数据通过持久化的 TCP 连接进行收发，不再通过传统 HTTP 协议。
    - 然后，使用 WebSocket 协议传输数据，我们很快就会看到它的结构（“**frames**”）。它根本不是 HTTP。
#### 2.2 数据传输

WebSocket 在传输数据时以**帧（frame）** 的形式发送。在帧层面上，数据有多种类型（如文本帧、二进制帧等），并且可以分片（fragment）发送。框架上可分为以下几类操作：

- **Text Frame（文本帧）**  
    常见于发送字符串数据（通常是 JSON 文本）。
- **Binary Frame（二进制帧）**  
    用于发送二进制数据（如图片、音频、文件等）。
- **Close Frame（关闭连接帧）**  
    表示关闭连接。
- **Ping/Pong Frame（心跳帧）**  
    用来检测连接的有效性。客户端和服务器都可以发送 `ping` 帧，另一方需要回复 `pong` 帧。

在通信过程中：

- 客户端或服务器随时可以发送消息帧（**文本帧/二进制帧**）。
- 如果一方长时间没有收到对方发送的帧，可以主动发送 `ping`，对方需要返回 `pong`，以确认连接依然有效。

#### 2.3 关闭连接

- 任何一方都可以随时发送 **Close Frame** 主动关闭连接，并在帧中携带可选的关闭原因或状态码。
- 另一方在收到 Close 帧后，应该回复一个 Close 帧，双方随后断开底层 TCP 连接。

---

### 3. WebSocket 的典型应用场景

4. **即时聊天和消息推送**  
    WebSocket 最常见的应用之一是聊天室或 IM（即时通讯），如网页端的聊天系统、多人协作平台等，都需要实时更新消息。
5. **在线游戏**  
    对实时要求较高的多人在线游戏（网页端）经常使用 WebSocket 传输玩家的操作或游戏状态。
6. **实时数据监控和可视化**  
    比如股票、外汇、加密货币行情的实时推送，大屏监控系统的实时数据更新，物联网设备状态实时上报等。
7. **协同编辑**  
    多人同时编辑文档、在线白板等，需要实时同步各自的修改操作。
8. **实时通知**  
    可以用来给用户推送诸如订单状态变化、系统通知等实时性要求较高的事件。

---

### 4. 使用 WebSocket 的注意事项

9. **跨域问题**
    - WebSocket 的跨域限制比 AJAX 要宽松一些，一般只要服务器配置支持并且握手成功，就可以跨域通信。但是仍需在服务器端对来源进行校验以确保安全。
10. **安全（WSS）**
    - 与 HTTPS 相似，WebSocket 也可以在 TLS 上运行，即 `wss://`，这样可以加密数据，避免明文传输被窃听或篡改。
11. **连接数限制**
    - 大多数浏览器对每个域名的 WebSocket 连接数有一定限制，虽然通常足以应对大部分应用场景，但还是需要留意浏览器兼容性和限制。
12. **心跳机制**
    - 在真实生产环境中，应定期发送 `ping`/`pong` 帧，以确保连接存活并及时发现断开。
13. **断线重连**
    - 在移动端网络不稳定或环境变化时，WebSocket 可能意外断开，需要在客户端实现自动重连策略。
14. **后端扩展和负载均衡**
    - 对高并发应用来说，后端常需要分布式部署、负载均衡、消息队列等方案确保实时性和可扩展性。

---

### 5. 前后端简单示例

以下是一个简化的前端示例，展示了如何在浏览器中通过 JavaScript 使用 WebSocket：

```javascript
// 创建 WebSocket 连接
const socket = new WebSocket('wss://example.com/socket');

// 连接打开时触发
socket.addEventListener('open', (event) => {
  console.log('WebSocket 连接已打开');
  // 向服务器发送消息
  socket.send('Hello Server!');
});

// 监听服务器消息
socket.addEventListener('message', (event) => {
  console.log('收到服务器消息:', event.data);
});

// 连接关闭时触发
socket.addEventListener('close', (event) => {
  console.log('WebSocket 连接已关闭:', event);
});

// 错误处理
socket.addEventListener('error', (event) => {
  console.error('WebSocket 错误:', event);
});
```

#### 服务器端（Node.js + ws 模块）示例

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('WebSocket 服务器已启动，端口 8080');
});

wss.on('connection', (ws) => {
  console.log('新的客户端连接');

  // 监听客户端消息
  ws.on('message', (message) => {
    console.log('收到客户端消息:', message);
    // 可以将消息再广播给所有连接的客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`服务器收到: ${message}`);
      }
    });
  });

  // 监听断开连接
  ws.on('close', () => {
    console.log('客户端断开连接');
  });

  // 可以主动向客户端发送消息
  ws.send('欢迎连接到 WebSocket 服务器');
});
```

---

### 6. 与其它实时方案的比较

15. **Server-Sent Events (SSE)**
    - SSE 是单向的，只有服务器向客户端推送，客户端不能主动发消息给服务器。适用于简单的数据推送，如实时通知、监控数据等。如果需要双向通信，SSE 并不合适。
16. **Socket.IO**
    - 虽然基于 WebSocket，但在浏览器兼容性、断线重连、事件机制等方面有更丰富的封装和fallback（如轮询等）。适合需要快速集成实时功能且不希望处理底层细节的场景。
17. **HTTP/2、HTTP/3 的流式特性**
    - 新版本的 HTTP 在多路复用、流式数据传输等方面有一些改进，不过与 WebSocket 的全双工特性和轻量帧处理相比，还是侧重点不同。对真正需要双向、低延迟、高频通信的场景，WebSocket 依然是常见选择。

---

### 7. 总结

WebSocket 通过一次 HTTP 协议握手后升级成持久双工连接，极大地简化了双向实时通信的复杂度，减少了不必要的网络开销，常被用于各种需要实时性和高交互的应用场景。开发者在使用 WebSocket 时需要关注安全（加密、权限验证）、连接管理（心跳、重连）以及后端扩展与负载均衡等方面，以确保系统在生产环境中的稳定与可靠。