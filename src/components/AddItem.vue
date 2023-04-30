<template>
  <div class="add-item">
    <p class="title is-4">Add item</p>
    <!-- All content here -->
    <div class="container">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input class="input is-link" type="text" placeholder="Item name" />
        </p>
        <p class="control">
          <i
            class="button is-link is-outlined pi pi-angle-down"
            v-on:click="showCalculator = true"
          ></i>
        </p>
      </div>
      <div class="container block" id="calculator" v-if="showCalculator">
        <p class="subtitle">Add formula</p>
        <div class="columns is-multiline is-mobile">
          <div class="column is-9">
            <input
              type="text"
              class="input is-fullwidth"
              disabled
              v-model="operation"
            />
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
                  <select name="service-bulletin">
                    <option
                      v-for="sb in serviceBulletins"
                      v-bind:value="sb.service_bulleti_name"
                    >
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
                <a
                  @click="addValue(key)"
                  href="#"
                  class="button is-primary is-fullwidth"
                  ><span v-if="key === '*'">AND</span>
                  <span v-else-if="key === '+'">OR</span>
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
          <a class="button is-link"> Submit </a>
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
import { ServiceBulletins } from "../types";
export default {
  name: "AddItem",
  data() {
    return {
      operator: ["*", "+", "(", ")"],
      operation: "",
      result: null,
      serviceBulletins: [] as ServiceBulletins[],
      showCalculator: false,
    };
  },
  computed: {},
  methods: {
    async loadData() {
      try {
        const response = await axios.get("/bulletin/list/all");
        this.serviceBulletins = response.data;
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

      // --- Old calc result ---
      //let result = eval(this.operation);
      //this.operation = result;
    },

    replaceOperators: function (formula: any) {
      // Substitui todos os operadores * por &&
      formula = formula.replace(/\*/g, "&&");

      // Substitui todos os operadores + por ||
      formula = formula.replace(/\+/g, "||");

      return console.log(formula);
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
.input[disabled] {
  border-color: #dbdbdb;
}
</style>
