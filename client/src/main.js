//각종 js 파일을 병합해서 app에 적용 시키는 파일

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'


const app = createApp(App);
app.use(router);
app.mixin(mixins);
app.use(store);
///pubilc폴더에 index.html 태그 중 app이라는 id를 가진 div 태그를 마운트.
app.mount('#app');

window.Kakao.init("카카오 앱 키 넣어야 됨")