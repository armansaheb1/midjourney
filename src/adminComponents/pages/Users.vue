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
            <div style="float:left;width:20%">
              Username
            </div>
            <div style="float:left;width:30%">
              Balance
            </div>
            <div style="float:left;width:40%">
              gpt
            </div>
          </div>
        </div>
        <div class="">
          <div v-for="(item, idx) in users" v-bind:key="idx" style="width: 100%">
            <div style="padding: 20px;float:left;width:10%">
              {{ idx + 1 }}
            </div>
            <div style="padding: 20px;float:left;width:30%">
              {{ item.username }}
            </div>
            <div style="padding: 20px;float:left;width:30%">
              <h6>Current Balance: {{ item.balance }}</h6>
              <input v-model="amount[idx]" type="text" class="form-control" placeholder="amount">

              <button @click="increase(item.id, idx)" class="btn btn-dark">+</button> <button
                @click="decrease(item.id, idx)" class="btn btn-dark">-</button>

            </div>
            <div style="padding: 20px;float:left;width:20%">

              <button v-if="!item.permissions.gpt" @click="enable(item.id)" class="btn btn-dark">Enable</button>
              <button v-else @click="disable(item.id)" class="btn btn-dark">Disable</button>
            </div>
            <hr style="width: 100%">
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
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    CircleProgress,
    VueFinalModal
  },
  data() {
    return {
      users: [],
      vars: [],
      balance: 0,
      showModal: false,
      id: '',
      act: '',
      amount: []
    }
  },
  mounted() {
    this.get_users()
  },
  methods: {
    text(text) {
      this.$swal(`<div class="" style="display: flex;"></div><h6>${text}</h6>`)
    },
    async enable(id) {
      await axios
        .post(`/adminpanel/gptp/${id}`)
        .then(response => response.data)
        .then(response => {
          this.users = response
          for (var item in response) {
            this.amount.push(0)
          }

        })

    },
    async disable(id) {
      await axios
        .put(`/adminpanel/gptp/${id}`)
        .then(response => response.data)
        .then(response => {
          this.users = response
          for (var item in response) {
            this.amount.push(0)
          }

        })

    },

    async get_users() {
      var id = this.$route.params.id
      await axios
        .get(`/adminpanel/users`)
        .then(response => response.data)
        .then(response => {
          this.users = response
          for (var item in response) {
            this.amount.push(0)
          }

        })

    },
    async showbalance(id) {
      await axios
        .post(`/adminpanel/charge`, { id: id })
        .then(response => response.data)
        .then(response => {

          this.balance = response
          this.showModal = true
          this.id = id
        })
    },
    async increase(id, idx) {
      await axios
        .put(`/adminpanel/charge`, { id: id, act: '+', amount: this.amount[idx] })
        .then(response => response.data)
        .then(response => {

          this.users[idx].balance = response
        })
    },
    async decrease(id, idx) {
      await axios
        .put(`/adminpanel/charge`, { id: id, act: '-', amount: this.amount[idx] })
        .then(response => response.data)
        .then(response => {

          this.users[idx].balance = response
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