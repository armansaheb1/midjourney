<template>
    <div class="home" style="text-decoration: none; padding: 5%">
        <div class="card" style="margin: 10%">
            <div class="card-body" style="padding: 7%">

                <div style="width: 35%; float: left">
                </div>
                <div v-html="item.content"></div>
                <div style="clear:both"></div>

            </div>
            <div
                style="width: 100%; float: right ; background: var(--bs-card-cap-bg); border-top:var(--bs-card-border-width) solid var(--bs-card-border-color)">
                <h6 v-if="item.get_file"
                    style="float: right; background: var(--bs-card-cap-bg); border-left:var(--bs-card-border-width) solid var(--bs-card-border-color); padding: 10px; margin: 0; cursor: pointer">
                    <a :href="item.get_file">Download</a>
                </h6>
                <h6 v-else
                    style="float: right; background: var(--bs-card-cap-bg); border-left:var(--bs-card-border-width) solid var(--bs-card-border-color); padding: 10px; margin: 0; color: grey">
                    Download</h6>

            </div>
        </div>
    </div>
    <div style="height: 200px;width: 100%"></div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import login from '../Login2.vue'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'

export default {
    name: 'HomeView',
    components: {
        HelloWorld,
        login,
        VueFinalModal,
    },
    data() {
        return {
            text: '',
            showModal: false,
            item: []
        }
    },
    mounted() {
        this.get_posts()
    },
    methods: {
        login() {
            this.$store.state.showModal = true
        },
        async get_posts() {
            var id = this.$route.params.id
            await axios
                .post(`/posts/${id}`)
                .then(response => response.data)
                .then(response => {
                    console.log(response)
                    this.item = response
                })

        }
    }
}
</script>
<style>
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

.topper {
    padding: 160px 0;
    font-size: 20px !important;
    background: url('https://www.limoo.ai/0_3.png');
    background-size: 100% 100%;
}

.topper h5 {
    font-size: 20px !important;
    border-radius: 15px;
    width: 70%;
    text-align: justify;
    direction: rtl;
    margin: 0px 15%;
}

@media only screen and (max-width: 500px) {
    .login-card {
        width: 95%;
        left: 2.5%;
        top: 12%
    }

    .topper {
        padding: 60px 0;
        font-size: 14px !important;
    }

    .topper h5 {
        font-size: 20px !important;
        border-radius: 15px;
        width: 90%;
        text-align: justify;
        direction: rtl;
        margin: 0px 5%;
    }
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
    text-align: justify;
}
</style>