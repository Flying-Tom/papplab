---
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# JSBridge

在如今移动端盛行的年代，技术选型上基本都是混合开发（Hybrid），混合开发是一种开发模式，指使用多种开发模型开发App，通常会涉及到两大类技术：原生Native 和Web H5

原生技术主要指iOS（Objective C）、Android（Java）侧的开发，因为开发完成需要重新打包整个App，发布依赖用户的更新，所以通常情况下原生开发效率较低，但性能较高功能覆盖率更高；Web侧主要由HTML、CSS、JavaScript组成，Web可以更好的实现发布更新，跨平台也更加优秀，但性能较低，特性也受限。

混合开发吸取了两者的优点，让Native侧提供原生能力，Web侧提供需要经常版本迭代的交互界面，提高开发效率的同时也保证了用户的体验。

混合开发按照其渲染模式可分为下类：

- Web渲染的混合App（Codova、NativeScript）
- 原生渲染的混合App（ReactNative、Weex）
- 小程序

其中的原生、Web相互通信都离不开JSBridge，这里面小程序比较特殊，对于UI渲染和JS的执行环境做了隔离，基于前两种方式之间。

## 工作原理

在Hybrid模式下，Native 端和Web 端都需要和对方通信才能获得更多的能力：

- Web 会经常需要使用 Native 的功能，比如打开二维码扫描、调用原生页面、获取用户信息等
- Native 也需要向 Web 端发送推送、更新状态等

而JavaScript是运行在单独的JS Context中（如`Webview` 容器、JSCore等），与原生有运行环境的隔离，所以需要有一种机制实现Native端和Web端的双向通信。

这种机制就是`JSBridge`：以JavaScript引擎或Webview容器作为媒介，通过协定协议进行通信，实现Native端和Web端双向通信。通过`JSBridge`，Web端可以调用Native端的Java接口，同样Native端也可以通过JSBridge调用Web端的JavaScript接口，实现彼此的双向调用

### JavaScript 调用 Native 方法

在 Webview 内，JavaScript 调用 Native 方法的方式可以分为注入式调用和拦截式调用

#### 注入式调用

##### Native 向 `Webview` 的 `Context` ( 即 Webview 中的 window ) 注入一个暴露指定 Native 方法

例如使用 `@JavascriptInterface` 注解，这是 Android 提供的一种最基础的js和Native通信方式, 我们在「[JavaScript 接口](./webview.md#javascript-接口)」这里提到了使用方法

<!-- 大多数人都知道WebView存在一个漏洞，见WebView中接口隐患与手机挂马利用，虽然该漏洞已经在Android 4.2上修复了（即使用@JavascriptInterface代替addJavascriptInterface），但是由于兼容性和安全性问题，基本上我们不会再利用Android系统为我们提供的addJavascriptInterface方法或者@JavascriptInterface注解来实现，所以我们只能另辟蹊径，去寻找既安全，又能实现兼容Android各个版本的方案。 -->

#### 拦截式调用

##### 1. 拦截 Webview 内的某类特定的 URL Scheme，并根据 URL 来执行对应的 Native 方法

例如使用 `WebViewClient.shouldOverrideUrlLoading()` 拦截 WebView 的跳转, 页面可以构造一个特殊格式的Url跳转，shouldOverrideUrlLoading拦截Url后判断其格式，然后Native就能执行自身的逻辑

```java
public class CustomWebViewClient extends WebViewClient {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
      if (isJsBridgeUrl(url)) {
        // JSbridge的处理逻辑
        return true;
      }
      return super.shouldOverrideUrlLoading(view, url);
    }
}
```

`shouldOverrideUrlLoading` 的执行时机是当一个新页面即将被打开或重定向时（网页自动重定向或手动点击网页内部链接）。但是此方法不会拦截来自**内部**的资源加载，例如，来自 HTML 或 Script 标签中的 `iframe` 或 `src` 属性。另外 `XmlHttpRequests` 也不会被拦截，为了拦截这些请求，就可以使用 `WebViewClient` 的 `shouldInterceptRequest` 方法。

```java
@Deprecated 
// 在 API 21 后废弃
public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
    return null;
}

// 注释中说明此方法运行在非 UI 线程中，因此不可以在此方法中更新 UI
public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
    return shouldInterceptRequest(view, request.getUrl().toString());
}
```

##### 2. 拦截 JavaScript 的 console.log 、alert 、confirm 或 prompt，并执行对应的 Native 方法

例如在js中执行`console.log()`, 会进入Android的`WebChromeClient.consoleMessage()`回调

```java
public class CustomWebChromeClient extends WebChromeClient {
  @Override
  public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
    super.onConsoleMessage(consoleMessage);
    String msg = consoleMessage.message();//Javascript输入的Log内容
  }
}
```

而通过 WebView 的方法 `setWebChromeClient` 可以设置 `WebChromeClient` 对象，这个对象中有三个方法，分别是`onJsAlert`, `onJsConfirm`, `onJsPrompt`，当js调用window对象的对应的方法，即 `window.alert`, `window.confirm`, `window.prompt`, `WebChromeClient` 对象中的三个方法对应的就会被触发

### Native 调用 JavaScript 方法

Native 调用特定 Webview 内的 JavaScript 方法主要存在 2 种方式：

- 直接通过 URL 执行 JavaScript 语句，例如 `javascript:alert('calling...')`，比如

```java
public void btn_demo(View view){
    web_view.loadUrl("javascript:funJs('Android端传入的信息')");
}
```

- 通过 Android WebView方法 `evaluateJavascript()` 来执行 JavaScript 语句

```java
mWebView.evaluateJavascript（"javascript:callJS()", new ValueCallback<String>() {
    @Override
    public void onReceiveValue(String value) {
        //此处为 js 返回的结果
    }
});
```

## WebView 相关的可能的 sink 点

在这里提供一些可能的 sink 点，供大家参考(可能有较多不合理的地方)

- 被`@JavascriptInterface`注解的方法
- 尝试调用 `setJavaScriptEnabled` 或 `addJavascriptInterface` 的方法
- `loadurl`, `loadData`, `loadDataWithBaseURL`, `postUrl` 等方法

- `shouldInterceptRequest`, `shouldOverrideUrlLoading` 方法
- `onConsoleMessage`, `onJsAlert`, `onJsConfirm`, `onJsPrompt` 方法
- `evaluateJavascript` 方法
