<template>
  <BaseH1 size="large" :customStyles="{ paddingBottom: '60px', textAlign:'center' }">Выберите художника</BaseH1>
  <div class="centerCart">
     <BaseP size="large">Количество картин</BaseP>
  <BaseInput :customStyles="{ paddingBottom: '30px' }" />
  <BaseP size="large">Стиль</BaseP>
  <BaseInput />
  <BaseP size="large">цена</BaseP>
  <BaseInput :customStyles="{ paddingBottom: '30px' }"/>
  <BaseP size="large">цена</BaseP>
  <TextArea placeholder="Введите текст здесь..." />
  <BaseButton size="large" variant="primary60">Создать предзаказ</BaseButton>
  </div>




</template>
<script setup>
import BaseInput from '@/components/UI/Input/BaseInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';

import TextArea from '@/components/UI/TextArea/TextArea.vue';
</script>
