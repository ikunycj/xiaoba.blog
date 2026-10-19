# SSE 是什么以及怎么用
**摘要**：SSE（Server-Sent Events）是基于 HTTP 的单向事件流（`text/event-stream`），浏览器通过 `EventSource` 接收并自动重连，可用 `id`/`Last-Event-ID` 做续传。适合通知、日志、进度、LLM 流式输出。生产落地关键在代理缓冲与超时、心跳、CORS/鉴权与监控指标

## SSE 定义与协议细节
SSE（Server-Sent Events）是一种“服务器 → 客户端”的**单向推送**机制：浏览器创建 `EventSource`，与 HTTP 服务器建立**持久连接**，服务器以 `text/event-stream` 格式持续写入事件；连接一直保持到调用 `EventSource.close()` 或网络断开。与 WebSocket 不同，SSE 的消息只能由服务端发送到客户端，更适合“只需要下行流”的实时场景（例如 feed、通知、仪表盘、流式结果）

### 事件流格式与 MIME type
SSE 的响应必须使用 `Content-Type: text/event-stream`，每个事件是一个由多行字段组成的文本块，并以**空行**（两个换行）结束；事件流文本应使用 UTF-8 编码。

常见字段包括：
- `event`（事件名）
- `data`（数据，可多行）
- `id`（事件 ID，用于续传）
- `retry`（客户端重连等待毫秒数）
- 以冒号 `:` 开头的行是注释，会被忽略，可用于保活（心跳）。

一个典型事件块（示例）：
```text
id: 123
event: update
data: {"status":"running","pct":42}

```

关于 `text/event-stream` 的注册/约束，WHATWG（HTML 标准的 IANA considerations）描述了该类型无必需参数，并允许（但“无实际意义”）的 `charset=utf-8` 参数。

### 与 HTTP/1.1、HTTP/2、HTTP/3 的兼容性
SSE 本质是**普通 HTTP 响应的流式传输**，因此原则上可运行在 HTTP/1.1 / HTTP/2 / HTTP/3 之上；工程差异主要来自“连接/流”的并发上限、代理对流式响应的缓冲与超时策略。

关键工程点：
- **HTTP/1.1**：每个 `EventSource` 通常占用一个 TCP 连接，浏览器对同一域名的并发连接数量有较低限制（MDN 提到非 HTTP/2 场景下常见限制为 `6`），多标签页/多通道容易触顶。
- **HTTP/2**：同一 TCP 连接上可复用多个 HTTP 流（stream），显著缓解“多连接上限”问题；MDN 提到 HTTP/2 下最大并发流由客户端与服务器协商（默认 100）。
- **HTTP/3**：同样是多流复用（基于 QUIC），在代理/网关层面可把 SSE 看作“长期存在且持续有数据活动的 stream”；Envoy 文档明确“stream 是 HTTP/2 与 HTTP/3 的概念”，并将 HTTP/1 请求映射为内部 stream 来统一处理超时策略。

### CORS、凭据与认证载体限制
`EventSource` 支持跨源请求，但需要正确的 CORS 配置；其 `withCredentials` 属性表示是否在跨源请求中携带凭据（cookie 等），默认值为 `false`。

当你需要**跨源 + 凭据**时，必须满足 CORS 的基本约束：  
- `Access-Control-Allow-Origin` 不能是 `*`（通配符）而必须是具体源；  

此外，MDN 也指出：默认情况下跨源请求不发送凭据，一个重要原因是避免站点更容易受到 CSRF 风险影响。

**重要限制（产品/工程经常踩坑）**：`EventSource` API 仅能发起 GET 请求，不能用 POST。
这意味着你无法用“POST body 携带 token/参数”的方式建立 SSE；常见做法是：  
- 使用同站 cookie（推荐，配合 SameSite/CSRF 策略）；  
- 或使用**短期有效的签名 URL**（避免长期 token 暴露在 URL）；  
- 或使用 polyfill/自建 fetch streaming（牺牲原生自动重连能力）

