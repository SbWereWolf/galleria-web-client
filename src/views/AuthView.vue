<template>
  <div class="auth-view">
    <div>
      <BaseH1 size="large" :customStyles="{ textAlign: 'center', paddingBottom: '60px' }">Авторизация</BaseH1>
      <form @submit.prevent="handleLogin">
        <BaseInput v-model="name" label="Логин" placeholder="Введите ваш логин" id="text" type="text" />
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
import { ref, onMounted, watch } from 'vue';
import BaseInput from '@/components/UI/Input/BaseInput.vue';
import PasswordInput from '@/components/UI/Input/PasswordInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseLink from '@/components/UI/Linlk/BaseLink.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const name = ref('');
const password = ref('');
const loginError = ref(false);
const isLoading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

// Проверка токена и восстановление сессии при монтировании компонента
onMounted(() => {
  authStore.initializeAuth(); // Инициализация аутентификации
});

// Следим за состоянием аутентификации и редиректим, если пользователь уже авторизован
watch(() => authStore.isAuthenticated, (newValue) => {
  if (newValue) {
    // Перенаправляем пользователя в зависимости от его роли
    router.push(authStore.user.role === 'artist' ? '/art' : '/cabinet');
  }
});

// Обработчик отправки формы
const handleLogin = async () => {
  loginError.value = false;
  if (!name.value || !password.value) {
    loginError.value = true;
    return;
  }

  isLoading.value = true;

  try {
    const loginData = new URLSearchParams();
    loginData.append('username', name.value);
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
      authStore.login(data.access_token);  // Сохраняем токен и данные в store
      await authStore.fetchUserData();  // Получаем дополнительные данные пользователя, если нужно

      // Перенаправляем пользователя в зависимости от роли
      router.push(authStore.user.role === 'artist' ? '/art' : '/cabinet');
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
