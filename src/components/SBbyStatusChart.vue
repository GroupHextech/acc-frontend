<template>
  <div>
    <p class="subtitle is-5">Service Bulletins by Status</p>
    <canvas id="myChart" width="400" height="100"></canvas>
  </div>
</template>

<script lang="js">
import Chart from 'chart.js/auto'
import axios from 'axios'

export default {
  name: 'SBbyStatusChart',
  props: {
    msg: String
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
    })
    .catch(error => console.log(error));
  }
}
</script>
