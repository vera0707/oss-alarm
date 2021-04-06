import VueRouter from 'vue-router';
import Vue from 'vue';
import Welcome from '../views/welcome.vue';
import AlarmWindow from '../views/window';
import StartInstall from '../views/start/install'
import StartUse from '../views/start/use'
import StartTheme from '../views/start/theme';

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
    path: '/startInstall',
    name: 'startInstall',
    component: StartInstall,
  },
  {
    path: '/startUse',
    name: 'startUse',
    component: StartUse,
  },
  {
    path: '/startTheme',
    name: 'startTheme',
    component: StartTheme
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
