<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li>
          <router-link
            :to="{name: 'home'}"
            class="footer__link"
          >
            Каталог
          </router-link>
        </li>
        <li>
          <a
            href="tel:88006009009"
            class="footer__link"
          >
            8 800 600 90 09
          </a>
        </li>
        <li>
          <a
            href="mailto:hi@technozavrrr.com"
            class="footer__link"
          >
            hi@technozavrrr.com
          </a>
        </li>
        <li>
          <router-link
            :to="{name: 'sale'}"
            class="footer__link"
          >
            Распродажа
          </router-link>
        </li>
        <li>
          <a
            href="#"
            class="footer__link footer__link--medium"
          >
            Заказать звонок
          </a>
        </li>
      </ul>
      <ul class="footer__social social">
        <li class="social__item">
          <a
            aria-label="Вконтакте"
            class="social__link" href="#"
          >
            <svg
              width="20"
              height="11"
              fill="currentColor"
            >
              <use xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a
            href="#"
            aria-label="Инстаграм"
            class="social__link"
          >
            <svg
              width="17"
              height="17"
              fill="currentColor"
            >
              <use xlink:href="#icon-insta"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a
            href="#"
            aria-label="Facebook"
            class="social__link"
          >
            <svg
              width="17"
              height="17"
              fill="currentColor"
            >
              <use xlink:href="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a
            href="#"
            aria-label="Twitter"
            class="social__link"
          >
            <svg
              width="17"
              height="14"
              fill="currentColor"
            >
              <use xlink:href="#icon-twitter"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a
            href="#"
            aria-label="Telegram"
            class="social__link"
          >
            <svg
              width="19"
              height="17"
              fill="currentColor"
            >
              <use xlink:href="#icon-telegram"></use>
            </svg>
          </a>
        </li>
      </ul>
      <p class="footer__desc">
        Все права на материалы, находящиеся на сайте, охраняются в соответствии с
        законодательством РФ, в том числе об авторском праве и смежных правах.
      </p>
      <ul class="footer__data">
        <li>
          <router-link
            :to="{name: 'privacy'}"
            class="footer__link"
          >
            Политика конфиденциальности
          </router-link>
        </li>
        <li>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            type="application/pdf"
            class="footer__link"
          >
            Публичная оферта
          </a>
        </li>
      </ul>
      <span class="footer__copyright">
        © 2020 Moire
      </span>
    </div>
  </footer>
</template>

<script>
export default {};
</script>
