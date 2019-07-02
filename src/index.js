import 'assets/scss/base.scss'
import 'assets/scss/el-cover.scss'
import 'assets/scss/element-variables.scss'
import 'assets/font/iconfont.css';
import Vue from 'vue'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import router from './router'
import App from './App'

import filters from 'filters'
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})
import 'directives'

import store from './store'

Vue.config.productionTip = false



// fetchGetConfig().then(res=> {

  // window.__BASEURL__ = res.env.host;
  new Vue({
    el: '#app',
    router,
    store,
    render: createElement => createElement(App)
  })
// });
