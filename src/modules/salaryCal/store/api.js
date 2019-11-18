import { fetch,fetchFile } from 'request/fetch'
//保存基本信息
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
//人员模板
export function apiCheckMemberDownload() {
  return fetchFile({
    url: '/api/salary/checkMember/template/download',
    method: 'post',
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
export function apiCheckMemberdelete(ids,checkId) {
  return fetch({
    url: '/api/salary/checkMember/delete',
    method: 'delete',
    data: {
      ids:ids,
      checkId:checkId
    },
  })
}
//核对人员删除全部
export function apiCheckMemberDeleteAll(checkId) {
  return fetch({
    url: '/api/salary/checkMember/deleteAll',
    method: 'delete',
    data: {
      checkId:checkId
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
//薪资核算合计
export function apiSalarySum(form) {
  return fetch({
    url: '/api/salary/salaryCheck/salarySum',
    method: 'post',
    data:form
  })
}
//扣缴义务人列表
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
//导出部门明细
export function apiExportDepartSum(form) {
  return fetchFile({
    url: '/api/salary/salaryCheck/exportDepartSum',
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
export function apiSocialProvident(params) {
  return fetch({
    url: '/api/salary/socialProvident/import',
    method: 'post',
    params: params
  })
}

// 公积金导入日志
export function apiSocialProvidentRecord(data) {
  return fetchFile({
    url: '/api/salary/socialProvident/errorRecord/download/'+data.uuid,
    method: 'get',
  })
}
// 公积金模板下载
export function apiSocialProvidentTemplate() {
  return fetchFile({
    url: '/api/salary/socialProvident/template/download',
    method: 'get',
  })
}
// 公积金复制上月数据
export function apisyncLastMonthSocial(params) {
  return fetch({
    url: '/api/salary/syncLastMonthSocial',
    method: 'get',
    params:params
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
//薪资计算
export function apiSalaryComputes(form) {
  return fetch({
    url: '/api/salary/salaryCompute',
    method: 'post',
    params:form
  })
}

//薪资计算反馈
export function apiSalaryCheckQuery(form) {
  return fetch({
    url: '/api/salary/salaryCheckQuery',
    method: 'post',
    params:form
  })
}
//薪资审核
export function apiAuditSalaryCheck(form) {
  return fetch({
    url: '/api/salary/salaryAudit',
    method: 'post',
    data:form
  })
}
// 核对人员下载日志
export function apiMemberErrorRecord(uuid) {
  return fetchFile({
    url: '/api/salary/checkMember/errorRecord/download',
    method: 'post',
    data:{
      uuid:uuid
    }
  })
}






