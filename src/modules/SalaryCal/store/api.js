import { fetch,fetchFile } from 'request/fetch'
//保存j基本信息
export function apiSaveSalaryRule(form) {
  return fetch({
    url: '/api/salary/rule/save',
    method: 'post',
    data: form
  })
}
//工资表配置项信息
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
    url: '/api/salary/item/delete/'+id,
    method: 'delete',
  })
}
//更改工资表配置项状态
export function updateSalaryItems(form) {
  return fetch({
    url: '/api/salary/item/alterStatus',
    method: 'post',
    data:form
  })
}
//工资表配置项排序
export function apiSalaryItemsSort(form) {
  return fetch({
    url: '/api/salary/item/sort',
    method: 'post',
    data:form
  })
}
//获取工资表列表
export function apiSalaryRuleList(date) {
  return fetch({
    url: '/api/salary/salaryChecks/',
    method: 'get',
    params:{
      date:date
    }
  })
}
//启动薪资核算
export function apiInitSalaryCheck(form) {
  return fetch({
    url: '/api/salary/initSalaryCheck',
    method: 'post',
    data:form
  })
}
//获取核对人员列表
export function apiCheckMember(form) {
  return fetch({
    url: '/api/salary/checkMember/memberList',
    method: 'get',
    params:form
  })
}

//增员导入
export function apiImportMember({uuid,id}) {
  return fetch({
    url: '/api/salary/salaryCheck/importMember',
    method: 'post',
    params: {
      uuid:uuid,
      id:id
    },
  })
}

//删除员工
export function apiCheckMemberdelete(id) {
  return fetch({
    url: '/api/salary/checkMember/delete',
    method: 'delete',
    data: {
      ids:id
    },
  })
}
export function apiCheckMemberSummary(checkId) {
  return fetch({
    url: '/api/salary/checkMember/summary/'+checkId,
    method: 'get',
  })
}
//薪资核算列表
export function apiSalaryList(form) {
  return fetch({
    url: '/api/salary/salaryCheck/salaryList',
    method: 'post',
    data:form
  })
}
//纳税主体列表
export function apiGetTaxSubjectList() {
  return fetch({
    url: '/api/taxSubject/getTaxSubjectList',
    method: 'get',
  })
}
//导出工资表明细
export function apiSalaryDetailExport(form) {
  return fetchFile({
    url: '/api/salary/salaryCheck/salaryDetail/export',
    method: 'post',
    data:form
  })
}
//获取工资表配置项中已启动的项目
export function apiSalaryItemEnableInfo(id) {
  return fetch({
    url: '/api/salary/item/list/enable/'+id,
    method: 'get',
  })
}
//公积金导入
export function socialProvident({uuid,id,importType}) {
  return fetch({
    url: '/api/salary/socialProvident/import',
    method: 'post',
    params: {
      uuid:uuid,
      checkId:id,
      importType:importType
    },
  })
}
//浮动项导入
export function floatItem({uuid,id,importType}) {
  return fetch({
    url: '/api/salary/floatItem/import',
    method: 'post',
    params: {
      uuid:uuid,
      checkId:id,
      importType:importType
    },
  })
}
//工资表设置list
export function apiGetStubs(id) {
  return fetch({
    url: '/api/salary/stubs/getStubs/'+id,
    method: 'get',
  })
}
//工资表设置
export function apiEditStubs({salaryId,stubsMsg,itemIds}) {
  return fetch({
    url: '/api/salary/stubs/editStubs',
    method: 'post',
    data: {
      salaryId:salaryId,
      stubsMsg:stubsMsg,
      itemIds:itemIds
    },
  })
}
//获取核算状态
export function apiGetSalaryStatus(id) {
  return fetch({
    url: '/api/salary/getSalaryStatus/'+id,
    method: 'get',
  })
}

//删除发放
export function apiDeleteStubs(id) {
  return fetch({
    url: '/api/salary/stubs/deleteStubs/'+id,
    method: 'DELETE',
  })
}

//发放工资表
export function apiProvideStubs(checkId) {
  return fetch({
    url: '/api/salary/stubs/provideStubs/'+checkId,
    method: 'post',
  })
}
//工资表发放列表
export function apiSalaryStubsList(form) {
  return fetch({
    url: '/api/salary/stubs/list',
    method: 'post',
    data:form
  })
}
//工资表每一项修改状态
export function apiSalaryStubsStatusAlter(form) {
  return fetch({
    url: '/api/salary/stubs/status/alter',
    method: 'post',
    data:form
  })
}
//工资表全部数据修改状态
export function apiSalaryStubsStatusBatchAlter(form) {
  return fetch({
    url: '/api/salary/stubs/status/batchAlter',
    method: 'post',
    data:form
  })
}
//更新工资条
export function apiRefreshStubs(id) {
  return fetch({
    url: '/api/salary/stubs/refreshStubs/'+id,
    method: 'post',
  })
}


