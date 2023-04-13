<template>
  <div class="container">
    <h2 class="page-title">Items</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">items</li>
      </ol>
    </nav>
    <item-list :items="items" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemList from "../components/ItemList.vue";
import { Item } from '../types'
import { useItemsStore } from '../store/items';

export default defineComponent({
  name: "ItemsPage",
  components: {
    ItemList,
  },
  data() { 
    return {}
  },
  computed: {
    items(): Item[] {
      return [
        { id: 1, name: "Airbag" },
        { id: 2, name: "Volante" },
        { id: 3, name: "Vidro elétrico" },
        { id: 4, name: "Freio à disco" },
      ] as Item[];
    },
  },
  setup() {
    const itemsStore = useItemsStore();

    function selectItem(name: string) {
      itemsStore.setSelectedItemName(name);
    }

    return { selectItem };
  }
});
</script>
