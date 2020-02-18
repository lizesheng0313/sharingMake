import { fetch, fetchFile } from 'request/fetch'
import oldFetch from "request/oldFetch";
//参保方案列表‘
export function apiInsuredProjectMList(ruleForm) {
  return fetch({
    url: '/api/xsalary/insuredProject/manage/list',
    method: 'post',
    data: ruleForm
  })
}
//删除
export function apiInsuredDel(id) {
  return oldFetch({
    url: 'xsalary/insuredProject/manage/del/'+id,
    method: 'get',
  })
}
//编辑,获取内容
export function apiInsuredGetEditInfo(id) {
  return oldFetch({
    url: 'xsalary/insuredProject/manage/edit/'+id,
    method: 'get',
  })
}
//基础参保方案
export function apiInsuredProjectList(ruleForm) {
  return fetch({
    url: '/api/xsalary/insuredProject/manage/list',
    method: 'post',
    data: ruleForm
  })
}
//参保方案，新增，城市参保方案
export function apiInsuredGetBase(id) {
  return oldFetch({
    url: 'xsalary/insuredProject/manage/getBase/'+id,
    method: 'get',
  })
}
//参保方案 详情
export function apiInsuredGetInfo(id) {
  return oldFetch({
    url: 'xsalary/insuredProject/manage/getInfo/'+id,
    method: 'get',
  })
}

//参保方案 保存
export function apiInsuredProjectSave(ruleForm) {
  return oldFetch({
    url: 'xsalary/insuredProject/manage/save',
    method: 'post',
    data: ruleForm
  })
}

//参保月度台账、公司信息列表
export function apiGetCompMonthlyLedgerList(form) {
  return fetch({
    url: 'api/xsalary/monthlyLedger/getCompMonthlyLedgerList',
    method: 'get',
    data:form
  })
}
//参保月度台账、生成月度台账
export function apiSaveMonthlyLedger(form) {
  return oldFetch({
    url: 'xsalary/monthlyLedger/saveMonthlyLedger',
    method: 'post',
    data:form
  })
}
//参保月度台账、归档
export function apiArchiveMonthlyLedger(form) {
  return oldFetch({
    url: 'xsalary/monthlyLedger/archiveMonthlyLedger',
    method: 'post',
    data:form
  })
}
//参保月度台账、员工月度台账列表
export function apiEmpMonthlyLedgerList(form) {
  return oldFetch({
    url: 'xsalary/monthlyLedger/getEmpMonthlyLedgerList',
    method: 'post',
    data:form
  })
}
//月度台账补缴删除
export function apiEmpMonthlyLedgerDelete(form) {
  return oldFetch({
    url: 'xsalary/monthlyLedger/deleteSupplementMonthly',
    method: 'post',
    data:form
  })
}

//月度台账补缴
export function apiEmpMonthlyLedgerSupple(form) {
  return oldFetch({
    url: 'xsalary/monthlyLedger/supplementMonthlyLedger',
    method: 'post',
    data:form
  })
}
// 月度台账员工详情
export function apiEmpMonthlyLedgerDetail(form) {
  return oldFetch({
    url: 'xsalary/monthlyLedger/empMonthlyLedgerDetail',
    method: 'post',
    params:form
  })
}

//快速增减员列表
export function apiFloatEmployeeList(form) {
  return fetch({
    url: '/api/xsalary/floatEmployee/manage/list',
    method: 'post',
    data:form
  })
}
//入职未投保
export function apiFloatEmployeeIncreaseUnlist(form) {
  return fetch({
    url: '/api/xsalary/floatEmployee/increase/unList',
    method: 'post',
    data:form
  })
}

//离职已投保
export function apiFloatEmployeeIncreaseList(form) {
  return fetch({
    url: '/api/xsalary/floatEmployee/increase/list',
    method: 'post',
    data:form
  })
}

//减员
export function apiFloatEmployeeDecreaseDo(form) {
  return fetch({
    url: '/api/xsalary/floatEmployee/decrease/do',
    method: 'post',
    data:form
  })
}
//增员
export function apiFloatEmployeeIncreaseDo(form) {
  return fetch({
    url: '/api/xsalary/floatEmployee/increase/do',
    method: 'post',
    data:form
  })
}
//增减员详情
export function apiFloatEmployeeManageInfo(data) {
  return fetch({
    url: '/api/xsalary/floatEmployee/manage/info/'+data.compEmpId+'/'+data.empInsuredId,
    method: 'get',
  })
}
export function apiFloatEmployeeManageSave(data) {
  return fetch({
    url: '/api/xsalary/floatEmployee/manage/save',
    method: 'post',
    data:data
  })
}
//增员参保方案
export function apiGetCompInsuredProject() {
  return fetch({
    url: '/api/xsalary/insuredProject/manage/getCompInsuredProject',
    method: 'get',
  })
}