<template>
    <div>
        <sidenav id="side" />
        <navbar />
        <div style="padding-top:77px">
            <router-view style="min-height: 100%;
                          height: auto !important;
                          height: 100%;
                          margin: 0 auto -142px;
                          "></router-view>
        </div>

        <footers style="position:fixed ; bottom: 0; width: 100%" />
    </div>
</template>
  
<script>
import navbar from './navbar.vue'
import sidenav from './sidenav.vue'
import axios from 'axios'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    components: {
        navbar,
        sidenav
    },
    beforeCreate() {
        async function get_user() {
            await axios
                .get('user')
                .then(response => response.data)
                .then(response => {
                    if (!response.is_superuser) {
                        window.location.href = 'https://www.limoo.ai';
                    }
                }).catch(() => {
                    window.location.href = 'https://www.limoo.ai';
                })
        }
        get_user()

    }
}
</script>
  
<style scoped></style>