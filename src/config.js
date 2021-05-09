const Constants = {
  API_BASE_URL: 'https://vue-moire.skillbox.cc',
  TIME_OUT: 1000,
  FILTERS: {
    categoryId: 0,
    materialIds: [],
    seasonIds: [],
    colorIds: [],
    minPrice: '',
    maxPrice: '',
  },
  PAGINATION_LIST: [9, 18, 27],
  PRODUCT_INFO: [
    {
      isActive: true,
      title: 'Информация о товаре',
    },
    {
      isActive: false,
      title: 'Доставка и возврат',
    },
  ],
};

export default Constants;
