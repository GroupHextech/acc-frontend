<template>
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
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th class="col-1"></th>
                                <th class="col2">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.id">

                                <td id="item-status" v-if="item.itemStatus === true">
                                    <i class="pi pi-check" style="color: green"></i>
                                </td>
                                <td id="item-status" v-else>
                                    <i class="pi pi-times" style="color: red"></i>
                                </td>
                                <td class="col2" id="item-id">{{ item.id }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  props: {
    chassi: {
      type: String,
      required: true,
    },
  },
  
  setup(props) {
    const items = reactive([
      {
        id: 'Airbag',
        itemStatus: true
      },
      {
        id: 'Volante',
        itemStatus: true
      },
      {
        id: 'Vidro elétrico',
        itemStatus: false
      },
      {
        id: 'Freio à disco',
        itemStatus: true
      }
    ]);

    return {
      items
    }
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