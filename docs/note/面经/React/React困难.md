# React 困难面试题

> 说明：这份文档聚焦 React 面试里容易被继续深挖的难点。  
> 建议答题方式：先给结论，再讲原理，最后补一个实际场景或优化方案。

## 1. React 的虚拟 DOM 和 Vue 的虚拟 DOM 有什么区别？

### 先说结论

两者都使用虚拟 DOM，但优化思路不同：

- React 更偏向“运行时协调”，组件执行后得到新的 React Element Tree，再通过 Diff 找出变更。
- Vue 尤其是 Vue 3，更偏向“编译期 + 运行时结合优化”，会在编译阶段标记动态节点、静态节点，减少运行时比较成本。

### React 的特点

- React 组件重新执行后，会得到新的虚拟节点树。
- React 的 Diff 是一种启发式 O(n) 算法，不会做完整树编辑距离计算，否则成本太高。
- React 默认假设：
  - 不同类型的节点，直接视为不同子树。
  - 同层级节点主要依赖 `key` 判断复用关系。
- React 的性能优化更依赖开发者控制引用稳定性，比如：
  - `React.memo`
  - `useMemo`
  - `useCallback`
  - 合理拆分组件

### Vue 的特点

- Vue 也有虚拟 DOM，但 Vue 3 在模板编译阶段会生成更多优化信息。
- Vue 会通过 Patch Flags、静态提升、Block Tree 等机制减少不必要的 Diff。
- Vue 的模板编译器知道哪些节点是静态的、哪些属性是动态的，因此运行时更容易精准更新。

### 面试回答重点

- React 和 Vue 都不是“直接操作 DOM”，而是先构建一层虚拟表示，再做最小化更新。
- React 更强调运行时的组件重执行与协调。
- Vue 更擅长借助编译器把“哪里会变”提前告诉运行时。
- 所以不能简单说谁的虚拟 DOM 一定更快，真实性能还取决于组件结构、状态设计、编译优化和业务场景。

### 常见追问

#### React 的 Diff 为什么快？

因为它没有做最优 Diff，而是基于经验假设做启发式比较，用更低的时间复杂度换足够好的结果。

#### 为什么 `key` 很重要？

因为列表节点复用主要靠 `key` 判断。`key` 不稳定会导致节点错位、状态串位、无效重建。

## 2. React Fiber 是什么？解决了什么问题？

### 先说结论

Fiber 是 React 16 以后重写的协调架构。它把原来一次性递归执行完的更新过程，拆成了可中断、可恢复、可分优先级的工作单元。

### 它解决了什么问题

旧版本 React 在更新很重时，可能长时间占用主线程，导致：

- 输入卡顿
- 动画掉帧
- 页面失去响应

Fiber 解决的是“更新任务调度能力不足”的问题，而不只是“Diff 快不快”的问题。

### Fiber 的核心思想

- 每个 Fiber 节点都可以理解成一个工作单元。
- React 在 `render` 阶段可以把工作拆开做。
- 高优先级任务来了，可以暂停低优先级任务，先响应更重要的更新。
- 完成计算后，再进入不可中断的 `commit` 阶段，把变更真正提交到 DOM。

### 两个关键阶段

#### 1. Render 阶段

- 计算新树
- 可中断
- 可恢复
- 可重复执行
- 不会真正改 DOM

#### 2. Commit 阶段

- 真正提交变更到 DOM
- 执行 layout effect
- 执行 ref 赋值等副作用
- 不可中断

### 面试回答模板

可以这样答：

> Fiber 本质上是 React 的新协调架构。它把组件更新拆成更细粒度的任务，让 React 可以按优先级调度，必要时中断低优先级渲染，先处理用户输入这类高优先级任务。这样 React 才能支持并发渲染、Transition、更流畅的交互体验。

### 常见追问

#### Fiber 是不是多线程？

不是。React 仍然主要运行在 JavaScript 主线程。Fiber 是“任务切片 + 调度”，不是浏览器层面的多线程渲染。

#### Fiber 和虚拟 DOM 的关系？

- 虚拟 DOM 更偏“UI 的抽象表示”。
- Fiber 更偏“React 内部的调度和协调数据结构”。

