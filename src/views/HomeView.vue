
<!--HomeView-->
<template>
  <div class="div_main">
    <div>
      <BaseH1 size="large">Приветствуем Вас на сайте для заказа картин</BaseH1>
    </div>

    <div>
      <BaseP size="large" :customStyles="{ paddingBottom: '20px' }">
        Чтобы сделать предзаказ, необходимо <br/> авторизоваться
      </BaseP>

      <div class="div_main__button">
        <BaseButton variant="secondary" size="medium" @click="goToLogin">
          Уже есть аккаунт
        </BaseButton>
        <BaseButton variant="primary" size="medium" @click="goToRegister">
          Создать аккаунт
        </BaseButton>
      </div>
    </div>
  </div>

  <div>
    <img src="@/assets/Artist-rafiki.png" width="708" height="708" alt="Artist Image" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import BaseButton from '../components/UI/Button/BaseButton.vue';
import BaseH1 from '../components/UI/H/BaseH1.vue';
import BaseP from '../components/UI/P/BaseP.vue';

const router = useRouter();

const goToLogin = () => {
  router.push('/login');  // Переход на страницу логина
};

const goToRegister = () => {
  router.push('/register');  // Переход на страницу регистрации
};
</script>


<style scoped>
div {
  display: flex;
  align-items: center;
}

.div_main {
  /* display: block !important; */
  flex-direction: column;
  height: 362px;
  width: 708px;
  justify-content: space-between;
  align-items: flex-start;

  div {
    flex-direction: column;
    align-items: flex-start;


    .div_main__button {

      display: flex;
      column-gap: 15px;
      flex-direction: row;
    }
  }

}
</style>

