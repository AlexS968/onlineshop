<template>
  <div>
    <BaseHeader/>
    <router-view/>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseHeader from '@/base/BaseHeader.vue';
import BaseFooter from '@/base/BaseFooter.vue';

export default {
  components: { BaseHeader, BaseFooter },
};
</script>
