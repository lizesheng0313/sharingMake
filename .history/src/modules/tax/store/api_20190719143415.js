import { fetch } from 'request/fetch'

/*个税-人员采集*/

//人员信息采集-集合列表
export function apiEmpCollectList(ruleForm) {
  return fetch({
    url: '/api/taxReport/getEmpCollectList',
    method: 'post',
    data:ruleForm
  })
}

//人员信息采集--境内人员信息编辑保存
export function apiSaveEmpCollectInfo(ruleForm) {
  return fetch({
    url: '/api/taxReport/saveEmpCollectInfo',
    method: 'post',
    params:ruleForm
  })
}













//纳税主体-集合列表
export function apiTaxSubjectList() {
  return fetch({
    url: '/api/taxSubject/getTaxSubjectList',
    method: 'get',
  })
}

//纳税主体-添加/修改
export function apiDealTaxSubject(ruleForm) {
  return fetch({
    url: '/api/taxSubject/dealTaxSubject',
    method: 'post',
    params: ruleForm
  })
}

//纳税主体-添加/修改
export function apiDelTaxSubject(id) {
  return fetch({
    url: '/api/taxSubject/delTaxSubject',
    method: 'delete',
    params: {
      taxSubId:id
    }
  })
}
