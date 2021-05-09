<template>
  <div class="err-popup">
    <div class="err-popup__header">
      <span>Error</span>
      <span>
        <i
          @click.prevent="closeErrPopup"
          class="material-icons"
        >
          close
        </i>
      </span>
    </div>
    <div class="err-popup__content">
      <slot></slot>
    </div>
    <div class="err-popup__footer">
      <button
        @click.prevent="closeErrPopup"
        class="close_modal"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeErrPopup() {
      this.$emit('closeErrPopup');
    },
  },
};
</script>

<style lang="stylus">
.err-popup {
  padding 16px
  position center
  top 200px
  width 400px
  margin 0 auto
  background #ffffff; \
  box-shadow 0 0 17px 0 #B9B9B9
  z-index 10

  &__header, &__footer {
    display flex
    justify-content space-between
    align-items center
  }

  &__header {
    background red
    font-size 24px
    font-weight bold
  }

  &__footer {
    justify-content center
  }

  &__content {
    display flex
    justify-content left
    align-items center
  }
}

.close_modal {
  padding 8px
  background red
}
</style>
