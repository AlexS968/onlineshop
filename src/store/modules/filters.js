import axios from 'axios';
import API_BASE_URL from '@/config';

const state = () => ({
  colorsData: null,
  materialsData: null,
  categoriesData: null,
  seasonData: null,
});

const actions = {
  async loadColors({ commit }) {
    const response = await axios.get(`${API_BASE_URL}/api/colors`);
    commit('loadColorsData', response.data);
  },
  async loadMaterials({ commit }) {
    const response = await axios.get(`${API_BASE_URL}/api/materials`);
    commit('loadMaterialsData', response.data);
  },
  async loadCategories({ commit }) {
    const response = await axios.get(`${API_BASE_URL}/api/productCategories`);
    commit('loadCategoriesData', response.data);
  },
  async loadSeasons({ commit }) {
    const response = await axios.get(`${API_BASE_URL}/api/seasons`);
    commit('loadSeasonData', response.data);
  },
};

const mutations = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
  loadColorsData(state, colors) {
    state.colorsData = colors;
  },
  loadMaterialsData(state, materials) {
    state.materialsData = materials;
  },
  loadCategoriesData(state, categories) {
    state.categoriesData = categories;
  },
  loadSeasonData(state, season) {
    state.seasonData = season;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
