import Vue from 'vue'
import Router from 'vue-router'
import { routerConfig } from './routerConfig'

//router
import homePage from 'modules/homePage/router'



Vue.use(Router)

let router = new Router({
  // base:'/pSalary',
  mode: 'history',
  saveScrollPosition: true,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    ...homePage,
  ]
})
routerConfig(router)
export default router
