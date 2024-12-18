<template>
  <div class="main-container">
    <!-- Информация о пользователе -->
    <div class="user-container">
      <div class="user-photo">
        <!-- <div class="ellipse" :style="{ backgroundImage: `url(${avatarUrl})` }"></div> -->
        <img class="ellipse" :src="avatarUrl" alt="Фото пользователя"/>

      </div>
      <div class="description">
        <!-- Имя пользователя -->
        <div>
          <span class="ivanov-ivan-ivanovich">{{ userName }}</span>
        </div>
        <div class="role">
          <span class="role-1">Роль:</span>
          <span class="user">{{ role }}</span>
        </div>
        <div v-if="role === 'artist'" class="role-2">
          <span class="residence">Стили:</span>
          <span v-for="(style, index) in styles" :key="index" class="address">
            {{ style.join(', ') }}
          </span>
        </div>
        <div v-if="role === 'visitor'" class="role-2">
          <span class="residence">Резиденция:</span>
          <span class="address">{{ residence }}</span>
        </div>
      </div>
    </div>
    <!-- Иконки -->
    <div class="icon-container">
      <!-- Кликабельная шестеренка -->
      <div class="settings" @click="openModal">
        <div class="vector"></div>
      </div>
      <!-- Кликабельный колокол -->
      <div class="notifications" @click="onNotificationsClick">
        <div class="vector-3"></div>
      </div>
    </div>
  </div>


  <!-- Модальное окно из Bootstrap -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Настройки</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="modal_block1">
            <div>

              <div>
                <img :src="avatarUrl" alt="Фото пользователя" width="212" height="212" style="border-radius: 50%;"/>
                <!-- <img src="../../assets/images/ava.png"  alt=""> -->
              </div>
              <div class="modal_block1__link">
                <BaseLink color="red">Удалить</BaseLink>
                <BaseLink color="black">Заменить</BaseLink>
              </div>

            </div>
            <div>
              <BaseH1>Изменить пароль</BaseH1>

              <BaseP>Новый пароль</BaseP>
              <PasswordInput v-model="userData.password" @input="checkPasswords"/>
              <BaseP>Подтвердить пароль</BaseP>
              <PasswordInput v-model="userData.confirmPassword" @input="checkPasswords"/>
              <div v-if="passwordsDontMatch" class="error-message">
                Пароли не совпадают.
              </div>
            </div>

          </div>

          <div class="modal_block2">

            <div>
              <BaseP>Фамилия</BaseP>
              <BaseInput v-model="userData.last_name" :value="userData.last_name"/>
              <BaseP>Имя</BaseP>
              <BaseInput v-model="userData.first_name" :value="userData.first_name"></BaseInput>

              <BaseP>Отчество</BaseP>
              <BaseInput v-model:value="userData.middle_name"></BaseInput>

              <BaseP>Телефон</BaseP>
              <BaseInput v-model:value="userData.phone_number"></BaseInput>


            </div>

            <div>
              <div v-if="role === 'artist'">
                <BaseP>Стили:</BaseP>
                <!-- Передаем доступные стили и выбранные значения в компонент -->
                <CustomSelectWithCheckboxes :options="styleOptions" v-model="selectedValues.style"/>
              </div>
              <div v-if="role === 'visitor'">
                <BaseP>Резиденция</BaseP>
                <BaseInput v-model:value="userData.residence"></BaseInput>
              </div>


              <BaseP>Логин</BaseP>
              <BaseInput v-model:value="userData.username"></BaseInput>

              <BaseP>Почта</BaseP>
              <BaseInput v-model:value="userData.email"></BaseInput>


            </div>
          </div>

        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button> -->
          <BaseButton @click="saveSettings">Сохранить изменения</BaseButton>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {defineEmits, ref, watch} from 'vue';


import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем стили
import {Modal} from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PasswordInput from '../UI/Input/PasswordInput.vue';
import BaseInput from '../UI/Input/BaseInput.vue';
import BaseP from '../UI/P/BaseP.vue';
import BaseLink from '../UI/Linlk/BaseLink.vue';

import {onMounted} from 'vue';
import BaseButton from '../UI/Button/BaseButton.vue';
import BaseH1 from '../UI/H/BaseH1.vue';
import axios from 'axios';
import {useAuthStore} from '@/stores/auth';
import CustomSelectWithCheckboxes from '@/components/UI/Select/CustomSelectWithCheckboxes.vue';

const authStore = useAuthStore();
const emit = defineEmits(['settings-click', 'notifications-click']);

