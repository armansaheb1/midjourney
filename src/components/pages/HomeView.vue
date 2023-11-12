<template>
  <div class="home">
    <img src="/0_3.png" style="width: 100%;" alt="">
  </div>
  <div style="margin-top: -100px">
    <a v-if="$store.state.isAuthenticated" href="/imagine" class="btn btn-warning">Try It Now</a>
    <button v-else @click="login()" class="btn btn-warning">Try It Now</button>
    <vue-final-modal style="width:100% ; background:none; z-index: 1000" v-model="showModal">
      <div @click="showModal = false" style="position:absolute; width: 100%; height: 100%; top:0;left: 0; z-index: 1">

      </div>
      <div style="; overflow: auto;max-height: 90%;top:20px;position: absolute; width: 50%;left: 25%" class="login-card">
        <login />
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import login from '../Login2.vue'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    login,
    VueFinalModal
  },
  data() {
    return {
      text: '',
      showModal: false
    }
  },
  methods: {
    async get_image(id) {
      await axios
        .get(`/imagine-result/${id}`)
        .then(response => response.data)
        .then(response => {

          if (!response.imageUrl) {
            setTimeout(() => {
              this.get_image(id)
            }, 2000);
          }
          else {
            console.log(response.imageUrls)
          }
        })

    },
    login() {
      this.showModal = true
    },
    async submit() {
      await axios
        .post('/imagine', { text: this.text })
        .then(response => response.data)
        .then(response => {
          this.get_image(response)
        })

    }
  }
}
</script>
