<template>
  <div>
    <div>告警流水窗：地址/alarm-window 组件名：OssAlarmWindow</div>
    <div class="oss-window">
      <OssAlarmWindow
        :alarmConfig="alarmConfig"
        />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
const window = {};
export default {
  data(){
    return {
      alarmConfig: {},
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

          this.alarmConfig = {
            socketId,
            title: {
              enable: true,
              name: '传输-告警流水窗'
            },
            tabs: {
              enable: true,
              value: [
                { key: 1,value: '活动告警' },
                { key: 2,value: '确认告警' },
                { key: 3,value: '清除告警' },
              ]
            },
            socketRequest: {
              webSocketUrl: 'http://10.1.193.28/rca-sla/AlarmSocket',
              subscribeViewUrl: `/topic/${socketId}`,
              getViewUrl: '/app/sliceInstanceTopo/getViewInfo',
              stopViewUrl: '/app/sliceInstanceTopo/stopSocket',
              startViewUrl: '/app/sliceInstanceTopo/startSocket',
              filterViewUrl: '/app/sliceInstanceTopo/updateSearch',
            },
            window: {
              headerList: alarmShowArr.map((v,i)=>({
                field: v,
                colId: v,
                headerName: alarmShowTitleArr[i]
              }))
            },
          };
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