import 'assets/scss/base.scss'
import 'assets/font/iconfont.css'

import Vue from 'vue';

import fastclick from 'fastclick';
fastclick.attach(document.body);

import VueClipboard from "vue-clipboard2"
Vue.use(VueClipboard)

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);


import router from './router'
import App from './App'

// import 'directives'

import store from './store'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: createElement => createElement(App)
})
