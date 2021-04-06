import VueRouter from 'vue-router';
import Vue from 'vue';
import Welcome from '../views/welcome.vue';
import AlarmWindow from '../views/alarm-window';

console.log('什么鬼', AlarmWindow);

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: Welcome,
  },
  {
    path: '/alarmWindow',
    name: 'alarmWindow',
    component: AlarmWindow,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
