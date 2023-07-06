import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'


const app = createApp(App);
app.use(router);
app.mixin(mixins);
app.use(store);
app.mount('#app');

window.Kakao.init("2da1dfec1c5fbfc311dcdfc163b3a092")