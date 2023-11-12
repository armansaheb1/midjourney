<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div style="width: 100%; margin: auto; border-radius: 0; text-align: center">
      <h3>Payment Was Successful</h3>
      <h6>we will redirect you in {{ sec }} seconds</h6>
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
      sec: 4,
    }
  },
  mounted() {
    this.get_balance()
  },
  methods: {
    get_balance() {
      setTimeout(() => {
        this.sec -= 1
        if (this.sec === 0) {
          const toPath = this.$route.go || '/imagine'
          this.$router.push(toPath)
        } else {
          this.get_balance()
        }
      }, 1000);

    }
  }
}
</script>
