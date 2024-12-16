<script setup>
import { ref, onMounted } from 'vue';
import SearchInput from '@/components/UI/Input/SearchInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import BaseCard from '@/components/UI/Card/BaseCard.vue'; // Подключение BaseCard

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const searchQuery = ref('');
const user = ref(null);
const role = ref(null); // Добавлено для отслеживания роли
const userNotFound = ref(false);
const isButtonDisabled = ref(false);
const styles = ref([]); // Массив для хранения стилей артиста

const findUser = async () => {
  if (isButtonDisabled.value) return;

  isButtonDisabled.value = true;

  if (!authStore.isAuthenticated) {
    alert('Вы не авторизованы!');
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:8001/users/${searchQuery.value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }

    const result = await response.json();
    console.log('result', result);
    role.value = result.role || 'guest'; // Устанавливаем значение роли

      if (role.value === 'artist') {
      await loadArtistStyles(result.username);
      console.log('result loadArtistStyles', result.username)
    }
    if (result && Object.keys(result).length) {
      console.log('Role:', role.value);
      console.log('Updating user with:', {
        ...result,
        style: role.value === 'artist' && styles.value.length > 0 ? styles.value.join(', ') : null,
        adres: role.value === 'visitor' ? result.adres : null,
      });
      console.log('result Object.keys(result).length', result)
      user.value = {
        ...result,
        style: role.value === 'artist' && styles.value.length > 0 ? styles.value.join(', ') : null,
        adres: role.value === 'visitor' ? result.adres : null,
      };


      console.log('user style:', user.value.style);
      console.log('user adres:', user.value.adres);

      userNotFound.value = false;



    } else {
      user.value = null;
      role.value = null; // Сбрасываем роль, если пользователь не найден
      userNotFound.value = true;
    }
  } catch (error) {
    console.error('Ошибка:', error);
    user.value = null;
    role.value = null;
    userNotFound.value = true;
  } finally {
    isButtonDisabled.value = false;
  }
};

const loadArtistStyles = async (username) => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Токен отсутствует');
      return;
    }

    const response = await fetch(`http://127.0.0.1:8001/users/${username}/styles/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('styles загружены:', data);
    if (Array.isArray(data.styles)) {
      styles.value = [...data.styles];
    } else {
      styles.value = [];
    }

    console.log('styles после записи:', styles.value);
  } catch (error) {
    console.error('Ошибка загрузки стилей артиста:', error);
    styles.value = [];
  }
};


onMounted(async () => {
  if (!authStore.isAuthenticated) {
    await authStore.initializeAuth();
  }
});
</script>

<template>
  <BaseH1 size="large" :customStyles="{ paddingBottom: '60px', textAlign: 'center' }">
    Найдите посетителя
  </BaseH1>
  <div class="centerCart">
    <BaseP size="large">Найти по логину</BaseP>
    <SearchInput v-model="searchQuery" />
    <BaseButton size="large" variant="primary60" @click="findUser" :disabled="isButtonDisabled">
      Найти
    </BaseButton>
  </div>


  <div v-if="user">
    <BaseCard :avatar="user.avatar_url" :name="user.username" :login="user.username" :id="user.id" :style="user.style"
      :addres="user.adres" :role="user.role" />
  </div>

  <div v-else-if="userNotFound" class="error-message">
    Пользователь не найден.
  </div>
</template>


<style scoped>
.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>
