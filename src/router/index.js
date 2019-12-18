import Vue from 'vue'
import Router from 'vue-router'
import { routerConfig } from './routerConfig'

//router
import salaryCal from 'modules/salaryCal/router'
import tax from 'modules/tax/router'
import taxPaid from 'modules/taxPaid/router'
import initialize from 'modules/initialize/router'
import accountPageRouter from 'modules/account/router'
import payManageRouter from 'modules/payManage/router'
import withdrawal from 'modules/withdrawal/router'
import resultRouter from 'modules/result/router'



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
    ...taxPaid,
    ...initialize,
    ...accountPageRouter,
    ...payManageRouter,
    ...withdrawal,
    ...resultRouter
  ]
})
routerConfig(router)
export default router
