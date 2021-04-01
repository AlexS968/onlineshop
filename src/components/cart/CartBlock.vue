<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in cartBlockData.productsDetail" :key="item.productId">
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.totalPrice | setNumberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка:
        <b v-if="cartBlockData.deliveryPrice">{{ cartBlockData.deliveryPrice | setNumberFormat }}
          ₽</b>
        <b v-else>Выберите доставку</b>
      </p>
      <p>Итого: <b>{{ productsNumber }}</b> товара на сумму
        <b>{{ totalSum | setNumberFormat }} ₽</b></p>
    </div>

    <button class="cart__button button button--primery" v-if="cartBlockData.showButton"
            type="submit" :disabled="!cartBlockData.deliveryPrice || !cartBlockData.paymentType">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import setNumberFormat from '@/helpers/setNumberFormat';
import enumerate from '@/helpers/enumerate';

export default {
  props: ['cartBlockData'],
  computed: {
    productsNumber() {
      return `${this.cartBlockData.totalAmount} ${enumerate(this.cartBlockData.totalAmount,
        ['товар', 'товара', 'товаров'])}`;
    },
    totalSum() {
      return this.cartBlockData.deliveryPrice
        ? this.cartBlockData.totalPrice + parseInt(this.cartBlockData.deliveryPrice, 10) : '';
    },
  },
  filters: {
    setNumberFormat,
  },
};
</script>
