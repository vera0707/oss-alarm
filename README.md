<p font-size="40px" align="center">基于 Vue 和 Webpack 构建的告警组件库</p>

<h2 align="center">安装 & 使用(node>v12)</h2>
  
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

import alarmWindow from 'oss-alam/lib/alarm-window/index.js'

Vue.use(alarmWindow)
```

### 开发

```bash
git clone https://github.com/vera0707/oss-alarm.git

cd oss-alarm

npm install 

npm run dev

# 启动文档开发

npm run docs
```

### 命令介绍

```bash

npm run dev             #启动组件开发

npm run docs            #启动文档开发

npm run prod            #组件构建

npm run build           #整体构建

npm run build:component #按需组件构建

npm run eslint            #eslint测试
```

<!-- 问题记录 -->

1.dev环境的热更新配置了没有起来  - 目测是只监听了src文件
2.build打包后的文件不能为正确引用 - 严重 - 考虑依赖文件没有打包全