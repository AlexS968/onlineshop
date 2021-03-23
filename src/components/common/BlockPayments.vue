<template>
  <ul class="cart__options options">
    <li class="options__item" v-for="payment in paymentsData" :key="payment.id">
      <label class="options__label">
        <input class="options__radio sr-only" type="radio"
               :value="payment.id" v-model="computedPaymentTypeId">
        <span class="options__value">
                    {{ payment.title }}
                  </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['paymentsData', 'paymentTypeId'],
  computed: {
    computedPaymentTypeId: {
      get() {
        return this.paymentTypeId;
      },
      set(value) {
        this.$emit('update:paymentTypeId', value);
      },
    },
  },
};
</script>
