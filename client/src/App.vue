<template>
<<<<<<< HEAD
  <Header/>
    <div>
      
    </div>
  <Footer />
</template>

<script>

import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'
export default {
components: { Header, Footer}
}
</script>

=======
  <div>
  <Header />
  <router-view/>
  <Footer />
  </div>
</template>
<script>
import Header from './layouts/Header';
import Footer from './layouts/Footer';
export default {
  components: {Header, Footer},
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
}
</script>
>>>>>>> 8f993fde411ef2dc0a4a02a6c4a60991553ca658
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
