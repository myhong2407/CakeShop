import { defineStore } from 'pinia';

export const useAccountStore = defineStore('user', {
  state: () => ({ user: {}}),
  
  persist: {
    enabled: true,
    strategies: [], // <- HERE
  },
})