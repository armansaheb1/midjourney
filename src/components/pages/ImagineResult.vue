<template>
  <div class="home" style="padding-top: 1%">
    <circle-progress v-if="progress != 100" style="width: 10%; margin-left: 45%; height: unset" :percent="progress" />
    <div style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0">
      <div v-for="item in result" v-bind:key="item" style="float: left; width: 23%; margin: 1%;">
        <img loading="lazy" style="width: 100% ;float: left;" :src="item" alt="">
        <a class="form-control btn btn-dark" @click="downloadImage(item)"
          style="margin-bottom: 5px;border-radius: 0; padding: 5px">Download</a><br>
      </div>
      <div style="clear: both"></div>
    </div>
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
      text: '',
      result: [],
      progress: 0,
    }
  },
  mounted() {
    this.get_image()
  },
  methods: {
    async downloadImage(imageSrc) {
      const image = await fetch(imageSrc)
      const imageBlog = await image.blob()
      const imageURL = URL.createObjectURL(imageBlog)

      const link = document.createElement('a')
      link.href = imageURL
      link.download = 'image file name here'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    async get_image() {
      var id = this.$route.params.id
      await axios
        .get(`/imagine-result/${id}`)
        .then(response => response.data)
        .then(response => {

          if (response.result) {

            this.result = response.result
            this.progress = response.percent
          }
          else {
            this.progress = response.percent
            setTimeout(() => {
              this.get_image(id)
            }, 5000);

          }
        })

    },
  }
}
</script>
