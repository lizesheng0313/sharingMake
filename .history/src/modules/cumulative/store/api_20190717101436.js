import { fetch } from 'request/fetch'

//累计应税所得额初始化-集合列表
export function apiTaxTotalBaseList(ruleForm) {
  return fetch({
    url: '/api/taxTotalBase/getTaxTotalBaseList',
    method: 'get',
    params: ruleForm
  })
}
//累计应税所得额初始化-集合列表
export function apiDelTaxTotalBase(id) {
  return fetch({
    url: '/api/taxTotalBase/delTaxTotalBase',
    method: 'delete',
    params: {
      id
    }
  })
}



