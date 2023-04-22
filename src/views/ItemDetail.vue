<template>
    <div class="container">
        <h2 class="page-title">{{ selectedItemName }}</h2>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/items">items</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ selectedItemName }}
                </li>
            </ol>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useItemsStore } from '../store/items';

export default defineComponent({
  name: "ItemDetail",
  props: {
    id_item: {
      type: Number,
      //required: true
    },
    name_item: {
      type: String,
      //required: true
    }
  },
  setup(props) {
    return { 
     };
  },
  computed: {
    selectedItemName() {
      const itemsStore = useItemsStore();
      return itemsStore.selectedItemName;
    }
  }
});
</script>