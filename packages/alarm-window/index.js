import OssAlarmWindow from './src/main.vue';

OssAlarmWindow.install = (Vue) => {
  Vue.component(OssAlarmWindow.name, OssAlarmWindow);
};
export default OssAlarmWindow;
