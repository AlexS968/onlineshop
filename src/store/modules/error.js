const state = () => ({
  errorData: null,
});

const getters = {
  // eslint-disable-next-line no-shadow
  getMessage(state) {
    if (state.errorData.message) {
      return state.errorData.message;
    }
    if (state.errorData.request) {
      return (state.errorData.request.colorId
        || state.errorData.request.sizeId
        || state.errorData.request.productId);
    }
    return '';
  },
};

const actions = {
  loadErrorData({ commit }, data) {
    console.log(data);
    commit('loadErrorData', data);
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  loadErrorData(state, data) {
    state.errorData = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
