<template>
  <div>
    <BaseHeader/>
    <ErrorPopup v-if="dataTransferError && errorData" @closeErrPopup="closeErrPopup">
      <div><br>
        Уважаемый пользователь,<br>
        при загрузке данных произошла ошибка<br><br>
        <h3>{{ getMessage }}</h3><br>
        Просьба обратиться в техподдержку.<br>
        <br>
      </div>
    </ErrorPopup>
    <div v-if="dataLoading">
      <div><BlockPreloader class="preloader big"/></div>
      <div class="container">Данные загружаются...</div>
    </div>
    <router-view/>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseHeader from '@/components/base/BaseHeader.vue';
import BaseFooter from '@/components/base/BaseFooter.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import ErrorPopup from '@/components/errors/ErrorPopup.vue';
import {
  mapState, mapActions, mapMutations, mapGetters,
} from 'vuex';

export default {
  components: {
    BaseHeader,
    BaseFooter,
    BlockPreloader,
    ErrorPopup,
  },
  computed: {
    ...mapState(['dataLoading', 'dataTransferError']),
    ...mapState('error', ['errorData']),
    ...mapGetters('error', ['getMessage']),
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
  watch: {
    errorData: {
      handler() {
        this.$store.commit('changeDataTransferError', true, { root: true });
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
