<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">
        Интернет-магазин одежды
      </span>
      <router-link
        :to="{ name: 'home' }"
        class="header__logo"
      >
        <img
          src="img/svg/logo-moire.svg"
          width="116"
          height="34"
          alt="Логотип интернет магазина Moire"
        >
      </router-link>
      <a
        href="tel:8 800 600 90 09"
        class="header__tel"
      >
        8 800 600 90 09
      </a>
      <router-link
        :to="{name:'cart'}"
        aria-label="Корзина с товарами"
        class="header__cart"
      >
        <svg
          width="19"
          height="24"
        >
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span
          aria-label="Количество товаров"
          class="header__count"
        >
          {{ cartTotalAmount }}
        </span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', ['cartTotalAmount']),
  },
};
</script>
