<template>
  <h1 :class="['base-h1', size]" :style="customStyles">
    <slot /> <!-- Содержимое h1 -->
  </h1>
</template>

<script>
export default {
  name: 'BaseH1',
  props: {
    size: {
      type: String,
      default: 'medium', // Размер заголовка: small, medium, large
    },
    customStyles: {
      type: Object,
      default: () => ({}), // Объект для пользовательских стилей
    },
  },
};
</script>

<style scoped>
/* Подключаем шрифт Roboto */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

/* Общие стили для h1 */
.base-h1 {
  font-family: 'Roboto', sans-serif;
  /* Применяем шрифт Roboto */
  color: #291202;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

/* Размеры заголовков */
.base-h1.small {
  font-size: 24px;
  font-weight: 400;
}

.base-h1.medium {
  font-size: 36px;
  font-weight: 500;
}

.base-h1.large {
  font-size: 48px;
  font-weight: 700;
}
</style>
