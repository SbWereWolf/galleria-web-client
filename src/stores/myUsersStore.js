import {defineStore} from 'pinia';

export const useMyUserStore = defineStore('userStore', {
  state: () => ({
    token: localStorage.getItem('jwtToken') || null,
    role: null, // Храним роль здесь
    user: null, // Данные пользователя
    id: null,
  }),
  actions: {
    setRole(role) {
      this.role = role;
    },
    setUser(user) {
      this.user = user;
    },
    setUserId(user_id) {
      this.user_id = user_id;
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('jwtToken', token);
    },
    clearUser() {
      this.token = null;
      this.role = null;
      this.user = null;
      this.user_id = null;
      localStorage.removeItem('jwtToken');
    }
  }
});
