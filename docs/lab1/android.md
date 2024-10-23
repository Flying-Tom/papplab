---
sidebar_position: 1
---

# Android 系统

Android 是一个基于 Linux 核心与其他开源软件的开放原始码的移动操作系统，由 Google 成立的开放手持设备联盟持续领导与开发。由于主流的应用开发基于 Java，门槛较低，社区开放且活跃，拥有超过 超高的市场占有率，目前主要应用于智能手机、平板、手表以及 VR 设备等

## 系统架构

[Andorid 系统架构](https://developer.android.com/guide/platform)从上到下分别有应用层、应用框架层、系统运行时库层、硬件抽象层、Linux 内核层

<img src='https://s1.ax1x.com/2023/01/31/pS0WUnx.png' width="600" />

其每层的大致职能如下: 

- **应用层**：包括系统应用比如闹钟、日历等这些在内的以及非系统级别的应用都属于应用层, 负责用户交互
- **应用框架层**：提供应用程序的 API，比如一些 ActivityManager 管理应用生命周期、locationManager 地理位置服务、还有就是 NotificationManager 消息通知管理等等
- **系统运行库层**：主要分为两部分，分别是 Native 和 Android Runtime
  - Native 库(C/C++)：主要是能被 Andorid 系统不同组件所使用，并通过应用程序框架为开发者提供服务， 通常相较于 Java 实现会有着更好的性能表现。它主要功能有 openggl 绘图方法库，多媒体库支持常用的音频 视频格式录制回访 ，还有我们常用会用到的一个轻量级的数据库 sqlLite 等还有 ssl 网络协议等等
  - Android 运行时：它主要又分为核心库和虚拟机 ART，核心库主要包含 Java 核心库的大部分功能。

:::info JVM, dalvik 和 ART

Android 5.0 系统之前使用的是`DVM(Dalvik 虚拟机)`，相对于 JVM 来说，DVM 可以在有限的内存中同时运行多个虚拟机实例，是专门为弱性能的移动设备而生的：

- 每一个 Dalvik 虚拟机就是一个独立的 Linux 进程，拥有自己的进程空间, 这样独立的进程可以防止在虚拟机崩溃的时候所有程序都被关闭
- DVM 拥有共享机制， 即不同应用运行时可以共享相同的类，拥有更高的效率
- 相较于 JVM，DVM 基于寄存器架构，提高对访存问速度；整合.class 文件，减少 I/O 操作



`ART(Android Runtime)`是 Android 4.4 发布来替换DVM的, 在 Android 5.0 时默认采用 ART，至此 DVM 正式退出历史舞台。

DVM 中的应用每次运行时，字节码都需要通过即时编译器(`JIT, just in time`)转换为机器码，这会使得应用的运行效率降低。而在 ART 中，系统在安装应用时会进行一次预编译(`AOT, ahead of time`) ,将字节码预先编译成机器码并存储在本地，这样应用每次运行时就不需要执行编译了，运行效率也大大提升。

> 更为详细的对比可以参考[Android 内存管理(JVM 、DVM(dalvik) 、ART 简单介绍)](https://anymarvel.github.io/AndroidSummary/book/AndroidMemory/jvm_dvm_art_diffrent.html)

:::

- **硬件抽象层**：它是位于操作系统内核和硬件电路之间的接口层，主要目的在于将硬件抽象化，隐藏了特定平台的硬件接口细节，为操作系统提供虚拟硬件平台，使其具有硬件无关性，可在多平台上进行移植

:::info HAL 层

如下是Android官方关于HAL的[描述](https://source.android.com/docs/core/architecture): 

> HAL 是一个抽象层，具有供硬件供应商实现的标准接口。 HAL 允许 Android 不了解较低级别的驱动程序实现。使用 HAL 可以让您在不影响或修改更高级别系统的情况下实现功能。

HAL简单来说就是对Linux内核驱动程序的封装，向上提供接口，屏蔽低层的实现细节；具体实现上是把对硬件的支持分成了两层，硬件抽象层运行在用户空间，而Linux内核驱动程序运行在内核空间，从商业的角度来看这么做为了保护硬件厂家的利益。因为Linux内核源代码版权遵循[GPLv2 License](https://github.com/torvalds/linux/blob/master/COPYING)，而Android源代码版权遵循[Apache License version 2.0](https://source.android.com/license)，前者在发布产品时，必须公布源代码，而后者无须发布源代码。如果把对硬件支持的所有代码都放在Linux驱动层，那就意味着发布时要公开驱动程序的源代码，而公开源代码就意味着把硬件的相关参数和实现都公开了，在手机市场竞争激烈的今天，这对厂家来说无疑损害是非常大的。

因此，Android才会想到把对硬件的支持分成硬件抽象层和内核驱动层，内核驱动层只提供简单的访问硬件逻辑，例如读写硬件寄存器的通道，至于从硬件中读到了什么值或者写了什么值到硬件中的逻辑，都放在硬件抽象层中去了，这样就可以把商业秘密隐藏起来了。也正是由于这个分层的原因，Android被踢出了Linux内核主线代码树中, 因为Android放在内核空间的驱动程序对硬件的支持是不完整的，把其Linux内核移植到别的机器上去时，由于缺乏HAL层的支持，硬件就完全不能用了。这也是为什么说Android是开放系统而不是开源系统的原因。

:::

- **Linux 内核层**：Android 的核心系统服务(安全管理、内存管理、进程管理、网络协议等)基于 Linux 内核，在此基础上添加了部分 Android 专用的驱动

## 启动流程

<!-- > 参考[https://cloud.tencent.com/developer/article/1771134](https://cloud.tencent.com/developer/article/1771134) -->

以下图为例，我们自下而上的分层了解 Android 的启动流程

<img src='https://s1.ax1x.com/2023/02/01/pSBKOaQ.png' width="600" />

### Loader 层

当按下电源按钮后，引导芯片会从固化在 ROM 中的预设代码开始执行，然后加载引导程序也就是`BootLoader`到 RAM 中。所以第一步开启电源后，做的操作就是运行预设代码，加载引导程序到 RAM 进行短时间存储

引导程序`Bootloader`被加载后，就开始拉起 Linux 内核并运行。这个过程会检查 RAM，初始化一些硬件参数等功能

### Kernel 层

在这一层 Linux 内核被启动了，设置缓存、被保护存储器、计划列表，加载设备驱动；此时内核中主要启动了两个进程:

- `swapper(pid=0)`，又称为 idle 进程, 是系统初始化过程中 kernel 的第一个进程,也是`init`进程和`kthreadd`进程的父进程，用于初始化内核数据结构、进程管理、内存管理，加载 Binder Driver、Display、Camera Driver, 连接 HAL 层

> HAL 层: 在系统启动过程中，主要就是根据内核的 API 去给硬件加载模块，启动相应的硬件设备

- `kthreadd(pid=2)`，内核进程，会创建内核工作线程`kworkder`，软中断线程`ksoftirqd`，`thermal`等内核守护进程 (你或许在[这里](http://jyywiki.cn/OS/2021/labs/M3)见过它)

当内核完成系统设置，和其他的 Linux 内核一样, 它会在系统文件中寻找`init.rc`文件，并启动 init 进程

### Native 层

这一层主要分为两部分：

- C/C++程序库，主要包括 OpenGL ES、Media Framework、SQLite 等等。
- Android 运行时库，其中包括核心库和虚拟机。核心库就是提供 Java 语言的一些核心库功能。虚拟机开始是 Dalvik，后面 5.0 被替换为 ART。

<!-- 上面说过，首先会加载内核，内核中会创建`swapper`进程，之后会启动`init`进程，`init`进程也就诞生在Native这一层了。 -->

入口在`system/core/init/init.cpp`文件中，具体代码就不细说了，`init`进程中主要做了这些事：

- 孵化出用户守护进程。守护进程就是运行在后台的特殊进程，它不存在控制终端，会周期性处理一些任务。比如`logd`进程，就是用来进行日志的读写操作
- 启动了一些重要服务, 比如开机动画
- 创建`AndroidRuntime`并调用其 start 方法启动 `Zygote` (孵化器)进程, 而 `Zygote` 需要从 Native 层向 Framework 层过渡
  - 创建 Java 虚拟机并为 Java 虚拟机注册 JNI 方法
  - 通过 JNI 调用 ZygoteInit 的 main 函数进入 Zygote 的 Java Framework 层
- 启动`Media Server`进程，用来启动和管理整个 C++ framework，比如相机服务（Camera Service）
- 启动`ServiceManager`，它是 Binder 服务管理器，管理所有 Android 系统服务

:::tip JNI

`JNI`（Java Native Interface）是 Java SDK 1.1 时正式推出的，目的是为不同 JVM 实现间提供一个标准**双向**接口，从而使 Java 应用可以使用本地二进制共享库，扩充了原有 JVM 的能力，同时 Java 程序仍然无需再次编译就可以运行在其他平台上，即保持了平台独立性又能使用平台相关的本地共享库提升性能。在 Java 开发中的位置如下图所示。JNI 作为连接平台独立的 Java 层(以下简称 Java 层)与与平台相关的本地环境(以下简称 Native 层)之间的桥梁。Android 内部就大量的使用了 JNI 技术，尤其是在 Libraries 层和 Framework 层。

<img class="aligncenter" src='https://tbfungeek.github.io/2016/07/07/Android-%E8%BF%9B%E9%98%B6%E4%B9%8BJNI-%E5%BC%80%E5%8F%91-%E4%B8%80/1.png' width="400" />

在有些情况下我们需要引入 JNI

- 我们在编程中需要用到某个功能，这个功能之前已经用 C/C++等本地语言进行编写了，这时候为了避免重复造轮子，所以使用 JNI 在 Java 层调用这些已经封装好的方法
- 有些功能需要非常严格的时效性，或者某些方法需要和特定的硬件进行交互，比如某些缓存的操作等。这种情况下就需要使用到 JNI 了
- 为了应用的安全性，会将一些复杂的逻辑和算法通过本地代码来实现，然后封装成 so 动态库文件，并提供 Java 接口供应用层调用，从而防止被反编译

<!-- 但是需要注意的是，Java是一个跨平台的语言，但Native语言未必是，因而一旦引入JNI那么我们很可能失去跨平台的特性。 -->

:::

### Java Framework 层

Framework 层主要提供应用程序所需要的 API。在这一层里，`Zygote`进程需要:

- 创建服务端 Socket，为后续创建进程通信做准备; 同时预加载类和资源
- 加载虚拟机。以 Dalvik 为例，Zygote 是一个 DVM 进程，同时也用来创建和初始化其他 DVM 进程。每当系统需要一个应用程序进程的时候，Zygote 就会 fork 自身，快速地创建和初始化一个 DVM 实例，用于程序运行。对于一些只读的系统库，所有的 DVM 实例都会和 Zygote 共享一块内存区域，节省内存开销。
- fork 了第一个进程——`SystemServer`，负责启动和管理系统服务`ActivityManagerService`，`PackageManagerService`，`WindowManagerService`、`Binder线程池`等
  - `ActivityManagerService`: 负责四大组件的启动，切换，调度工作
  - `PackageManagerService`: 负责 APK 的安装，解析，卸载工作
  - `WindowManagerService`: 负责窗口启动，添加，删除等工作
  - `Binder线程池`: 位于服务端，它的主要作用就是将每个业务模块的 Binder 请求统一转发到远程 Servie 中去执行，从而避免了重复创建 Service 的过程。也就是服务端只有一个，但是可以处理多个不同客户端的 Binder 请求
- fork 了第一个应用进程——`Launcher`来使得用户可以启动应用程序，以及后续的一些系统应用进程

此时`Zygote`作为孵化器进程，它的 main 函数会创建好自己的环境准备孵化子进程，并开始等待 AMS 请求创建新的应用程序进程。

### APP 层

当系统里面的`zygote`进程运行之后，后续启动新应用，就相当于开启一个新的进程；而 Android 为了实现资源共用和更快的启动速度，子进程都是通过`zygote`进程 fork 出来的。所以说，除了`init`进程 fork 出来的第一个进程`zygote`，其他应用进程都是`zygote`的子进程


<!-- :::caution NDK与JNI

NDK（Native Development Kit）是一个开发工具包，提供了很多平台库，可以让开发者使用C和C++开发功能，管理Android设备或者Activity等等。

虽然Android是运行在虚拟机上的，但是NDK开发的程序是可以直接运行在本机内核上的，也就是不需要虚拟机这一层。

一般使用NDK开发动态库，并生成so文件打包在APK中。使用NDK开发主要有以下几点好处：

- 比较安全，反编译难度大。
- 使用c语言，提高执行效率。
- 方便移植，可以在其他嵌入式平台重复使用。

同时，为了使NDK开发出来的动态库和Java本身进行交互，就要用到JNI机制了。

JNI，属于Java虚拟机一部分，是一种Java的本地接口化技术，是提供了Java可以调用c/c++的一种机制。

::: -->

<!-- ## 运行时

## 组件

Android 主要有四大组件， 分别是： 活动 （Activity）、 服务 （Service）、广播接收者（Broadcast Receiver）和内容提供者（Content Provider）。 它们分别承担图形界面、后台服务、应用间通信的管理角色。通常来说一个应 用开发者根据四大组件进行开发，能够涵盖大多数的应用场景。但是安卓中也 有 Native 层的开发，即借助 Java 的 JNI 机制，能够直接编写系统底层代码，使 用系统调用等进行应用开发，虽然门槛更高但是具有更高的灵活性和性能。 -->
