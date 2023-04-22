<template>
  <div class="container">
    <h2 class="page-title">Items</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">items</li>
      </ol>
    </nav>
    <item-list :items="items" @update:items="items = $event" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemList from "../components/ItemList.vue";
import { Item } from "../types";

export default defineComponent({
  name: "Items",
  components: {
    ItemList,
  },
  data() {
    return {
      items: [] as Item[],
    };
  },
});
</script>

<style scoped>
.container {
  padding-bottom: 30px;
}
</style>
