<template>
  <div id="app" @click="clickEvent">
    <header class="page-header">
      <div class="left">
        <img src="../images/logo.png" class="logo" alt="logo" />
        <span class="title">oss-alarm</span>
      </div>
    </header>
    <div class="page-container">
      <div class="aside visible">
        <el-input placeholder="请输入内容" class="search"></el-input>
        <ul class="nav-menu">
          <li
            v-for="item in apiList"
            :key="item.id"
            :class="{ title: item.type == 'title', active: item.id == pageKey }"
            class="nav-item"
            @click="changeNav(item)"
          >
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
const apiList = [
  {
    id: 0,
    label: "Begin",
    path: "index",
  },
  {
    id: 1,
    label: "开发指南",
    type: "title",
  },
  {
    id: 2,
    label: "全局安装",
    path: "startInstall",
  },
  {
    id: 3,
    label: "按需加载",
    path: "startUse",
  },
  {
    id: 4,
    label: "全局主题",
    path: "startTheme",
  },
  {
    id: 5,
    label: "组件",
    type: "title",
  },
  {
    id: 6,
    label: "告警监控",
    path: "alarmWindow",
  },
];
export default {
  name: "App",
  data() {
    return {
      pageKey: 0,
      apiList,
    };
  },
  created() {
    const pathName = this.$router.currentRoute.name;
    const currentApi = apiList.filter(v=>v.path === pathName);
    if(currentApi && currentApi.length) {
      this.pageKey = currentApi[0].id;
    }
  },
  methods: {
    changeNav({ id, type, path }) {
      if (type === "title") return;
      this.pageKey = id;
      if (path) {
        this.$router.push({ name: path });
      }
    },
    clickEvent(evnt) {
      const pElem = evnt.target
      if (pElem && pElem.className === 'demo-code') {
        const nextElem = pElem.nextSibling
        if (nextElem && nextElem.tagName.toLowerCase() === 'pre') {
          if (nextElem.className.indexOf('is-show') > -1) {
            nextElem.className = ''
          } else {
            nextElem.className = 'is-show'
          }
        }
      }
    }
  },
};
</script>
