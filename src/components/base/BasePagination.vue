<template>
  <div class="align_horizontal_center">
    <div class="inline">Выводить на странице:</div>
    <div class="inline">
      <label class="form__label form__label--select">
        <select class="form__select" v-model.number="calculatedPerPage">
          <option :value="amount" v-for="amount in paginationList" :key="amount">
            {{ amount }}
          </option>
        </select>
      </label>
    </div>
    <div class="inline">товаров</div>

    <div class="inline padding">
      <ul class="catalog__pagination pagination">

        <li class="pagination__item">
          <a v-if="page !== 1" href="#"
             class="pagination__link pagination__link--arrow pagination__link--disabled"
             aria-label="Предыдущая страница" @click.prevent="paginate(page - 1)">
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-left"></use>
            </svg>
          </a>
        </li>

        <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
          <a href="#" class="pagination__link"
             :class="{'pagination__link--current' : pageNumber === page}"
             @click.prevent="paginate(pageNumber)">
            {{ pageNumber }}
          </a>
        </li>

        <li class="pagination__item">
          <a v-if="page !== pages" class="pagination__link pagination__link--arrow" href="#"
             aria-label="Следующая страница" @click.prevent="paginate(page + 1)">
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paginationList: [9, 18, 27],
    };
  },
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
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
</style>
