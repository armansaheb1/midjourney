<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div
      style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
      <div class="card" style="overflow: auto;">
        <div class="card-header" style="padding: 0">
          <div style="width: 100%">
            <div style="float:left;width:5%">
              #
            </div>
            <div style="float:left;width:25%">
              Text
            </div>
            <div style="float:left;width:25%">
              Date
            </div>
            <div style="float:left;width:20%">
              progress
            </div>
            <div style="float:left;width:25%">
              Vari..
            </div>

          </div>
        </div>
        <div class="">
          <div v-for="(item, idx) in imagines" v-bind:key="idx" style="height: 50px; width: 100%">
            <a :href="`/imagine/${item.code}`" style="float:left;height: 50px;overflow: auto;width:10%;font-size:8px">
              <img :src="item.image" style="width: 50px" alt="">
            </a>
            <div style="float:left;height: 50px; margin-top:20px;overflow: auto;width:20%;font-size:8px; cursor: pointer">
              <a style="padding:2px;background:black; color:white; border-radius: 3px" @click="text(item.text)"
                :title="item.text">Show
                Text</a>
            </div>
            <a :href="`/imagine/${item.code}`"
              style="float:left;height: 50px; margin-top:20px;overflow: auto;font-size:10px;width:25%">
              {{ item.get_age }}
            </a>
            <a :href="`/imagine/${item.code}`"
              style="float:left;height: 50px; margin-top:20px;overflow: auto;font-size:12px;width:20%">
              {{ item.percent }}
            </a>
            <div style="float:left;height: 50px; margin-top:20px;overflow: auto;width:25%;font-size:8px">
              <a v-if="item.get_variations.length"
                style="padding:2px;background:black; color:white; border-radius: 3px; cursor: pointer"
                @click="unhide(idx)">Show Variations</a>
              <a disabled v-if="!item.get_variations.length"
                style="padding:2px;background:grey; color:white; border-radius: 3px; cursor: pointer"
                @click="unhide(idx)">No Variations</a>
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

    <h3 v-if="vars.length" style="text-align: center;">Upsacles and Variations</h3>
    <div v-if="vars.length" class="card" style="overflow: auto;">
      <div class="card-header" style="padding: 0">
        <div style="width: 100%">
          <div style="float:left;width:5%">
            #
          </div>
          <div style="float:left;width:25%">
            Text
          </div>
          <div style="float:left;width:25%">
            Date
          </div>
          <div style="float:left;width:20%">
            progress
          </div>
          <div style="float:left;width:25%">
            Vari..
          </div>

        </div>
      </div>

      <div>
        <div v-for="(item, idxs) in vars" :id="'v' + idx" v-bind:key="idxs" style="height: 30px; width: 100% ">
          <div v-if="item.act === 'u'">
            <a :href="`/imagine/u/${item.code}`"
              style="float:left;height: 30px; margin-top:20px;overflow: auto;width:5%;font-size:8px">
              {{ idxs + 1 }}
            </a>
            <div style="float:left;height: 30px; margin-top:20px;overflow: auto;width:20%;font-size:8px">
              <a style="padding:2px;background:black; color:white; border-radius: 3px" @click="text(item.text)"
                :title="item.text">Show
                Text</a>
            </div>
            <a :href="`/imagine/u/${item.code}`"
              style="float:left;height: 30px; margin-top:20px;overflow: auto;font-size:10px;width:25%">
              {{ item.get_age }}
            </a>
            <a :href="`/imagine/u/${item.code}`"
              style="float:left;height: 30px; margin-top:20px;overflow: auto;font-size:12px;width:25%">
              {{ item.percent }}
            </a>
            <div style="float:left;height: 30px; margin-top:20px;overflow: auto;width:25%;font-size:8px">
              <a style="padding:2px;background:black; color:white; border-radius: 3px" @click="text(item.text)"
                :title="item.text">{{ type }}</a>
            </div>
            <hr style="width: 100%">
          </div>
          <div v-else>
            <a :href="`/imagine/${item.code}`"
              style="float:left;height: 30px; margin-top:20px;overflow: auto;width:5%;font-size:8px">
              {{ idxs + 1 }}
            </a>
            <div style="float:left;height: 30px; margin-top:20px;overflow: auto;width:20%;font-size:8px">
              <a style="padding:2px;background:black; color:white; border-radius: 3px" @click="text(item.text)"
                :title="item.text">{{ type }}</a>
            </div>
            <a :href="`/imagine/${item.code}`"
              style="float:left;height: 30px; margin-top:20px;overflow: auto;font-size:10px;width:25%">
              {{ item.get_age }}
            </a>
            <a :href="`/imagine/${item.code}`"
              style="float:left;height: 30px; margin-top:20px;overflow: auto;font-size:12px;width:25%">
              {{ item.percent }}
            </a>
            <div style="float:left;height: 30px; margin-top:20px;overflow: auto;width:25%;font-size:8px">
              <a style="padding:2px;background:black; color:white; border-radius: 3px" @click="text(item.text)"
                :title="item.text">Show
                Text</a>
            </div>
            <hr style="width: 100%">
          </div>
        </div>
      </div>

    </div>
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
      vars: []
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

    },
    async get_image() {
      var id = this.$route.params.id
      await axios
        .get(`/my-imagines`)
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
</style>