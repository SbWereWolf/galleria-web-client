<script setup>
import {defineProps} from 'vue';
import BaseButton from '../Button/BaseButton.vue';

defineProps({
  avatar: String,
  name: String,
  login: String,
  id: String,
  style: String,
  addres: String,
  role: String,
});


</script>


<template>
  <div class="main-container1">
    <div class="group">
      <div class="wrapper">
        <!-- Используем аватарку из пропсов -->
        <div
          class="img"
          :style="{ backgroundImage: `url(${avatar})` }"
        ></div>
      </div>
      <span class="text">{{ name }}</span>
    </div>
    <div class="section">
      <div class="wrapper-2">
        <span class="text-2">Логин:</span><span class="text-3">{{ login }}</span>
      </div>
      <div class="wrapper-3">
        <span class="id">ID:</span><span class="text-5">{{ id }}</span>
      </div>
      <div class="frame" v-if="role !== 'visitor'">
        <span class="style">Стиль:</span>
        <span class="abstractionism">{{ style }}</span>

      </div>
      <div class="frame" v-if="role == 'visitor'">
        <span class="style">Адресс:</span>
        <span class="abstractionism">{{ addres }}</span>

      </div>
    </div>
    <BaseButton size="large" variant="primary60">Посмотреть контакты</BaseButton>
  </div>
</template>

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

.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 25px;
  position: relative;
  width: 226px;
}

.wrapper {
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
  min-width: 0;
  height: 226px;
  z-index: 1;
}

.img {
  position: absolute;
  width: 226px;
  height: 226px;
  top: 0;
  left: 50%;
  background: url(../../../assets/images/ava.png) no-repeat center;
  background-size: cover;
  transform: translate(-50%, 0);
  z-index: 2;
  border-radius: 50%;
}

.text {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 28px;
  color: #281101;
  font-family: Roboto Condensed, var(--default-font-family);
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: -0.48px;
  z-index: 3;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 18px;
  position: relative;
  min-width: 0;
  z-index: 4;
}

.wrapper-2 {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 20px;
  position: relative;
  width: 186px;
  z-index: 5;
}

.text-2 {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 23px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  text-align: left;
  white-space: nowrap;
  z-index: 6;
}

.text-3 {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 23px;
  color: #1b4e36;
  font-family: Roboto, var(--default-font-family);
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  white-space: nowrap;
  z-index: 7;
}

.wrapper-3 {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 20px;
  position: relative;
  width: 135px;
  z-index: 8;
}

.id {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 23px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}

.text-5 {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 23px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  white-space: nowrap;
  z-index: 10;
}

.frame {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 20px;
  position: relative;
  width: 244px;
  z-index: 11;
}

.style {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 23px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}

.abstractionism {
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 23px;
  color: #281101;
  font-family: Roboto, var(--default-font-family);
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  white-space: nowrap;
  z-index: 13;
}

.text-8 {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  width: 171px;
  height: 19px;
  color: #fff8ed;
  font-family: Roboto, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 18.75px;
  text-align: center;
  white-space: nowrap;
  z-index: 15;
}
</style>
