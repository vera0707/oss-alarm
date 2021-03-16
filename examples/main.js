import Vue from 'vue';
import App from './app'
import ElementUi from 'element-ui';
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import router from './router'
import OssAlarm from '../src/index.js'

Vue.use(OssAlarm);
Vue.use(ElementUi,{ size: 'small' });

// 注册组件
const requireComponent = require.context('./components', false, /[a-zA-Z]*\.vue/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');