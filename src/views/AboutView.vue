<template>
  <div>
    <h1>Добро пожаловать, {{ authStore.user?.name }}</h1>
    <button @click="authStore.logout">Выйти</button>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
};
</script>
