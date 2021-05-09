<template>
  <div class="form__counter">
    <button
      @click.prevent="reduceAmount"
      type="button"
      aria-label="Убрать один товар"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <input
      v-model.number="computedAmount"
      type="text"
      name="count"
    >
    <button
      @click.prevent="computedAmount++"
      type="button"
      aria-label="Добавить один товар"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: ['amount'],
  computed: {
    computedAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        this.$emit('update:amount', value);
      },
    },
  },
  methods: {
    reduceAmount() {
      if (this.amount > 0) {
        this.computedAmount -= 1;
      }
    },
  },
};
</script>
