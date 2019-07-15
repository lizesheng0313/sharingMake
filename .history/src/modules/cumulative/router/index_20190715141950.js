// import store from '../../store'
// import storage from 'storejs'
import index from '../index'
import salarySet from '../salarySet'
import salaryCheckPerson from '../salaryCheckPerson'

export default [
  {
    path: '/salary-cal',
    component: index,
  }, {
    path: '/salarySet',
    component: salarySet,
  },{
    path: '/salaryCheckPerson',
    component: salaryCheckPerson
  }
]
