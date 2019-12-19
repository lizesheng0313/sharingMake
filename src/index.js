import 'assets/scss/base.scss'
import 'assets/scss/element-variables.scss'
import 'assets/font/iconfont.css';
import 'assets/scss/el-cover.scss'

import Vue from 'vue'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import oldUI from "olading-ui"
import "olading-ui/lib/theme-chalk/index.css"
Vue.use(oldUI)


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
if(location.href.includes('?')){
  if(location.href.split('?')[1].split('=')[0] === "token"){
    let token =location.href.includes('?')? location.href.split('?')[1].split('=')[1]:"";
    store.commit("SET_TOKEN",token);
  }
}


// fetchGetConfig().then(res=> {

  // window.__BASEURL__ = res.env.host;
  new Vue({
    el: '#app',
    router,
    store,
    render: createElement => createElement(App)
  })
// });
