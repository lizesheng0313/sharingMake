import Vue from 'vue'
import Router from 'vue-router'
import { routerConfig } from './routerConfig'

//router
import salaryCal from 'modules/salaryCal/router'
import tax from 'modules/tax/router'
import taxPaid from 'modules/taxPaid/router'
import initialize from 'modules/initialize/router'



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
      redirect: '/salary-cal'
    },
    ...salaryCal,
    ...tax,
    ...taxPaid,
    ...initialize
  ]
})
routerConfig(router)
export default router
