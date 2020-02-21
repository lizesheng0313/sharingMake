import payMaster from '../index'
import employeeDetail from '../employeeDetail'
import addEmployee from '../addEmployee'

export default [
  {
    path: '/payMaster',
    component: payMaster,
    meta: {
      businessCode: "salary.compute.emp"
    }
  },
  {
    path: '/employeeDetail',
    component: employeeDetail,
  },
  {
    path: '/addEmployee',
    component: addEmployee,
  },
]
