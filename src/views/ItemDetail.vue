<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">{{ selectedItemName }}</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/items">items</router-link></li>
            <li>
              <router-link :to="{ name: 'ItemDetail', params: { id: identifier } }">{{ selectedItemName }}</router-link>
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
    identifier: {
      type: [Number, String],
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
        if (typeof this.identifier === 'number') {
          // Search by ID
          response = await axios.get("/item/listchassi/" + this.identifier);
        } else {
          // Search by name
          const newItemName = this.identifier
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