<template>
    <div>

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
                    else {
                        window.location.href = 'https://www.limoo.ai/admin/dashboard';
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