<template>
  <div class="home" style="text-decoration: none; padding: 5%">
  <div class="card" >
  <div class="card-header" style="padding: 0">
    <h5>Add Package</h5>
  </div>
  <br><br>
  <div class="card-body" >
  <form @submit.prevent="submit()">
    <input required v-model="price" placeholder="Price" class="form-control">  <br>
    <input required v-model="coin" placeholder="Coin" class="form-control">  <br>

    <button class="btn btn-dark">Submit</button>
  </form>
  </div>
  </div>
    <div
      style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
      <div class="card" style="overflow: auto;">
        <div class="card-header" style="padding: 0">
          <div style="width: 100%">
            <div style="float:left;width:25%">
              price
            </div>
            <div style="float:left;width:25%">
              Coins
            </div>
            <div style="float:left;width:50%">
              Operations
            </div>
          </div>
        </div>
        <div class="">
          <div v-for="(item, idx) in plans" v-bind:key="idx" style="width: 100%">
            <div style="padding: 20px;float:left;width:25%">
              {{ item.price }}
            </div>
            <div style="padding: 20px;float:left;width:25%">
              {{ item.coin }}
            </div>
            <div style="padding: 20px;float:left;width:50%">
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
      vars: [],
      balance: 0,
      showModal: false,
      id: '',
      act: '',
      amount: [],
      plans: [],
      coin: '',
      plan: ''
    }
  },
  mounted() {
    this.get_plans()
  },
  methods: {
    async get_plans() {
      await axios
        .get(`/adminpanel/plans`)
        .then(response => response.data)
        .then(response => {
          this.plans = response
        })

    },
    text(text) {
      this.$swal(`<div class="" style="display: flex;"></div><h6>${text}</h6>`)
    },
    async submit(id) {
      await axios
        .post(`/adminpanel/plans`, { coin: this.coin, price: this.price})
        .then(response => response.data)
        .then(response => {
          this.plans = response
        })
    },
    async deletes(id) {
      await axios
        .delete(`/adminpanel/plans/${id}`)
        .then(response => response.data)
        .then(response => {
          this.plans = response
        })
    },
  }
}
</script>
<style>
a {
  text-decoration: none;
  color: #444
}
</style>