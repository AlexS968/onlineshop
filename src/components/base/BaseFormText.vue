<template>
  <BaseFormField
    :title="title"
    :error="error"
  >
    <label>
      <input
        v-model='dataValue'
        :type="type"
        :placeholder="placeholder"
        class="form__input"
      >
    </label>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
};
</script>
