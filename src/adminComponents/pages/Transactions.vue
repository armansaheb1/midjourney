<template>
  <div class="home" style="text-decoration: none; padding: 5%; overflow: auto;">
    <h4>All Deposit : {{ all }}</h4><br>
    <div
      style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">

      <div class="card" style="overflow: auto;">
        <div class="card-header" style="padding: 0">
          <div style="width: 100%">
            <div style="float:left;width:10%">
              #
            </div>
            <div style="float:left;width:30%">
              Username
            </div>
            <div style="float:left;width:30%">
              Date
            </div>
            <div style="float:left;width:30%">
              Amount
            </div>
          </div>
        </div>
        <div class="">
          <div v-for="(item, idx) in transactions" v-bind:key="idx" style="height: 50px; width: 100%">
            <div style="padding: 20px;float:left;width:10%">
              {{ idx + 1 }}
            </div>
            <div style="padding: 20px;float:left;width:30%">
              {{ item.username }}
            </div>
            <div style="padding: 20px;float:left;width:30%">
              {{ item.get_age }}
            </div>
            <div style="padding: 20px;float:left;width:30%">
              {{ item.amount }}
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
      transactions: [],
      vars: [],
      all: 0
    }
  },
  mounted() {
    this.get_transactions()
    this.get_all()

  },
  methods: {
    text(text) {
      this.$swal(`<div class="" style="display: flex;"></div><h6>${text}</h6>`)
    },
    async get_transactions() {
      await axios
        .get(`/adminpanel/transactions`)
        .then(response => response.data)
        .then(response => {
          this.transactions = response

        })

    },
    async get_all() {
      await axios
        .post(`/adminpanel/transactions`)
        .then(response => response.data)
        .then(response => {
          this.all = response

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