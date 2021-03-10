import OssAlarmWindow from './src/main'

OssAlarmWindow.install = function (Vue) {
  Vue.component(OssAlarmWindow.name, OssAlarmWindow)
}
export default OssAlarmWindow