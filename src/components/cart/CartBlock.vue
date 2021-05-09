<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li
        v-for="item in cartBlockData.productsDetail"
        :key="item.productId"
        class="cart__order"
      >
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.totalPrice | setNumberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>
    <div class="cart__total">
      <p>Доставка:
        <b v-if="cartBlockData.deliveryPrice">
          {{ cartBlockData.deliveryPrice | setNumberFormat }} ₽
        </b>
        <b v-else>
          Выберите доставку
        </b>
      </p>
      <p>Итого:
        <b> {{ productsNumber }}</b>
        товара на сумму
        <b> {{ totalSum | setNumberFormat }} ₽</b>
      </p>
    </div>
    <button
      v-if="cartBlockData.showButton" type="submit"
      :disabled="!cartBlockData.deliveryPrice || !cartBlockData.paymentType ||productsNumberIsZero"
      class="cart__button button button--primery"
    >
      <BlockPreloader
        v-if="dataLoading"
        class="preloader small"
      />
      <div v-else>
        Оформить заказ
      </div>
    </button>
  </div>
</template>

<script>
import setNumberFormat from '@/helpers/setNumberFormat';
import enumerate from '@/helpers/enumerate';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import { mapState } from 'vuex';

export default {
  props: ['cartBlockData'],
  components: { BlockPreloader },
  computed: {
    ...mapState(['dataLoading']),
    productsNumber() {
      return `${this.cartBlockData.totalAmount} ${enumerate(this.cartBlockData.totalAmount,
        ['товар', 'товара', 'товаров'])}`;
    },
    totalSum() {
      return this.cartBlockData.deliveryPrice
        ? this.cartBlockData.totalPrice + parseInt(this.cartBlockData.deliveryPrice, 10) : '';
    },
    productsNumberIsZero() {
      return this.cartBlockData.totalAmount === 0;
    },
  },
  filters: {
    setNumberFormat,
  },
};
</script>
