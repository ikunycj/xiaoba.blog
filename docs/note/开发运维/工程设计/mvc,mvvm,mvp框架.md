在开始正式讲解之前，先举一个例子，如图1所示。这是一个很简单的计数器，单击“减”按钮，数字就会减 1；单击“加”按钮，数字就会加 1。

![简单的计数器](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e138ef072ab445b7a720f7f2329fc3a7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
图1：MV 系列框架例子

  
接下来需要知道的是，在 MV 系列框架中，M 和 V 指 Model 层和 View 层，但是其功能会因为框架的不同而变化：

- **Model** 层很好理解，就是存储数据；
- **View** 层则是展示数据，读者能看见这个例子，完全就是因为存在 View 层。

  
虽然在不同的框架中， View 层和 Model 层的内容可能会有所差别，但是其基础功能不变，变的只是数据的传输方式。  
  
下面就从这个例子开始了解 MV 系列框架的概念。

## 1. MVC 框架

MVC 框架是 MVC、MVP、MVVM 这3个框架中历史最悠久的。20 世纪 70 年代，施乐公司发明了 Smalltalk 语言，用来编写图形界面的应用程序，脱离了 DOS 系统，让系统可视化，不用一直看着黑白的界面。  
  
在 Smalltalk 发展到 80 版本的时候，MVC 框架被一位工程师提出来，MVC 框架的出现在很大程度上降低了应用程序的管理难度，之后被广泛应用于构架桌面和服务器应用程序。MVC 框架如图2所示（实线表示调用，虚线表示通知）。  

![MVC框架图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d20d5270f3740f6a361b3a30466436c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
图2：MVC 框架图

  
Controller 是 MVC 中的 C，指控制层，**在 Controller 层会接收用户所有的操作，并根据写好的代码进行相应的操作**——触发 Model 层，或者触发 View 层，抑或是两者都触发。

需要注意：Controller 层触发 View 层时，并不会更新 View 层中的数据，View 层中的数据是通过监听 Model 层数据变化而自动更新的，与 Controller 层无关。

MVC 框架流程如图3所示：

![MVC框架流程图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8290f63d28d4f66a1cc56f8503d363a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
图3：MVC 框架流程图

  
从图3中可以看出，MVC 框架主要有两个缺点：

- MVC 框架的大部分逻辑都集中在 Controller 层，代码量也都集中在 Controller 层，这带给 Controller 层很大的压力，而已经有独立处理事件能力的 View 层却没有用到。
- 还有一个问题，就是 Controller 层和 View 层之间是一一对应的，断绝了 View 层复用的可能，因而产生了很多冗余代码。

  
为了解决以上问题，MVP 框架被提出来。

## 2. MVP 框架

首先需要知道，MVP 不是指 Most Valuable Player，而是指 Model-View-Presenter。  
  
MVP 框架比 MVC 框架大概晚出现 20 年，1990 年，MVP 由 IBM 的子公司 Taligent 公司提出，它最开始好像是一个用于 C++ CommonPoint 的框架，这种说法正确与否这里不做考证，先来看一下 MVP 框架图（图4）。  


![MVP框架图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3c3e6bc09454f36a863586891c40c3d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
图4：MVP框架图

  
在 MVC 框架中，View 层可以通过访问 Model 层来更新，但在 MVP 框架中，**View 层不能再直接访问 Model 层，必须通过 Presenter 层提供的接口，然后 Presenter 层再去访问 Model 层**。  
  
这看起来有点多此一举，但用处着实不小，主要有两点：

- 首先是因为 Model 层和 View 层都必须通过 Presenter 层来传递信息，所以完全分离了 View 层和 Model 层，也就是说，View 层与 Model 层一点关系也没有，双方是不知道彼此存在的，在它们眼里，只有 Presenter 层。
- 其次，因为 View 层与 Model 层没有关系，所以 View 层可以抽离出来做成组件，在复用性上比 MVC 模型好很多。

  
MVP 框架流程如图5所示：

![MVP框架流程图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b9a004a72d6403d8695566877e18760~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
图5：MVP框架流程图

  
从图5中可以看出，View 层与 Model 层确实互不干涉，View 层也自由了很多。但还是有问题，因为 View 层和 Model 层都需经过 Presenter 层，致使 Presenter 层比较复杂，维护起来会有一定的问题。而且因为没有绑定数据，所有数据都需要 Presenter 层进行“手动同步”，代码量比较大，虽然比 MVC 模型好很多，但也是有比较多的冗余部分。  
  
为了让 View 层和 Model 的数据始终保持一致，避免同步，MVVM 框架出现了。

## 3. MVVM 框架

MVVM 最早是由微软在使用 Windows Presentation Foundation 和 SilverLight 时定义的，2005 年微软正式宣布 MVVM 的存在。**VM 是 ViewModel 层**，ViewModel 层把 Model 层和 View 层的数据同步自动化了，解决了 MVP 框架中数据同步比较麻烦的问题，不仅减轻了 ViewModel 层的压力，同时使得数据处理更加方便——只需告诉 View 层展示的数据是 Model 层中的哪一部分即可。  
  
MVVM 框架如图6所示：

![MVVM框架图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96aa4267c6174c71ad6a34f40bf3521e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
图6：MVVM 框架图

  
读者可能感觉 MVVM 的框架图与 MVP 的框架图相似，确实如此，两者都是从 View 层开始触发用户的操作，之后经过第三层，最后到达 Model 层。但是关键问题是这第三层的内容， ViewModel 层双向绑定了 View 层和 Model 层，因此，随着 View 层的数据变化，系统会自动修改 Model 层的数据，反之同理。而 Presenter 层是采用手动写方法来调用或者修改 View 层和 Model 层，两者孰优孰劣不言而喻。  
  
MVVM 框架流程图如图7所示：

![MVVM框架流程图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b62592dc0d8450fbb666cb3cc3b8b1d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
图7：MVVM 框架流程图

  
从图7可以看出，View 层和 Model 层之间数据的传递也经过了 ViewModel 层， ViewModel 层并没有对其进行“手动绑定”，不仅使速度有了一定的提高，代码量也减少很多，相比于 MVC 和 MVP，MVVM 有了长足的进步。  
  
至于双向数据绑定，可以这样理解：双向数据绑定是一个模板引擎，它会根据数据的变化实时渲染。这种说法可能不是很恰当，但是很好理解，如图8所示。  


![数据绑定概念](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01b00f33315b48749393766335177fd7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
图8：数据绑定概念

  
如图8所示，View 层和 Model 层之间的修改都会同步到对方。  
  
MVVM 模型中数据绑定方法一般有以下3种：

- **数据劫持**
- **发布-订阅模式**
- **脏值检查**

  
Vue.js 使用的是数据劫持和发布-订阅模式两种方法。  
  
首先来了解三个概念：

- Observer：数据监听器
- Compiler：指定解析器
- Watcher：订阅者

  
Observer 用于监听数据变化，如果数据发生改变，不论是在 View 层还是 Model 层， Oberver 都会知道，然后告诉 Watcher。Compiler 的作用是对数据进行解析，之后绑定指定的事件，在这里主要用于更新视图。  
  
Vue.js 数据绑定的流程：首先将需要绑定的数据用数据劫持方法找出来，之后用 Observer 监听这堆数据，如果数据发生变化，Observer 就会告诉 Watcher，然后 Watcher 会决定让哪个 Compiler 去做出相应的操作，这样就完成了数据的双向绑定。

## 4. MVC、MVP 和 MVVM三者的区别和优劣
MVC（Model-View-Controller）、MVP（Model-View-Presenter）和 MVVM（Model-View-ViewModel）是三种常见的软件架构模式，它们的核心区别主要体现在 **职责分离**、**数据绑定** 和 **组件间的依赖关系** 上。

### 1. MVC（Model-View-Controller）

**核心思想：**

- `Model`（模型）：处理数据和业务逻辑。
- `View`（视图）：展示界面，负责用户交互。
- `Controller`（控制器）：负责接收用户输入，并更新 Model 和 View。

**特点：**

- `Controller` 处理用户输入，并更新 `Model`，然后通知 `View` 更新界面。
- `View` 直接访问 `Model` 以获取数据（可能会造成一定的耦合）。
- `Controller` 和 `View` 可能会耦合较高，影响可测试性。

**适用场景：** 适用于 Web 开发，如传统的 **Spring MVC、ASP.NET MVC** 等。

---

### 2. MVP（Model-View-Presenter）

**核心思想：**

- `Model`（模型）：数据和业务逻辑。
- `View`（视图）：界面展示，但不直接访问 `Model`。
- `Presenter`（主持者）：处理逻辑、协调 `Model` 和 `View`，通常与 `View` 通过接口交互。

**特点：**

- `View` 只负责 UI 相关的逻辑，不直接访问 `Model`，而是由 `Presenter` 处理数据并传递给 `View`。
- `Presenter` 负责业务逻辑，并通过接口更新 `View`，增强了可测试性。
- `View` 和 `Presenter` 一对一绑定，可能导致 `Presenter` 过于庞大（可以拆分）。

**适用场景：** 适用于**桌面应用**（如 Windows Forms）、**Android 开发（早期）** 等。

---

### 3. MVVM（Model-View-ViewModel）

**核心思想：**

- `Model`（模型）：数据和业务逻辑。
- `View`（视图）：UI 界面，监听 `ViewModel` 变化并自动更新。
- `ViewModel`（视图模型）：连接 `Model` 和 `View`，通常包含可观察数据（Observable）。

**特点：**

- 采用**双向数据绑定**（如 **Data Binding**），`View` 的变化可以直接影响 `ViewModel`，而 `ViewModel` 变化也能自动更新 `View`。
- `ViewModel` 主要负责处理 `Model` 和 `View` 之间的数据转换，**`View` 无需直接操作 `Model`**。
- 解耦性强，`ViewModel` 可复用，适用于组件化开发。

**适用场景：** 适用于 **WPF（Windows Presentation Foundation）、SwiftUI、Vue、Angular、Android（Jetpack Compose + ViewModel）** 等。

---

### 4. 核心区别总结对比

|对比点|MVC|MVP|MVVM|
|---|---|---|---|
|`View` 是否依赖 `Model`|直接访问|通过 `Presenter` 访问|通过 `ViewModel` 访问|
|`Controller/Presenter/ViewModel` 作用|处理逻辑、部分 UI|处理逻辑、完全独立于 UI|处理逻辑、可绑定 UI|
|代码耦合度|`View` 和 `Controller` 耦合较高|`View` 和 `Presenter` 通过接口通信|`View` 和 `ViewModel` 通过数据绑定通信，解耦|
|数据绑定方式|手动更新 `View`|手动更新 `View`|自动双向数据绑定|
|适用于哪些场景|Web 应用|桌面应用、早期 Android|WPF、Vue、现代 Android|

**总结：**

- **MVC 适用于 Web**（如前后端分离项目）。
- **MVP 适用于早期 Android 和桌面应用**，但 `Presenter` 可能会变得庞大。
- **MVVM 适用于数据驱动 UI 的现代应用**，如前端框架（Vue、React）、移动端（Jetpack Compose、SwiftUI）。


