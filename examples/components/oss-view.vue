<template>
  <transition name="page-move">
    <div>
       <div>Welcome to OSS-ALARM components</div>
      <OssAlarmWindow />
      <router-view />
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.page-move-enter, .page-move-leave-active {
  transform: translateX(100%);
}
.page-move-enter-active, .page-move-leave-active {
  transition: transform 0.3s;
}
</style>
