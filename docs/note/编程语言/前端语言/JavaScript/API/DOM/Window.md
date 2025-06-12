# [Window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)
`window` 对象表示一个包含 [DOM](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM) 文档的窗口，其 `document` 属性指向窗口中载入的 [DOM 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 。

使用 [`document.defaultView`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/defaultView) 属性可以获取指定文档所在窗口。

代表了脚本正在运行的窗口的 `window` 全局变量，被暴露给 Javascript 代码。

`Window` 接口是各种函数、命名空间、对象和构造函数的家，它们不一定与用户界面窗口的概念直接相关。然而，`Window` 接口是一个可以包含这些需要全局可用的项目的合适的地方。其中很多内容都在 [JavaScript 参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)和 [DOM 参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)中有所记载。

在标签式浏览器中，每个标签都由自己的 `Window` 对象表示；在特定标签中运行的 JavaScript 代码所看到的全局 `window` 总是代表代码所运行的标签。也就是说，即使在标签浏览器中，一些属性和方法仍然适用于包含标签的整个窗口，如 [`resizeTo()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resizeTo "resizeTo()") 和 [`innerHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight "innerHeight")。一般来说，任何不能合理地与标签有关的东西都与窗口有关。

EventTargetWindow

## [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)

_本接口从 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 接口继承属性。_

注意，对象类型的属性（例如：覆盖内建元素的原型）被列于下面单独的小节之中。

[`Window.caches`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/caches) 只读

返回与当前环境相关的 [`CacheStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage) 对象。这个对象可以实现一些功能，如存储供离线使用的资源，以及对请求生成自定义响应。

[`Window.clientInformation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/navigator "Window.clientInformation") 只读

[`Window.navigator`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/navigator) 对象的别名。

[`Window.closed`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/closed) 只读

此属性表示当前窗口是否关闭。

[`Window.credentialless`](https://developer.mozilla.org/en-US/docs/Web/API/Window/credentialless) 只读 实验性 非标准

返回一个布尔值，表示当前文档是否在无凭据（credentialless）的 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 中加载。参见 [IFrame credentialless](https://developer.mozilla.org/en-US/docs/Web/Security/IFrame_credentialless) 以了解更多细节。

[`Window.crypto`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/crypto) 只读

返回与全局对象关联的 [`Crypto`](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto) 对象。

[`Window.customElements`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/customElements) 只读

返回对 [`CustomElementRegistry`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry) 对象的引用，该对象可用于注册新的[自定义元素](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements)并获取之前注册的自定义元素的信息。

[`Window.devicePixelRatio`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio) 只读

返回当前显示器中物理像素和设备独立像素之间的比率。

[`Window.document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/document) 只读

返回对 window 所包含的文档的引用。

[`Window.frameElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/frameElement) 只读

返回窗口被嵌入的元素，如果窗口没有被嵌入，则返回空。

[`Window.frames`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/frames) 只读

返回当前窗口中的子框架（subframe）形成的数组。

[`Window.fullScreen`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fullScreen) 非标准

此属性指示窗口是否以全屏显示。

[`Window.history`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/history) 只读

返回对 history 对象的引用。

[`Window.indexedDB`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/indexedDB "Window.indexedDB") 只读

为应用程序提供异步访问索引数据库的能力；返回一个 [`IDBFactory`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBFactory) 对象。

[`Window.innerHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight) 只读

获取浏览器窗口的内容区域的高度，包括（已渲染的）水平滚动条。

[`Window.innerWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerWidth) 只读

获取浏览器窗口的内容区域的宽度，包括（已渲染的）竖直滚动条。

[`Window.isSecureContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/isSecureContext) 只读

返回一个布尔值，表示当前上下文安全（`true`）或不安全（`false`）。

[`Window.launchQueue`](https://developer.mozilla.org/en-US/docs/Web/API/Window/launchQueue) 只读 实验性

当一个[渐进式 web 应用](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)（PWA）以 `focus-existing`、`navigate-new` 或 `navigate-existing` 的 [`launch_handler`](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/launch_handler) `client_mode` 值启动时，`launchQueue` 提供对 [`LaunchQueue`](https://developer.mozilla.org/en-US/docs/Web/API/LaunchQueue) 类的访问，这允许为 PWA 实现自定义的启动导航处理。

[`Window.length`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/length) 只读

返回窗口中的框架（frame）数。参见 [`window.frames`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/frames)。

[`Window.location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location)

获取/设置 window 对象的位置，或当前的 URL。

[`Window.locationbar`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/locationbar) 只读

返回 locationbar 对象。

[`Window.localStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 只读

返回一个对用于存储数据的本地存储对象的引用，该对象只能由创建它的源访问。

[`Window.menubar`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/menubar) 只读

返回 menubar 对象。

[`Window.mozInnerScreenX`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/mozInnerScreenX) 只读 非标准

返回窗口视口左上角的水平（X）坐标，以屏幕坐标表示。这个值是以 CSS 像素为单位报告的。请参阅 `nsIDOMWindowUtils` 中的 `mozScreenPixelsPerCSSPixel`，以获得转换系数，以便在需要时适应屏幕像素。

[`Window.mozInnerScreenY`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/mozInnerScreenY) 只读 非标准

返回窗口视口左上角的垂直（Y）坐标，以屏幕坐标表示。这个值是以 CSS 像素为单位报告的。请参阅 `mozScreenPixelsPerCSSPixel`，如果需要的话，可以用一个转换系数来适应屏幕像素。

[`Window.name`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/name)

获取/设置 window 对象的名称。

[`Window.navigation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/navigation) 只读 实验性

返回当前 `window` 的相关 [`Navigation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation) 对象。是 [`Navigation API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation_API) 的入口点。

[`Window.navigator`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/navigator) 只读

返回对 navigator 对象的引用。

[`Window.opener`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/opener)

返回对打开当前窗口的 window 的引用。

[`Window.origin`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/origin) 只读

返回全局对象的源，序列化为一个字符串。

[`Window.outerHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/outerHeight) 只读

获取浏览器窗口外侧的高度。

[`Window.outerWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/outerWidth) 只读

获取浏览器窗口外侧的宽度。

[`Window.pageXOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollX "Window.pageXOffset") 只读

[`window.scrollX`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollX) 的别名。

[`Window.pageYOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY "Window.pageYOffset") 只读

[`window.scrollY`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY) 的别名。

[`Window.parent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/parent) 只读

返回对当前窗口或子框架的被继承对象的引用。

[`Window.performance`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/performance) 只读

返回一个 [`Performance`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance) 对象，其中包括 [`timing`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/timing "timing") 和 [`navigation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/navigation "navigation") 属性，每个属性都是提供[性能相关](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API/Navigation_timing)数据的对象。有关其他信息和例子，请参见[使用导航计时](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API/Navigation_timing)。

[`Window.personalbar`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/personalbar) 只读

返回 personalbar 对象。

[`Window.scheduler`](https://developer.mozilla.org/en-US/docs/Web/API/Window/scheduler) 只读

返回与当前上下文相关的 [`Scheduler`](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler) 对象。这是使用[优先级任务调度 API](https://developer.mozilla.org/en-US/docs/Web/API/Prioritized_Task_Scheduling_API) 的入口。

[`Window.screen`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screen) 只读

返回与该窗口相关的 screen 对象的引用。

[`Window.screenX`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screenX) 和 [`Window.screenLeft`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screenLeft) 只读

这两个属性都返回从用户浏览器视口的左边界到屏幕左侧的水平距离。

[`Window.screenY`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screenY) 和 [`Window.screenTop`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/screenTop) 只读

这两个属性都会返回从用户浏览器视口的上边界到屏幕上侧的垂直距离。

[`Window.scrollbars`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollbars) 只读

返回 scrollbars 对象。

[`Window.scrollMaxX`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollMaxX) 非标准 只读

窗口在水平方向上可以滚动的最大偏移量，即文档宽度减去视口宽度。

[`Window.scrollMaxY`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollMaxY) 非标准 只读

窗口在竖直方向上可以滚动的最大偏移量，即文档高度减去视口高度。

[`Window.scrollX`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollX) 只读

返回文档已经被水平滚动的像素数。

[`Window.scrollY`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY) 只读

返回文档已经被竖直滚动的像素数。

[`Window.self`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/self) 只读

返回对 window 对象本身的引用。

[`Window.sessionStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)

返回对用于存储数据的会话存储对象的引用，这些数据只能由创建它的源访问。

[`Window.speechSynthesis`](https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis) 只读

返回 [`SpeechSynthesis`](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis) 对象，这是使用 [Web Speech API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Speech_API) 语音合成功能的入门点。

[`Window.statusbar`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/statusbar) 只读

返回 statusbar 对象。

[`Window.toolbar`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/toolbar) 只读

返回 toolbar 对象。

[`Window.top`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/top) 只读

返回对窗口层次结构中最顶层窗口的引用。这个属性是只读的。

[`Window.visualViewport`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/visualViewport) 只读

返回 [`VisualViewport`](https://developer.mozilla.org/zh-CN/docs/Web/API/VisualViewport) 对象，代表一个给定窗口的视觉视口。

[`Window.window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/window) 只读

返回对当前 window 的引用。

[`window[0]`、`window[1]` 等](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#window0)

以逐帧形式返回对 `window` 对象的引用，要了解更多细节，参见 [`Window.frames`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/frames)。

### [已弃用的属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E5%B7%B2%E5%BC%83%E7%94%A8%E7%9A%84%E5%B1%9E%E6%80%A7)

[`Window.event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/event) 已弃用 只读

返回**当前事件**，即当前由 JavaScript 代码的上下文处理的事件，如果当前没有事件被处理，则返回 `undefined`。应尽可能使用直接传递给事件处理程序的 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 对象来代替。

[`Window.external`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/external) 已弃用 只读

返回一个带有向浏览器添加外部搜索提供者的功能的对象。

[`Window.orientation`](https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation) 已弃用 只读

返回视口相对于设备自然方向的度数（以 90 度为增量）。

[`Window.sidebar`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sidebar) 已弃用 非标准 只读

返回对侧边栏的 window 对象的一个引用。

[`Window.status`](https://developer.mozilla.org/en-US/docs/Web/API/Window/status) 已弃用

获取/设置浏览器底部状态栏中的文本。

## [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)

_本接口从 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 接口继承方法。_

[`Window.atob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/atob)

解码一个使用 base-64 编码的数据字符串。

[`Window.alert()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert)

显示一个警告对话框。

[`Window.blur()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/blur) 已弃用

将焦点从窗口上移开。

[`Window.btoa()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/btoa)

从一串二进制数据中创建一个 base-64 编码的 ASCII 字符串。

[`Window.cancelAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame)

取消之前使用 [`Window.requestAnimationFrame`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 安排的回调。

[`Window.cancelIdleCallback()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelIdleCallback)

取消之前使用 [`Window.requestIdleCallback`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback) 安排的回调。

[`Window.clearInterval()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/clearInterval)

取消使用 [`Window.setInterval()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval) 设置的重复执行任务。

[`Window.clearTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/clearTimeout)

取消使用 [`Window.setTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout) 设置的延时执行任务。

[`Window.close()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/close)

关闭当前窗口。

[`Window.confirm()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm)

显示一个带有用户需要回应的信息对话框。

[`Window.createImageBitmap()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/createImageBitmap)

接受各种不同的图像源，并返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，经兑现可得到 [`ImageBitmap`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap)。可以选择将图片源裁剪成以 _(sx, sy)_ 为起点的像素矩形，宽度为 sw，高度为 sh。

[`Window.dump()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/dump) 非标准

向控制台中写一条消息。

[`Window.fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch)

开始从网络获取资源的过程。

[`Window.find()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/find) 非标准

在窗口中搜索给定的字符串。

[`Window.focus()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/focus)

在当前窗口上设置焦点。

[`Window.getComputedStyle()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)

获取指定元素的计算样式。计算的样式表示该元素的所有 CSS 属性的计算值。

[`Window.getDefaultComputedStyle()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getDefaultComputedStyle) 非标准

获取指定元素的默认计算样式，忽略作者样式表。

[`Window.getSelection()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection)

返回代表所选项目的 selection 对象。

[`Window.matchMedia()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)

返回代表指定媒体查询字符串的 [`MediaQueryList`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList) 对象。

[`Window.moveBy()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/moveBy)

将当前窗口移动一个指定的偏量值。

[`Window.moveTo()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/moveTo)

将窗口移动到指定的坐标。

[`Window.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)

打开一个新窗口。

[`Window.postMessage()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

为一个窗口向另一个窗口发送一串数据提供了安全的手段，该窗口不需要与第一个窗口在同一域内。

[`Window.print()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/print)

打开“打印”对话框，打印当前文档。

[`Window.prompt()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/prompt)

返回用户在提示对话框中输入的文本。

[`Window.queryLocalFonts()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/queryLocalFonts) 实验性 安全上下文

返回 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，经兑现可得到包含一个代表本地可用字体的 [`FontData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FontData) 对象数组。

[`Window.reportError()`](https://developer.mozilla.org/zh-CN/docs/Web/API/reportError "Window.reportError()")

报告一个脚本中的错误，模拟一个未处理的异常。

[`Window.requestAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

告诉浏览器一个动画正在进行中，要求浏览器为下一个动画帧安排窗口的重绘。

[`Window.requestIdleCallback()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

启用浏览器空闲期间的任务调度。

[`Window.resizeBy()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resizeBy)

按一定的变化量调整当前窗口的大小。

[`Window.resizeTo()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resizeTo)

动态地调整窗口的大小。

[`Window.scroll()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scroll)

将窗口滚动到文档中的一个特定位置。

[`Window.scrollBy()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollBy)

将窗口中的文档按给定值滚动。

[`Window.scrollByLines()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollByLines) 非标准

按给定的行数滚动文档。

[`Window.scrollByPages()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollByPages) 非标准

按给定的页数滚动文档。

[`Window.scrollTo()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo)

将文档滚动至特定坐标。

[`Window.setInterval()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval)

安排一个函数，在给定的毫秒数过去后执行。

[`Window.setTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)

安排函数在给定的时间内执行。

[`Window.sizeToContent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sizeToContent) 非标准

根据窗口的内容确定其大小。

[`Window.showOpenFilePicker()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker) 实验性

显示一个文件选择器，允许用户选择一个文件或多个文件。

[`Window.showSaveFilePicker()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showSaveFilePicker) 实验性

显示一个文件选择器，允许用户保存一个文件。

[`Window.showDirectoryPicker()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showDirectoryPicker) 实验性

显示一个目录选择器，允许用户选择一个目录。

[`Window.stop()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/stop)

该方法停止了窗口的加载。

### [已弃用的方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E5%B7%B2%E5%BC%83%E7%94%A8%E7%9A%84%E6%96%B9%E6%B3%95)

[`Window.back()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/back) 非标准 已弃用

在窗口历史中后退一步。该方法已被废弃，应该使用 [`history.back()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back "history.back()") 代替。

[`Window.captureEvents()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/captureEvents) 已弃用

注册窗口以捕获所有指定类型的事件。

[`Window.clearImmediate()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/clearImmediate) 非标准 已弃用

取消使用 `setImmediate()` 设置的重复执行任务。

[`Window.forward()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/forward) 非标准 已弃用

在窗口历史中前进一步。该方法已被废弃，应该使用 [`history.forward()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward "history.forward()") 代替。

[`Window.releaseEvents()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/releaseEvents) 已弃用

解除窗口对特定类型事件的捕获。

[`Window.requestFileSystem()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestFileSystem) 非标准 已弃用

允许网站或应用访问沙盒文件系统以供自己使用。

[`Window.setImmediate()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setImmediate) 非标准 已弃用

在浏览器完成其他繁重的任务后执行一个函数。

[`Window.setResizable()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setResizable) 非标准 已弃用

不执行操作（no-op）。保持对 Netscape 4.x 的向后兼容性。

[`Window.showModalDialog()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showModalDialog) 非标准 已弃用

显示一个模态对话框。

[`Window.webkitConvertPointFromNodeToPage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/webkitConvertPointFromNodeToPage) 非标准 已弃用

将 [`WebKitPoint`](https://developer.mozilla.org/en-US/docs/Web/API/WebKitPoint) 从节点坐标系转换到页面坐标系。

[`Window.webkitConvertPointFromPageToNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/webkitConvertPointFromPageToNode) 非标准 已弃用

将 [`WebKitPoint`](https://developer.mozilla.org/en-US/docs/Web/API/WebKitPoint) 从页面坐标系转换到节点坐标系。

## [事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E4%BA%8B%E4%BB%B6)

通过使用 [`addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 或给这个接口的 `oneventname` 属性指定一个事件监听器来监听这些事件。

[`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/error_event "error")

当一个资源加载失败，或不能使用时触发该事件。例如，如果脚本有一个执行错误，或者图像找不到或无效。

[`languagechange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/languagechange_event "languagechange")

当用户的首选语言发生变化时，在全局范围对象中触发该事件。

[`devicemotion`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicemotion_event "devicemotion")

以固定的时间间隔触发该事件，显示设备所接受的物理加速力的大小和旋转速率（如果有）。

[`deviceorientation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/deviceorientation_event "deviceorientation")

当磁力计方向传感器提供了关于设备当前方向与地球坐标框架的新数据时，触发该事件。

[`resize`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resize_event "resize")

窗口大小发生变化时触发。

[`storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/storage_event "storage")

当一个存储区域（`localStorage` 或 `sessionStorage`）在另一个文档的上下文中被修改时，触发该事件。

### [动画事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E5%8A%A8%E7%94%BB%E4%BA%8B%E4%BB%B6)

[`animationcancel`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/animationcancel_event "animationcancel")

当一个动画意外地中止时，触发该事件。

[`animationend`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/animationend_event "animationend")

当一个动画正常完成时，触发该事件。

[`animationiteration`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/animationiteration_event "animationiteration")

当一个动画迭代完成时，触发该事件。

[`animationstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/animationstart_event "animationstart")

当一个动画开始时，触发该事件。

### [剪切板事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E5%89%AA%E5%88%87%E6%9D%BF%E4%BA%8B%E4%BB%B6)

[`copy`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/copy_event "copy")

当用户通过浏览器的用户界面启动一个复制动作时，触发该事件。也可通过 [`oncopy`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/copy_event "oncopy") 属性设置。

[`cut`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cut_event "cut")

当用户通过浏览器的用户界面启动一个剪切动作时，触发该事件。也可通过 [`oncut`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/cut_event "oncut") 属性设置。

[`paste`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/paste_event "paste")

当用户通过浏览器的用户界面启动一个粘贴动作时，触发该事件。也可通过 [`paste`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/paste_event "paste") 属性设置。

### [连接事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E8%BF%9E%E6%8E%A5%E4%BA%8B%E4%BB%B6)

[`offline`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/offline_event "offline")

当浏览器失去了对网络的访问，并且 `navigator.onLine` 的值转换为 `false` 时，触发该事件。

[`online`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/online_event "online")

当浏览器获得了对网络的访问，并且 `navigator.onLine` 的值转换为 `true` 时，触发该事件。

### [聚焦事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E8%81%9A%E7%84%A6%E4%BA%8B%E4%BB%B6)

[`blur`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/blur_event "blur")

当一个元素失去焦点时，触发该事件。

[`focus`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/focus_event "focus")

当一个元素获得焦点时，触发该事件。

### [Gamepad 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#gamepad_%E4%BA%8B%E4%BB%B6)

[`gamepadconnected`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/gamepadconnected_event "gamepadconnected")

当浏览器检测到游戏板已被连接或首次使用游戏板的按钮/轴时启动。

[`gamepaddisconnected`](https://developer.mozilla.org/en-US/docs/Web/API/Window/gamepaddisconnected_event "gamepaddisconnected")

当浏览器检测到游戏板被断开连接时启动。

### [历史记录事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95%E4%BA%8B%E4%BB%B6)

[`hashchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event "hashchange")

当 URL 的片段标识符（URL 中以 `#` 符号开头及其后面的部分）发生变化时，触发该事件。

[`pagehide`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/pagehide_event "pagehide")

当浏览器隐藏了当前的文档，而在切换到显示会话历史中的另一个文档时触发该事件。例如，当用户点击“后退”按钮或点击“前进”按钮在会话历史中移动时，就会发生这种情况。

[`pageshow`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/pageshow_event "pageshow")

当浏览器因导航任务而使文件可见时触发该事件，不仅包括页面首次加载时，还包括用户在同一标签内导航到另一个页面后再返回该页面等情况。

[`popstate`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event "popstate")

当活动的历史条目改变时，触发该事件。

### [加载和卸载事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E5%8A%A0%E8%BD%BD%E5%92%8C%E5%8D%B8%E8%BD%BD%E4%BA%8B%E4%BB%B6)

[`beforeunload`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeunload_event "beforeunload")

当窗口、文档及其资源即将被卸载时，触发该事件。

[`load`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event "load")

当整个页面加载完毕时触发该事件，包括所有依赖资源，如样式表图片。

[`unload`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unload_event "unload")

当文档或子资源正在被卸载时触发，触发该事件。

### [清单事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E6%B8%85%E5%8D%95%E4%BA%8B%E4%BB%B6)

[`appinstalled`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/appinstalled_event "appinstalled")

当浏览器成功地将一个页面安装为一个应用程序时，触发该事件。

[`beforeinstallprompt`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeinstallprompt_event "beforeinstallprompt")

当用户即将被提示安装一个 web 应用程序时，触发该事件。

### [消息事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E6%B6%88%E6%81%AF%E4%BA%8B%E4%BB%B6)

[`message`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/message_event "message")

窗口收到消息时触发该事件，例如从另一个浏览上下文中调用 [`Window.postMessage()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage "Window.postMessage()")。

[`messageerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/messageerror_event "messageerror")

当 `Window` 对象收到无法反序列化的消息时，触发该事件。

### [打印事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E6%89%93%E5%8D%B0%E4%BA%8B%E4%BB%B6)

[`afterprint`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/afterprint_event "afterprint")

在相关文档开始打印或打印预览关闭后，触发该事件。

[`beforeprint`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeprint_event "beforeprint")

当相关文件即将被打印或预览打印时，触发该事件。

### [Promise 拒绝事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#promise_%E6%8B%92%E7%BB%9D%E4%BA%8B%E4%BB%B6)

[`rejectionhandled`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/rejectionhandled_event "rejectionhandled")

每当一个 JavaScript [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 被拒绝时，不管是否有处理程序来捕捉拒绝，都会触发该事件。

[`unhandledrejection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event "unhandledrejection")

当 JavaScript [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 被拒绝，但没有处理程序来捕获拒绝时，触发该事件。

### [渐变事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E6%B8%90%E5%8F%98%E4%BA%8B%E4%BB%B6)

[`transitioncancel`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/transitioncancel_event "transitioncancel")

当 [CSS 渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)被取消时，触发该事件。

[`transitionend`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/transitionend_event "transitionend")

当 [CSS 渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)完成时，触发该事件。

[`transitionrun`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/transitionrun_event "transitionrun")

当 [CSS 渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)首次创建时，触发该事件。

[`transitionstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/transitionstart_event "transitionstart")

当 [CSS 渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)真正开始时，触发该事件。

### [已废弃事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E5%B7%B2%E5%BA%9F%E5%BC%83%E4%BA%8B%E4%BB%B6)

[`orientationchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/orientationchange_event "orientationchange") 已弃用

当设备的方向改变时，触发该事件。

[`vrdisplayactivate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/vrdisplayactivate_event "vrdisplayactivate") 已弃用 非标准

当显示器可供呈现时，触发该事件。

[`vrdisplayconnect`](https://developer.mozilla.org/en-US/docs/Web/API/Window/vrdisplayconnect_event "vrdisplayconnect") 已弃用 非标准

当兼容的 VR 设备被连接到电脑上时，触发该事件。

[`vrdisplaydisconnect`](https://developer.mozilla.org/en-US/docs/Web/API/Window/vrdisplaydisconnect_event "vrdisplaydisconnect") 已弃用 非标准

当兼容的 VR 设备从电脑上断开时，触发该事件。

[`vrdisplaydeactivate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/vrdisplaydeactivate_event "vrdisplaydeactivate") 已弃用 非标准

当显示器不再可供呈现时，触发该事件。

[`vrdisplaypresentchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/vrdisplaypresentchange_event "vrdisplaypresentchange") 已弃用 非标准

当 VR 设备的呈现状态发生变化时触发该事件，即从呈现状态变成不呈现状态，或者反之亦然。

## [接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E6%8E%A5%E5%8F%A3)

参见 [DOM 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)。