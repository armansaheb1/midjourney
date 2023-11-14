<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div
      style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
      <div class="card" style="overflow: auto;">
        <div class="card-header" style="padding: 0">
          <div style="width: 100%">
            <div style="float:left;width:10%">
              #
            </div>
            <div style="float:left;width:45%">
              Username
            </div>
            <div style="float:left;width:45%">
              Balance
            </div>
          </div>
        </div>
        <div class="">
          <div v-for="(item, idx) in users" v-bind:key="idx" style="height: 50px; width: 100%">
            <div style="padding: 20px;float:left;width:10%">
              {{ idx + 1 }}
            </div>
            <div style="padding: 20px;float:left;width:45%">
              {{ item.username }}
            </div>
            <div style="padding: 20px;float:left;width:45%">
              <button class="btn btn-dark" @click="showbalance(item.id)">Show Balance</button>

            </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    CircleProgress
  },
  data() {
    return {
      users: [],
      vars: []
    }
  },
  mounted() {
    this.get_users()
  },
  methods: {
    text(text) {
      this.$swal(`<div class="" style="display: flex;"></div><h6>${text}</h6>`)
    },
    async get_users() {
      var id = this.$route.params.id
      await axios
        .get(`/adminpanel/users`)
        .then(response => response.data)
        .then(response => {
          this.users = response
          console.log(response)
        })

    },
    async showbalance(id) {
      await axios
        .post(`/adminpanel/charge`, { id: id })
        .then(response => response.data)
        .then(response => {
          console.log(response)
          this.$swal(`<div class="" style="display: flex;"></div><h6>${response} Coins</h6>`)
        })
    }
  }
}
</script>
<style>
a {
  text-decoration: none;
  color: #444
}
</style>