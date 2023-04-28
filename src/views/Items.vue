<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Items</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/items">items</router-link></li>
          </ul>
        </nav>
        <ItemList :items="items" @update:items="items = $event" />
      </div>
    </section>
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
.title {
  text-align: start;
}
</style>
