import Vue from 'vue'
import Router from 'vue-router'
import { routerConfig } from './routerConfig'

//router
import salaryCal from 'modules/salaryCal/router'
import tax from 'modules/tax/router'
import cumulative from 'modules/cumulative/router'


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
    ...salaryCal,
    ...tax,
    ...cumulative
  ]
})
routerConfig(router)
export default router
