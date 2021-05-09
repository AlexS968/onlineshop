<template>
  <ul
    v-if="data"
    class="check-list"
  >
    <li
      v-for="element in data.items"
      :key="element.id"
      class="check-list__item"
    >
      <label class="check-list__label">
        <input
          v-model.number="idL"
          :value="element.id"
          type="checkbox"
          name="material"
          class="check-list__check sr-only"
        >
        <span class="check-list__desc">
                    {{ element.title }}
                    <span>
                      {{ element.productsCount }}
                    </span>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['data', 'propertyIds'],
  computed: {
    idL: {
      get() {
        return this.propertyIds;
      },
      set(value) {
        this.$emit('update:propertyIds', value);
      },
    },
  },
};
</script>
