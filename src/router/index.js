import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from '../stores/auth';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CustomerCabinet from '@/views/CustomerCabinetView.vue';
import ArtistCabinetView from '@/views/ArtistCabinetView.vue';

const routes = [
  {path: '/', component: HomeView},
  {path: '/cabinet', component: CustomerCabinet},
  {path: '/artist', component: ArtistCabinetView},
  {
    path: '/login',
    name: 'Login',
    component: LoginView,  // Страница авторизации
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,  // Страница регистрации
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Защита маршрутов для авторизованных пользователей
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Если пользователь не авторизован и пытается зайти на /login или /register, разрешаем переход
  if (!authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    next();
  } else if (authStore.isAuthenticated) {
    // Если пользователь авторизован, проверяем его роль
    if (to.path === '/login' || to.path === '/register') {
      // Если он уже авторизован и пытается перейти на /login или /register, редиректим его
      if (authStore.user.role === 'artist') {
        next('/artist'); // Кабинет художника
      } else {
        next('/cabinet'); // Кабинет клиента
      }
    } else {
      // Если роль художник, перенаправляем на /art, если обычный пользователь, то на /cabinet
      if (authStore.user.role === 'artist' && to.path !== '/artist') {
        next('/artist');
      } else if (authStore.user.role !== 'artist' && to.path !== '/cabinet') {
        next('/cabinet');
      } else {
        next(); // Разрешаем переход на другие страницы
      }
    }
  } else {
    // Если пользователь не авторизован и пытается перейти на защищенную страницу
    if (to.path === '/cabinet' || to.path === '/artist') {
      next('/login'); // Перенаправляем на страницу логина
    } else {
      next(); // Разрешаем переход на другие страницы
    }
  }
});

export default router;
