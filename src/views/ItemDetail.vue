<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">{{ selectedItemName }}</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/items">items</router-link></li>
            <li><router-link :to="selectedItemName">{{ selectedItemName }}</router-link></li>
          </ul>
        </nav>
        <!-- All content here -->
        <div class="content">
          <i class="pi pi-wrench" style="font-size: 2rem"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useItemsStore } from "../store/items";

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
    },
  },
  setup(props) {
    return {};
  },
  computed: {
    selectedItemName() {
      const itemsStore = useItemsStore();
      return itemsStore.selectedItemName;
    },
  },
});
</script>

<style scoped>
.title {
  text-align: start;
}
</style>