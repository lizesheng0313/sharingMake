import { fetch } from 'request/fetch'

//累计应税所得额初始化-集合列表
export function apiTaxTotalBaseList() {
  return fetch({
    url: '/api/taxTotalBase/getTaxTotalBaseList',
    method: 'post',
  })
}

