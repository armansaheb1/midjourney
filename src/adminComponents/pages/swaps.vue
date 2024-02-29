<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div
      style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
      <div class="card" style="overflow: auto;">
        <div class="card-header" style="padding: 0">
          <div style="width: 100%">
            <div id="thumb" style="float:left;width:20%">
              #
            </div>
            <div style="float:left;width:40%">
              زمان ثبت
            </div>
            <div style="float:left;width:40%">
              عملیات
            </div>

          </div>
        </div>
        <div class="">
          <div v-for="(item, idx) in imagines" v-bind:key="idx" :style="`height: ${height}px; width: 100%`">
            <a :href="`/faceswap/${item.fsid}`"
              :style="`float:left;height: ${height}px;overflow: hidden;width:20%;font-size:8px`">
              <img loading="lazy" :src="item.image" style="width: 100%; height: 100%" alt="">
            </a>
            <a :href="`/faceswap/${item.fsid}`"
              :style="`float:left;height: ${height}px; ; padding: 2%;overflow: hidden;font-size:10px;width:40%; padding:2%`">
              <h6>{{ item.username }}</h6>
              {{ item.get_age }}
            </a>
            <div style="float:left;width:40%; padding:2%">
              <button @click="download(item.image)" class="btn btn-dark">دانلود</button>
            </div>
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
    async download(imageSrc) {
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
        .get(`/adminpanel/faceswap`)
        .then(response => response.data)
        .then(response => {
          this.imagines = response

          setTimeout(() => {
            if (document.getElementById('thumb')) {
              this.height = document.getElementById('thumb').offsetWidth
            }
          }, 100);
          window.addEventListener('resize', () => {
            if (document.getElementById('thumb')) {
              this.height = document.getElementById('thumb').offsetWidth
            }
          })
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