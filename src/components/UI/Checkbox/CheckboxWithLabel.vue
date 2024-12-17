<template>
  <div class="checkbox-with-label">
    <label :for="id" class="label">
      <slot>{{ label }}</slot>
    </label>
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox"
    />

  </div>
</template>

<script setup>
import {defineProps} from 'vue';

defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.checkbox-with-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox {
  width: 30px;
  height: 30px;
  cursor: pointer;
  /* Скрываем стандартный чекбокс */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid #ccc; /* Черная рамка */
  border-radius: 5px;
  position: relative;
}

.checkbox:checked::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  background-image: url('../../../assets/galka.png'); /* Убедитесь, что путь правильный */
  background-size: contain;
  background-repeat: no-repeat;
}

.label {
  font-size: 16px;
  cursor: pointer;
  color: #291202;
  user-select: none;
}
</style>
