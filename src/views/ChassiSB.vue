<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Chassi {{ chassi }}</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/chassis">chassis</router-link></li>
            <li>
              <router-link :to="'/chassis/' + chassi + '/sb'"
                >{{ chassi }} / sb</router-link
              >
            </li>
          </ul>
        </nav>
        <div class="content">
          <table class="table is-hoverable">
            <thead>
              <tr>
                <th title="Service Bulletins" id="service-bulletins">
                  Service Bulletins
                </th>
                <th title="Part" id="part">Part</th>
                <th title="Incorporated" id="incorporated">Incorporated</th>
                <th title="Applicable" id="applicable">Applicable</th>
                <th title="Not Applicable" id="not-applicable">
                  Not Applicable
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sb in serviceBulletins" :key="sb.service_bulleti_name">
                <th :title="sb.service_bulleti_name" id="serviceBulletin">
                  {{ sb.service_bulleti_name }}
                </th>
                <td id="part">{{ sb.part }}</td>
                <!-- Incorporated -->
                <td
                  v-if="
                    sb.status === 'INCOPORATED' ||
                    sb.status === 'INCORPORATED' ||
                    sb.status === 'INCORP'
                  "
                >
                  <i class="pi pi-check" style="color: green"></i>
                </td>
                <td v-else-if="sb.status === 'APPLICABLE'">
                  <a href="#" @click="confirmChangeCheck(sb)"
                    ><i class="pi pi-circle check"></i
                  ></a>
                </td>
                <td v-else></td>
                <!-- Applicable -->
                <td v-if="sb.status === 'APPLICABLE'">
                  <i class="pi pi-check" style="color: green"></i>
                </td>
                <td v-else></td>
                <!-- Not Applicable -->
                <td v-if="sb.status === 'NOT APPLICABLE'">
                  <i class="pi pi-check" style="color: green"></i>
                </td>
                <td v-else></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="isLoading">
          <loading />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import { ServiceBulletin } from "../types";
import Loading from "../components/Loading.vue";

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
  setup(props) {
    const serviceBulletins = ref<ServiceBulletin[]>([]);
    const isLoading = ref(true);

    const confirmChangeCheck = async (sb: ServiceBulletin) => {
      try {
        const currentStatus = sb.status;
        const futureStatus = "INCORPORATED";

        const result = await Swal.fire({
          html: `
            <p><strong>Current Status:</strong> ${currentStatus}</p>
            <p><strong>Future Status:</strong> ${futureStatus}</p>
            <br>
            <p>Do you want to save the changes?</p>
          `,
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        });

        if (result.isConfirmed) {
          await axios.post("/update/bulletin", {
            serviceBulletinUpdateDto: [
              {
                bulletin_service_name: sb.service_bulleti_name,
                part: sb.part,
                status: futureStatus,
              },
            ],
            chassi_id: props.chassi,
          });

          Swal.fire("Saved!", "", "success");
          // Reload data or update specific item in the list
          loadData();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error occurred", "", "error");
      }
    };

    const loadData = async () => {
      try {
        isLoading.value = true;
        const response = await axios.get("/bulletins/listar/" + props.chassi);
        serviceBulletins.value = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(loadData);

    return {
      serviceBulletins,
      isLoading,
      confirmChangeCheck,
    };
  },
});
</script>

<style scoped>
.title {
  text-align: start;
}
.pi-circle {
  color: #bbb;
}
.pi-circle:hover {
  color: #444;
}
</style>
