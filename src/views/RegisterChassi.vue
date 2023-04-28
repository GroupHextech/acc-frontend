<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Add Chassis</h1>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/chassis">chassis</router-link></li>
            <li><router-link to="/chassis/register">register</router-link></li>
          </ul>
        </nav>
        <!-- All content here -->
        <div class="block">
          <form @submit.prevent="sendData" ref="form">
            <div class="dropzone-container box has-background-white-bis" @dragover="dragover" @dragleave="dragleave"
              @drop="drop">
              <input type="file" multiple name="file" id="fileInput" class="hidden-input" @change="onChange" ref="file"
                accept=".csv,.xlsx" />
  
              <label for="fileInput" class="file-label">
                <div v-if="isDragging" class="file-label-text">Drag files here</div>
                <div v-else class="file-label-text">
                  Drag files here or <u>click here</u> to upload
                </div>
              </label>
  
              <div class="preview-container mt-4" v-if="files.length">
                <div v-for="file in files" :key="file.name" class="preview-card">
                  <div>
                    <img alt="excel-logo" class="preview-img" :src="excel" />
                    <p>
                      {{ file.name }}
                      ({{ Math.round(file.size / 1000) + "kb" }})
                    </p>
                  </div>
                  <div>
                    <button class="ml-2 btn btn-primary" type="button" @click="remove(files.indexOf(file))"
                      title="Remove file">
                      <i class="pi pi-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button v-if="this.files.length !== 0" type="submit" class="button is-link">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="js">
import * as XLSX from 'xlsx';
import axios from 'axios';
export default {
  data() {
    return {
      isDragging: false,
      files: [],
      filesJSON: [],
      excel: '/src/assets/excel-logo.png'
    };
  },
  mounted() {
    this.$refs.file.addEventListener('change', event => {
      this.files = Array.from(event.target.files)
    })
  },
  methods: {
    onChange() {
      this.files = this.$refs.file.files;
      for (const element of this.files) {
        const file = element;
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(worksheet);
          // objeto de mapeamento de nomes de chave original para o novo nome de chave
          const keyMap = {
            "Boletim de serviço": "bulletin_service",
            "Status": "Status",
          };
          const header = Object.keys(json[0]); // obter as chaves do primeiro objeto como o cabeçalho
          const chassisValue = worksheet['C2'].v; // obter o valor da célula C2 (segunda linha, terceira coluna)
          const newData = [];
          json.forEach((row, index) => {
            // copiar o valor de "Chassis" para todas as linhas
            const newRow = {};
            header.forEach(key => {
              newRow[keyMap[key] || key] = row[key];
            });
            if (index === 0) {
              // remover a chave "Chassis " com espaço
              delete newRow["Chassis "];
              delete newRow["Chassis"];
            }
            newRow["chassis"] = chassisValue;
            newData.push(newRow);
          });
          this.filesJSON.push(newData);
        };
        reader.readAsBinaryString(file);
      };

    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
    },
    sendData() {
      if (this.files.length > 0) {

        this.filesJSON.forEach(data => {
          const jsonData = JSON.stringify(data);
          console.log(jsonData);
          // enviar arquivos para o servidor
          axios.post('http://localhost:8080/register/bulletin', jsonData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        });
        // resetar o valor do input
        this.$refs.file.value = null;
        this.files = [];
        this.filesJSON = [];
        alert("Data sent to database succesfully!");
      }
    },
  },
};
</script>

<style scoped>
.title {
  text-align: start;
}

.dropzone-container {
  border: 2px dashed #485fc7;
  border-radius: 5px;
  padding: 2rem;
  margin: 2rem;
  text-align: center;
}

.dropzone-container .file-label {
  cursor: pointer;
  display: block;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.dropzone-container .file-label-text {
  color: #bbb;
}

.dropzone-container .file-label-text u {
  color: #485fc7;
  text-decoration: none;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.preview-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  margin: 0.5rem;
  padding: 0.5rem;
  width: 20rem;
}

.preview-card img {
  height: 3rem;
  margin-right: 0.5rem;
}

.preview-card button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: auto;
}

.preview-card button:hover {
  color: #ff3b30;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hidden-input {
  display: none;
}

.file-label {
  cursor: pointer;
}

.file-label-text {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}

.file-label-text u {
  color: blue;
  text-decoration: none;
}

.preview-img {
  max-width: 100px;
  margin-right: 10px;
}</style>
