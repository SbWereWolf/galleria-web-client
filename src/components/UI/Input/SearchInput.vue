<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">{{ label }}</label>
    <div class="base-input__wrapper">
      <!-- Иконка поиска заменена на картинку -->
      <img src="../../../assets/images/search.png" alt="Search" class="base-input__icon" />

      <input
        v-bind="$attrs"
        :id="id"
        :placeholder="placeholder"
        v-model="inputValue"
        :type="type"
        class="base-input__input"
      />
    </div>
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

// Когда значение изменяется, отправляем событие обновления
watch(inputValue, (newValue) => {
  emit('update:value', newValue);
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

.base-input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.base-input__input {
  padding: 10px 10px 10px 40px; /* Добавляем место для иконки слева */
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

/* Стили для картинки (иконки поиска) */
.base-input__icon {
  position: absolute;
  left: 10px; /* Иконка теперь слева */
  top: 50%;
  transform: translateY(-50%);
  width: 20px; /* Размер картинки */
  height: 20px; /* Размер картинки */
}

label {
  color: #291202;
  font-weight: 700;
}
</style>
