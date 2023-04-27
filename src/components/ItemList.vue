<template>
  <div class="content">
    <div class="block">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input
            class="input"
            v-model="searchText"
            type="text"
            placeholder="Search a item"
          />
        </p>
        <p class="control">
          <a class="button is-link"> + Add item </a>
        </p>
      </div>
    </div>
    

    <div class="buttons">
      <div class="control" v-for="item in filteredItems" :key="item.id_item">
        <router-link
          class="button is-link is-light is-rounded"
          :to="{ name: 'ItemDetail', params: { id: item.id_item } }"
          @click="selectItem(item.name_item)"
        >
          <p>{{ item.name_item }}</p>
        </router-link>
      </div>
    </div>

    <div class="block" v-if="isLoading">
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
.columns:not(.is-desktop) {
  flex-direction: row;
  flex-wrap: wrap;
}
.box {
  padding: 0.5em;
  background-color: #f9f9f9;
  border: 1px #eee solid;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.control {
  padding-inline: 0.2rem;
}
</style>