### 自动重连、`retry`、心跳与断线续传
SSE 的一大优势是浏览器端的自动重连：默认连接断开会重试；服务端可用 `retry:` 指定重连等待时间（毫秒）。web.dev 的示例说明默认大约 3 秒尝试重连，且可用 `retry:` 覆盖。

断线续传依赖两件事：
- 服务端为事件设置 `id:`；浏览器会把它记录为“最后事件 ID”。
- 连接重建时，浏览器会在 HTTP 请求里带上 `Last-Event-ID` 请求头，把最后事件 ID 告诉服务端。WHATWG 标准专门定义了 `Last-Event-ID` 头用于重建连接时上报“最后事件 ID”。

**心跳（保活）**：如果业务事件可能很久不发，建议定期发送注释行（如 `: ping\n\n`）或业务层 ping 事件，以避免中间代理/负载均衡因“无数据活动”而关闭连接。MDN 指出注释行可用于防止连接超时。

## SSE 与 WebSocket、长轮询、HTTP/2/3 Server Push 的对比

| 方案                                       | 通信方向                          | 典型用途                    | 延迟体验       | 资源占用与扩展                                                                                 | 工程复杂度                   | 安全关注点（认证/授权/CSRF）                                    |
| ---------------------------------------- | ----------------------------- | ----------------------- | ---------- | --------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------- |
| **SSE (EventSource)**                    | 单向（服务端→客户端                    | 通知/推送、进度、日志、行情、LLM 流式文本 | 低（流式）      | 每客户端一个长期连接/stream；HTTP/1.1 有并发连接上限，HTTP/2 可多流复用（默认 100 streams）                         | 中：主要是代理缓冲/超时、心跳、续传与去重   | 跨源凭据要严格 CORS；cookie 场景注意 CSRF/数据泄露                   |
| **WebSocket**                            | 双向（全双工）                       | 聊天、协作编辑、游戏、双向控制、低延迟交互   | 很低         | 每连接一个长期会话；通常需专门的 WS 处理与代理配置；在 HTTP/2/3 上需要 RFC 8441/9220 扩展 CONNECT 机制                  | 高：握手/心跳/断线重连/分片/背压/网关配置 | 需要 wss/TLS；校验 Origin、鉴权与权限；OWASP 有专门安全建议             |
| **长轮询 (Long Polling)**                   | 近似单向（服务器“等到有数据再响应”，客户端反复发起请求） | 旧环境兼容、降级兜底              | 中：取决于超时与重试 | 每条消息往往是“完整 HTTP 请求+响应”，带来明显 header 开销；RFC 6202 指出 header 可能占比很高                         | 中：实现不难，但要避免惊群与空转        | 与普通 HTTP 相同：cookie/CSRF、鉴权、重放等；一般不如 SSE/WS 优雅        |
| **HTTP/2/3 Server Push（Push Promise 等）** | 服务器推“资源响应”（不是事件流）             | 提前推 CSS/JS 等资源（历史用途）    | 不适合作为实时通道  | 浏览器侧已大幅退役：Chrome 禁用/移除 HTTP/2 Server Push；且 Chrome 说明很多 HTTP/3 客户端/服务端并未实现 Push，实践收益不稳定 | 高且不可控（缓存/命中难预判）         | 与实时推送场景不匹配；更多用于性能优化的历史方案（替代是 103 Early Hints、preload |

补充说明两点：
1) **WebSocket 与 HTTP/2/3**：传统 WebSocket 握手依赖 HTTP/1.1 的 Upgrade 机制；MDN 指出 Upgrade 属于 HTTP/1.1，HTTP/2 明确禁止该机制，因此需要 RFC 8441（HTTP/2）与 RFC 9220（HTTP/3）来“在单个 HTTP/2/3 stream 上运行 WebSocket 协议”。

2) **HTTP/3 仍在规范层定义了 Server Push**（RFC 9114 第 4.6 节），但 Chrome 官方博客强调：Push 在很多 HTTP/3 服务端/客户端未实现，在真实网络里收益难保证，已被广泛淘汰。

