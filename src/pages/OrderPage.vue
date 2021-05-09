<template>
  <main class="content container">
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
      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="toOrder">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model="orderData.name"
              :error="orderError.name"
              title="ФИО"
              placeholder="Иванов Иван Иванович"
            />
            <BaseFormText
              v-model="orderData.address"
              :error="orderError.address"
              title="Адрес доставки"
              placeholder="111111 Москва ул.Зеленая 9-14"
            />
            <BaseFormText
              v-model="orderData.phone"
              :error="orderError.phone"
              title="Телефон" type="tel"
              placeholder="+7 123 4567890"
            />
            <BaseFormText
              v-model="orderData.email"
              :error="orderError.email"
              type="email"
              title="email@mail.ru"
              placeholder="Введите ваш Email"
            />
            <BaseFormTextarea
              v-model="orderData.comment"
              :error="orderError.comment"
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
            />
          </div>
          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <BlockDeliveries
              :deliveries-data="deliveriesData"
              :delivery-type-id.sync="orderData.deliveryTypeId"
            />
            <h3 class="cart__title">Оплата</h3>
            <BlockPayments
              :payments-data="paymentsData"
              :payment-type-id.sync="orderData.paymentTypeId"
            />
          </div>
        </div>
        <CartBlock :cart-block-data="cartBlockData"/>
        <div
          v-if="orderErrorMessage"
          class="cart__error form__error-block"
        >
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ orderErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/base/BaseFormText.vue';
import BaseFormTextarea from '@/components/base/BaseFormTextarea.vue';
import CartBlock from '@/components/cart/CartBlock.vue';
import BlockDeliveries from '@/components/common/BlockDeliveries.vue';
import BlockPayments from '@/components/common/BlockPayments.vue';
import { mapGetters, mapState, mapActions } from 'vuex';
import setNumberFormat from '@/helpers/setNumberFormat';
import enumerate from '@/helpers/enumerate';

export default {
  components: {
    BaseFormText,
    BaseFormTextarea,
    CartBlock,
    BlockDeliveries,
    BlockPayments,
  },
  data() {
    return {
      orderData: {},
      orderError: {},
      orderErrorMessage: '',
    };
  },
  filters: {
    numberFormat: setNumberFormat,
  },
  computed: {
    ...mapGetters('cart', ['cartDetailProducts', 'cartTotalPrice', 'cartTotalAmount']),
    ...mapState(['dataLoading']),
    ...mapState('order', ['orderInfo', 'deliveriesData', 'paymentsData']),
    productsNumber() {
      return `${this.cartTotalAmount} ${enumerate(this.cartTotalAmount,
        ['товар', 'товара', 'товаров'])}`;
    },
    computedDeliveryPrice() {
      return this.deliveriesData
        ? this.deliveriesData
          .filter((delivery) => delivery.id === this.orderData.deliveryTypeId)
          .map((delivery) => delivery.price)[0] : 0;
    },
    cartBlockData() {
      return {
        productsDetail: this.cartDetailProducts,
        totalAmount: this.cartTotalAmount,
        totalPrice: this.cartTotalPrice,
        showButton: true,
        deliveryPrice: this.computedDeliveryPrice,
        paymentType: this.orderData.paymentTypeId,
      };
    },
    deliveryTypeId() {
      return this.orderData.deliveryTypeId;
    },
  },
  methods: {
    ...mapActions('order', ['loadDeliveries', 'loadPayments', 'makeOrder']),
    toOrder() {
      this.orderError = {};
      this.orderErrorMessage = '';
      this.makeOrder(this.orderData)
        .then((data) => {
          if (data.error) {
            this.orderData = this.orderInfo;
            this.orderError = data.error.request || {};
            this.orderErrorMessage = data.error.message;
          } else {
            this.$router.push({
              name: 'orderInfo',
              params: { id: data.id },
            });
          }
        });
    },
  },
  watch: {
    deliveryTypeId(value) {
      this.loadPayments(value);
    },
  },
  created() {
    this.loadDeliveries();
  },
};
</script>
