<template >
  <div class="container">
    <h2 class="page-title">Chassi {{ chassi }}</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">chassis</a></li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ chassi }}
        </li>
      </ol>
    </nav>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Service Bulletins</th>
            <th>Incorporated</th>
            <th>Not Applicable</th>
            <th>Applicable</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sb in serviceBulletins" :key="sb.id">
            <th>{{ sb.id }}</th>
            <!-- Incorporated -->
            <td v-if="sb.incorporated === true">
              <i class="pi pi-check" style="color: green"></i>
            </td>
            <td v-else-if="sb.applicable === true">
              <a href="#" @click="confirmChangeCheck(sb)"><i class="pi pi-circle check"></i></a>
            </td>
            <td v-else></td>
            <!-- Not Applicable -->
            <td v-if="sb.notApplicable === true">
              <i class="pi pi-check" style="color: green"></i>
            </td>
            <td v-else></td>
            <!-- Applicable -->
            <td v-if="sb.applicable === true">
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
import { defineComponent, reactive } from "vue";
import Swal from "sweetalert2";

export default defineComponent({
  props: {
    chassi: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const serviceBulletins = reactive([
      {
        id: "SB FAT-00-CG10",
        incorporated: true,
        notApplicable: false,
        applicable: false,
      },
      {
        id: "SB FAT-00-CG11",
        incorporated: false,
        notApplicable: true,
        applicable: false,
      },
      {
        id: "SB FAT-00-CG12",
        incorporated: true,
        notApplicable: false,
        applicable: false,
      },
      {
        id: "SB FAT-00-CG13",
        incorporated: false,
        notApplicable: false,
        applicable: true,
      },
    ]);

    const confirmChangeCheck = (sb: any) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to change the status to 'Incorporated'?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
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
      serviceBulletins,
      confirmChangeCheck,
      changeCheck,
    };
  },

  methods: {},
});
</script>

<style>
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