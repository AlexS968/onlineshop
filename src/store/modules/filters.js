import axios from 'axios';
import Constants from '@/config';

const state = () => ({
  colorsData: null,
  materialsData: null,
  categoriesData: null,
  seasonData: null,
});

const actions = {
  async loadColors({ commit }) {
    try {
      const response = await axios.get(`${Constants.API_BASE_URL}/api/colors`);
      commit('loadColorsData', response.data);
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      commit('changeDataTransferError', true, { root: true });
    }
  },
  async loadMaterials({ commit }) {
    try {
      const response = await axios.get(`${Constants.API_BASE_URL}/api/materials`);
      commit('loadMaterialsData', response.data);
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      commit('changeDataTransferError', true, { root: true });
    }
  },
  async loadCategories({ commit }) {
    try {
      const response = await axios.get(`${Constants.API_BASE_URL}/api/productCategories`);
      commit('loadCategoriesData', response.data);
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      commit('changeDataTransferError', true, { root: true });
    }
  },
  async loadSeasons({ commit }) {
    try {
      const response = await axios.get(`${Constants.API_BASE_URL}/api/seasons`);
      commit('loadSeasonData', response.data);
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      commit('changeDataTransferError', true, { root: true });
    }
  },
};

const mutations = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
  loadColorsData(state, data) {
    state.colorsData = data;
  },
  loadMaterialsData(state, data) {
    state.materialsData = data;
  },
  loadCategoriesData(state, data) {
    state.categoriesData = data;
  },
  loadSeasonData(state, data) {
    state.seasonData = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
