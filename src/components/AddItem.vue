<template>
  <div class="add-item">
    <p class="title is-4">Add item</p>
    <!-- All content here -->
    <div class="container">
      <div class="control block">
        <input class="input" type="text" placeholder="Item name" />
      </div>
      <div class="container" id="calculadora">
        <div class="columns is-multiline is-mobile">
          <div class="column is-9">
            <input type="text" class="input is-fullwidth" v-model="operation" />
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
                  class="button is-link is-fullwidth"
                  ><span v-if="key === '*'">AND</span>
                  <span v-else-if="key === '+'">OR</span>
                  <span v-else>{{ key }}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="column is-full">
            <button
              class="button is-success is-medium is-fullwidth"
              @click="calcular()"
            >
              Finish
            </button>
          </div>
        </div>
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
      } finally {
      }
    },
    addValue: function (element: any) {
      if (typeof this.operation !== "string") {
        this.clear();
      }
      this.operation += element;
    },
    calcular: function () {
      var result = eval(this.operation);
      this.operation = result;
    },
    clear: function () {
      this.operation = "";
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
#calculadora {
  background-color: #ddd;
  border-radius: 10px;
  padding: 25px;
}
</style>