## 3. `setState` / `useState` 到底是同步还是异步？

### 先说结论

严格来说，它们不是“同步”也不是“异步”的简单二选一，而是“更新会被调度”。你调用 setter 后，React 不一定立刻把新值反映到当前这次执行上下文里。

### 为什么很多人觉得它是异步的

因为下面这种代码通常拿到的还是旧值：

```jsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count); // 通常还是旧值
}
```

这是因为：

- 当前函数执行时拿到的是这一次渲染的快照
- `setCount` 是向 React 提交更新
- 真正的新值会在下一次渲染中体现

### React 18 之后的批量更新

React 18 开始，批量更新范围更广，常见异步场景也会自动批处理，例如：

- 事件回调
- `setTimeout`
- Promise 回调
- 原生事件回调中的部分场景

这意味着多个状态更新往往会合并成一次渲染。

### 为什么会出现“加两次只加一”

```jsx
setCount(count + 1);
setCount(count + 1);
```

因为两次都读取了同一个旧的 `count`。

正确写法：

```jsx
setCount(c => c + 1);
setCount(c => c + 1);
```

### 什么时候会强制同步刷新

极少数场景下可以用 `flushSync`：

```jsx
import { flushSync } from 'react-dom';

flushSync(() => {
  setCount(c => c + 1);
});
```

但这属于强制打断调度，不能滥用。

### 面试回答重点

- state 更新本质上是“入队并等待 React 调度”。
- 在同一次函数执行里读到旧值是正常现象。
- 依赖旧值更新时，用函数式更新。
- React 18 之后自动批量更新范围更广。

## 4. React 中 `key` 的作用是什么？为什么不推荐用 index？

### 先说结论

`key` 的作用不是给你消除警告，而是帮助 React 在同层级节点中识别“谁是谁”，从而决定节点复用、移动、删除还是重建。

### React 怎么用 `key`

在列表更新时，React 会比较：

- 节点类型
- 节点位置
- `key`

如果 `key` 稳定，React 就更容易知道：

- 这个节点是原来的那个
- 只是内容变了
- 还是位置变了

### 为什么不推荐用 index

当列表会发生这些操作时：

- 插入
- 删除
- 排序
- 过滤

`index` 会变化，导致 React 误以为节点身份变了，出现：

- 组件状态错位
- 输入框内容串位
- DOM 无谓重建
- 动画异常

### 什么场景可以用 index

只有在下面条件同时成立时才勉强可以：

- 列表是纯静态的
- 不会重排
- 不会插入删除
- 没有局部状态问题

### 标准答法

> `key` 的本质是节点身份标识。React 的列表 Diff 依赖它做节点复用。如果用不稳定的 `key`，尤其是 `index`，在增删改排序时容易导致状态错位，所以应该优先使用业务上的唯一 ID。

## 5. React 的渲染流程和 Reconciliation 是什么？

### 先说结论

React 的更新不是“数据一变立刻改 DOM”，而是先重新计算组件树，再通过协调过程找出差异，最后一次性提交到 DOM。

### 一个更新的大致过程

#### 1. 触发更新

- `setState`
- `dispatch`
- 父组件重新渲染
- Context 值变化

#### 2. 进入 render 阶段

- 重新执行相关组件
- 生成新的 React Element Tree
- 和旧 Fiber Tree 对比
- 标记哪些节点需要新增、更新、删除

#### 3. 进入 commit 阶段

- 更新 DOM
- 清理旧 Effect
- 执行新 Effect
- 更新 ref

### Reconciliation 是什么

Reconciliation 就是“协调新旧树差异”的过程，本质上回答两个问题：

- 哪些节点能复用？
- 哪些节点必须重建？

### 什么时候组件会重新渲染

组件重新渲染并不等于 DOM 一定变化。组件函数重新执行，只是说明 React 需要重新计算 UI。

例如：

- 父组件渲染了，子组件可能也会重新执行
- 但如果比较后发现生成结果没变，最终 DOM 可能完全不动

### 面试常见陷阱

不要把下面几个概念混为一谈：

