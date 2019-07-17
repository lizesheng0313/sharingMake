import { fetch } from 'request/fetch'
//纳税主体-集合列表
export function apiTaxSubjectList() {
  return fetch({
    url: '/api/taxSubject/getTaxSubjectList',
    method: 'get',
  })
}

