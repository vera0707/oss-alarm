<template>
  <ag-grid-vue
    :ref="`ossWindow_${socketId}`"
    class="ag-theme-balham oss"
    :columnDefs="windowConfig.headerList"
    :rowData="filterTableList(alarmTableList)"
    :defaultColDef="{resizable: true, sortable: true, filter: true,}"
    :localeText="localeText"
  ></ag-grid-vue>
</template>
<script>
import { AgGridVue } from "ag-grid-vue";

const localeText = {
  equals: '相等',
  notEqual: '不相等',
  lessThan: '小于',
  greaterThan: '大于',
  lessThanOrEqual: '小于等于',
  greaterThanOrEqual: '大于等于',
  inRange: '范围',
  contains: '包含',
  notContains: '不包含',
  startsWith: '开始于',
  endsWith: '结束于',
  noRowsToShow: '暂无数据',
};

export default {
  props: {
    socketId: String,
    windowConfig: Object,
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
          if (dataType === 'listInfo') this.alarmTableList = data;
          else if (dataType === 'kafkaAlarm' && data.length) {
            const { alarmTableList } = this;
            alarmTableList.unshift(...data);
            if (alarmTableList.length > 1000) alarmTableList.length = 1000;
            this.alarmTableList = alarmTableList;
          }
          if (clearData) {
            const {alarmClearData} = this;
            alarmClearData.unshift(...clearData);
            if (alarmClearData.length > 50) alarmClearData.length = 50;
            this.alarmClearData = alarmClearData;
          }
        }
      },
    }
  },
  data() {
    return {
      alarmTableList: [],
      alarmClearData: [],
      localeText
    }
  },
  methods:{
    filterTableList(tableList) {
      return tableList.filter((v) => !this.alarmClearData.includes(v.rowkey))
    }
  }
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
  // .lock-icon {
  //   width: 10px;
  //   height: 10px;
  //   background-image: url("../../../../assets/unlock.svg");
  //   background-size: 10px;
  //   margin-top: 10px;
  //   margin-right: 5px;
  // }
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
  // .ag-floating-top .lock-icon {
  //   background-image: url("../../../../assets/lock_blue.svg");
  //   margin-right: 5px;
  // }
}
</style>
