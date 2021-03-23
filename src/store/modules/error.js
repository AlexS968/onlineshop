const state = () => ({
  errorData: null,
});

const getters = {
};

const actions = {
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
