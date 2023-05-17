<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Chassis</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/chassis">chassis</router-link></li>
          </ul>
        </nav>
        <div v-if="isLoading">
          <loading />
        </div>
        <div class="columns">
          <div
            class="column is-3"
            v-for="chassi in chassisList"
            :key="chassi.chassi_id"
          >
            <div class="card">
              <p class="subtitle is-5">{{ chassi.chassi_id }}</p>
              <div class="buttons is-centered">
                <router-link
                  class="button is-link is-light is-rounded is-small"
                  :to="'/chassis/' + chassi.chassi_id + '/sb'"
                  v-if="hasPermission('allowed')"
                >
                  Service Bulletins
                </router-link>
                <router-link
                  class="button is-link is-light is-rounded is-small"
                  :to="'/chassis/' + chassi.chassi_id + '/items'"
                >
                  Items
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "../store/auth";
import { Chassi } from "../types";
import axios from "axios";
import Loading from "../components/Loading.vue";

export default {
  setup() {
    const authStore = useAuthStore();

    function hasPermission(permission: 'allowed' | 'restrict'): boolean {
      return authStore.hasPermission(permission);
    };

    return {
      authStore,
      hasPermission,
    };
  },
  components: {
    Loading,
  },
  data() {
    return {
      chassisList: [] as Chassi[],
      isLoading: true,
    };
  },
  methods: {
    async loadData() {
      try {
        this.isLoading = true;
        const authToken = sessionStorage.getItem("authToken");
        const config = {
          headers: {
            authorization: authToken,
          },
        };
        const response = await axios.get("/chassi/list", config);
        this.chassisList = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
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
  flex-grow: 0;
}
.card {
  padding: 0.5em;
  background-color: #eff1fa;
  border: 1px #dbdbdb solid;
  box-shadow: none;
}
</style>
