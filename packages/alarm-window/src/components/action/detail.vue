<template>
  <el-dialog
    title="告警详情"
    :visible.sync="isVisible"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    :lock-scroll="true"
    width="820px"
  >
    <el-row v-loading="loading" :gutter="10" class="list-box" style="min-height: 400px">
      <el-col :span="12" v-for="(value, item) in detailList" :key="`zx${item}`">
        <div class="list-item">
          <div class="title">{{item}}：</div>
          <el-tooltip
            v-if="(value || '').length > 27"
            :content="value"
            placement="bottom"
          >
            <div class="ml5 ellipsis content pointer">{{ value }}</div>
          </el-tooltip>
          <div v-else class="ml5 ellipsis content">{{value || '-'}}</div>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import axios from 'axios'
export default {
  props:{
    isVisible: Boolean,
    alarmItem: Object,
  },
  data() {
    return {
      detailList: {},
      loading: false,
    }
  },
  watch:{
    isVisible(val) {
      if(val && this.alarmItem && this.alarmItem.rowKey) {
        this.fetch();
      }
    }
  },
  created() {
    this.fetch();
  },
  methods:{
    fetch() {
      this.loading = true;
      axios.get(`/rca-sla/sla/alarm/query/by/rowkey?rowKey=${this.alarmItem.rowKey}`,{})
      .then((response) => {
        if(response.status === 200 && response.data.retCode === '200') {
          this.detailList = response.data.data || {};
        } else this.$message.error('服务器傲娇了~')
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>this.loading = false);
    },
    dialogClose(){
      this.$emit('closeAction');
      this.detailList = {};
    }
  }
}
</script>
<style lang="scss" scoped>
.list-box {
  color: #455a74;
  font-size: 14px;
  .list-item {
    display: flex;
    align-items: flex-start;
    line-height: 22px;
    margin: 4px 0;
    .title {
      word-break: keep-all;
      color: #8f9cac;
    }
  }
}
</style>