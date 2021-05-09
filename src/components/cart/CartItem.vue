<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="computedImage"
        width="120"
        height="120"
        alt=""
      >
    </div>
    <h3 class="product__title">
      <router-link :to="{name:'product', params:{id:item.product.id}}">
        {{ item.product.title }}
      </router-link>
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="'background-color: ' + item.color.color.code"></i>
        {{ item.color.color.title }}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>
    <BlockCounter
      :amount.sync="quantity"
      class="product__counter"
    />
    <b class="product__price">
      {{ item.price * item.quantity | setNumberFormat }} ₽
    </b>
    <button
      @click.prevent="deleteCartProduct(item.basketItemId)"
      aria-label="Удалить товар из корзины"
      class="product__del button-del" type="button"
    >
      <svg
        width="20"
        height="20"
        fill="currentColor"
      >
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import setNumberFormat from '@/helpers/setNumberFormat';
import getImage from '@/helpers/getImage';
import { mapActions } from 'vuex';
import BlockCounter from '@/components/common/BlockCounter.vue';

export default {
  props: ['item'],
  components: { BlockCounter },
  methods: {
    ...mapActions('cart', ['deleteCartProduct', 'changeCartProductAmount']),
  },
  computed: {
    computedImage() {
      return getImage(this.item.product, this.item.color.color.id);
    },
    quantity: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        if (value > 0) {
          this.changeCartProductAmount({
            basketItemId: this.item.basketItemId,
            quantity: value,
          });
        }
      },
    },
  },
  filters: {
    setNumberFormat,
  },
};
</script>
