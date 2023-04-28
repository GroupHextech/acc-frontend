<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Chassi {{ chassi }}</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/chassis">chassis</router-link></li>
            <li>
              <router-link :to="'/chassis/' + chassi + '/items'"
                >{{ chassi }} / items</router-link
              >
            </li>
          </ul>
        </nav>
        <!-- All content here -->
        <div class="content">
          <div class="block">
            <div class="columns" v-if="items.length">
              <div
                class="column is-half"
                v-for="item in items"
                :key="item.name_item"
              >
                <div class="card">
                  <nav class="level">
                    <div class="level-left">
                      <div class="level-item">
                        <p class="subtitle is-6">{{ item.name_item }}</p>
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <span
                          v-if="item.status === 'INCORPORATED'"
                          class="tag is-success"
                        >
                          <i class="pi pi-check"></i>
                          {{ item.status }}
                        </span>
                        <span
                          v-if="item.status === 'APPLICABLE'"
                          class="tag is-warning"
                        >
                          <i class="pi pi-lock"></i>
                          {{ item.status }}
                        </span>
                        <span
                          v-if="item.status === 'NOT APPLICABLE'"
                          class="tag is-danger"
                        >
                          <i class="pi pi-times"></i>
                          {{ item.status }}
                        </span>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block" v-if="isLoading">
          <loading />
        </div>
      </div>
    </section>
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
.title {
  text-align: start;
}
.columns:not(.is-desktop) {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.column {
  flex-basis: auto;
  padding: 0.3rem;
}
.level {
  text-align: start;
}
.card{
  padding: 0.5em;
  background-color: #eff1fa;
  border: 1px #eee solid;
  box-shadow: none;
}
.tag {
  margin-bottom: 0;
}
</style>
