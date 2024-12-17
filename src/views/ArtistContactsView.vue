<template>
  <BaseH1 size="large" :customStyles="{ paddingBottom: '60px', textAlign:'center' }">Выберите художника</BaseH1>
  <div class="centerCart">
    <BaseP size="large">Найти по логину</BaseP>
    <SearchInput/>
    <BaseButton size="large" variant="primary60">Найти</BaseButton>
  </div>


  <BaseCard/>

</template>
<script setup>
import SearchInput from '@/components/UI/Input/SearchInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import BaseCard from '@/components/UI/Card/BaseCard.vue';
</script>
