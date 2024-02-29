<template>
  <div
    style="background: url('/login-bg.png'); background-size: 100% 100%; position: absolute; width: 100%; height:100%; top: 0; left: 0">
    <div class="card" style="z-index:100; text-align: center;    border: none;background: none; padding-top: 110px;">
      <div v-if="!forgot" :class="{ 'bannerbg-dark': $store.state.isDark, 'bannerbg-light': !$store.state.isDark }"
        style="padding:0">
        <button v-if="!$store.state.language" v-bind:class="{ 'active': login }" class="login-btn"
          @click="login = true">Login</button>
        <button v-if="!$store.state.language" v-bind:class="{ 'active': !login }" class="login-btn"
          @click="login = false">
          Register</button>
        <button v-if="$store.state.language" v-bind:class="{ 'active': login }" class="login-btn"
          @click="login = true">ورود</button>
        <button v-if="$store.state.language" v-bind:class="{ 'active': !login }" class="login-btn" @click="login = false">
          ثبت نام</button>
      </div>
      <div class="card-body" v-if="login && !forgot">
        <a class="navbar-brand" href="/"><img loading="lazy" style="height:60px" src="/LIMOO_whole_logo.png" alt=""></a>
        <div class="card" style="border: none">
          <div class="card-header"
            :class="{ 'bannerbg-dark': $store.state.isDark, 'bannerbg-light': !$store.state.isDark }">
            <div v-if="$store.state.language">ورود</div>
            <div v-if="!$store.state.language">Login</div>

            <br><br>
            <form @submit.prevent="submitForm()">
              <div id='form1'>
                <input style="text-align: right" type="text" class="form-control" v-model="username" placeholder="Email"
                  name="" id="">
                <br>
                <div class="form-group">
                  <div class="" id="show_hide_password">
                    <input style="text-align: right" v-model="password" class="form-control" type="password">
                    <div class="input-group-addon">
                    </div>
                  </div>
                </div>

                <p style="text-align:right; font-size:14px"> Forgot Your Passwrod ?<a href="#"
                    @click="forgot = true">Click Here</a></p>
              </div>
              <div id="form2" hidden>
                <label for="">Google Authenticator Code</label>
                <input style="text-align: right" v-model="gcode" class="form-control" id="passfld" placeholder="کلمه عبور"
                  type="text"><br>
              </div>
              <button v-if="$store.state.language" class="btn btn-dark form-control">ورود</button>
              <button v-if="!$store.state.language" class="btn btn-dark form-control">LOGIN</button>

              <br><br>
              <p v-if="$store.state.language" style="font-size:14px">حساب کاربری ندارید ؟<a
                  style="color:darkblue; margin-right:10px" @click="login = false">ثبت نام</a></p>
              <p v-if="!$store.state.language" style="font-size:14px"> Don't have an account ?<a
                  style="color:darkblue; margin-right:10px" @click="login = false">Register Now</a></p>


            </form>
          </div>
        </div>
      </div>




      <div class="card-body" v-if="!login && !forgot">
        <div v-if="!verify && !codder">
          <p v-if="Cerrors" class="alert alert-danger">{{ Cerrors }}</p>
          <input style="text-align:  right" maxlength="10" required type="text" v-model="phone"
            class="form-control Remail" placeholder="Phone Number : 9*********" name="" id=""><br>
          <button @click="get_sms_status()" class="btn btn-dark"> submit</button>
        </div>
        <div v-if="!verify && codder">
          <p v-if="Cerrors" class="alert alert-danger">{{ Cerrors }}</p>
          <input style="text-align: right" required type="text" v-model="code" class="form-control Remail"
            placeholder="Code" name="" id=""><br>
          <button @click="check_code()" class="btn btn-dark"> submit</button>
        </div>
        <div v-if="verify">
          <a class="navbar-brand" href="#"><img loading="lazy" style="height:60px" src="/LIMOO_whole_logo.png" alt=""></a>
          <div class="card" style="    border: none;">
            <div class="card-header"
              :class="{ 'bannerbg-dark': $store.state.isDark, 'bannerbg-light': !$store.state.isDark }">
              <div v-if="$store.state.language">ثبت نام</div>
              <div v-if="!$store.state.language">Register</div>

              <br><br>

              <p v-if="RRerrors" class="alert alert-danger">{{ RRerrors }}</p>
              <form @submit.prevent="RsubmitForm()">
                <div class="alert alert-success" v-if="success">{{ success }}</div>
                <input style="text-align: right" required type="text" v-model="Remail" class="form-control Remail"
                  placeholder="Email" name="" id="">
                <div class="invalid-tooltip">{{ Retool }}</div>
                <br>
                <div class="">
                  <div class="" id="show_hide_passwords">
                    <input style="text-align: right" required class="form-control Rpass" v-model="Rpassword"
                      placeholder="Password" type="password">
                    <div class="invalid-tooltip">{{ Rptool }}</div>
                  </div>
                </div><br>
                <input style="text-align: right" v-if="sslash" class="form-control Rrepass" v-model="Rrepassword"
                  placeholder="Password Confirmation" type="password">
                <div class="invalid-tooltip">{{ Rreptool }}</div><br>
                <button v-if="$store.state.language" id="submit2" class="btn btn-dark form-control" type="submit">ثبت
                  نام</button>
                <button v-if="!$store.state.language" id="submit2" class="btn btn-dark form-control"
                  type="submit">REGISTER</button>
              </form>
              <br>
              <p v-if="$store.state.language" style="font-size:14px">اکانت دارید؟<a
                  style="color:darkblue; margin-right:10px" @click="login = true">وارد شوید</a></p>
              <p v-if="!$store.state.language" style="font-size:14px"> Have an Account ?<a
                  style="color:darkblue; margin-right:10px" @click="login = true">Login</a></p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body" v-if="forgot">
        <a class="navbar-brand" href="/"><img loading="lazy" style="height:60px" src="/LIMOO_whole_logo.png" alt=""></a>
        <div class="card">
          <div class="card-header"
            :class="{ 'bannerbg-dark': $store.state.isDark, 'bannerbg-light': !$store.state.isDark }">
            <div v-if="$store.state.language">
              فراموشی رمز
            </div>
            <div v-if="!$store.state.language">
              Forgot Password
            </div>

          </div>
          <div class="card-body">
            <p v-if="ferror" class="alert alert-danger">Can't Find any Account With This Email</p>
            <p v-if="fsuccess" class="alert alert-success">Change Password Link Sent</p>
            <form @submit.prevent="fsubmitForm()">
              <div id='form1'>
                <input required style="text-align: right" type="text" class="form-control" v-model="fusername"
                  placeholder="Email" name="" id="">
                <br>
              </div>
              <button v-if="$store.state.language" class="btn btn-dark form-control">ثبت</button>
              <button v-if="!$store.state.language" class="btn btn-dark form-control">Submit</button>

              <br><br>
              <p style="text-align:right; font-size:14px; text-align: center"> <a href="#"
                  @click="forgot = false; login = true">Login</a></p>



            </form>
          </div>
        </div>
      </div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>
