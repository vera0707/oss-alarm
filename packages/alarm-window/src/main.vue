<template>
  <!-- v-if="socketId && alarmRequest.socketUrl" -->
  <div class="alarm-window">
    <Header
      v-if="title.enable || tabs.enable"
      :title="title"
      :tabs="tabs"
      :activeTab="String(activeTab)"
      @onChangeAlarmTab="changeAlarmTab"
    />
    <Features
      :alarmCount="features.alarmCount"
      :updateStatus="updateStatus"
    />
    <Window
      :socketId="socketId"
      :activeTab="String(activeTab)"
      :alarmListData="alarmUpdataList"
    />
  </div>
</template>
<script>
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Header from "./components/header";
import Features from "./components/features";
import Window from "./components/window";

export default {
  name: "OssAlarmWindow",
  components: {
    Header,
    Features,
    Window,
  },
  props: {
    alarmConfig: {
      type: Object,
      default: () => {},
    },
    // alarmRequest: {
    //   type: Object,
    //   default: () => {},
    // },
    // socketId: {
    //   type: Object,
    // },
  },
  watch: {
    socketId(newV, oldV) {
      if (newV && !oldV) {
        new Promise((resolve) => {
          this.initWebSocket(resolve);
        }).then(() => {
          this.quertViewData();
        });
      }
    },
  },
  computed: {
    socketId() {
      return (this.alarmConfig || {}).socketId || "";
    },
    alarmRequest() {
      return (this.alarmConfig || {}).alarmRequest || {};
    },
    title() {
      /* 告警标题 { 
          enable: Boolean, 
          name: String, 
          class: String ,
          Style: Object | String 
        }
      */
      let title = (this.alarmConfig || {}).title;
      if (!title) return { enable: false };
      if (typeof title === "string") return { enable: true, name: title };
      if (title.name) return title;
      return { enable: false };
    },
    tabs() {
      /* 标签切换
        value: Object,
        props: {
          key: key
          value: value
        },
        tabsClass: String,
        tabsStyle: Object | String
        tabItemClass: String,
        tabItemStyle: Object | String
      */
      const tabs = (this.alarmConfig || {}).tabs || {};
      if (tabs.data && tabs.data.length) {
        const resTabs = {
          enable: true,
          props: { key: "key", value: "value" },
          ...tabs,
        };
        this.activeTab = tabs.data[0][resTabs.props.key];
        return resTabs;
      }
      return { enable: false };
    },
    features() {
      return {
        alarmCount: {
          enable: true,
          alarmClass: null,
          alarmStyle: null,
          data: [
            { name: "一级告警", field: "1", class: "level2" },
            { name: "二级告警", field: "2", class: "level3" },
            { name: "三级告警", field: "3", class: "level4" },
            { name: "四级告警", field: "4", class: "level5" },
          ],
        },
        launcher: {
          enable: true,
          iconUrl: null,
          isAutoPush: true,
          autoPushTime: 1000,
        },
        lock: {
          enable: true,
          iconUrl: null,
        },
      };
    },
  },
  data() {
    return {
      activeTab: null,
      updateStatus: true, // 启停状态
      alarmUpdataList: {},
      alarmTableCount: {},
      socket: null,
      stompClient: null,
      connectStatus: false,
    };
  },
  methods: {
    initWebSocket() {
      this.socket = new SockJS(`${this.alarmRequest.webSocketUrl}`);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect({}, () => {
        this.connectStatus = true;
        if (resolve && typeof resolve === "function") resolve();
      });
    },
    quertViewData() {
      this.stompClient.send(this.alarmRequest.getViewUrl, {}, this.socketId);
      this.stompClient.subscribe(`/topic/${this.alarmId}`, (response) => {
        const { data, dataType = "", dataCount = {} } = JSON.parse(
          response.body
        );
        if (dataType === "listInfo" || dataType === "kafkaAlarm") {
          if (data.length > 100) data.length = 100;
          const tempData = data instanceof Array ? data : [data];
          this.alarmUpdataList = { dataType, data: tempData };
          this.alarmTableCount = dataCount;
        }
      });
    },
    changeAlarmTab(key) {
      this.activeTab = key;
    },
  },
};
</script>
<style lang="scss" scoped>
.alarm-window {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
