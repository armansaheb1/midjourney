<template>
  <div
    style="background: url('/login-bg.png'); background-size: 100% 100%; position: absolute; width: 100%; height:100%; top: 0; left: 0">
    <div class="card" style="z-index:100; text-align: center;    border: none;background: none; padding-top: 110px;">
      
      <div class="card-body">
        <div class="alert alert-success" v-if="success">{{ success }}</div>
        <div v-if="!verify && !codder">
          <p>Please Add Your Phone Number</p>
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
          this.add_user()
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
            const toPath = this.$route.go || '/'
            this.$router.push(toPath)
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
