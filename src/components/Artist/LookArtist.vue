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
    <p>Значение из Pinia: {{ styleValues.join(', ') }}</p>

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
    const token = window.localStorage.getItem('jwtToken');
    if (!token) {
      window.console.error('Токен отсутствует');
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
      window.console.error('Ошибка при загрузке стилей');
    }
  } catch (error) {
    window.console.error('Ошибка при загрузке данных:', error);
  }
};

// Слушаем изменения в selectedValues.style и обновляем переменную a
const styleValues = computed(() => selectedValues.style || []); // Используем computed для отслеживания изменений

// Выполнение поиска с использованием выбранных значений
const handleSearch = async () => {
  try {
    const token = window.localStorage.getItem('jwtToken');
    if (!token) {
      window.console.error('Токен отсутствует');
      return;
    }

    // Используем .value для доступа к значению из computed
    const styleValuesString =
      styleValues.value.join('&style_list=');  // Преобразуем массив в строку

    const response = await axios.get(
      `/Artists/list/?style_list=${styleValuesString}`, {
        baseURL: import.meta.env.VITE_API_SERVER,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    window.console.log('Результаты поиска:', response.data);
  } catch (error) {
    window.console.error('Ошибка при поиске:', error);
  }
};

</script>
