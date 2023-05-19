<template>
  <div class="add-item">
    <p class="title is-4">Add item</p>
    <!-- All content here -->
    <div class="container">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input class="input is-link" type="text" placeholder="Item name" v-model="itemName" />
        </p>
        <p class="control">
          <i class="button is-link is-outlined pi pi-angle-down" v-on:click="showCalculator = true"></i>
        </p>
      </div>
      <div class="container block" id="calculator" v-if="showCalculator">
        <p class="subtitle">Add formula</p>
        <div class="columns is-multiline is-mobile">
          <div class="column is-9">
            <textarea class="textarea" disabled v-model="operation" rows="2" cols="50" autoresize></textarea>
          </div>
          <div class="column is-3">
            <button class="button is-danger is-fullwidth" @click="clear()">
              Clear
            </button>
          </div>
          <div class="column is-12">
            <div class="field has-addons">
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select name="service-bulletin" v-model="selectedServiceBulletin"
                    @change="addValue(selectedServiceBulletin)">
                    <option v-for="sb in serviceBulletins" v-bind:value="sb.service_bulleti_name">
                      {{ sb.service_bulleti_name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-12">
            <div class="columns is-multiline is-mobile">
              <div class="column is-3" v-for="key in operator" :key="key">
                <a @click="addValue(key)" href="#" class="button is-primary is-fullwidth"><span
                    v-if="key === ' * '">AND</span>
                  <span v-else-if="key === ' + '">OR</span>
                  <span v-else>{{ key }}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="column is-full">
            <button class="button is-link" @click="calculate()">Finish</button>
          </div>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <p class="control">
          <a class="button is-link" @click="submitItem"> Submit </a>
        </p>
        <p class="control">
          <a class="button is-light" @click="closeModal"> Cancel </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { ServiceBulletin } from "../types";
export default {
  name: "AddItem",
  data() {
    return {
      itemName: "",
      operator: [" * ", " + ", "(", ")"],
      operation: "",
      result: null,
      serviceBulletins: [] as ServiceBulletin[],
      // serviceBulletins: [
      //   { service_bulleti_name: "SB-111-111-111" },
      //   { service_bulleti_name: "SB-111-111-112" },
      //   { service_bulleti_name: "SB-111-111-113" },
      //   { service_bulleti_name: "SB-111-111-114" },
      // ] as ServiceBulletin[],
      showCalculator: false,
      selectedServiceBulletin: null,
    };
  },
  created() {
    this.loadData();
  },
  computed: {},
  methods: {
    async loadData() {
      try {
        const authToken = sessionStorage.getItem("authToken");
        const config = {
          headers: {
            authorization: authToken,
          },
        };
        const response = await axios.get("/bulletin/list/all", config);
        this.serviceBulletins = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async submitItem() {
      try {
        const authToken = sessionStorage.getItem("authToken");
        const config = {
          headers: {
            authorization: authToken,
          },
        };

        const itemName = this.itemName;
        let formula: string = this.operation;

        formula = this.replaceOperators(formula);

        const data = {
          itemName: itemName,
          formula: formula
        };

        const response = await axios.post("/register/formula", data, config);
        console.log(response);

      } catch (error) {
        console.error(error);
      }
    },

    addValue: function (element: any) {
      if (typeof this.operation !== "string") {
        this.clear();
      }
      this.operation += element;
    },
    calculate: function () {
      const formula = this.operation;
      this.replaceOperators(formula);
    },

    replaceOperators: function (formula: any) {
      // Change all operators '*' for 'and'
      formula = formula.replace(/\*/g, "and");

      // Change all operators '+' for 'or'
      formula = formula.replace(/\+/g, "or");

      return formula;
    },

    clear: function () {
      this.operation = "";
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.add-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

#calculator {
  /*background-color: #eff1fa;*/
  border: 1px #dbdbdb solid;
  border-radius: 10px;
  padding: 1rem;
}

.textarea[disabled] {
  border-color: #dbdbdb;
}
</style>
