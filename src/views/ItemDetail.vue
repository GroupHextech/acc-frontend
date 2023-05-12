<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">{{ name_item }}</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/items">items</router-link></li>
            <li>
              <router-link :to="{ name: 'ItemDetail', params: { id_item: id_item, name_item: name_item } }">
                {{ id_item }} / {{ name_item }}
              </router-link>
            </li>
          </ul>
        </nav>
        <!-- All content here -->
        <div class="content">
          <div class="card block" v-for="chassi in chassis" :key="chassi.chassi_id">
            {{ chassi }}
          </div>
          <div class="block" v-if="isLoading">
            <loading />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useItemsStore } from "../store/items";
import Loading from "../components/Loading.vue";
import { Chassi } from '../types';
import axios from "axios";

export default defineComponent({
  name: "ItemDetail",
  props: {
    id_item: {
      type: Number,
      required: true
    },
    name_item: {
      type: String,
      required: true
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      chassis: [] as Chassi[],
      isLoading: true,
    };
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
  methods: {
    async loadData() {
      try {
        this.isLoading = true;
        let response;
        if (typeof this.id_item === 'number') {
          // Search by ID
          response = await axios.get("/item/listchassi/" + this.id_item);
        } else {
          // Search by name
          const newItemName = this.name_item
            .replaceAll(" ", "")
            .replaceAll("ã", "a")
            .replaceAll("é", "e")
            .replaceAll("á", "a")
            .replaceAll("à", "a")
            .replaceAll("â", "a")
            .replaceAll("/", "")
            .toLowerCase();
          response = await axios.get("/item/listchassi/" + newItemName);
        }
        console.log(response.data);
        const chassis = response.data;
        this.chassis = chassis;
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
.title {
  text-align: start;
}
.card {
  padding: 0.5em;
  background-color: #eff1fa;
  border: 1px #dbdbdb solid;
  box-shadow: none;
}
</style>