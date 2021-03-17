<template>
  <div>
    <div>告警流水窗：地址/alarm-window 组件名：OssAlarmWindow</div>
    <div class="oss-window">
      <OssAlarmWindow :alarmConfig="alarmConfig" />
    </div>
  </div>
</template>
<script>
const title = {
  enable: true,
  name: '告警流水窗'
};
const tabs = {
  data: [
    { key: 1,value: '活动告警' },
    { key: 2,value: '确认告警' },
    { key: 3,value: '清除告警' },
  ]
}
const window = {
  headerData: [
    {key: 'rootAlarmId', value: '根因告警ID'},
    {key: 'addInfo', value: '告警辅助信息'},
    {key: 'alarmId', value: '告警标识'},
    {key: 'alarmSeq', value: '告警流水号'},
    {key: 'alarmStatus', value: '告警状态'},
    {key: 'alarmTitle', value: '告警标题'},
    {key: 'alarmType', value: '告警类型'},
    {key: 'causeType', value: '原因预归类'},
    {key: 'eventTime', value: '发生时间'},
    {key: 'cancelTime', value: '清除时间'},
    {key: 'neName', value: '网元名称'},
  ]
};
const alarmRequest = {
  webSocketUrl: 'http://10.1.193.28/rca-sla/AlarmSocket',
  getViewUrl: '/app/sliceInstanceTopo/getViewInfo',
  subscribeViewUrl: '/topic/mysocketId',
  stopViewUrl: '/app/sliceInstanceTopo/stopSocket',
  startViewUrl: '/app/sliceInstanceTopo/startSocket',
  filterViewUrl: '/app/sliceInstanceTopo/updateSearch',
}
export default {
  data(){
    return {
      alarmConfig: {
        socketId: 'mysocketId',
        alarmRequest,
        title,
        tabs,
        window,
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.oss-window{
  display: block;
  width: 1000px;
  height: 800px;
  margin: 50px auto;
}
</style>