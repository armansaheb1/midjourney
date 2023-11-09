<template>
  <div class="home" style="padding: 20%">
    <form @submit.prevent="submit()" action="">
      <input type="text" v-model="text" class="form-control" required><br><br>
      <button class="btn btn-dark">Submit</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      text: '',
    }
  },
  methods: {
    async get_image(id) {
      await axios
        .get(`/api/imagine-result/${id}`)
        .then(response => response.data)
        .then(response => {
          window.location.href = response;
        })
        .catch(() => {
          setTimeout(() => {
            this.get_image(id)
          }, 2000);

        })
    },
    async submit() {
      await axios
        .post('/api/imagine', { text: this.text })
        .then(response => response.data)
        .then(response => {
          this.get_image(response)
        })

    }
  }
}
</script>
