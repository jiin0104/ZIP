<template>
  <Header/>
  <router-view/>
  <Footer />
</template>

<script>

import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'
export default {
components: { Header, Footer}
}
</script>

<style>
#app {
height: 1300px;
min-height: 100%;
position: relative;
padding-bottom: 170px;
}

footer {
height: 150px;
position: absolute;
bottom: 0;
width: 100%;
}
</style>
