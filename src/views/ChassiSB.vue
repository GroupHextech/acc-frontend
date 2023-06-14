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
              <tr v-for="sb in serviceBulletins" :key="sb.name">
                <th :title="sb.name" id="serviceBulletin">
                  {{ sb.name }}
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
                <td v-else>
                  <a
                    href="#"
                    @click="confirmChangeCheck(sb, 'INCORPORATED')"
                    v-if="hasPermission('allowed')"
                    ><i class="pi pi-circle check"></i
                  ></a>
                </td>
                <!-- Applicable -->
                <td v-if="sb.status === 'APPLICABLE'">
                  <i class="pi pi-check" style="color: green"></i>
                </td>
                <td v-else>
                  <a
                    href="#"
                    @click="confirmChangeCheck(sb, 'APPLICABLE')"
                    v-if="hasPermission('restrict')"
                    ><i class="pi pi-circle check"></i
                  ></a>
                </td>
                <!-- Not Applicable -->
                <td v-if="sb.status === 'NOT APPLICABLE'">
                  <i class="pi pi-check" style="color: green"></i>
                </td>
                <td v-else>
                  <a
                    href="#"
                    @click="confirmChangeCheck(sb, 'NOT APPLICABLE')"
                    v-if="hasPermission('restrict')"
                    ><i class="pi pi-circle check"></i
                  ></a>
                </td>
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
import { useAuthStore } from "../store/auth";
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

    const authStore = useAuthStore();

    function hasPermission(permission: "allowed" | "restrict"): boolean {
      const authorization = sessionStorage.getItem("authorization");
      return authStore.hasPermission(permission, authorization);
    }

    const confirmChangeCheck = async (sb: ServiceBulletin, status: string) => {
      try {
        const currentStatus = sb.status;
        const futureStatus = status;

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
          const authToken = sessionStorage.getItem("authToken");
          const config = {
            headers: {
              authorization: authToken,
            },
          };
          await axios.post(
            "/update/bulletin",
            {
              serviceBulletinUpdateDto: [
                {
                  bulletin_service_name: sb.name,
                  part: sb.part,
                  status: futureStatus,
                },
              ],
              chassi_id: props.chassi,
            },
            config
          );

          Swal.fire("Saved!", "", "success");
          // Reload data or update specific item in the list
          loadData();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error occurred", "", "error");
      }
    };

    const loadData = async () => {
      try {
        isLoading.value = true;
        const authToken = sessionStorage.getItem("authToken");
        const config = {
          headers: {
            authorization: authToken,
          },
        };
        const response = await axios.get(
          "/bulletin/listar/" + props.chassi,
          config
        );
        serviceBulletins.value = response.data.map((sb: any) => ({
          name: sb.service_bulleti_name,
          part: sb.part,
          status: sb.status,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(loadData);

    return {
      serviceBulletins,
      authStore,
      hasPermission,
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
