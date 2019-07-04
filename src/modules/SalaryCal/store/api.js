import { fetch } from 'request/fetch'
//检索模板流程
export function apiSaveSalaryRule(form) {
  return fetch({
    url: '/api/salary/saveSalaryRule',
    method: 'post',
    data: form
  })
}
//工资表置顶信息
export function apiSalaryItemInfo(id) {
  return fetch({
    url: '/api/salary/salaryItems',
    method: 'get',
    params:{
      salaryRuleId:5
    }
  })
}
//保存工资表置顶
export function saveSalaryItems(form) {
  return fetch({
    url: '/api/salary/saveSalaryItems',
    method: 'post',
    data:form
  })
}

