<template>
    <div class="home" style="text-decoration: none; padding: 5%">
        <div
            style="width: 100%; margin: auto; border-radius: 0; border:solid 1px lightgrey;margin-bottom: 0; border-radius: 5px">
            <div class="card" style="overflow: auto;direction: ltr;">
                <div class="card-header" style="padding: 0">
                    <h3 v-if="$store.state.language">
                        قوانین و مقررات وب‌سایت لیمو
                    </h3>
                    <h3 v-else>
                        Rules
                    </h3>

                </div>
                <div class="card-body">
                    <p v-if="$store.state.language" style="text-align: right;direction: rtl">
                        <br>


                        1. مقدمه: با استفاده از خدمات وب‌سایت لیمو، کاربران با شرایط و قوانین زیر موافقت می‌کنند.<br>
                        2. حفظ حریم خصوصی: ما به حریم خصوصی کاربران احترام می‌گذاریم و اطلاعات شخصی آن‌ها را به طور محرمانه
                        نگهداری می‌کنیم.<br>
                        3. استفاده از خدمات: کاربران باید از خدمات وب‌سایت در چارچوب موازین اخلاقی استفاده کنند.<br>
                        4. مسئولیت محتوا: کاربران مسئولیت کامل محتوای ایجاد شده توسط خود را بر عهده دارند.<br>
                        5. محدودیت استفاده: استفاده از خدمات لیمو برای اقدامات غیرقانونی، تهدیدآمیز یا توهین‌آمیز ممنوع
                        است.<br>
                        6. تغییرات در خدمات: لیمو حق تغییر یا قطع خدمات بدون اطلاع قبلی را دارد.<br>
                        7. پرداخت‌ها و هزینه‌ها: شرایط پرداخت و هزینه‌های خدمات باید به طور واضح بیان شود.<br>
                        8. لغو سرویس: کاربران می‌توانند در هر زمانی اشتراک خود را لغو کنند.<br>
                        9. اعتبار پکیج‌ها: تمام پکیج‌های خریداری شده در وب‌سایت لیمو تنها ۳۰ روز اعتبار دارند.<br>
                        10. ذخیره‌سازی عکس‌ها: عکس‌های آپلود شده به وب‌سایت لیمو بیش از ۱۵ روز ذخیره نخواهند شد.<br>
                        11. قانون حاکم: قوانین و مقررات وب‌سایت لیمو تابع قوانین جمهوری اسلامی ایران است. <br>
                    </p>
                    <p v-else style="text-align: left;">
                        <br>
                        Terms and Conditions of Limoo Website<br>

                        1. Introduction: By using the services of the Limoo website, users agree to the following terms and
                        conditions.<br>
                        2. Privacy Protection: We respect the privacy of our users and keep their personal information
                        confidential.<br>
                        3. Use of Services: Users must use the website’s services within ethical norms.<br>
                        4. Content Responsibility: Users are fully responsible for the content they create.<br>
                        5. Usage Limitations: The use of Limoo services for illegal, threatening, or offensive actions is
                        prohibited.<br>
                        6. Service Changes: Limoo reserves the right to change or discontinue services without prior
                        notice.<br>
                        7. Payments and Fees: The terms of payment and the costs of services should be clearly stated.<br>
                        8. Service Cancellation: Users can cancel their subscription at any time.<br>
                        9. Governing Law: The terms and conditions of the Limoo website are subject to the global laws<br>
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