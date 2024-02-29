<template>
  <div class="home" style="padding: 3%">
    <p class="alert alert-danger" v-if="error">{{ error }}</p>
    <form @submit.prevent="submit()" action="">
      <label for="">Please Add Your Text Here:</label>
      <textarea cols="8" rows="6" type="text" v-model="text" class="form-control" required></textarea><br>

      <div style="clear:both"></div>





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
      error: '',
      addedoption: [],
      ImageDetails: [],
      ImageDetailsO: false,
      AddDetails: [],
      AddDetailsO: false,
      Mimic: [],
      MimicO: false,
      parameters: [],
      parametersO: false,
      sizes: [],
      sizesO: false,
    }
  },
  mounted() {
    this.get_balance()
    this.get_ImageDetails()
    this.get_AddDetails()
    this.get_Mimic()
  },
  methods: {
    addoption(item) {
      if (!this.addedoption.includes(item)) {
        this.addedoption.push(item)
      }
    },
    removeoption(item) {
      if (this.addedoption.includes(item)) {
        const index = this.addedoption.indexOf(item);
        if (index > -1) { // only splice array when item is found
          this.addedoption.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    },
    async upload(id) {
      if (id !== 4) {
        document.getElementById('file' + (id + 1)).hidden = false
      }
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
    async get_ImageDetails(id) {
      await axios
        .get(`/image-details`)
        .then(response => response.data)
        .then(response => {
          this.ImageDetails = response
        })

    },
    async get_AddDetails(id) {
      await axios
        .get(`/add-details`)
        .then(response => response.data)
        .then(response => {
          this.AddDetails = response
        })

    },
    async get_Mimic(id) {
      await axios
        .get(`/mimic`)
        .then(response => response.data)
        .then(response => {
          this.Mimic = response
        })

    },
    async get_Parameters(id) {
      await axios
        .get(`/parameters`)
        .then(response => response.data)
        .then(response => {
          this.ImageDetails = response
        })

    },
    async get_Sizes(id) {
      await axios
        .get(`/sizes`)
        .then(response => response.data)
        .then(response => {
          this.ImageDetails = response
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
          }
        })

    },
    async submit() {
      this.error = ''
      document.getElementById('submit').disabled = true
      document.getElementById('submit').innerHTML = 'Building...'
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

      for (var items of this.addedoption) {
        this.text = this.text + items.prompt
      }
      await axios
        .post('/imagine', { text: this.text })
        .then(response => response.data)
        .then(response => {
          window.location.href = '/imagine/' + response['code'];
        }).catch(error => {
          this.error = error.response.data
          document.getElementById('submit').disabled = false
          document.getElementById('submit').innerHTML = 'Submit'
        })

    }
  }
}
</script>
<style>
.options {
  width: 16%;
  height: 20rem;
  margin: 0.3%;
  float: left
}

@media only screen and (max-width: 800px) {
  .options {
    width: 32%;
    height: 20rem;
    margin: 0.6%;
    float: left
  }
}

@media only screen and (max-width: 500px) {
  .options {
    width: 49%;
    height: 20rem;
    margin: 0.4%;
    float: left
  }
}
</style>