<template>
  <main class="content container" v-if="!dataLoading">
    <div class="content__top" v-if="productData">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'home' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
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

    <section class="item">
      <div v-if="productAddSending"><BlockPreloader class="preloader big"/></div>
      <div class="item__pics pics" v-else>
        <div class="pics__wrapper">
          <img width="570" height="570" :src="computedImage"
               srcset="" :alt="productData.title">
        </div>
        <ul class="pics__list" v-if="computedImageList">
          <li class="pics__item" v-for="image in computedImageList" :key="image">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" :src="image" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productData.id }}</span>
        <h2 class="item__title">
          {{ productData.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">

              <BlockCounter :amount.sync="productAmount"/>

              <b class="item__price">
                {{ productData.price * productAmount | numberFormat }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <BlockColors class="white__border__color" type="radio"
                             :colors="colors" :selected-color-id.sync="selectedColorId"/>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select"
                       v-if="productData.sizes">
                  <select class="form__select" name="category" v-model="selectedSize">
                    <option :value="null" selected disabled hidden>Выберите размер</option>
                    <option v-for="size in productData.sizes" :key="size.id" :value="size">
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery"
                    type="submit" :disabled="productAddSending || !selectedSize">
              <div v-if="productAddSending">Добавляем товар...</div>
              <div v-else>В корзину</div>
            </button>

            <div v-if="productAdded">Товар добавлен в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import image from '@/helpers/image';
import imageList from '@/helpers/imageList';
import BlockColors from '@/components/common/BlockColors.vue';
import BlockCounter from '@/components/common/BlockCounter.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
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
  components: { BlockColors, BlockCounter, BlockPreloader },
  computed: {
    ...mapState(['dataLoading']),
    ...mapState('products', ['productData']),
    colors() {
      return this.productData.colors ? this.productData.colors.map((obj) => obj.color) : [];
    },
    computedImage() {
      return image(this.productData, this.selectedColorId);
    },
    computedImageList() {
      return imageList(this.productData, this.selectedColorId);
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
    numberFormat,
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProductData(this.$route.params.id);
      },
      immediate: true,
    },
    productData: {
      handler() {
        this.selectedColorId = this.colors[0].id;
      },
    },
  },
};
</script>
