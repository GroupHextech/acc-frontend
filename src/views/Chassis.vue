<template>
  <div class="container">
    <div class="chassis-list">
      <h2 class="page-title">Chassis</h2>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">chassis</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-4" v-for="chassi in chassisList" :key="chassi.chassi_id">
          <div class="chassis-card card shadow">
            <h6>{{ chassi.chassi_id }}</h6>
            <div class="d-flex flex-row justify-content-end">
              <router-link :to="'/chassis/' + chassi.chassi_id + '/sb'">
                <button type="button" class="btn btn-outline-primary btn-sm mr-2">
                  Service Bulletins
                </button>
              </router-link>
              <router-link :to="'/chassis/' + chassi.chassi_id + '/items'">
                <button type="button" class="btn btn-outline-primary btn-sm">
                  Items
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Chassi } from '../types'
import axios from 'axios';

export default {
  data() {
    return {
      chassisList: [] as Chassi[],
    }
  },
  mounted() {
    axios.get('/chassi/list')
      .then((response) => {
        this.chassisList = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
}
</script>

<style scoped>
.chassis-list {
  max-width: auto;
  margin: 0;
}

.card {
  padding: 0;
  margin: 0;
}

.chassis-card {
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  text-align: left;
  border-radius: 5px;
}

.btn-outline-primary {
  background-color: #fff;
  border: none;
  color: #0a1a5c;
}

.btn-outline-primary:hover {
  background-color: #0a1a5c;
  color: #fff;
}
</style>
