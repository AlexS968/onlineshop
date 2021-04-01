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
      const response = await fetch(`${Constants.API_BASE_URL}/api/colors`);
      if (response.ok) {
        const data = await response.json();
        commit('loadColorsData', data);
      } else {
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      throw e;
    }
  },
  async loadMaterials({ commit }) {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}/api/materials`);
      if (response.ok) {
        const data = await response.json();
        commit('loadMaterialsData', data);
      } else {
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      throw e;
    }
  },
  async loadCategories({ commit }) {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}/api/productCategories`);
      if (response.ok) {
        const data = await response.json();
        commit('loadCategoriesData', data);
      } else {
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      throw e;
    }
  },
  async loadSeasons({ commit }) {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}/api/seasons`);
      if (response.ok) {
        const data = await response.json();
        commit('loadSeasonData', data);
      } else {
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      throw e;
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