const userData = ref({
  last_name: '',
  first_name: '',
  middle_name: '',
  phone_number: '',
  residence: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

import {useUserStore1} from '@/stores/userStore1'; // Импортируем хранилище Pinia
const userStore1 = useUserStore1(); // Используем хранилище

const passwordError = ref(false);

const onNotificationsClick = () => {
  emit('notifications-click');
};


// Ссылка на модальное окно
const modalRef = ref(null);

// Открытие модального окна
const openModal = () => {
  const modalElement = document.getElementById('exampleModal');
  const modal = new Modal(modalElement); // Инициализация Bootstrap Modal
  modal.show(); // Показываем модальное окно
};

const checkPasswords = () => {
  passwordError.value = userData.value.password !== userData.value.confirmPassword;
};

// Function to check if passwords match
const checkPasswordsMatch = () => {
  passwordError.value = userData.value.password !== userData.value.confirmPassword;
};

watch([() => userData.value.password, () => userData.value.confirmPassword], checkPasswordsMatch);


const saveSettings = async () => {
  if (passwordError.value) {
    console.log('Пароли не совпадают');
    return;
  }

  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Токен отсутствует');
      return;
    }

    // Подготовка данных для отправки в запросе
    const updatedUserData = {
      last_name: userData.value.last_name,
      first_name: userData.value.first_name,
      middle_name: userData.value.middle_name,
      phone_number: userData.value.phone_number,
      residence: userData.value.residence,
      username: userData.value.username,
      email: userData.value.email,
      password: userData.value.password, // только если изменен пароль
    };

    const last=userData.value.last_name;
    const first=userData.value.first_name;

    // Отправка PUT запроса
    await axios.put(`/Accounts?new_first_name=${first}&new_last_name=${last}`
      , updatedUserData
      , {
      baseURL: import.meta.env.VITE_API_SERVER,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Закрыть модальное окно
    const modalElement = document.getElementById('exampleModal');
    const modal = Modal.getInstance(modalElement);
    modal.hide();

    console.log('Настройки сохранены');
  } catch (error) {
    console.error('Ошибка при сохранении настроек:', error);
  }
};


onMounted(() => {
  // Инициализация модального окна при монтировании компонента
  const modalElement = document.getElementById('exampleModal');
  const modal = new Modal(modalElement);
  modalRef.value = modal;
});

// Реактивные переменные
const userName = ref('Иванов Иван Иванович');
const role = ref('Пользователь');
const residence = ref('Москва, ул. Ленина, д. 22, кв. 55');
const avatarUrl = ref('/src/assets/images/ava.png'); // URL изображения по умолчанию
const styles = ref([]); // Массив для хранения стилей артиста


// Загрузка данных пользователя
const loadUserData = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Токен отсутствует');
      return;
    }

    const response = await axios.get('/Accounts/me/about/', {
      baseURL: import.meta.env.VITE_API_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;


    // Сохраняем id пользователя в Pinia
    userStore1.setUserId(user.id);  // Сохраняем id в хранилище Pinia
    console.log('userId сохранен в Pinia:', userStore1.userId);

    // Дополнительные данные, которые можно сохранить
    userStore1.userName = user.username || '';
    userStore1.role = user.role || 'Роль не указана';
    console.log('userData', user)

    userData.value.last_name = user.last_name || '';
    console.log('userData.last_name', userData.value.last_name);
    userData.value.first_name = user.first_name || '';
    userData.value.middle_name = user.middle_name || '';
    userData.value.phone_number = user.phone_number || '';
    userData.value.residence = user.adres || '';
    userData.value.username = user.username || '';
    userData.value.email = user.email || ''

    userName.value = user.middle_name && user.first_name && user.last_name
      ? `${user.middle_name} ${user.first_name} ${user.last_name}`
      : 'Имя не указано';
    role.value = user.role || 'Роль не указана';
    residence.value = user.adres || 'Резиденция не указана';
    avatarUrl.value = user.avatar_url || '/src/assets/images/ava.png';

    // Если пользователь — артист, загружаем стили
    if (role.value === 'artist') {
      await loadArtistStyles(user.username);
    }
  } catch (error) {
    console.error('Ошибка загрузки данных пользователя:', error);
  }
};

// Загрузка стилей артиста
const loadArtistStyles = async (username) => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Токен отсутствует');
      return;
    }

    const response = await axios.get(`/Artists/${username}/styles/`, {
      baseURL: import.meta.env.VITE_API_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('data', response.data)
    styles.value = response.data || [];
    console.log(styles.value)
  } catch (error) {
    console.error('Ошибка загрузки стилей артиста:', error);
  }
};

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    await authStore.initializeAuth();
  }
  await loadUserData();
});
const styleOptions = ref([]);

const selectedValues = ref({
  style: [], // Для хранения выбранных значений
});


// onMounted для загрузки данных
onMounted(async () => {
  const username = authStore.user.username;

  if (!username) {
    console.error('Имя пользователя отсутствует');
    return;
  }

  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Токен отсутствует');
      return;
    }

    // Получение доступных стилей
    const stylesResponse = await axios.get('/Artists/styles/', {
      baseURL: import.meta.env.VITE_API_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (Array.isArray(stylesResponse.data.styles)) {
      styleOptions.value = stylesResponse.data.styles.map(style => ({
        value: style,
        label: style,
        selected: false,
      }));
    } else {
      console.error('Ошибка: данные не содержат массив доступных стилей');
      return;
    }

    // Получение выбранных стилей пользователя
    const selectedResponse = await axios.get(
      `/Artists/${username}/styles/`, {
        baseURL: import.meta.env.VITE_API_SERVER,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    console.log('selectedResponse onMounted', selectedResponse);

    if (selectedResponse.data && Array.isArray(selectedResponse.data.styles)) {
      // Обновляем `selected` для каждого стиля
      selectedResponse.data.styles.forEach(selectedStyle => {
        const styleOption = styleOptions.value.find(
          option => option.value === selectedStyle
        );
        if (styleOption) {
          styleOption.selected = true;
        }
      });

      // Сохраняем выбранные значения для передачи в компонент
      selectedValues.value.style = selectedResponse.data.styles.join(', ');
    } else {
      console.error('Ошибка: данные не содержат массив выбранных стилей', selectedResponse.data);
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
});


</script>

<style scoped>
.ivanov-ivan-ivanovich {
  display: inline-block;
  /* Убедитесь, что span ведет себя как блок */
  max-width: 300px;
  /* Задайте ограничение ширины */
  word-wrap: break-word;
  /* Переносит слова при переполнении */
  word-break: break-word;
  /* Для поддержки старых браузеров */
}

.modal-content {
  width: 902px;
  padding: 0 20px;
}

.modal_block1,
.modal_block2 {

  display: flex;
  justify-content: space-between;
  column-gap: 15px;

  .modal_block1__link {
    padding: 15px 0;
    display: flex;
    column-gap: 30px;
  }

}

.modal-footer {
  justify-content: center
}
</style>
