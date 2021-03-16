<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="computedImage" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price | numberFormat }} ₽
            </span>

    <BlockColors :colors="colors" :selected-color-id.sync="selectedColorId"/>

  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import BlockColors from '@/common/BlockColors.vue';

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
      if (this.selectedColorId === 0) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.product.colors.length; i++) {
          if (this.product.colors[i].gallery) {
            return this.product.colors[i].gallery[0].file.url;
          }
        }
        return 'img/no_photo_available.jpg';
      }
      return this.product.colors.filter((o) => o.color.id === this.selectedColorId)
        .map((o) => o.gallery[0].file.url)[0];
    },
  },
};
</script>
