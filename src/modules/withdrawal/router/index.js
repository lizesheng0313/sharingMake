import rechargeRecord from '../rechargeRecord'
import withdrawalRecord from "../withdrawalRecord"
export default [
  {
    path: '/recharge-record',
    name: 'rechargeRecord',
    component: rechargeRecord,
    meta: { title: "充值记录" }
  },
  {
    path: '/withdrawal-record',
    name: 'withdrawalRecord',
    component: withdrawalRecord,
    meta: { title: "提现记录" }
  }
]
