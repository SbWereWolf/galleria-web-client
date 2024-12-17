<template>
  <div class="auth-view">
    <div>
      <BaseH1 size="large" :customStyles="{ textAlign: 'center', paddingBottom: '60px' }">Авторизация</BaseH1>
      <form @submit.prevent="handleLogin">
        <BaseInput v-model="login" label="Логин" placeholder="Введите ваш логин" id="name" type="text"/>

        <PasswordInput label="Пароль" v-model="password" placeholder="Введите ваш пароль" id="password"/>
        <div class="button-reg">
          <BaseButton variant="primary" size="large" :disabled="isLoading">
            Войти
          </BaseButton>
          <BaseP size="medium_green" :customStyles="{ textAlign: 'right', padding: '10px 0' }">Забыли пароль</BaseP>
        </div>
      </form>
      <div style="display: flex; align-items: center; column-gap: 5px; justify-content: center;">
        <BaseP size="medium" :customStyles="{ textAlign: 'right', padding: '10px 0' }">Нет аккаунта?</BaseP>
        <BaseLink to="/register">Создать</BaseLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import BaseInput from '@/components/UI/Input/BaseInput.vue';
import PasswordInput from '@/components/UI/Input/PasswordInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseLink from '@/components/UI/Linlk/BaseLink.vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth';

const login = ref('');
const password = ref('');
const loginError = ref(false);
const isLoading = ref(false);

const router = useRouter(); // Инициализация useRouter
const authStore = useAuthStore();

const handleLogin = async () => {
  loginError.value = false;

  if (!login.value || !password.value) {
    loginError.value = true;
    return;
  }

  let response = {};
  isLoading.value = true;
  try {
    const loginData = {
      login: login.value,
      password: password.value
    };
    response = await fetch(
      import.meta.env.VITE_API_SERVER + '/Accounts/log_in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    loginError.value = true;
  } finally {
    isLoading.value = false;
  }

  if (!response.ok) {
    loginError.value = true;
    console.error('Ошибка авторизации');
  }

  let userResponse = {}
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('jwtToken', data.session_id);

    isLoading.value = true;
    try {
      // Теперь нам нужно получить информацию о пользователе
      userResponse = await fetch(
        import.meta.env.VITE_API_SERVER + '/Accounts/me/'
        , {
          headers: {
            'Authorization': `Bearer ${data.session_id}`,
          },
        });
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      loginError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  if (!userResponse.ok) {
    loginError.value = true;
    console.error('Ошибка при получении данных пользователя');
  }

  if (userResponse.ok) {

    console.debug('userResponse.ok -  obtain userData');

    const userData = await userResponse.json();

    // Сохраняем данные пользователя в store
    authStore.user = userData;
    authStore.isAuthenticated = true;

    // В зависимости от роли, редиректим на нужную страницу
    if (authStore.user.role === 'artist') {
      console.debug('редиректим на нужную страницу Кабинет художника');
      router.push('/artist'); // Кабинет художника
    }

    if (authStore.user.role !== 'artist') {
      console.debug('редиректим на нужную страницу Кабинет клиента');
      router.push('/cabinet'); // Кабинет клиента
    }
  }
};
</script>

<style scoped>
/* Добавьте стили, если необходимо */
</style>
