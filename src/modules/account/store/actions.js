import { apiAllAcount, apiBankAndType, apiCreateAccount, apiAccountInfo, apiUpdateTradePassWord, apiGetMerchantBase, apiGetMerchantInfo,apiActivate, apiWithdrawAmount} from './api'
// 获取账号列表
export const actionAllAcount = ({ commit }) => apiAllAcount()
// 获取所有银行和身份证类型
export const actionBankAndType = ({ commit }) => apiBankAndType()
//添加资金账户
export const actionCreateAccount = ({ commit }, accountForm) => apiCreateAccount(accountForm)
//获取资金账户
export const actionAccountInfo = ({ commit },accountInfoForm) => apiAccountInfo(accountInfoForm)
//修改存管密码
export const actionUpdateTradePassWord = ({ commit }, changeForm) => apiUpdateTradePassWord(changeForm)
//获取商户基本信息
export const actionGetMerchantBase = ({ commit },merchantForm) => apiGetMerchantBase(merchantForm)
//获取商户存管账户信息
export const actionGetMerchantInfo = ({ commit },merchantForm) => apiGetMerchantInfo(merchantForm)
//激活账户
export const actionActivate = ({ commit },activateForm) => apiActivate(activateForm)
//提现
export const postWithdrawAmount = ({ commit },activateForm) => apiWithdrawAmount(activateForm)
