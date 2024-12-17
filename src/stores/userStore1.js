import {defineStore} from 'pinia';

export const useUserStore1 = defineStore('user', {
  state: () => ({
    userId: null, // Начальное значение id пользователя
    userName: '',
    role: '',
    // другие поля по необходимости
  }),
  actions: {
    setUserId(id) {
      this.userId = id;
    },
    // Добавьте другие методы для обновления данных пользователя
  },
});
