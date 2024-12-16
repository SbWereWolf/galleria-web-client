import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Иванов Иван Иванович',
    login: 'Ivanov2000',
    id: '23246452',
    style: 'Абстракционизм',
    avatar: 'src/assets/images/ava.png', // путь к изображению
  }),
  actions: {
    updateUser(data) {
      this.name = data.name || this.name;
      this.login = data.login || this.login;
      this.id = data.id || this.id;
      this.style = data.style || this.style;
      this.avatar = data.avatar || this.avatar;
    },
  },
});
