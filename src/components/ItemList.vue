<template>
    <div>
        <div class="search bg-light rounded-pill">
            <input v-model="searchText" type="text" class="form-control form-control-lg" placeholder="Pesquisar..." />
        </div>
        <div v-for="item in filteredItems" :key="item.id_item" class="card shadow-sm shadow">
            <router-link :to="{ name: 'ItemDetail', params: { id: item.id_item } }" @click="selectItem(item.name_item)">
                <div class="card-body">
                    <h6>{{ item.name_item }}</h6>
                </div>
            </router-link>
        </div>
        <div class="add-item">
            <button class="btn btn-primary w-100">+ Add item</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Item } from '../types';
import { useItemsStore } from '../store/items';

export default defineComponent({
    name: "ItemList",
    props: {
        items: {
            type: Array as () => Item[],
            required: true,
        },
    },
    data() {
        return {
            searchText: "",
        };
    },
    computed: {
        filteredItems(): Item[] {
            if (!this.searchText) return this.items;
            return this.items.filter(item =>
                item.name_item.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
    },
    methods: {
        selectItem(name: string) {
            const itemsStore = useItemsStore();
            itemsStore.setSelectedItemName(name);
        }
    }
});
</script>

<style scoped>
.card {
    margin: 0 0 20px 0;
}

.search {
    margin: 20px 0;
}
.add-item {
    margin-bottom: 20px;
}
</style>
