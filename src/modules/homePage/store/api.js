import { fetch } from 'request/fetch'

//累计应税所得额初始化-集合列表
export function apiGetUserInfo(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxSubject/getUserInfo',
    method: 'get',
    params: ruleForm
  })
}