- 组件函数执行
- 虚拟 DOM 对比
- 真实 DOM 更新

它们不是一回事。

## 6. `useEffect`、`useLayoutEffect`、`useInsertionEffect` 有什么区别？

### 先说结论

- `useEffect`：大多数副作用都用它，执行时机在浏览器绘制之后。
- `useLayoutEffect`：在浏览器绘制前执行，适合读写布局。
- `useInsertionEffect`：比 layout effect 更早，主要给 CSS-in-JS 库注入样式。

### `useEffect`

适合：

- 请求订阅
- 事件监听
- 定时器
- 日志上报

特点：

- 不阻塞浏览器绘制
- 是大多数业务场景的默认选择

### `useLayoutEffect`

适合：

- 测量 DOM 尺寸
- 同步滚动位置
- 避免闪动

特点：

- 会阻塞浏览器绘制
- 如果只是普通副作用，不要上来就用它

### `useInsertionEffect`

适合：

- CSS-in-JS 库插入样式

特点：

- 业务开发几乎很少直接用
- 它不是做接口请求的

### 面试答法

> 绝大多数副作用优先用 `useEffect`。只有在必须“先读布局、再让浏览器绘制”时才用 `useLayoutEffect`。`useInsertionEffect` 主要给样式库使用，普通业务几乎不用。

## 7. 为什么 Hooks 不能写在条件判断、循环、普通函数里？

### 先说结论

因为 React 识别 Hook 不是靠名字，而是靠“调用顺序”。

### 原理

React 在执行函数组件时，会按顺序记录 Hook：

```jsx
useState(...)
useEffect(...)
useMemo(...)
```

React 默认认为：

- 第 1 个 Hook 是谁
- 第 2 个 Hook 是谁
- 第 3 个 Hook 是谁

如果你把 Hook 写进条件里：

```jsx
if (visible) {
  useEffect(() => {}, []);
}
```

那么下一次 `visible` 变了，Hook 调用顺序就变了，React 就无法正确把 state、effect、memo 对回原来的位置。

### 为什么自定义 Hook 可以调用 Hook

因为自定义 Hook 本质上仍然是在组件顶层按固定顺序执行，只是把这段逻辑抽成了函数。

### 标准答法

> Hook 的核心依赖是调用顺序稳定。React 不是通过变量名识别 Hook，而是通过当前渲染中第几个 Hook 来对应内部状态。所以 Hook 只能写在函数组件或自定义 Hook 的顶层，不能放在条件、循环、嵌套函数里。

## 8. `React.memo`、`useMemo`、`useCallback` 有什么区别？

### 先说结论

这三个都和“减少不必要的重复工作”有关，但优化对象不同：

- `React.memo`：缓存组件渲染结果，优化“组件”
- `useMemo`：缓存计算结果，优化“值”
- `useCallback`：缓存函数引用，优化“函数”

### `React.memo`

```jsx
const Child = React.memo(function Child({ value }) {
  return <div>{value}</div>;
});
```

作用：

- 当 props 没变时，跳过子组件重新渲染

注意：

- 只做浅比较
- 如果传入的是新对象、新函数，仍然可能失效

### `useMemo`

```jsx
const list = useMemo(() => heavyCompute(data), [data]);
```

作用：

- 避免昂贵计算重复执行

注意：

- 不要为了“看起来高级”而乱用
- 计算不重时，收益可能还不如开销

### `useCallback`

```jsx
const onClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

作用：

- 保持函数引用稳定

常见场景：

- 传给 `React.memo` 子组件
- 作为依赖项传给其他 Hook

### 一句话区分

- 组件重不重渲染，看 `React.memo`
- 值要不要重复算，看 `useMemo`
- 函数要不要换引用，看 `useCallback`

## 9. Context 有什么性能问题？怎么优化？

### 先说结论

Context 很方便，但它不是免费的全局状态工具。只要 Provider 的 `value` 引用变了，所有消费这个 Context 的组件都有可能重新渲染。

### 常见性能问题

```jsx
<UserContext.Provider value={{ user, logout }}>
  {children}
