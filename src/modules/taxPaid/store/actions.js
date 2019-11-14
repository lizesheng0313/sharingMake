import { apiTripleAgreementList } from './api'

//三方协议列表
export const actionTripleAgreementList = ({ dispatch }, ruleForm) => {
  return apiTripleAgreementList(ruleForm)
}