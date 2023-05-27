import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface ChartAmountChassisByItem {
  labels: string[];
  datasets: {
    label?: string;
    backgroundColor?: string;
    data: number[];
  }
}

export const useItemsStore = defineStore('items', () => {
  const selectedItemName = ref("");

  function setSelectedItemName(name: string) {
    selectedItemName.value = name;
  }

  return { setSelectedItemName }
});