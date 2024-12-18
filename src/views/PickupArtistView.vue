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
        <div>
          <input type="checkbox" id="realism" v-model="data.realism"/>
          <label for="realism">{{ data.realism }}</label>
        </div>
        <div>
          <input type="checkbox" id="impressionism" v-model="data.impressionism"/>
          <label for="impressionism">{{ data.impressionism }}</label>
        </div>
        <div>
          <input type="checkbox" id="fauvism" v-model="data.fauvism"/>
          <label for="fauvism">{{ data.fauvism }}</label>
        </div>
        <div>
          <input type="checkbox" id="modern" v-model="data.modern"/>
          <label for="modern">{{ data.modern }}</label>
        </div>
        <div>
          <input type="checkbox" id="expressionism" v-model="data.expressionism"/>
          <label for="expressionism">{{ data.expressionism }}</label>
        </div>
        <div>
          <input type="checkbox" id="cubism" v-model="data.cubism"/>
          <label for="cubism">{{ data.cubism }}</label>
        </div>
        <div>
          <input type="checkbox" id="futurism" v-model="data.futurism"/>
          <label for="futurism">{{ data.futurism }}</label>
        </div>
        <div>
          <input type="checkbox" id="abstractionism" v-model="data.abstractionism"/>
          <label for="abstractionism">{{ data.abstractionism }}</label>
        </div>
        <div>
          <input type="checkbox" id="dadaism" v-model="data.dadaism"/>
          <label for="dadaism">{{ data.dadaism }}</label>
        </div>
        <div>
          <input type="checkbox" id="pop-art" v-model="data.pop_art"/>
          <label for="pop-art">{{ data.pop_art }}</label>
        </div>
      </fieldset>
    </form>

    <BaseButton
      size="large" variant="primary60" @click="handleSearch">
      Найти
    </BaseButton>
  </div>

  <BaseCard :avatar="user.avatar_url" :name="user.username"
            :login="user.username" :id="user.id" :style="user.style"
            :addres="user.adres" :role="user.role"/>

</template>
<script setup>
import {reactive} from 'vue';
import BaseH1 from '@/components/UI/H/BaseH1.vue';
import BaseP from '@/components/UI/P/BaseP.vue';
import BaseButton from '@/components/UI/Button/BaseButton.vue';
import BaseCard from '@/components/UI/Card/BaseCard.vue';
import axios from "axios";

const data = reactive({
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
  } catch (error) {
    window.console.error('Ошибка при поиске:', error);
  }
};
</script>
