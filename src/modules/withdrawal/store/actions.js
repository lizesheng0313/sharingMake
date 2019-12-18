import { apiWithdrawList,apiRecordslist,apiGetMerchantComb,apiRechargeStatusComb,apiWithdrawStatusComb,apiRechargeExport,apiWithdrawExport} from './api'

//提现列表
export const actionWithdrawList = ({ commit },listForm) => apiWithdrawList(listForm)
//提现状态
export const actionWithdrawStatusComb= ({ commit },listForm) => apiWithdrawStatusComb(listForm)
//提现列表导出
export const actionWithdrawExport= ({ commit },listForm) => apiWithdrawExport(listForm)





//充值列表
export const actionRecordslist = ({ commit },listForm) => apiRecordslist(listForm)
//获取商户下拉列表
export const actionGetMerchantComb = ({ commit },listForm) => apiGetMerchantComb(listForm)
//充值状态列表
export const actionRechargeStatusComb = ({ commit },listForm) => apiRechargeStatusComb(listForm)
//充值导出
export const actionRechargeExport= ({ commit },listForm) => apiRechargeExport(listForm)


