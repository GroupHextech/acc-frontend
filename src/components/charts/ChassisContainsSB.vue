<template>
  <div class="chart-section">
    <p class="subtitle is-5">Chassis Contain SBs</p>
    <div>
      <label for="sbSelect">Select Service Bulletin:</label>
      <select id="sbSelect" v-model="selectedSB" @change="updateChart">
        <option disabled value="">Please select</option>
        <option v-for="sb in serviceBulletins" :key="sb.id" :value="sb.id">{{ sb.title }}</option>
      </select>
    </div>
    <div v-if="isLoading">
      <Loading />
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div v-if="chassisList.length > 0">
      <p>Chassis containing SB {{ selectedSB }}:</p>
      <ul>
        <li v-for="chassis in chassisList" :key="chassis">{{ chassis }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="js">
import Chart from 'chart.js/auto'
import Loading from '../Loading.vue'

export default {
  name: 'ChassisContainsSBChart',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      selectedSB: '12345', // Define o ID do Service Bulletin padrão
      serviceBulletins: [
        { id: '12345', title: 'SB 12345' },
        { id: '67890', title: 'SB 67890' },
        { id: '98765', title: 'SB 98765' }
      ],
      chart: null, // Propriedade para armazenar a instância do gráfico
      chassisList: [], // Array para armazenar a lista de chassis
    }
  },
  mounted() {
    // Inicializa o gráfico uma vez na montagem do componente
    this.initializeChart();
  },
  methods: {
    initializeChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');

      // Mocked data para o gráfico inicial
      const mockedData = {
        labels: ['Chassis with SB ' + this.selectedSB, 'Chassis without SB ' + this.selectedSB],
        datasets: [{
          data: [8, 22],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }]
      };

      const config = {
        type: 'pie',
        data: mockedData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };

      this.chart = new Chart(ctx, config);
    },
    updateChart() {
      if (!this.selectedSB) {
        return;
      }

      this.isLoading = true; // Define isLoading como true antes de buscar os dados ou atualizar o gráfico

      // Simula uma chamada de API com um tempo limite
      setTimeout(() => {
        // Mocked data for tests
        const mockedData = {
          labels: ['Chassis with SB ' + this.selectedSB, 'Chassis without SB ' + this.selectedSB],
          datasets: [{
            data: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
            backgroundColor: ['#FF6384', '#36A2EB'],
          }]
        };

        if (this.chart) {
          this.chart.destroy(); // Destrói a instância existente do gráfico antes de criar um novo
        }

        const ctx = this.$refs.chartCanvas.getContext('2d');

        const config = {
          type: 'pie',
          data: mockedData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        };

        this.chart = new Chart(ctx, config);

        this.updateChassisList();

        this.isLoading = false; // Define isLoading como false após atualizar o gráfico
      }, 1000); // Simulated delay of 1 second
    },
    updateChassisList() {
      // Simula uma chamada de API para obter a lista de chassis
      // com base no SB selecionado
      setTimeout(() => {
        // Mocked data para testes
        const chassisList = [
          'Chassis A',
          'Chassis B',
          'Chassis C'
        ];

        this.chassisList = chassisList;
      }, 500); // Simulated delay of 0.5 seconds
    }
  }
}
</script>