## 后端实现与部署要点

### 主流后端实现与库概览

**Node.js（Express/Fastify）**

- 轻量自写：直接 `res.write()` 写事件块、断开时清理连接（最可控）。可结合 `X-Accel-Buffering: no` 让 Nginx 不缓冲。MDN 的 SSE 示例也在服务端设置该头来避免代理缓冲。
- Express 生态：`express-sse` 提供快速封装（更快上手，但广播、续传、背压、鉴权等仍需你设计）。
- Fastify 生态：`fastify-sse-v2` 等插件提供 SSE 输出通道（适合 Fastify 项目统一插件风格）。

**Python（Flask/Quart/FastAPI）**
- FastAPI/Starlette：推荐用 ASGI 的流式能力；`sse-starlette` 是面向 Starlette/FastAPI 的“生产级 SSE 实现”，提供 `EventSourceResponse`、`ping` 心跳、`ServerSentEvent(comment=...)`、`retry` 等能力。
- Flask（WSGI）也能做 streaming，但高并发下的连接管理与部署（gunicorn worker、gevent 等）复杂度更高；若目标是大量长连接，优先 ASGI（FastAPI/Quart）。  

**Go（`net/http`）**
- 标准库足够：关键是使用 `http.Flusher` 在每次写事件后 `Flush()`，并注意 ResponseWriter wrapper 可能不支持 `Flusher`；同时即便 Flush 了，如果客户端在 HTTP 代理后，数据仍可能被代理缓冲直到响应结束（这也是为什么必须配置反向代理“不缓冲 SSE”）。

**Java（Spring MVC）**

- Spring MVC 提供 `SseEmitter`，支持设置超时、发送事件并保持响应打开；超时行为与底层容器/配置相关。

### 反向代理与负载均衡部署注意

#### Nginx 关键点
SSE 最常见的线上故障不是“代码写错”，而是“代理缓冲 + 超时关闭”。
1. **关闭响应缓冲**：Nginx `proxy_buffering` 默认是 `on`，会把上游响应尽量读到 buffer/临时文件后再转发，导致 SSE 无法实时到达。应对 SSE location 设置 `proxy_buffering off;`。

2. **合理设置 `proxy_read_timeout`**：默认 `60s`，并且该超时是“两次读取之间的间隔”，如果上游在这段时间内没有发送任何内容，连接会被关闭；这就是为什么你要么发心跳，要么把超时加大。

3. **可用 `X-Accel-Buffering: no` 覆盖**：Nginx 明确支持通过响应头 `X-Accel-Buffering: no` 启用/禁用缓冲（除非被 `proxy_ignore_headers` 禁用）。很多团队会选择在应用层对 SSE 路由加该头，避免影响其他路由。

4. **HTTP/1.1 chunked**：Nginx 支持 `chunked_transfer_encoding on|off`，默认 `on`；一般 SSE/流式返回需要保持默认开启（除非你在对接不支持 chunked 的遗留客户端）。

#### Envoy 关键点

Envoy（以及基于 Envoy 的网关/服务网格）对 streaming 的默认超时非常容易“误杀” SSE：

- **Route `timeout` 默认 15 秒**，且官方明确指出该默认值“不兼容永不结束的 streaming responses，需要禁用”；并建议对 streaming API 使用 `stream_idle_timeout` 体系。
- `stream_idle_timeout` 默认 5 分钟：如果 5 分钟没有上下游活动就会被关闭，所以必须发心跳（注释行 ping）或调整该值。

### 规模化设计建议（工程/产品可执行）

当你从“单机 Demo”走向“多副本 + 负载均衡”时，SSE 的关键设计点变成了：
- **事件模型**：是“状态快照”（比如进度百分比）还是“不可丢事件”（比如审计日志）。前者可容忍丢包，重连后拉一把最新状态；后者必须做持久化/可重放。  
- **续传契约**：一旦使用 `id`/`Last-Event-ID`，就要规定 id 的单调性与作用域（用户级 / topic 级），并提供“Last-Event-ID 太旧已被淘汰”的行为（例如退化为全量快照）。标准只定义了 header 的存在与基本语义，是否能恢复取决于你的服务端存储与策略。
- **连接生命周期**：代理/网关超时（Nginx 60s、Envoy 15s route timeout/5m stream idle）决定你必须发心跳或调整超时。

