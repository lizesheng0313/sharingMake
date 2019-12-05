import { fetch, fetchFile } from 'request/fetch'

//累计应税所得额初始化-集合列表
export function apiTaxTotalBaseList(ruleForm) {
  return fetch({
    url: '/api/taxTotalBase/getTaxTotalBaseList',
    method: 'get',
    params: ruleForm
  })
}

//累计应税所得额初始化--删除
export function apiDelTaxTotalBase(idsForm) {
  return fetch({
    url: '/api/taxTotalBase/delTaxTotalBase',
    method: 'delete',
    data: idsForm
  })
}

//累计应税所得额初始化-导入成功数据
export function apiImportTaxTotalBaseSuccess(ruleForm) {
  return fetch({
    url: '/api/taxTotalBase/importTaxTotalBaseSuccess',
    method: 'post',
    params: ruleForm
  })
}


//累计应税所得额初始化-下载模版
export function apidownloadTemplate() {
  return fetchFile({
    url: '/api/taxTotalBase/downloadTemplate',
    method: 'get',
  })
}

//导出错误记录
export function apiExportErrorRecord(ruleForm) {
  return fetchFile({
    url: '/api/taxTotalBase/exportErrorRecord',
    method: 'get',
    params: ruleForm
  })
}



