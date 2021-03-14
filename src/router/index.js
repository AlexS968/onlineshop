import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    component: HomePage,
    path: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
