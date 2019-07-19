import { fetch } from 'request/fetch'

//累计应税所得额初始化-集合列表
export function apiTaxTotalBaseList(ruleForm) {
  return fetch({
    url: '/api/taxTotalBase/getTaxTotalBaseList',
    method: 'get',
    params: ruleForm
  })
}

//累计应税所得额初始化--删除
export function apiDelTaxTotalBase(id) {
  return fetch({
    url: '/api/taxTotalBase/delTaxTotalBase',
    method: 'delete',
    params: {
      id
    }
  })
}

//累计应税所得额初始化-下载模版
export function apidownloadTemplate() {
  return fetch({
    url: '/api/taxTotalBase/downloadTemplate',
    method: 'get',
  })
}

//累计应税所得额初始化-导入成功数据
export function apiImportTaxTotalBaseSuccess(ruleForm) {
  return fetch({
    url: '/api/taxTotalBase/importTaxTotalBaseSuccess',
    method: 'post',
    params:ruleForm
  })
}

