<template>
  <p :class="['base-p', size]" :style="customStyles">
    <slot /> <!-- Содержимое p -->
  </p>
</template>

<script>
export default {
  name: 'BaseP',
  props: {
    size: {
      type: String,
      default: 'medium', // Размер текста: small, medium, large
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

/* Общие стили для p */
.base-p {
  font-family: 'Roboto', sans-serif; /* Применяем шрифт Roboto */
  color: #291202; /* Цвет текста */
  margin: 0;
  line-height: 1.6; /* Межстрочный интервал */
}

/* Размеры текста */
.base-p.small {
  font-size: 14px;
  font-weight: 400;
}

.base-p.medium {
  font-size: 18px;
  font-weight: 400;
}

.base-p.large {
  font-size: 22px;
  font-weight: 500;
}

.base-p.medium_green{
  color:#1C4E37;
  font-weight: 700;
  font-size: 18px;
}
</style>
