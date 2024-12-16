<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      :placeholder="placeholder"
      :value="inputValue"
      @input="onInput"
      v-model="inputValue"
      :type="type"
      class="base-input__input"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

// Определяем входные параметры
const props = defineProps({
  label: String,
  placeholder: String,
  value: String,
  id: String,
  type: {
    type: String,
    default: 'text',
  },
});

// Моделируем двустороннюю привязку данных
const emit = defineEmits(['update:value']);

// Создаем локальное состояние для inputValue
const inputValue = ref(props.value);

const onInput = (event) => {
  inputValue.value = event.target.value; // Обновляем локальное значение
  emit('update:value', inputValue.value); // Отправляем обновление в родительский компонент
};
// Когда значение изменяется, отправляем событие обновления
// watch(inputValue, (newValue) => {
//   emit('update:value', newValue);
// });

watch(() => props.value, (newValue) => {
  inputValue.value = newValue;
});
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.base-input__label {
  font-size: 14px;
  margin-bottom: 5px;
}

.base-input__input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 54px;
  width: 400px;
}

.base-input__input:focus {
  outline: none;
  border-color: #007bff;
}
label{
  color:#291202;
  font-weight: 700;
}
</style>
