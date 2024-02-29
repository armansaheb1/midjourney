<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div style="width: 100%; margin: auto; border-radius: 0">
      <p style="width:100%" v-if="success" class="alert alert-success">حساب شما شارژ شد</p>
      <p style="width:100%" v-if="error" class="alert alert-danger">{{ error }}</p>
      <label for="">Current balance : </label><a href="" style="margin-left: 5px">{{ balance }}</a><br><br>
      <div class="card cd" style=";float:left">
        <div class="card-header">
          Get Bonus
        </div>
        <div class="card-body">
          <form @submit.prevent="get_bonus()">
            <h5 class="alert alert-success" style="color: black" v-if="coin">{{ coin }} Coins</h5>
            <h6>validity duration :‌ 30 Days</h6>
            <input @input="check_bonus()" required class="form-control" placeholder="Bonus Code" v-model="btoken">
            <br>
            <button class="btn btn-dark">Buy</button>
          </form>
        </div>
      </div>
      <div v-for="item in plans" class="card cd" style="padding: 5%;float:left">
        <div class="card-body">
          <h5 style="color: black">{{ item.coin }} Coins</h5>
          <h6>{{ item.price }} IRT</h6>
          <h6>validity duration :‌ 30 Days</h6>
          <input hidden class="form-control" placeholder="Discount Code" v-model="ctoken">
          <br>
          <button @click="buyplan(item.id)" class="btn btn-dark">Buy</button>
        </div>
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
      plans: [],
      token: '',
      coin: '',
      ctoken: '',
      btoken: '',
      success: '',
      error: ''
    }
  },
  mounted() {
    this.get_balance()
    this.get_plans()
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
    async get_plans() {
      await axios
        .get(`/plans`)
        .then(response => response.data)
        .then(response => {
          this.plans = response
        })

    },
    async buyplan(amount) {
      await axios
        .post(`/request`, { amount: amount })
        .then(response => response.data)
        .then(response => {
          window.location.href = response
        })

    },
    async get_bonus(amount) {
      await axios
        .post(`/get-bonus`, { token: this.btoken })
        .then(response => response.data)
        .then(response => {
          this.balance = response
          this.success = true
          setTimeout(() => {
            this.success = ''
          }, 2000)
        }).catch(error => {
          this.error = error.response.data
          setTimeout(() => {
            this.error = ''
          }, 2000)
        })
    },
    async check_bonus(amount) {
      if (this.btoken.length === 8) {
        await axios
          .get(`/check-bonus/${this.btoken}`)
          .then(response => response.data)
          .then(response => {
            this.coin = response
          }).catch(error => {
            this.berror = error.response.data
          })
      }
    },
  }
}
</script>
<style>
.cd {
  width: 30.33%;
  margin: 1.5%;
  float: left;
  height: 300px;
}

@media only screen and (max-width: 500px) {
  .cd {
    width: 46%;
    margin: 1.5%;
    float: left;
    height: 300px;
  }

}</style>
