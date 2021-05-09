<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info">
          {{ productsNumber }}
        </span>
      </div>
    </div>
    <div class="content__catalog">
      <ProductFilter :current-filters.sync="filters"/>
      <section class="catalog">
        <div v-if="dataLoading">
          <div>
            <BlockPreloader class="preloader big"/>
          </div>
          <div class="container">
            Данные загружаются...
          </div>
        </div>
        <div v-else>
          <ProductList
            v-if="productsData"
            :product-list="productsData.items"
          />
        </div>
      </section>
    </div>
    <BasePagination
      v-model="page"
      :count="countProducts"
      :per-page.sync="productsPerPage"
    />
  </main>
</template>

<script>
import enumerate from '@/helpers/enumerate';
import Constants from '@/config';
import ProductList from '@/components/products/ProductList.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import ProductFilter from '@/components/products/ProductFilter.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      filters: Constants.FILTERS,
      page: 1,
      productsPerPage: 12,
    };
  },
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    BlockPreloader,
  },
  computed: {
    ...mapState('products', ['productsData']),
    ...mapState(['dataLoading']),
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : [];
    },
    productsNumber() {
      return `${this.countProducts} ${enumerate(this.countProducts,
        ['товар', 'товара', 'товаров'])}`;
    },
    changedData() {
      const {
        filters,
        productsPerPage,
      } = this;
      return {
        filters,
        productsPerPage,
      };
    },
  },
  methods: {
    ...mapActions('products', ['getProductList']),
  },
  watch: {
    changedData: {
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
