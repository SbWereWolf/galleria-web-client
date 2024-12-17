<template>
  <BaseH1 size="large" :customStyles="{ paddingBottom: '60px', textAlign:'center' }">Посмотреть художников</BaseH1>
  <div class="centerCart">
    <BaseP size="large">Стиль</BaseP>
    <CustomSelectWithCheckboxes :options="styleOptions" listId="style"/>
    <p>Выбранные значения: {{ selectedValues.style }}</p>

    <BaseP size="large">Статус</BaseP>
    <CustomSelectWithCheckboxes :options="statusOptions" listId="status"/>
    <p>Выбранные значения: {{ selectedValues.status }}</p>

    <BaseButton size="large" variant="primary60">Найти</BaseButton>
  </div>

  <BaseCard/>
</template>

<script setup>
import {computed} from "vue";
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import BaseCard from '@/components/UI/Card/BaseCard.vue';
import CustomSelectWithCheckboxes from '@/components/UI/Select/CustomSelectWithCheckboxes.vue';
import {useCheckboxStore} from "@/stores/checkboxStore";

const checkboxStore = useCheckboxStore();

const selectedValues = computed(() => checkboxStore.selectedValues);

const styleOptions = [
  {value: "modern", label: "Современный"},
  {value: "classic", label: "Классический"},
  {value: "abstract", label: "Абстрактный"},
];

const statusOptions = [
  {value: "available", label: "Доступен"},
  {value: "unavailable", label: "Недоступен"},
  {value: "pending", label: "В ожидании"},
];
</script>
