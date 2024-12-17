<template>
  <BaseH1 size="large" :customStyles="{ paddingBottom: '60px', textAlign:'center' }">Посмотреть предзаказ</BaseH1>
  <div class="centerCart">
    <BaseP size="large">id предзаказа</BaseP>
    <SearchInput/>
    <BaseButton size="large" variant="primary60">Найти</BaseButton>
  </div>


  <div class="card_zakaz">
    <ZakazCard :artwork="artworkData"/>
    <BaseButton size="small">Отозвать предзаказ</BaseButton>
  </div>
</template>
<script setup>
import SearchInput from '@/components/UI/Input/SearchInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import ZakazCard from '@/components/UI/Card/ZakazCard.vue';
import {ref} from 'vue';

const artworkData = ref({});
</script>
