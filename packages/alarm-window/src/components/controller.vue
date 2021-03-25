<template>
  <div class="controller">
    <AlarmDetail
      :isVisible="type === 'detail'"
      :alarmItem="alarmItem"
      @closeAction="closeControCenter"
    />
  </div>
</template>
<script>
import AlarmDetail from "./action/detail";

export default {
  components: {
    AlarmDetail,
  },
  props: {
    controCenter: Object
  },
  computed: {
    type() {
      return (this.controCenter || {}).type || '';
    },
    alarmItem() {
      return (this.controCenter || {}).data || {};
    },
  },
  methods:{
    closeControCenter() {
      this.$emit('closeControCenter')
    }
  }
};
</script>
