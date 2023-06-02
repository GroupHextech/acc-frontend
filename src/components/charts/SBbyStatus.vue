<template>
  <div class="chart-container">
    <p class="subtitle is-5">Service Bulletins by Status</p>
    <div v-if="isLoading">
      <loading />
    </div>
    <canvas class="block" id="myChart"></canvas>
    <button class="button is-link is-light" @click="exportCSV" v-if="!isLoading">
      Export to CSV
    </button>
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
      chart: null,
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
        this.chart = myChart;
        this.isLoading = false;
      })
      .catch(error => console.log(error));
  },
  methods: {
    exportCSV() {
      // Obtém os dados do gráfico
      const chartData = this.chart.config.data;

      // Cria uma matriz para armazenar os dados do CSV
      const csvData = [];

      // Adiciona o cabeçalho do CSV
      const headers = ['Chassis', 'Incorporated SB', 'Applicable SB', 'Not Applicable SB'];
      csvData.push(headers);

      // Adiciona cada linha de dados do gráfico ao CSV
      for (let i = 0; i < chartData.labels.length; i++) {
        const label = chartData.labels[i];
        const sbValue = chartData.datasets[0].data[i];
        const applicableValue = chartData.datasets[1].data[i];
        const notApplicableValue = chartData.datasets[2].data[i];
        csvData.push([label, sbValue.toString(), applicableValue.toString(), notApplicableValue.toString()]);
      }

      // Cria o conteúdo do arquivo CSV
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvData.forEach(row => {
        const csvRow = row.map(value => `"${value}"`).join(';');
        csvContent += csvRow + '\r\n';
      });

      // Cria um elemento de link para fazer o download do arquivo CSV
      const link = document.createElement('a');
      link.setAttribute('href', encodeURI(csvContent));
      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = `Service_Bulletins_by_Status_${currentDate}.csv`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);

      // Simula um clique no link para iniciar o download do arquivo CSV
      link.click();

      // Remove o elemento de link
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped>
.chart-container {
  max-width: 600px;
  /* Defina a largura máxima do contêiner do gráfico */
  width: 100%;
  /* Ocupa todo o espaço disponível */
  margin: 0 auto;
  /* Centraliza o contêiner horizontalmente */
}</style>