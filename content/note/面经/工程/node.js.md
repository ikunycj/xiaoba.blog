# Node.js 面经

Node.js 的面试题，真正高频的并不多，核心反复考的其实就是下面几类：

1. Node.js 是什么，和浏览器里的 JavaScript 有什么关系
2. Node.js 为什么是单线程却还能扛高并发
3. 事件循环是什么，为什么分 6 个阶段
4. `setTimeout`、`setImmediate`、`process.nextTick`、Promise 的执行顺序
5. Node.js 适合什么场景，不适合什么场景
6. 如果遇到 CPU 密集型任务，怎么避免阻塞主线程

所以复习 Node.js 时，不要背零散知识点，而要围绕这 6 个问题组织答案。

---

## 1. Node.js 是什么

### 面试答法

Node.js 不是一门新语言，也不是前端框架，而是一个让 JavaScript 运行在浏览器之外的运行时。

它的核心价值是：

- 基于 V8 执行 JavaScript；
- 基于 `libuv` 提供事件循环、I/O 调度和线程池能力；
- 用单线程 JavaScript 配合非阻塞 I/O 来处理高并发请求。

一句话概括就是：

> **Node.js = JavaScript Runtime + 非阻塞 I/O + 事件循环调度。**

### 面试加分点

可以顺手补一句：

- JavaScript 语言本身不等于 Node.js；
- 浏览器能跑 JS，Node.js 也能跑 JS；
- 两者的宿主环境不同，所以提供的 API 也不同。

比如：

- 浏览器有 `window`、DOM、BOM；
- Node.js 有 `fs`、`path`、`http`、`process`。

---

## 2. Node.js 为什么是单线程却还能扛高并发

### 面试答法

Node.js 的“单线程”，指的是 JavaScript 业务代码主要在一个主线程里执行，同一时刻只有一段 JS 在主线程上跑。

但这不代表 Node.js 底层只有一个线程。

Node.js 之所以能扛高并发，是因为：

- JavaScript 主线程不直接阻塞等待 I/O；
- 文件、网络、DNS、加密等任务会交给操作系统或 `libuv` 线程池；
- 等结果准备好后，再把回调放回事件循环；
- 主线程持续处理新的请求和回调。

所以它的并发能力，核心不在“多线程并行执行 JS”，而在：

> **主线程不傻等 I/O，而是一直保持可调度状态。**

### 进一步展开

如果面试官继续追问，可以补充：

- `V8`：执行 JavaScript
- `libuv`：事件循环、I/O、多平台抽象、线程池
- 线程池常处理：文件 I/O、DNS、`crypto`、`zlib`
- 网络 I/O 更多依赖操作系统异步能力

### 常见误区

不要把 Node.js 简单说成“单线程，所以性能差”或者“单线程，所以一定省资源”。

更准确的表达是：

- **I/O 密集场景下优势明显**
- **CPU 密集场景下容易卡主线程**

---

## 3. 事件循环是什么

### 面试答法

事件循环是 Node.js 用来调度异步回调执行顺序的机制。

当同步代码执行时，异步任务不会立刻在主线程执行，而是先交给底层。等异步任务完成后，对应回调会被放入合适的队列，最后由事件循环按规则调度回主线程执行。

所以事件循环解决的不是“异步任务怎么执行”，而是：

> **异步任务完成后，回调什么时候回到主线程执行。**

---

## 4. Node.js 事件循环为什么分 6 个阶段

### 面试答法

Node.js 的事件循环基于 `libuv`，一轮循环主要会经历 6 个阶段：

1. `timers`
2. `pending callbacks`
3. `idle, prepare`
4. `poll`
5. `check`
6. `close callbacks`

之所以分阶段，是因为不同异步任务的触发条件不同，不能都混在一个大队列里处理。

比如：

- 定时器要看是否到期；
- I/O 回调要等文件或网络事件完成；
- `setImmediate` 希望在当前轮 `poll` 后尽快执行；
- 关闭回调属于资源释放生命周期。

