<template>
  <div class="auth-view">
    <div>
      <BaseH1 size="large" :customStyles="{ textAlign: 'center', paddingBottom: '60px' }">Регистрация</BaseH1>
      <form @submit.prevent="handleRegistration">
        <div class="form-input__reg">
          <BaseInput v-model="fio" label="Фамилия" placeholder="Введите вашу фамилию" id="fio" type="text"/>
          <BaseInput v-model="name" label="Имя" placeholder="Введите ваше имя" id="name" type="text"/>
        </div>

        <div class="form-input__reg">
          <BaseInput v-model="lastName" label="Отчество" placeholder="Введите ваше отчество" id="lastName" type="text"/>
          <BaseInput v-model="date" label="Дата рождения" placeholder="Введите дату рождения" id="date" type="date"/>
        </div>

        <div class="form-input__reg">
          <BaseInput v-model="phone" label="Номер телефона" placeholder="Введите ваш номер телефона" id="phone"
                     type="tel"/>
          <CustomSelect id="role-select" label="Выберите роль" :options="options" v-model="selectedRole"/>
          <!-- <p>Вы выбрали роль: {{ selectedRole }}</p> -->
        </div>

        <div class="form-input__reg">
          <BaseInput v-model="email" label="Email" placeholder="Введите ваш email" id="email" type="email"/>
          <div class="form-input__reg_sex">
            <div>
              <BaseP size="medium">Пол</BaseP>
            </div>
            <div class="form-input__reg">
              <CheckboxWithLabel id="accept-terms" label="мужской" v-model="isCheckedM"/>
              <CheckboxWithLabel id="accept-termsW" label="женский" v-model="isCheckedW"/>
            </div>
          </div>
        </div>

        <!-- Пароли -->
        <div class="form-input__reg" style="align-items: start;">
          <PasswordInput
            label="Пароль"
            v-model="password"
            placeholder="Введите ваш пароль"
            id="password"
            @input="checkPasswords"
          />
          <PasswordInput
            label="Подтвердите пароль"
            v-model="confirmPassword"
            placeholder="Подтвердите ваш пароль"
            id="confirmPassword"
            @input="checkPasswords"
          />
        </div>

        <!-- Ошибка, если пароли не совпадают -->
        <div v-if="passwordError" class="error-message">
          Пароли не совпадают. Пожалуйста, повторите ввод.
        </div>

        <!-- Кнопка регистрации -->
        <div class="button-reg" style="align-items: center;">
          <BaseButton variant="primary" size="large" :disabled="passwordError">Зарегистрироваться</BaseButton>
        </div>
      </form>

      <div style="display: flex; align-items: center; column-gap: 5px; justify-content: center;">
        <BaseP size="medium" :customStyles="{ textAlign: 'right', padding: '10px 0' }">Уже есть аккаунт?</BaseP>
        <BaseLink to="/login">Войти</BaseLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import BaseInput from '@/components/UI/Input/BaseInput.vue';
import PasswordInput from '@/components/UI/Input/PasswordInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseLink from '@/components/UI/Linlk/BaseLink.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import CheckboxWithLabel from '@/components/UI/Checkbox/CheckboxWithLabel.vue';
import CustomSelect from '@/components/UI/Select/CustomSelect.vue';

const selectedRole = ref('');
const options = [
  {label: 'Художник', value: 'artist'},
  {label: 'Заказчик', value: 'visitor'},
];
const isCheckedM = ref(false);
const isCheckedW = ref(false);
const email = ref('');
const fio = ref('');
const name = ref('');
const lastName = ref('');
const date = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');

const passwordError = ref(false);

// Проверка совпадения паролей
const checkPasswords = () => {
  passwordError.value = password.value !== confirmPassword.value;
};

// Функция для обработки регистрации и отправки данных на сервер
const handleRegistration = async () => {
  if (passwordError.value) {
    console.log('Пароли не совпадают. Пожалуйста, проверьте введенные данные.');
    return;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const userData = {
    login: email.value,
    password: password.value,
    surName: lastName.value,
    firstName: name.value,
    patronymic: fio.value,
    date_of_birth: formatDate(date.value),
    phone: phone.value,
    email: email.value,
    sex: isCheckedM.value ? 'm' : (isCheckedW.value ? 'f' : ''),
    type_role: selectedRole.value,
  };
  console.log(userData)

  let response = {}
  try {
    // Отправляем POST запрос на сервер
    response = await fetch(
      import.meta.env.VITE_API_SERVER + '/Accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)

      });
  } catch (error) {
    console.log(userData);
    console.error('Ошибка при отправке данных:', error);
  }

  if (!response.ok) {
    const error = await response.json();
    console.error('Ошибка регистрации:', error);
  }

  if (response.ok) {
    const data = await response.json();
    console.log('Регистрация успешна', data);
    alert('Спасибо за регистрацию теперь вы можете войти по email и паролю')
  }
};
</script>

<style scoped>
/* Добавьте стили для ошибок */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
