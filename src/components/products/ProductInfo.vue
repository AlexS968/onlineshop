<template>
  <div class="item__desc">
    <ul class="tabs">
      <li
        v-for="item in productInfo"
        :key="item.title"
        class="tabs__item"
      >
        <a
          @click.prevent="chooseOption(item)"
          href="#"
          v-bind:class="classObject(item.isActive)"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
    <div
      v-if="showOption('Информация о товаре')"
      class="item__content"
    >
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
    <div
      v-if="showOption('Доставка и возврат')"
      class="item__content"
    >
      <h3>Бесконтактная доставка:</h3>
      <p>Курьер предупредит вас заранее о своем приезде. Уже на адресе оставит заказ с
        сопроводительными документами перед дверью и отойдет на безопасное расстояние, чтобы дать
        вам возможность проверить состав заказа, примерить товары и подписать документы.</p>
      <p>Курьеру можно вернуть только те товары, которые вам не подошли, и подписанные
        документы.</p>
      <p>Мы рекомендуем оплачивать заказ онлайн — это наиболее безопасный способ. Если в заказе вам
        что-то не подойдет, вы сможете отказаться от этих товаров, заполнить заявление на возврат и
        отправить на почту
        <a class="footer__link" href="mailto:hi@technozavrrr.com">hi@technozavrrr.com</a>.
        Деньги вернутся на ваш счет.</p>
      <p>Конечно, вы по-прежнему можете оплатить заказ на месте, банковской картой или наличными —
        курьер будет держаться от вас на расстоянии 1 метра.</p>
      <p>Пожалуйста, при оплате наличными подготовьте сумму без сдачи. А для подписи
        сопроводительных документов — ручку.</p>
      <h3>Способы оформления заказа:</h3>
      <p>Вы можете оформить заказ на сайте
        <a class="footer__link" href="https://www.technozavrrr.com">www.technozavrrr.com</a> или
        через менеджера интернет-магазина по бесплатному контактному телефону
        <a class="footer__link" href="tel:88006009009">8 800 600 90 09</a>. После
        оформления заказа менеджер интернет-магазина свяжется с Вами для подтверждения заказа
        в день его оформления.</p><br>
      <p><strong>Убедительно просим Вас корректно указывать свои контактные данные, иначе менеджер
        интернет-магазина не сможет связаться с Вами и заказ будет аннулирован.</strong></p>
    </div>
  </div>
</template>

<script>
import Constants from '@/config';

export default {
  data() {
    return {
      productInfo: Constants.PRODUCT_INFO,
    };
  },
  props: ['productData'],
  computed: {},
  methods: {
    classObject(v) {
      return v ? 'tabs__link tabs__link--current' : 'tabs__link';
    },
    showOption(value) {
      return this.productInfo.filter((i) => i.title === value)[0].isActive;
    },
    chooseOption(item) {
      this.productInfo.map((i) => {
        const result = i;
        result.isActive = i.title === item.title;
        return result;
      });
    },
  },
};
</script>