所以分阶段的本质是：

> **按任务类型和触发时机分层调度，保证执行顺序清晰、行为可预测、底层实现高效。**

---

## 5. 6 个阶段分别做什么

### 5.1 `timers`

执行已经到期的：

- `setTimeout`
- `setInterval`

注意：

- 不是时间一到就立即执行；
- 而是“到期后最早在后续某次 `timers` 阶段执行”。

### 5.2 `pending callbacks`

执行某些被延后到下一轮的系统级回调，比如部分底层 I/O 错误回调。

### 5.3 `idle, prepare`

`libuv` 内部使用，业务开发通常不用主动关心。

### 5.4 `poll`

这是最核心的阶段。

主要负责：

- 执行 I/O 相关回调；
- 在必要时等待新的 I/O 事件到来。

很多文件读取、网络数据返回、socket 事件，都会在这里进入执行。

### 5.5 `check`

专门执行：

- `setImmediate()`

### 5.6 `close callbacks`

执行关闭相关回调，例如：

- `socket.on('close', ...)`

### 一句话记忆法

```text
timers -> pending callbacks -> idle/prepare -> poll -> check -> close callbacks
```

---

## 6. `process.nextTick` 和 Promise 属于哪一层

### 面试答法

`process.nextTick` 和 Promise 微任务都 **不属于** 事件循环那 6 个阶段。

它们属于更高优先级的小队列机制。

在 Node.js 中，常见的粗略优先级可以记成：

```text
同步代码 -> process.nextTick -> Promise 微任务 -> 事件循环各阶段任务
```

也就是说：

- `process.nextTick` 比 Promise 更早；
- Promise 比 `setTimeout`、`setImmediate` 这类 phase 任务更早。

### 面试注意点

这题很容易答错成“Promise 属于某个 phase”。这是不对的。

更准确的说法是：

- `process.nextTick`：Node 特有，高优先级队列
- `Promise.then` / `queueMicrotask`：微任务队列
- `setTimeout` / `setImmediate`：属于事件循环阶段任务

---

## 7. `setTimeout`、`setImmediate`、`process.nextTick`、Promise 谁先执行

这题几乎必考。

### 先给结论

通常先记成：

```text
同步代码
-> process.nextTick
-> Promise.then
-> setTimeout / setImmediate
```

但最后两个谁先，**不总是固定**。

---

### 经典代码

```js
console.log('1');

setTimeout(() => console.log('2'), 0);
setImmediate(() => console.log('3'));
process.nextTick(() => console.log('4'));
Promise.resolve().then(() => console.log('5'));

console.log('6');
```

稳定部分通常是：

```js
1
6
4
5
2 或 3
3 或 2
```

解释：

- `1`、`6` 是同步代码；
- `4` 是 `process.nextTick`；
- `5` 是 Promise 微任务；
- `2` 和 `3` 分别是 `setTimeout` 与 `setImmediate`。

---

## 8. 为什么 `setTimeout(0)` 和 `setImmediate()` 谁先不一定

### 面试答法

因为它们不在同一个阶段：

- `setTimeout(..., 0)` 在 `timers`
- `setImmediate()` 在 `check`

如果是在顶层代码里同时注册，第一次进入事件循环时，哪个 phase 先拿到可执行任务，受运行时调度影响，所以先后顺序不可靠。

也就是说：

> **顶层代码里，不应依赖 `setTimeout(0)` 和 `setImmediate()` 的绝对先后顺序。**

---

## 9. 为什么在 I/O 回调里通常 `setImmediate` 更早

### 面试答法

如果是在 I/O 回调里注册，比如：

```js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
```

通常输出是：

```js
immediate
timeout
```

因为：

- `fs.readFile` 的回调通常在 `poll` 阶段执行；
- 在 `poll` 回调里注册 `setImmediate`，会进入本轮后面的 `check`；
- 在同一个回调里注册 `setTimeout(..., 0)`，通常要等下一轮 `timers`。

所以在 I/O 回调里，`setImmediate` 更可预测。

