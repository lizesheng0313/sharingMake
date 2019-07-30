import 'assets/scss/base.scss'
import 'assets/scss/element-variables.scss'
import 'assets/font/iconfont.css';
import 'assets/scss/el-cover.scss'
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

Vue.config.productionTip = false;

//存储本地token
// let token =location.href.includes('?')? location.href.split('?')[1].split('=')[1]:"";
let token = "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiemN0ZXN0MDExIiwiZW50ZXJwcmlzZUlkIjoxMjMxLCJ1c2VyVHlwZSI6IkVOVEVSUFJJU0UiLCJ1c2VySWQiOjk2MywiZXhwIjoxNTY1NjU5MDYxfQ._mstPTt1OLA-UDlodxRuoq2JDebOTQmnOqy1MeX6pC8";
store.commit("SET_TOKEN",token);

// fetchGetConfig().then(res=> {

  // window.__BASEURL__ = res.env.host;
  new Vue({
    el: '#app',
    router,
    store,
    render: createElement => createElement(App)
  })
// });
