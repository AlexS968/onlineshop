<template>
  <aside class="filter">
    <form
      @submit.prevent="submit"
      action="#"
      method="get"
      class="filter__form form"
    >
      <fieldset class="form__block">
        <legend class="form__legend">
          Цена
        </legend>
        <label class="form__label form__label--price">
          <input
            v-model.number="filters.minPrice"
            type="text"
            name="min-price"
            placeholder="0"
            class="form__input"
          >
          <span class="form__value">
            От
          </span>
        </label>
        <label class="form__label form__label--price">
          <input
            v-model.number="filters.maxPrice"
            type="text"
            name="max-price"
            placeholder="0"
            class="form__input"
          >
          <span class="form__value">
            До
          </span>
        </label>
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">
          Категория
        </legend>
        <label
          v-if="categoriesData"
          class="form__label form__label--select"
        >
          <select
            v-model.number="filters.categoryId"
            name="category"
            class="form__select"
          >
            <option value="0">
              Все категории
            </option>
            <option
              v-for="category in categoriesData.items"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <BlockColors v-if="colorsData"
                     :colors="colorsData.items"
                     :selected-color-id.sync="filters.colorIds"
                     type="checkbox"
        />
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">
          Материал
        </legend>
        <BlockProperties
          v-if="materialsData"
          :data="materialsData"
          :property-ids.sync="filters.materialIds"
        />
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">
          Коллекция
        </legend>
        <BlockProperties
          v-if="seasonData"
          :data="seasonData"
          :property-ids.sync="filters.seasonIds"
        />
      </fieldset>
      <button
        type="submit"
        class="filter__submit button button--primery"
      >
        Применить
      </button>
      <button
        v-if="!filterIsEmpty"
        @click.prevent="reset"
        type="button"
        class="filter__reset button button--second"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Constants from '@/config';
import BlockColors from '@/components/common/BlockColors.vue';
import BlockProperties from '@/components/common/BlockProperties.vue';

export default {
  data() {
    return {
      filters: Constants.FILTERS,
    };
  },
  props: ['currentFilters'],
  components: {
    BlockColors,
    BlockProperties,
  },
  computed: {
    ...mapState('filters', ['categoriesData', 'materialsData', 'colorsData', 'seasonData']),
    filterIsEmpty() {
      return Object.values(this.filters)
        .map((v) => {
          if (Array.isArray(v)) {
            return Object.values(v).length;
          }
          return v;
        })
        .every((el) => el === 0 || el === '');
    },
  },
  methods: {
    ...mapActions('filters', ['loadCategories', 'loadMaterials', 'loadColors', 'loadSeasons']),
    submit() {
      this.$emit('update:currentFilters', this.filters);
    },
    reset() {
      this.$emit('update:currentFilters', Constants.FILTERS);
    },
  },
  watch: {
    currentFilters: {
      handler(value) {
        this.filters = { ...value };
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.loadCategories();
    this.loadMaterials();
    this.loadColors();
    this.loadSeasons();
  },
};
</script>

<style lang="stylus">
.filter {
  background-color #f5f5f5
  box-shadow 0 0 10px 10px #f5f5f5
}
</style>
