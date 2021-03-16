import axios from 'axios';
import API_BASE_URL from '@/config';

const state = () => ({
  productsData: null,
});

const getters = {
};

const actions = {
  async getProductList({ commit }, { filters, page, productsPerPage }) {
    await new Promise((resolve) => { setTimeout(resolve, 500); });
    try {
      const response = await axios(`${API_BASE_URL}/api/products`, {
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
    } catch (e) {
      console.log(e);
    }
  },
};

// mutations
const mutations = {
  // eslint-disable-next-line no-shadow
  setProductsData(state, data) {
    state.productsData = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
