<template>
  <ul class="cart__options options">
    <li
      v-for="payment in paymentsData"
      :key="payment.id"
      class="options__item"
    >
      <label class="options__label">
        <input
          v-model="computedPaymentTypeId"
          :value="payment.id"
          type="radio"
          class="options__radio sr-only"
        >
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
