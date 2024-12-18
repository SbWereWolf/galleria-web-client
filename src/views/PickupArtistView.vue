<template>
  <BaseH1 size="large"
          :customStyles="{ paddingBottom: '60px', textAlign:'center' }"
  >
    Подобрать художника
  </BaseH1>
  <div class="centerCart">
    <BaseP size="large">Выберите стиль</BaseP>

    <form>
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
          id="pop_art" label="pop_art" v-model="data.pop_art"/>
      </fieldset>
    </form>

    <BaseButton
      size="large" variant="primary60" @click="handleSearch">
      Найти
    </BaseButton>
  </div>

  <div v-if="data.artist_collection">
    <ArtistCard
      v-for="(artist, index) in data.artist_collection"
      :key="index"
      :login="artist.login" :id="artist.id" :style="artist.style"/>
  </div>

</template>
<script setup>
import {reactive} from 'vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import axios from "axios";
import CheckboxWithLabel from "@/components/UI/Checkbox/CheckboxWithLabel.vue";
import ArtistCard from "@/components/UI/Card/ArtistCard.vue";

const data = reactive({
  artist_collection: [],
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
})

// Выполнение поиска с использованием выбранных значений
const handleSearch = async () => {
  try {
    const token = window.localStorage.getItem('jwtToken');
    if (!token) {
      window.console.error('Токен отсутствует');
      return;
    }

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
      selectedStyles.push('pop_art')
    }
    const styleList =
      selectedStyles.join('&style_list=');  // Преобразуем массив в строку

    const response = await axios.get(
      `/Artists/list/?style_list=${styleList}`, {
        baseURL: import.meta.env.VITE_API_SERVER,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    window.console.log('Результаты поиска:', response.data);
    data.artist_collection = response.data;
  } catch (error) {
    window.console.error('Ошибка при поиске:', error);
  }
};
</script>
