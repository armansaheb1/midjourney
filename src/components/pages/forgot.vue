


<template>
  <div style="padding: 2% 5%">
    <div class="card-body">
      <a class="navbar-brand" href="/"><img loading="lazy" style="height:60px" src="/LIMOO_whole_logo.png" alt=""></a>
      <br><br>
      <div class="card">
        <div class="card-header"
          :class="{ 'bannerbg-dark': $store.state.isDark, 'bannerbg-light': !$store.state.isDark }">
          Forgot Password
        </div>
        <div class="card-body">
          <p v-if="ferror" class="alert alert-danger">توکن منقضی شده است</p>
          <p v-if="fsuccess" class="alert alert-success">کلمه عبور با موفقیت تغییر کرد</p>
          <form @submit.prevent="fsubmitForm()">
            <div class="">
              <div class="" id="show_hide_passwords">
                <input style="text-align: right" required class="form-control Rpass" v-model="password"
                  placeholder="کلمه عبور" type="password">
                <div class="invalid-tooltip">{{ Rptool }}</div>
              </div>
            </div><br>
            <button class="btn btn-dark form-control">Change Password</button>
            <br><br>


          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app-layout-navbar',
  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      'ferror': false,
      'fsuccess': false,
      'password': ''
    }
  },
  mounted() {
  },
  methods: {
    async fsubmitForm() {
      var token = this.$route.params.token
      this.fsuccess = false
      this.ferror = false
      await axios
        .post('password_reset/confirm/', { token: token, password: this.password })
        .then(response => {
          this.fsuccess = true
          setTimeout(() => {
            const toPath = this.$route.go || '/'
            this.$router.push(toPath)
          }, 2000)



        })
        .catch(error => {
          this.ferror = true

        })
    }
  }
}
</script>
