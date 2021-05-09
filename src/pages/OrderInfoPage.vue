<template>
  <main
    v-if="!dataLoading"
    class="content container"
  >
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            :to="{name:'home'}"
            class="breadcrumbs__link"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            :to="{name:'cart'}"
            class="breadcrumbs__link"
          >
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>
      <h1 class="content__title">
        Заказ оформлен
        <span>
          № {{ orderInfo.id }}
        </span>
      </h1>
    </div>
    <section class="cart">
      <form
        action="#"
        method="POST"
        class="cart__form form"
      >
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями заказа.
            Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.
          </p>
          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
               {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ orderInfo.paymentType }}
              </span>
            </li>
          </ul>
        </div>
        <CartBlock :cart-block-data="cartBlockData"/>
      </form>
    </section>
  </main>
</template>

<script>
import CartBlock from '@/components/cart/CartBlock.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  components: { CartBlock },
  computed: {
    ...mapGetters('order', ['orderDetailProducts', 'orderTotalPrice', 'orderTotalAmount']),
    ...mapState('order', ['orderInfo']),
    ...mapState(['dataLoading']),
    cartBlockData() {
      return {
        productsDetail: this.orderDetailProducts,
        totalAmount: this.orderTotalAmount,
        totalPrice: this.orderTotalPrice,
        showButton: false,
        deliveryPrice: this.orderInfo.deliveryType.price,
      };
    },
  },
  methods: {
    ...mapActions('order', ['loadOrderInfo']),
  },
  watch: {
    '$route.params.id': {
      handler() {
        if (this.orderInfo && this.orderInfo.id === this.$route.params.id) {
          return;
        }
        this.loadOrderInfo(this.$route.params.id)
          .catch((error) => {
            if (error.response.status === 400 || error.response.status === 404) {
              this.$router.replace({ name: 'notFound' });
            }
          });
      },
      immediate: true,
    },
  },
};
</script>
