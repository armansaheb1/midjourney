<template>
    <div>
        <div v-if="$store.state.side" @click="$store.state.side = !$store.state.side" id="noside"
            :style="`position:fixed; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 10; padding-top: 77px; left: 0;width: ${width - 250}px `">
        </div>
        <div v-if="$store.state.side"
            style="z-index: 11;width: 250px; height: 100%;  background: white;right: 0;top:0; padding-top: 77px;position: fixed; overflow: auto;">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/imagine" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        {{ name }}<br>

                        Coin Balance : {{ balance }}
                        <a style="font-size: 10px; text-decoration:underline ;" class="nav-link " href="/charge"
                            id="navbarDropdown" role="button" aria-expanded="false">
                            Charge Account
                        </a>
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
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/imagine" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        Face Swap
                    </a>
                    <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                        aria-expanded="false">
                        Face Swap
                    </a>
                </li>
                <li style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/my-imagine" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        Face Swap Orders
                    </a>
                    <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                        aria-expanded="false">
                        Face Swap Orders
                    </a>
                </li>
                <li style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/imagine" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        ChatGPT
                    </a>
                    <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                        aria-expanded="false">
                        ChatGPT
                    </a>
                </li>
                <li style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/my-imagine" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        ChatGPT Orders
                    </a>
                    <a v-else @click="login()" class="nav-link " href="#" id="navbarDropdown" role="button"
                        aria-expanded="false">
                        ChatGPT Orders
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
                <br>


            </ul>
        </div>
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
        this.get_user()
        this.get_balance()
        this.get_width()
    },
    data() {
        return {
            showModal: false,
            name: '',
            width: 0
        }
    },
    methods: {
        get_width() {
            this.width = window.innerWidth
            window.addEventListener('resize', () => {
                this.width = window.innerWidth
            })
        },
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