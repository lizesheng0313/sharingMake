import attrition from '../attrition'
import quickStaff from '../quickStaff'
import attritionDetail from '../attritionDetail'
import insuredAccount from '../insuredAccount'
import insuredAccountDetail from '../insuredAccountDetail'
import insuredAccountDetailed from '../insuredAccountDetailed'
import insuredPlan from '../insuredPlan'
import insuredPlanAdd from '../insuredPlanAdd'

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
  },
  {
    path: '/insuredAccountDetailed',
    component: insuredAccountDetailed,
    meta: {
      businessCode: "salary.init.insuredAccountDetailed"
    }
  },
  {
    path: '/insuredPlan',
    component: insuredPlan,
    meta: {
      businessCode: "salary.init.insuredPlan"
    }
  },{
    path: '/insuredPlanAdd',
    component: insuredPlanAdd,
    meta: {
      businessCode: "salary.init.insuredPlanAdd"
    }
  }
]
