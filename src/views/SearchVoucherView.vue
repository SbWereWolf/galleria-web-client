<template>
  <BaseH1 size="large"
          :customStyles="{ paddingBottom: '60px', textAlign:'center' }"
  >
    Искать ваучер
  </BaseH1>

  <div class="centerCart">
    <form @submit.prevent="search">
      <BaseP size="large">Стиль</BaseP>
      <fieldset>
        <CheckboxWithLabel
          id="realism" label="realism" v-model="data.realism"/>
        <CheckboxWithLabel
          id="impressionism"
          label="impressionism"
          v-model="data.impressionism"
        />
        <CheckboxWithLabel
          id="fauvism" label="fauvism" v-model="data.fauvism"/>
        <CheckboxWithLabel
          id="modern" label="modern" v-model="data.modern"/>
        <CheckboxWithLabel
          id="expressionism"
          label="expressionism"
          v-model="data.expressionism"
        />
        <CheckboxWithLabel
          id="cubism" label="cubism" v-model="data.cubism"/>
        <CheckboxWithLabel
          id="futurism" label="futurism" v-model="data.futurism"/>
        <CheckboxWithLabel
          id="abstractionism"
          label="abstractionism"
          v-model="data.abstractionism"
        />
        <CheckboxWithLabel
          id="dadaism" label="dadaism" v-model="data.dadaism"/>
        <CheckboxWithLabel
          id="pop_art" label="pop-art" v-model="data.pop_art"/>
      </fieldset>
      <BaseP size="large">Статус</BaseP>
      <fieldset>
        <CheckboxWithLabel
          id="realism" label="placed" v-model="data.placed"/>
        <CheckboxWithLabel
          id="fauvism" label="in work" v-model="data.in_work"/>
        <CheckboxWithLabel
          id="modern" label="ready" v-model="data.ready"/>
      </fieldset>
      <BaseButton size="large" variant="primary60">Найти</BaseButton>
    </form>

    <div v-if="data.voucher_collection">
      <VoucherCard
        v-for="(voucher, index) in data.voucher_collection"
        :key="index"
        :artwork="voucher"
      />
    </div>
  </div>
</template>

<script setup>
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import CheckboxWithLabel from "@/components/UI/Checkbox/CheckboxWithLabel.vue";
import axios from "axios";
import {reactive} from "vue";
import VoucherCard from "@/components/UI/Card/VoucherCard.vue";

const data = reactive({
  voucher_collection: [],
  realism: false,
  impressionism: false,
  fauvism: false,
  modern: false,
  expressionism: false,
  cubism: false,
  futurism: false,
  abstractionism: false,
  dadaism: false,
  pop_art: false,
  placed: false,
  in_work: false,
  ready: false,
})

const search = async () => {
  try {
    const token = window.localStorage.getItem('jwtToken');
    if (!token) {
      window.console.error('Токен отсутствует');
      return;
    }

    data.voucher_collection=[];

    let query = [];

    const selectedStyles = [];
    if (data.realism) {
      selectedStyles.push('realism')
    }
    if (data.impressionism) {
      selectedStyles.push('impressionism')
    }
    if (data.fauvism) {
      selectedStyles.push('fauvism')
    }
    if (data.modern) {
      selectedStyles.push('modern')
    }
    if (data.expressionism) {
      selectedStyles.push('expressionism')
    }
    if (data.cubism) {
      selectedStyles.push('cubism')
    }
    if (data.futurism) {
      selectedStyles.push('futurism')
    }
    if (data.abstractionism) {
      selectedStyles.push('abstractionism')
    }
    if (data.dadaism) {
      selectedStyles.push('dadaism')
    }
    if (data.pop_art) {
      selectedStyles.push('pop-art')
    }
    let styles =
      selectedStyles.join('&style=');
    if (styles) {
      styles = `style=${styles}`
      query.push(styles)
    }

    const selectedStatuses = [];
    if (data.placed) {
      selectedStatuses.push('placed')
    }
    if (data.in_work) {
      selectedStatuses.push('in work')
    }
    if (data.ready) {
      selectedStatuses.push('ready')
    }
    let statuses =
      selectedStatuses.join('&status=');
    if (statuses) {
      statuses = `status=${statuses}`
      query.push(statuses)
    }
    const queryString = query.join('&');


    const response = await axios.get(
      `/Vouchers/list?${queryString}`, {
        baseURL: import.meta.env.VITE_API_SERVER,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    window.console.log('Результаты поиска:', response.data);
    data.voucher_collection = response.data;
  } catch (error) {
    window.console.error('Ошибка при поиске:', error);
  }
};
</script>
