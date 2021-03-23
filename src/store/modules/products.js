import axios from 'axios';
import Constants from '@/config';

const state = () => ({
  productsData: null,
  productData: null,
});

const getters = {
};

const actions = {
  async getProductList({ commit }, { filters, page, productsPerPage }) {
    commit('changeDataLoading', true, { root: true });
    commit('changeDataTransferError', null, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await axios(`${Constants.API_BASE_URL}/api/products`, {
        params: {
          categoryId: filters.filterCategoryId,
          materialIds: filters.filterMaterialIds,
          seasonIds: filters.filterSeasonIds,
          colorIds: filters.filterColorIds,
          page,
          limit: productsPerPage,
          minPrice: filters.filterMinPrice,
          maxPrice: filters.filterMaxPrice,
        },
      });
      const data = await response.data;
      commit('setProductsData', data);
      commit('changeDataLoading', false, { root: true });
    } catch (e) {
      commit('changeDataLoading', false, { root: true });
      commit('changeDataTransferError', null, { root: true });
      throw e;
    }
  },
  async loadProductData({ commit }, id) {
    commit('changeDataLoading', true, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await axios.get(`${Constants.API_BASE_URL}/api/products/${id}`);
      commit('setProductData', response.data);
      commit('changeDataLoading', false, { root: true });
    } catch (e) {
      await this.$router.replace({ name: 'notFound' });
      throw e;
    }
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  setProductsData(state, data) {
    state.productsData = data;
  },
  // eslint-disable-next-line no-shadow
  setProductData(state, data) {
    state.productData = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
