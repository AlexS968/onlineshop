<template>
  <ul class="check-list" v-if="data">
    <li class="check-list__item" v-for="element in data.items" :key="element.id">
      <label class="check-list__label">
        <input class="check-list__check sr-only" type="checkbox"
               name="material" :value="element.id" v-model.number="idList">
        <span class="check-list__desc">
                    {{ element.title }}
                    <span>({{ element.productsCount }})</span>
                  </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      idList: [],
    };
  },
  props: ['data', 'propertyIds'],
  watch: {
    idList(value) {
      this.$emit('update:propertyIds', value);
    },
  },
};
</script>
