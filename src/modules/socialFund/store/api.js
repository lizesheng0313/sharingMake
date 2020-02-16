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
//快速增减员列表
export function apiFloatEmployeeList(form) {
  return fetch({
    url: '/api/xsalary/floatEmployee/manage/list',
    method: 'post',
    data:form
  })
}


