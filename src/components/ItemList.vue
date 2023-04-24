<template>
  <div>
    <div class="row align-items-center">
      <div class="col-md-8 mb-3 mb-md-0">
        <div class="search bg-light rounded-pill h-100 d-flex align-items-center">
          <input
            v-model="searchText"
            type="text"
            class="form-control form-control-lg"
            placeholder="Pesquisar..."
          />
        </div>
      </div>
      <div class="col-md-4 h-100">
        <div class="add-item h-100">
          <button class="btn btn-lg btn-primary w-100 h-100">+ Add item</button>
        </div>
      </div>
    </div>

    <div
      v-for="item in filteredItems"
      :key="item.id_item"
      class="card shadow-sm shadow mt-3"
    >
      <router-link
        :to="{ name: 'ItemDetail', params: { id: item.id_item } }"
        @click="selectItem(item.name_item)"
      >
        <div class="card-body">
          <h6>{{ item.name_item }}</h6>
        </div>
      </router-link>
    </div>

    <div v-if="isLoading">
      <loading />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Item } from "../types";
import { useItemsStore } from "../store/items";

import axios from "axios";

import Loading from "./Loading.vue";

export default defineComponent({
  name: "ItemList",
  props: {
    items: {
      type: Array as () => Item[],
      required: true,
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      searchText: "",
      isLoading: true,
    };
  },
  computed: {
    filteredItems(): Item[] {
      if (!this.searchText) return this.items;
      return this.items.filter((item) =>
        item.name_item.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    selectItem(name: string) {
      const itemsStore = useItemsStore();
      itemsStore.setSelectedItemName(name);
    },
    async loadData() {
      try {
        this.isLoading = true;
        const response = await axios.get<Item[]>("/item/listall");
        this.$emit("update:items", response.data);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.loadData();
  },
});
</script>

<style scoped>
.card {
  margin: 0 0 20px 0;
}

.search {
  margin: 20px 0;
}

@media (max-width: 767.98px) {
  .search {
    margin-bottom: 0.2rem;
  }
}
</style>
