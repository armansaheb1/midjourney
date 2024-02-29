<template>
  <div class="home" style="background: white;padding: 0 3%">
    <div style="z-index: 10;">
      <a class="btn btn-secondary" style="width: 46%; margin: 2%; float:right"><label for="">balance :
        </label>{{ parseFloat(balance).toFixed(2) }}</a>
      <a href="/" class="btn btn-warning" style="width: 46%; margin: 2%; float:right">Home</a>
    </div>
    <br><br>
    <div id='messages'
      :style="`position: absolute; max-height: ${allheight - 170}px; overflow:auto; width: 100%; bottom:${allheight - (allheight - 150)}px; left: 0; padding: 0 6%;z-index: -1;padding-bottom: 150px;`">
      <div>
        <br><br>
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
            <div class="card-body" style="white-space: pre-line; text-align: justify">
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
            <div class="card-body" style="white-space: pre-line; text-align: justify">
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
      <div v-if="Gerror">
        <div style="width: 70px; float: left; ">
          <div style="height: 50px;width: 50px;background-color: #000;; border-radius: 50%">
            <img style="width: 50%; margin:12% 20%; border-radius: 0%" src="/smalllogo.png" alt="">
          </div>
        </div>
        <div class="card alert alert-danger" style="width: 60%; float: left ;">
          <div class="card-body">
            {{ Gerror }}
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
        style="height: 50px;border-radius: 25px;background: #efefef;margin-bottom: -50px;position:relative;z-index: 10000"
        id="text" cols="8" rows="6" type="text" v-model="text" class="form-control" required>
      <button style="position: relative;
                                                                                    top: -2px;
                                                                                    left: 44%;border-radius:50%"
        id="submit" class="btn"><span style="font-size: 38px; color: #444;position:relative;z-index: 10000"
          class="material-symbols-outlined">
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
      Gerror: '',
      result: [],
      id: '',
      isLoading: false,
      fullPage: true,
      typ: '',
      typs: false
    }
  },
  mounted() {
    this.get_balance()
    this.get_messages()
  },
  methods: {
    typing() {
      if (this.typs) {
        this.typ = 'typing'
        setTimeout(() => {
          this.typ = this.typ + ' .'
          setTimeout(() => {
            this.typ = this.typ + ' .'
            setTimeout(() => {
              this.typ = this.typ + ' .'
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
    async get_messages() {

      if (this.$route.params.id) {
        this.isLoading = true
        var id = this.$route.params.id

        await axios
          .get(`/gpt/${id}`)
          .then(response => response.data)
          .then(response => {
            this.result = response.result
            this.id = response.id
            this.isLoading = false
          })
      }
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
      this.Gerror = ''
      setTimeout(() => {
        document.querySelector('#messages').scrollIntoView(false);
      }, 500);
      if (this.balance === 0) {
        this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>Please Charge Your Account First</h5>`)
        setTimeout(() => {
          const toPath = this.$route.go || '/charge'
          this.$router.push(toPath)
        }, 2000);
        return false
      }
      if (this.id) {
        await axios
          .post('/gpt', { text: text, id: this.id })
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
            setTimeout(() => {
              document.querySelector('#messages').scrollIntoView(false);
            }, 500);
          }).catch(error => {
            this.Gerror = 'مشکلی پیش آمده لطفا سوال خود را چک کرده و مجددا تلاش نمایید'
            this.isLoading = false
            this.get_balance()
            this.typs = false
            this.typ = false
            setTimeout(() => {
              document.querySelector('#messages').scrollIntoView(false);
            }, 500);

          })
      } else {
        await axios
          .post('/gpt', { text: text })
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
            setTimeout(() => {
              document.querySelector('#messages').scrollIntoView(false);
            }, 500);
          }).catch(error => {
            this.Gerror = 'مشکلی پیش آمده لطفا سوال خود را چک کرده و مجددا تلاش نمایید'
            this.isLoading = false
            this.get_balance()
            this.typs = false
            this.typ = false
            setTimeout(() => {
              document.querySelector('#messages').scrollIntoView(false);
            }, 500);
          })
      }
      setTimeout(() => {
        document.querySelectorAll('code').forEach(elem => {
          elem.innerHTML = elem.innerHTML.replace('                javascript', '').replace('                python', '').replace('                html', '').replace('                css', '').replace('              ', '')
        })
      }, 500);
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
<style>
pre {

  font-size: 12px;
  font-weight: bold
}

@media only screen and (max-width: 500px) {
  pre {

    font-size: 8px;
    font-weight: bold
  }
}
</style>