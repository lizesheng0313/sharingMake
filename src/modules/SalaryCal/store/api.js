import { fetch } from 'request/fetch'
//保存j基本信息
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
//保存工资表配置项
export function saveSalaryItems(form) {
  return fetch({
    url: '/api/salary/item/save',
    method: 'post',
    data:form
  })
}
//删除工资表配置项{
export function deleteSalaryItems(id) {
  return fetch({
    url: '/api/salary/rule/delete/'+id,
    method: 'delete',
  })
}
//更改工资表状态
export function updateSalaryItems(form) {
  return fetch({
    url: '/api/salary/rule/alterStatus',
    method: 'post',
    data:form
  })
}

