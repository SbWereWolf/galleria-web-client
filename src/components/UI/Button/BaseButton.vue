<template>
  <button
    :class="['btn', size, variant]"
    :disabled="disabled"
    @click="onClick"
  >
    <slot /> <!-- Содержимое кнопки -->
  </button>
</template>

<script>
export default {
  name: "BaseButton", // Изменили название компонента
  props: {
    variant: {
      type: String,
      default: "primary", // Стиль кнопки (primary, secondary, danger)
    },
    size: {
      type: String,
      default: "medium", // Размер кнопки (small, medium, large)
    },
    disabled: {
      type: Boolean,
      default: false, // Отключение кнопки
    },
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        this.$emit("click", event); // Эмитируем событие клика
      }
    },
  },
};
</script>

<style scoped>
/* Общие стили кнопки */
.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #000; /* Черная рамка */
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease; /* Плавный переход только для эффекта прыжка */
}

/* Варианты стиля */
.btn.primary {
  background-color: #1C4E37;
  color: #fff;
}

.btn.primary60 {
  background-color: #1C4E37;
  color: #fff;
  margin: 60px 0px;
}
.btn.secondary {
  background-color: #fff;
  color: #291202;
}

.btn.secondary:hover {
  background-color: #FDFBF8;

}
.btn.danger {
  background-color: #dc3545;
  color: #fff;
}

/* Состояние отключенной кнопки */
.btn:disabled {
  background-color: #e0e0e0;
  color: #a8a8a8;
  cursor: not-allowed;
}

/* Размеры */
.btn.small {
  width: 106;
  height: 39px;
  padding: 5px 10px;
  font-size: 14px;
}

.btn.medium {
  padding: 10px 20px;
  font-size: 16px;
  width: 256px;
  height: 54px;
}

.btn.large {
  padding: 15px 30px;
  font-size: 18px;
  height: 54px;
  width: 400px;
}


.btn:hover {
  animation: shake 0.5s ease-in-out;
  /* color: #FFF8ED; */

}


/* Сброс эффекта при убирании курсора */
.btn:not(:hover) {
  transform: translateY(0); /* Кнопка возвращается обратно */
}

/* Анимация тряски */
@keyframes shake {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(3px);
  }
  75% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
