<template>
  <div class="custom-select">
    <label>{{ label }}</label>
    <div class="select" @click="toggleOpen">
      <div class="select-title" :class="{ open: isOpen }">{{ selectedValue || 'Choose an option' }}

      </div>
      <div v-if="isOpen" class="select-options">
        <div
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          class="select-option"
        >
          {{ option.label }}
          <hr v-if="index !== options.length - 1" class="option-divider"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps} from 'vue';

const props = defineProps({
  label: String,
  options: Array,
  modelValue: String,
});

const isOpen = ref(false); // Состояние для открытия/закрытия меню
// const selectedValue = ref(''); // Текущее выбранное значение
const emit = defineEmits(['update:modelValue']);
// Функция для открытия и закрытия меню
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const selectedValue = ref(props.modelValue);
// Функция для выбора опции и скрытия меню
const selectOption = (option) => {
  selectedValue.value = option.label; // Установка выбранного значения
  isOpen.value = true; // Закрытие меню после выбора
  emit('update:modelValue', option.value);
};
</script>

<style scoped>
.custom-select {
  width: 400px;
  font-family: Roboto, sans-serif, sans-serif;
  position: relative;
  height: 540x;
  top: -6px;
}

.select {
  cursor: pointer;
  position: relative;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* height: 54px; */
}

.select-title {
  /* padding: 5px; */
  background-color: #fff;
  font-size: 16px;
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
}

.select-option {
  padding: 8px;
  cursor: pointer;
}

.option-divider {
  margin: 0;
  border-top: 1px solid #ccc;
}

.select-option:hover {
  background-color: #f0f0f0;
}

hr {
  position: relative;
  top: 10px;

}

label {
  font-size: 14px;
  margin-bottom: 5px;


  color: #291202;
  font-weight: 700;
}

.select-title::after {
  content: '▼'; /* Стрелочка вниз */
  font-size: 12px;
  color: #000; /* Цвет стрелочки */
  position: absolute;
  right: 10px;
  transition: transform 0.3s ease;
}

.select-title.open::after {

  transform: rotate(180deg); /* Поворот стрелочки вверх */
}

</style>
