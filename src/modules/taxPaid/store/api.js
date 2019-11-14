import { fetch } from 'request/fetch'
//三方协议缴税列表
export function apiTripleAgreementList(ruleForm) {
  return fetch({
    url: '/api/taxPay/tripleAgreementList',
    method: 'get',
    params: ruleForm
  })
}