---
sidebar_position: 2
---

# Lab 4 : 位置信息调查


## 实验目的

- 探究地图应用是如何获取位置信息的
- 探究提供位置信息获取能力的 SDK 是如何工作的
- 探究平台型应用是如何使用 Jsbridge 传递数据的


## 实验内容

在 Lab3 中我们接触了 Frida 这样的动态分析工具，使用它 Hook 并分析了一些应用。本次实验请大家围绕**位置信息**，探究平台型应用的隐私数据获取和传递流程。我们的任务将更加具体：

1. 请尝试探究地图类的应用是如何获取地理位置信息的(**必做**)

- [百度地图](https://apkpure.com/%E7%99%BE%E5%BA%A6%E5%9C%B0%E5%9B%BE/com.baidu.BaiduMap)
- [高德地图](https://apkpure.com/%E9%AB%98%E5%BE%B7%E5%9C%B0%E5%9B%BE/com.autonavi.minimap)
- [腾讯地图](https://apkpure.com/%E8%85%BE%E8%AE%AF%E5%9C%B0%E5%9B%BE/com.tencent.map)


2. 然后参考你在 (1) 中的发现，请分析提供定位服务的 SDK 是如何工作的：

> 一个可行的方法是开发一个 Demo App ([Build your first app](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwj93c3ppfr-AhWUb94KHRjrAboQFnoECBUQAQ&url=https%3A%2F%2Fdeveloper.android.com%2Ftraining%2Fbasics%2Ffirstapp&usg=AOvVaw0WL3WUlfCPHHTAAwZI1ncA)) , 然后嵌入这个 SDK 以避免无关代码的干扰

- [百度开放平台-Android定位SDK](https://lbsyun.baidu.com/index.php?title=android-locsdk)
- [高德开放平台-Android定位SDK](https://lbs.amap.com/api/android-location-sdk/locationsummary/)
- [华为HMS Core-Android定位SDK](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/android-introduction-0000001121930588)
- [腾讯位置服务-Android定位SDK](https://lbs.qq.com/mobile/androidLocationSDK/androidGeoGuide/androidGeoOverview)
- [Google Map-Select Current Place and Show Details on a Map](https://developers.google.com/maps/documentation/android-sdk/current-place-tutorial[])


3. 以下列出了部分提供 H5 开放能力的 SDK，其使用的机制即使我们之前所介绍的平台型应用所依赖的 Jsbridge。请选择一个 SDK 和其对应的 H5开放文档，针对位置信息的获取，分别指出在原生侧是如何获得数据，收集数据并使用 Jsbridge 传递给 Web 端的，Web端又是如何接受数据的:

- [高德开放平台-新版辅助H5页面定位](https://lbs.amap.com/api/android-location-sdk/guide/android-location/new-assistant_location)
- [支付宝H5开放文档-获取地理位置](https://myjsapi.alipay.com/jsapi/native/get-location.html)
- [微信开放文档-JSSDK](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
...

## 实验报告

> 实验报告应该清晰、有条理，有良好的格式和结构, 并且**严禁抄袭**

本次实验报告可自由组织内容，需包括以下内容：

1. 所选择的应用和SDK，以及实验过程和你完成的工作内容

2. (如果有)在实验中发现的问题，以及你认为可能的原因


## 实验提交

:::caution 随堂验收

**2023.5.31** 课上, 有些需要演示的内容可以提前录制好

:::


**报告提交截止日期: 2023.6.4 23:59**

- 提交邮箱: [191250004@smail.nju.edu.cn](mailto:cys@smail.nju.edu.cn)
- 提交内容：
  - 实验报告：lab3-report-学号.pdf
  - 其他材料可作为附件

```bash
lab4-学号-姓名.zip
└─lab4-学号-姓名
    ├─lab4-report-学号.pdf
    └─附件
```