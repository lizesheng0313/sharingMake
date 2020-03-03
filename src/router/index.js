import Vue from 'vue'
import Router from 'vue-router'
import { routerConfig } from './routerConfig'

//router
import homePage from 'modules/homePage/router'
import salaryCal from 'modules/salaryCal/router'
import tax from 'modules/tax/router'
import taxPaid from 'modules/taxPaid/router'
import initialize from 'modules/initialize/router'
import accountPageRouter from 'modules/account/router'
import payManageRouter from 'modules/payManage/router'
import withdrawal from 'modules/withdrawal/router'
import resultRouter from 'modules/result/router'
import socialFund from 'modules/socialFund/router'
import paymaster from 'modules/paymaster/router'



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
    ...salaryCal,
    ...tax,
    ...taxPaid,
    ...accountPageRouter,
    ...payManageRouter,
    ...withdrawal,
    ...resultRouter,
    ...socialFund,
    ...paymaster,
    ...initialize,
  ]
})
routerConfig(router)
export default router
