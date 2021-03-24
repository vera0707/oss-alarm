<template>
  <div class="alarm-window" v-if="con_socketId && con_socketRequest.webSocketUrl">
    <Header
      v-if="con_title.enable || con_tabs.enable"
      :title="con_title"
      :tabs="con_tabs"
      :activeTab="String(activeTab)"
      @onChangeAlarmTab="changeAlarmTab"
    />
    <Features
      :levelConfig="con_features.alarmCount"
      :levelData="alarmTableCount"
      :isStopUpdate="isStopUpdate"
      :canLock="can_lock"
      @onUserOperation="userOperation"
    />
    <Window
      ref="ossWindow"
      :socketId="con_socketId"
      :canLock="can_lock"
      :windowConfig="con_window"
      :alarmListData="alarmUpdataList"
      @changeSystemUpdata="systemOperationUpdate"
    />
  </div>
</template>
<script>
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import merge from 'lodash/merge'
import defaltData from '../conf/defaltData';
import Header from "./components/header";
import Features from "./components/features";
import Window from "./components/window";

let timer = null;

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
  },
  watch:{
    alarmConfig:{
      deep: true,
      // immediate: true,
      handler(val = {}){
        const _config = merge(defaltData,val);
        Object.keys(_config).forEach(name=>{
          if(JSON.stringify(this[`con_${name}`]) !== JSON.stringify(_config[name])){
            this[`con_${name}`] = _config[name];
          }
        });
        this.startWebsocket();
      }
    },
    isStopUpdate(val){
      if(val) this.startUpdateAlarmData()
      else this.stopUpdateAlarmData()
    }
  },
  computed: {
    isStopUpdate() {
      return this.userStopUpdata || this.systemStopUpdate
    },
    can_lock() {
      const {lock} = this.con_features;
      return Boolean(typeof lock === 'object' ? lock.enable : lock)
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
      con_title: {},
      con_tabs: {},
      con_features: {},
      con_socketRequest: {},
      con_window: {},
      con_socketId: null,
    };
  },
  methods: {
    startWebsocket() {
      const { con_socketId, con_socketRequest,connectStatus} = this;
      if(con_socketId && con_socketRequest.webSocketUrl && !connectStatus) {
        new Promise((resolve) => {
          this.initWebSocket(resolve);
          }).then(() => {
            this.quertViewData();
          });
        }
    },
    initWebSocket(resolve) {
      this.socket = new SockJS(`${this.con_socketRequest.webSocketUrl}`);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect({}, () => {
        this.connectStatus = true;
        if (resolve && typeof resolve === "function") resolve();
      });
    },
    quertViewData() {
      this.stompClient.send(this.con_socketRequest.getViewUrl, {}, this.con_socketId);
      this.stompClient.subscribe(
        this.con_socketRequest.subscribeViewUrl,
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
    /* 系统暂停流水窗 */
    systemOperationUpdate(isStopSystem,isAutoRestore) {
      if(!isStopSystem && isAutoRestore && this.con_features.autoStopTimer.enable) {
        this.setSyetemUpdataTimer();
      }
      if(isStopSystem && !this.isStopUpdate){
        this.systemStopUpdate = isStopSystem;
        this.$message.warning('检测到您正在操作，已暂停窗口刷新，可手动恢复~')
      }
    },
    /* 用户暂停/启动流水窗 */
    userOperationUserUpdate(isStopUser) {
      this.userStopUpdata = isStopUser;
      this.systemStopUpdate = false;
      this.clearSystemTimer()
    },
    /* 用户锁定🔐数据 */
    userOperationLockMultipleData() {
      this.$refs.ossWindow.lockMultipleRows();
    },
    /* 启动监听流水窗 */
    startUpdateAlarmData () {
      this.stompClient.send(this.con_socketRequest.startViewUrl,
        {},
        JSON.stringify([this.con_socketId])
      )
    },
    /* 暂停流水窗 */
    stopUpdateAlarmData () {
      this.stompClient.send(
        this.con_socketRequest.stopViewUrl,
        {},
        JSON.stringify([this.con_socketId])
      )
    },
    /* 更改筛选条件 */
    updataAlarmSearch (filter) {
      if (this.connectStatus && this.alarmId) {
        const params = {
          ...filter,
          websocketId: this.con_socketId,
        };
        if(this.con_tabs.enable) {
          params[this.con_tabs.props.field]
        }
        
        this.stompClient.send(
          this.con_socketRequest.filterViewUrl, {},
          JSON.stringify(params)
        )
        this.userOperationUserUpdate(false)
      }
    },
    setSyetemUpdataTimer() {
      this.clearSystemTimer()
      timer = setTimeout(()=>{
        if(this.isStopUpdate) {
          this.systemStopUpdate = false;
          this.userStopUpdata = false;
          this.$message.warning('检测到长久无操作，已为您恢复窗口刷新~');
        }
        this.clearSystemTimer()
      },this.con_features.autoStopTimer.autoTime)
    },
    clearSystemTimer() {
      if(timer) clearTimeout(timer);
      timer = null;
    },
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
