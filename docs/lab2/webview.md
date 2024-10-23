---
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Android Webview

WebView 是一种原生系统用于用于移动端 APP 嵌入(Embed) Web 的技术

- 安卓（Android）：SDK 中有WebView控件
- 苹果（IOS，MacOS）：WebView/UIWebView/WKWebView(UIView/NSView)

具体而言， Android WebView (`Android System WebView`) 是 Android 系统提供的一个用于在应用程序中显示 Web 内容的组件, 或者说是一种 Web 浏览器引擎或嵌入式 Web 浏览器。它在低版本和高版本采用了不同的webkit版本内核，4.4后直接使用了Chromium。

Android WebView 允许开发者在应用中嵌入 Web 页面，同时它也给JavaScript提供了运行环境和许多交互的 API。WebView控件除了能加载指定的url外，还可以对URL请求、JavaScript 的对话框、加载进度、页面交互进行强大的处理，之后会提到拦截请求、执行JS脚本都依赖于此。

这篇文档的主要目的是了解 Android Webview 的相关内容，而不是开发者文档，不会涉及太多的细节内容。

## 简介

### 基本用法

开发者可以通过在布局文件中添加 WebView 控件，或者在 Java 代码中动态创建并设置 WebView 控件，来在应用中显示 Web 页面。

在布局文件中添加 WebView 控件的示例代码如下：

```xml
<WebView
    android:id="@+id/webview"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
/>
```

在 Java 代码中动态创建并设置 WebView 控件的示例代码如下：

```java
WebView webView = new WebView(context);
setContentView(webView);
```

### 加载方式

> 作为一个嵌入式浏览器，加载 Web 页面是一项基本功能

WebView 可以通过 `loadUrl()` 方法加载一个 URL 地址，也可以通过 `loadData()` 方法加载 HTML 内容。其中，`loadUrl()` 方法可以直接加载 URL 地址，示例代码如下：

```java
webView.loadUrl("https://www.example.com");
```

而 loadData() 方法可以加载 HTML 内容，示例代码如下：

```java
webView.loadData("<html><body><h1>Hello, World!</h1></body></html>", "text/html", "UTF-8");
```

### 设置选项

开发者可以设置 WebView 的一些属性，例如是否支持 JavaScript、是否支持缩放、是否支持加载图片等。可以通过 WebView 的 `getSettings()` 方法获取一个 `WebSettings` 对象，然后对其进行设置，示例代码如下：

```java
WebSettings webSettings = webView.getSettings();
webSettings.setJavaScriptEnabled(true);
webSettings.setSupportZoom(true);
webSettings.setBuiltInZoomControls(true);
webSettings.setDisplayZoomControls(false);
webSettings.setLoadsImagesAutomatically(true);
```

### JavaScript 接口

开发者可以通过 `addJavascriptInterface()` 方法向 WebView 中注入 JavaScript 接口，从而实现与 Web 内容的交互。首先需要在 Java 代码中定义一个类，并在该类中定义一个用 `@JavascriptInterface` 注解标记的方法，该方法可以被 JavaScript 调用，示例代码如下：

```java
public class MyJavascriptInterface {
    @JavascriptInterface
    public void showToast(String toast) {             
       Toast.makeText(MainActivity.this, toast, Toast.LENGTH_SHORT).show();
    }
}
```

然后通过 `addJavascriptInterface()` 方法将该类注入到 WebView 中，示例代码如下：

```java
webView.addJavascriptInterface(new MyJavascriptInterface(), "javascriptInterface");
```

在 Web 内容中，可以通过 `window.myInterface.showToast(message)` 的或其他的方式调用该方法，示例代码如下：

```js
function showToast(text){
    window.javascriptInterface.showToast(text);
}
```

```html
<button onclick="showToast('Hello, World!')">Show Toast</button>
```

## 意义

使用 Webview 的意义和混合开发我们会在「[JSBridge](./jsbridge)」里再次提到。简而言之, 原生APP是将页面的布局设计，以及业务代码打包然后用户下载安装使用，而webview是通过加载 html 文件来进行页面的展示，当需要更新页面布局的或者业务逻辑变更时，如果是原生的APP就需要修改前端内容，升级打包，重新发布才可以使用最新的。

而通过webview方式的页面则只需要修改html代码或者js文件（如果是从服务器端获取，只要新的文件部署完成），用户重新刷新就可以使用更新后的，无需通过下载安装的方式完成升级，对版本迭代较快，经常需要更新页面的APP更为友好。