</UserContext.Provider>
```

这里的问题是：

- 每次父组件渲染，`value` 都是新对象
- 所有 `useContext(UserContext)` 的组件都可能重新渲染

### 优化方法

#### 1. 拆 Context

不要把所有东西都塞进一个 Context。

例如拆成：

- 用户信息 Context
- 主题 Context
- 权限 Context

#### 2. 稳定 `value` 引用

```jsx
const value = useMemo(() => ({ user, logout }), [user, logout]);
```

#### 3. 组件拆分

把读取 Context 的外层组件和真正重渲染的业务组件拆开。

#### 4. 高频全局状态不要强行只靠 Context

比如：

- 大型表单
- 高频输入
- 大量列表项共享状态

这类场景更适合：

- Zustand
- Redux Toolkit
- Jotai
- 或其他支持 selector 的状态管理方案

### 面试答法

> Context 适合低频共享数据，比如主题、登录态、语言配置。它的主要性能问题在于 Provider 的 `value` 变化会导致消费者重新渲染，所以要控制 value 引用稳定、按领域拆分 Context，高频复杂状态不要全压在 Context 上。

## 10. 受控组件和非受控组件有什么区别？

### 先说结论

- 受控组件：表单值由 React state 控制。
- 非受控组件：表单值主要保存在 DOM 自己内部，通过 ref 去读取。

### 受控组件

```jsx
const [value, setValue] = useState('');

<input value={value} onChange={e => setValue(e.target.value)} />
```

优点：

- 数据流清晰
- 容易校验
- 容易联动
- 容易做受控显示

缺点：

- 高频输入时每次都触发 React 更新

### 非受控组件

```jsx
const inputRef = useRef(null);

