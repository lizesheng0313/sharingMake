import attrition from '../attrition'
import quickStaff from '../quickStaff'
import attritionDetail from '../attritionDetail'
import insuredAccount from '../InsuredAccount'
import insuredAccountDetail from '../InsuredAccountDetail'
import insuredAccountDetailed from '../InsuredAccountDetailed'
import insuredPlan from '../InsuredPlan'
import insuredPlanAdd from '../InsuredPlanAdd'

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
