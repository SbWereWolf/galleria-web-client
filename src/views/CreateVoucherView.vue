<template>
  <BaseH1
    size="large"
    :customStyles="{ paddingBottom: '60px', textAlign:'center' }"
  >
    Создать ваучер
  </BaseH1>
  <div class="centerCart">

    <form @submit.prevent="placeVoucher">
      <BaseP size="large">Количество картин</BaseP>
      <BaseInput
        type="number"
        :customStyles="{ paddingBottom: '30px' }"
        v-model="data.amount_pictures"
      />
      <BaseP size="large">Стиль</BaseP>
      <BaseInput
        placeholder='realism,modern,cubism,futurism,pop-art ...'
        :customStyles="{ paddingBottom: '30px' }"
        v-model="data.style"
      />
      <BaseP size="large">Цена</BaseP>
      <BaseInput
        type="number"

        :customStyles="{ paddingBottom: '30px' }"
        v-model="data.price"
      />
      <BaseP size="large">Пожелания</BaseP>
      <TextArea
        placeholder="Описание для картины здесь..."
        v-model="data.description"
      />
      <BaseButton size="large" variant="primary60">
        Создать ваучер
      </BaseButton>
    </form>
  </div>


</template>
<script setup>
import BaseInput from '@/components/UI/Input/BaseInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';

import TextArea from '@/components/UI/TextArea/TextArea.vue';
import {reactive} from "vue";

const data = reactive({
  amount_pictures: 0,
  price: 0,
  style: '',
  description: '',
})

const placeVoucher = async () => {
  const token = window.localStorage.getItem('jwtToken');
  if (!token) {
    window.console.error('Токен отсутствует');
    return;
  }

  const voucher = {
    amount_pictures: data.amount_pictures,
    price: data.price,
    style: data.style,
    description: data.description,
    id: 0,
    customer: '',
    executor: '',
    status: '',
  };
  window.console.log(voucher)

  let response = {}
  try {
    response = await window.fetch(
      import.meta.env.VITE_API_SERVER + '/Vouchers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(voucher)

      });
  } catch (error) {
    window.console.log(voucher);
    window.console.error('Ошибка обработки запроса:', error);
  }

  if (!response.ok) {
    const error = await response.json();
    window.console.error('Ошибка создания ваучера:', error);
  }

  if (response.ok) {
    const data = await response.json();
    window.console.log('Ваучер добавлен успешно', data);
    window.alert('Ваучер добавлен.')

    data.amount_pictures = 0;
    data.price = 0;
    data.style = '';
    data.description = '';
  }
};
</script>
