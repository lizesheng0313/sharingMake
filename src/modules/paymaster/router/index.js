import payMaster from '../index'
import employeeDetail from '../employeeDetail'
import addEmployee from '../addEmployee'

export default [
  {
    path: '/payMaster',
    component: payMaster,
    meta: {
      businessCode: "salary.init.taxTotalBase"
    }
  },
  {
    path: '/employeeDetail',
    component: employeeDetail,
    meta: {
      businessCode: "salary.init.taxTotalBase"
    }
  },
  {
    path: '/addEmployee',
    component: addEmployee,
    meta: {
      businessCode: "salary.init.taxTotalBase"
    }
  },
]
