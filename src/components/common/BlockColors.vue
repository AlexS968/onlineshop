<template>
  <ul class="colors colors--black">
    <li
      v-for="color in colors"
      :key="color.id"
      class="colors__item"
    >
      <label class="colors__label">
        <input
          v-model="computedColorId"
          :type="type"
          :value="color.id"
          class="colors__radio sr-only"
        >
        <span
          :style="'background-color: ' + color.code"
          class="colors__value"
        >
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors', 'selectedColorId', 'type'],
  computed: {
    computedColorId: {
      get() {
        return this.selectedColorId;
      },
      set(value) {
        this.$emit('update:selectedColorId', value);
      },
    },
  },
};
</script>
