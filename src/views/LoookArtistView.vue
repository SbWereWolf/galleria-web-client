<template>
  <BaseH1 size="large" :customStyles="{ paddingBottom: '60px', textAlign:'center' }">Посмотреть художников</BaseH1>
  <div class="centerCart">
     <BaseP size="large">Стиль</BaseP>
  <CustomSelectWithCheckboxes :options="styleOptions" listId="style" />
  <p>Выбранные значения: {{ selectedValues.style }}</p>

  <BaseButton size="large" variant="primary60">Найти</BaseButton>
  </div>

  <BaseCard />
</template>
<script setup>
import { computed } from 'vue';
// import SearchInput from '@/components/UI/Input/SearchInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import BaseCard from '@/components/UI/Card/BaseCard.vue';
import CustomSelectWithCheckboxes from '@/components/UI/Select/CustomSelectWithCheckboxes.vue';
import { useCheckboxStore } from '../stores/checkboxStore'

import { onMounted } from "vue";

const checkboxStore = useCheckboxStore();


const selectedValues = computed(() => checkboxStore.selectedValues);

const styleOptions = [
  { value: "modern", label: "Современный" },
  { value: "classic", label: "Классический" },
  { value: "abstract", label: "Абстрактный" },
  { value: "dadizm", label: "Дадизм" },
];

onMounted(() => {
  // Можно установить предустановленные значения
  checkboxStore.selectedValues = ["option2"];
});
</script>
