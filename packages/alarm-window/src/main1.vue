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
      :alarmCountConfig="features.alarmHeader"
      :alarmCountData="alarmTableCount"
      :isStopUpdate="userStopUpdata || systemStopUpdate"
      @onUserOperation="userOperation"
    />
    <Window
      :socketId="socketId"
      :windowConfig="(this.alarmConfig || {}).window || {}"
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
    socketId: {
      type: String,
    },
  },
  watch: {
    socketId(newV, oldV) {
      if (newV && !oldV) {
        this.startWebsocket();
      }
    },
  },
  computed: {
    alarmRequest() {
      return (this.alarmConfig || {}).alarmRequest || {};
    },
    title() {
      let title = (this.alarmConfig || {}).title;
      if (!title) return { enable: false };
      if (typeof title === "string") return { enable: true, name: title };
      if (title.name) return title;
      return { enable: false };
    },
    tabs() {
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
        alarmHeader: {
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
      userStopUpdata: false, // 用户手动关闭刷新功能
      systemStopUpdate: false, // 系统关闭刷新功能
      alarmUpdataList: {},
      alarmTableCount: {},
      socket: null,
      stompClient: null,
      connectStatus: false,
    };
  },
  created() {
    if(this.socketId) {
      this.startWebsocket();
    }
  },
  methods: {
    startWebsocket() {
      new Promise((resolve) => {
        this.initWebSocket(resolve);
      }).then(() => {
        this.quertViewData();
      });
    },
    initWebSocket(resolve) {
      this.socket = new SockJS(`${this.alarmRequest.webSocketUrl}`);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect({}, () => {
        this.connectStatus = true;
        if (resolve && typeof resolve === "function") resolve();
      });
    },
    quertViewData() {
      this.stompClient.send(this.alarmRequest.getViewUrl, {}, this.socketId);
      this.stompClient.subscribe(
        this.alarmRequest.subscribeViewUrl,
        (response) => {
          const { data, dataType = "", dataCount = {} } = JSON.parse(
            response.body
          );
          if (dataType === "listInfo" || dataType === "kafkaAlarm") {
            if (data.length > 100) data.length = 100;
            const tempData = data instanceof Array ? data : [data];
            this.alarmUpdataList = { dataType, data: tempData };
            this.alarmTableCount = dataCount;
          }
        }
      );
    },
    changeAlarmTab(key) {
      this.activeTab = key;
    },
    userOperation({ type, status = true }) {
      this[`userOperation${type}`](status)
    },
    // 用户暂停/启动流水窗
    userOperationUserUpdate(isStopUpdate) {
      this.userStopUpdata = isStopUpdate;
    }
  },
};
</script>
<style lang="scss" scoped>
.alarm-window {
  width: 100%;
  height: 100%;
  border: 1px solid #e4e6ea;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}
</style>
