<template>
  <div class="home" style="padding: 3%">
    <p class="alert alert-danger" v-if="error">{{ error }}</p>
    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />

    <img loading="lazy" v-if="image" :src="image" style="width: 100%">
    <form v-if="notimage" @submit.prevent="submit()" action="">
      <label v-if="$store.state.language" for="">لطفا تصویر صورت را وارد کنید</label>
      <label v-else for="">Add Face Picture</label>
      <br>

      <input @change="upload(1)" type="file" id="file1" style="" class="form-control"><br><br>
      <label v-if="$store.state.language" for="">لطفا تصویر اصلی را وارد کنید</label>
      <label v-else for="">Add Main Picture</label><br>

      <input @change="upload(2)" type="file" id="file2" style="" class="form-control">
      <br><br>
      <label for="">Current balance : </label><a href="" style="margin-left: 5px">{{ balance }}</a><br>
      <button v-if="$store.state.language" id="submit" class="btn btn-dark">Submit</button>
      <button v-else id="submit" class="btn btn-dark">ثبت</button>

    </form>
    <div v-if="image">
      Other Operations<br><br>
      <button class=" btn btn-dark" style="width:23%; margin: 0 1%;" @click="download(image)">Download</button>
      <br><br>

    </div>



  </div>
  <div style="height: 200px;width: 100%"></div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Loading
  },
  data() {
    return {
      text: '',
      balance: '',
      urls: [],
      image: '',
      notimage: false,
      error: '',
      isLoading: false
    }
  },
  mounted() {
    this.get_balance()
    this.check_image()
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
    async check_image() {
      if (this.$route.params.id) {
        await axios
          .get(`/faceswap/${this.$route.params.id}`)
          .then(response => response.data)
          .then(response => {
            this.image = response.image
            console.log(response)
          }).catch(() => {
            this.notimage = true
          })
      } else {
        this.notimage = true
      }


    },
    async get_code() {

    await axios
      .get(`/faceswap-result/${this.code}`)
      .then(response => response.data)
      .then(response => {
        this.image = response.image
        console.log(response)
        this.isLoading = false
      }).catch(()=>{
        setTimeout(() => {
          this.get_code()
        }, 2000);
      })

    },
    async submit() {
      this.isLoading = true
      this.error = ''
      if (this.balance === 0) {
        this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>Please Charge Your Account First</h5>`)
        setTimeout(() => {
          const toPath = this.$route.go || '/charge'
          this.$router.push(toPath)
        }, 2000);
        return false
      }
      await axios
        .post('/faceswap', { text: this.urls })
        .then(response => response.data)
        .then(response => {
          console.log(response)
          this.code = response.code
          
          this.notimage = false
          this.get_code()
        }).catch(error => {
          console.log(error)
          this.error = error
          this.isLoading = false
        })

    }
  }
}
</script>
