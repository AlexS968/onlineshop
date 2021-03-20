<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in productList" :key="product.id" :product="product"/>
  </ul>
</template>

<script>
import ProductItem from '@/components/products/ProductItem.vue';

export default {
  props: ['productList'],
  components: { ProductItem },
};
</script>
