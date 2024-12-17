<template>
  <div class="dropdown">
    <!-- Кнопка для открытия dropdown -->
    <button class="btn btn-white dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
            aria-expanded="false">
      {{ selectedValues.length ? selectedValues.join(', ') : 'Выберите опции' }}
    </button>

    <!-- Список с чекбоксами внутри dropdown -->
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li v-for="option in options" :key="option.value">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`checkbox-${option.value}`"
            v-model="selectedValues"
            :value="option.value"
            :checked="option.selected"
            @change="updateParent"
          />
          <label class="form-check-label" :for="`checkbox-${option.value}`">
            {{ option.label }}
          </label>
        </div>
      </li>
    </ul>

    <!-- Отображаем выбранные значения -->
    <div class="mt-2">
      <strong>Выбрано:</strong> {{ selectedValues.join(', ') }}
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, defineEmits, watch, onMounted} from 'vue';
import {useCheckboxStore} from '@/stores/checkboxStore';
import axios from "axios"; // Импортируем store из Pinia

// Получаем массив options через пропсы
defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(['update:selectedValues']);

// Подключаем Pinia store
const checkboxStore = useCheckboxStore();

// Получаем выбранные значения из Pinia для конкретного списка
const listId = 'styles';
const selectedValues = ref(checkboxStore.selectedValues[listId] || []);

// Функция для обновления родителя и хранилища
const updateParent = () => {
  checkboxStore.updateSelectedValues(listId, selectedValues.value); // Обновляем значение в Pinia для конкретного списка
  emit('update:selectedValues', selectedValues.value); // Отправляем обновление родителю
};

// Следим за изменениями в selectedValues
watch(selectedValues, (newValue) => {
  checkboxStore.updateSelectedValues(listId, newValue); // Обновляем значение в Pinia, когда оно изменяется
});


onMounted(async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    console.error('Токен отсутствует');
    return;
  }

  const userResponse = await fetch(
    import.meta.env.VITE_API_SERVER + '/Accounts/me/'
    , {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  const userData = await userResponse.json();

  const selectedResponse = await axios.get(
    `/Artists/${userData.username}/styles/`, {
      baseURL: import.meta.env.VITE_API_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  selectedResponse.data.styles.forEach(function (value) {
    checkboxStore.toggleValue(listId, value);
  });

});
</script>


<style scoped>
/* Стили для кнопки */
.btn-white {
  background-color: #fff; /* Белый фон */
  color: #000; /* Черный текст */
  width: 400px; /* Ширина 400px */
  height: 54px; /* Высота 54px */
  border: 2px solid #000; /* Черная рамка */
  border-radius: 4px; /* Скругленные углы */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* justify-content: center;
  align-items: center; */
  font-size: 16px; /* Размер шрифта */
}

/* Стили для чекбоксов */
.form-check-input {
  width: 32px; /* Устанавливаем ширину 32px */
  height: 32px; /* Устанавливаем высоту 32px */
  background-color: #fff; /* Белый фон */
  border: 2px solid #000; /* Черная рамка */
  border-radius: 4px; /* Скругляем углы */
  position: relative;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  margin-right: 10px; /* Отступ справа от чекбокса */
}

/* Стили для активного состояния чекбокса (когда он выбран) */
.form-check-input:checked {
  background-color: #fff; /* Белый фон */
  border-color: #000; /* Черная рамка */
}

/* Стили для галочки, которая будет черной */
.form-check-input:checked::after {
  content: "✔"; /* Черная галочка */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 32px; /* Центрируем галочку по вертикали */
  color: black; /* Черный цвет галочки */
  font-size: 24px; /* Размер галочки */
}

/* Стили для состояния чекбокса при фокусе */
.form-check-input:focus {
  border-color: #000; /* Черная рамка при фокусе */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Легкая тень при фокусе */
}

/* Стили для списка чекбоксов */
.dropdown-menu {
  max-height: 300px;
  overflow-y: auto; /* Добавляем прокрутку, если элементов много */
}

/* Стили для элементов списка */
.dropdown-menu .form-check {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Отступы между строками */
}

/* Контейнер dropdown */
.dropdown {
  position: relative;
  display: inline-block;
  width: 400px;
}

ul {
  width: 400px;
  padding-left: 10px;

}
</style>
