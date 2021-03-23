import axios from 'axios';
import Constants from '@/config';

const state = () => ({
  cartProducts: [],
  cartProductsData: [],
});

const getters = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
  cartDetailProducts(state) {
    // eslint-disable-next-line
    return state.cartProductsData.map((item) => {
      return {
        ...item,
        totalPrice: item.price * item.quantity,
      };
    });
  },
  cartTotalPrice(state) {
    return state.cartProductsData
      .reduce((acc, item) => (item.price * item.quantity) + acc, 0);
  },
  cartTotalAmount(state) {
    return state.cartProductsData
      .reduce((acc, item) => item.quantity + acc, 0);
  },
};

const actions = {
  async loadCartProducts({ state, commit, rootGetters }) {
    commit('changeDataLoading', true, { root: true });
    commit('changeDataTransferError', null, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await axios.get(`${Constants.API_BASE_URL}/api/baskets`, {
        params: { userAccessKey: rootGetters.getUserAccessKey },
      });
      if (!state.userAccessKey) {
        localStorage.setItem('userAccessKey', response.data.user.accessKey);
        commit('updateUserAccessKey', response.data.user.accessKey, { root: true });
      }
      commit('updateCartProductsData', response.data.items);
      commit('syncCartProducts');
      commit('changeDataLoading', false, { root: true });
    } catch (e) {
      commit('changeDataLoading', false, { root: true });
      commit('changeDataTransferError', null, { root: true });
      throw e;
    }
  },
  async addProductToCart({ commit, rootGetters }, {
    productId, colorId, sizeId, quantity,
  }) {
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    const response = await axios.post(`${Constants.API_BASE_URL}/api/baskets/products`, {
      productId,
      colorId,
      sizeId,
      quantity,
    }, {
      params: { userAccessKey: rootGetters.getUserAccessKey },
    });
    commit('updateCartProductsData', response.data.items);
    commit('syncCartProducts');
  },
  async changeCartProductAmount({ commit, rootGetters }, { productId, basketItemId, quantity }) {
    commit('updateCartProductAmount', { productId, quantity });
    try {
      const response = await axios.put(`${Constants.API_BASE_URL}/api/baskets/products`, {
        basketItemId,
        quantity,
      }, {
        params: { userAccessKey: rootGetters.getUserAccessKey },
      });
      commit('updateCartProductsData', response.data.items);
    } catch (e) {
      commit('syncCartProducts');
      throw e;
    }
  },
  async deleteCartProduct({ commit, rootGetters }, basketItemId) {
    const response = await axios.delete(`${Constants.API_BASE_URL}/api/baskets/products`,
      {
        params: { userAccessKey: rootGetters.getUserAccessKey },
        data: { basketItemId },
      });
    commit('updateCartProductsData', response.data.items);
    commit('syncCartProducts');
  },
};

const mutations = {
  updateCartProductAmount(state, { productId, amount }) {
    const item = state.cartProducts
      .find((i) => i.productId === productId);
    if (item) {
      item.amount = amount;
    }
  },
  deleteCartProduct(state, productId) {
    state.cartProducts = state.cartProducts
      .filter((item) => item.productId !== productId);
  },
  updateCartProductsData(state, items) {
    state.cartProductsData = items;
  },
  syncCartProducts(state) {
    // eslint-disable-next-line
    state.cartProducts = state.cartProductsData.map((item) => {
      return {
        productId: item.product.id,
        amount: item.quantity,
      };
    });
  },
  resetCart(state) {
    state.cartProducts = [];
    state.cartProductsData = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
