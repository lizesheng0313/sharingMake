import Vue from 'vue'
import Router from 'vue-router'
import {routerConfig} from './routerConfig'

//router
import accountingPageRouter from 'modules/accounting/router'


Vue.use(Router)

let router = new Router({
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
    ...accountingPageRouter,
  ]
})
routerConfig(router)
export default router
