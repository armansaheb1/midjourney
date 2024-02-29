<template>
  <div class="home" style="padding-top: 0%">
    <circle-progress v-if="progress != 100" style="width: 10%; margin-left: 45%;margin-top:20px; height: unset"
      :percent="progress" />
    <div v-else style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0">
      <div id="img" :style="`height: ${height}px;background: url(${image});background-size: 100% 100%;float:left`">
        <div style="color: white;width: 50%; height: 50%; float: left">
          <h5 style="; background: rgba(0,0,0,0.5);">1</h5>
        </div>
        <div style="color: white;width: 50%; height: 50%; float: left">
          <h5 style="; background: rgba(0,0,0,0.5);">2</h5>
        </div>
        <div style="color: white;width: 50%; height: 50%; float: left">
          <h5 style="; background: rgba(0,0,0,0.5);">3</h5>
        </div>
        <div style="color: white;width: 50%; height: 50%; float: left">
          <h5 style="; background: rgba(0,0,0,0.5);">4</h5>
        </div>
      </div>
      <div id="menu" :style="`float:right ; height:${height}px`">
        <p v-if="errors" class="alert alert-danger">{{ errors }}</p>
        <div>
          Upscale<br><br>
          <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('U1')">1</button>
          <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('U2')">2</button>
          <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('U3')">3</button>
          <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('U4')">4</button>
          <br><br>
          <hr style="margin: 3px">
        </div>
        <div>
          Variation<br><br>
          <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('V1')">1</button>
          <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('V2')">2</button>
          <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('V3')">3</button>
          <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('V4')">4</button>
          <br><br>
          <hr style="margin: 3px">
        </div>
        <div>
          Other Operations<br><br>
          <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('V1')"> Refresh </button>
          <button class=" btn btn-dark" style="width:23%; margin: 0 1%;" @click="download(image)">Download</button>
          <br><br>

        </div>
      </div>

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
      text: '',
      result: [],
      progress: 0,
      image: '',
      height: 10,
      bid: '',
      errors: '',
      id: ''
    }
  },
  mounted() {
    this.get_image()
    this.get_width()
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
    get_width() {
      alert('hi')
      if (document.getElementById('img')) {
        const getMeta = (url, cb) => {
          const img = new Image();
          img.onload = () => cb(null, img);
          img.onerror = (err) => cb(err);
          img.src = url;
        };
        getMeta(this.image, (err, img) => {
          var width = document.getElementById('img').offsetWidth
          var ratio = img.naturalHeight / img.naturalWidth
          this.height = ratio * width
          alert(ratio * width)
        });
      }

    },
    async button(id) {
      if (this.balance === 0) {
        this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>Please Charge Your Account First</h5>`)
        setTimeout(() => {
          const toPath = this.$route.go || '/charge'
          this.$router.push(toPath)
        }, 2000);
        return false
      }
      var urls = ''
      this.text = urls + this.text
      var act = 'v'
      if (id.includes('U')) {
        act = 'u'
      }
      await axios
        .post('/button', { btn: id, code: this.bid, act: act, type: id })
        .then(response => response.data)
        .then(response => {
          if (id.includes('U')) {
            window.location.href = '/imagine/u/' + response['code'];
          } else {
            window.location.href = '/imagine/' + response['code'];
          }

        }).catch(error => {
          this.errors = error.response.data
        })

    },
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
      if (!this.id) {
        this.id = this.$route.params.id
      }
      await axios
        .get(`/imagine-result/${id}`)
        .then(response => response.data)
        .then(response => {
          if (response.result) {
            this.result = response.result
            this.progress = response.percent
            this.image = response.image
            this.text = response.text
            this.bid = response.bid
            if (response.percent === 100) {
              this.get_width()
            }
          }
          else {
            this.progress = response.percent
            setTimeout(() => {
              this.get_image(id)
            }, 5000);

          }
        })

    },
  },
  watch: {
    progress: {
      handler: function () {
        setTimeout(() => {
          this.get_width();
        }, 500);
        window.addEventListener('resize', () => {
          this.get_width()
        })
      },
      deep: true
    },
  }
}
</script>
<style>
#img {
  width: 40%
}

#menu {
  width: 60%;
}

@media only screen and (max-width: 500px) {
  #img {
    width: 100%
  }

  #menu {
    width: 100%;
  }
}
</style>
