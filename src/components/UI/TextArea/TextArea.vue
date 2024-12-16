<template>
  <textarea
    v-bind="$attrs"
    class="custom-textarea"
    v-model="textValue"
    :placeholder="placeholder"
  ></textarea>
</template>

<script setup>
import { ref } from 'vue';

// Пропсы
defineProps({
  placeholder: {
    type: String,
    default: 'Введите текст...',
  },
});

// Состояние для текстового поля
const textValue = ref('');
</script>

<style scoped>
.custom-textarea {
  width: 400px;
  height: 400px;
  padding: 10px 10px 10px 40px; /* Добавляем место для иконки слева */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; /* Отключение изменения размера */
}

.custom-textarea:focus {
  border-color: #555; /* Немного светлее при фокусе */
  outline: none;
}
</style>
