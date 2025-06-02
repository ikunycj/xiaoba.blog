
# React源码
## 基础
### 1. JSX如何转换为DOM
- [JSX](https://typescript.bootcss.com/jsx.html)：
[JSX](https://facebook.github.io/jsx/)是一种嵌入式的类似XML的语法。 它可以被转换成合法的JavaScript，尽管转换的语义是依据不同的实现而定的。 JSX因[React](http://facebook.github.io/react/)框架而流行，但是也被其它应用所使用。 TypeScript支持内嵌，类型检查和将JSX直接编译为JavaScript。

- [Babel](https://babeljs.io/)：
**Babel是一个JavaScript 编译器**​。主要用于将高版本的JavaScript代码转为向后兼容的JS代码，从而能让我们的代码运行在更低版本的浏览器或者其他的环境中。
![[171ca3cb228c57b5129c89fbcf1f4f64.png]]
#### 1.将JSX听过Babel编译为**React.creatElement(type,cofig,children)**
1. 二次处理key、ref、self、source四个属性值
2. 遍历config，筛选出可以提进props里的属性
3. 提取子元素，推入childArrag（也即props.children）数组
4. 格式化defaultProps 
5. 结合以上数据作为入参，发起**ReacElement**调用
#### 2.**React.creatElement**发起**ReacElement**调用 将数据转化为虚拟DOM
#### 3.**ReacElement**调用**ReacDOM.render**生成DOM


[一文彻底读懂Babel](https://juejin.cn/post/6901649054225465352)
### 2. React生命周期
#### React15
![[38148e4f583a32c38ca7b21babf6c0f8.png]]

#### React16
 [更新流程](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
 ![[QQ_1747466479319.png]]
#### React 16.8

### 3.数据驱动试图
#### 单项数据流
#### 发布订阅模式
发布订阅设计模式（Publish-Subscribe Pattern）是一种常见的消息通信模式，广泛应用于事件驱动系统、异步消息传递和解耦组件之间的通信。它允许发送者（发布者）和接收者（订阅者）之间进行通信，而无需彼此了解对方的存在。

一、核心概念
1. 发布者（Publisher）
负责发布消息的实体，不关心谁会接收这些消息。
2. 订阅者（Subscriber）
注册并等待接收特定类型消息的实体。
3. 事件通道（Event Bus / Message Broker）
一个中介，用于管理订阅者注册、取消订阅，并将发布者发出的消息推送给所有订阅者。

二、工作流程
1. **订阅者注册**：订阅者向事件通道订阅感兴趣的事件。
2. **发布事件**：发布者将事件发送给事件通道。
3. **事件派发**：事件通道将事件分发给所有相应的订阅者。
4. **处理事件**：订阅者接收到事件并作出响应。
#### Context  API
![[b1b0db5050195eca055cf483f6b73c18.png]]

#### Redux    
![[3c87e000bc969927ee502d8fe5bec519.png]]

### React Hooks
React Hooks是如何帮助我们升级工作模式的
1.  
2. 解决业务逻辑难以拆分的问题
3. 使状态逻辑复用变得简单可行
4. 函数组件从设计思想上来看更加契合React的理念

## 核心
### 虚拟DOM
[虚拟DOM的github仓库](https://github.com/Matt-Esch/virtual-dom)

>[!question] 为什么需要虚拟DMO
>[网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？--尤雨溪回答](https://www.zhihu.com/question/31809713/answer/53544875)
>
>DOM操作是很慢 的，而JS操作很快，直接操作DOM可能会导致频繁的回流和重绘，JS不存在这些问题。因此虚拟DOM比原生DOM快

**虚拟DOM（Virtual DOM）**：本质上是JS和DOM之间的一个**映射缓存**，在形态上表现为一个能够描述DOM结构及其属性信息的JS对象

虚拟DOM工作
1. 挂载阶段：
2. 更新阶段：

![[7517fc31-6a3c-436d-b6f0-9d3c7ba84bb5.jpeg]]
### Stack Reconciler（栈调 和）
#### Diff算法
两个假设：
1. 两个不同类型的元素会产生出不同的树
2. 开发者可以通过`key`来标识哪些元素在不同的渲染下能保持稳定

三个要点：
 
1. 类型一致的节点才有继续Diff的必要性
2. key属性的设置，可以帮外面尽可能重用同一层级内的节点  
### Fiber架构
![[1d30c388-04ed-4a1b-bfcb-73c89ac340a2 1.jpeg]]
### MVVM架构  
### DOM更新模式
1. React：Fiber架构更新Vitrure DOM
2. Angular：脏检查：scope digest **O(watcher count)** + 必要 DOM 更新 **O(DOM change)**
3. Vue：依赖收集/proxy代理：重新收集依赖/proxy代理 **O(data change)** + 必要 DOM 更新 **O(DOM change)**

### Flux架构
## 生态
## 生产实践 