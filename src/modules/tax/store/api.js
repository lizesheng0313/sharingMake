import { fetch, fetchFile } from 'request/fetch'

/*个税-人员采集*/

//人员信息采集-集合列表
export function apiEmpCollectList(ruleForm) {
  return fetch({
    url: '/api/taxReport/getEmpCollectList',
    method: 'post',
    data: ruleForm
  })
}

//人员信息采集--境内人员信息编辑保存
export function apiSaveEmpCollectInfo(employeeFormData) {
  return fetch({
    url: '/api/taxReport/saveEmpCollectInfo',
    method: 'post',
    params: employeeFormData
  })
}

//人员信息采集--报送
export function apiReport(reportForm) {
  return fetch({
    url: '/api/taxReport/report',
    method: 'post',
    data: reportForm
  })
}

//人员信息采集--获取反馈
export function apiGetFeedback(feedbackForm) {
  return fetch({
    url: '/api/taxReport/getFeedback',
    method: 'get',
    params: feedbackForm
  })
}


/*个税-专项附加扣除累计*/

//专项附加扣除-集合列表
export function apiOtherTotalList(totalListForm) {
  return fetch({
    url: '/api/taxReport/getOtherTotalList',
    method: 'get',
    params: totalListForm
  })
}

//专项附加扣除-扣缴义务人集合
export function apiTaxSubjectInfoList(date) {
  return fetch({
    url: '/api/taxReport/getTaxSubjectInfoList',
    method: 'get',
    params: {
      date
    }
  })
}

//专项附加扣除-导出
export function apiOtherTotalExport(exportForm) {
  return fetchFile({
    url: '/api/taxReport/otherTotalExport',
    method: 'get',
    params: exportForm
  })
}

//专项附加扣除-更新累计值
export function apiDownloadOtherTotal(exportForm) {
  return fetchFile({
    url: '/api/taxReport/downloadOtherTotal',
    method: 'post',
    data: exportForm
  })
}

/*个税-综合所得申报*/
/*综合所得-申报集合列表*/
export function apiTaxReportTotalList(reportForm) {
  return fetch({
    url: '/api/taxReport/getTaxReportTotalList',
    method: 'get',
    params: reportForm
  })
}

/*综合所得-生成申报数据*/
export function apiGenerateTaxReportData(generateForm) {
  return fetch({
    url: '/api/taxReport/generateTaxReportData',
    method: 'post',
    params: generateForm
  })
}

/*综合所得-作废申报*/
export function apiCancelSubTaxReport(invalidForm) {
  return fetch({
    url: '/api/taxReport/cancelSubTaxReport',
    method: 'post',
    data: invalidForm
  })
}

/*综合所得-获取反馈结果*/
export function apiGetReportBack(reportForm) {
  return fetch({
    url: '/api/taxReport/getReportBack',
    method: 'post',
    data: reportForm
  })
}

/*综合所得-发送申报*/
export function apiSendReport(sendReportForm) {
  return fetch({
    url: '/api/taxReport/sendReport',
    method: 'post',
    data: sendReportForm
  })
}

/*综合所得-获取人员状态为非正常*/
export function apiCheckReportData(reportForm) {
  return fetch({
    url: '/api/taxReport/checkReportData',
    method: 'post',
    params: reportForm
  })
}

/*综合所得-申报表导出*/
export function apiSubTaxReportExport(reportForm) {
  return fetchFile({
    url: '/api/taxReport/subTaxReportExport',
    method: 'get',
    params: reportForm
  })
}




/*个税-扣缴义务人*/
//扣缴义务人-集合列表
export function apiTaxSubjectList(taxListFormData) {
  return fetch({
    url: '/api/taxSubject/getTaxSubjectList',
    method: 'get',
    params:taxListFormData
  })
}

//扣缴义务人-添加/修改
export function apiDealTaxSubject(ruleForm) {
  return fetch({
    url: '/api/taxSubject/dealTaxSubject',
    method: 'post',
    params: ruleForm
  })
}

//扣缴义务人-添加/修改
export function apiDelTaxSubject(id) {
  return fetch({
    url: '/api/taxSubject/delTaxSubject',
    method: 'delete',
    params: {
      taxSubId: id
    }
  })
}
