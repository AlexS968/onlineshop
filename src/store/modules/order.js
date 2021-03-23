import axios from 'axios';
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
    commit('changeDataLoading', true, { root: true });
    this.orderError = {};
    this.orderErrorMessage = '';
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await axios.post(`${Constants.API_BASE_URL}/api/orders`, {
        ...orderData,
      }, {
        params: { userAccessKey: rootGetters.getUserAccessKey },
      });
      commit('cart/resetCart', null, { root: true });
      commit('updateOrderInfo', response.data);
      commit('changeDataLoading', false, { root: true });
      return response;
    } catch (e) {
      commit('changeDataLoading', false, { root: true });
      throw e;
    }
  },
  async loadOrderInfo({ commit, rootGetters }, orderId) {
    commit('changeDataLoading', true, { root: true });
    await new Promise((resolve) => { setTimeout(resolve, Constants.TIME_OUT); });
    try {
      const response = await axios.get(`${Constants.API_BASE_URL}/api/orders/${orderId}`, {
        params: { userAccessKey: rootGetters.getUserAccessKey },
      });
      commit('updateOrderInfo', response.data);
      commit('changeDataLoading', false, { root: true });
    } catch (e) {
      commit('changeDataLoading', false, { root: true });
      throw e;
    }
  },
  async loadDeliveries({ commit }) {
    try {
      const response = await axios.get(`${Constants.API_BASE_URL}/api/deliveries`);
      commit('loadDeliveriesData', response.data);
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      commit('changeDataTransferError', true, { root: true });
    }
  },
  async loadPayments({ commit }, deliveryTypeId) {
    try {
      const response = await axios.get(`${Constants.API_BASE_URL}/api/payments`, {
        params: { deliveryTypeId },
      });
      commit('loadPaymentsData', response.data);
    } catch (e) {
      commit('error/loadErrorData', e.response.data.error, { root: true });
      commit('changeDataTransferError', true, { root: true });
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
