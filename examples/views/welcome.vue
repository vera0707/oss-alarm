<template>
  <div class="welcome">
    <div class="title">OSS ALARM | 告警管理专家</div>
    <img src="~images/introduce_bg.svg" alt="" />
  </div>
</template>
<script>

export default {
  name: 'welcome',
};
</script>
<style lang="scss" scoped>
.welcome{
  width: calc(100vw - 300px);
  position: relative;
  .title {
    font-size: 28px;
    font-weight: bold;
    margin-top: 25px;
  }
  img{
    width: 50%;
    // height: 473px;
    display: block;
    margin: 100px 10% 0;
  }
}
</style>
