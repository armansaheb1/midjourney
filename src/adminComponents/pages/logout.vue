<template>
<div></div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app-layout-navbar',
  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.logout()
  },
  methods: {
    logout () {
      axios.defaults.headers.common.Authorization = ''
      localStorage.removeItem('token')
      this.$store.commit('removeToken')
      this.$router.push('/')
      setTimeout(() => {
        location.reload()
      }, 500);
    }
  }
}
</script>
