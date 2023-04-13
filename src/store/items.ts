import { defineStore } from 'pinia';

export const useItemsStore = defineStore({
  id: 'items',
  state: () => ({
    selectedItemName: ''
  }),
  actions: {
    setSelectedItemName(name: string) {
      this.selectedItemName = name;
    }
  }
});