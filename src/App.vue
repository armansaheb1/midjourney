<template>
  <router-view />
</template>

<script>
import axios from 'axios'

export default {
  name: '',
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
      this.$store.state.isAuthenticated = true
    } else {
      axios.defaults.headers.common['Authorization'] = ""
      this.$store.state.isAuthenticated = false
    }
  }
}
</script>


<style>
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
</style>
