<template>
    <div
        :style="`height: 70px; width: 100%; background: #FED001;margin-top: -5px; z-index: 0;padding: 2%;position: absolute;
                                                                                                                                                                                                                                                                                                                      top: ${allheight}px;`">
        <h6 style="margin-top: 20px;font-size:13px; float: left;">Terms & Condition</h6>
        <h6 style="margin-top: 20px;font-size:13px; float: right;">Copyright-Limoo.ai</h6>
    </div>
    <a href="https://www.instagram.com/limoo.ai/">
        <div
            :style="`width: 140px; height: 140px; border-radius: 50%;background: #FED001;margin: auto; margin-top: -150px; top: ${allheight + 70}px;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  position: absolute; box-shadow: grey 1px 2px -1px; border: solid white 2px; margin-left: ${width / 2}px`">
            <img src="/cam.png" style="width: 30px; margin: 20px; margin-bottom: 10px" alt="">
            <img src="/limooai.png" style="height: 22px; margin: 5px" alt="">

        </div>
    </a>
    <div style="position: fixed; bottom: 50px; left: 10px ">
        <a style="position: fixed; bottom: 50px; left: 10px"
            href="https://trustseal.enamad.ir/?id=338181&code=GsQkLwMhSsvTLzKeqGvl">
            <img loading="lazy" referrerpolicy='origin'
                src='https://trustseal.enamad.ir/Content/Images/Star2/81.png?v=5.0.0.3777' alt=''
                style='cursor:pointer; background-color: white;border-radius: 10px;width: 65px' Code='GsQkLwMhSsvTLzKeqGvl'>
        </a>
    </div>
    <div style="position: fixed; bottom: 50px; right: 22px ">
        <a style="position: fixed; bottom: 50px; right: 22px" href="/support">
            <img loading="lazy" referrerpolicy='origin' src='/chatbot.png' alt=''
                style='cursor:pointer; background-color: white;border-radius: 10px;width: 70px' Code='GsQkLwMhSsvTLzKeqGvl'>
        </a>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import login from '../Login2.vue'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import imagine from '../modals/Imagine.vue'

export default {
    name: 'HomeView',
    components: {
        HelloWorld,
        login,
        VueFinalModal,
        imagine
    },
    data() {
        return {
            text: '',
            showModal: false,
            height: 0,
            width: 0,
            allheight: 0
        }
    },
    mounted() {
        this.get_height()
    },
    updated() {
        this.get_height()
    },
    methods: {
        get_height() {
            setTimeout(() => {
                this.get_height()
            }, 100);
            if (document.querySelector('#app').offsetHeight < window.innerHeight) {
                this.allheight = window.innerHeight - 65
            } else {
                this.allheight = document.querySelector('#app').offsetHeight - 65
            }
            this.width = window.innerWidth - 140
            this.height = window.innerWidth * (295 / 430)
            window.addEventListener('resize', () => {

                if (document.querySelector('#app').offsetHeight < window.innerHeight) {
                    this.allheight = window.innerHeight - 65
                } else {
                    this.allheight = document.querySelector('#app').offsetHeight - 65
                }
                this.width = window.innerWidth - 140
                this.height = window.innerWidth * (295 / 430)
            })
        },
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

a {
    color: #444;
    text-decoration: none;
}

a:hover {
    color: #444;
    text-decoration: none;
}
</style>