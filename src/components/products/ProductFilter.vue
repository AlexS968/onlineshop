<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">

      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="filters.minPrice">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="filters.maxPrice">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" v-if="categoriesData">
          <select class="form__select" name="category"
                  v-model.number="filters.categoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categoriesData.items"
                    :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <BlockColors v-if="colorsData" type="checkbox" :colors="colorsData.items"
                     :selected-color-id.sync="filters.colorIds"/>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <BlockProperties v-if="materialsData" :data="materialsData"
                         :property-ids.sync="filters.materialIds"/>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <BlockProperties v-if="seasonData" :data="seasonData"
                         :property-ids.sync="filters.seasonIds"/>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button"
              v-if="!filterIsEmpty" @click.prevent="reset">
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
        .every((el) => el === 0);
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
