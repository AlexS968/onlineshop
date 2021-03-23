<template>
  <ul class="cart__options options">
    <li class="options__item" v-for="delivery in deliveriesData" :key="delivery.id">
      <label class="options__label">
        <input class="options__radio sr-only" type="radio"
               :value="delivery.id" v-model="computedDeliveryTypeId">
        <span class="options__value">
                    {{ delivery.title }} <b>{{ delivery.price | numberFormat }} ₽</b>
                  </span>
      </label>
    </li>
  </ul>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

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
    numberFormat,
  },
  created() {
    this.$emit('update:deliveryTypeId', 1);
  },
};
</script>
