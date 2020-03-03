// import store from '../../store'
// import storage from 'storejs'
import index from '../index'
import salarySet from '../salarySet'
import salaryCheck from '../salaryCheck'
import inOrdeDetail from '../components/check-staff/inOrdeDetail'

export default [
  {
    path: '/salary-cal',
    component: index,
    meta: {
      businessCode: "salary.compute.salaryCheck",
      icon:"iconxinzihesuan"
    }
  }, {
    path: '/salarySet',
    component: salarySet,
  },{
    path: '/salaryCheck',
    component: salaryCheck
  },{
    path: '/inOrdeDetail',
    component: inOrdeDetail

  }
]
