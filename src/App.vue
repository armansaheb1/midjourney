<template>
  <router-view />

  <vue-final-modal style="width:100% ; background:none; z-index: 1000" v-model="$store.state.showModal">
    <div @click="$store.state.showModal = false"
      style="position:absolute; width: 100%; height: 100%; top:0;left: 0; z-index: 1">

    </div>
    <div style="; overflow: auto;max-height: 90%;" class="login-card">
      <login />
    </div>
  </vue-final-modal>
</template>

<script>
import axios from 'axios'
import login from './components/Login2.vue'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import store from '@/store/index.js';

export default {
  name: '',
  components: {
    VueFinalModal,
    login
  },
  beforeCreate() {
    store.commit('initializeStore')

    const token = store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
      store.state.isAuthenticated = true
    } else {
      axios.defaults.headers.common['Authorization'] = ""
      store.state.isAuthenticated = false
    }
  },
  mounted() {
    this.get_location()
    this.check_auth()
  },
  methods: {
    async check_auth() {
      if (this.$store.state.isAuthenticated) {
        await axios
          .get('check-verify')
          .then(response => response.data)
          .then(response => {
            
          }).catch(()=>{
            const toPath = this.$route.go || '/verify-phone'
            this.$router.push(toPath)
          })

      }
    },
    async get_by(ip) {
      await axios
        .get(`https://api.ipdata.co/${ip}?api-key=56beca4dbc6e2e75d246e5fbd1c5aaf574fd05babedc9248e53f7ba8&fields=ip,is_eu,city,region,region_code,country_name,country_code,continent_name,continent_code,latitude,longitude,postal,calling_code,flag,emoji_flag,emoji_unicode`)
        .then(response => {
          if (response.data.country_code !== 'IR') {
            store.state.language = false
            localStorage.setItem('farsi', false)
          } else {
            store.state.language = true
            localStorage.setItem('farsi', true)
          }
        }).catch(() => {
          store.state.language = false
          localStorage.setItem('farsi', false)
        })
    },
    async get_location() {
      if (!store.state.language) {
        await axios
          .get('https://api.ipdata.co/v1/ip/?api-key=56beca4dbc6e2e75d246e5fbd1c5aaf574fd05babedc9248e53f7ba8')
          .then(response => {
            var ip = response.data
            this.get_by(ip)
          }).catch(() => {
            console.log('?')
            store.state.language = false
          })
      }
    }
  }

}
</script>


<style>
@font-face {
  font-family: 'Modam';
  src: url('../public/ModamWeb-Regular.woff2');
}

* {
  font-size: 100%;
  font-family: 'Modam';
}

button,
div,
span {
  font-size: 100%;
  font-family: 'Modam';
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #444;
}

nav a.router-link-exact-active {
  color: #42b983;
}

::-webkit-scrollbar {
  width: 0px;
}

input::file-selector-button {
  font-weight: bold;
  background-color: CCCCCC;
  color: black;
  padding: 0.5em;
  border: none;
  border-radius: 5px;
}
</style>
