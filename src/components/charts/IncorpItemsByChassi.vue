<template>
  <div class="chart-container">
    <p class="subtitle is-5">Incorporated Items by Chassi</p>
    <div v-if="isLoading">
      <loading />
    </div>
    <canvas class="block" id="incorpItemsByChassiChart"></canvas>
    <button class="button is-link is-light" @click="exportCSV" v-if="!isLoading">
      Export to CSV
    </button>
  </div>
</template>

<script lang="js">
import Chart from 'chart.js/auto'
import Loading from '../Loading.vue'
import axios from 'axios';

export default {
  name: 'IncorpItemsByChassiChart',
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
    const authToken = sessionStorage.getItem("authToken");
    const configToken = {
      headers: {
        authorization: authToken,
      },
    };
    axios.get('/item/contagem', configToken)
      .then(response => {
        const data = response.data;
        console.log(data);

        const chartData = {
          labels: data.map(item => item.chassi),
          datasets: [{
            label: 'Incorporated Items',
            data: data.map(item => item.count_item),
            backgroundColor: '#33D321',
          }]
        };

        const config = {
          type: 'bar',
          data: chartData,
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
        this.chart = chart;
        this.isLoading = false;
      })
      .catch(error => {
        console.error(error);
        this.isLoading = false;
      });
  },
  methods: {
    exportCSV() {
      // Obtém os dados do gráfico
      const chartData = this.chart.config.data;

      // Cria uma matriz para armazenar os dados do CSV
      const csvData = [];

      // Adiciona o cabeçalho do CSV
      const headers = ['Chassi', 'Incorporated Items'];
      csvData.push(headers);

      // Adiciona cada linha de dados do gráfico ao CSV
      for (let i = 0; i < chartData.labels.length; i++) {
        const label = chartData.labels[i];
        const value = chartData.datasets[0].data[i];
        csvData.push([label, value.toString()]);
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
      const fileName = `Items_by_Chassi_${currentDate}.csv`;
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
}
</style>
