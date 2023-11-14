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
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    components: {
        navbar,
        sidenav
    }
}
</script>
  
<style scoped></style>