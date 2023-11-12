<template>
  <div class="home" style="text-decoration: none; padding: 5%">
    <div
      style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
      <table class="table">
        <tr>
          <td>
            #
          </td>
          <td>
            Text
          </td>
          <td>
            Date
          </td>
          <td>
            progress
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <hr style="margin: 5px">
          </td>
        </tr>


        <tr v-for="(item, idx) in imagines" v-bind:key="idx" style="height: 60px">

          <td>
            <a :href="'/imagine/' + item.code" style="text-decoration: none;color: #444">
              {{ idx + 1 }}
            </a>
          </td>
          <td>
            <a :href="'/imagine/' + item.code" style="text-decoration: none;color: #444">
              {{ item.text }}
            </a>
          </td>
          <td>
            <a :href="'/imagine/' + item.code" style="text-decoration: none;color: #444">
              {{ item.get_age }}
            </a>
          </td>
          <td>
            <a :href="'/imagine/' + item.code" style="text-decoration: none;color: #444">
              {{ item.percent }}
            </a>
          </td>
        </tr>
        <tr v-if="!imagines.length">
          <td colspan="4" style="text-decoration: none;color: #444">
            <hr>
            Nothing Yet !
          </td>
        </tr>
      </table>
      <div style="clear: both"></div>
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
    }
  },
  mounted() {
    this.get_image()
  },
  methods: {
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
