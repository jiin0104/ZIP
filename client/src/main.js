//각종 js 파일을 병합해서 app에 적용 시키는 파일


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';




// import specific icons
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// add icons to the library
library.add(fas, far, fab);

const app = createApp(App);
app.use(router);
app.mixin(mixins);
app.use(store);
///public폴더에 index.html 태그 중 app이라는 id를 가진 div 태그를 마운트.
app.mount('#app');
app.component('font-awesome-icon', FontAwesomeIcon);
window.Kakao.init("2da1dfec1c5fbfc311dcdfc163b3a092")