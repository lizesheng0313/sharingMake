import { fetch } from 'request/fetch'

//纳税主体-集合列表
export function apiTaxSubjectList() {
  return fetch({
    url: '/api/taxSubject/getTaxSubjectList',
    method: 'get',
  })
}

//纳税主体-添加/修改
export function apiDealTaxSubject(ruleForm) {
  return fetch({
    url: '/api/taxSubject/dealTaxSubject',
    method: 'post',
    params: ruleForm
  })
}