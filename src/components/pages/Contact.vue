<template>
    <div class="home" style="text-decoration: none; padding: 5%">
        <div
            style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
            <div class="card" style="overflow: auto;direction: ltr;">
                <div class="card-header" style="padding: 0">
                    <h3>
                        Contact Us
                    </h3>
                </div>
                <div class="card-body" style="text-align: left;">
                    <p>
                        <br>
                        Email:
                        <br>
                    <p style="text-align: left;">
                        team@limoo.ai
                    </p>

                    </p>
                </div>
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
            showModal: false
        }
    },
    methods: {
        async get_image(id) {
            await axios
                .get(`/imagine-result/${id}`)
                .then(response => response.data)
                .then(response => {

                    if (!response.imageUrl) {
                        setTimeout(() => {
                            this.get_image(id)
                        }, 2000);
                    }
                    else {
                    }
                })

        },
        login() {
            this.$store.state.showModal = true
        },
        async submit() {
            await axios
                .post('/imagine', { text: this.text })
                .then(response => response.data)
                .then(response => {
                    this.get_image(response)
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
</style>