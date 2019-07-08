// import store from '../../store'
// import storage from 'storejs'
import index from '../index'
import salarySet from '../salarySet'
import start from '../start'

export default [
  {
    path: '/salary-cal',
    component: index,
  }, {
    path: '/salarySet',
    component: salarySet,
  },{
    path: '/salary-cal/start',
    component: start
  }
]
