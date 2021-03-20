<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name:'product', params:{id:product.id}}">
      <img :src="computedImage" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name:'product', params:{id:product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
              {{ product.price | numberFormat }} ₽
            </span>

    <BlockColors type="radio" :colors="colors" :selected-color-id.sync="selectedColorId"/>

  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import image from '@/helpers/image';
import BlockColors from '@/components/common/BlockColors.vue';

export default {
  data() {
    return {
      selectedColorId: 0,
    };
  },
  props: ['product'],
  components: { BlockColors },
  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      return this.product.colors ? this.product.colors.map((obj) => obj.color) : [];
    },
    computedImage() {
      return image(this.product, this.selectedColorId);
    },
  },
};
</script>
