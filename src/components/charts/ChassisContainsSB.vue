<template>
  <div class="chart-section">
    <p class="subtitle is-5">Chassis Contain SBs</p>
    <div>
      <label for="sbSelect" class="label">Select Service Bulletin: </label>
      <div class="select">
        <select id="sbSelect" v-model="selectedSBPart" @change="updateChart">
          <option disabled value="">Please select</option>
          <option v-for="sb in serviceBulletins" :key="sb.name" :value="sb">{{ sb.name }} / {{ sb.part }}</option>
        </select>
      </div>
    </div>
    <div v-if="isLoading">
      <Loading />
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div v-if="chassisList.length > 0">
      <p>Chassis containing SB {{ selectedSBPart.name }} / {{ selectedSBPart.part }}: </p>
      <ul>
        <li v-for="chassis in chassisList" :key="chassis">{{ chassis.chassi }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import Loading from '../Loading.vue';
import axios from 'axios';

export default {
  name: 'ChassisContainsSBChart',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      selectedSBPart: '',
      serviceBulletins: [],
      chart: null,
      chassisList: [],
    };
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.initializeChart();
  },
  methods: {
    async loadData() {
      try {
        const authToken = sessionStorage.getItem('authToken');
        const config = {
          headers: {
            authorization: authToken,
          },
        };
        const response = await axios.get('/bulletin/list/all', config);

        this.serviceBulletins = response.data.map((bulletin) => ({
          name: bulletin.service_bulletin_name,
          part: bulletin.service_bulletin_part,
        }));
      } catch (error) {
        console.error(error);
      }
    },
    initializeChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      const mockedData = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
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
      if (!this.selectedSBPart || !this.$refs.chartCanvas) {
        return;
      }

      this.isLoading = true;

      const authToken = sessionStorage.getItem('authToken');
      const configToken = {
        headers: {
          authorization: authToken,
        },
      };

      const selectedSB = this.selectedSBPart.name;
      const selectedPart = this.selectedSBPart.part;

      const url = `/chassi/countchassi/${encodeURIComponent(selectedSB)}/${encodeURIComponent(selectedPart)}`;

      axios
        .get(url, configToken)
        .then((response) => {
          const { chassis, count_chassi, serviceBulletin, part } = response.data;

          const chartData = {
            labels: [`Chassis with SB ${serviceBulletin} / ${part}`, `Chassis without SB ${serviceBulletin} / ${part}`],
            datasets: [
              {
                //data: [count_chassi, chassis.length - count_chassi],
                data: [count_chassi, 8],
                backgroundColor: ['#FF6384', '#36A2EB'],
              },
            ],
          };

          if (this.chart) {
            this.chart.destroy();
          }

          
          const config = {
            type: 'pie',
            data: chartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          };
          
          const ctx = this.$refs.chartCanvas.getContext('2d');
          this.chart = new Chart(ctx, config);
          this.chassisList = chassis;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },
  },
};
</script>