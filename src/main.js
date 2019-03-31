import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store/store.js';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

import 'element-ui/lib/theme-chalk/index.css';

window.axios = axios;
Vue.use(ElementUI, { locale });

new Vue({
	store,
  el: '#app',
  render: h => h(App)
})
