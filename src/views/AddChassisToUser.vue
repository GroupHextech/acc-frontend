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
          <select v-model="selectedUser" @change="loadUserPermissions">
            <option>Select user</option>
            <option v-for="user in users" :value="user.userId">
              {{ user.userUsername }}
            </option>
          </select>
        </div>
        <div v-if="isLoading">
          <loading />
        </div>
        <div class="columns">
          <div class="column is-3" v-if="selectedUser" v-for="chassi in chassis" :key="chassi.chassi_id">
            <div class="card">
              <label class="checkbox">
                <input type="checkbox" :checked="isCheckboxSelected(chassi.chassi_id)"
                  @change="toggleCheckbox(chassi.chassi_id)" />
                {{ chassi.chassi_id }}
              </label>
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <a class="button is-link" @click="savePermissions"><i class="pi pi-link"></i> Link</a>
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
  setup() { },
  components: {
    Loading,
  },
  data() {
    return {
      users: [] as User[], // Usuários do banco de dados
      selectedUser: null as User | null, // Usuário selecionado no select

      selectedChassis: [] as Chassi[], // Array temporário para armazenar os chassis selecionados
      permissions: [] as { chassi_id: number; selected: boolean }[], // Array temporário para armazenar as permissões do usuário selecionado

      chassis: [] as Chassi[],
      isLoading: true,
    };
  },
  computed: {
  },
  methods: {
    isCheckboxSelected(chassisId: string | number) {
      return this.permissions.some(chassis => chassis.chassi_id === chassisId);
    },

    async loadUserPermissions() {
      try {
        const authToken = sessionStorage.getItem("authToken");
        const config = {
          headers: {
            authorization: authToken,
          },
        };
        const response = await axios.get(`/list/chassi/user/${this.selectedUser}`, config);

        const linkedChassis = response.data.map((chassi: string) => ({
          chassi_id: Number(chassi),
          selected: response.data.includes(String(chassi)),
        }));

        console.log("Linked chassis: ", linkedChassis);

        this.permissions = linkedChassis;
        console.log("Permissions: ", this.permissions);

      } catch (error) {
        console.error(error);
      }
    },

    toggleCheckbox(chassisId: string | number) {
      const numericChassisId = Number(chassisId);
      const selectedChassis = this.selectedChassis.find(chassis => chassis.chassi_id === numericChassisId);

      if (selectedChassis) {
        // Se o chassis já estiver na lista, altera o valor de 'selected'
        selectedChassis.selected = !selectedChassis.selected;
      } else {
        // Se o chassis não estiver na lista, adiciona com 'selected' como true
        this.selectedChassis.push({ chassi_id: numericChassisId, selected: true });
      }

      console.log("Updated chassis: ", this.selectedChassis);
    },

    async savePermissions() {
      try {
        const authToken = sessionStorage.getItem("authToken");
        const config = {
          headers: {
            authorization: authToken,
          },
        };

        const chassisIds = this.selectedChassis.map(chassis => chassis.chassi_id);

        await axios.post(`/list/chassi/user/${this.selectedUser}`, chassisIds, config);

        // Limpa a lista temporária de chassis selecionados
        this.selectedChassis = [];
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
