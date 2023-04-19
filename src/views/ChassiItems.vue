<template>
  <div class="container">
    <h2 class="page-title">Chassi {{ chassi }}</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/chassis">chassis</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ chassi }} / items
        </li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-12" v-if="items">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th class="col-1"></th>
                <th class="col2">Items</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.item_id">
                <td class="col2" id="item-name">{{ item.item_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Item } from '../types';

export default defineComponent({
  props: {
    chassi: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      items: [] as Item[],
    }
  },

  mounted() {
    axios.get("/items/list/" + this.chassi)
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
</script>

<style>
.col2 {
  width: 50px;
  text-align: left;
  padding-left: 10px;
}

.table-responsive {
  overflow-x: auto;
}

.table td,
.table th {
  white-space: nowrap;
}
</style>