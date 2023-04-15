import { createApp } from 'vue'
//import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const app = createApp(App)
const pinia = createPinia();

app.use(router)
app.use(pinia)
app.mount('#app')