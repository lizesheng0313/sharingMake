import attrition from '../attrition'
import quickStaff from '../quickStaff'
import attritionDetail from '../attritionDetail'
import insuredAccount from '../insuredAccount'
import insuredAccountDetail from '../insuredAccountDetail'

export default [
  {
    path: '/attrition',
    component: attrition,
    meta: {
      businessCode: "salary.init.taxTotalBase"
    }
  },
  {
    path: '/quickStaff',
    component: quickStaff,
    meta: {
      businessCode: "salary.init.taxTotalBase"
    }
  },
  {
    path: '/attritionDetail',
    component: attritionDetail,
    meta: {
      businessCode: "salary.init.attritionDetail"
    }
  },
  {
    path: '/insuredAccount',
    component: insuredAccount,
    meta: {
      businessCode: "salary.init.insuredAccount"
    }
  },
  {
    path: '/insuredAccountDetail',
    component: insuredAccountDetail,
    meta: {
      businessCode: "salary.init.insuredAccountDetail"
    }
  }
]
