
import index from '../index'
import paidReport from '../paidReport'
export default [
  {
    path: '/taxPaid/paid',
    component: index,
    meta: {
      businessCode: "salary.taxpay.paytax",
      icon:"iconshuikuanjiaona"
    }
  },{
    path: '/taxPaid/paidReport',
    component: paidReport,
  },
]
