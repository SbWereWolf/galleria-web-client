<template>
  <BaseH1 size="large" :customStyles="{ paddingBottom: '60px', textAlign:'center' }">Отозвать предзаказ</BaseH1>
  <div class="card_zakaz">
    <ZakazCard :artwork="artworkData"/>
    <BaseButton size="medium">Отозвать предзаказ</BaseButton>
  </div>


</template>
<script setup>
import {ref} from 'vue';
import ZakazCard from '@/components/UI/Card/ZakazCard.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';

const artworkData = ref({});
import BaseButton from '@/components/UI/Button/BaseButton.vue';

// onMounted(async () => {
//   const response = await fetch('/api/artwork/55468255');
//   artworkData.value = await response.json();
// });
</script>
