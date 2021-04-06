<template>
  <div class="oss-window-container">
    <div class="oss-window-logo"></div>
    <div class="oss-window-header">OSS ALARM WINDOW</div>
    <div class="oss-window">
      <OssAlarmWindow :alarmConfig="alarmConfig" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      alarmConfig: {},
    };
  },
  created() {
    console.log('are you go');
    this.fetch();
  },
  methods: {
    fetch() {
      axios
        .post('/rca-sla/nsi/topo/open/socket', {}, {})
        .then((response) => {
          if (response.status === 200 && response.data.retCode === '200') {
            const { alarmShow, alarmShowTitle, socketId } = response.data.data;
            const alarmShowArr = alarmShow.split(',');
            const alarmShowTitleArr = alarmShowTitle.split(',');

            this.alarmConfig = {
              socketId,
              title: {
                enable: true,
                name: '传输-告警流水窗',
              },
              tabs: {
                enable: true,
                value: [
                  { key: 1, value: '活动告警' },
                  { key: 2, value: '确认告警' },
                  { key: 3, value: '清除告警' },
                ],
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
                headerList: alarmShowArr.map((v, i) => ({
                  field: v,
                  headerName: alarmShowTitleArr[i],
                })),
                cellRenderer: {
                  alarmStatus: (params) => `
                  <div class="alarm-tag level-${params.value}">
                    ${['一', '二', '三', '四'][params.value - 1]}级告警
                  </div>
                `,
                },
              },
            };
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.oss-window-container {
  display: block;
  width: 100vw;
  height: 100vh;
  background-image: url("~images/alarm-window/example_bg.jpeg");
  backface-visibility: hidden;
  position: relative;
  overflow: hidden;

  .oss-window-header {
    position: absolute;
    font-size: 34px;
    font-weight: bold;
    left: 80px;
    top: 30px;
    color: white;
    font-family: proxima-nova, -apple-system, BlinkMacSystemFont, segoe ui,
      Roboto, helvetica neue, Arial, sans-serif;
  }
  .oss-window-logo {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 30px;
    top: 30px;
    background: url("~images/logo.png");
    background-size: 40px;
  }
  .oss-window {
    width: 50vw;
    height: 50vh;
    position: absolute;
    top: 15vh;
    left: 25vw;
    // box-shadow: 0px 0px 500px black;
  }
}
</style>
