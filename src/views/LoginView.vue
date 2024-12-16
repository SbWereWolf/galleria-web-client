<template>
  <div class="auth-view">
    <div>
      <BaseH1 size="large" :customStyles="{ textAlign: 'center', paddingBottom: '60px' }">Авторизация</BaseH1>
      <form @submit.prevent="handleLogin">
        <BaseInput v-model="name1" label="Логин" placeholder="Введите ваш логин" id="name" type="text" />

        <PasswordInput label="Пароль" v-model="password" placeholder="Введите ваш пароль" id="password" />
        <div class="button-reg">
          <BaseButton variant="primary" size="large" :disabled="isLoading">
            Войти
          </BaseButton>
          <BaseP size="medium_green" :customStyles="{ textAlign: 'right', padding: '10px 0' }">Забыли пароль</BaseP>
        </div>
      </form>
      <div style="display: flex; align-items: center; column-gap: 5px; justify-content: center;">
        <BaseP size="medium" :customStyles="{ textAlign: 'right', padding: '10px 0' }">Нет аккаунта? </BaseP>
        <BaseLink to="/register">Создать</BaseLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '@/components/UI/Input/BaseInput.vue';
import PasswordInput from '@/components/UI/Input/PasswordInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseLink from '@/components/UI/Linlk/BaseLink.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const name1 = ref('');
const password = ref('');
const loginError = ref(false);
const isLoading = ref(false);

const router = useRouter(); // Инициализация useRouter
const authStore = useAuthStore();

const handleLogin = async () => {
  loginError.value = false;
  if (!name1.value || !password.value) {
    loginError.value = true;
    return;
  }

  isLoading.value = true;

  try {
    const loginData = new URLSearchParams();
    loginData.append('username', name1.value);  // Используем email как логин
    loginData.append('password', password.value);

    const response = await fetch('http://127.0.0.1:8001/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // Указываем правильный тип контента
      },
      body: loginData.toString(),  // Отправляем сериализованные данные
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('jwtToken', data.access_token); // Сохраняем токен в localStorage

      // Теперь нам нужно получить информацию о пользователе
      const userResponse = await fetch('http://127.0.0.1:8001/users/me/', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();

        // Сохраняем данные пользователя в store
        authStore.user = userData;
        authStore.isAuthenticated = true;

        // В зависимости от роли, редиректим на нужную страницу
        if (authStore.user.role === 'artist') {
          router.push('/art'); // Кабинет художника
        } else {
          router.push('/cabinet'); // Кабинет клиента
        }
      } else {
        loginError.value = true;
        console.error('Ошибка при получении данных пользователя');
      }
    } else {
      loginError.value = true;
      console.error('Ошибка авторизации');
    }
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    loginError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Добавьте стили, если необходимо */
</style>
