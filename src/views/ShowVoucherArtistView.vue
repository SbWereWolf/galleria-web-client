<template>
  <BaseH1
    size="large"
    :customStyles="{ paddingBottom: '60px', textAlign:'center' }">
    Просмотреть ваучер
  </BaseH1>
  <div class="centerCart">
    <BaseP size="large">id ваучера</BaseP>
    <SearchInput v-model="data.id"/>
    <BaseButton size="large" variant="primary60" @click="obtain">
      Найти
    </BaseButton>
  </div>
  <div v-if="data.artwork" class="card_zakaz">
    <VoucherCard :artwork="data.artwork"/>
  </div>
  <div>
    <BaseButton size="small" @click="toWork">В работу</BaseButton>
    <BaseButton size="small" @click="complete">Сделано</BaseButton>
  </div>
</template>
<script setup>
import SearchInput from '@/components/UI/Input/SearchInput.vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import VoucherCard from '@/components/UI/Card/VoucherCard.vue';
import {reactive} from "vue";
import axios from "axios";

const data = reactive({
  artwork: {},
  id: 0,
})

const obtain = async () => {
  try {
    const token = window.localStorage.getItem('jwtToken');
    if (!token) {
      window.console.error('Токен отсутствует');
      return;
    }

    const response = await axios.get(
      `/Vouchers/${data.id}/`, {
        baseURL: import.meta.env.VITE_API_SERVER,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    window.console.log('Результаты поиска:', response.data);
    data.artwork = response.data;
  } catch (error) {
    window.console.error('Ошибка при поиске:', error);
  }
};

const toWork = async () => {
  try {
    const token = window.localStorage.getItem('jwtToken');
    if (!token) {
      window.console.error('Токен отсутствует');
      return;
    }

    const new_status = 'in work';
    const response = await axios.put(
        `/Vouchers?voucher_id=${data.id}&new_status=${new_status}`,
      {},
      {
        baseURL: import.meta.env.VITE_API_SERVER,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    window.console.log('Результаты перевода на новый статус:', response.data);
    data.artwork = {};
    window.alert('Ваучер взят в работу.')
  } catch (error) {
    window.console.error('Ошибка изменения статуса:', error);
  }
};

const complete = async () => {
  try {
    const token = window.localStorage.getItem('jwtToken');
    if (!token) {
      window.console.error('Токен отсутствует');
      return;
    }

    const new_status = 'ready';
    const response = await axios.put(
      `/Vouchers?voucher_id=${data.id}&new_status=${new_status}`,
      {},
      {
        baseURL: import.meta.env.VITE_API_SERVER,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    window.console.log('Результаты перевода на новый статус:', response.data);
    data.artwork = {};
    window.alert('Работа по ваучеру завершена.')
  } catch (error) {
    window.console.error('Ошибка изменения статуса:', error);
  }
};
</script>
