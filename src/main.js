import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
axios.defaults.baseURL = 'http://172.93.231.240'

createApp(App).use(store).use(router).mount('#app')
