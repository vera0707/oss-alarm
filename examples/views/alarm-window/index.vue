<template>
  <div>
    <div>告警流水窗：地址/alarm-window 组件名：OssAlarmWindow</div>
    <div class="oss-window">
      <OssAlarmWindow
        :alarmConfig="alarmConfig"
        :socketId="socketId"
        />
    </div>
  </div>
</template>
<script>
import axios from 'axios';

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
const window = {};
const alarmRequest = {
  webSocketUrl: 'http://10.1.193.28/rca-sla/AlarmSocket',
  getViewUrl: '/app/sliceInstanceTopo/getViewInfo',
  stopViewUrl: '/app/sliceInstanceTopo/stopSocket',
  startViewUrl: '/app/sliceInstanceTopo/startSocket',
  filterViewUrl: '/app/sliceInstanceTopo/updateSearch',
}
export default {
  data(){
    return {
      alarmConfig: {},
      socketId: null
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      axios.post('/rca-sla/nsi/topo/open/socket', {}, {})
      .then((response) => {
        if(response.status === 200 && response.data.retCode === '200') {
          const { alarmShow, alarmShowTitle, socketId  } = response.data.data;
          const alarmShowArr = alarmShow.split(',');
          const alarmShowTitleArr = alarmShowTitle.split(',');
          window.headerData = alarmShowArr.map((v,i)=>({
            field: v,
            colId: v,
            headerName: alarmShowTitleArr[i]
          }))
        alarmRequest.subscribeViewUrl = `/topic/${socketId}`;

        this.alarmConfig = {
          alarmRequest,
          title,
          tabs,
          window,
        },
          this.socketId = socketId;
        }
      })
      .catch((error) => {
        console.log(error);
      });
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