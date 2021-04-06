<template>
  <div class="alarm-window-features">
    <div
      v-if="levelConfig.enable"
      class="window-features-alarm"
      :class="levelConfig.class"
      :style="levelConfig.style"
    >
      <el-tooltip
        v-for="item in levelConfig.data"
        :key="item[levelConfig.props.field]"
        :content="item[levelConfig.props.name]"
        placement="bottom"
      >
        <div class="features-alarm-grid">
          <div v-if="item.class && item.class === 'total'" class="features-alarm-icon alarm-total">
            <div class="color-red"></div>
            <div class="color-orange"></div>
            <div class="color-yellow"></div>
            <div class="color-blue"></div>
          </div>
          <i v-else class="features-alarm-icon" :class="item.class"></i>
          <span>{{ levelData[item[levelConfig.props.field]] }}</span>
        </div>
      </el-tooltip>
    </div>
    <div class="features-control">
      <el-tooltip v-show="isStopUpdate" content="启动" placement="bottom">
        <div
          class="features-control-icon features-play-icon"
          @click="userOperation('UserUpdate', false)"
        ></div>
      </el-tooltip>
      <el-tooltip v-show="!isStopUpdate" content="暂停" placement="bottom">
        <div
          class="features-control-icon features-pause-icon"
          @click="userOperation('UserUpdate', true)"
        ></div>
      </el-tooltip>
      <el-tooltip v-if="canLock" content="锁定置顶" placement="bottom">
        <div
          class="features-control-icon features-lock-icon"
          @click="userOperation('LockMultipleData')"
        ></div>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    /* 告警等级配置 */
    levelConfig: Object,
    /* 告警等级数值 */
    levelData: Object,
    /* 告警启停状态 */
    isStopUpdate: Boolean,
    /* 是否支持数据锁定🔐 */
    canLock: Boolean,
  },
  methods: {
    userOperation(type, status) {
      this.$emit('onUserOperation', { type, status });
    },
  },
};
</script>
<style lang="scss" scoped>
.alarm-window-features {
  display: flex;
  padding: 0 15px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  .window-features-alarm {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    .features-alarm-grid {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      color: #455a74;
      cursor: pointer;
      margin-right: 23px;
    }
    .features-alarm-icon {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      margin-right: 5px;

      &.alarm-total{
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 4px;
        margin-right: 3px;
        display: flex;
        flex-wrap: wrap;
      }
      .color-red,
      .color-orange,
      .color-yellow,
      .color-blue {
        width: 5px;
        height: 5px;
      }
      .color-red {
        border-radius: 4px 0px 0px 0px;
        background: rgba(240, 65, 52, 0.3);
        border: 1px solid rgba(240, 65, 52, 0.7);
      }
      .color-orange {
        background: rgba(255, 147, 29, 0.3);
        border-radius: 0px 4px 0px 0px;
        border: 1px solid rgba(255, 147, 29, 0.7);
      }
      .color-yellow {
        background: rgba(255, 215, 133, 0.3);
        border-radius: 0px 0px 0px 4px;
        border: 1px solid rgba(255, 215, 133, 0.7);
      }
      .color-blue {
        background: rgba(78, 216, 255, 0.3);
        border-radius: 0px 0px 4px 0px;
        border: 1px solid rgba(78, 216, 255, 0.7);
      }
      &.level1 {
        background: rgba(255, 155, 155, 0.3);
        border: 1px solid rgba(255, 89, 45, 0.71);
      }
      &.level2 {
        background: rgba(255, 190, 95, 0.3);
        border: 1px solid rgba(245, 166, 35, 0.7);
      }
      &.level3 {
        background: rgba(255, 248, 107, 0.3);
        border: 1px solid rgba(249, 222, 37, 0.74);
      }
      &.level4 {
        background: rgba(50, 178, 255, 0.3);
        border: 1px solid rgba(50, 178, 255, 0.8);
      }
      &.level5 {
        background: rgba(19, 208, 119, 0.3);
        border: 1px solid rgba(19, 208, 119, 0.8);
      }
    }
  }
  .features-control {
    display: flex;
    justify-content: space-around;
    cursor: pointer;

    .features-control-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      &.features-play-icon {
        background: url("~images/alarm-window/play.svg") no-repeat;
        background-size: 14px;
      }
      &.features-pause-icon {
        background: url("~images/alarm-window/pause.svg") no-repeat;
        background-size: 14px;
      }
      &.features-lock-icon {
        background: url("~images/alarm-window/lock.svg") no-repeat;
        background-size: 14px;
      }
    }
  }
}
</style>
