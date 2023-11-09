<template>
    <div>
        <navbar />
        <router-view style="min-height: 100%;
          height: auto !important;
          height: 100%;
          margin: 0 auto -142px;"></router-view>
        <footers style="position:fixed ; bottom: 0; width: 100%" />
    </div>
</template>
  
<script>
import navbar from './navbar.vue'
import footers from './footer.vue'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    components: {
        footers,
        navbar,

    }
}
</script>
  
<style scoped></style>