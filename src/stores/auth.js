import {defineStore} from 'pinia';
import jwt_decode from 'jwt-decode';

export const useAuthStore =
  defineStore('auth', {
    state: () => ({
      user: null,        // Данные пользователя
      role: null,        // Роль пользователя
      userId: null,      // ID пользователя
      isAuthenticated: false, // Статус авторизации
    }),

    actions: {
      // Инициализация авторизации при загрузке приложения
      async initializeAuth() {
        const token = window.localStorage.getItem('jwtToken');
        if (token && this.isTokenValid(token)) {
          this.isAuthenticated = true;
          try {
            // Загрузка данных пользователя
            await this.fetchUserData(token);
          } catch (error) {
            window.console.error('Ошибка при инициализации авторизации:', error);
            this.logout();
          }
        } else {
          // Выход, если токен недействителен
          this.logout();
        }
      },

      // Проверка действительности токена
      isTokenValid(token) {
        try {
          const decoded = jwt_decode(token);
          window.console.log(decoded);
          const currentTime = Date.now() / 1000;
          // Токен валиден, если его срок не истёк
          return decoded.exp > currentTime;

        } catch (error) {
          window.console.error('Ошибка декодирования токена:', error);
          return false;
        }
      },

      // Получение данных пользователя и сохранение роли
      async fetchUserData(token) {
        let response = {};
        try {
          const decoded = jwt_decode(token); // Декодируем токен
          this.role = decoded.role || null; // Сохраняем роль из токена
          this.userId = decoded.user_id || null;

          response = await window.fetch(
            import.meta.env.VITE_API_SERVER + '/Accounts/me/', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

          if (response.ok) {
            const data = await response.json();
            this.user = data; // Сохраняем данные пользователя
          }
        } catch (error) {
          window.console.error(
            'Ошибка при загрузке данных пользователя:',
            error
          );
        }
        if (!response.ok) {
          window.console.error(
            'Ошибка при получении данных пользователя:',
            response.statusText
          );
        }
      },

      // Логин пользователя
      login(token) {
        // Сохранить токен в localStorage
        window.localStorage.setItem('jwtToken', token);
        this.isAuthenticated = true;
        this.fetchUserData(token).catch((error) => {
          window.console.error('Ошибка при входе пользователя:', error);
          this.logout();
        });
      },

      // Логаут пользователя
      logout() {
        window.localStorage.removeItem('jwtToken');
        this.isAuthenticated = false;
        this.user = null;
        this.role = null;
        this.userId = null; // Очищаем userId при выходе
      },
    },
  });
