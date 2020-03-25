import Vue from 'vue'
import Router from 'vue-router'
import { routerConfig } from './routerConfig'

//router
import homePage from 'modules/homePage/router'

import mine from 'modules/mine/index'
import task from 'modules/task/index'
import taskDetails from 'modules/task/details'
import taskUpload from 'modules/task/uploadImage'
import register from "modules/register/index"

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
    {
      path: '/mine',
      component: mine
    },
    {
      path: '/register',
      component: register
    },
    {
      path: "/task",
      component: task
    },
    {
      path: "/task-details",
      component: taskDetails
    },
    {
      path: "/task-upload",
      component: taskUpload
    },
    {
      path: "/chat"
    },
    {
      path: '/app'
    },
    {
      path: '/ad'
    },
    ...homePage,
  ]
})
routerConfig(router)
export default router
