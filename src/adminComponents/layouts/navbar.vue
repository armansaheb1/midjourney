<template>
    <div>
        <nav style="height:77px; border-bottom: solid lightgrey 1px; z-index: 12;position:fixed; width: 100%"
            class="navbar " :class="{ 'bg-light': !$store.state.isDark, 'bg-dark': $store.state.isDark }">
            <div class="container-fluid" style="">
                <a class="navbar-brand" href="/"><img loading="lazy"
                        style="height:65px ; margin-left:10px ; margin-top: -8px" src="/LIMOO.jpg" alt=""></a>
                <button style="margin-top: -10px" class="navbar-toggler" type="button"
                    @click="$store.state.side = !$store.state.side">
                    <span class="navbar-toggler-icon"></span>
                </button>
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
</style>