<template>
  <div class="home" style="padding: 3%">
    <form @submit.prevent="submit()" action="">
      <label for="">Please Add Your Text Here:</label>
      <textarea cols="8" rows="6" type="text" v-model="text" class="form-control" required></textarea><br>
      <div style="width: 100%" id="uploads">
        <input @change="upload(1)" type="file" id="file1" style="float: left; margin: 5px">
        <input @change="upload(2)" type="file" id="file2" style="float: left; margin: 5px">
        <input @change="upload(3)" type="file" id="file3" style="float: left; margin: 5px">
        <input @change="upload(4)" type="file" id="file4" style="float: left; margin: 5px">
      </div>
      <label for="">Current balance : </label><a href="" style="margin-left: 5px">{{ balance }}</a><br>
      <button id="submit" class="btn btn-dark">Submit</button>

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
      balance: '',
      urls: [],
    }
  },
  mounted() {
    this.get_balance()
  },
  methods: {
    async upload(id) {
      document.getElementById('submit').disabled = true
      document.getElementById('submit').innerHTML = 'Uploading'
      this.urls[id - 1] = 'busy'
      const formdata = new FormData()
      var img = document.getElementById('file' + id).files[0]
      formdata.append('image', img, img.name)
      await axios
        .post(`/image`, formdata)
        .then(response => response.data)
        .then(response => {
          this.urls[id - 1] = (response.get_image)
          if (!('busy' in this.urls)) {
            document.getElementById('submit').disabled = false
            document.getElementById('submit').innerHTML = 'Submit'
          }
          console.log(this.urls)
        })

    },
    async get_balance(id) {
      await axios
        .get(`/charge`)
        .then(response => response.data)
        .then(response => {
          this.balance = response
        })

    },
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
    async submit() {
      if (this.balance === 0) {
        this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>Please Charge Your Account First</h5>`)
        setTimeout(() => {
          const toPath = this.$route.go || '/charge'
          this.$router.push(toPath)
        }, 2000);
        return false
      }
      var urls = ''
      for (var item of this.urls) {
        urls = urls + item + '\n'
      }
      this.text = urls + this.text
      console.log(this.text)
      await axios
        .post('/imagine', { text: this.text })
        .then(response => response.data)
        .then(response => {
          window.location.href = '/imagine/' + response['code'];
        })

    }
  }
}
</script>
