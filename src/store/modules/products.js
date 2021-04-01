import Constants from '@/config';

const state = () => ({
  productsData: null,
  productData: null,
});

const getters = {
};

const actions = {
  async getProductList({ commit }, { filters, page, productsPerPage }) {
    const url = new URL(`${Constants.API_BASE_URL}/api/products`);
    const params = [
      ['categoryId', filters.categoryId],
      ['materialIds[]', filters.materialIds],
      ['seasonIds[]', filters.seasonIds],
      ['colorIds[]', filters.colorIds],
      ['page', page],
      ['limit', productsPerPage],
      ['minPrice', filters.minPrice],
      ['maxPrice', filters.maxPrice],
    ];
    url.search = new URLSearchParams(params).toString();

    commit('changeDataLoading', true, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        commit('setProductsData', data);
      } else {
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
      commit('changeDataLoading', false, { root: true });
    } catch (e) {
      commit('changeDataLoading', false, { root: true });
      commit('error/loadErrorData', e, { root: true });
      commit('changeDataTransferError', true, { root: true });
      throw e;
    }
  },
  async loadProductData({ commit }, id) {
    commit('changeDataLoading', true, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await fetch(`${Constants.API_BASE_URL}/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        commit('setProductData', data);
      } else {
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
      commit('changeDataLoading', false, { root: true });
    } catch (e) {
      commit('changeDataLoading', false, { root: true });
      commit('error/loadErrorData', e, { root: true });
      commit('changeDataTransferError', true, { root: true });
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
