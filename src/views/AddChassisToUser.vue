<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Link Chassis to Users</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/users">Users</router-link></li>
          </ul>
        </nav>
        <div class="select block">
          <select v-model="selectedUser">
            <option>Select user</option>
            <option v-for="user in users" v-bind:value="user.userUsername">
              {{ user.userUsername }}
            </option>
          </select>
        </div>
        <div v-if="isLoading">
          <loading />
        </div>
        <div class="columns">
          <div
            class="column is-3"
            v-for="chassi in chassis"
            :key="chassi.chassi_id"
          >
            <div class="card">
              <label class="checkbox">
                <input
                  type="checkbox"
                  v-model="selectedChassis"
                  :value="chassi"
                />
                {{ chassi.chassi_id }}
              </label>
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <a class="button is-link" @click="linkChassis"
              ><i class="pi pi-link"></i> Link</a
            >
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Loading from "../components/Loading.vue";
import { Chassi, User } from "../types";
import axios from "axios";

export default {
  setup() {},
  components: {
    Loading,
  },
  data() {
    return {
      users: [] as User[],
      chassis: [] as Chassi[],
      isLoading: true,
      selectedUser: null as User | null,
      selectedChassis: [] as Chassi[],
    };
  },
  methods: {
    async loadLinkedChassis(selectedUser: any) {
      try {
        const authToken = sessionStorage.getItem("authToken");
        const config = {
          headers: {
            authorization: authToken,
          },
          params: {
            userUsername: selectedUser.userUsername,
          },
        };
        const response = await axios.get("/chassi/listByUser", config);
        const linkedChassis = response.data;

        linkedChassis.forEach((chassi: any) => {
          const foundChassi = this.chassis.find(
            (item) => item.chassi_id === chassi.chassi_id
          );
          if (foundChassi) {
            this.selectedChassis.push(foundChassi);
          }
        });

        console.log("Linked Chassis:", linkedChassis);
      } catch (error) {
        console.error(error);
      }
    },
    async loadData() {
      try {
        this.isLoading = true;
        const authToken = sessionStorage.getItem("authToken");
        const config = {
          headers: {
            authorization: authToken,
          },
        };
        const responseUser = await axios.get("/login", config);
        const responseChassi = await axios.get("/chassi/list", config);
        //const responseLinkedChassis = await axios.get("/chassi/listByUser", config);
        this.users = responseUser.data;
        this.chassis = responseChassi.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async linkChassis() {
      const selectedUser = this.selectedUser;
      if (!selectedUser) {
        console.warn("No user selected.");
        return;
      }

      await this.loadLinkedChassis(selectedUser);

      const selectedChassisIds = this.selectedChassis.map(
        (chassi) => chassi.chassi_id
      );

      console.log("Selected User:", selectedUser);
      console.log("Selected Chassis:", selectedChassisIds);

      try {
        // Faz a requisição para salvar os chassis atribuídos ao usuário
        /* Endpoint provisório */
        const response = await axios.post("/link-chassis", {
          user: selectedUser,
          chassis: selectedChassisIds,
        });

        console.log("Chassis linked successfully!");
      } catch (error) {
        console.error(error);
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
