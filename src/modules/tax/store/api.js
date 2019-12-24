import { fetch, fetchFile } from 'request/fetch'

/*个税-人员采集*/
//个税申报-人员信息采集-集合列表
export function apiEmpCollectList(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxReport/getEmpCollectList',
    method: 'post',
    data: ruleForm
  })
}

//薪资核算-人员信息采集-集合列表
export function apiEmpCollectNewList(ruleForm) {
  return fetch({
    url: '/api/xsalary/salary/getEmpCollectNewList',
    method: 'get',
    params: ruleForm
  })
}
//人员信息采集--境内人员信息编辑保存
export function apiSaveEmpCollectInfo(employeeFormData) {
  return fetch({
    url: '/api/xsalary/taxReport/saveEmpCollectInfo',
    method: 'post',
    params: employeeFormData
  })
}

//薪资计算-人员信息采集--报送
export function apiReport(reportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/allReport',
    method: 'post',
    data: reportForm
  })
}

//人员信息采集导出(薪资计算)
export function apiEmpCollectNewListExport(exportForm) {
  return fetchFile({
    url: '/api/xsalary/salary/getEmpCollectNewList/export',
    method: 'get',
    params: exportForm
  })
}

//人员信息采集导出(个税申报)
export function apiTaxEmpCollectNewListExport(exportForm) {
  return fetchFile({
    url: '/api/xsalary/taxReport/getEmpCollectNewList/export',
    method: 'get',
    params: exportForm
  })
}

//个税申报-人员信息采集--报送
export function apiTaxReport(reportForm) {
  return fetch({
      url: '/api/xsalary/taxReport/report',
    method: 'post',
    data: reportForm
  })
}

//人员信息采集--获取反馈
export function apiGetFeedback(feedbackForm) {
  return fetch({
    url: '/api/xsalary/taxReport/getFeedback',
    method: 'get',
    params: feedbackForm
  })
}
//人员信息采集--报送反馈
export function apiPostReportInfo(reportInfoForm) {
  return fetch({
    url: '/api/xsalary/taxReport/getReportInfo',
    method: 'post',
    data: reportInfoForm
  })
}

/*个税-专项附加扣除累计*/
//专项附加扣除-集合列表
export function apiOtherTotalList(totalListForm) {
  return fetch({
    url: '/api/xsalary/taxReport/getOtherTotalList',
    method: 'get',
    params: totalListForm
  })
}
//薪资计算-专项附加扣除-集合列表
export function apiAdditionalList(totalListForm) {
  return fetch({
    url: '/api/xsalary/salary/getAdditionalList',
    method: 'get',
    params: totalListForm
  })
}
//专项附加扣除-扣缴义务人集合
export function apiTaxSubjectInfoList(date) {
  return fetch({
    url: '/api/xsalary/taxReport/getTaxSubjectInfoList',
    method: 'get',
    params: {
      date
    }
  })
}

//专项附加扣除-导出
export function apiOtherTotalExport(exportForm) {
  return fetchFile({
    url: '/api/xsalary/taxReport/otherTotalExport',
    method: 'get',
    params: exportForm
  })
}

//专项附加扣除-更新累计值
export function apiDownloadOtherTotal(exportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/downloadOtherTotal',
    method: 'post',
    data: exportForm
  })
}

//专项附加扣除-下载
export function apiDownloadAddition(exportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/downloadAddition',
    method: 'post',
    data: exportForm
  })
}
//专项附加扣除-下载查询
export function apiDownloadAdditionQuery(exportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/downloadAdditionQuery',
    method: 'post',
    data: exportForm
  })
}
/*个税-综合所得申报*/
/*综合所得-申报集合列表*/
export function apiTaxReportTotalList(reportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/getTaxReportTotalList',
    method: 'get',
    params: reportForm
  })
}

/*综合所得-生成申报数据*/
export function apiGenerateTaxReportData(generateForm) {
  return fetch({
    url: '/api/xsalary/taxReport/generateTaxReportData',
    method: 'post',
    params: generateForm
  })
}

/*综合所得-生成申报数据反馈*/
export function apiQueryGenerateTaxReportData(generateForm) {
  return fetch({
    url: '/api/xsalary/taxReport/taxReportDataQuery',
    method: 'post',
    params: generateForm
  })
}
/*综合所得-生成申报数据导出*/
export function apiErrorExports(generateForm) {
  return fetchFile({
    url: '/api/xsalary/taxReport/taxReportDataQuery/errorExports',
    method: 'post',
    params: generateForm
  })
}


/*综合所得-作废申报*/
export function apiCancelSubTaxReport(invalidForm) {
  return fetch({
    url: '/api/xsalary/taxReport/cancelSubTaxReport',
    method: 'post',
    data: invalidForm
  })
}

/*综合所得-作废申报反馈*/
export function apiCancelSubTaxReportQuery(invalidForm) {
  return fetch({
    url: '/api/xsalary/taxReport/cancelSubTaxReportQuery',
    method: 'post',
    data: invalidForm
  })
}
//综合所得失败列表
export function apiTaxReportFailRecord(invalidForm) {
  return fetch({
    url: '/api/xsalary/taxReport/taxReportFailRecord',
    method: 'post',
    data: invalidForm
  })
}
//综合所得失败列表导出
export function apiTaxReportFailRecordExport(invalidForm) {
  return fetchFile({
    url: '/api/xsalary/taxReport/taxReportFailRecordExport',
    method: 'post',
    data: invalidForm
  })
}
/*综合所得-获取反馈结果*/
export function apiGetReportBack(reportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/getReportBack',
    method: 'post',
    data: reportForm
  })
}
/*综合所得-获取反馈结果查询*/
export function apiGetReportBackQuery(reportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/getReportBackQuery',
    method: 'post',
    data: reportForm
  })
}
/*综合所得-发送申报*/
export function apiSendReport(sendReportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/sendReport',
    method: 'post',
    data: sendReportForm
  })
}
/*综合所得-发送申报反馈*/
export function apiSendReportQuery(sendReportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/sendReportQuery',
    method: 'post',
    data: sendReportForm
  })
}
/*综合所得-获取人员状态为非正常*/
export function apiCheckReportData(reportForm) {
  return fetch({
    url: '/api/xsalary/taxReport/checkReportData',
    method: 'post',
    params: reportForm
  })
}
/*综合所得-申报表导出*/
export function apiSubTaxReportExport(reportForm) {
  return fetchFile({
    url: '/api/xsalary/taxReport/subTaxReportExport',
    method: 'get',
    params: reportForm
  })
}

//社保公积金列表
export function apiSocialBenefitsList(reportForm) {
  return fetch({
    url: '/api/xsalary/salary/getSocialBenefitsList',
    method: 'get',
    params: reportForm
  })
}

/*个税-扣缴义务人*/
//扣缴义务人-集合列表
export function apiTaxSubjectList(taxListFormData) {
  return fetch({
    url: '/api/xsalary/taxSubject/getTaxSubjectList',
    method: 'get',
    params:taxListFormData
  })
}

//扣缴义务人-授权
export function apiDealTaxSubject(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxSubject/dealTaxSubject',
    method: 'post',
    params: ruleForm
  })
}

//扣缴义务人-授权反馈
export function apiAccreditQuery(ruleForm) {
  return fetch({
    url: '/api/xsalary/taxSubject/accreditQuery',
    method: 'post',
    params: ruleForm
  })
}
//扣缴义务人-添加/修改
export function apiDelTaxSubject(id) {
  return fetch({
    url: '/api/xsalary/taxSubject/delTaxSubject',
    method: 'delete',
    params: {
      taxSubId: id
    }
  })
}
