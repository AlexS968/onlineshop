<template>
  <ul class="cart__options options">
    <li
      v-for="delivery in deliveriesData"
      :key="delivery.id"
      class="options__item"
    >
      <label class="options__label">
        <input
          v-model="computedDeliveryTypeId"
          :value="delivery.id"
          type="radio"
          class="options__radio sr-only"
        >
        <span class="options__value">
          {{ delivery.title }}
          <b>
            {{ delivery.price | setNumberFormat }} ₽
          </b>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
import setNumberFormat from '@/helpers/setNumberFormat';

export default {
  props: ['deliveriesData', 'deliveryTypeId'],
  computed: {
    computedDeliveryTypeId: {
      get() {
        return this.deliveryTypeId;
      },
      set(value) {
        this.$emit('update:deliveryTypeId', value);
      },
    },
  },
  filters: {
    setNumberFormat,
  },
  created() {
    this.$emit('update:deliveryTypeId', 1);
  },
};
</script>
