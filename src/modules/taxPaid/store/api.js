import { fetch } from 'request/fetch'
//三方协议缴税列表
export function apiTripleAgreementTaxList(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxPay/tripleAgreementTaxList',
    method: 'post',
    data: ruleForm
  })
}
//发起缴款
export function apiTaxPay(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxPay/taxPay',
    method: 'post',
    data: ruleForm
  })
}
//缴款反馈
export function apiTaxPayQuery(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxPay/taxPayQuery',
    method: 'post',
    data: ruleForm
  })
}

//三方协议展示列表
export function apiTripleAgreementList(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxPay/tripleAgreementList',
    method: 'get',
    params: ruleForm
  })
}
//三方协议下载
export function apiGetTripleAgreement(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxPay/getTripleAgreement',
    method: 'post',
    data: ruleForm
  })
}
//三方协议下载反馈
export function apiGetTripleAgreementQuery(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxPay/getTripleAgreementQuery',
    method: 'post',
    data: ruleForm
  })
}
