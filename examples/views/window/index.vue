<template>
  <div>
    <h2>告警监控</h2>
    <p class="tip">告警流水窗OssAlarmWindow：用于告警监控、告警操作</p>
    <div class="oss-window">
      <OssAlarmWindow :alarmConfig="alarmConfig" />
    </div>
    <p class="demo-code">显示代码</p>
    <pre v-highlightjs>
      <code class="javascript">{{htmlCode[0]}}</code>
      <code class="javascript">{{htmlCode[1]}}</code>
    </pre>
    <div>AlarmWindow Attributes</div>
    <el-table>
      
    </el-table>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      alarmConfig: {},
      htmlCode: [
        `
        <OssAlarmWindow :alarmConfig="alarmConfig" />
        `,
        ` 
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
                subscribeViewUrl: '/topic/socketId',
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
              },
            };
        `
      ]
    };
  },
  created() {
    this.fetch();
    console.log('走你,go');
  },
  methods: {
    fetch() {
      console.log('fetch');
      axios
        .post('/rca-sla/nsi/topo/open/socket', {}, {})
        .then((response) => {
          console.log('去请求',response.data);
          if (response.status === 200 && response.data.retCode === '200') {
            const { alarmShow, alarmShowTitle, socketId } = response.data.data;
            const alarmShowArr = alarmShow.split(',');
            const alarmShowTitleArr = alarmShowTitle.split(',');
            console.log(this);

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
            console.log('???',alarmConfig)
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
  .oss-window {
    width: 100%;
    height: 50vh;
  }
</style>
