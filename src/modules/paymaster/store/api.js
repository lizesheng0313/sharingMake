import { fetch, fetchFile} from 'request/fetch'

import oldFetch from "request/oldFetch";

//发薪人员、员工信息列表
export function apiPostEmployeeList(form) {
  return fetch({
    url: '/api/xsalary/enterprise/employeesList',
    method: 'post',
    data:form
  })
}

//发薪人员导出
export function apiPostEmployeesExport(form) {
  return oldFetch({
    url: 'xsalary/enterprise/employees/export',
    method: 'post',
    data:form,
    responseType: 'blob'
  })
}
//发薪人员导删除
export function apiDeleteEmployee(id) {
  return oldFetch({
    url: 'xsalary/enterprise/deleteEmployee/'+id,
    method: 'delete',
  })
}
//发薪人员、员工详情
export function apiGetEmployee(data) {
  return fetch({
    url: '/api/xsalary/enterprise/compEmployee/'+data.compEmpId+'/'+data.empId,
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

//发薪人员、员工详情、保存基本信息
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
//发薪人员、员工详情、保存参保信息
export function apiPostEmpolyeeCompany(form) {
  return fetch({
    url: '/api/xsalary/enterprise/empolyee/company',
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

//新增员工信息
export function apiPostEmployees(form) {
  return fetch({
    url: '/api/xsalary/enterprise/employees',
    method: 'post',
    data:form
  })
}

//导入模板下载
export function apiEmployeesTemplate() {
  return oldFetch({
    url: 'xsalary/enterprise/employee/template/download',
    method: 'post',
    responseType: 'blob'
  })
}

//导入下载错误日志
export function apiEmployeesVerifyErrorLog(data) {
  return oldFetch({
    url: 'xsalary/enterprise/employees/importVerifyErrorLog/'+data.uuid,
    method: 'get',
    responseType: 'blob'
  })
}
//增员导入
export function apiEmployeesImport(data) {
  return oldFetch({
    url: 'xsalary/enterprise/employees/import',
    method: 'post',
    data:data
  })
}

//校验身份证号
export function apiEmployeeIdCard(data) {
  return oldFetch({
    url: 'xsalary/enterprise/employee/'+data.idType+'/'+data.idCard,
    method: 'get',
  })
}
