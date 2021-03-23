import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/store/modules/products';
import filters from '@/store/modules/filters';
import cart from '@/store/modules/cart';
import order from '@/store/modules/order';
import error from '@/store/modules/error';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    dataLoading: false,
    dataTransferError: false,
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    changeDataLoading(state, dataLoading) {
      state.dataLoading = dataLoading;
    },
    changeDataTransferError(state, dataTransferError) {
      state.dataTransferError = dataTransferError;
    },
  },
  getters: {
    getUserAccessKey(state) {
      return state.userAccessKey;
    },
  },
  actions: {
  },
  modules: {
    products,
    filters,
    cart,
    order,
    error,
  },
});
