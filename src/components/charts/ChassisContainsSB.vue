<template>
  <div>
    <p class="subtitle is-5">Chassis that contains 'SB...'</p>
    <div v-if="isLoading">
      <loading />
    </div>
    <canvas id="myChart4" width="400" height="100"></canvas>
  </div>
</template>

<script lang="js">
import Chart from 'chart.js/auto';
import axios from 'axios';
import Loading from '../Loading.vue';

export default {
  name: 'ChassisContainsSB',
  props: {
    msg: String
  },
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    axios.get('/chart/sb-by-status') // To change route
    .then(response => {
      const data = {
        labels: response.data.labels,
        datasets: response.data.datasets
      };
      const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };
      const ctx = document.getElementById('myChart4');
      const myChart = new Chart(ctx, config);
      myChart;
      this.isLoading = false;
    })
    .catch(error => console.log(error));
  }
}
</script>
