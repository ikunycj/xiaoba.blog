

## React Fiber原理解析

在React核心知识体系里，虚拟DOM扮演着非常重要的角色，随着复杂应用与动画交互的爆发式增长，传统的"**同步递归更新**"模式逐渐暴露性能瓶颈：一旦渲染任务开始便无法中断，导致页面卡顿、交互迟滞。2017年，React团队提出Fiber架构，通过重写核心调度算法，将更新过程从"**一镜到底**"变为"**可中断、可优先级排序**"的异步任务流，为React带来更佳的用户体验与更精细的生命周期控制。

本次勘探将深入React Fiber的架构迷宫，从链表数据结构与双缓存树，到时间切片与任务优先级调度的实现逻辑，层层拆解React Fiber的运作奥秘。

## DOM变更思路：面向过程——>面向状态

举个例子：Todo List

![[Pasted image 20250519105222.png]]

这里只单独比较DOM变更思路的差异：

1. 代码复杂度：面向过程的代码会有很多复杂的DOM操作，随着项目增长，代码不仅需要管理各种数据，还要根据数据变化触发DOM变更，面向过程的代码可能会变得难以理解与维护；面向状态的思路，只用关心数据与视图的映射关系，不用处理复杂繁琐的DOM操作，组件化能力和代码可维护性大大提高。
2. 声明式开发、组件化、跨平台：面向过程更多关注的是DOM操作和事件处理，没有高效的状态管理机制，会导致全局状态的滥用；面向状态可以更好地实现状态复用，与跨组件的数据共享，同时面向状态的开发范式更为直观易懂，显著提升开发效率。

>[!tip]
>对于资深前端开发工程师来说，jQuery 在某些场景下的性能表现并不逊色于 React，甚至在特定操作中可能更优。在操作真实 DOM 时，jQuery 和 React 的本质区别在于对 DOM 操作的控制权：jQuery 将操作 DOM 的权力完全交给开发者，而 React 则通过虚拟 DOM 和高效的更新机制来管理 DOM 操作。
>对于经验不足的普通开发人员，可能会在开发过程中频繁调用读取元素的 API，例如在一个循环中修改元素的宽度，并在每次修改后立即读取其宽度，从而触发强制渲染。
>因此，虽然jQuery和React在性能上各有优势，但React的设计更倾向于帮助开发者避免常见的性能陷阱，而jQuery则需要开发者具备更高的技术水平来实现高效的DOM操作。

## 状态如何变更DOM

>[!question]
我们先抛开react设计思路，假如让你设计一个状态系统，只需要修改状态，就能操作真实DOM，你会怎么设计？

1. 构建一个与真实dom能进行映射的**状态对象**
2. 用户操作浏览器行为的**监听器**
3. **更新状态对象**的方法
4. **状态对象转换成真实DOM**的方法

只要满足以上4点，你就实现了一个面向状态编程的web界面构建库

## React15

带着维护状态对象进行DOM变更的设计思路，我们来看看Facebook工程师是如何设计react15来解决上述问题！

### 虚拟DOM

首先提出了虚拟DOM的概念，来对真实DOM进行一个映射，为了避免每次操作DOM触发浏览器渲染，React会先将原来的DOM复制出来，当state改变时（通过react**事件委托机制**来处理用户对页面的操作，并更新对应state），构建一个新的虚拟DOM，我们可以看个例子：

```js
import React, { useState } from 'react';
function App() {
const [count, setCount] = useState(0);
return (
    <div>
     <h1>Counter: {count}</h1>
     <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
);}
export default App;
```

虚拟dom结构如下：

```js
{
"type": "div",
"props": {},
"children": [
    {
    "type": "h1",
    "props": {},
    "children": [
        {
        "type": "TEXT_ELEMENT",
        "props": {"nodeValue": "Counter: 0"}
        }
     ]
     },
     {
     "type": "button",
     "props": {"onClick": "setCount(count + 1)"},
     "children": [{
     "type": "TEXT_ELEMENT",
     "props": {"nodeValue": "Increment"}
     }]
     }
  ]
}
```

此时点击一下`Increment`按钮，新的虚拟DOM如下：

```js
{
"type": "div",
"props": {},
"children": [
    {
    "type": "h1",
    "props": {},
    "children": [
        {
        "type": "TEXT_ELEMENT",
        "props": {"nodeValue": "Counter: 1"}
        }
     ]
     },
     {
     "type": "button",
     "props": {"onClick": "setCount(count + 1)"},
     "children": [{
     "type": "TEXT_ELEMENT",
     "props": {"nodeValue": "Increment"}
     }]
     }
  ]
}
```

既然得到新的虚拟DOM，就直接将其转化为真实DOM触发浏览器渲染，不就大功告成了！小型应用是没问题，但对于大型应用，全量的DOM渲染十分耗时，页面会出现明显卡顿现象，因此需要根据DOM变更按需渲染，那么如何找到变更的DOM节点呢，Diff算法应运而生！

### Diff算法

Diff算法本质上就是用于比较新旧虚拟DOM的差异，得出需要更新真实DOM的行为，显而易见这个算法在整个React中的使用频率相当高，因此Diff算法的执行性能是非常重要的
![[Pasted image 20250519110910.png]]

#### 传统Diff

