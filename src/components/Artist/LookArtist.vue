<template>
  <BaseH1 size="large" :customStyles="{ paddingBottom: '60px', textAlign: 'center' }">
    Посмотреть художников
  </BaseH1>

  <div class="centerCart">
    <BaseP size="large">Стиль</BaseP>

    <!-- Используем v-model для привязки выбранных значений -->
    <CustomSelectWithCheckboxes
      v-model="selectedValues.style"
      :options="styleOptions"
      listId="style"
    />

    <!-- Выводим значение из Pinia для стиля realism -->
    <p>Значение из Pinia: {{ realismValues.join(', ') }}</p>

    <BaseButton size="large" variant="primary60" @click="handleSearch">
      Найти
    </BaseButton>
  </div>

  <BaseCard :avatar="user.avatar_url" :name="user.username" :login="user.username" :id="user.id" :style="user.style"
            :addres="user.adres" :role="user.role"/>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import BaseCard from '@/components/UI/Card/BaseCard.vue';
import CustomSelectWithCheckboxes from '@/components/UI/Select/CustomSelectWithCheckboxes.vue';
import axios from 'axios';

import {useCheckboxStore} from '@/stores/checkboxStore'; // Импортируем store из Pinia

const checkboxStore = useCheckboxStore();  // Получаем доступ к хранилищу Pinia
const selectedValues = checkboxStore.selectedValues;  // Доступ к выбранным значениям из Pinia

// Данные для списка стилей
const styleOptions = ref([]);

// Загружаем список стилей при монтировании компонента
onMounted(async () => {
  await loadStyleOptions();
});

// Функция для загрузки стилей из API
const loadStyleOptions = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Токен отсутствует');
      return;
    }

    const stylesResponse = await axios.get('/Artists/styles/', {
      baseURL: import.meta.env.VITE_API_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (Array.isArray(stylesResponse.data.styles)) {
      styleOptions.value = stylesResponse.data.styles.map(style => ({
        value: style,
        label: style,
        selected: false,
      }));
    } else {
      console.error('Ошибка при загрузке стилей');
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};

// Слушаем изменения в selectedValues.style и обновляем переменную a
const realismValues = computed(() => selectedValues.realism || []); // Используем computed для отслеживания изменений

// Выполнение поиска с использованием выбранных значений
// Выполнение поиска с использованием выбранных значений
const handleSearch = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Токен отсутствует');
      return;
    }


    // Используем .value для доступа к значению из computed
    const realismValuesString = realismValues.value.join(',');  // Преобразуем массив в строку

    const response = await axios.get('http://127.0.0.1:8001/styles/users/', {
      params: {style_names: realismValuesString},  // Отправляем строку
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Результаты поиска:', response.data);
  } catch (error) {
    console.error('Ошибка при поиске:', error);
  }
};

</script>
