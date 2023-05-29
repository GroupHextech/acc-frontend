<template>
  <div class="chart-container">
    <p class="subtitle is-5">Service Bulletins by Status</p>
    <div v-if="isLoading">
      <loading />
    </div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script lang="js">
import Chart from 'chart.js/auto'
import axios from 'axios'
import Loading from '../Loading.vue'

export default {
  name: 'SBbyStatusChart',
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
    axios.get('/chart/sb-by-status')
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
      const ctx = document.getElementById('myChart');
      const myChart = new Chart(ctx, config);
      myChart;
      this.isLoading = false;
    })
    .catch(error => console.log(error));
  }
}
</script>

<style scoped>
.chart-container {
  max-width: 600px; /* Defina a largura máxima do contêiner do gráfico */
  width: 100%; /* Ocupa todo o espaço disponível */
  margin: 0 auto; /* Centraliza o contêiner horizontalmente */
}
</style>