import {defineStore} from "pinia";

export const useCheckboxStore = defineStore("checkboxStore", {
  state: () => ({
    selectedValues: {}, // Состояние для нескольких списков, ключи - строки
  }),
  actions: {
    toggleValue(listId, value) {
      if (!this.selectedValues[listId]) {
        this.selectedValues[listId] = [];
      }
      if (this.selectedValues[listId].includes(value)) {
        this.selectedValues[listId] = this.selectedValues[listId].filter((v) => v !== value);
      } else {
        this.selectedValues[listId].push(value);
      }
    },
    clearSelection(listId) {
      if (this.selectedValues[listId]) {
        this.selectedValues[listId] = [];
      }
    },
    // Обновляем метод для правильного хранения значений
    updateSelectedValues(listId, newValues) {
      // Если новые значения не массив, преобразуем их в массив
      this.selectedValues[listId] = Array.isArray(newValues) ? newValues : [newValues];
    },
  },
});
