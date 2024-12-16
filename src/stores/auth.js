import { defineStore } from 'pinia';
import jwt_decode from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,        // Данные пользователя
    role: null,        // Роль пользователя
    userId: null,      // ID пользователя
    isAuthenticated: false, // Статус авторизации
  }),

  actions: {
    // Инициализация авторизации при загрузке приложения
    async initializeAuth() {
      const token = localStorage.getItem('jwtToken');
      if (token && this.isTokenValid(token)) {
        this.isAuthenticated = true;
        try {
          await this.fetchUserData(token); // Загрузка данных пользователя
        } catch (error) {
          console.error('Ошибка при инициализации авторизации:', error);
          this.logout();
        }
      } else {
        this.logout(); // Выход, если токен недействителен
      }
    },

    // Проверка действительности токена
    isTokenValid(token) {
      try {
        const decoded = jwt_decode(token);
        console.log(decoded);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime; // Токен валиден, если его срок не истёк

      } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return false;
      }
    },

    // Получение данных пользователя и сохранение роли
    async fetchUserData(token) {
      try {
        const decoded = jwt_decode(token); // Декодируем токен
        this.role = decoded.role || null; // Сохраняем роль из токена
        this.userId = decoded.user_id || null;; // Сохраняем user_id из токена
        const response = await fetch('http://127.0.0.1:8001/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.user = data; // Сохраняем данные пользователя
        } else {
          console.error('Ошибка при получении данных пользователя:', response.statusText);
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
        throw error;
      }
    },

    // Логин пользователя
    login(token) {
      localStorage.setItem('jwtToken', token); // Сохранить токен в localStorage
      this.isAuthenticated = true;
      this.fetchUserData(token).catch((error) => {
        console.error('Ошибка при входе пользователя:', error);
        this.logout();
      });
    },

    // Логаут пользователя
    logout() {
      localStorage.removeItem('jwtToken');
      this.isAuthenticated = false;
      this.user = null;
      this.role = null;
      this.userId = null; // Очищаем userId при выходе
    },
  },
});