## 可复制工程示例与测试命令

下面给出 3 套可直接运行的最小可用示例，均包含：服务端 SSE、浏览器 `EventSource`、以及 `fetch` 长轮询降级（fallback）。

### 示例一：Node.js（Express）SSE + 长轮询降级

**运行环境与依赖**：Node.js 18+；`npm i express`（可选：生产建议自行接入日志、鉴权、限流）

**server.js**
```js
// Node.js 18+
// npm i express
import express from "express";

const app = express();
app.use(express.json());

let nextId = 1;
// 简单 ring buffer：用于 Last-Event-ID 续传（生产应考虑持久化/分片）
const RING_SIZE = 1000;
const ring = []; // [{id, event, data, ts}]

const clients = new Set(); // 保存 SSE 响应对象

function sseFormat({ id, event, data, retry }) {
  // data 可以是字符串或对象
  const lines = [];
  if (retry != null) lines.push(`retry: ${retry}`);
  if (id != null) lines.push(`id: ${id}`);
  if (event) lines.push(`event: ${event}`);

  const payload = typeof data === "string" ? data : JSON.stringify(data);
  // SSE 支持多行 data:，每行都要加前缀
  for (const l of payload.split("\n")) lines.push(`data: ${l}`);
  lines.push(""); // 空行：结束事件块
  return lines.join("\n") + "\n";
}

function publish(event, data) {
  const e = { id: String(nextId++), event, data, ts: Date.now() };
  ring.push(e);
  if (ring.length > RING_SIZE) ring.shift();

  const msg = sseFormat(e);
  for (const res of clients) {
    res.write(msg);
  }
  return e;
}

// SSE endpoint
app.get("/sse", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  // HTTP/1.1 下通常建议 keep-alive；HTTP/2 会忽略 Connection 头
  res.setHeader("Connection", "keep-alive");
  // 让 Nginx 可按响应头禁用缓冲（如未被 proxy_ignore_headers 禁用）
  res.setHeader("X-Accel-Buffering", "no");

  res.flushHeaders?.(); // 立即发出 headers（Node 原生支持）

  // 建议下发 retry（ms）
  res.write("retry: 3000\n\n");

  // 断线续传：读取 Last-Event-ID（浏览器重连会带）
  const lastId = req.header("Last-Event-ID");
  if (lastId) {
    for (const e of ring) {
      if (Number(e.id) > Number(lastId)) {
        res.write(sseFormat(e));
      }
    }
  }

  // 注册 client
  clients.add(res);

  // 心跳：注释行（客户端忽略，但可防止代理“无数据超时”）
  const hb = setInterval(() => {
    res.write(`: ping ${Date.now()}\n\n`);
  }, 15000);

  req.on("close", () => {
    clearInterval(hb);
    clients.delete(res);
  });
});

// 长轮询 fallback：/poll?since=<id>
app.get("/poll", async (req, res) => {
  const since = Number(req.query.since || 0);

  // 若已有新事件，直接返回
  const fresh = ring.filter((e) => Number(e.id) > since);
  if (fresh.length) return res.json({ ok: true, events: fresh });

  // 否则等待最多 25s，有事件就返回；这里用简单轮询，生产建议用 pub/sub
  const deadline = Date.now() + 25000;
  while (Date.now() < deadline) {
    const nowFresh = ring.filter((e) => Number(e.id) > since);
    if (nowFresh.length) return res.json({ ok: true, events: nowFresh });
    await new Promise((r) => setTimeout(r, 200));
  }
  return res.json({ ok: true, events: [] });
});

// demo：每 2 秒推一次
setInterval(() => {
  publish("update", { msg: "tick", ts: new Date().toISOString() });
}, 2000);

app.listen(3000, () => console.log("SSE server on http://localhost:3000"));
```

