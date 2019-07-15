import Vue from 'vue'
import Router from 'vue-router'
import {routerConfig} from './routerConfig'

//router
import salaryCal from 'modules/salaryCal/router'


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
      redirect: '/salary-cal'
    },
    ...salaryCal
  ]
})
routerConfig(router)
export default router
