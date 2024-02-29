<template>
  <div class="home" style="padding-top: 0%">
    <p class="alert alert-danger" v-if="error">{{ error }}</p>
    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
    <div id='phoneload'>
      <div style="clear: both"></div>
      <circle-progress id='phoneload' v-if="progress != 100"
        style="width: 10%; margin-left: 45%;margin-top:20px; height: unset ; z-index:101" :percent="progress"
        show-percent="true" fill-color="#444" />
      <div style="clear: both"></div>
    </div>
    <div style="clear: both"></div>
    <div hidden id="men" style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0">
      <div id="img" v-if="image"
        :style="`height: ${height}px;background: url(${image});background-size: 100% 100%;float:left`">
        <div v-if="act !== 'u'" style="color: white;width: 50%; height: 50%; float: left">
          <h5 style="; background: rgba(0,0,0,0.5);">1</h5>
        </div>
        <div v-if="act !== 'u'" style="color: white;width: 50%; height: 50%; float: left">
          <h5 style="; background: rgba(0,0,0,0.5);">2</h5>
        </div>
        <div v-if="act !== 'u'" style="color: white;width: 50%; height: 50%; float: left">
          <h5 style="; background: rgba(0,0,0,0.5);">3</h5>
        </div>
        <div v-if="act !== 'u'" style="color: white;width: 50%; height: 50%; float: left">
          <h5 style="; background: rgba(0,0,0,0.5);">4</h5>
        </div>
      </div>
      <div class="phone ">
        <div style="clear: both"></div>
        <div class="card">
          <div class="card-header">
            Prompt
          </div>
          <div class="card-body">
            {{ text }}
          </div>
        </div>
      </div>
      <div id="menu" :style="`float:right ; height:${height}px`">
        <p v-if="errors" class="alert alert-danger">{{ errors }}<br>
          <a href="/charge">شارژ کنید</a>
        </p>
        <div v-if="act === 'u'">
          <div>
            Options<br><br>
            <div v-for="item in buttons" v-bind:key="item">
              <button v-if="(item !== '🖌️ Vary (Region)') && (item !== 'Web') && (item !== '🔍 Custom Zoom')"
                style="margin: 5px ; float:left" @click="(button(item))" class="btn btn-dark">
                {{ item }}
              </button>
            </div>
            <div style="clear: both"></div>
            <br><br>
            <hr style="margin: 3px">
          </div>
          <div>
            Other Operations<br><br>
            <button class=" btn btn-dark" style="width:23%; margin: 0 1%;" @click="download(image)">Download</button>
            <br><br>

          </div>
        </div>

        <div v-else>
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
            <button class="btn btn-dark" style="width:23%; margin: 0 1%;" @click="button('🔄')"> Refresh </button>
            <button class=" btn btn-dark" style="width:23%; margin: 0 1%;" @click="download(image)">Download</button>
            <br><br>

          </div>
        </div>
      </div>

      <div style="clear: both"></div>
      <div class="pc card" style="margin-bottom: 50px">
        <div class="card-header">
          Prompt
        </div>
        <div class="card-body">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
  <div style="height: 200px;width: 100%"></div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    CircleProgress,
    Loading

  },
  data() {
    return {
      text: '',
      result: [],
      progress: 5,
      image: '',
      height: 10,
      bid: '',
      act: '',
      buttons: [],
      isLoading: true,
      fullPage: true,
      errors: ''
    }
  },
  mounted() {
    this.get_image(false)
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
      setTimeout(() => {
        if (document.getElementById('img')) {
          const img = new Image();
          img.src = this.image;
          var width = document.getElementById('img').offsetWidth
          var ratio = img.naturalHeight / img.naturalWidth
          this.height = ratio * width
        }
        setTimeout(() => {
          this.get_width()
        }, 3000);
      }, 2000);

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
      urls = urls + this.result[id] + '\n'
      this.text = urls + this.text
      var act = 'v'
      if (id.includes('U') || this.act == 'u') {
        act = 'u'
      }
      await axios
        .post('/button', { btn: id, code: this.bid, act: act, type: id })
        .then(response => response.data)
        .then(response => {
          window.location.href = '/imagine/' + response['code'];

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
    async get_image(id) {
      if (!id) {
        id = this.$route.params.id
      }
      if (!this.$route.params.id) {
        window.location.href = '/imagine/' + id;
      }
      await axios
        .get(`/imagine-result/${id}`)
        .then(response => response.data)
        .then(response => {

          if (response.percent === 100) {

            this.result = response.result
            this.progress = response.percent
            this.image = response.image
            this.text = response.text
            this.bid = response.bid
            this.act = response.act
            this.buttons = response.buttons
            if (response.percent === 100) {
              this.get_width()
            } else {
              setTimeout(() => {
                this.get_image(id)
              }, 2000);
            }
            var ftext = ''
            var text = this.text.split(' ')
            for (var item of text) {
              if (item.includes('http')) {
              }
              else {
                ftext = ftext + ' ' + item
              }
            }
            this.text = ftext
            this.isLoading = false
            document.getElementById('men').hidden = false
          } else if (response.done) {
            this.error = "We Can't Build This Image"
            this.progress = 100
            this.isLoading = false
          }
          else {
            if (parseInt(response.percent) > 5) {
              this.progress = response.percent
              setTimeout(() => {
                this.get_image(id)
              }, 2000);
            }
            else {
              setTimeout(() => {
                this.get_image(id)
              }, 2000);
            }
          }

        }).catch(() => {
          setTimeout(() => {
            this.get_image(id)
          }, 5000);
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

#pcload {
  display: block
}

.pc {
  display: block
}

.phone {
  display: none
}

@media only screen and (max-width: 500px) {
  .phone {
    display: block
  }

  .pc {
    display: none
  }

  #pcload {
    display: none
  }

  #phoneload {
    display: block;
  }

  #img {
    width: 100%
  }

  #menu {
    width: 100%;
  }
}
</style>