<script>
import axios from 'axios'
import Vcode from "vue3-puzzle-vcode";
export default {
  name: 'pages-authentication-login-v1',
  metaInfo: {
    title: 'Login v1 - Pages'
  },
  components: {
    Vcode
  },
  data: () => ({
    errors: [],
    errors2: [],
    ptool: '',
    utool: '',
    username: '',
    fusername: '',
    password: '',
    isShow: false,
    Rerrors: [],
    Cerrors: '',
    Rerrors2: [],
    Remail: '',
    Retool: '',
    Rutool: '',
    Rpassword: '',
    Rptool: '',
    Rrepassword: '',
    Rlast_name: '',
    Rfirst_name: '',
    slash: true,
    sslash: true,
    login: true,
    success: false,
    Rreptool: '',
    RisShow: false,
    forgot: false,
    fsuccess: false,
    ferror: false,
    verify: false,
    RRerrors: '',
    codder: false,
    code: '',
    phone: ''
  }),
  mounted() {
    document.title = ' The My Exchange | Login '
  },
  methods: {
    async RsubmitForm() {
      this.RRerrors = ''
      this.Rerrors = []
      this.Rerrors2 = []
      this.Rutool = ''
      this.Rptool = ''
      this.Rreptool = ''
      this.Retool = ''
      document.querySelector('.Rpass').className = document.querySelector('.Rpass').className.replace(' is-invalid', '')
      if (this.sslash) {
        document.querySelector('.Rrepass').className = document.querySelector('.Rrepass').className.replace(' is-invalid', '')
      }
      document.querySelector('.Remail').className = document.querySelector('.Remail').className.replace(' is-invalid', '')
      axios.defaults.headers.common.Authorization = ''
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      this.$store.commit('removeToken')
      if (this.Rpassword === '') {
        document.querySelector('.Rpass').className += ' is-invalid'
        this.Rerrors2.push('1')
        this.Rptool = ' Password is required'
      }
      if (this.Remail === '') {
        this.Rerrors2.push('1')
        document.querySelector('.Remail').className += ' is-invalid'
        this.Retool = ' Email is required'
      } else {
        var x = this.Remail
        var atposition = x.indexOf('@')
        var dotposition = x.lastIndexOf('.')
        if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
          this.Rerrors2.push('1')
          document.querySelector('.Remail').className += ' is-invalid'
          this.Retool = 'Invalid email format'
        }
      }
      if (this.Rrepassword === '' && this.sslash) {
        this.errors2.push('1')
        document.querySelector('.Rrepass').className += ' is-invalid'
        this.Rreptool = ' Password confirm is required'
      }
      if ((this.Rpassword !== '' && this.Rrepassword !== '' && this.Rpassword !== this.Rrepassword) && this.sslash) {
        this.errors2.push('1')
        document.querySelector('.Rpass').className += ' is-invalid'
        document.querySelector('.Rrepass').className += ' is-invalid'
        this.Rptool = ' Password confirm failed'
        this.Rreptool = ' Password confirm failed'
      }
      if (this.Rerrors2.length === 0) {
        const formData = {
          username: this.Remail.toLowerCase(),
          email: this.Remail.toLowerCase(),
          password: this.Rpassword
        }
        await axios
          .post('auth/users/', formData)
          .then(response => {
            this.add_user()
          })
          .catch(error => {

            if (error.response) {
              for (var property in error.response.data) {
                this.Rerrors.push(`${property}: ${error.response.data[property]}`)
              }
            } else if (error.message) {
              this.Rerrors.push(error.message)
            }
          })
      }
      if (this.Rerrors.length) {
        var errors = this.Rerrors
        var error = ''
        for (var er = 0; er < errors.length; er++) {
          error += '\n' + errors
        }
        this.RRerrors = error
      }
    },
    async submitForm() {
      this.errors = []
      axios.defaults.headers.common.Authorization = ''
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      this.$store.commit('removeToken')
      if (this.errors2.length === 0) {
        this.username = this.username.replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '')
        var formData
        formData = {
          username: this.username.toLowerCase(),
          password: this.password
        }
        await axios
          .post('auth/token/login', formData)
          .then(response => {
            if (response.data == 1) {
              document.getElementById('form1').hidden = true
              document.getElementById('form2').hidden = false
              return
            }
            const token = response.data.auth_token
            this.$store.commit('setToken', token)
            axios.defaults.headers.common.Authorization = 'Token ' + token
            this.$store.state.isAuthenticated = true
            localStorage.setItem('token', token)
            setTimeout(() => {
              var elem = document.createElement('a')
              elem.href = '/'
              elem.click()
            }, 1000);

          })
          .catch(error => {
            console.log(error)
            if (error.response) {
              if (error.response.data.length) {
                this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>${error.response.data[0]}</h5>`)
              } else {
                this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>Incorrect Username Or Password</h5>`)

              }
            } else if (error.message) {
              this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>${error.message}</h5>`)
            }
          })
      }
    },
    async fsubmitForm() {
      this.fsuccess = false
      this.ferror = false
      await axios
        .post('password_reset/', { email: this.fusername })
        .then(response => {
          this.fsuccess = true
        })
        .catch(error => {
          this.ferror = true
        })
    },
    async get_sms_status() {
      this.Cerrors = ''
      this.fsuccess = false
      this.ferror = false
      await axios
        .get(`sms-verify/${this.phone}`, { phone: this.phone })
        .then(response => {
          this.verify = true
        })
        .catch(error => {
          this.verify = false
          this.codder = true
        })
    },
    async check_code() {
      this.Cerrors = ''
      this.fsuccess = false
      this.ferror = false
      await axios
        .post(`sms-verify/${this.phone}`, { code: this.code })
        .then(response => {
          this.verify = true
        })
        .catch(error => {
          this.Cerrors = 'Wrong Code'
        })
    },
    async add_user() {
      await axios
        .put(`sms-verify/${this.phone}`, { username: this.Remail.toLowerCase() })
        .then(response => {
          this.success = 'your account has been successfully created , you will be redirected to the login page'
          setTimeout(() => {
            this.login = true
          }, 2000)
        })
        .catch(error => {
        })
    }
  }
}
</script>
<style>
div {
  font-family: myFirstFont;
}

#passfld {
  text-security: disc;
  -webkit-text-security: disc;
  -mox-text-security: disc;
}

.invalid-tooltip {
  position: relative;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  color: red;
  text-align: left;
}



.login-btn {
  width: 40%;
  float: left;
  background: none;
  border-style: none;
  padding: 10px;
  color: grey !important;
  background-color: lightgray;
  margin: 5%
}

.login-btn:hover {
  background: grey;
  color: black !important
}

.active {
  background: rgb(254, 208, 1) !important;
}
</style>
