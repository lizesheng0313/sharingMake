import cumulative from '../cumulative'
import paid from '../paid'

export default [
  {
    path: '/initialize/cumulative',
    component: cumulative,
    meta: {
      businessCode: "salary.init.taxTotalBase"
    }
  },
  {
    path: '/initialize/paid',
    component: paid,
    meta:{
      businessCode:"salary.init.taxSubject",
      icon:"iconchushihuashezhi"
    }
  }
]
