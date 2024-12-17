<template>
  <div class="all">
    <div> <!-- Профиль пользователя -->
      <UserProfile :avatarUrl="'../assets/images/ava.png'" :userName="'Александров Александр Александрович'"
        :role="'Администратор'" :residence="'Санкт-Петербург, Невский проспект, д. 1'"
        @settings-click="handleSettingsClick" @notifications-click="handleNotificationsClick" />

      <!-- Меню с кнопками -->

      <UserContacts text="Посмотреть контакты конкретного посетителя" @arrow-click="handleArrowClick('artistContact')" />
      <UserContacts text="Посмотреть художников" @arrow-click="handleArrowClick('artists')" />
      <UserContacts text="Посмотреть предзаказы" @arrow-click="handleArrowClick('orders')" />
      <UserContacts text="Посмотреть конкретный предзаказ" @arrow-click="handleArrowClick('specificOrder')" />
      <UserContacts text="Изменить статус предзаказа" @arrow-click="handleArrowClick('createOrder')" />


      <UserExit text="выйти" :customMargin="'120px'" @arrow-click="handleArrowClick('revokeOrder')" />
    </div>


    <!-- Динамически подгружаемый контент -->
    <div class="content">
      <component v-if="activeSectionComponent" :is="activeSectionComponent" />
      <img v-else src="../assets/images/home.png" alt="Home" class="default-image" />
    </div>
    <!-- Динамически подгружаемый контент -->
    <!-- <div class="content">
      <div v-if="activeSection === 'artistContact'">Контакты конкретного художника</div>
      <div v-if="activeSection === 'artists'">Список художников</div>
      <div v-if="activeSection === 'orders'">Список предзаказов</div>
      <div v-if="activeSection === 'specificOrder'">Детали конкретного предзаказа</div>
      <div v-if="activeSection === 'createOrder'">Форма для создания предзаказа</div>
      <div v-if="activeSection === 'revokeOrder'">Форма для отзыва предзаказа</div>
      <div v-else>
        <img :src="activeSection === '' ? 'src/assets/home.png' : ''" />


      </div>
    </div>-->
  </div>
</template>


<script setup>
import { ref , computed, defineAsyncComponent } from 'vue';
import UserContacts from '@/components/MenuLeft/UserContacts.vue';
import UserProfile from '@/components/MenuLeft/UserProfile.vue';
import UserExit from '@/components/MenuLeft/UserExit.vue';

// Реактивное состояние для текущей секции
const activeSection = ref(''); // По умолчанию ничего не выбрано
// const myImg ="src/assets/home.png"
// Обработчики кликов
const handleSettingsClick = () => {
  console.log('Открыть настройки пользователя');
};

const handleNotificationsClick = () => {
  console.log('Показать уведомления');
};

const handleArrowClick = (section) => {
  activeSection.value = section; // Устанавливаем активную секцию
  console.log(`Клик по стрелке: ${section}`);
};


// Динамически подгружаемые компоненты (через асинхронный импорт)
const activeSectionComponent = computed(() => {
  if (activeSection.value === 'artistContact') {
    return defineAsyncComponent(() => import('@/components/Artist/SearchCustomers.vue'));
  } else if (activeSection.value === 'artists') {
    return defineAsyncComponent(() => import('@/components/Artist/LookArtist.vue'));
  } else if (activeSection.value === 'orders') {
    return defineAsyncComponent(() => import('@/views/LookArtistPredzakazView.vue'));
  } else if (activeSection.value === 'specificOrder') {
    return defineAsyncComponent(() => import('@/views/ArtistConcretPredzakazView.vue'));

  } else if (activeSection.value === 'revokeOrder') {
    return defineAsyncComponent(() => import('@/views/OtozvatArtistPredzakazView.vue'));
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
