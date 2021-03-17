<template>
    <ul class="colors colors--black">
        <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
                <input class="colors__radio sr-only" :type="type" :value="color.id"
                       v-model="computedColorId">
                <span class="colors__value" :style="'background-color: ' + color.code">
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