我们要理解DOM节点本质上是一个树形结构，Diff算法要解决的问题就是计算一棵树转化为另一棵树需要的最小操作步骤。这个问题其实是一个非常复杂的算法问题，在算法领域叫做计算树的编辑距离（Tree Edit Distance算法），我们可以先看一道leetcode题[72. 编辑距离 - 力扣（LeetCode）](https://leetcode.cn/problems/edit-distance/description/)

![[Pasted image 20250519110903.png]]

看完题解我们知道字符串转换的时间复杂度为O(mn)，而树的最小更新方式，不仅需要两两对比叶子节点是否相同O($n^2$)，对比完还要计算最小转换方式，实现后复杂度就来到了O($n^3$)，从1979年到2011年经过30多年的发展演变也仅优化到O($n^3$)，历程大致如下：

1. 1979年，Tai 提出了次个非幂级复杂度算法，时间复杂度为 O(m3 * n3)
2. 1989年，Zhang and Shasha 将 Tai 的算法进行优化，时间复杂度为 O(m2 * n2)
3. 1998年，Klein 将 Zhang and Shasha 的算法再次优化，时间复杂度为 O(n^2 * m * log(m))
4. 2009年，Demiane 提出最坏情况下的计算公式，将时间复杂度控制在 O(n^2 * m * (1+log(m/n)))
5. 2011年，Pawlik and N.Augsten 提出适用于所有形状的树的算法，并将时间复杂度控制在 O(n^3)

这个O(n^3)时间复杂度的详细实现，算法功底深厚的同学可自行研究这篇论文：
![[p334_mateuszpawlik_vldb2012.pdf]]
#### React Diff

既然传统算法最优解都只能做到O($n^3$)，如果有1000个节点，一次diff就将进行10亿次比较，这显然无法接受，于是React团队提出两个假设，并基于假设制定相关策略（由于传统Diff算法本身是没有问题的，既然改变不了解法，那不如改变题目，对这个问题本身加以限制），成功将O($n^3$)复杂度问题转化为O(n)复杂度的问题

两个假设：

1. 两个不同类型的元素会产生出不同的树
2. 开发者可以通过`key`来标识哪些元素在不同的渲染下能保持稳定

基于这上述两个假设，React针对性的提出三个策略对diff算法进行优化：

##### 1. **Tree Diff**：
Diff算法性能突破的关键点在于"分层对比"，Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计

React只对虚拟DOM树进行分层比较，不考虑节点的跨层级比较，如下图：

![[Pasted image 20250519111501.png]]
React通过对虚拟Dom树进行层级控制，只会对相同颜色框内的节点进行比较，根据对比结果，进行节点的新增和删除，因此只需遍历一次虚拟Dom树，就可以完成整个的对比

**那么假如发生了跨层级的移动操作时React会如何处理？**

![[Pasted image 20250519111631.png]]

React并不会复用B节点及其子节点，而是会直接删除A节点下的B节点，然后再在C节点下创建新的B节点及其子节点。因此，如果发生跨级操作，React是不能复用已有节点，可能会导致React进行大量重新创建操作，影响性能，所以React官方推荐尽量避免跨层级的操作。

##### 2. **Component Diff**：
拥有相同类型的两个组件将会生成相似的树形结构，拥有不同类型的两个组件将会生成不同树形结构

React是基于组件构建的，只有同类型组件才有进一步对比的必要，，若参与Diff的两个节点类型不同，就直接放弃比较，执行替换操作。如下图，虽然**组件C**和**组件H**结构相似，但类型不同，React不会进行比较，会直接**删除组件C**，**创建组件H**。

![[Pasted image 20250519113149.png]]

##### 3. **Element Diff**：
对于同一层级的一组子节点，它们可以通过唯一key进行区分

Element diff涉及三种操作：移动、创建、删除。对于同一层级的子节点，使用key分别进行讨论。

**不使用Key的情况**：

![[Pasted image 20250519113157.png]]

React对新老同一层级的子节点对比，发现新集合中的B不等于老集合中的A，于是删除A，创建B，依此类推，直到删除D，创建C，这会使得相同的节点不能复用，出现频繁的删除和创建操作，从而影响性能。

**使用Key的情况**：

![[Pasted image 20250519113204.png]]

React首先会对新集合进行遍历，通过**唯一key**来判断老集合中是否存在相同的节点，如果没有则创建，如果有，则进行移动操作复用节点，减少节点的删除和创建操作。

### Stack Reconciler栈调和

这个名称大家都不陌生，但是它跟Diff的关系是什么，字面含义，调和指的是将**虚拟DOM**映射到**真实DOM**的过程，调和过程并不能跟Diff画等号，调和是"使一致"的过程，而Diff是"找不同"的过程，因此Diff是**Reconciler**中的一环，**Reconciler**所做的工作包括组件的**挂载、卸载、更新**等过程，其中更新过程涉及对Diff算法的调用。

**Reconciler**过程使用递归调用栈来处理组件树的更新，因此命名为**Stack Reconciler**，整个过程如下：

![[Pasted image 20250519113218.png]]

递归调用栈是啥，举个🌰，递归计算阶乘：

```
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
```

调用 `factorial(3)` 的调用栈如下：

1. `factorial(3)` 被调用

- 调用栈：`factorial(3)`
- 参数：`n = 3`
- 局部变量：无
- 返回地址：调用 `factorial(3)` 的位置

2. `factorial(3)` 调用 `factorial(2)`

- 调用栈：`factorial(3) -> factorial(2)`
- 参数：`n = 2`
- 局部变量：无
- 返回地址：调用 `factorial(2)` 的位置

3. `factorial(2) 调用 factorial(1)`

- 调用栈：`factorial(3) -> factorial(2) -> factorial(1)`
- 参数：`n = 1`
- 局部变量：无
- 返回地址：调用 `factorial(1)` 的位置

4. `factorial(1)` 调用 `factorial(0)`

- 调用栈：`factorial(3) -> factorial(2) -> factorial(1) -> factorial(0)`
- 参数：`n = 0`
- 局部变量：无
- 返回地址：调用 `factorial(0)` 的位置

5. `factorial(0)` 返回 1

- 调用栈：`factorial(3) -> factorial(2) -> factorial(1)`
- 返回值：1

6. `factorial(1)` 返回 `1 * 1 = 1`

- 调用栈：`factorial(3) -> factorial(2)`
- 返回值：1

7. `factorial(2)` 返回 `2 * 1 = 2`

- 调用栈：`factorial(3)`
- 返回值：2

8. `factorial(3)` 返回 `3 * 2 = 6`

- 调用栈：空
- 返回值：6

由于递归调用是同步不可中断的，一旦开始执行必须计算完成才能结束，如果页面DOM树较大，该过程会长时间占据js线程，导致页面卡顿。

## 卡顿原因16.7ms

一般来说页面刷新率低于60HZ时，人眼可以明显感觉到卡顿，也就是1秒钟要绘制60帧图像，每帧图像生成的时间不能超过1000 / 60 ≈ 16.7ms。我们都知道js是单线程，并且GUI渲染线程与JS线程是互斥的，所以JS脚本执行和浏览器布局、绘制不能同时执行。要保证用户使用时不会感到卡顿，每16.7ms时间内，需要完成如下工作：

React15的Stack Reconciler机制导致它整个对比渲染过程是同步的，遇到DOM树庞大的项目时，就容易出现性能问题，因此React团队在React16版本对其进行了优化，React Fiber就此诞生！

## React Fiber

### Fiber不是新东西

在讲Fiber前，先科普一些系统调度的概念，早期微软DOS是一个单任务操作系统，这种操作系统同一时间只允许运行一个程序，在这种系统中，你想执行多个任务，只能等待前一个进程退出，然后再载入一个新的进程，直到windows 3.x，它才有真正意义的进程调度器，实现多进程并发执行。

现代操作系统都是多任务操作系统. 进程的调度策略如果按照CPU核心数来划分，可以分为单处理器调度和多处理器调度。我们只关注**单处理器调度**，因为它可以类比JavaScript的运行机制。

说白了，为了实现进程的并发，操作系统会按照一定的调度策略，将CPU的执行权分配给多个进程，多个进程都有被执行的机会，让它们交替执行，形成一种"同时在运行"假象，因为CPU速度太快，人类根本感觉不到，实际上在单核的物理环境下同时只能有一个程序在运行。

那么针对单处理器会有以下几种调度策略：

1. 先到先得（First-Come-First-Served, FCFS）

这是最简单的调度策略, 简单说就是没有调度，谁先来谁就先执行，执行完毕后就执行下一个。

- FCFS对**短进程**不利，可以用饭堂排队来比喻: 在饭堂排队打饭的时候，最烦那些一个人打包好好几份的人，这些人就像长进程一样，霸占着CPU资源，后面排队只打一份的人会觉得很吃亏，打一份的人会觉得他们优先级应该更高，毕竟他们花的时间很短，反正你打包那么多份再等一会也是可以的，何必让后面那么多人等这么久...
- FCFS对**I/O密集不利**，可以类比ZF部门办业务: 假设CPU一个窗口、I/O一个窗口。在CPU窗口好不容易排到你了，这时候发现一个不符合条件或者漏办了, 需要去I/O搞一下，去I/O窗口排队，I/O执行完了，到CPU窗口又得重新排队。对于这些丢三落四的人很不公平...

2. 轮转

这是一种**基于时钟的抢占策略**，这也是抢占策略中最简单的一种: 公平地给每一个进程一定的执行时间，当时间消耗完毕或阻塞，操作系统就会调度其他进程，将执行权抢占过来。

这种调度策略的要点是确定**合适的时间片长度**: 太长了，长进程霸占太久资源，其他进程会得不到响应(等待执行时间过长)，这时候就跟上述的FCFS没什么区别了; 太短了也不好，因为进程抢占和切换都是需要成本的, 而且成本不低，时间片太短，时间可能都浪费在上下文切换上了，导致进程干不了什么实事。并且和FCFS一样，轮转策略对I/O进程还是不公平。

3. 最短进程优先（Shortest Process Next, SPN）

上面说了先到先得策略对短进程不公平，索性就让"最短"的进程优先执行，也就是说: 按照进程的预估执行时间对进程进行**优先级排序**，**先执行完短进程**，**后执行长进程**，这是一种非抢占策略。这样可以让短进程能得到较快的响应。但是怎么获取或者评估进程执行时间呢？一是让程序的提供者提供，这不太靠谱；二是由操作系统来收集进程运行数据，并对它们进程统计分析。例如最简单的是计算它们的平均运行时间。不管怎么说都比上面两种策略要复杂一点。

SPN的缺陷是: 如果系统有大量的短进程，那么长进程可能会饥饿得不到响应，另外它不是抢占性策略, 尽管短进程可以得到更多的执行机会，但还是没有解决FCFS的问题: 一旦长进程得到CPU资源，得等它执行完，导致后面的进程得不到响应。

4. 最短剩余时间（Shortest Remaining Time, SRT）

SRT进一步优化了SPN，**增加了抢占机制**，在SPN的基础上，当一个进程添加到就绪队列时，操作系统会比较刚添加的新进程和当前正在执行的老进程的"剩余时间"，如果新进程剩余时间更短，新进程就会抢占老进程。

相比轮转的抢占，SRT没有大量中断处理的开销。但是在SPN的基础上，操作系统需要记录进程的历史执行时间，这是新增的开销，另外长进程饥饿问题还是没有解决。

5. 最高响应比优先（HRRN）

为了解决长进程饥饿问题，同时提高进程的响应速率，还有一种最高响应比优先的策略，首先了解什么是**响应比**:

响应比 = （等待执行时间 + 进程执行时间） / 进程执行时间

这种策略会选择响应比最高的进程优先执行，对于短进程来说，因为执行时间很短，分母很小，所以响应比比较高，会被优先执行；对于长进程来说，执行时间长，一开始响应比小，但是随着等待时间增长，它的优先级会越来越高，最终可以被执行。

**React Fiber追求的可中断更新，其实就是系统进程并发机制思路的演化**

### JavaScript执行环境

JavaScript就像单行道，同时只能做一件事，这个和DOS的单任务操作系统一样的，事情只能一件一件的干。要是前面有一个呆瓜任务长期霸占CPU，后面什么事情都干不了，浏览器会呈现卡死的状态，这样的用户体验就会非常差。

对于前端框架来说，解决这种问题有三个方向：

1. 优化每个任务，让它有多快就多快，提升CPU运算效率
2. 快速响应用户，让用户觉得够快，不能阻塞用户的交互
3. 尝试Worker多线程

**Vue选择的是第1种**，因为Vue使用`模板`配合响应机制可以让Vue精确地进行节点更新；**而React选择了第2种**；对于Worker多线程渲染方案也有人尝试，要保证状态和视图的一致性相当麻烦。

基于以上认知，由于React的Reconciler是**CPU密集型**的操作, 它就相当于"长进程"。所以初衷和进程调度一样，我们要**让高优先级的进程或者短进程优先运行**，不能让长进程长期霸占资源。

所以React通过Fiber架构，让自己的Reconciler过程变成可被中断。"适时"地让出CPU执行权，保证浏览器及时地响应用户的交互。

### React Fiber是什么

React Fiber是对核心算法的一次重新实现，是一个新的Reconciliation，**简单理解就是把一个耗时长的任务分解为一个个的工作单元，在浏览器空余时间来执行这一个个工作单元，所以Fiber架构就是用异步的方式解决旧版本同步递归导致的性能问题！**

`Fiber架构` = `Fiber节点` + `Fiber调度算法`

我们先从宏观理解一下React16+的工作原理，首先架构可以分为三层：

- Scheduler（调度器）——调度任务的优先级，高优任务优先进入Reconciler
- Reconciler（协调器）——负责找出变化的组件
- Renderer（渲染器）——负责将变化的组件渲染到页面上

举个🌰：

```
const [count, setCount] = useState(1)
<button onClick={() => setCount(2)}>count</button>
<ul>
    <li>1 * count</li>
    <li>2 * count</li>
    <li>3 * count</li>
</ul>
```

其中红框中的步骤随时可能由于以下原因被中断：

- 有其它更高优先级任务插入需要先执行
- 当前帧没有剩余时间

由于红框中的工作都在内存中执行，不会更新页面上的DOM，即使反复中断，对用户而言也不会有什么影响。

### 为什么叫Fiber？

大家应该都清楚进程（Process）和线程（Thread）的概念，进程是操作系统分配资源的最小单元，线程是操作系统调度的最小单元，在计算机科学中还有一个概念叫做 Fiber，英文含义就是"纤维"，意指比 Thread 更细的线，也就是比线程（Thread）控制得更精密的并发处理机制。

Fiber也称"协程"，协程本身是没有并发或并行能力的，只是一种控制流程的让出机制，可以类比成`Generator`。

普通函数执行的过程中无法被中断和恢复：

```
const tasks = []
function run() {
  let task
  while (task = tasks.shift()) {
    execute(task)
  }
}
```

而`Generator`可以：

```
const tasks = []
function * run() {
let task
while(task = tasks.shift()){
    // 🔴判断是否有高优先级事件需要处理, 有的话让出控制权
    if(hasHighPriorityEvent()){
        yield
    }
    // 处理完高优先级事件后，恢复函数调用，继续执行
    execute(task)
}
}
```

React Fiber的思想和协程的概念是契合的: 🔴React渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染。

由于浏览器没有抢占机制，无法中断一个正在执行的程序，所以只能采取主动让出的机制，它有个更专业的名词：合作式调度（Cooperative Scheduling），相对应的就是抢占式调度（Preemptive Scheduling）

这种调度方式很有趣，你会发现这是一种身份的对调，以前我们是老子，想怎么执行就怎么执行，执行多久就执行多久; 现在为了用户体验统一了战线, 一切听由浏览器指挥调度，浏览器是老子，我们要跟浏览器申请执行权，而且这个执行权有期限，借了后要按照约定归还给浏览器。

当然你超时不还浏览器也拿你没办法🤷... **合作式调度的缺点就在于此，全凭自律，用户要挖大坑，谁都拦不住**。

### Fiber的结构

Fiber实际上就是虚拟DOM，之前的虚拟DOM树，就是现在的Fiber树，下面是一个基本的Fiber节点属性定义：

```
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

每个Fiber节点有个对应的`React element`，多个`Fiber节点`是如何连接形成树呢？靠以下三个属性：

```
// ⚛️ 链表结构
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```

举个🌰，如下的组件结构：

```
function App() {
  return (
    <div>
      i am
      <span>zhangpeng</span>
    </div>
  )
}
```

对应的Fiber树结构：

作为静态的结构数据，保存了组件相关信息：

```
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag;
// key属性
this.key = key;
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null;
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null;
// Fiber对应的真实DOM节点
this.stateNode = null;
```

作为动态的工作单元，保存了本次更新相关信息：

```
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps;
this.memoizedProps = null;
this.updateQueue = null;
this.memoizedState = null;
this.dependencies = null;
this.mode = mode;
// 保存本次更新会造成的DOM操作
this.effectTag = NoEffect;
this.nextEffect = null;
this.firstEffect = null;
this.lastEffect = null;
```

另外两个字段保存调度优先级相关的信息：

```
// 调度优先级相关
this.lanes = NoLanes;
this.childLanes = NoLanes;
```

### 什么是"双缓存"

通过上文我们了解到了什么是Fiber，Fiber节点构成Fiber树，也就是对应的DOM树，那么如何更新DOM呢？就需要用到**双缓存机制**。

当我们用canvas绘制动画，每一帧绘制前都会调用ctx.clearRect清除上一帧的画面。如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。

这种在内存中构建并直接替换的技术叫做**双缓存。**

对应到Fiber树，**假如没使用双缓存机制，新Fiber树尚未构建完成就要执行渲染，此时会将当前未构建完全的Fiber树绘制到屏幕上，出现渲染部分DOM的情况，因此需要使用双缓存技术来完成Fiber树的构建与替换**。

### 双缓存 Fiber 树

在React中最多会同时存在两棵Fiber树，当前屏幕上显示内容对应的Fiber树称为`current Fiber`树，正在内存中构建的Fiber树称为`workInProgress Fiber`树。

`current Fiber`树中的Fiber节点被称为`current fiber`，`workInProgress Fiber`树中的Fiber节点被称为`workInProgress fiber`，他们通过`alternate`属性连接。

```
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```

React应用的根节点通过使`current指针`在不同Fiber树的`rootFiber`间切换来完成`current Fiber`树指向的切换。即当`workInProgress Fiber`树构建完成交给Renderer渲染在页面上后，应用根节点的current指针指向`workInProgress Fiber`树，此时`workInProgress Fiber`树就变为`current Fiber`树。

每次状态更新都会产生新的`workInProgress Fiber`树，通过`current`与`workInProgress`的替换，完成DOM更新。

还是以上面的例子：

1. 首次执行`ReactDOM.render`会创建`fiberRootNode`，它是整个应用的根节点，`rootFiber`是`<App/>`所在组件树的根节点

之所以要区分`fiberRootNode`与`rootFiber`，是因为在应用中我们可以多次调用`ReactDOM.render`渲染不同的组件树，他们会拥有不同的`rootFiber`。但是整个应用的根节点只有一个，那就是`fiberRootNode`

此时页面还没有挂载任何DOM，所以`fiberRootNode.current`指向的`rootFiber`没有任何子`Fiber`节点（即`current Fiber`树为空）

2. 接下来进入`render`阶段，根据组件返回的JSX在内存中依次创建`Fiber`节点并连接在一起构建`Fiber`树，被称为`workInProgress Fiber`树

在构建`workInProgress Fiber`树时会尝试复用`current Fiber`树中已有的`Fiber`节点内的属性，在首屏渲染时只有`rootFiber`存在对应的`current fiber`（即`rootFiber.alternate`）

3. 图中右侧已构建完的`workInProgress Fiber`树在`commit`阶段渲染到页面

此时DOM更新为右侧树对应的样子。`fiberRootNode`的`current`指针指向`workInProgress Fiber`树使其变为`current Fiber`树。

4. 假如用户操作将zhangpeng变为pengzhang，就会开启一次新的render阶段并构建一棵新的`workInProgress Fiber`树

React就是一边和旧树比对，一边构建WIP树（workInProgress tree）， alternate指向旧树的同等节点。

### render阶段

我们知道React会同时存在两个Fiber树，那么Fiber节点是如何被创建并构建Fiber树的呢？

我们再次从头梳理一下思路：

1. 页面首次渲染前，也就是`mount`阶段，React会创建`fiberRootNode`节点，并将`current`指向当前Fiber树的根节点`rootFiber`，由于是首屏渲染，页面中还没有挂载任何DOM，所以`rootFiber`没有任何`子Fiber`节点
2. 接下来根据组件返回JSX在内存中依次创建`Fiber节点`，构建WIP树
3. WIP树构建完成，完成页面渲染后，`fiberRootNode`将`current`指向WIP树的`rootFiber`节点，完成一次渲染
4. 当页面有状态更新时，则会触发`update`，常见的update操作有，ReactDOM.render、this.setState、this.forceUpdate、useState、useReducer
5. `update`将会触发新的WIP树构建，进入`render阶段`，从`rootFiber`开始向下深度优先遍历，其中在"递"阶段调用`beginWork`方法，使用diff算法判断新旧节点差异，以此判断是复用子Fiber节点还是创建新节点，然后在"归"的阶段调用`completeWork`方法，生成对应的DOM节点，并且节点上可能存在`effectTag`，`effectTag`指的是实际对DOM操作的属性，例如：Placement（插入DOM）、Update（更新DOM）、Deletion（删除DOM）等，来表示一个Fiber节点需要执行的DOM操作类型
6. `render阶段`完成后得到新的WIP树，进入`commit阶段`，使用`DOM API`将WIP树转化为真实DOM树，渲染完成后将`fiberRootNode`的`current`指向该WIP树，完成一次交替，此过程是同步进行的。

下面我们从源码角度大致看下render阶段React做了什么：

render阶段开始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用，这两个方法位于[ReactFiberWorkLoop.js](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberWorkLoop.new.js)文件中，我们从命名可以知道其核心功能和工作方式，`Work`和`Loop`，分别表示"工作"和"循环"：

**Work**：

- 工作单元：在React的Fiber架构中，每个Fiber节点代表一个工作单元（`unitOfWork`）。这些工作单元是React 渲染树中的最小工作项，每个节点都可以独立地进行处理
- 任务分解：`ReactFiberWorkLoop`将渲染工作分解为多个小的工作单元，每个工作单元可以在浏览器的空闲时间内完成。这种分解使得React可以在不阻塞主线程的情况下，逐步完成整个渲染任务

**Loop**：

- 循环执行：Loop表示一个循环过程，`ReactFiberWorkLoop`通过一个循环来处理这些工作单元。在每个循环迭代中，React会处理一个工作单元，然后检查是否有更高优先级的任务需要处理
- 优先级检查：在处理每个工作单元时，React会检查是否有更高优先级的任务（如用户交互）需要立即处理。如果有，React会暂停当前的工作单元，优先处理高优先级任务，从而确保用户交互的响应性

基于此我们再来看源码，在`performSyncWorkOnRoot`中会调用`workLoopSync`方法，`performConcurrentWorkOnRoot`调用`workLoopConcurrent`方法，下面是调用链路

```
performSyncWorkOnRoot--->renderRootSync--->workLoopSync
performConcurrentWorkOnRoot--->renderRootConcurrent--->workLoopConcurrent

// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

可以看到，他们唯一的区别是是否调用`shouldYield`，如果当前浏览器帧没有剩余时间，`shouldYield`会中止循环，直到浏览器有空闲时间后再继续遍历。

`performUnitOfWork`方法会创建下一个`Fiber`节点并赋值给`workInProgress`，并将`workInProgress`与已创建的`Fiber`节点连接起来构成`Fiber`树。

我们知道`Fiber Reconciler`是从`Stack Reconciler`重构而来，通过遍历的方式实现可中断的递归，所以`performUnitOfWork`的工作可以分为两部分："递"和"归"

#### beginWork

从上面已经知道，`beginWork`的工作是传入当前Fiber节点，创建子Fiber节点，我们从传参来看函数作用。

```
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  // ...省略函数体
}
```

- current：当前组件对应的Fiber节点在上一次更新时的Fiber节点，即workInProgress.alternate
- workInProgress：当前组件对应的Fiber节点
- renderLanes：优先级相关，先不管

我们知道组件mount时，由于是首次渲染，是不存在当前组件对应的Fiber节点在上一次更新时的Fiber节点，即`current === null`，组件`update`时，由于之前已经`mount`过，所以`current !== null`，所以我们可以通过`current === null ?`来区分组件是处于`mount`还是`update`

基于此原因，`beginWork`的工作可以分为两部分，[源码戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3075)：

- `update`时：如果current存在，在满足一定条件时可以复用current节点，这样就能克隆`current.child`作为`workInProgress.child`，而不需要新建`workInProgress.child`
- `mount`时：除`fiberRootNode`以外，`current === null`，会根据`fiber.tag`不同，创建不同类型的子Fiber节点

```
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略
    // 复用current
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  } else {
    didReceiveUpdate = false;
  }
  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    case IndeterminateComponent:
    // ...省略
    case LazyComponent:
    // ...省略
    case FunctionComponent:
    // ...省略
    case ClassComponent:
    // ...省略
    case HostRoot:
    // ...省略
    case HostComponent:
    // ...省略
    case HostText:
    // ...省略
    // ...省略其他类型
  }
}
```

我们可以看到，满足如下情况时`didReceiveUpdate === false`（即可以直接复用前一次更新的`子Fiber`，不需要新建`子Fiber`）

1. `oldProps === newProps && workInProgress.type === current.type`，即`props`与`fiber.type`不变
2. `!includesSomeLane(renderLanes, updateLanes)`，即当前`Fiber节点`优先级不够，先忽略

```
if (current !== null) {
  const oldProps = current.memoizedProps;
  const newProps = workInProgress.pendingProps;

  if (
    oldProps !== newProps ||
    hasLegacyContextChanged() ||
    (__DEV__ ? workInProgress.type !== current.type : false)
  ) {
    didReceiveUpdate = true;
  } else if (!includesSomeLane(renderLanes, updateLanes)) {
    didReceiveUpdate = false;
    switch (
      workInProgress.tag
      // 省略处理
    ) {
    }
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  } else {
    didReceiveUpdate = false;
  }
} else {
  didReceiveUpdate = false;
}
```

当不满足可优化（Fiber复用的时候），就会新建子Fiber，根据不同的`Fiber.tag`进入不同类型的Fiber创建逻辑

```
// mount时：根据tag不同，创建不同的Fiber节点
switch (workInProgress.tag) {
  case IndeterminateComponent:
  // ...省略
  case LazyComponent:
  // ...省略
  case FunctionComponent:
  // ...省略
  case ClassComponent:
  // ...省略
  case HostRoot:
  // ...省略
  case HostComponent:
  // ...省略
  case HostText:
  // ...省略
  // ...省略其他类型
}
```

对于我们常见的组件类型，如`（FunctionComponent/ClassComponent/HostComponent）`，最终会进入`reconcileChildren`方法

- 对于`mount`的组件，他会创建新的`子Fiber节点`
- 对于`update`的组件，他会将当前组件与该组件在上次更新时对应的`Fiber节点`比较（也就是俗称的`Diff`算法），将比较的结果生成新`Fiber节点`

```
export function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes
) {
  if (current === null) {
    // 对于mount的组件
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes
    );
  } else {
    // 对于update的组件
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    );
  }
}
```

从代码可以看出，和`beginWork`一样，他也是通过`current === null ?`区分mount与update，不论走哪个逻辑，最终他会生成新的子Fiber节点并赋值给`workInProgress.child`，作为本次`beginWork`返回值，并作为下次`performUnitOfWork`执行时`workInProgress`的传参

我们知道，`render`阶段的工作是在内存中进行，而实际要执行DOM操作的具体类型就保存在`fiber.effectTag`中，比如：

```
// DOM需要插入到页面中
export const Placement = /*                */ 0b00000000000010;
// DOM需要更新
export const Update = /*                   */ 0b00000000000100;
// DOM需要插入到页面中并更新
export const PlacementAndUpdate = /*       */ 0b00000000000110;
// DOM需要删除
export const Deletion = /*                 */ 0b00000000001000;
```

#### **completeWork**

类似`beginWork`，`completeWork`也是针对不同`fiber.tag`调用不同的处理逻辑

```
function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null;
    case ClassComponent: {
      // ...省略
      return null;
    }
    case HostRoot: {
      // ...省略
      updateHostContainer(workInProgress);
      return null;
    }
    case HostComponent: {
      // ...省略
      return null;
    }
  // ...省略
```

我们重点关注页面渲染所必须的`HostComponent`（即原生DOM组件对应的Fiber节点）

和`beginWork`一样，我们根据`current === null ?`判断是`mount`还是`update`，同时针对`HostComponent`，判断`update`时我们还需要考虑`workInProgress.stateNode != null ?`（即该Fiber节点是否存在对应的DOM节点）

```
case HostComponent: {
  popHostContext(workInProgress);
  const rootContainerInstance = getRootHostContainer();
  const type = workInProgress.type;

  if (current !== null && workInProgress.stateNode != null) {
    // update的情况
    updateHostComponent(
    current,
    workInProgress,
    type,
    newProps,
    rootContainerInstance
    );
    // ...省略
  } else {
    // mount的情况
    // ...省略
  }
  return null;
}
```

当`update`时，Fiber节点已经存在对应DOM节点，所以不需要生成DOM节点。需要做的主要是处理props，比如：

- `onClick`、`onChange`等回调函数的注册
- 处理`style prop`
- 处理`DANGEROUSLY_SET_INNER_HTML prop`
- 处理`children prop`

在`updateHostComponent`内部，被处理完的`props`会被赋值给`workInProgress.updateQueue`，并最终会在commit阶段被渲染在页面上，其中`updateQueue`为数组形式，[源码戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberCompleteWork.new.js#L225)

同样，在`mount`时的主要逻辑包括三个：

- 为`Fiber节点`生成对应的`DOM节点`
- 将子孙`DOM节点`插入刚生成的`DOM节点`中
- 与`update`逻辑中的`updateHostComponent`类似的处理`props`的过程

```
// mount的情况
const currentHostContext = getHostContext();
// 为fiber创建对应DOM节点
const instance = createInstance(
  type,
  newProps,
  rootContainerInstance,
  currentHostContext,
  workInProgress
);
// 将子孙DOM节点插入刚生成的DOM节点中
appendAllChildren(instance, workInProgress, false, false);
// DOM节点赋值给fiber.stateNode
workInProgress.stateNode = instance;

// 与update逻辑中的updateHostComponent类似的处理props的过程
if (
  finalizeInitialChildren(
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext
  )
) {
  markUpdate(workInProgress);
}
```

按照之前的思路，在`mount`时，岂不是会给每个`Fiber`节点都添加插入的`Placement effectTag`，导致`commit`阶段去对每个DOM节点执行插入操作，实际上`mount`时只会在`rootFiber`节点上存在`Placement effectTag`。那么`commit阶段`是如何通过一次插入`DOM`操作将整棵`DOM树`插入页面的呢？

原因就在于`completeWork`中的`appendAllChildren`方法，由于`completeWork`属于"归"阶段调用的函数，每次调用`appendAllChildren`时都会将已生成的子孙`DOM节点`插入当前生成的`DOM节点`下。那么当"归"到`rootFiber`时，我们已经有一个构建好的离屏`DOM树`，直接将该`DOM树`一次性插入到页面中即可！

至此`render阶段`的绝大部分工作就完成了。

还有一个问题：作为`DOM`操作的依据，`commit阶段`需要找到所有有`effectTag`的`Fiber节点`并依次执行`effectTag`对应操作。难道需要在`commit阶段`再遍历一次`Fiber树`寻找`effectTag !== null`的`Fiber节点`么？这显然是很低效的。

为了解决这个问题，在`completeWork`的上层函数`completeUnitOfWork`中，每个执行完`completeWork`且存在`effectTag`的`Fiber节点`会被保存在一条被称为`effectList`的单向链表中。

`effectList`中第一个`Fiber节点`保存在`fiber.firstEffect`，最后一个元素保存在`fiber.lastEffect`。

类似`appendAllChildren`，在"归"阶段，所有有`effectTag`的`Fiber节点`都会被追加在`effectList`中，最终形成一条以`rootFiber.firstEffect`为起点的单向链表。

```
                       nextEffect         nextEffect
rootFiber.firstEffect -----------> fiber -----------> fiber
```

这样，在`commit阶段`只需要遍历`effectList`就能执行所有`effect`了，[源码戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1744)

React团队成员Dan Abramov用一句话比喻这个挂载在rootFiber节点上的`effectList`链表：`effectList`相较于`Fiber树`，就像圣诞树上挂的那一串彩灯。

### commit阶段

`commitRoot`方法是`commit阶段`工作的起点，`fiberRootNode`会作为传参。

在`rootFiber.firstEffect`上保存了一条需要执行`副作用`的`Fiber节点`的单向链表`effectList`，这些`Fiber节点`的`updateQueue`中保存了变化的`props`。

这些`副作用`对应的`DOM操作`在`commit`阶段执行。

除此之外，一些生命周期钩子（比如`componentDidXXX`）、`hook`（比如`useEffect`）需要在`commit`阶段执行。

`commit`阶段的主要工作分为三部分，[源码戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2001)：

- before mutation 阶段（执行`DOM`操作前）
- mutation 阶段（执行`DOM`操作）
- layout 阶段（执行`DOM`操作后）

#### before mutation阶段

`before mutation阶段`的代码很短，整个过程就是遍历`effectList`并调用`commitBeforeMutationEffects`函数处理，[源码戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2104-L2127)：

```
// 保存之前的优先级，以同步优先级执行，执行完毕后恢复之前优先级
const previousLanePriority = getCurrentUpdateLanePriority();
setCurrentUpdateLanePriority(SyncLanePriority);

// 将当前上下文标记为CommitContext，作为commit阶段的标志
const prevExecutionContext = executionContext;
executionContext |= CommitContext;

// 处理focus状态
focusedInstanceHandle = prepareForCommit(root.containerInfo);
shouldFireAfterActiveInstanceBlur = false;

// beforeMutation阶段的主函数
commitBeforeMutationEffects(finishedWork);

focusedInstanceHandle = null;
```

我们重点关注`beforeMutation`阶段的主函数`commitBeforeMutationEffects`做了什么

```
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    const current = nextEffect.alternate;

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag;

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect);
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects();
          return null;
        });
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
```

整体可以分为三部分：

1. 处理`DOM节点`渲染/删除后的 `autoFocus`、`blur` 逻辑
2. 调用`getSnapshotBeforeUpdate`生命周期钩子
3. 调度`useEffect`

主要关注2，3两点

- 调用`getSnapshotBeforeUpdate`：

从`React`v16开始，`componentWillXXX`钩子前增加了`UNSAFE_`前缀，是因为`Stack Reconciler`重构为`Fiber Reconciler`后，`render阶段`的任务可能中断/重新开始，对应的组件在`render阶段`的生命周期钩子（即`componentWillXXX`）可能触发多次，这种行为和`React`v15不一致，所以标记为`UNSAFE_`。

为此，`React`提供了替代的生命周期钩子`getSnapshotBeforeUpdate`，我们可以看见，`getSnapshotBeforeUpdate`是在`commit阶段`内的`before mutation阶段`调用的，由于`commit阶段`是同步的，所以不会遇到多次调用的问题。

- 调度`useEffect`

这几行代码内，`scheduleCallback`方法由`Scheduler`模块提供，用于以某个优先级异步调度一个回调函数。

```
// 调度useEffect
if ((effectTag & Passive) !== NoEffect) {
  if (!rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = true;
    scheduleCallback(NormalSchedulerPriority, () => {
      // 触发useEffect
      flushPassiveEffects();
      return null;
    });
  }
}
```

在此处，被异步调度的回调函数就是触发`useEffect`的方法`flushPassiveEffects`。

我们接下来讨论`useEffect`如何被异步调度，以及为什么要异步（而不是同步）调度。

在`completeWork`中我们讲到，`effectList`中保存了需要执行副作用的`Fiber节点`。其中副作用包括

- 插入`DOM节点`（Placement）
- 更新`DOM节点`（Update）
- 删除`DOM节点`（Deletion）

除此外，当一个`FunctionComponent`含有`useEffect`或`useLayoutEffect`，他对应的`Fiber节点`也会被赋值`effectTag`。

在`flushPassiveEffects`方法内部会遍历`rootWithPendingPassiveEffects`（即`effectList`）执行`effect`回调函数，我们再来看看`flushPassiveEffects`内部具体干了啥：

`flushPassiveEffects`内部会设置`优先级`，并执行`flushPassiveEffectsImpl`。

`flushPassiveEffectsImpl`主要做三件事：

- 调用该`useEffect`在上一次`render`时的销毁函数
- 调用该`useEffect`在本次`render`时的回调函数
- 如果存在同步任务，不需要等待下次`事件循环`的`宏任务`，提前执行他

这里只用关注前面两点，在React16版本中，第一步是同步执行的，在[官方文档](https://zh-hans.legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html#effect-cleanup-timing)中提到：

副作用清理函数（如果存在）在 React 16 中同步运行。我们发现，对于大型应用程序来说，这不是理想选择，因为同步会减缓屏幕的过渡（例如，切换标签）

基于这个原因，在React17+中，`useEffect`的两个阶段会在页面渲染后（`layout`阶段后）异步执行。

所以整个`useEffect`异步调用分为三步：

1. `before mutation阶段`在`scheduleCallback`中调度`flushPassiveEffects`
2. `layout阶段`之后将`effectList`赋值给`rootWithPendingPassiveEffects`
3. `scheduleCallback`触发`flushPassiveEffects`，`flushPassiveEffects`内部遍历`rootWithPendingPassiveEffects`

为什么要异步调用呢，[官方文档](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#timing-of-effects)是这么解释的：

与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作

可见，`useEffect`异步执行的原因主要是防止同步执行时阻塞浏览器渲染

总结一下，在`before mutation阶段`，会遍历`effectList`，依次执行：

1. 处理`DOM节点`渲染/删除后的 `autoFocus`、`blur`逻辑
2. 调用`getSnapshotBeforeUpdate`生命周期钩子
3. 调度`useEffect`

#### mutation阶段

类似`before mutation阶段`，`mutation阶段`也是遍历`effectList`，执行函数。这里执行的是`commitMutationEffects`

```
nextEffect = firstEffect;
do {
  try {
      commitMutationEffects(root, renderPriorityLevel);
    } catch (error) {
      invariant(nextEffect !== null, 'Should be working on an effect.');
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    }
} while (nextEffect !== null);
```

我们可以看到`commitMutationEffects`[源码](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L2328)：

```
function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  // 遍历effectList
  while (nextEffect !== null) {

    const effectTag = nextEffect.effectTag;

    // 根据 ContentReset effectTag重置文字节点
    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    // 更新ref
    if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }

    // 根据 effectTag 分别处理
    const primaryEffectTag =
      effectTag & (Placement | Update | Deletion | Hydrating);
    switch (primaryEffectTag) {
      // 插入DOM
      case Placement: {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~Placement;
        break;
      }
      // 插入DOM 并 更新DOM
      case PlacementAndUpdate: {
        // 插入
        commitPlacement(nextEffect);

        nextEffect.effectTag &= ~Placement;

        // 更新
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // SSR
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating;
        break;
      }
      // SSR
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating;

        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 更新DOM
      case Update: {
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 删除DOM
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel);
        break;
      }
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```

`commitMutationEffects`会遍历`effectList`，对每个`Fiber节点`执行如下三个操作：

1. 根据`ContentReset effectTag`重置文字节点
2. 更新`ref`
3. 根据`effectTag`分别处理，其中`effectTag`包括(`Placement` | `Update` | `Deletion` | `Hydrating`)

`Placement` 、`Update` `Deletion` 就是插入、更新、删除操作，`Hydrating`是服务端渲染相关操作，具体操作这里就不展开，主要工作就是：根据`effectTag`调用不同的处理函数处理`Fiber`

#### layout阶段

该阶段之所以称为`layout`，因为该阶段的代码都是在`DOM`修改完成（`mutation阶段`完成）后执行的。

那么问题来了，既然在`mutation`阶段就已经完成了DOM的修改，按理说就会进入到浏览器渲染流程，那为何还会有`layout`阶段？

答：因为JavaScript的执行会阻塞浏览器的渲染任务，直到当前的同步任务完成，React利用了这一点，确保在`mutation`阶段完成DOM操作后，立即执行`layout`阶段的相关函数，直到`layout`阶段完成后，React才将控制权交还给浏览器。

该阶段触发的生命周期钩子和`hook`可以直接访问到已经改变后的`DOM`

与前两个阶段类似，`layout阶段`也是遍历`effectList`，执行函数，具体执行的函数是`commitLayoutEffects`。

```
root.current = finishedWork;

nextEffect = firstEffect;
do {
  try {
    commitLayoutEffects(root, lanes);
  } catch (error) {
    invariant(nextEffect !== null, "Should be working on an effect.");
    captureCommitPhaseError(nextEffect, error);
    nextEffect = nextEffect.nextEffect;
  }
} while (nextEffect !== null);

nextEffect = null;
```

`commitLayoutEffects`一共做了两件事：

1. commitLayoutEffectOnFiber（调用`生命周期钩子`和`hook`相关操作）
2. commitAttachRef（赋值 ref）

`commitLayoutEffectOnFiber`方法会根据`fiber.tag`对不同类型的节点分别处理

- 对于`ClassComponent`，他会通过`current === null?`区分是`mount`还是`update`，调用`[componentDidMount](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L538)`或`[componentDidUpdate](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L592)`

触发`状态更新`的`this.setState`如果赋值了第二个参数`回调函数`，也会在此时调用

```
this.setState({ xxx: 1 }, () => {
  console.log("i am update~");
});
```

- 对于`FunctionComponent`及相关类型，他会调用`useLayoutEffect hook`的`回调函数`，调度`useEffect`的`销毁`与`回调`函数

`mutation阶段`会执行`useLayoutEffect hook`的`销毁函数`，结合这里我们可以发现，`useLayoutEffect hook`从上一次更新的`销毁函数`调用到本次更新的`回调函数`调用是同步执行的，而`useEffect`则需要先调度，在`Layout阶段`完成后再异步执行。

这就是`useLayoutEffect`与`useEffect`的区别。

`commitLayoutEffects`会做的第二件事是`commitAttachRef`，代码逻辑很简单：获取`DOM`实例，更新`ref`

```
function commitAttachRef(finishedWork: Fiber) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    const instance = finishedWork.stateNode;

    // 获取DOM实例
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }

    if (typeof ref === "function") {
      // 如果ref是函数形式，调用回调函数
      ref(instanceToUse);
    } else {
      // 如果ref是ref实例形式，赋值ref.current
      ref.current = instanceToUse;
    }
  }
}
```

最后需要关注一下[这行代码](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2022)`root.current = finishedWork`，它发生在`mutation阶段`结束后，`layout阶段`开始前，这行代码的作用就是切换`fiberRootNode`指向的`current Fiber树`。所以可以得知：

- `componentWillUnmount`会在`mutation阶段`执行，此时`current Fiber树`还指向前一次更新的`Fiber树`，在生命周期钩子内获取的`DOM`还是更新前的；
- `componentDidMount`和`componentDidUpdate`会在`layout阶段`执行。此时`current Fiber树`已经指向更新后的`Fiber树`，在生命周期钩子内获取的`DOM`就是更新后的。

### Concurrent Mode

顾名思义，concurrent mode（并发模式），从上文我们知道，React选择的是通过快速响应用户来提高使用体验，其核心思路分为两点：异步可中断+优先级调度。我们通过一副图来理解：

- 底层架构 —— Fiber架构：`Fiber`架构的意义在于，他将单个`组件`作为`工作单元`，使以`组件`为粒度的“异步可中断的更新”成为可能。
- 架构的驱动力 —— Scheduler：如果我们同步运行`Fiber`架构，则`Fiber`架构与重构前并无区别，但是当我们配合`时间切片`，就能根据宿主环境性能，为每个`工作单元`分配一个`可运行时间`，实现"异步可中断的更新"，也就是`Scheduler`（调度器）
- 架构运行策略 —— lane模型：当一次`更新`在运行过程中被中断，转而重新开始一次新的`更新`，我们可以说：后一次`更新`打断了前一次`更新`。这就是`优先级`的概念：后一次`更新`的`优先级`更高，他打断了正在进行的前一次`更新`。多个`优先级`之间如何互相打断？`优先级`能否升降？本次`更新`应该赋予什么`优先级`？这就需要一个模型控制不同`优先级`之间的关系与行为，于是`lane`模型诞生了

#### Scheduler原理

Scheduler主要包含两个功能：时间分片、优先级调度

时间分片原理：`时间切片`的本质是模拟实现[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

除去"浏览器渲染"，下图是浏览器一帧中可以用于执行`JS`的时机

```
一个task(宏任务) -- 队列中全部job(微任务) -- requestAnimationFrame -- 浏览器渲染 -- requestIdleCallback
```

`requestIdleCallback`是在"浏览器渲染"后如果当前帧还有空余时间时被调用的，浏览器并没有提供其他`API`能够在同样的时机（浏览器渲染后）调用以模拟其实现。

唯一能精准控制调用时机的`API`是`requestAnimationFrame`，他能让我们在"浏览器渲染"之前执行`JS`，

这也是为什么我们通常用这个`API`实现`JS`动画 —— 这是浏览器渲染前的最后时机，所以动画能快速被渲染。

所以，退而求其次，`Scheduler`的`时间切片`功能是通过`task`（宏任务）实现的。

最常见的`task`当属`setTimeout`了。但是有个`task`比`setTimeout`执行时机更靠前，那就是[MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

所以`Scheduler`将需要被执行的回调函数作为`MessageChannel`的回调执行。如果当前宿主环境不支持`MessageChannel`，则使用`setTimeout`

你可以在[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L228-L234)看到`MessageChannel`的实现。[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L47-L55)看到`setTimeout`的实现

每次遍历前，都会通过`Scheduler`提供的`shouldYield`方法判断是否需要中断遍历，使浏览器有时间渲染：

```
function workLoopConcurrent() {
// Perform work until Scheduler asks us to yield
while (workInProgress !== null && !shouldYield()) {
performUnitOfWork(workInProgress);
}}
```

是否中断的依据，最重要的一点便是每个任务的剩余时间是否用完，没用完继续执行，用完了则中断执行把控制权交给浏览器。

在`Schdeduler`中，为任务分配的初始剩余时间为`5ms`，随着应用运行，会通过`fps`动态调整分配给任务的可执行时间

上面解释了如何中断，那么它又是如何重新启动调度的呢？

首先我们来了解`优先级`的来源，需要明确的一点是，`Scheduler`是独立于`React`的包，所以他的`优先级`也是独立于`React`的`优先级`的。

`Scheduler`对外暴露了一个方法[unstable_runWithPriority](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/Scheduler.js#L217-L237)，这个方法接受一个`优先级`与一个`回调函数`，在`回调函数`内部调用获取`优先级`的方法都会取得第一个参数对应的`优先级`：

可以看到，`Scheduler`内部存在5种优先级，在`React`内部凡是涉及到`优先级`调度的地方，都会使用`unstable_runWithPriority`。

比如，我们知道`commit`阶段是同步执行的。可以看到，`commit`阶段的起点`commitRoot`方法的优先级为`ImmediateSchedulerPriority`，`ImmediateSchedulerPriority`即`ImmediatePriority`的别名，为最高优先级，会立即执行。

```
function commitRoot(root) {
const renderPriorityLevel = getCurrentPriorityLevel();
runWithPriority(
    ImmediateSchedulerPriority,
    commitRootImpl.bind(null, root, renderPriorityLevel),
);
return null;
}
```

`Scheduler`对外暴露最重要的方法便是[unstable_scheduleCallback](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/Scheduler.js#L279-L359)。该方法用于以某个`优先级`注册回调函数。

比如在`React`中，之前讲过在`commit`阶段的`beforeMutation`阶段会调度`useEffect`的回调：

```
if (!rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = true;
  scheduleCallback(NormalSchedulerPriority, () => {
  flushPassiveEffects();
  return null;
  });
  }
```

这里的回调便是通过`scheduleCallback`调度的，优先级为`NormalSchedulerPriority`，即`NormalPriority`

不同`优先级`意味着什么？不同`优先级`意味着不同时长的任务过期时间：

```
var timeout;
switch (priorityLevel) {
case ImmediatePriority:
timeout = IMMEDIATE_PRIORITY_TIMEOUT;
break;
case UserBlockingPriority:
timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
break;
case IdlePriority:
timeout = IDLE_PRIORITY_TIMEOUT;
break;
case LowPriority:
timeout = LOW_PRIORITY_TIMEOUT;
break;
case NormalPriority:default:
timeout = NORMAL_PRIORITY_TIMEOUT;
break;
}
var expirationTime = startTime + timeout;
```

其中：

```
// Times out immediatelyvar 
IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
```

可以看到，如果一个任务的`优先级`是`ImmediatePriority`，对应`IMMEDIATE_PRIORITY_TIMEOUT`为`-1`，那么`var expirationTime = startTime - 1;`则该任务的过期时间比当前时间还短，表示他已经过期了，需要立即被执行。

我们已经知道`优先级`意味着任务的过期时间。设想一个大型`React`项目，在某一刻，存在很多不同`优先级`的`任务`，对应不同的过期时间。

同时，又因为任务可以被延迟，所以我们可以将这些任务按是否被延迟分为：

- 已就绪任务
- 未就绪任务

所以，`Scheduler`存在两个队列：

- timerQueue：保存未就绪任务
- taskQueue：保存已就绪任务

每当有新的未就绪的任务被注册，我们将其插入`timerQueue`并根据开始时间重新排列`timerQueue`中任务的顺序。

当`timerQueue`中有任务就绪，即`startTime <= currentTime`，我们将其取出并加入`taskQueue`。

取出`taskQueue`中最早过期的任务并执行他。

为了能在O(1)复杂度找到两个队列中时间最早的那个任务，`Scheduler`使用[小顶堆](https://leetcode.cn/problems/kth-largest-element-in-an-array/description/)实现了`优先级队列`，[源码戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/SchedulerMinHeap.js)，而前面被中断的任务就存放在taskQueue中，等待下次调度时执行。

总结一下：React Fiber的更新过程中会产生很多任务，而这些任务都会交给Scheduler来根据不同优先级以及浏览器空闲时间来调度执行，这些任务执行的目的主要是为了得到新的WIP树，然后将WIP传入commit阶段，完成页面渲染。

#### Lane模型

一句话理解Lane模型：一种"优先级调度策略"，它通过为不同的更新任务分配不同的优先级（车道），让 React 能够优先处理紧急的任务（如用户交互），而把不那么紧急的任务（如后台数据加载）放到后面执行，从而让界面更流畅。

上文提到`Scheduler`与`React`是两套优先级机制，在`React`中，存在多种使用不同`优先级`的情况，比如：

- 过期任务或者同步任务使用`同步`优先级
- 用户交互产生的更新（比如点击事件）使用高优先级
- 网络请求产生的更新使用一般优先级
- `Suspense`使用低优先级

`React`需要设计一套满足如下需要的`优先级`机制：

- 可以表示`优先级`的不同
- 可能同时存在几个同`优先级`的`更新`，所以还得能表示`批`的概念
- 方便进行`优先级`相关计算

为了满足如上需求，`React`设计了`lane`模型，接下来我们来看`lane`模型如何满足以上3个条件：

`lane`模型也叫车道模型，想象你身处赛车场，不同的赛车疾驰在不同的赛道。内圈的赛道总长度更短，外圈更长，某几个临近的赛道的长度可以看作差不多长。

`lane`模型借鉴了同样的概念，使用31位的二进制表示31条赛道，位数越小的赛道`优先级`越高，某些相邻的赛道拥有相同`优先级`。

```
export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000;
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000;

export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;
export const SyncBatchedLane: Lane = /*                 */ 0b0000000000000000000000000000010;

export const InputDiscreteHydrationLane: Lane = /*      */ 0b0000000000000000000000000000100;
const InputDiscreteLanes: Lanes = /*                    */ 0b0000000000000000000000000011000;

const InputContinuousHydrationLane: Lane = /*           */ 0b0000000000000000000000000100000;
const InputContinuousLanes: Lanes = /*                  */ 0b0000000000000000000000011000000;

export const DefaultHydrationLane: Lane = /*            */ 0b0000000000000000000000100000000;
export const DefaultLanes: Lanes = /*                   */ 0b0000000000000000000111000000000;

const TransitionHydrationLane: Lane = /*                */ 0b0000000000000000001000000000000;
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111110000000000000;

const RetryLanes: Lanes = /*                            */ 0b0000011110000000000000000000000;

export const SomeRetryLane: Lanes = /*                  */ 0b0000010000000000000000000000000;

export const SelectiveHydrationLane: Lane = /*          */ 0b0000100000000000000000000000000;

const NonIdleLanes = /*                                 */ 0b0000111111111111111111111111111;

export const IdleHydrationLane: Lane = /*               */ 0b0001000000000000000000000000000;
const IdleLanes: Lanes = /*                             */ 0b0110000000000000000000000000000;

export const OffscreenLane: Lane = /*                   */ 0b1000000000000000000000000000000;
```

其中，同步优先级占用的赛道为第一位：

```
export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;
```

从`SyncLane`往下一直到`SelectiveHydrationLane`，赛道的`优先级`逐步降低，可以看到其中有几个变量占用了几条赛道，比如：

```
const InputDiscreteLanes: Lanes = /*                    */ 0b0000000000000000000000000011000;
export const DefaultLanes: Lanes = /*                   */ 0b0000000000000000000111000000000;
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111110000000000000;
```

这就是`批`的概念，被称作`lanes`（区别于`优先级`的`lane`），其中`InputDiscreteLanes`是"用户交互"触发更新会拥有的`优先级`范围。

`DefaultLanes`是“请求数据返回后触发更新”拥有的`优先级`范围。

`TransitionLanes`是`Suspense`、`useTransition`、`useDeferredValue`拥有的`优先级`范围。

这其中有个细节，越低`优先级`的`lanes`占用的位越多。比如`InputDiscreteLanes`占了2个位，`TransitionLanes`占了9个位。

原因在于：越低`优先级`的`更新`越容易被打断，导致积压下来，所以需要更多的位。相反，最高优的同步更新的`SyncLane`不需要多余的`lanes`

为什么优先级使用二进制来表示呢？**当然是为了方便进行优先级计算**。

比如：计算`a`、`b`两个`lane`是否存在交集，只需要判断`a`与`b`按位与的结果是否为`0`：

```
export function includesSomeLane(a: Lanes | Lane, b: Lanes | Lane) {
return (a & b) !== NoLanes;
}
```

计算`b`这个`lanes`是否是`a`对应的`lanes`的子集，只需要判断`a`与`b`按位与的结果是否为`b`：

```
export function isSubsetOfLanes(set: Lanes, subset: Lanes | Lane) {
return (set & subset) === subset;
}
```

将两个`lane`或`lanes`的位合并只需要执行按位或操作：

```
export function mergeLanes(a: Lanes | Lane, b: Lanes | Lane): Lanes {
return a | b;
}
```

从`set`对应`lanes`中移除`subset`对应`lane`（或`lanes`），只需要对`subset`的`lane`（或`lanes`）执行按位非，结果再对`set`执行按位与。

```
export function removeLanes(set: Lanes, subset: Lanes | Lane): Lanes {
return set & ~subset;
}
```

既然Scheduler优先级与React优先级是两套机制，最终都使用的`lane模型`，则需要对`SchedulerPriority`转换成`LanePriority`，转换的桥梁正是`ReactPriorityLevel`

```
// 把 SchedulerPriority 转换成 ReactPriorityLevel
export function getCurrentPriorityLevel(): ReactPriorityLevel {
  switch (Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return ImmediatePriority;
    case Scheduler_UserBlockingPriority:
      return UserBlockingPriority;
    case Scheduler_NormalPriority:
      return NormalPriority;
    case Scheduler_LowPriority:
      return LowPriority;
    case Scheduler_IdlePriority:
      return IdlePriority;
    default:
      invariant(false, 'Unknown priority level.');
  }
}

// 把 ReactPriorityLevel 转换成 SchedulerPriority
function reactPriorityToSchedulerPriority(reactPriorityLevel) {
  switch (reactPriorityLevel) {
    case ImmediatePriority:
      return Scheduler_ImmediatePriority;
    case UserBlockingPriority:
      return Scheduler_UserBlockingPriority;
    case NormalPriority:
      return Scheduler_NormalPriority;
    case LowPriority:
      return Scheduler_LowPriority;
    case IdlePriority:
      return Scheduler_IdlePriority;
    default:
      invariant(false, 'Unknown priority level.');
  }
}
```

## 总结

现在来看一副图，上面大致描述了react工作流程，主要由两大工作循环组成：`任务调度循环`和`fiber构造循环`

前面说了一大堆，React并发模式就是为了让小人可以练就凌波微步，它脚下的坑就是浏览器的调用栈，**并发模式下就不会挖大坑，而是一小坑一小坑的挖，挖一下休息一下，有紧急任务就优先去做**

但是它肯定不是完美的，**因为浏览器不是抢占式调度**，**无法阻止开发者做傻事**，开发者可以随心所欲，想挖多大的坑，就挖多大的坑。当然，如果我们能把更新做得足够快的话，理论上就不需要时间分片，也不需要并发模式了。

尤雨溪说过：React Fiber本质上是为了解决React更新低效率的问题，**不要期望Fiber能给你现有应用带来质的提升，如果性能问题是自己造成的，自己的锅还是得自己背。**

最后提几个问题，看看大家是不是对核心概念有所掌握！

由虚拟DOM变为Fiber的数据结构核心是什么？

答：同步递归调用——>异步可中断。

假如在构建WIP树的过程中出现异常，是什么机制避免整棵树挂掉？

答：双缓存机制。

在React15中，Reconciler阶段会有如下一些生命周期钩子函数：

`shouldComponentUpdate`

`componentWillMount` 废弃

`componentWillUpdate` 废弃

...

而在commit阶段会有如下一些生命周期钩子函数：

`getSnapshotBeforeUpdate()`

`componentDidMount`

`componentDidUpdate`

`componentWillUnmount`

请问为什么不建议在`componentWillMount`、`componentWillUpdate`中包含副作用，属于不安全操作，以至于React.v17后直接废弃了这些可能包含副作用的生命周期方法？

答：Reconciler阶段是异步可中断的，这个阶段的生命周期函数很可能会由于中断/恢复被多次触发，因此属于不安全操作，需要挪到commit阶段的生命周期函数中进行同步执行。

参考资料：

[React技术揭秘](https://react.iamkasong.com/preparation/idea.html)

[【React】Fiber 实现可中断的渲染](https://juejin.cn/post/7092419515748712456)

[这可能是最通俗的 React Fiber(时间分片) 打开方式](https://juejin.cn/post/6844903975112671239)

[How does React 18 work inside?](https://dev.to/ktmouk/how-does-react-18-work-inside-1c8l)

[两大工作循环](https://7km.top/main/workloop)

[Understanding DOM, Virtual DOM, and How They Work with React](https://pieces.app/blog/dom-virtual-dom-react)

[Reconciliation – React](https://legacy.reactjs.org/docs/reconciliation.html)

[深入源码剖析componentWillXXX为什么UNSAFE](https://juejin.cn/post/6847902224287285255)

[effect 的执行时机](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#timing-of-effects)

[副作用清理时机](https://zh-hans.legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html#effect-cleanup-timing)