**浏览器端（index.html）**
```html
<!doctype html>
<html>
  <body>
    <h3>SSE Demo</h3>
    <pre id="log"></pre>

    <script>
      const log = (s) => (document.getElementById("log").textContent += s + "\n");
      let lastId = 0;
      let usePolling = false;

      function startSSE() {
        const es = new EventSource("/sse"); // 如需跨源 cookie，可 new EventSource(url, { withCredentials: true })
        es.onopen = () => log("[sse] open");
        es.onerror = () => {
          log("[sse] error -> fallback to long polling");
          es.close();
          usePolling = true;
          startLongPolling();
        };
        es.addEventListener("update", (e) => {
          lastId = Number(e.lastEventId || lastId);
          log(`[sse] id=${e.lastEventId} data=${e.data}`);
        });
      }

      async function startLongPolling() {
        while (usePolling) {
          try {
            const r = await fetch(`/poll?since=${lastId}`, { cache: "no-store" });
            const j = await r.json();
            for (const e of j.events) {
              lastId = Math.max(lastId, Number(e.id));
              log(`[poll] id=${e.id} data=${JSON.stringify(e.data)}`);
            }
          } catch (err) {
            log("[poll] error: " + err);
          }
          await new Promise((r) => setTimeout(r, 500)); // 简单退避
        }
      }

      // 优先 SSE
      if ("EventSource" in window) startSSE();
      else {
        usePolling = true;
        startLongPolling();
      }
    </script>
  </body>
</html>
```

**调试与压测命令**
```bash
# 直接看流（-N 禁用 curl 缓冲）
curl -N http://localhost:3000/sse

# 简单压测“建立连接能力”（ab 对永不结束的流不太友好，建议配合 -t 短时间）
ab -c 50 -t 10 -k http://localhost:3000/sse
```

> 为什么要关 Nginx 缓冲与设置 read timeout：Nginx `proxy_buffering` 默认开启、`proxy_read_timeout` 默认 60s 且“两个读操作之间没数据就断开”；不处理会出现“事件不实时/断开”。

### 示例二：Python（FastAPI + sse-starlette）SSE + fallback
**运行环境与依赖**：Python 3.10+；`pip install fastapi uvicorn sse-starlette`

`sse-starlette` 提供 `EventSourceResponse`、`ServerSentEvent`（含 `id`/`retry`/`comment`）、以及内置 `ping` 机制，非常适合生产落地。

**app.py**
```python
# Python 3.10+
# pip install fastapi uvicorn sse-starlette

import asyncio
from fastapi import FastAPI, Request
from sse_starlette import EventSourceResponse, ServerSentEvent

app = FastAPI()

next_id = 1
RING_SIZE = 1000
ring = []  # [{"id": str, "event": str, "data": dict}]

subscribers = set()  # set[asyncio.Queue]

def publish(event: str, data: dict):
    global next_id
    e = {"id": str(next_id), "event": event, "data": data}
    next_id += 1
    ring.append(e)
    if len(ring) > RING_SIZE:
        ring.pop(0)

    for q in list(subscribers):
        try:
            q.put_nowait(e)
        except asyncio.QueueFull:
            # 生产：可统计丢弃、或断开慢客户端
            pass

@app.on_event("startup")
async def startup():
    async def ticker():
        while True:
            publish("update", {"msg": "tick", "ts": asyncio.get_event_loop().time()})
            await asyncio.sleep(2)
    asyncio.create_task(ticker())

@app.get("/sse")
async def sse(request: Request):
    last_id = request.headers.get("last-event-id")
    q = asyncio.Queue(maxsize=100)
    subscribers.add(q)

    async def gen():
        try:
            # 1) 断线续传：先补发 ring 中 last_id 之后的事件
            if last_id:
                for e in ring:
                    if int(e["id"]) > int(last_id):
                        yield ServerSentEvent(
                            id=e["id"], event=e["event"], data=e["data"]
                        )

            # 2) 再持续推新事件
            while True:
                if await request.is_disconnected():
                    break
                e = await q.get()
                yield ServerSentEvent(id=e["id"], event=e["event"], data=e["data"])
        finally:
            subscribers.discard(q)

    # ping=15：每 15 秒发一次 ping（注释行），可用于保活
    return EventSourceResponse(
        gen(),
        ping=15,
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )

@app.get("/poll")
async def poll(since: int = 0):
    fresh = [e for e in ring if int(e["id"]) > since]
    return {"ok": True, "events": fresh}
```

