<template>
  <div>
    <div class="align_horizontal_center">
      <div class="inline padding">
        <ul class="catalog__pagination pagination">
          <li class="pagination__item">
            <a
              v-if="page !== 1"
              @click.prevent="paginate(page - 1)"
              href="#"
              aria-label="Предыдущая страница"
              class="pagination__link pagination__link--arrow pagination__link--disabled"
            >
              <svg
                width="8"
                height="14"
                fill="currentColor"
              >
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li
            v-for="pageNumber in pages"
            :key="pageNumber"
            class="pagination__item"
          >
            <a
              @click.prevent="paginate(pageNumber)"
              href="#"
              class="pagination__link"
              :class="{'pagination__link--current' : pageNumber === page}"
            >
              {{ pageNumber }}
            </a>
          </li>
          <li class="pagination__item">
            <a
              v-if="page !== pages"
              @click.prevent="paginate(page + 1)"
              href="#"
              aria-label="Следующая страница"
              class="pagination__link pagination__link--arrow"
            >
              <svg
                width="8"
                height="14"
                fill="currentColor"
              >
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="align_horizontal_center">
      <div class="inline products_pro_page">
        Выводить на странице:
      </div>
      <div class="inline products_pro_page">
        <label class="form__label form__label--select select_products_number">
          <select
            v-model.number="calculatedPerPage"
            class="form__select select_products_number"
          >
            <option disabled>
              12
            </option>
            <option
              v-for="amount in paginationList"
              :key="amount"
              :value="amount"
            >
              {{ amount }}
            </option>
          </select>
        </label>
      </div>
      <div class="inline products_pro_page">
        товаров
      </div>
    </div>
  </div>
</template>

<script>
import Constants from '@/config';

export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    paginationList() {
      return Constants.PAGINATION_LIST;
    },
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
    calculatedPerPage: {
      get() {
        return this.perPage;
      },
      set(v) {
        this.$emit('update:perPage', v);
      },
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
  },
};
</script>

<style lang="stylus">
.align_horizontal_center {
  display: flex;
  align-items center
  align-content: center;
  justify-content center;
}

.inline {
  display inline-flex
}

.padding {
  padding-left 40px
}

.products_pro_page {
  width fit-content
  margin-top 30px
}

.select_products_number {
  height 25px
  padding 0 30px 0 5px
}

.select_products_number:after {
  right 25px
}
</style>
