import { fetch } from 'request/fetch'

export function apiGetCode() {
  return fetch({
    url: '/api/taxReport/getCaptchaId',
  })
}
//获取用户权限
export function apiUserPrivilege() {
  return fetch({
    url: '/api/merchant/personnelManagement/getUserPrivilege',
    method: "post",
    data:{
      applicationCodes:["SALARY_MANAGER"]
    }
  })
}
