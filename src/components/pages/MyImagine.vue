<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div
      style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
      <div class="card" style="overflow: auto;">
        <div class="card-header" style="padding: 0">
          <div style="width: 100%">
            <div id="thumb" style="float:left;width:25%">
              #
            </div>
            <div style="float:left;width:25%">
              Prompt
            </div>
            <div style="float:left;width:25%">
              Created Date
            </div>
            <div style="float:left;width:25%">
              Variations
            </div>

          </div>
        </div>
        <div class="">
          <div v-for="(item, idx) in imagines" v-bind:key="idx" :style="`height: ${height}px; width: 100%`">
            <a :href="`/imagine/${item.code}`"
              :style="`float:left;height: ${height}px;overflow: hidden;width:25%;font-size:8px`">
              <img loading="lazy" v-if="item.image" :src="item.image" style="width: 100%; height: 100%" alt="">
              <img loading="lazy" v-else style="width: 100%; height: 100%"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonlE2MeCTMRgxYBV0n3p061Q4sXMT2C7DFQ&usqp=CAU">
            </a>
            <div
              :style="`float:left;height: ${height}px;overflow: hidden;width:25%;font-size:10px; cursor: pointer; padding: 2%`">
              <p style="text-align: justify;">{{ item.text }}</p>
            </div>
            <a :href="`/imagine/${item.code}`"
              :style="`float:left;height: ${height}px; ; padding: 2%;overflow: hidden;font-size:10px;width:25%`">
              {{ item.get_age }}
            </a>
            <div :style="`float:left;height: ${height}px; ; padding: 2%;overflow: hidden;width:25%;font-size:8px`">
              <a v-if="item.get_variations.length"
                style="padding:8px;background:black; color:white; border-radius: 3px; cursor: pointer;font-size: 14px"
                @click="unhide(idx)">{{ item.get_variations.length }}</a>
              <a disabled v-if="!item.get_variations.length"
                style="padding:8px;background:grey; color:white; border-radius: 3px; cursor: pointer;font-size: 14px"
                @click="unhide(idx)">{{ item.get_variations.length }}</a>
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
    <br>
    <button class="btn btn-dark" @click="page = page + 1; get_image()">Load More</button>
    <br><br>

    <h3 style="text-align: center;">Upsacles and Variations</h3>
    <div v-if="vars.length" class="card" style="overflow: auto;">
      <div class="card-header" style="padding: 0">
        <div style="width: 100%">
          <div id="varss" style="float:left;width:25%">
            #
          </div>
          <div style="float:left;width:25%">
            پرامپت
          </div>
          <div style="float:left;width:25%">
            زمان ثبت
          </div>
          <div style="float:left;width:25%">
            نوع
          </div>

        </div>
      </div>

      <div>
        <div v-for="(item, idxs) in vars" :id="'v' + idx" v-bind:key="idxs" style="height: 30px; width: 100% ">
          <div clsaa="">
            <a :href="`/imagine/${item.code}`"
              :style="`float:left;height: ${height}px;overflow: hidden;width:25%;font-size:8px`">
              <img loading="lazy" :src="item.image" style="width: 100%; height: 100%" alt="">
            </a>
            <div
              :style="`float:left;height: ${height}px;overflow: hidden;width:25%;font-size:10px; cursor: pointer; padding: 2%`">
              <p style="text-align: justify;">{{ item.text }}</p>
            </div>
            <a :href="`/imagine/${item.code}`"
              :style="`float:left;height: ${height}px; ; padding: 2%;overflow: hidden;font-size:10px;width:25%`">
              {{ item.get_age }}
            </a>
            <div :style="`float:left;height: ${height}px; ; padding: 2%;overflow: hidden;width:25%;font-size:8px`">
              {{ item.type }}
            </div>
            <hr style="width: 100%">
          </div>
        </div>
      </div>

    </div>
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
      height: 0,
      page: 1,
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
        .get(`/my-imagines/${this.page}`)
        .then(response => response.data)
        .then(response => {
          for (var item of response) {
            this.imagines.push(item)
          }

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