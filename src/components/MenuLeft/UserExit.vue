<template>
  <div class="frame" :style="{ paddingTop: customMargin }">
    <div class="frame-3" @click="onArrowClick">
      <!-- Текстовый контейнер -->
      <div>
        <img src="/src/assets/images/exit.png" alt="log out">
      </div>
      <div class="text-container">
        <span class="artist-contacts">{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";
import router from "@/router/index.js";

const authStore = useAuthStore();

// Пропсы
defineProps({
  text: {
    type: String,
    default: 'Log out', // Текст по умолчанию
  },
  customMargin: {
    type: String,
    default: '0', // По умолчанию без отступа
  }
});

// Эмиссия событий
const emit = defineEmits(['arrow-click']);

// Обработчик клика по стрелке
const onArrowClick = () => {
  emit('arrow-click'); // Генерация события

  const token = window.localStorage.getItem('jwtToken');
  if (!token) {
    console.error('Токен отсутствует');
    return;
  }

  axios.delete(
      `/Accounts/log_out`, {
        baseURL: import.meta.env.VITE_API_SERVER,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  .catch(function (error) {
    console.log(error);
  });

  authStore.logout();
  window.alert('Сессия работы с личным кабинетом завершена.')
  router.push({ path: '/' })


};
</script>

<style scoped>
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: nowrap;
  position: relative;
  width: 548px;
  margin: 0px 0 0 40px;
}

.frame-3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  flex-wrap: nowrap;
  flex-shrink: 0;
  position: relative;
  min-width: 0;
  padding: 20px 5px 20px 5px;
  border-bottom: 1px solid #cecbc7;
  z-index: 1;
}

.frame:hover {
  cursor: pointer;
}

.text-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 5px;
  position: relative;
  width: 440px;
  z-index: 2;
}

.artist-contacts {
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
  z-index: 3;
}

.right-arrow {
  flex-shrink: 0;
  position: relative;
  width: 40px;
  height: 40px;
  z-index: 4;
  cursor: pointer;
}

.vector-4 {
  position: relative;
  width: 10px;
  height: 18px;
  margin: 11px 0 0 15px;
  background: url(../../assets/images/arrow_right.png) no-repeat center;
  background-size: cover;
  z-index: 5;
}
</style>
