<template>
  <main
    v-if="!dataLoading"
    class="content container"
  >
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            :to="{ name: 'home' }"
            class="breadcrumbs__link"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>
      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info">
          {{ productsNumber }}
        </span>
      </div>
    </div>
    <section class="cart">
      <form
        action="#"
        method="POST"
        class="cart__form form"
      >
        <div
          v-if="cartProducts"
          class="cart__field"
        >
          <ul class="cart__list">
            <CartItem
              v-for="item in cartProducts"
              :key="item.basketItemId"
              :item="item"
            />
          </ul>
        </div>
        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartTotalPrice | setNumberFormat }} ₽</span>
          </p>
          <router-link
            :to="{name:'order'}"
            :disabled="productsNumberIsZero"
            tag="button"
            type="submit"
            class="cart__button button button--primery"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import setNumberFormat from '@/helpers/setNumberFormat';
import CartItem from '@/components/cart/CartItem.vue';
import { mapGetters, mapState } from 'vuex';
import enumerate from '@/helpers/enumerate';

export default {
  components: { CartItem },
  filters: {
    setNumberFormat,
  },
  computed: {
    ...mapGetters('cart', ['cartTotalPrice', 'cartTotalAmount']),
    ...mapState('cart', ['cartProducts']),
    ...mapState(['dataLoading', 'dataTransferError']),
    productsNumber() {
      return `${this.cartTotalAmount} ${enumerate(this.cartTotalAmount,
        ['товар', 'товара', 'товаров'])}`;
    },
    productsNumberIsZero() {
      return this.cartTotalAmount === 0;
    },
  },
};
</script>
