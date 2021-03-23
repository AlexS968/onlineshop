import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'home', component: HomePage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'cart', component: CartPage, path: '/cart' },
  { name: 'order', component: OrderPage, path: '/orders' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/orders/:id' },
  { name: 'notFound', component: NotFoundPage, path: '*' },
];

const router = new VueRouter({
  routes,
});

export default router;
