<template>
    <div>
        <nav style="height:81px; border-bottom: solid lightgrey 1px" class="navbar navbar-expand-lg"
            :class="{ 'bg-light': !$store.state.isDark, 'bg-dark': $store.state.isDark }">
            <div class="container-fluid">
                <a class="navbar-brand" href="/"><img style="height:30px ; margin-left:10px"
                        src="https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg"
                        alt=""></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item ">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/dashboard" id="navbarDropdown"
                                role="button" aria-expanded="false">
                                Dashboard
                            </a>
                            <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                                aria-expanded="false">
                                Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/dashboard/wallets"
                                id="navbarDropdown" role="button" aria-expanded="false">
                                Wallets
                            </a>
                            <a v-else @click="login()" class="nav-link">
                                Wallets
                            </a>
                        </li>
                        <li class="nav-item ">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/dashboard/buy"
                                id="navbarDropdown" role="button" aria-expanded="false">
                                Buy
                            </a>
                            <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                                aria-expanded="false">
                                Buy
                            </a>
                        </li>
                        <li class="nav-item">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/dashboard/sell"
                                id="navbarDropdown" role="button" aria-expanded="false">
                                Sell
                            </a>
                            <a v-else @click="login()" class="nav-link">
                                Sell
                            </a>
                        </li>
                        <li class="nav-item">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/dashboard/exchange"
                                id="navbarDropdown" role="button" aria-expanded="false">
                                Swap
                            </a>
                            <a v-else @click="login()" class="nav-link">
                                Swap
                            </a>
                        </li>
                        <li class="nav-item">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/dashboard" id="navbarDropdown"
                                role="button" aria-expanded="false">
                                Spot Trading
                            </a>
                            <a v-else @click="login()" class="nav-link">
                                Spot Trading
                            </a>
                        </li>
                        <li class="nav-item">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/dashboard/savings"
                                id="navbarDropdown" role="button" aria-expanded="false">
                                Savings
                            </a>
                            <a v-else @click="login()" class="nav-link">
                                Savings
                            </a>
                        </li>
                    </ul>

                    <ul class="navbar-nav  mb-2 mb-lg-0" style="font-size:23px">
                        <li class="nav-item ">
                            <a style="margin-right:15px" v-if="!$store.state.isDark" @click="darker()" class="nav-link "
                                href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <font-awesome-icon icon="moon" />
                            </a>
                            <a style="margin-right:15px" v-if="$store.state.isDark" @click="lighter()" class="nav-link "
                                href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <font-awesome-icon icon="sun" />
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <font-awesome-icon icon="bell" />
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown"
                                style="left:-150px; margin:0; padding:0">
                                <li style="max-width:300px">
                                    <a class="dropdown-item" style="width:100%;  white-space: pre-line;" href="#">
                                        <h5 style="width:100%;  white-space: pre-line;">Title</h5>
                                        <p style="width:100% ;  white-space: pre-line; font-size:14px"> Hi Hi Hi Hi Hi Hi Hi
                                            Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi </p>
                                        <p style="margin : 0!important ; text-align: right" class="text-muted">5h</p>
                                    </a>
                                    <hr style="margin : 0">
                                </li>
                                <li style="max-width:300px">
                                    <a class="dropdown-item" style="width:100%;  white-space: pre-line;" href="#">
                                        <h5 style="width:100%;  white-space: pre-line;">Title</h5>
                                        <p style="width:100% ;  white-space: pre-line; font-size:14px"> Hi Hi Hi Hi Hi Hi Hi
                                            Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi </p>
                                        <p style="margin : 0!important ; text-align: right" class="text-muted">5h</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li> </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <font-awesome-icon icon="circle-user" />
                            </a>
                            <ul v-if="$store.state.isAuthenticated" class="dropdown-menu" aria-labelledby="navbarDropdown"
                                style="left:-150px">
                                <li><a class="dropdown-item" href="/dashboard/" style="color:blue">{{ name }}</a></li>
                                <li><a class="dropdown-item" href="/dashboard/profile">Profile</a></li>
                                <li><a class="dropdown-item" href="#">Membership</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><router-link to="/logout" class="dropdown-item" href="#">Logout</router-link></li>
                            </ul>
                            <ul v-if="!$store.state.isAuthenticated" class="dropdown-menu" aria-labelledby="navbarDropdown"
                                style="left:-150px">
                                <li><a @click="login()" class="dropdown-item" href="#">LOGIN</a></li>
                                <li><a @click="login()" class="dropdown-item" href="#">REGISTER</a></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
        <vue-final-modal style="width:100% ; background:none" v-model="showModal">
            <login />
        </vue-final-modal>
    </div>
</template>
  
<script>
import axios from 'axios'
import login from './../components/Login2.vue'
export default {
    name: 'navbar',
    props: {
        msg: String
    },
    components: {
        login
    },
    mounted() {
        this.get_user()
    },
    data() {
        return {
            showModal: false,
            name: '',
        }
    },
    methods: {
        async get_user() {
            await axios
                .get('/user')
                .then(response => response.data[0])
                .then(response => {
                    this.name = `${response.first_name} ${response.last_name}`
                })
        },
        login() {
            this.showModal = true
        },
        darker() {
            this.$store.state.isDark = true
            localStorage.setItem('isDark', true)
        },
        lighter() {
            this.$store.state.isDark = false
            localStorage.setItem('isDark', false)
        },
    }
}
</script>
  
<style scoped></style>