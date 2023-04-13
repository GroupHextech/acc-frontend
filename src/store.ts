import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "myStore",
  state: () => ({
    selectedItemName: "",
  }),
  actions: {
    setSelectedItemName(name: string) {
      this.selectedItemName = name;
    },
  },
});