<template>
    <div>
        <nav style="height:77px; border-bottom: solid lightgrey 1px" class="navbar "
            :class="{ 'bg-light': !$store.state.isDark, 'bg-dark': $store.state.isDark }">
            <div class="container-fluid" style="">
                <a class="navbar-brand" href="/"><img style="height:65px ; margin-left:10px ; margin-top: -8px"
                        src="/LIMOO.jpg" alt=""></a>
                <button style="margin-top: -10px" class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div style="background-color: rgb(248 249 250); color:#444;position: relative; top:30px; border-radius: 10px; border: solid 1px grey; z-index: 100"
                    class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item ">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/imagine" id="navbarDropdown"
                                role="button" aria-expanded="false">
                                {{ name }}<br>

                                Coin Balance : {{ balance }}
                            </a>
                        </li>
                        <hr>
                        <li style="margin: 3px" class="nav-item ">
                            <a class="nav-link " href="/" id="navbarDropdown" role="button" aria-expanded="false">
                                Home
                            </a>
                        </li>
                        <li style="margin: 3px" class="nav-item ">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/imagine" id="navbarDropdown"
                                role="button" aria-expanded="false">
                                Imagine
                            </a>
                            <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                                aria-expanded="false">
                                Imagine
                            </a>
                        </li>
                        <li style="margin: 3px" class="nav-item ">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/my-imagine" id="navbarDropdown"
                                role="button" aria-expanded="false">
                                My Imagine Orders
                            </a>
                            <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                                aria-expanded="false">
                                My Imagine Orders
                            </a>
                        </li>
                        <li style="margin: 3px" class="nav-item ">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/charge" id="navbarDropdown"
                                role="button" aria-expanded="false">
                                Charge Account
                            </a>
                            <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                                aria-expanded="false">
                                Charge Account
                            </a>
                        </li>
                        <hr>
                        <li class="nav-item ">
                            <a v-if="$store.state.isAuthenticated" class="nav-link " href="/logout" id="navbarDropdown"
                                role="button" aria-expanded="false">
                                Log Out
                            </a>
                            <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                                aria-expanded="false">
                                Log In / Sign Up
                            </a>
                        </li>


                    </ul>

                </div>
            </div>
        </nav>
        <vue-final-modal style="width:100% ; background:none; z-index: 1000" v-model="showModal">
            <div @click="showModal = false" style="position:absolute; width: 100%; height: 100%; top:0;left: 0; z-index: 1">

            </div>
            <div style="; overflow: auto;max-height: 90%;" class="login-card">
                <login />
            </div>
        </vue-final-modal>
    </div>
</template>
  
<script>
import axios from 'axios'
import login from '../Login2.vue'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'


export default {
    name: 'navbar',
    props: {
        msg: String
    },
    components: {
        login,
        VueFinalModal
    },
    mounted() {
        this.get_user(),
            this.get_balance()
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
                .get('user')
                .then(response => response.data)
                .then(response => {
                    this.name = response.username
                })
        },
        async get_balance() {
            await axios
                .get(`/charge`)
                .then(response => response.data)
                .then(response => {
                    this.balance = response
                })

        },
        login() {
            this.showModal = true
        },
    }
}
</script>
  
<style scoped>
.nav-link {
    color: #444 !important
}

.login-card {
    position: absolute;
    z-index: 101;
    width: 70%;
    left: 15%;
    top: 5%
}

.login-card::-webkit-scrollbar {
    width: 0;
}
</style>