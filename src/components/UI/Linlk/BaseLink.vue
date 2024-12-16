<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to || null"
    class="base-link"
    :class="sizeClass"
    :style="{ color: computedColor, fontWeight, ...customStyles }"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';

// Пропсы
const props = defineProps({
  to: {
    type: [String, Object],
    default: null, // Может быть пустым для действий
  },
  color: {
    type: String,
    default: 'green',
    validator: (value) => ['red', 'black', 'green'].includes(value),
  },
  fontWeight: {
    type: String,
    default: '700',
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  customStyles: {
    type: Object,
    default: () => ({}),
  },
});

// Вычисляем класс для размера
const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'base-link--small';
    case 'large':
      return 'base-link--large';
    default:
      return 'base-link--medium';
  }
});

// Вычисляем цвет ссылки
const computedColor = computed(() => {
  switch (props.color) {
    case 'red':
      return '#A0061F';
    case 'black':
      return '#291202';
    case 'green':
      return '#1C4E37';
    default:
      return '#1C4E37';
  }
});

// Обработка клика
const handleClick = () => {
  if (!props.to) {
    console.log('Кнопка нажата! Выполняем действие...');
    // Добавьте любое действие, например вызов метода или отправку запроса
  }
};
</script>

<style scoped>
.base-link {
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.base-link:hover {
  text-decoration: underline;
}

.base-link--small {
  font-size: 12px;
}

.base-link--medium {
  font-size: 18px;
}

.base-link--large {
  font-size: 24px;
}
</style>
