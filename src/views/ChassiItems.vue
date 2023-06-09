<template>
  <div class="container">
    <h2 class="page-title">Chassi {{ chassi }}</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/chassis">chassis</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ chassi }} / items
        </li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-12" v-if="items.length">
        <div
          v-for="item in items"
          :key="item.name_item"
          class="card shadow-sm shadow mt-3"
        >
          <div class="card-body d-flex align-items-center">
            <h6 class="me-3 text-left">{{ item.name_item }}</h6>
            <span
              v-if="item.status === 'INCORPORATED'"
              class="badge badge-success ml-auto"
              ><i class="pi pi-check"></i> {{ item.status }}</span
            >
            <span
              v-if="item.status === 'APPLICABLE'"
              class="badge badge-warning ml-auto"
              ><i class="pi pi-lock"></i> {{ item.status }}</span
            >
            <span
              v-if="item.status === 'NOT APPLICABLE'"
              class="badge badge-danger ml-auto"
              ><i class="pi pi-times"></i> {{ item.status }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <loading />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Loading from "../components/Loading.vue";
import { ItemChassi } from "../types";

export default defineComponent({
  props: {
    chassi: {
      type: String,
      required: true,
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      items: [] as ItemChassi[],
      isLoading: true,
    };
  },
  methods: {
    async loadData() {
      try {
        this.isLoading = true;
        const response = await axios.get("/items/list/" + this.chassi);
        console.log(response.data);
        const items = response.data;

        const incorporated = [...items.incorporated];
        const applicable = [...items.applicable];
        const notApplicable = [...items.not_applicable];

        this.items = incorporated
          .concat(applicable)
          .concat(notApplicable)
          .map((item) => ({ name_item: item.name_item, status: item.status }));
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
.container {
  padding-bottom: 40px;
}
.badge {
  display: inline-block;
  margin-left: 10px
}

</style>
