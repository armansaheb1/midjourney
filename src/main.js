import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios';
import 'sweetalert2/dist/sweetalert2.min.css'
import ScriptX from 'vue-scriptx'
import Adsense from 'vue-google-adsense/dist/Adsense.min.js'

axios.defaults.baseURL = 'https://limoo.ai/api/'

createApp(App).use(store).use(router).use(VueSweetalert2).use(ScriptX).use(Adsense).mount('#app')
