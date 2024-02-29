<template>
  <div class="home" style="background: white;padding: 0 3%">
    <div style="z-index: 10;">
      <a class="btn btn-secondary" style="width: 46%; margin: 2%; float:right"><label for="">balance :
        </label>{{ parseFloat(balance).toFixed(2) }}</a>
      <a href="/" class="btn btn-warning" style="width: 46%; margin: 2%; float:right">Home</a>
    </div>
    <br><br>
    <div id='messages'
      :style="`position: absolute; max-height: ${allheight - 170}px; overflow:auto; width: 100%; bottom:${allheight - (allheight - 150)}px; left: 0; padding: 0 6%;z-index: -1`">
      <div>
        <div style="width: 70px; float: left; ">
          <div style="height: 50px;width: 50px;background-color: #000;; border-radius: 50%">
            <img style="width: 50%; margin:12% 20%; border-radius: 0%" src="/smalllogo.png" alt="">
          </div>
        </div>
        <div class="card" style="width: 60%; float: left ; background-color: #fed001;">
          <div class="card-body">
            Ask Me Anything
          </div>
        </div>
        <div style="clear: both"></div>
        <br>
      </div>

      <div v-for="item in result">
        <div v-if="item.role === 'user'">
          <div class="card" style="width: 60%; float: right; background-color: #D9D9D9;">
            <div class="card-body">
              {{ item.message }}
            </div>
          </div>
          <div style="clear: both"></div>
          <br>
        </div>
        <div v-else>
          <div style="width: 70px; float: left; ">
            <div style="height: 50px;width: 50px;background-color: #000;; border-radius: 50%">
              <img style="width: 50%; margin:12% 20%; border-radius: 0%" src="/smalllogo.png" alt="">
            </div>
          </div>

          <div class="card" style="width: 60%; float: left ; background-color: #fed001;">
            <div class="card-body">
              {{ item.message }}
            </div>
          </div>
          <div style="clear: both"></div>
          <br>
        </div>
      </div>
      <div v-if="typ">
        <div style="width: 70px; float: left; ">
          <div style="height: 50px;width: 50px;background-color: #000;; border-radius: 50%">
            <img style="width: 50%; margin:12% 20%; border-radius: 0%" src="/smalllogo.png" alt="">
          </div>
        </div>
        <div class="card" style="width: 60%; float: left ; background-color: #fed001;">
          <div class="card-body">
            {{ typ }}
          </div>
        </div>
        <div style="clear: both"></div>
        <br>
      </div>
    </div>
    <div v-if="result"><br><br></div>
    <p class="alert alert-danger" v-if="error">{{ error }}</p>
    <form @submit.prevent="submit()" action="" :style="`position: fixed;
               bottom: 0;
               left: 0;
               width: 100%;
               padding: 2%;
               background: #fed001`">
      <input placeholder="Type your query"
        style="height: 50px;border-radius: 25px;background: #efefef;margin-bottom: -50px;" id="text" cols="8" rows="6"
        type="text" v-model="text" class="form-control" required>
      <button style="position: relative;
                                                                                    top: -2px;
                                                                                    left: 44%;border-radius:50%"
        id="submit" class="btn"><span style="font-size: 38px; color: #444" class="material-symbols-outlined">
          send
        </span></button>



    </form>
  </div>
  <div style="height: 200px;width: 100%"></div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay';

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
      error: '',
      result: [],
      id: '',
      isLoading: false,
      fullPage: true,
      allheight: 0,
      typ: '',
      typs: false
    }
  },
  mounted() {
    this.get_balance()
    this.get_height()
    this.typing()
  },
  methods: {
    get_height() {
      setTimeout(() => {
        this.get_height()
      }, 100);
      if (document.querySelector('#app').offsetHeight < window.innerHeight) {
        this.allheight = window.innerHeight - 65
      } else {
        this.allheight = document.querySelector('#app').offsetHeight - 65
      }
      window.addEventListener('resize', () => {
        if (document.querySelector('#app').offsetHeight < window.innerHeight) {
          this.allheight = window.innerHeight - 65
        } else {
          this.allheight = document.querySelector('#app').offsetHeight - 65
        }
      })
    },
    typing() {
      if (this.typs) {
        this.typ = 'typing'
        setTimeout(() => {
          this.typ = this.typ + ' .'
          setTimeout(() => {
            this.typ = this.typ + ' .'
            setTimeout(() => {
              this.typ = this.typ + ' .'
              this.typing()
              setTimeout(() => {
                this.typ = this.typ + ' .'
                this.typing()
              }, 500);
            }, 500);
          }, 500);
        }, 500);



      } else {
        this.typ = false
      }

    },
    async get_balance(id) {
      await axios
        .get(`/charge`)
        .then(response => response.data)
        .then(response => {
          this.balance = response
        })

    },
    async submit() {
      var text = this.text.valueOf()
      this.text = ''
      this.result.push({ 'message': text, role: 'user' })
      this.typs = 'typing'
      var ob = document.getElementById('messages')
      ob.scrollTop = ob.scrollHeight;
      this.isLoading = true
      this.error = ''
      await axios
        .post('/support', { text: text, role: 'system' })
        .then(response => response.data)
        .then(response => {
          this.result.push({ 'message': response })
          console.log(response.result)
          this.id = response.id
          this.isLoading = false
          this.text = ''
          this.get_balance()
          this.typs = false
          this.typ = false
        }).catch(error => {
          this.error = error.response.data
          this.isLoading = false
          this.get_balance()
          this.typs = false
          this.typ = false
        })
      var ob = document.getElementById('messages')
      ob.scrollTop = ob.scrollHeight;
    }
  },
  watch: {
    typs: {
      handler: function () {
        if (this.typs) {
          this.typing();
        }

      },
      deep: true
    },

  }

}
</script>
