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
    return state.cartProducts
      .reduce((acc, item) => (item.price * item.quantity) + acc, 0);
  },
  cartTotalAmount(state) {
    return state.cartProducts
      .reduce((acc, item) => item.quantity + acc, 0);
  },
};

const actions = {
  async loadCartProducts({ state, commit, rootGetters }) {
    const url = new URL(`${Constants.API_BASE_URL}/api/baskets`);
    const params = [['userAccessKey', rootGetters.getUserAccessKey]];
    url.search = new URLSearchParams(params).toString();

    commit('changeDataLoading', true, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (!state.userAccessKey) {
          localStorage.setItem('userAccessKey', data.user.accessKey);
          commit('updateUserAccessKey', data.user.accessKey, { root: true });
        }
        commit('updateCartProductsData', data.items);
        commit('syncCartProducts');
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
  async addProductToCart({ commit, rootGetters }, {
    productId,
    colorId,
    sizeId,
    quantity,
  }) {
    const url = new URL(`${Constants.API_BASE_URL}/api/baskets/products`);
    const params = [['userAccessKey', rootGetters.getUserAccessKey]];
    url.search = new URLSearchParams(params).toString();

    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          colorId,
          sizeId,
          quantity,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        commit('updateCartProductsData', data.items);
        commit('syncCartProducts');
      } else {
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
    } catch (e) {
      commit('error/loadErrorData', e, { root: true });
      commit('changeDataTransferError', true, { root: true });
      throw e;
    }
  },
  async changeCartProductAmount({ commit, rootGetters }, {
    basketItemId,
    quantity,
  }) {
    commit('updateCartProductAmount', { basketItemId, quantity });
    const url = new URL(`${Constants.API_BASE_URL}/api/baskets/products`);
    const params = [['userAccessKey', rootGetters.getUserAccessKey]];
    url.search = new URLSearchParams(params).toString();

    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          basketItemId,
          quantity,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        commit('updateCartProductsData', data.items);
      } else {
        commit('syncCartProducts');
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
    } catch (e) {
      commit('syncCartProducts');
      commit('error/loadErrorData', e, { root: true });
      commit('changeDataTransferError', true, { root: true });
      throw e;
    }
  },
  async deleteCartProduct({ commit, rootGetters }, basketItemId) {
    commit('deleteCartProduct', basketItemId);
    const url = new URL(`${Constants.API_BASE_URL}/api/baskets/products`);
    const params = [['userAccessKey', rootGetters.getUserAccessKey]];
    url.search = new URLSearchParams(params).toString();

    await new Promise((resolve) => {
      setTimeout(resolve, Constants.TIME_OUT);
    });
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basketItemId }),
      });
      if (response.ok) {
        const data = await response.json();
        commit('updateCartProductsData', data.items);
      } else {
        commit('syncCartProducts');
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
    } catch (e) {
      commit('syncCartProducts');
      commit('error/loadErrorData', e, { root: true });
      commit('changeDataTransferError', true, { root: true });
      throw e;
    }
  },
};

const mutations = {
  updateCartProductAmount(state, {
    basketItemId,
    quantity,
  }) {
    const item = state.cartProducts
      .find((i) => i.basketItemId === basketItemId);
    if (item) {
      item.quantity = quantity;
    }
  },
  updateCartProductsData(state, items) {
    state.cartProductsData = items;
  },
  deleteCartProduct(state, basketItemId) {
    state.cartProducts = state.cartProducts
      .filter((item) => item.basketItemId !== basketItemId);
  },
  syncCartProducts(state) {
    // eslint-disable-next-line
    state.cartProducts = state.cartProductsData.map((item) => {
      return {
        basketItemId: item.id,
        quantity: item.quantity,
        price: item.price,
        color: { color: item.color.color },
        product: {
          colors: item.product.colors,
          id: item.product.id,
          title: item.product.title,
        },
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
