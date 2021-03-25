<template>
  <ag-grid-vue
    ref="ossAgWindow"
    class="ag-theme-balham oss"
    :columnDefs="columnDefs"
    :rowData="filterTableList(alarmTableList)"
    :pinnedTopRowData="[]"
    :defaultColDef="{ resizable: true, sortable: true, filter: true }"
    :localeText="localeText"
    :animateRows="true"
    :rowHeight="windowConfig.rowHeight"
    :suppressRowClickSelection="true"
    :rowBuffer="Math.ceil(windowHeight/windowConfig.rowHeight)"
    rowSelection="multiple"
    @grid-ready="onGridReady"
    @cellClicked="cellClicked"
    @selectionChanged="onSelectionChanged"
  ></ag-grid-vue>
</template>
<script>
import { AgGridVue } from "ag-grid-vue";

const localeText = {
  equals: "相等",
  notEqual: "不相等",
  lessThan: "小于",
  greaterThan: "大于",
  lessThanOrEqual: "小于等于",
  greaterThanOrEqual: "大于等于",
  inRange: "范围",
  contains: "包含",
  notContains: "不包含",
  startsWith: "开始于",
  endsWith: "结束于",
  noRowsToShow: "暂无数据",
};

const pinnedTopRowData = [] // 锁定数据🔒

export default {
  props: {
    /* 流水窗ID */
    socketId: String,
    /* 流水窗配置 */
    windowConfig: Object,
    /* 是否支持数据锁定🔐 */
    canLock: Boolean,
    /* 窗口更新数据 */
    alarmListData: Object,
  },
  components: {
    AgGridVue,
  },
  watch: {
    alarmListData: {
      immediate: true,
      deep: true,
      handler(newV) {
        const { dataType, data, clearData } = newV;
        if (dataType && data) {
          if (dataType === "listInfo") this.alarmTableList = data;
          else if (dataType === "kafkaAlarm" && data.length) {
            const { alarmTableList } = this;
            alarmTableList.unshift(...data);
            if (alarmTableList.length > 1000) alarmTableList.length = 1000;
            this.alarmTableList = alarmTableList;
          }
          if (clearData) {
            const { alarmClearData } = this;
            alarmClearData.unshift(...clearData);
            if (alarmClearData.length > 50) alarmClearData.length = 50;
            this.alarmClearData = alarmClearData;
          }
        }
      },
    },
  },
  computed: {
    columnDefs() {
      const columnDefs = this.windowConfig.headerList || [];
      if (this.canLock) {
        columnDefs.unshift(
          {
            headerName: "",
            field: "colId",
            checkboxSelection: true,
            headerCheckboxSelection: true,
            pinned: "left",
            filter: false,
            sortable: false,
            width: 35,
            lockPosition: true,
          },
          {
            headerName: "状态标识",
            field: "isFreeze",
            filter: false,
            sortable: false,
            pinned: "left",
            width: 60,
            lockPosition: true,
            cellRenderer: () => '<div class="lock-icon"></div>',
          }
        );
      }
      return columnDefs;
    },
  },
  mounted(){
    this.windowHeight = this.$refs.ossAgWindow.$el.offsetHeight
    window.onresize = () => {
      this.windowHeight = this.$refs.ossAgWindow.$el.offsetHeight
    }
  },
  data() {
    return {
      alarmTableList: [],  // 列表数据
      alarmClearData: [],  // 清除数据
      localeText,          // 汉化
      windowHeight: 300,   // 窗口大小
    };
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.columnApi = params.columnApi
    },
    cellClicked(target) {
      const {field} = target.column.colDef;
      console.log('====',target)
      if(field === 'isFreeze') {
        if(target.rowPinned === 'top') {
          pinnedTopRowData.splice(target.rowIndex,1);
          this.gridApi.setPinnedTopRowData(pinnedTopRowData);
        }
      }
    },  
    filterTableList(tableList) {
      return tableList.filter((v) => !this.alarmClearData.includes(v.rowkey));
    },
    lockMultipleRows() {
      const lockRows = this.gridApi.getSelectedRows()
      pinnedTopRowData.push(...lockRows);
      this.gridApi.updateRowData({ remove: lockRows })
      this.gridApi.setPinnedTopRowData(pinnedTopRowData);
    },
    onSelectionChanged(event) {
      const dataLength = event.api.getSelectedNodes().length;
      this.$emit('changeSystemUpdata',dataLength !== 0, true)
    },
  },
};
</script>
<style lang="scss">
.ag-theme-balham.oss {
  min-width: 100%;
  height: calc(100% - 80px);
  .ag-cell-focus:not(.ag-cell-range-selected) {
    border: none !important;
  }
  .ag-root-wrapper {
    border-width: 0px;
  }
  .ag-header {
    border-bottom-width: 0px;
    background: rgba(123, 147, 167, 0.1);
  }
  .ag-row {
    color: #455a74;
    border-top-width: 0;
    border-bottom-width: 0;
    cursor: pointer;
  }
  .ag-cell {
    line-height: 32px;
    border: none;
    &:focus,
    &:active {
      border: none;
    }
  }
  .ag-cell.ag-cell-last-left-pinned:not(.ag-cell-range-right):not(.ag-cell-range-single-cell) {
    border-right: solid 1px #ebebeb;
  }
  .ag-cell.ag-cell-first-right-pinned:not(.ag-cell-range-left):not(.ag-cell-range-single-cell) {
    border-left-color: transparent;
  }
  .ag-pinned-right-floating-top,
  .ag-pinned-right-cols-container {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  }
  .ag-pinned-left-header {
    border-right: 1px solid #ebebeb;
  }
  .ag-floating-top {
    color: #455a74;
    border-bottom: none;
  }
  .ag-row-odd {
    background: #fafafa;
  }
  .ag-row-selected {
    background: transparent;
    cursor: pointer;
  }
  .ag-pinned-right-header {
    border: none;
  }
  .lock-icon {
    width: 10px;
    height: 10px;
    background-image: url("images/alarm-window/unlock.svg");
    background-size: 10px;
    margin-top: 10px;
    margin-right: 5px;
  }
  // .dispatch-icon {
  //   width: 10px;
  //   height: 10px;
  //   background-image: url("../../assets/alarmAction/dispatch.svg");
  //   background-size: 10px;
  //   margin-top: 10px;
  //   margin-right: 5px;
  // }
  // .order-icon {
  //   width: 10px;
  //   height: 10px;
  //   background-image: url("../../assets/alarmAction/order.svg");
  //   background-size: 10px;
  //   margin-top: 10px;
  //   margin-right: 5px;
  // }
  // .confirm-icon {
  //   width: 10px;
  //   height: 10px;
  //   background-image: url("../../assets/alarmAction/confirm.svg");
  //   background-size: 10px;
  //   margin-top: 10px;
  //   margin-right: 5px;
  // }
  .ag-floating-top .lock-icon {
    background-image: url("images/alarm-window/lock_blue.svg");
    margin-right: 5px;
  }
}
</style>