---

## 10. 为什么 `process.nextTick` 比 Promise 更早

### 面试答法

在 Node.js 中，`process.nextTick` 的优先级高于 Promise 微任务。

例如：

```js
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
```

输出通常是：

```js
nextTick
promise
```

因为 Node 在继续事件循环之前，会先清空 `nextTick` 队列，再清空 Promise 微任务队列。

### 面试易错点

浏览器里没有 `process.nextTick`，所以不要把浏览器和 Node 的结论混用。

---

## 11. 为什么不能滥用 `process.nextTick`

### 面试答法

因为它优先级太高。

如果不断往 `process.nextTick` 队列里塞任务，事件循环就可能迟迟进入不了后续 phase，导致定时器和 I/O 被“饿死”。

例如：

```js
function loop() {
  process.nextTick(loop);
}

loop();
```

这种写法会让整个进程像卡住一样。

所以 `process.nextTick` 适合：

- 少量立即执行的补偿逻辑；
- 某些 API 时序对齐；
- 错误抛出时机控制。

不适合：

- 大量递归调度；
- 当成“更快的 `setTimeout`”乱用。

---

## 12. Node.js 和浏览器事件循环有什么区别

这题也很高频。

### 相同点

- 都是单线程下的异步调度机制；
- 同步代码都先执行；
- Promise 都属于微任务体系；
- 异步任务完成后，回调都要回到主线程排队执行。

### 不同点

#### 1. Node.js 是 phase 模型，浏览器更常说 task / microtask / render

Node.js 更强调：

- `timers`
- `poll`
- `check`
- ...

浏览器更强调：

- 执行一个宏任务
- 清空微任务
- 必要时渲染
- 再进入下一轮

#### 2. 浏览器有渲染流程，Node.js 没有

浏览器事件循环要考虑：

- DOM
- 样式计算
- layout
- paint
- `requestAnimationFrame`

Node.js 没有页面渲染，所以没有这套逻辑。

#### 3. Node.js 有 `process.nextTick`，浏览器没有

这是一个关键差异。

#### 4. `setImmediate` 在 Node.js 中有明确阶段位置

在 Node.js 中，它对应 `check` 阶段；浏览器里一般不把它当成标准主流 API 来讨论。

### 一句话总结

> **Node.js 事件循环更偏 I/O 调度，浏览器事件循环更偏任务调度与渲染时机。**

---

## 13. Node.js 适合什么场景

### 面试答法

Node.js 更适合 **I/O 密集型** 场景，而不是 CPU 密集型场景。

典型适用场景：

- BFF / API 聚合层
- 中间层网关
- WebSocket / 实时通信
- SSR 中间层
- 前端工程化工具
- CLI 工具

这类场景的共同特点是：

- 请求很多；
- 等待 I/O 的时间长；
- 真正的 CPU 重计算少；
- 更看重高并发下的调度效率。

---

## 14. Node.js 不适合什么场景

### 面试答法

Node.js 不适合长期占用主线程的 CPU 密集型场景，比如：

- 大规模图像处理
- 视频转码
- 重加密计算
- 复杂科学计算
- 超大 JSON 同步解析
- 长时间同步循环

原因是：

> **主线程一旦被 CPU 任务卡住，事件循环就无法及时处理其他请求。**

于是会出现：

- 接口响应抖动
- 心跳超时
- 定时器延迟
- 整体吞吐下降

---

## 15. 如果遇到 CPU 密集型任务怎么办

### 面试答法

常见优化思路有 4 类。

#### 1. 任务切片

把一大段任务拆成很多小段，通过 `setImmediate()` 等方式分批执行，让出事件循环。

#### 2. `worker_threads`

把重计算移到工作线程，让主线程继续负责 I/O 和调度。

#### 3. 多进程 / `cluster`

利用多核 CPU 提升整体吞吐和可用性。

#### 4. 下沉到更适合的后端服务

让 Node.js 负责网关和编排，把重计算交给 Go、Java、Rust、Python 服务或任务系统处理。

