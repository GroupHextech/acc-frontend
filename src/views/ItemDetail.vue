<template>
    <div class="container">
        <h2 class="page-title">{{ selectedItemName }}</h2>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/items">items</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">
                    item?{{ id }}
                </li>
            </ol>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store';
import { useItemsStore } from '../store/items';

export default defineComponent({
  name: "ItemDetail",
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();

    const name = store.selectedItemName;

    return { name };
  },
  computed: {
    selectedItemName() {
      const itemsStore = useItemsStore();
      return itemsStore.selectedItemName;
    }
  }
});
</script>