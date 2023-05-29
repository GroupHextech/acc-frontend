<template>
  <div class="chart-container">
    <p class="subtitle is-5">Incorporated Items by Chassi</p>
    <div v-if="isLoading">
      <loading />
    </div>
    <canvas id="incorpItemsByChassiChart"></canvas>
  </div>
</template>

<script lang="js">
import Chart from 'chart.js/auto'
import Loading from '../Loading.vue'

export default {
  name: 'IncorpItemsByChassiChart',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    // Mocked data for testing
    const mockData = {
      labels: ['Chassi A', 'Chassi B', 'Chassi C', 'Chassi D'],
      datasets: [{
        label: 'Incorporated Items',
        data: [8, 12, 6, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33D321'],
      }]
    };

    const config = {
      type: 'bar',
      data: mockData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };
    const ctx = document.getElementById('incorpItemsByChassiChart');
    const chart = new Chart(ctx, config);
    this.isLoading = false;
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