### 面试表达建议

你可以这样答：

> 如果只是中等强度的阻塞，可以考虑任务切片；如果是明确的重 CPU 任务，我更倾向于用 `worker_threads` 或拆到独立服务，而不是让主线程硬扛。

这样会显得更工程化。

---

## 16. 高频面试快问快答

### 16.1 Node.js 是单线程吗？

**答：** JavaScript 执行模型是单线程的，但 Node.js 底层不是只有一个线程，`libuv` 还会使用线程池和操作系统异步能力处理 I/O。

### 16.2 事件循环有几个阶段？

**答：** 6 个：`timers`、`pending callbacks`、`idle/prepare`、`poll`、`check`、`close callbacks`。

### 16.3 哪个阶段最核心？

**答：** `poll`，因为它主要负责 I/O 回调调度，也是事件循环决定是否等待 I/O 的关键位置。

### 16.4 `process.nextTick` 属于哪个阶段？

**答：** 不属于这 6 个阶段，它是 Node 自己维护的高优先级队列。

### 16.5 Promise 属于哪个阶段？

**答：** 也不属于这 6 个阶段，它属于微任务队列。

### 16.6 `process.nextTick` 和 Promise 谁先？

**答：** `process.nextTick` 先。

### 16.7 `setTimeout(0)` 和 `setImmediate()` 谁先？

**答：** 顶层代码里不一定；I/O 回调里通常 `setImmediate` 先。

### 16.8 Node.js 为什么适合高并发？

**答：** 因为它通过非阻塞 I/O 和事件循环，让主线程不必等待 I/O，从而能持续处理新的请求和回调。

### 16.9 Node.js 为什么不适合 CPU 密集型任务？

**答：** 因为 JavaScript 主线程一旦被重计算阻塞，事件循环就会卡住，其他请求也会受影响。

---

## 17. 一张面试速记表

| 主题 | 最好记的结论 |
| --- | --- |
| Node.js 是什么 | JavaScript 运行时，不是语言也不是框架 |
| 高并发原因 | 单线程 JS + 非阻塞 I/O + 事件循环 |
| 事件循环阶段 | `timers -> pending -> idle/prepare -> poll -> check -> close` |
| 最核心阶段 | `poll` |
| `setTimeout` | `timers` |
| `setImmediate` | `check` |
| `process.nextTick` | 不属于 phase，优先级高于 Promise |
| Promise | 微任务，不属于 phase |
| 执行优先级 | 同步 -> `nextTick` -> Promise -> phase 任务 |
| `setTimeout(0)` vs `setImmediate()` | 顶层不稳定，I/O 回调里通常 `setImmediate` 先 |
| Node vs 浏览器 | Node 偏 I/O phase 调度，浏览器偏任务 + 渲染 |
| Node 适用场景 | I/O 密集型 |
| Node 不适用场景 | CPU 密集型 |
| CPU 重任务处理 | 切片、`worker_threads`、多进程、拆服务 |

---

## 18. 最后一段口述版总结

如果面试官让你一句话总结 Node.js，你可以这么说：

> Node.js 本质上是一个基于 V8 和 `libuv` 的 JavaScript 运行时，它通过单线程 JavaScript、非阻塞 I/O 和事件循环机制来处理高并发请求。它特别适合 I/O 密集型场景，比如 BFF、实时通信和中间层服务；但如果是 CPU 密集型任务，就需要用 `worker_threads`、多进程或者拆分到其他服务来避免阻塞主线程。

如果面试官继续追问事件循环，你再顺着补：

> Node.js 事件循环分 6 个阶段，`process.nextTick` 和 Promise 不属于这 6 个阶段；常见执行顺序是同步代码先执行，再执行 `process.nextTick`，再执行 Promise 微任务，最后才进入 `timers`、`poll`、`check` 等 phase。`setTimeout(0)` 和 `setImmediate()` 在顶层代码里先后不固定，但在 I/O 回调里通常 `setImmediate()` 更早。
