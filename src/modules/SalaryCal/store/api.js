import { fetch } from 'request/fetch'
//保存工资表
export function apiSaveSalaryRule(form) {
  return fetch({
    url: '/api/salary/rule/save',
    method: 'post',
    data: form
  })
}
//工资表置顶信息
export function apiSalaryItemInfo(id) {
  return fetch({
    url: '/api/salary/item/list/'+id,
    method: 'get',
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

