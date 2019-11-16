import { apiTripleAgreementList,apiTaxPay,apiTaxPayQuery,apiGetTripleAgreement,apiGetTripleAgreementQuery } from './api'

//三方协议列表
export const actionTripleAgreementList = ({ dispatch }, ruleForm) => {
  return apiTripleAgreementList(ruleForm)
}
//发起缴款
export const actionTaxPay = ({ dispatch }, ruleForm) => {
  return apiTaxPay(ruleForm)
}
//缴款反馈
export const actionTaxPayQuery = ({ dispatch }, ruleForm) => {
  return apiTaxPayQuery(ruleForm)
}
//三方协议下载
export const actionGetTripleAgreement = ({ dispatch }, ruleForm) => {
  return apiGetTripleAgreement(ruleForm)
}
//三方协议下载反馈
export const actionGetTripleAgreementQuery = ({ dispatch }, ruleForm) => {
  return apiGetTripleAgreementQuery(ruleForm)
}
