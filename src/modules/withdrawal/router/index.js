import rechargeRecord from '../rechargeRecord'
import withdrawalRecord from "../withdrawalRecord"
import index from '../index'
import details from "../details"
import information from "../information"
export default [
  {
    path: '/account',
    name: 'account',
    component: index,
    meta: { title: "账户管理" ,businessCode: "salary.account.psalaryAccount", icon:"icongongzifafang"}
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
  },
  {
    path: '/recharge-record',
    name: 'rechargeRecord',
    component: rechargeRecord,
    meta: {
      businessCode: "salary.account.recharge",
    }
  },
  {
    path: '/withdrawal-record',
    name: 'withdrawalRecord',
    component: withdrawalRecord,
    meta: {
      title: "提现记录",
      businessCode: "salary.account.withdraw"
    }
  }
]
