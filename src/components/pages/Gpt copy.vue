<template>
  <div class="home" style="padding: 3%">

    <div v-for="item in result">
      <div v-if="item.role === 'user'">
        <div class="card" style="width: 80%; float: right">
          <div class="card-body">
            {{ item.message }}
          </div>
        </div>
        <div style="clear: both"></div>
        <br><br>
      </div>
      <div v-else>
        <div v-if="(typeof item.message === 'string')" class="card"
          style="width: 80%; float: left ; background-color: #cecece;">
          <div class="card-body">
            {{ item.message }}
          </div>
        </div>

        <div v-else class="card" style="width: 80%; float: left ; background-color: #cecece;">
          <div v-for="(items, idx) in item.message" class="card-body">
            <div v-if="idx % 2 === 0">
              {{ items }}
            </div>
            <pre style="background-color: black;text-align: left; color: white; padding: 5%;" v-else>
              <code>
                {{ items }}
              </code>
            </pre>
          </div>
        </div>
        <div style="clear: both"></div>
        <br><br>
      </div>
      <br><br>
    </div>
    <div v-if="result"><br><br></div>
    <p class="alert alert-danger" v-if="Gerror">{{ Gerror }}</p>
    <form @submit.prevent="submit()" action="">
      <label v-if="$store.state.language" for="">هر چی میخوای از من بپرس</label>
      <label v-else for="">Ask Me Anything:</label>
      <textarea id="text" cols="8" rows="6" type="text" v-model="text" class="form-control" required></textarea><br>
      <label for="">Current balance : </label><a href="" style="margin-left: 5px">{{ balance }}</a><br>
      <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />

      <button v-if="$store.state.language" id="submit" class="btn btn-dark">ثبت</button>
      <button v-else id="submit" class="btn btn-dark">Submit</button>

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
      result: '',
      id: '',
      isLoading: false,
      fullPage: true,
    }
  },
  mounted() {
    this.get_balance()
    this.get_messages()
  },
  methods: {
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
      this.isLoading = true
      this.Gerror = ''
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
      if (this.id) {
        await axios
          .post('/gpt', { text: this.text, id: this.id })
          .then(response => response.data)
          .then(response => {
            this.result = response.result
            for (var a of this.result) {
              if (a.message.includes('```')) {
                a.message = a.message.split('```')
              }
            }
            this.id = response.id
            document.getElementById('submit').disabled = false
            document.getElementById('submit').innerHTML = 'Submit'
            this.text = ''

            this.isLoading = false
            this.get_balance()
          }).catch(error => {
            this.Gerror = error.response.data
            document.getElementById('submit').disabled = false
            document.getElementById('submit').innerHTML = 'Submit'
            this.isLoading = false
            this.get_balance()
          })
      } else {
        await axios
          .post('/gpt', { text: this.text })
          .then(response => response.data)
          .then(response => {
            this.result = response.result
            for (var a of this.result) {
              if (a.message.includes('```')) {
                a.message = a.message.split('```')
              }
            }
            console.log(response.result)
            this.id = response.id
            document.getElementById('submit').disabled = false
            document.getElementById('submit').innerHTML = 'Submit'
            this.isLoading = false
            this.text = ''
            this.get_balance()
          }).catch(error => {
            this.Gerror = error.response.data
            document.getElementById('submit').disabled = false
            document.getElementById('submit').innerHTML = 'Submit'
            this.isLoading = false
            this.get_balance()
          })
      }
      setTimeout(() => {
        document.querySelectorAll('code').forEach(elem => {
          elem.innerHTML = elem.innerHTML.replace('                javascript', '').replace('                python', '').replace('                html', '').replace('                css', '').replace('              ', '')
        })
      }, 500);
    }
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