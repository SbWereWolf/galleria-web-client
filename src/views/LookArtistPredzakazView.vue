<template>
  <BaseH1 size="large" :customStyles="{ paddingBottom: '60px', textAlign:'center' }">Предзаказы</BaseH1>

  <div class="centerCart">
    <!-- Селект для стилей -->
    <BaseP size="large">Стиль</BaseP>
    <CustomSelectWithCheckboxes :options="styleOptions" listId="style" v-model="selectedValues.style" />
    <p>Выбранные стили: {{ selectedStyleLabels }}</p>

    <!-- Селект для статусов -->
    <BaseP size="large">Статус</BaseP>
    <CustomSelectWithCheckboxes :options="statusOptions" listId="status" v-model="selectedValues.status" />
    <p>Выбранные статусы: {{ selectedStatusLabels }}</p>

    <BaseButton size="large" variant="primary60">Найти</BaseButton>
  </div>

  <div class="card_zakaz">
    <ZakazCard :artwork="artworkData" />
    <BaseButton size="small">Отозвать предзаказ</BaseButton>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import ZakazCard from '@/components/UI/Card/ZakazCard.vue';
import CustomSelectWithCheckboxes from '@/components/UI/Select/CustomSelectWithCheckboxes.vue';
import { useCheckboxStore } from '../stores/checkboxStore';

// Доступ к состоянию чекбоксов
const checkboxStore = useCheckboxStore();
const artworkData = ref({});
// Реактивное хранилище выбранных значений
const selectedValues = computed(() => checkboxStore.selectedValues);

// Опции для стилей
const styleOptions = [
  { value: "modern", label: "Современный" },
  { value: "classic", label: "Классический" },
  { value: "abstract", label: "Абстрактный" },
  { value: "dadizm", label: "Дадизм" },
];

// Опции для статусов
const statusOptions = [
  { value: "new", label: "Новый" },
  { value: "popular", label: "Популярный" },
  { value: "featured", label: "Рекомендуемый" },
];

// Реактивные метки для выбранных значений
const selectedStyleLabels = computed(() => {
  const selectedKeys = selectedValues.value.style || [];
  return selectedKeys
    .map(key => styleOptions.find(option => option.value === key)?.label)
    .filter(Boolean)
    .join(", ");
});

const selectedStatusLabels = computed(() => {
  const selectedKeys = selectedValues.value.status || [];
  return selectedKeys
    .map(key => statusOptions.find(option => option.value === key)?.label)
    .filter(Boolean)
    .join(", ");
});

onMounted(() => {
  // Устанавливаем предустановленные значения (если нужно)
  checkboxStore.selectedValues = {
    style: [],
    status: [],
  };
});
</script>
