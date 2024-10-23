---
sidebar_position: 2
---

# Android 应用程序包

<!-- > [https://www.jianshu.com/p/6d835e5feed4](https://www.jianshu.com/p/6d835e5feed4) -->

Android 应用程序包(`Android application package`)，是 Android 操作系统使用的一种应用程序包文件格式，用于分发和安装移动应用及中间件。APK 文件基于 `zip` 文件格式，它与 `jar` 文件的构造方式相似。一个 Android 应用程序的代码想要在 Android 设备上运行，必须先进行编译，然后被打包成为一个被 Android 系统所能识别的文件才可以被运行，而这种能被 Android 系统识别并运行的文件格式便是 APK

## APK 结构

一个 APK 文件通常包含以下文件结构：

- `META-INF` 目录: 存放应用程序签名和证书的目录
- `lib` 目录: 程序依赖的 `Native` 库
- `res` 目录: 存放应用程序的资源
- `assets` 目录: 存放需要打包到 apk 中的静态文件
- `AndroidManifest.xml`: Android 清单文件，用于描述该应用程序的名字、版本号、所需权限、注册的服务、链接的其他应用程序
- `classes.dex`: classes 文件通过 `DEX` 编译后的文件格式，用于在虚拟机上运行的主要代码部分
- `resources.arsc`: 资源配置文件

![Android APK Struct](https://s1.ax1x.com/2023/01/31/pS0WKBV.png)

我们来分别介绍一下在这种常见格式下，不同结构中包含的内容

### META-INF

`META-INF`目录里保存应用的签名信息，签名信息可以验证 APK 文件的完整性; Android SDK 在打包 APK 时会计算 APK 包中所有文件的完整性，并且把这些完整性保存到 `META-INF` 文件夹下，应用程序在安装的时候首先会根据 `META-INF` 目录校验 APK 的完整性，这样就可以保证 APK 中的每一个文件都不能被篡改, 以此来确保 APK 应用程序不被恶意修改或者病毒感染，有利于确保 Android 应用的完整性和系统的安全性。

META-INF 目录下包含的文件有 `CERT.RSA`，`CERT.DSA`，`CERT.SF` 和 `MANIFEST.MF`，其中 
- CERT.RSA 是开发者利用私钥对 APK 进行签名的签名文件，
- CERT.SF，MANIFEST.MF 记录了文件中文件的 SHA-1 哈希值

在逆向完成后重新打包的过程中，我们需要对其进行重新签名，会对这里的内容进行修改

### lib

`lib`目录存放应用程序依赖的 native 库文件，一般是用平台原生的语言如C/C++编写，可能包含着一些不同类型的子目录，分别对应着不同的 CPU 架构:

- `armeabi-v7a` 和 `arm64-v8a` :  ARM v7 和 ARM v8
- `x86` / `x86_64` : x86 平台架构
- `mips` : MIPS 架构
- $\cdots$


:::caution 平台支持

如果`lib`目录里没有对应平台的运行库，应用程序还能被正常的安装运行吗？ 我们应该如何理解 `Native` ?

:::

### res

`res` 是 resource 的缩写，这个目录存放资源文件，存在这个文件夹下的所有文件都会映射到 Android 工程的 `.R` 文件中，生成对应的 ID，访问的时候直接使用资源 ID 即 `R.id.filename`

`res` 文件夹下可以包含多个目录，其中 `anim` 存放动画文件；`drawable` 目录存放图像资源；`layout` 目录存放布局文件；`values` 目录存放一些特征值，`colors.xml` 存放 `color` 颜色值，`dimens.xml` 定义尺寸值，`string.xml` 定义字符串的值，`styles.xml` 定义样式对象；`xml` 文件夹存放任意 `xml` 文件，在运行时可以通过 `Resources.getXML()` 读取；`raw` 是可以直接复制到设备中的任意文件，他们无需编译

`res` 内的内容常用来做 apk 汉化等工作，因为在上面的描述中我们可以看到，在不涉及逻辑的情况下，所有的字符串图像等都在 `res` 目录中被保存，只要我们替换掉那些非本国语言的字符图像，就可以实现程序的汉化，不得不说这非常方便

### resources.arsc

`resources.arsc` 用来记录资源文件和资源 ID 之间的映射关系，用来根据资源 ID 寻找资源。Android 的开发是分模块的，`res` 目录专门用来存放资源文件，当在代码中需要调用资源文件时，只需要调用 `findviewbyId()`就可以得到资源文件，每当在 res 文件夹下放一个文件，`aapt` 就会自动生成对应的 ID 保存在.R 文件，我们调用这个 ID 就可以，但是只有这个 ID 还不够，`.R` 文件只是保证编译程序不报错，实际上在程序运行时，系统要根据 ID 去寻找对应的资源路径，而 `resources.arsc` 文件就是用来记录这些 ID 和资源文件位置对应关系的文件。

### assets

`assets` 用于存放需要打包到 APK 中的静态文件，和 `res` 的不同点在于 `assets` 目录支持任意深度的子目录，用户可以根据自己的需求任意部署文件夹架构

> 很多商业app的`res`目录内容没有按照我们上面介绍的格式规整的布局，但是`res`目录无法支持任意深度

而且 `res` 目录下的文件会在 `.R` 文件中生成对应的资源 ID，`assets` 则不会自动生成对应的 ID，访问的时候需要 `AssetManager` 类

`assets` 里面可以存放一些 html 文件或者图片等资源，可以看一下在正常写 Android 程序时[对 assets 目录的使用](https://blog.csdn.net/fengyuzhengfan/article/details/38360017)

### AndroidManifest.xml

`AndroidManifest.xml` 即[应用清单文件](https://developer.android.com/guide/topics/manifest/manifest-intro), 它会向 Android 构建工具、Android 操作系统和应用商店描述应用的基本信息。每个 Android 应用程序都必须包含一个 `AndroidManifest.xml` 文件，它的名字是固定且不能修改的。它有如下的作用：

- 声明自己的软件包名称和应用 ID
- `Activity`，`Service`，`BroadcastReceiver` 和 `ContentProvider`这四大组件及其子类需要在 `AndroidManifest.xml` 中声明注册才可以被正常启动
- 访问敏感用户数据（如联系人和短信）或某些系统功能（如相机和互联网访问）需要在`AndroidManifest.xml`进行声明，否则无法调用API；同时也可以使用权限保护自己的组件
- 清单文件也可用于声明应用所需的硬件或软件功能类型，以及应用兼容的设备类型供应用商店或其他的使用途径， 如需要的硬件和软件功能（如需要罗盘或陀螺仪），需要的SDK（最低兼容的API版本）

程序打包时，会把 `AndroidManifest.xml` 进行简单的编译成为二进制文件, 便于 Android 系统识别，编译之后的格式是 `AXML` 格式，这也是我们逆向出的`AndroidMainifest.xml`格式，如下图所示：

<img class="aligncenter" src='https://s1.ax1x.com/2023/02/08/pS2zmtI.png' width="400" />

### classes.dex

这个是我们逆向时主要关注的内容之一。传统的 Java 程序，首先先把 Java 文件编译成 class 文件，字节码都保存在了 class 文件中，Java 虚拟机可以通过解释执行这些 class 文件。而 Dalvik 虚拟机是在 Java 虚拟机进行了优化，执行的是 Dalvik 字节码，而这些 Dalvik 字节码是由 Java 字节码转换而来，一般情况下，Android 应用在打包时通过 AndroidSDK 中的 dx 工具将 Java 字节码转换为 Dalvik 字节码。dx 工具可以对多个 class 文件进行合并，重组，优化，可以达到减小体积，缩短运行时间的目的。dx 工具的转换过程如图所示：

如图，dx 工具把每个.class 文件的每个区域的内容进行去重，重组，优化重排后生成 dex 文件，生成的 dex 文件可以在 Dalvik 虚拟机执行，且速度比较快。

这里有 Google 的官方档案：

- [Dalvik 字节码](https://source.android.com/devices/tech/dalvik/dalvik-bytecode)
- [Dex 可执行文件格式](https://source.android.com/devices/tech/dalvik/dex-format)
- [Dex 可执行指令格式](https://source.android.com/devices/tech/dalvik/instruction-formats)
- [Smali 语法](https://ctf-wiki.github.io/ctf-wiki/android/basic_operating_mechanism/java_layer/smali/smali/)

## 应用打包

当编写完 App 相关的代码后，我们的还需要将 App 及其所使用到的资源文件进行打包才能让这个应用程序被安装运行

打包流程如[下图](http://androidsrc.net/android-app-build-overview/)所示

![](https://s1.ax1x.com/2023/02/02/pSrGwwt.png)

#### 1. 打包资源文件，生成 R.java 文件

打包资源的工具是 `aapt(The Android Asset Packaing Tool)`

在这个过程中，项目中的 `AndroidManifest.xml` 文件和布局文件 XML 都会编译，然后生成相应的 `R.java`，另外 `AndroidManifest.xml` 会被 `aapt` 编译成二进制的`axml`

存放在 APP 的 `res` 目录下的资源，该类资源在 APP 打包前大多会被编译，变成二进制文件，并会为每个该类文件赋予一个 resource id。对于该类资源的访问，应用层代码则是通过 resource id 进行访问的。Android 应用在编译过程中 `aapt` 会对资源文件进行编译，并生成一个 `resource.arsc` 文件，`resource.arsc` 文件相当于一个文件索引表，记录了很多跟资源相关的信息

#### 2. 处理 aidl 文件，生成相应的.Java 文件

这一过程中使用到的工具是 `aidl(Android Interface Definition Language)`，即 Android 接口描述语言

`aidl` 解析接口定义文件然后生成相应的.Java 代码接口供程序调用

如果在项目没有使用到 `.aidl` 文件，则可以跳过这一步

#### 3. 编译项目源代码，生成 class 文件

项目中所有的 `.java` 代码，包括 `R.java` 和 `.aidl` 文件，都会被 Java 编译器（javac）编译成 `.class` 文件生成到工程中的 `bin/classes` 目录下

#### 4. 转换所有的 class 文件，生成 classes.dex 文件

`dx` 工具生成可供 Android 系统 Dalvik 虚拟机执行的 `classes.dex` 文件

任何第三方的 libraries 和 `.class` 文件都会被转换成 `.dex` 文件

dx 工具的主要工作是将 Java 字节码转成成 Dalvik 字节码、压缩常量池、消除冗余信息等

#### 5. 打包生成 APK 文件

所有没有编译的资源，如 images、assets 目录下资源（该类文件是一些原始文件，APP 打包时并不会对其进行编译，而是直接打包到 APP 中，对于这一类资源文件的访问，应用层代码需要通过文件名对其进行访问）

编译过的资源和 `.dex` 文件都会被 `apkbuilder` 工具打包到最终的 `.apk` 文件中

打包的工具 `apkbuilder` 位于 `android-sdk/tools` 目录下

#### 6. 对 APK 文件进行签名

一旦 APK 文件生成，它必须被签名才能被安装在设备上。用于签名的 `keystore`分为以下两种:

- 用于调试的 `debug.keystore`，它主要用于调试，在 Eclipse 或者 Android Studio 中直接 run 以后跑在手机上的就是使用的 `debug.keystore`
- 用于发布正式版本的 `release.keystore`

#### 7. 对签名后的 APK 文件进行对齐处理

如果你发布的 apk 是正式版的话，就必须对 APK 进行对齐处理，用到的工具是 `zipalign`

对齐的主要过程是将 APK 包中所有的资源文件距离文件起始偏移为 4 字节整数倍，这样通过内存映射访问 apk 文件时的速度会更快。对齐的作用就是减少运行时内存的使用

在 Android5.0 之后，Dalvik 虚拟机就替换成了 ART，进行了更优化的处理

## 应用安装

apk 的安装不仅仅需要将 apk 的实体放到系统的特定目录(`/data/app/`),而且需要向`PackageManagerService`注册包名、以及 apk 声明的四大组件(Activity、Service、ContentProvider、BroadcastReceiver),该 apk 才能算是成功安装到了 Android 系统

大概可分为两个方面:

1. 安装 apk 到特定的目录
2. 注册包名、四大组件到 PackageManagerService

只有完成了第 2 步(向系统注册)，Android 系统才知道有这么一个 apk 存在,才可以管理（或者说启动）该 apk

### 相关目录和文件

- `/system/app`: 系统自带的应用程序，获得 adb root 权限才能删除
- `/data/app`: 用户程序安装的目录，安装时 apk 文件会被复制到此目录
- `/data/dalvik-cache`: 将 apk 中的 dex 文件安装到 dalvik-cache 目录下(dex 文件是 dalvik 虚拟机的可执行文件,当然，ART–Android Runtime 的可执行文件格式为 oat，启用 ART 时，系统会执行 dex 文件转换至 oat 文件)
- `/data/data` :存放应用程序的数据,无论是系统 app 还是普通 app,app 产生的用户数据都存放在`/data/data/`包名/目录下
- `/data/system/packages.xml`: 类似于 Windows 的注册表。这个文件是在解析 apk 时由`writeLP()`创建的，里面记录了系统的 permissions，以及每个 apk 的 name, codePath, flags, ts, version, uesrid 等信息，这些信息主要通 apk 的`AndroidManifest.xml`解析获取，解析完 apk 后将更新信息写入这个文件并保存到 flash，下次开机直接从里面读取相关信息添加到内存相关列表中。当有 apk 升级，安装或删除时会更新这个文件
- `/data/system/package.list`: 指定了应用的默认存储位置`/data/data/com.xxx.xxx`, 与`packages.xml`有同一个 userId

:::info Android uid 机制

Android 在系统设计上把每个应用当做 Linux 系统上的一个用户对待，每一个应用都有一个 uid, 这样就可以利用已有的 Linux 用户管理机制来设计 Android 应用，比如应用目录，应用权限，应用进程管理等。

安装在设备中的每一个 apk 文件，Android 给每个 APK 进程分配一个单独的用户空间,其 `AndroidManifest.xml` 中的 userid 就是对应一个 Linux 用户都会被分配到一个属于自己的统一的 Linux 用户 ID，并且为它创建一个沙箱，以防止影响其他应用程序（或者其他应用程序影响它）提升了应用的安全性。一个应用程序只能有一个 uid，但多个应用也可以使用 `sharedUserId` 方式共享同一个 uid，前提是这些应用的签名要相同。例如，当需要推出新版本时，这两种版本的程序可以持有一样的 UID， 才有权限将旧版程序的数据转移到新版软件里。

而在 Android 4.2 (API 17) 之后引进了多用户机制，引入了 userId 和 appId

|                       API                       | userId            | appId                    | uid/gid                         | 转换                           |
| :---------------------------------------------: | ----------------- | ------------------------ | ------------------------------- | ------------------------------ |
| <div style={{width: 40 + 'px' }}> $< 17$ </div> | 0                 | 一个 Linux 用户/一个应用 | 一个 Linux 用户/一个应用        | 0 \* 100000 + appId = uid      |
|                 $\geqslant 17$                  | 一个 Android 用户 | 多用户共享的一个应用     | 一个 Android 用户使用的一个应用 | userID \* 100000 + appId = uid |

> 不考虑`AndroidManifest.xml`中设置了相同的`sharedUserId`的情况

<!-- > http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID -->

:::

### 普通 apk 的安装流程

以用户安装 apk 为例

1. 复制 apk 文件到 `/data/app` 目录, 解压缩并扫描安装包
2. 解析 `AndroidManifest.xml` 文件,向 `PackagManagerService` 中注册该 package、以及 apk 声明的四大组件
3. 创建 apk 的用户数据目录,即`/data/data/pkg/`目录
4. 为 apk 执行 `dexopt` 优化。
5. 安装完成发送`ACTION_PACKAGE_ADDED`广播, `launcher` 接收到这个广播之后就可以在桌面上添加应用图标


> 更为具体的内容可以参考这篇文章[APK安装流程详解](https://www.jianshu.com/p/4f16421d5c7f)


<!-- ## 应用运行 -->

<!-- :::caution 了解 apk 的构成

实验内容

::: -->
