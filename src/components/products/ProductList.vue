<template>
  <div>
    <ul
      v-if="!isProductListEmpty"
      class="catalog__list"
    >
      <ProductItem
        v-for="product in productList"
        :key="product.id"
        :product="product"
      />
    </ul>
    <div v-else>
      <h1>Товары, соответствующие вашему запросу, отсутствуют.</h1>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/products/ProductItem.vue';

export default {
  props: ['productList'],
  components: { ProductItem },
  computed: {
    isProductListEmpty() {
      return !this.productList || this.productList.length === 0;
    },
  },
};
</script>
