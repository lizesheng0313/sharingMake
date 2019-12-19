import oldFetch from 'request/oldFetch'

//获取用户权限
export function apiUserPrivilege() {
  return oldFetch({
    url: '/merchant/personnelManagement/getUserPrivilege',
    method: "post",
    data: {
      applicationCodes: ["SALARY_MANAGER"]
    }
  })
}
