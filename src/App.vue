<template>
  <div>
    <BaseHeader/>
    <ErrorPopup v-if="dataTransferError" @closeErrPopup="closeErrPopup">
      <div>
        Уважаемый пользователь,<br>
        при загрузке данных произошла<br>
        {{ errorData.message }}<br>
        Просьба обратиться в техподдержку.
        <br>
      </div>
    </ErrorPopup>
    <div v-if="dataLoading">Загрузка товара...<BlockPreloader class="preloader big"/></div>
    <router-view/>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseHeader from '@/components/base/BaseHeader.vue';
import BaseFooter from '@/components/base/BaseFooter.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import ErrorPopup from '@/components/errors/ErrorPopup.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    BaseHeader, BaseFooter, BlockPreloader, ErrorPopup,
  },
  computed: {
    ...mapState(['dataLoading', 'dataTransferError']),
    ...mapState('error', ['errorData']),
  },
  methods: {
    ...mapActions('cart', ['loadCartProducts']),
    ...mapMutations(['updateUserAccessKey', 'changeDataTransferError']),
    closeErrPopup() {
      this.$store.commit('changeDataTransferError', false);
    },
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');

    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }

    this.loadCartProducts();
  },
};
</script>
