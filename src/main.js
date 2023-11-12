import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios';
import 'sweetalert2/dist/sweetalert2.min.css'

axios.defaults.baseURL = 'http://172.93.231.240/api/'

createApp(App).use(store).use(router).use(VueSweetalert2).mount('#app')
