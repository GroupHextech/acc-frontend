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
          <div>
            <!-- Botão para abrir o modal -->
            <button class="button is-link" @click="openModal">+ Add item</button>
      
            <!-- Modal -->
            <div class="modal" :class="{ 'is-active': isModalActive }">
              <div class="modal-background" @click="closeModal"></div>
              <div class="modal-content">
                <AddItem />
              </div>
              <button
                class="modal-close is-large"
                aria-label="close"
                @click="closeModal"
              ></button>
            </div>
          </div>
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

import AddItem from "./AddItem.vue";
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
    AddItem,
  },
  data() {
    return {
      searchText: "",
      isLoading: true,
      isModalActive: false,
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
    openModal() {
      this.isModalActive = true;
    },
    closeModal() {
      this.isModalActive = false;
    },
    closeAllModals() {
      const modals = document.querySelectorAll(".modal");
      modals.forEach(() => {
        this.closeModal();
      });
    },
  },
  mounted() {
    this.loadData();
    // Add a click event on various child elements to close the parent modal
    const closeButtons = document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    );
    closeButtons.forEach((close) => {
      close.addEventListener("click", () => {
        this.closeModal();
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
      const e = event || window.event;

      if (e.keyCode === 27) {
        // Escape key
        this.closeAllModals();
      }
    });
  },
});
</script>

<style scoped>
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.control {
  padding-inline: 0.2rem;
}
</style>
