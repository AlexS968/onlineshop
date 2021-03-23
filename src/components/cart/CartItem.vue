<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="image.url" width="120" height="120" :alt="image.name">
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

    <BlockCounter class="product__counter" :amount.sync="quantity"/>

    <b class="product__price">
      {{ item.product.price * item.quantity | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="deleteCartProduct(item.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import BlockCounter from '@/components/common/BlockCounter.vue';

export default {
  props: ['item'],
  components: { BlockCounter },
  methods: {
    ...mapActions('cart', ['deleteCartProduct', 'changeCartProductAmount']),
  },
  computed: {
    image() {
      return this.item.color.gallery[0].file;
    },
    quantity: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        if (value > 0) {
          this.changeCartProductAmount({
            productId: this.item.product.id,
            basketItemId: this.item.id,
            quantity: value,
          });
        }
      },
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
