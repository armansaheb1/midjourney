<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div class="card">
      <div class="card-header" style="padding: 0">
        <h5>Add Bonus</h5>
      </div>
      <br><br>
      <div class="card-body">
        <form @submit.prevent="submit()">
          <label>User</label>
          <input class="form-control" type="text" v-model="searchtxt" @input="search()">
          <div v-if="searchtxt.length" style="max-height: 145px;overflow-y: auto;" class=form-control>
            <button :style="[item.id == selected ? { background: 'lightgrey' } : { background: 'white' }]"
              @click="selected = item.id" type="button" style="; margin: 5px" class="form-control" v-for="item in users"
              v-bind:key="item" :value="item.id">
              {{ item.username }}
            </button>
          </div> <br>
          <label>Amount</label>
          <input required v-model="price" placeholder="Amount" class="form-control"> <br>
          <label>Code</label>
          <input v-model="coin" placeholder="Code" class="form-control"> <br>

          <button class="btn btn-dark">Submit</button>
        </form>
      </div>
    </div>
    <br><br>
    <div
      style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
      <div class="card" style="overflow: auto;">
        <div class="card-header" style="padding: 0">
          <div style="width: 100%">
            <div style="float:left;width:25%">
              User
            </div>
            <div style="float:left;width:25%">
              Coins
            </div>
            <div style="float:left;width:25%">
              Code
            </div>
            <div style="float:left;width:25%">
              Operations
            </div>
          </div>
        </div>
        <div class="">
          <div v-for="(item, idx) in plans" v-bind:key="idx" style="width: 100%">
            <div style="padding: 20px;float:left;width:25%">
              {{ item.username }}
            </div>
            <div style="padding: 20px;float:left;width:25%">
              {{ item.amount }}
            </div>
            <div style="padding: 20px;float:left;width:25%">
              {{ item.code }}
            </div>
            <div style="padding: 20px;float:left;width:25%">
              <button @click="deletes(item.id)" class="btn btn-dark">Delete</button>

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
      user: '',
      vars: [],
      balance: 0,
      showModal: false,
      selected: '',
      id: '',
      act: '',
      amount: [],
      plans: [],
      coin: false,
      plan: '',
      searchtxt: '',
      usersback: ''
    }
  },
  mounted() {
    this.get_bonus()
    this.get_users()
  },
  methods: {
    async get_users() {
      var id = this.$route.params.id
      await axios
        .get(`/adminpanel/users`)
        .then(response => response.data)
        .then(response => {
          this.users = response
          this.usersback = response
          for (var item in response) {
            this.amount.push(0)
          }
        })

    },
    async get_bonus() {
      await axios
        .get(`/adminpanel/bonus`)
        .then(response => response.data)
        .then(response => {
          this.plans = response
        })

    },
    text(text) {
      this.$swal(`<div class="" style="display: flex;"></div><h6>${text}</h6>`)
    },
    async submit(id) {
      if (this.coin) {
        await axios
          .post(`/adminpanel/bonus`, { code: this.coin, amount: this.price, user: this.selected })
          .then(response => response.data)
          .then(response => {
            this.plans = response
          })
      } else {
        await axios
          .post(`/adminpanel/bonus`, { amount: this.price, user: this.selected })
          .then(response => response.data)
          .then(response => {
            this.plans = response
          })
      }

    },
    async deletes(id) {
      await axios
        .delete(`/adminpanel/bonus/${id}`)
        .then(response => response.data)
        .then(response => {
          this.plans = response
        })
    },
    search() {
      this.users = []
      for (var item of this.usersback) {
        if (item.username.includes(this.searchtxt)) {
          this.users.push(item)
        }
      }
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