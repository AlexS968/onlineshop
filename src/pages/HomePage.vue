<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ productsNumber }}
        </span>
      </div>
    </div>

    <div class="content__catalog">

      <ProductFilter :current-filters.sync="filters"/>

      <section class="catalog">

        <ProductList v-if="productsData" :product-list="productsData.items"/>

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>

      </section>
    </div>
  </main>
</template>

<script>
import enumerate from '@/helpers/enumerate';
import ProductList from '@/components/products/ProductList.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import ProductFilter from '@/components/products/ProductFilter.vue';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      filters: {
        filterCategoryId: 0,
        filterMaterialIds: [],
        filterSeasonIds: [],
        filterColorIds: [],
        filterMinPrice: 0,
        filterMaxPrice: 0,
      },
      page: 1,
      productsPerPage: 12,
    };
  },
  components: { ProductList, BasePagination, ProductFilter },
  computed: {
    ...mapState('products', ['productsData']),
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : [];
    },
    productsNumber() {
      return `${this.countProducts} ${enumerate(this.countProducts,
        ['товар', 'товара', 'товаров'])}`;
    },
  },
  methods: {
    ...mapActions('products', ['getProductList']),
  },
  watch: {
    filters: {
      handler() {
        this.getProductList({
          filters: this.filters,
          page: this.page,
          productsPerPage: this.productsPerPage,
        });
      },
      deep: true,
      immediate: true,
    },
    page() {
      this.getProductList({
        filters: this.filters,
        page: this.page,
        productsPerPage: this.productsPerPage,
      });
    },
  },
};
</script>
