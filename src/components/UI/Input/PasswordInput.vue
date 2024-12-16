<template>
  <div class="password-input">
    <label :for="id">{{ label }}</label>
    <div class="input-wrapper">
      <!-- Поле ввода пароля -->
      <input
        :type="inputType"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :id="id"
        :placeholder="placeholder"
        required
      />
      <!-- Иконка для переключения видимости -->
      <span @click="togglePasswordVisibility" class="eye-icon">
        {{ eyeIcon }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Пропсы
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

// Состояние видимости пароля
const isPasswordVisible = ref(false);

// Динамическое изменение типа поля ввода (text или password)
const inputType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

// Иконка для глазика (в зависимости от видимости пароля)
const eyeIcon = computed(() => (isPasswordVisible.value ? '🙈' : '👁️'));

// Функция для переключения видимости пароля
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<style scoped>
.password-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 400px;
}

.input-wrapper {
  display: flex;
  width: 440px;
  align-items: center;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 54px;
  width: 400px;
}

.eye-icon {
  cursor: pointer;
  font-size: 18px;
  position: relative;
  left: -40px;
}

label {
  color: #291202;
  font-weight: 700;
}
</style>
