<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

// Определение пропса для отображения модального окна
defineProps({
  isOpen: Boolean,
});

// Эмиссия события закрытия модального окна
const emit = defineEmits(['modal-close']);

// Ссылка на контейнер модального окна
const target = ref(null);

// Обработчик для закрытия окна при клике вне его
onClickOutside(target, () => emit('modal-close'));
</script>

<template>
  <!-- Отображение модального окна, если isOpen равно true -->
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <!-- Контейнер модального окна -->
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <!-- Слот для заголовка модального окна, с дефолтным значением -->
          <slot name="header">default header</slot>
        </div>
        <div class="modal-body">
          <!-- Слот для контента модального окна, с дефолтным значением -->
          <slot name="content">default content</slot>
        </div>
        <div class="modal-footer">
          <!-- Слот для футера, с дефолтным значением кнопки -->
          <slot name="footer">
            <div>
              <button @click.stop="emit('modal-close')">Submit</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Стили для маски модального окна */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Стили для контейнера модального окна */
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

/* Дополнительные стили для header, body, footer можно добавить по необходимости */
</style>
