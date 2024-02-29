<template>
    <div>
        <div v-if="$store.state.side" @click="$store.state.side = !$store.state.side" id="noside"
            :style="`position:fixed; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 10; margin-top:77px; left: 0;width: ${width - 250}px `">
        </div>
        <div v-if="$store.state.side"
            style="z-index: 11;width: 250px; height: 100%;  background: white;right: 0;top:0; margin-top:77px;position: fixed; overflow: auto;">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                <li style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/admin/dashboard" id="navbarDropdown" role="button" aria-expanded="false">
                        Dashboard
                    </a>
                </li>
                <li style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/admin/transactions" id="navbarDropdown" role="button" aria-expanded="false">
                        Deposit History
                    </a>
                </li>
                <li style="margin: 3px" class="nav-item ">
                    <a href="/admin/users" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Users
                    </a>
                </li>
                <li style="margin: 3px" class="nav-item ">
                    <a href="/admin/imagines" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Imagine Orders
                    </a>
                </li>
                <li style="margin: 3px" class="nav-item ">
                    <a disabled href="/admin/swaps" class="nav-link " id="navbarDropdown" role="button"
                        aria-expanded="false">
                        Face Swap Orders
                    </a>
                </li>

                <li style="margin: 3px" class="nav-item ">
                    <a disabled href="#" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        ChatGPT Orders
                    </a>
                </li>

                <li style="margin: 3px" class="nav-item ">
                    <a href="/admin/packages" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Packages
                    </a>
                </li>
                <li style="margin: 3px" class="nav-item ">
                    <a href="/admin/bonus" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Bonus
                    </a>
                </li>
                <hr>
                <li class="nav-item ">
                    <a href="/logout" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Log Out
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
    top: 18%
}


.login-card::-webkit-scrollbar {
    width: 0;
}

@media only screen and (max-width: 500px) {
    .login-card {
        width: 95%;
        left: 2.5%;
        top: 5%
    }
}

.login-card::-webkit-scrollbar {
    width: 0;
}
</style>