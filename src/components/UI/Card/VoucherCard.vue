<template>
  <div class="main-container1">
    <span class="id">ID: {{ artwork.id }}</span>
    <div class="frame-1">
      <div class="frame-2">
        <span class="description">Описание:</span>
        <span class="winter-landscape">{{ artwork.description }}</span>
      </div>
      <div class="frame-3">
        <span class="style">Стиль:</span>
        <span class="realism">{{ artwork.style }}</span>
      </div>
      <div class="frame-4">
        <span class="text-6">Кол-во:</span>
        <span class="text-7">{{ artwork.amount_pictures }}</span>
      </div>
      <div class="section-2">
        <span class="text-8">Цена:</span>
        <span class="text-9">{{ artwork.price }} ₽</span>
      </div>
      <div class="frame-3">
        <span class="style">Заказчик:</span>
        <span class="realism">{{ artwork.customer }}</span>
      </div>
      <div class="frame-3">
        <span class="style">Исполнитель:</span>
        <span class="realism">{{ artwork.executor }}</span>
      </div>
      <div class="frame-3">
        <span class="style">Состояние:</span>
        <span class="realism">{{ artwork.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

// Пропсы для получения данных о произведении искусства
defineProps({
  artwork: {
    type: Object,
    required: true,
  },
});
</script>


<style scoped>
.main-container1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: 40px;
  position: relative;
  width: 804px;
  margin: 0 auto;
  padding: 25px 40px 25px 40px;
  border: 1px solid #cecbc7;
  border-radius: 20px;
}
.id {
  align-self: stretch;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  min-width: 0;
  height: 19px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
}

.frame-1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 10px;
  position: relative;
  min-width: 0;
  z-index: 1;
}

.frame-2 {
  display: flex;
  align-items: center;
  align-self: stretch;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 15px;
  position: relative;
  z-index: 2;
}

.description {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 19px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 3;
}

.winter-landscape {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 19px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 4;
}

.frame-3 {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 15px;
  position: relative;
  width: 132px;
  z-index: 5;
}

.style {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 19px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 6;
}

.realism {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 19px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 7;
}

.frame-4 {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 15px;
  position: relative;
  width: 82px;
  z-index: 8;
}

.text-6 {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 19px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}

.text-7 {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 19px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 10;
}

.section-2 {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 15px;
  position: relative;
  width: 122px;
  z-index: 11;
}

.text-8 {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 19px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}

.text-9 {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 19px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 13;
}

.frame-5 {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 15px;
  position: relative;
  width: 192px;
  z-index: 14;
}

.customer {
  flex-shrink: 0;
  position: relative;
  width: 76px;
  height: 19px;
  cursor: pointer;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 18.75px;
  white-space: nowrap;
  background: transparent;
  border: none;
  z-index: 15;
}

.ivanov {
  flex-shrink: 0;
  position: relative;
  width: 101px;
  height: 19px;
  cursor: pointer;
  color: #1b4e36;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
  white-space: nowrap;
  background: transparent;
  border: none;
  z-index: 16;
}
</style>
