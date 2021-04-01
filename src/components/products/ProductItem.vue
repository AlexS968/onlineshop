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

    <div class="inline">
      <span class="catalog__price">{{ product.price | setNumberFormat }} ₽</span>
    </div>
    <div class="inline right">
      <button class="button--primery" @click.prevent="addToCart">В корзину</button>
    </div>

    <BlockColors type="radio" :colors="colors" :selected-color-id.sync="selectedColorId"/>

  </li>
</template>

<script>
import setNumberFormat from '@/helpers/setNumberFormat';
import getImage from '@/helpers/getImage';
import BlockColors from '@/components/common/BlockColors.vue';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedColorId: 0,
    };
  },
  props: ['product'],
  components: { BlockColors },
  filters: {
    setNumberFormat,
  },
  computed: {
    ...mapState('products', ['productData']),
    colors() {
      return this.product.colors ? this.product.colors.map((obj) => obj.color) : [];
    },
    computedImage() {
      return getImage(this.product, this.selectedColorId);
    },
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),
    ...mapActions('products', ['loadProductData']),
    ...mapActions('error', ['loadErrorData']),
    async addToCart() {
      try {
        await this.loadProductData(this.product.id);
        await this.addProductToCart({
          productId: this.product.id,
          colorId: this.product.colors[0].color.id,
          sizeId: this.productData.sizes[0].id,
          quantity: 1,
        });
      } catch (e) {
        console.log(e.response.data.error);
        this.loadErrorData(e.response.data.error);
      }
    },
  },
  created() {
    this.selectedColorId = this.product.colors[0].color.id;
  },
};
</script>

<style lang="stylus">
.inline {
  display inline-flex
}

.right {
  padding-left 130px
}

</style>
