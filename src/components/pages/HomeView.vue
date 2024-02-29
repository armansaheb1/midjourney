<template>
  <h6 v-if="$store.state.language" style="text-align: center; margin: 30px; margin-bottom: 0;font-size: 14px">امروز چی
    میخوای بسازی ؟</h6>
  <h6 v-else style="text-align: center; margin: 30px; margin-bottom: 0;font-size: 14px">what are you creating today?</h6>
  <div style="width: 100%; padding: 4% 6%; ">
    <a href="/imagine">
      <div class="card" style="border-radius: 10px;border-style: none">
        <img loading="lazy" src="/imagine.jpeg" style="width: 100%;border-radius: 20px" alt="">
      </div>
    </a>
  </div>

  <div style="width: 100%; padding: 4% 6%; ">
    <a href="/faceswap">
      <div class="card" style="border-radius: 10px;border-style: none">
        <div>
          <img loading="lazy" src="/faceswap.jpeg" style="width: 100%;border-radius: 20px" alt="">
        </div>

      </div>
    </a>
  </div>


  <div style="width: 100%; padding: 4% 6%; ">
    <a href="/gpt">
      <div class="card" style="border-radius: 10px;border-style: none">
        <img loading="lazy" src="/gpt.jpeg" style="width: 100%;border-radius: 20px" alt="">
      </div>
    </a>
  </div>



  <div class="card" style="margin:  4% 6%; background-image: linear-gradient(#ffe885, white); border-style: none;">
    <div v-if="$store.state.language" class="card-body">
      <a href="#">
        گوش به زنگ باشید!<br>
        امکانات جذاب دیگر در راه است!</a>
    </div>

    <div v-else class="card-body">
      <a href="#">
        stay tuned!<br>
        more exciting features coming soon!</a>
    </div>



  </div>
  <div
    :style="`width: 100%; height: ${height}px; background: url('/dark-bg.png'); padding: 3%; font-size: 14px; box-sizing: content-box;`">
    <h6 v-if="$store.state.language" style="color:#FED001;; margin-bottom: 12px; font-size: 13px">شیرجه رفتن به دنیای
      جادویی هوش مصنوعی
    </h6>
    <h6 v-else style="color:#FED001;; margin-bottom: 12px; font-size: 13px">DIVE INTO THE MAGICAL WORLD OF AI</h6>
    <h6 v-if="$store.state.language" style="color:#FED001; text-align: center; margin-bottom: 12px; font-size: 12px">
      وب‌سایت لیمو یک پلتفرم هوش مصنوعی است برای تبدیل متن به عکس با استفاده از میدجرنی و دستیار هوشمند (چت جی پی تی)، که
      همچنین شامل سایر خدمات Ai می‌شود، مانند تغییر چهره و سایر مواردی که به زودی به پلتفرم اضافه خواهند شد.</h6>
    <h6 v-else style="color:#FED001; text-align: center; margin-bottom: 12px; font-size: 12px">Limoo website is an
      artificial intelligence
      platform to convert text to
      photo with midjourney and smart assistant (ChatGPT), which also includes other services, such as face change and
      other things that will be added to the platform soon.</h6>
    <h6 v-if="$store.state.language" style="color: white; font-size: 12px;">هنر را رها کنید و شاهکارهای هوش مصنوعی را کاوش
      کنید</h6>
    <h6 v-else style="color: white; font-size: 12px;">Unleash the Artistry: Explore AI Masterpieces</h6>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import login from '../Login2.vue'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import imagine from '../modals/Imagine.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    login,
    VueFinalModal,
    imagine
  },
  data() {
    return {
      text: '',
      showModal: false,
      height: 0
    }
  },
  mounted() {
    this.get_height()
  },
  methods: {
    get_height() {
      this.height = window.innerWidth * (295 / 430)
      window.addEventListener('resize', () => {
        this.height = window.innerWidth * (295 / 430)
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
    login() {
      this.$store.state.showModal = true
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
<style>
.login-card {
  position: absolute;
  z-index: 101;
  width: 70%;
  left: 15%;
  top: 18%
}


.login-card::-webkit-scrollbar {
  width: 0;
}

.topper {
  padding: 160px 0;
  font-size: 20px !important;
  background: url('https://www.limoo.ai/0_3.png');
  background-size: 100% 100%;
}

.topper h5 {
  font-size: 20px !important;
  border-radius: 15px;
  width: 70%;
  text-align: justify;
  direction: rtl;
  margin: 0px 15%;
}

@media only screen and (max-width: 500px) {
  .login-card {
    width: 95%;
    left: 2.5%;
    top: 12%
  }

  .topper {
    padding: 60px 0;
    font-size: 14px !important;
  }

  .topper h5 {
    font-size: 20px !important;
    border-radius: 15px;
    width: 90%;
    text-align: justify;
    direction: rtl;
    margin: 0px 5%;
  }
}

a {
  color: #444;
  text-decoration: none;
}

a:hover {
  color: #444;
  text-decoration: none;
}
</style>