// 默认配置数据
export default {
  /* 告警标题 */ 
  title: {
    enable: true,
    name: '告警流水窗',
    class: null,
    style: null
  },
  /* 标签切换 */
  tabs: {
    enable: true,
    value: [],
    props: {
      key: 'name',
      field: 'value'
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
        key: 'name',
        field: 'value'
      },
      data: [
        { name: "一级告警", field: "1", class: "level2" },
        { name: "二级告警", field: "2", class: "level3" },
        { name: "三级告警", field: "3", class: "level4" },
        { name: "四级告警", field: "4", class: "level5" },
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
  },
  /* 窗口设置 */
  window: {
    /* 表头字段 */
    headerList: [],
    headerListrProp: {
      key: 'field',
      headerName: 'value'
    },
    resizable: true,
    sortable: true,
    filter: true
  }
}