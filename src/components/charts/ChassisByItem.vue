<template>
  <div class="chart-container">
    <p class="subtitle is-5">Chassis by Item</p>
    <div v-if="isLoading">
      <loading />
    </div>
    <canvas id="chassisByItemChart"></canvas>
  </div>
</template>

<script lang="js">
import Chart from 'chart.js/auto'
import Loading from '../Loading.vue'

export default {
  name: 'ChassisByItemChart',
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
      labels: ['Engine', 'Tires', 'Brakes', 'Battery'],
      datasets: [{
        label: 'Chassis Count',
        data: [25, 18, 12, 30],
        backgroundColor: '#FFCE56',
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
    const ctx = document.getElementById('chassisByItemChart');
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