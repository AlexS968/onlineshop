import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/store/modules/products';
import filters from '@/store/modules/filters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    filters,
  },
});
