import 'assets/scss/base.scss'
import 'assets/font/iconfont.css'


import fastclick from 'fastclick';
fastclick.attach(document.body)

import Vue from 'vue';
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
