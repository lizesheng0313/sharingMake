import { fetch, fetchFile } from 'request/fetch'

//发薪人员、员工信息列表
export function apiPostEmployeeList(form) {
  return fetch({
    url: '/api/xsalary/enterprise/employeesList',
    method: 'post',
    data:form
  })
}

//发薪人员、员工详情
export function apiGetEmployee(id) {
  return fetch({
    url: '/api/xsalary/enterprise/compEmployee/'+id,
    method: 'get',
  })
}
//获取城市列表
export function apiGetCity() {
  return fetch({
    url: '/api/xsalary/insuredProject/manage/getCity',
    method: 'get',
  })
}

//发薪人员、员工详情、保存员工基本信息
export function apiPostEmployee(form) {
  return fetch({
    url: '/api/xsalary/enterprise/employee',
    method: 'post',
    data:form
  })
}

//发薪人员、员工详情、保存公司基本信息
export function apiPostCompany(form) {
  return fetch({
    url: '/api/xsalary/enterprise/company',
    method: 'post',
    data:form
  })
}

//调动
export function apiPostCompanyChange(form) {
  return fetch({
    url: '/api/xsalary/enterprise/employee/companyChange',
    method: 'post',
    data:form
  })
}

//国籍列表
export function apiGetCountries(){
  return fetch({
    url: '/api/xsalary/enterprise/employee/countries',
    method: 'get',
  })
}
//银行列表
export function apiGetBanks(){
  return fetch({
    url: '/api/xsalary/enterprise/employee/banks',
    method: 'get',
  })
}