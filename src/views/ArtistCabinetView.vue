<template>
  <div class="all">
    <div> <!-- Профиль пользователя -->
      <UserProfile :avatarUrl="'../assets/images/ava.png'" :userName="'Александров Александр Александрович'"
                   :role="'Администратор'" :residence="'Санкт-Петербург, Невский проспект, д. 1'"
                   @settings-click="handleSettingsClick" @notifications-click="handleNotificationsClick"/>

      <!-- Меню с кнопками -->

      <UserContacts text="Поиск пользователей" @arrow-click="handleArrowClick('SearchAccount')"/>
      <UserContacts text="Искать ваучер" @arrow-click="handleArrowClick('SearchVoucher')"/>
      <UserContacts text="Просмотреть ваучер" @arrow-click="handleArrowClick('ShowVoucher')"/>


      <UserExit text="выйти" :customMargin="'120px'"/>
    </div>


    <!-- Динамически подгружаемый контент -->
    <div class="content">
      <component v-if="activeSectionComponent" :is="activeSectionComponent"/>
      <img v-else src="../assets/images/home.png" alt="Home" class="default-image"/>
    </div>
  </div>
</template>


<script setup>
import {ref, computed, defineAsyncComponent} from 'vue';
import UserContacts from '@/components/MenuLeft/UserContacts.vue';
import UserProfile from '@/components/MenuLeft/UserProfile.vue';
import UserExit from '@/components/MenuLeft/UserExit.vue';

// Реактивное состояние для текущей секции
const activeSection = ref(''); // По умолчанию ничего не выбрано
// const myImg ="src/assets/home.png"
// Обработчики кликов
const handleSettingsClick = () => {
  window.console.log('Открыть настройки пользователя');
};

const handleNotificationsClick = () => {
  window.console.log('Показать уведомления');
};

const handleArrowClick = (section) => {
  activeSection.value = section; // Устанавливаем активную секцию
  window.console.log(`Клик по стрелке: ${section}`);
};


// Динамически подгружаемые компоненты (через асинхронный импорт)
const activeSectionComponent = computed(() => {
  if (activeSection.value === 'SearchAccount') {
    return defineAsyncComponent(() => import('@/components/Artist/SearchAccount.vue'));
  } else if (activeSection.value === 'SearchVoucher') {
    return defineAsyncComponent(() => import('@/views/SearchVoucherView.vue'));
  } else if (activeSection.value === 'ShowVoucher') {
    return defineAsyncComponent(() => import('@/views/ShowVoucherArtistView.vue'));
  } else {
    return null;
  }
});
</script>

<style>
.all {
  display: flex;
  gap: 20px;
}

</style>
