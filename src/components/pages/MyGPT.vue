<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div
      style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
      <div class="card" style="overflow: auto;">
        <div class="card-header" style="padding: 0">
          <div style="width: 100%">
            <div id="thumb" style="float:left;width:33%">
              #
            </div>
            <div v-if="$store.state.language" style="float:left;width:33%">
              اولین پیام
            </div>
            <div v-if="!$store.state.language" style="float:left;width:33%">
              First Message
            </div>
            <div v-if="$store.state.language" style="float:left;width:33%">
              زمان ثبت
            </div>
            <div v-if="!$store.state.language" style="float:left;width:33%">
              Created Date
            </div>

          </div>
        </div>
        <div class="">
          <div v-for="(item, idx) in imagines" v-bind:key="idx" :style="`; width: 100%`">
            <a :href="`/gpt/${item.id}`"
              :style="`float:left;;overflow: hidden;width:33%;font-size:10px; cursor: pointer; padding: 2%`">
              <p style="text-align: center;">{{ idx }}</p>
            </a>
            <a :href="`/gpt/${item.id}`"
              :style="`float:left;;overflow: hidden;width:33%;font-size:10px; cursor: pointer; padding: 2%`">
              <p style="text-align: center;">{{ item.first_message }}</p>
            </a>
            <a :href="`/gpt/${item.id}`" :style="`float:left;; ; padding: 2%;overflow: hidden;font-size:10px;width:33%`">
              {{ item.get_age }}
            </a>
            <hr style="width: 100%">
          </div>
          <div v-if="!imagines.length" style="width: 100%">
            <hr>
            Nothing Yet !
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div style="clear: both"></div>

  </div>
  <div style="height: 200px;width: 100%"></div>
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
      vars: [],
      height: 0
    }
  },
  mounted() {
    this.get_image()
  },
  methods: {

    text(text) {
      this.$swal(`<div class="" style="display: flex;"></div><h6>${text}</h6>`)
    },
    unhide(id) {
      this.vars = this.imagines[id].get_variations
      setTimeout(() => {

        document.getElementById('varss').scrollIntoView({
          block: "start",
          behavior: 'smooth'
        });
      }, 500);

    },
    async get_image() {
      var id = this.$route.params.id
      await axios
        .get(`/my-gpt`)
        .then(response => response.data)
        .then(response => {
          this.imagines = response
          console.log(response)
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

#varss {
  scroll-margin-top: 500px;
}
</style>