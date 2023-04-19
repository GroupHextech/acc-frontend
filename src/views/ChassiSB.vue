<template >
  <div class="container">
    <h2 class="page-title">Chassi {{ chassi }}</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/chassis">chassis</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ chassi }} / sb
        </li>
      </ol>
    </nav>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="thead-dark">
          <tr>
            <th id="service-bulletins">Service Bulletins</th>
            <th id="incorporated">Incorporated</th>
            <th id="not-applicable">Not Applicable</th>
            <th id="applicable">Applicable</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sb in serviceBulletins" :key="sb.service_bulleti_name">
            <th id="column-1">{{ sb.service_bulleti_name }}</th>
            <!-- Incorporated -->
            <td v-if="sb.status === 'INCOPORATED' || sb.status === 'INCORPORATED' || sb.status === 'INCORP'">
              <i class="pi pi-check" style="color: green"></i>
            </td>
            <td v-else-if="sb.status === 'APPLICABLE'">
              <a href="#" @click="confirmChangeCheck(sb)"><i class="pi pi-circle check"></i></a>
            </td>
            <td v-else></td>
            <!-- Not Applicable -->
            <td v-if="sb.status === 'NOT APPLICABLE'">
              <i class="pi pi-check" style="color: green"></i>
            </td>
            <td v-else></td>
            <!-- Applicable -->
            <td v-if="sb.status === 'APPLICABLE'">
              <i class="pi pi-check" style="color: green"></i>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import { ServiceBulletins } from '../types';

export default defineComponent({
  props: {
    chassi: {
      type: String,
      required: true,
    },
  },

  setup(props) {

    const confirmChangeCheck = (sb: any) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to change the status to 'Incorporated'?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0A1A5C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change state!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          changeCheck(sb);
        }
      });
    };

    const changeCheck = (sb: any) => {
      sb.incorporated = true;
      sb.applicable = false;
    };

    return {
      confirmChangeCheck,
      changeCheck,
    };
  },

  data() {
    return {
      serviceBulletins: [] as ServiceBulletins[],
    }
  },

  mounted() {
    axios.get("/bulletins/listar/" + this.chassi)
      .then((response) => {
        this.serviceBulletins = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
</script>

<style>
.container {
  padding-bottom: 20px;
}
.pi-circle {
  color: #bbb;
}

.pi-circle:hover {
  color: #444;
}

.table-responsive {
  border-radius: 5px;
  background-color: #ccc;
  padding-bottom: 0;
  margin-bottom: 0;
}

.table {
  background-color: #e9ecef;
}
</style>