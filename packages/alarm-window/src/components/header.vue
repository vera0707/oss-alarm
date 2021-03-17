<template>
  <div class="alarm-window-header">
    <div
      v-if="title.enable"
      class="window-header-title"
      :class="title.class"
      :style="title.style"
    >
      {{ title.name }}
    </div>
    <div
      v-if="tabs.enable"
      class="window-header-tabs"
      :class="tabs.tabsClass"
      :style="tabs.tabsStyle"
    >
      <div
        v-for="tab in tabs.data"
        :key="tab[tabs.props.key]"
        class="tabs-item"
        :class="{ active: activeTab == tab[tabs.props.key] }"
        :style="tabs.tabItemStyle"
        @click="changeAlarmTab(tab[tabs.props.key])"
      >
        {{ tab[tabs.props.value] }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: Object,
    tabs: Object,
    activeTab: String
  },
  data() {
    return {

    }
  },
   methods: {
     changeAlarmTab(key) {
       this.$emit('onChangeAlarmTab',key)
     }
  },
}
</script>
<style lang="scss" scoped>
.alarm-window-header {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  background: rgba(123, 147, 167, 0.1);
  padding: 0 16px;
  padding-left: 15px;
  padding-right: 76px;
  position: relative;

  .window-header-title {
    flex: 100;
    font-size: 12px;
    color: #455a74;
    font-weight: bold;
    margin-right: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .window-header-tabs {
    display: flex;
    font-size: 12px;
    color: #7b93a7;
    .tabs-item {
      padding: 5px 0;
      position: relative;
      margin: 0 4px;
      cursor: pointer;
      &.active {
        color: #2c9cfa;
        &::after {
          border-top-width: 2px;
        }
      }
      &:after {
        width: 100%;
        height: 1px;
        content: "";
        border-top: 0px solid #2c9cfa;
        position: absolute;
        bottom: -8px;
        left: 0px;
      }
    }
  }
}
</style>

