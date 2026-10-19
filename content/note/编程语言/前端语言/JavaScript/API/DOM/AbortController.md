# [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用。

**`AbortController`** 接口表示一个控制器对象，允许你根据需要中止一个或多个 Web 请求。

你可以使用 [`AbortController()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController "AbortController()") 构造函数创建一个新的 `AbortController` 对象。使用 [`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal) 对象可以完成与异步操作的通信。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)

[`AbortController()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController "AbortController()")

创建一个新的 `AbortController` 对象实例。

## [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)

[`AbortController.signal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/signal) 只读

返回一个 [`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal) 对象实例，可以用它来和异步操作进行通信或者中止这个操作。

## [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)

[`AbortController.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/abort)

中止一个尚未完成的异步操作。这能够中止 [fetch 请求](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch)及任何响应体和流的使用。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController#%E7%A4%BA%E4%BE%8B)

**备注：** [`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal) 中还有其他额外的示例。

在下面的代码片段中，我们想通过 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 下载一段视频。

我们先使用 [`AbortController()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController "AbortController()") 构造函数创建一个控制器，然后使用 [`AbortController.signal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/signal) 属性获取其关联 [`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal) 对象的引用。

当 [fetch 请求](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch)初始化时，我们将 `AbortSignal` 作为一个选项传递进入请求的选项对象中（下面的 `{signal}`）。这将 signal 和 controller 与 fetch 请求相关联，并且允许我们通过调用 [`AbortController.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/abort) 去中止它，如下面的第二个事件监听器。

jsCopy to Clipboard

```
let controller;
const url = "video.mp4";

const downloadBtn = document.querySelector(".download");
const abortBtn = document.querySelector(".abort");

downloadBtn.addEventListener("click", fetchVideo);

abortBtn.addEventListener("click", () => {
  if (controller) {
    controller.abort();
    console.log("中止下载");
  }
});

function fetchVideo() {
  controller = new AbortController();
  const signal = controller.signal;
  fetch(url, { signal })
    .then((response) => {
      console.log("下载完成", response);
    })
    .catch((err) => {
      console.error(`下载错误：${err.message}`);
    });
}
```

**备注：** 当 `abort()` 被调用时，这个 `fetch()` promise 将 `reject` 一个名为 `AbortError` 的 `DOMException`。

你可以在 [GitHub](https://github.com/mdn/dom-examples/tree/main/abort-api) 上找到这个示例的完整源代码（也可以[在线运行](https://mdn.github.io/dom-examples/abort-api/)）。