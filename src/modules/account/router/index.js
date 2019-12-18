import index from '../index'
import details from "../details"
import information from "../information"
export default [
  {
    path: '/account',
    name: 'account',
    component: index,
    meta: { title: "账户管理" }
  },
  {
    path: '/account-details',
    name: 'accountDetails',
    component: details,
    meta: { title: "账户详情" }
  },
  {
    path: '/account-information',
    name: 'information',
    component: information,
    meta: { title: "开户信息" }
  }
]
