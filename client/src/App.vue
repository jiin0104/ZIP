<template>
   <!--페이지에 헤더뷰파일 삽입됨 -->
  <Header/>
      <!-- 페이지에 라우터로 받은 여러가지 뷰파일 삽입됨 -->
  <router-view/>
      <!-- 페이지에 푸터뷰파일 삽입됨 -->
  <Footer />
</template>

<script>

import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'

export default {
components: { Header, Footer },
//스토어에서 받아온 유저정보를 페이지에 적용
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
}

</script>

<style>
#app {
height: 800px;
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
