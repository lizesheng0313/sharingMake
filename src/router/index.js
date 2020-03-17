import Vue from 'vue'
import Router from 'vue-router'
import { routerConfig } from './routerConfig'

//router
import homePage from 'modules/homePage/router'

import mine from 'modules/mine/index'
import task from 'modules/task/index'

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
    {
      path: '/mine',
      component: mine
    },
    {
      path: "/task",
      component: task
    },
    ...homePage,
  ]
})
routerConfig(router)
export default router
