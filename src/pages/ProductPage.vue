<template>
  <main class="content container" v-if="productData">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            :to="{ name: 'home' }"
            class="breadcrumbs__link"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a href="#" class="breadcrumbs__link">
            {{ productData.category.title }}
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ productData.title }}
          </a>
        </li>
      </ul>
    </div>
    <section v-if="dataLoading">
      <div>
        <BlockPreloader class="preloader big"/>
      </div>
      <div class="container">
        Данные загружаются...
      </div>
    </section>
    <section
      v-else
      class="item"
    >
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            :src="computedImage"
            :alt="productData.title"
            width="570"
            height="570"
            srcset=""
          >
        </div>
        <ul
          v-if="computedImageList"
          class="pics__list"
        >
          <li
            v-for="image in computedImageList"
            :key="image"
            class="pics__item"
          >
            <a href="" class="pics__link pics__link--current">
              <img
                :src="image"
                width="98"
                height="98"
                alt="Название товара"
              >
            </a>
          </li>
        </ul>
      </div>
      <div class="item__info">
        <span class="item__code">
          Артикул: {{ productData.id }}
        </span>
        <h2 class="item__title">
          {{ productData.title }}
        </h2>
        <div class="item__form">
          <form
            @submit.prevent="addToCart"
            action="#"
            method="POST"
            class="form"
          >
            <div class="item__row item__row--center">
              <BlockCounter :amount.sync="productAmount"/>
              <b class="item__price">
                {{ productData.price * productAmount | setNumberFormat }} ₽
              </b>
            </div>
            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">
                  Цвет
                </legend>
                <BlockColors
                  :selected-color-id.sync="selectedColorId"
                  :colors="colors"
                  type="radio"
                  class="white__border__color"
                />
              </fieldset>
              <fieldset class="form__block">
                <legend class="form__legend">
                  Размер
                </legend>
                <label
                  v-if="productData.sizes"
                  class="form__label form__label--small form__label--select"
                >
                  <select
                    v-model="selectedSize"
                    name="category"
                    class="form__select"
                  >
                    <option
                      :value="null"
                      selected
                      disabled
                      hidden
                    >
                      Выберите размер
                    </option>
                    <option
                      v-for="size in productData.sizes"
                      :key="size.id"
                      :value="size"
                    >
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>
            <button
              :disabled="productAddSending || !selectedSize"
              type="submit"
              class="item__button button button--primery"
            >
              <BlockPreloader
                v-if="productAddSending"
                class="preloader small"
              />
              <div v-else>
                В корзину
              </div>
            </button>
            <div v-if="productAdded">
              Товар добавлен в корзину
            </div>
          </form>
        </div>
      </div>
      <ProductInfo :product-data.sync="productData"/>
    </section>
  </main>
</template>

<script>
import setNumberFormat from '@/helpers/setNumberFormat';
import getImage from '@/helpers/getImage';
import getImageList from '@/helpers/getImageList';
import BlockColors from '@/components/common/BlockColors.vue';
import BlockCounter from '@/components/common/BlockCounter.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import ProductInfo from '@/components/products/ProductInfo.vue';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      productAmount: 1,
      selectedColorId: 0,
      selectedSize: null,
      productAdded: false,
      productAddSending: false,
    };
  },
  components: {
    BlockColors,
    BlockCounter,
    BlockPreloader,
    ProductInfo,
  },
  computed: {
    ...mapState(['dataLoading']),
    ...mapState('products', ['productData']),
    colors() {
      return this.productData.colors ? this.productData.colors.map((obj) => obj.color) : [];
    },
    computedImage() {
      return getImage(this.productData, this.selectedColorId);
    },
    computedImageList() {
      return getImageList(this.productData, this.selectedColorId);
    },
  },
  methods: {
    ...mapActions('cart', ['addProductToCart']),
    ...mapActions('products', ['loadProductData']),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({
        productId: this.productData.id,
        colorId: this.selectedColorId,
        sizeId: this.selectedSize.id,
        quantity: this.productAmount,
      })
        .catch((e) => {
          console.log(e);
        })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
  },
  filters: {
    setNumberFormat,
  },
  watch: {
    '$route.params.id': {
      async handler() {
        await this.loadProductData(this.$route.params.id);
        this.selectedColorId = this.colors[0].id;
      },
      immediate: true,
    },
  },
};
</script>
