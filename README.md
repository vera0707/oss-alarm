<p font-size="40px" align="center">基于 Vue2.0 和 Webpack 构建的告警组件库</p>

<h2 align="center">安装 & 使用(node>v12) </h2>
<h4>注：本版本暂不支持vue3</h4> 

```bash
npm install oss-alarm -S
```  


```js
import Vue from 'vue'

import OssAlarm from 'oss-alarm'

Vue.use(OssAlarm)
```

### 按需加载

```js
import Vue from 'vue'

import OssAlarmWindow from 'oss-alam/lib/alarm-window/index.js'
import 'oss-alam/lib/alarm-window/index.css'

Vue.use(OssAlarmWindow)
```


### 开发

```bash
git clone https://github.com/vera0707/oss-alarm.git

cd oss-alarm

npm install 

npm run dev
```

### 命令介绍

```bash

npm run dev               #启动组件开发

npm run prod              #整体构建

npm run build             #线上构建

npm run build:component   #按需组件构建

npm run eslint            #eslint测试
```

#### 告警流水窗组件(OssAlarmWindow )介绍

    告警流水窗是OSS核心功能，现满足每秒推送量1000条、日推送百万的大数据推送。
    使用时需要与后台JDK包搭配使用，在此基础上最大程度支持自定义、扩展。

目前支持
- [x]  用户手动启动/关闭数据推送
- [x]  用户操作自动启动/关闭数据推送
- [x]  支持数据锁定/消除锁定
- [x]  支持告警类型自定义/切换
- [x]  支持显示告警
- [x]  支持窗口配置
- []   支持窗口隐藏
- []   支持窗口拖拽
- [x]  支持窗口列拖动
- [x]  支持窗口列筛选
- [x]  支持窗口列宽拖动
- [x]  支持窗口数据排序
- [x]  支持窗口数据自定义渲染
- [x]  支持操作菜单<告警确认/清除/备注>
- []   支持右键操作菜单<告警确认/清除/备注>
- [x]  支持浏览器右键菜单屏蔽

