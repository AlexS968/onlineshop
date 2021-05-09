<template>
  <li class="catalog__item">
    <router-link
      :to="{name:'product', params:{id:product.id}}"
      class="catalog__pic"
    >
      <img
        :src="computedImage"
        :alt="product.title"
      >
    </router-link>
    <h3 class="catalog__title">
      <router-link :to="{name:'product', params:{id:product.id}}">
        {{ product.title }}
      </router-link>
    </h3>
    <div class="inline_block">
      <div class="inline">
        <span class="catalog__price">
          {{ product.price | setNumberFormat }} ₽
        </span>
      </div>
      <div class="inline right">
        <button
          @click.prevent="addToCart"
          class="button--primery"
        >
          В корзину
        </button>
      </div>
    </div>
    <BlockColors
      :colors="colors"
      :selected-color-id.sync="selectedColorId"
      type="radio"
    />
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

.catalog__item {
  background-color: #f5f5f5
  box-shadow 0 0 10px 10px #f5f5f5
}

.inline_block {
  padding: 0 5px
  text-align: left
}

.inline {
  display inline-flex
  height 25px
  width 150px
}

.right {
  width fit-content
  padding-left 38px
}

.button--primery {
  background-color #f00
  box-shadow: 5px 5px 10px tomato
}
</style>
