import Vue from 'vue'
import Router from 'vue-router'
import { routerConfig } from './routerConfig'

//router
import homePage from 'modules/homePage/router'

import mine from 'modules/mine/index'
import task from 'modules/task/index'
import taskDeetails from 'modules/task/details'
import taskUpload from 'modules/task/uploadImage'
import chat from 'modules/chat/index'
import app from 'modules/app/index'
import ad from "modules/ad/index"
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
      path: "/task",
      component: task
    },
    {
      path: "/task-details",
      component: taskDeetails
    },
    {
      path: "/task-upload",
      component: taskUpload
    },
    {
      path: "/chat",
      component: chat
    },
    {
      path: '/app',
      component: app
    },
    {
      path: '/ad',
      component: ad
    },
    ...homePage,
  ]
})
routerConfig(router)
export default router
