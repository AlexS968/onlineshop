import Constants from '@/config';

const state = () => ({
  orderInfo: null,
  deliveriesData: null,
  paymentsData: null,
});

const getters = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
  orderDetailProducts(state) {
    // eslint-disable-next-line
    return state.orderInfo.basket.items.map((item) => {
      return {
        ...item,
        totalPrice: item.price * item.quantity,
      };
    });
  },
  orderTotalPrice(state) {
    return state.orderInfo.totalPrice;
  },
  orderTotalAmount(state) {
    return state.orderInfo.basket.items
      .reduce((acc, item) => item.quantity + acc, 0);
  },
};

const actions = {
  async makeOrder({ commit, rootGetters }, orderData) {
    const url = new URL(`${Constants.API_BASE_URL}/api/orders`);
    const params = [['userAccessKey', rootGetters.getUserAccessKey]];
    url.search = new URLSearchParams(params).toString();

    commit('changeDataLoading', true, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderData,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        commit('updateOrderInfo', data);
        commit('cart/resetCart', null, { root: true });
      } else {
        commit('updateOrderInfo', orderData);
      }
      commit('changeDataLoading', false, { root: true });
      return data;
    } catch (e) {
      commit('changeDataLoading', false, { root: true });
      commit('error/loadErrorData', e.response.data.error, { root: true });
      throw e;
    }
  },
  async loadOrderInfo({ commit, rootGetters }, orderId) {
    const url = new URL(`${Constants.API_BASE_URL}/api/orders/${orderId}`);
    const params = [['userAccessKey', rootGetters.getUserAccessKey]];
    url.search = new URLSearchParams(params).toString();

    commit('changeDataLoading', true, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        commit('updateOrderInfo', data);
      } else {
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
      commit('changeDataLoading', false, { root: true });
    } catch (e) {
      commit('changeDataLoading', false, { root: true });
      commit('error/loadErrorData', e.response.data.error, { root: true });
      throw e;
    }
  },
  async loadDeliveries({ commit }) {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}/api/deliveries`);
      if (response.ok) {
        const data = await response.json();
        commit('loadDeliveriesData', data);
      } else {
        commit('error/loadErrorData', response, { root: true });
        commit('changeDataTransferError', true, { root: true });
      }
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      throw e;
    }
  },
  async loadPayments({ commit }, deliveryTypeId) {
    const url = new URL(`${Constants.API_BASE_URL}/api/payments`);
    const params = [['deliveryTypeId', deliveryTypeId]];
    url.search = new URLSearchParams(params).toString();
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        commit('loadPaymentsData', data);
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
  loadDeliveriesData(state, data) {
    state.deliveriesData = data;
  },
  loadPaymentsData(state, data) {
    state.paymentsData = data;
  },
  updateOrderInfo(state, data) {
    state.orderInfo = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
