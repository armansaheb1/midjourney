<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div style="width: 100%; margin: auto; border-radius: 0">
      <label for="">Current balance : </label><a href="" style="margin-left: 5px">{{ balance }}</a><br><br>
      <div
        style="padding: 5%;width: 30.33% ; margin: 1.5% ; border-radius: 5px; float:left; border:solid 1px lightgrey;margin-bottom: 0">
        <h5 style="color: black">50 Coins</h5>
        <h6>100,000 IRT</h6>
        <h6>validity duration :‌ 30 Days</h6>
        <br>
        <button @click="buyplan(100000)" class="btn btn-dark">Buy</button>
      </div>
      <div
        style="padding: 5%;width: 30.33% ; margin: 1.5% ; border-radius: 5px; float:left; border:solid 1px lightgrey;margin-bottom: 0">
        <h5 style="color: black">150 Coins</h5>
        <h6>200,000 IRT</h6>
        <h6>validity duration :‌ 30 Days</h6>
        <br>
        <button @click="buyplan(200000)" class="btn btn-dark">Buy</button>
      </div>
      <div
        style="padding: 5%;width: 30.33% ; margin: 1.5% ; border-radius: 5px; float:left; border:solid 1px lightgrey;margin-bottom: 0">
        <h5 style="color: black">1000 Coins</h5>
        <h6>800,000 IRT</h6>
        <h6>validity duration :‌ 30 Days</h6>
        <br>
        <button @click="buyplan(800000)" class="btn btn-dark">Buy</button>
      </div>
      <div style="clear: both"></div>
      <br>
    </div>
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
      imagines: [],
      plan: '',
      balance: '',
    }
  },
  mounted() {
    this.get_balance()
  },
  methods: {
    async get_balance() {
      await axios
        .get(`/charge`)
        .then(response => response.data)
        .then(response => {
          this.balance = response
        })

    },
    async buyplan(amount) {
      await axios
        .post(`/request`, { amount: amount })
        .then(response => response.data)
        .then(response => {
          this.balance = response
          console.log(response)
        })

    },
  }
}
</script>
