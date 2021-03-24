// 默认配置数据
export default {
  socketId: null,
  /* 告警标题 */ 
  title: {
    enable: false,
    name: '告警流水窗',
    class: null,
    style: null
  },
  /* 标签切换 */
  tabs: {
    enable: false,
    value: [],
    props: {
      field: 'key',
      name: 'value'
    },
    class: null,
    style: null,
    tabItemClass: null,
    tabItemStyle: null
  },
  /* 工具栏 */
  features: {
    /* 告警数量配置 */
    alarmCount: {
      enable: true,
      class: null,
      style: null,
      props: {
        field: 'key',
        name: 'value'
      },
      data: [
        { key: "1", value: "一级告警", class: "level2" },
        { key: "2", value: "二级告警", class: "level3" },
        { key: "3", value: "三级告警", class: "level4" },
        { key: "4", value: "四级告警", class: "level5" },
      ],
    },
    /* 暂停/启动功能 */
    userUpdata: {
      enable: true,
      iconUrl: true,
      actionAutoStopUpdata: true,
      actionAutoStopTimer: 3000,
    },
    /* 数据锁定功能 */
    lock: {
      enable: true,
      iconUrl: null,
    },
    autoStopTimer: {
      enable: true,
      autoTime: 5000,
    },
  },
  /* webSocket接口 */
  socketRequest: {
    webSocketUrl: null,       // 连接
    subscribeViewUrl: null,   // 窗口监听
    getViewUrl: null,         // 获取窗口
    startViewUrl: null,       // 启动窗口推送
    stopViewUrl: null,        // 关闭窗口推送
    filterViewUrl: null,       // 更改窗口配置参数
  },
  /* 窗口设置 */
  window: {
    /* 表头字段 */
    headerList: [],
    headerListrProp: {
      field: 'field',
      name: 'headerName'
    },
    rowHeight: 32,
    resizable: true,
    sortable: true,
    filter: true
  }
}