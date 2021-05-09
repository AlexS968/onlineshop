<template>
  <BaseFormField
    :title="title"
    :error="error"
  >
    <label>
      <textarea
        v-model='dataValue'
        :placeholder="placeholder"
        class="form__input form__input--area"
      />
    </label>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
