---
sidebar_position: 3
---

# 环境与材料



## 虚拟机

因为需要实际安装 app 并运行所以可以使用虚拟机环境, 这里推荐使用常用的
- `Android Virtual Device`(AVD): [Android Studio](https://developer.android.com/studio) 配套的虚拟机 [[安装教程](https://zhuanlan.zhihu.com/p/456126708)]

> 但是需要注意的是, AVD 默认使用的是和PC平台原生的`x86_64`架构，如果有同学想自己选择app来完成实验的话, 安装一些没有x86运行库的app(如南京大学app, 百度, 抖音等)时会遇到问题, 而`arm`架构的实例运行速度非常不理想

也可以使用一些商业~~(手游)~~模拟器，如[网易MuMu模拟器](https://mumu.163.com/)，[BlueStacks](https://www.bluestacks.com/)等

> 正在使用WSL2的同学如果选用该类模拟器，请注意所选择的模拟器是否与`Hyper-V`功能相冲突


## 推荐实验环境

以 `AVD` 为例的虚拟机环境为：

| Release Name | API Level | ABI | Target |
| :-: | :-: | --- | --- |
| S | 31 | x86_64 | Android 12.0 (Google Play) |

## 实验所需的 App

实验所需的 apk 参见 Gitlab 仓库「[materials](https://git.nju.edu.cn/flyingtom/materials)」

> 也可以联系助教, 自己选定其他的 app 完成实验
