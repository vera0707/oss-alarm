import Vue from 'vue';
import ElementUi from 'element-ui';
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker.js';
import '../node_modules/ag-grid-community/dist/styles/ag-grid.min.css';
import '../node_modules/ag-grid-community/dist/styles/ag-theme-balham.min.css';
import './styles/index.scss';
import 'highlight.js/styles/atelier-forest-light.css'

import VueHighlightJS from 'vue-highlightjs'

import { OssAlarmWindow } from '../packages/all';

Vue.use(ElementUi, { size: 'small' });
Vue.use(VueHighlightJS);
Vue.component(OssAlarmWindow.name, OssAlarmWindow);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
