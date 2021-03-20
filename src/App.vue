<template>
  <div>
    <BaseHeader/>
    <div v-if="dataLoading">Загрузка товара...<BlockPreloader class="preloader big"/></div>
    <router-view/>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseHeader from '@/components/base/BaseHeader.vue';
import BaseFooter from '@/components/base/BaseFooter.vue';
import BlockPreloader from '@/components/common/BlockPreloader.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: { BaseHeader, BaseFooter, BlockPreloader },
  computed: { ...mapState(['dataLoading']) },
  methods: {
    ...mapActions('cart', ['loadCartProducts']),
    ...mapMutations(['updateUserAccessKey']),
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