<input ref={inputRef} />
```

优点：

- 简单
- 某些场景性能更轻

缺点：

- 状态不在 React 手里
- 联动和校验没那么直观

### 实战怎么选

- 普通业务表单，大多数用受控组件
- 文件上传、简单原生表单、某些性能敏感场景，可以考虑非受控
- 大型复杂表单常结合表单库做局部优化

## 11. React 并发渲染是什么？`startTransition` 和 `useDeferredValue` 怎么理解？

### 先说结论

并发渲染不是“同时渲染多个页面”，而是 React 可以把更新分优先级，让紧急更新先响应，不紧急更新延后处理。

### 什么叫紧急更新

例如：

- 输入框跟手输入
- 按钮点击反馈
- 光标移动

这类操作必须立即响应。

### 什么叫非紧急更新

例如：

- 搜索结果列表刷新
- 大图表重算
- 大列表过滤

这类更新可以稍微晚一点，但不能卡住输入。

### `startTransition`

```jsx
startTransition(() => {
  setKeyword(next);
});
```

意思是：把这批更新标记成“可以稍后处理”。

常见场景：

- 切换 tab
- 路由跳转
- 大列表筛选

### `useDeferredValue`

```jsx
const deferredQuery = useDeferredValue(query);
```

意思是：原值先更新，衍生使用的值晚一点跟上。

常见场景：

- 输入框立即响应
- 搜索结果使用延迟值更新

### 二者区别

- `startTransition` 是给“更新操作”降优先级
- `useDeferredValue` 是给“值的消费”降优先级

### 面试答法

> React 并发渲染的核心是调度，不是多线程。`startTransition` 适合把一批非紧急状态更新放到后台，`useDeferredValue` 更适合让某个值的重计算结果稍后更新，从而保证关键交互流畅。

## 12. Suspense 的原理是什么？它只用于懒加载吗？

### 先说结论

不是。Suspense 的本质是“组件在还没准备好时，先展示 fallback，等准备好后再切回正式内容”。

### 常见使用场景

#### 1. 代码分割

```jsx
const Page = React.lazy(() => import('./Page'));
```

这是最常见的 Suspense 用法。

#### 2. 数据读取

在支持 Suspense 的数据读取方案里，组件可以在“数据还没准备好”时挂起，交给上层 Suspense 显示 loading。

### 它的意义

- 把“等待中”这件事交给边界统一处理
- 让异步内容的 loading 组织方式更声明式

### 注意点

- Suspense 不是普通 `fetch + useEffect` 的自动替代品
- 要配合支持 Suspense 的数据读取模式、框架或资源缓存机制

## 13. SSR 和 Hydration 是什么？为什么会出现水合不一致？

### 先说结论

- SSR：服务端先把 HTML 渲染出来，浏览器拿到后先展示。
- Hydration：客户端 React 接管这段现成 HTML，使其变成可交互应用。

### 为什么要 Hydration

因为服务端返回的只是 HTML，不带完整交互能力。浏览器仍然需要执行客户端 React，把事件、状态、组件逻辑接上去。

### 常见水合不一致原因

#### 1. 服务端和客户端渲染结果不同

例如：

- 使用 `Math.random()`
- 使用 `Date.now()`
- 直接读取浏览器环境变量
- 客户端和服务端条件分支不一致

#### 2. 在渲染阶段访问浏览器专属 API

例如：

- `window`
- `document`
- `localStorage`

服务端没有这些对象。

#### 3. 异步数据不一致

服务端一套数据，客户端初次渲染又拿了另一套。

### 怎么避免

- 保证首屏渲染输出稳定一致
- 浏览器专属逻辑放进 `useEffect`
- 服务端和客户端共用同一份初始数据
- 合理使用框架提供的数据获取方案

## 14. React 事件机制和原生事件有什么区别？

### 先说结论

React 事件不是简单把原生事件直接绑定到每个 DOM 上，而是封装了一层合成事件（SyntheticEvent），并在顶层做统一分发。

### 合成事件的意义

- 抹平浏览器差异
- 统一事件行为
- 方便 React 事件系统接入调度机制

### 和原生事件的区别

- React 里拿到的是合成事件对象
- 事件传播仍然有捕获和冒泡阶段
- React 会自己管理事件分发

### 面试延伸

以前常说 React 做了“事件委托到 document”，现代版本实现细节有调整，但面试里更重要的是理解：

- React 有一层自己的事件系统
- 这层系统能更好地和组件模型、更新调度配合

## 15. React 为什么强调不可变数据？

### 先说结论

因为 React 的很多优化依赖引用比较。如果你直接修改原对象，React 很难低成本判断“它到底变没变”。

### 典型例子

错误写法：

```jsx
state.user.name = 'Tom';
setState(state);
```

问题：

- 对象引用可能没变
- React 和 memo 化逻辑都不容易正确判断变化

正确写法：

```jsx
setState(prev => ({
  ...prev,
  user: {
    ...prev.user,
    name: 'Tom'
  }
}));
```

### 好处

- 更容易做浅比较
- 更容易做时间旅行调试
- 更容易定位状态来源
- 更适合和 `memo`、`PureComponent` 等优化配合

## 16. 高频追问速答

### 1. 组件重新渲染就一定会重新挂载吗？

不一定。重新渲染通常只是函数重新执行。只有节点类型或 `key` 变化导致无法复用时，才会卸载再挂载。

### 2. 父组件渲染，子组件一定渲染吗？

默认情况下大概率会重新执行，但是否真的产生 DOM 更新要看最终 Diff 结果。使用 `React.memo` 等手段可以跳过不必要的子组件渲染。

### 3. `useRef` 为什么改了不触发渲染？

因为它不是响应式状态，只是一个跨渲染持久存在的普通对象容器。

### 4. 为什么不要滥用 `useMemo` 和 `useCallback`？

因为它们本身也有维护成本。只有在“避免重算”或“稳定引用”真的带来收益时才值得用。

### 5. 为什么说 `useEffect` 不是“数据请求专用 Hook”？

它本质是副作用同步工具，不是请求工具。请求只是它的常见使用场景之一。

## 17. 面试收尾可以这样总结

如果面试官让你总结 React 难点，可以这样说：

> React 真正难的不是会不会写组件，而是是否理解它的更新模型。核心包括：Fiber 调度、状态更新的批处理、Diff 与 `key`、Hooks 的调用规则、Effect 执行时机、并发渲染、Context 性能问题，以及 SSR 水合一致性。把这些原理串起来，很多业务中的性能问题和状态问题就能解释清楚。