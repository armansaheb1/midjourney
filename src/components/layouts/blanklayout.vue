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
    </div>
</template>
  
<script>
import navbar from './navbar.vue'
import sidenav from './sidenav.vue'
import footers from './footer.vue'

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    components: {
        navbar,
        sidenav,
        footers
    }
}
</script>
  
<style scoped></style>