运行：

```bash
uvicorn app:app --reload --port 8000
curl -N http://localhost:8000/sse
```

### 示例三：Go（net/http）SSE + fallback

**运行环境**：Go 1.20+（标准库即可）

Go 标准库的关键点是 `http.Flusher`：它允许把缓冲数据 flush 到客户端；但文档也提醒“如果客户端在 HTTP 代理之后，即便 Flush 了也可能被代理缓冲直到响应结束”，因此反向代理配置仍然是决定性因素。citeturn8view1turn14view2

**main.go**

```go
// Go 1.20+
// go run main.go

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"
)

type Event struct {
	ID    int64       `json:"id"`
	Event string      `json:"event"`
	Data  interface{} `json:"data"`
	TS    int64       `json:"ts"`
}

var (
	mu      sync.Mutex
	nextID  int64 = 1
	ring          = make([]Event, 0, 1000)
	clients       = map[chan Event]struct{}{}
)

func sseWrite(w http.ResponseWriter, e Event) {
	// SSE 格式：id/event/data + 空行
	fmt.Fprintf(w, "id: %d\n", e.ID)
	fmt.Fprintf(w, "event: %s\n", e.Event)
	b, _ := json.Marshal(e.Data)
	for _, line := range splitLines(string(b)) {
		fmt.Fprintf(w, "data: %s\n", line)
	}
	fmt.Fprint(w, "\n")
}

func splitLines(s string) []string {
	// 简化：JSON 一般无换行；此处兼容多行
	out := []string{""}
	for _, ch := range s {
		if ch == '\n' {
			out = append(out, "")
		} else {
			out[len(out)-1] += string(ch)
		}
	}
	return out
}

func publish(event string, data interface{}) Event {
	mu.Lock()
	e := Event{ID: nextID, Event: event, Data: data, TS: time.Now().UnixMilli()}
	nextID++
	ring = append(ring, e)
	if len(ring) > cap(ring) {
		ring = ring[1:]
	}
	for ch := range clients {
		select {
		case ch <- e:
		default:
			// 慢客户端：丢弃或断开（示例丢弃）
		}
	}
	mu.Unlock()
	return e
}

func sseHandler(w http.ResponseWriter, r *http.Request) {
	// 可靠 headers
	w.Header().Set("Content-Type", "text/event-stream; charset=utf-8")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("X-Accel-Buffering", "no")

	// retry（ms）
	fmt.Fprint(w, "retry: 3000\n\n")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}
	flusher.Flush()

	// 注册 client
	ch := make(chan Event, 100)
	mu.Lock()
	clients[ch] = struct{}{}

	// 断线续传：Last-Event-ID
	last := r.Header.Get("Last-Event-ID")
	if last != "" {
		if lastID, err := strconv.ParseInt(last, 10, 64); err == nil {
			for _, e := range ring {
				if e.ID > lastID {
					sseWrite(w, e)
				}
			}
		}
	}
	mu.Unlock()
	flusher.Flush()

	// 心跳
	hb := time.NewTicker(15 * time.Second)
	defer hb.Stop()

	ctx := r.Context()
	defer func() {
		mu.Lock()
		delete(clients, ch)
		close(ch)
		mu.Unlock()
	}()

	for {
		select {
		case <-ctx.Done():
			return
		case <-hb.C:
			// 注释行心跳
			fmt.Fprintf(w, ": ping %d\n\n", time.Now().UnixMilli())
			flusher.Flush()
		case e := <-ch:
			sseWrite(w, e)
			flusher.Flush()
		}
	}
}

func pollHandler(w http.ResponseWriter, r *http.Request) {
	sinceStr := r.URL.Query().Get("since")
	since, _ := strconv.ParseInt(sinceStr, 10, 64)

	mu.Lock()
	fresh := []Event{}
	for _, e := range ring {
		if e.ID > since {
			fresh = append(fresh, e)
		}
	}
	mu.Unlock()

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"ok":     true,
		"events": fresh,
	})
}

func main() {
	http.HandleFunc("/sse", sseHandler)
	http.HandleFunc("/poll", pollHandler)

	go func() {
		for {
			publish("update", map[string]interface{}{"msg": "tick", "ts": time.Now().Format(time.RFC3339Nano)})
			time.Sleep(2 * time.Second)
		}
	}()

	log.Println("Go SSE on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

测试：

```bash
curl -N http://localhost:8080/sse
curl "http://localhost:8080/poll?since=10"
ab -c 50 -t 10 http://localhost:8080/sse
```

## 常见问题、调试技巧、安全与监控

### 常见故障与定位
**事件不实时 / “攒一坨才到”**  
优先怀疑代理/中间层缓冲：Nginx `proxy_buffering` 默认开启，需对 SSE 路由关闭；也可以依赖 `X-Accel-Buffering: no` 由应用控制。

**连接会在固定时间后断开**  
- Nginx：`proxy_read_timeout` 默认 60s，“两次读取之间无数据就断开”，因此应提高该值或保持定期心跳。
- Envoy：route `timeout` 默认 15s，不兼容 streaming responses，必须禁用；同时 `stream_idle_timeout` 默认 5 分钟，需心跳或调整。

**事件丢失/重复**  
`EventSource` 自动重连可能导致“客户端收到重复事件”或“断线期间丢失事件”。正确做法是：
- 服务端给每个事件设置单调 `id`，客户端记录 `lastEventId`，并让服务端在重连时读取 `Last-Event-ID` 补发缺失事件。
- 客户端逻辑应**幂等应用事件**（例如按 id 去重、按版本覆盖状态），把“重复交付”当作可能事件而不是异常。

**心跳实现**  
使用注释行 `: ...` 作为 ping：MDN 明确指出注释行可用于防止连接超时。citeturn2view0  
在代理侧，Envoy 的 `stream_idle_timeout` 是“无上下游活动”计时，因此心跳能被视作活动以避免 idle 触发。

### 安全建议（认证/授权/CSRF）
1. **优先用 TLS（HTTPS）**：SSE 承载的是长期连接与可能的敏感实时数据，必须在传输层加密（同 WebSocket 的 wss 逻辑一致）。  

2. **跨源要最小授权**：`EventSource.withCredentials` 默认 false；跨源+凭据场景必须使用具体 `Access-Control-Allow-Origin` 而不是 `*`，并设置 `Access-Control-Allow-Credentials: true`。

3. **避免敏感 token 放 URL**：因为 SSE 只能 GET，很多人把 token 放 query string。建议改为：  
- 同站 cookie + 合理 SameSite 策略；  
- 或短期签名 URL（比如 1~5 分钟过期、一次性或可撤销）。  
MDN 也指出，跨源凭据默认不发送的一个原因是降低 CSRF 风险。

3. **WebSocket 对比提醒**：如果你同时使用 WS 与 SSE，WS 的安全面更大（双向、更多中间件/代理特殊处理）；OWASP 提供了专门的 WebSocket 安全清单（Origin 校验、只支持 RFC6455、鉴权/授权、压缩相关风险等）。

### 监控指标（建议在产品/工程看板固化）
建议至少采集：
- 活跃 SSE 连接数（按路由/租户/用户分组）  
- 断线与重连率（可从客户端 error/open 事件上报）  
- 事件端到端延迟（服务端生成时间戳 vs 客户端接收时间）  
- 心跳间隔与“无活动断开”占比（定位代理超时）
- 带宽与写入速率（bytes/s；有助于评估代理缓冲、慢客户端）  
- 续传命中率：`Last-Event-ID` 存在比例、补发条数分布（用于评估 ring buffer/持久化策略）

## 实施路线图与风险评估
### 短期落地
目标：把 SSE 从“能跑”变成“可用且可观测”。
- 选定一个典型业务场景（如任务进度/通知/LLM 流式输出），用 SSE 替换轮询或作为新增通道。
- 在网关/代理侧完成基线配置：Nginx 关闭缓冲、提高 `proxy_read_timeout`；或 Envoy 禁用 route `timeout`（15s 默认不兼容 streaming）并设置合适 `stream_idle_timeout`。
- 服务端加入心跳（注释行）与基础指标（连接数、每分钟断开数）。

主要风险：仍然被中间层缓冲/超时误杀；或客户端网络抖动导致重连风暴（需 `retry`/退避策略）。

### 中期规划
目标：支持多实例、可续传、可审计。
- 定义事件契约：事件类型、字段版本、`id` 生成规则、最大补发窗口（ring buffer 或持久化队列）。
- 引入可重放存储（至少按 topic/用户维护最近 N 条；对“不可丢事件”建议 MQ/日志系统）。  
- 制定降级策略：SSE 不可用时自动切长轮询（示例已给），并监控降级比例。

主要风险：续传语义不清导致重复/丢失；多实例下“事件从哪个实例发”需要 pub/sub 或集中事件源。

### 长期演进
目标：把“实时推送”能力产品化。
- 支持多租户/大规模连接：配合 HTTP/2/3、多流复用与连接上限管理（MDN 提到 HTTP/2 下并发流协商默认 100）。
- 形成统一实时通道策略：SSE（下行流）+ WebSocket（需要双向时）并存，按业务选择，避免一刀切。
- 若涉及浏览器性能优化：不要把 HTTP/2 Server Push 当作实时推送方案；Chrome 已移除/禁用该能力，并建议用 103 Early Hints、preload 等替代。

主要风险：把 SSE 当成“消息队列”使用导致不可控（缺乏持久化、回溯、消费确认）；以及跨源凭据配置不当引发数据泄露或 CSRF 风险。

## 参考链接
MDN：使用服务器发送事件（SSE）
https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events

MDN：EventSource API
https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource

WHATWG HTML：Server-sent events（含 Last-Event-ID 头）
https://html.spec.whatwg.org/multipage/server-sent-events.html

web.dev（中文）：使用服务器发送的事件流式传输更新（含 retry/id/Last-Event-ID）
https://web.dev/articles/eventsource-basics?hl=zh-cn

MDN：CORS（中文）
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS

MDN：Access-Control-Allow-Credentials（中文）
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Credentials

Nginx 官方文档：ngx_http_proxy_module（proxy_buffering/proxy_read_timeout/X-Accel-Buffering）
https://nginx.org/en/docs/http/ngx_http_proxy_module.html

Nginx 官方文档：chunked_transfer_encoding 指令
https://nginx.org/en/docs/http/ngx_http_core_module.html

Envoy 官方文档：timeouts（route timeout 默认 15s 不适合 streaming；stream_idle_timeout 默认 5m）
https://www.envoyproxy.io/docs/envoy/latest/faq/configuration/timeouts

Chrome 官方博客：Remove HTTP/2 Server Push from Chrome
https://developer.chrome.com/blog/removing-push

RFC 8441：Bootstrapping WebSockets with HTTP/2
https://www.rfc-editor.org/rfc/rfc8441.html

RFC 9220：Bootstrapping WebSockets with HTTP/3
https://www.rfc-editor.org/rfc/rfc9220.html

Go 标准库 net/http（Flusher）
https://pkg.go.dev/net/http

Spring：SseEmitter Javadoc
https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/servlet/mvc/method/annotation/SseEmitter.html

sse-starlette（FastAPI/Starlette SSE）
https://github.com/sysid/sse-starlette

RFC 6202：HTTP long polling/streaming 的已知问题与最佳实践（含 header overhead）
https://datatracker.ietf.org/doc/rfc6202/
```