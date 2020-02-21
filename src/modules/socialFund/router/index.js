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
      businessCode: "salary.social.floatEmployee",
      icon:"iconshebaogongjijin"
    }
  },
  {
    path: '/quickStaff',
    component: quickStaff,
  },
  {
    path: '/attritionDetail',
    component: attritionDetail,
  },
  {
    path: '/insuredAccount',
    component: insuredAccount,
    meta: {
      businessCode: "salary.social.ledger"
    }
  },
  {
    path: '/insuredAccountDetail',
    component: insuredAccountDetail,
  },
  {
    path: '/insuredAccountDetailed',
    component: insuredAccountDetailed,
  },
  {
    path: '/insuredPlan',
    component: insuredPlan,
    meta: {
      businessCode: "salary.social.insuredProject"
    }
  },{
    path: '/insuredPlanAdd',
    component: insuredPlanAdd,
  }
]
