import {apiSubTaxReportExport,apiCheckReportData,apiSendReport,apiGetReportBack,apiCancelSubTaxReport,apiEmpCollectList,apiEmpCollectNewList, apiTaxSubjectList, apiDealTaxSubject, apiDelTaxSubject, apiSaveEmpCollectInfo, apiReport,apiTaxReport, apiTaxSubjectInfoList, apiGetFeedback, apiOtherTotalList, apiOtherTotalExport, apiDownloadOtherTotal,apiTaxReportTotalList,apiGenerateTaxReportData,apiPostReportInfo,apiAdditionalList} from './api'

/*个税-人员采集*/

//个税申报-人员采集-集合列表
export const actionEmpCollectList = ({ dispatch }, ruleForm) => {
    return apiEmpCollectList(ruleForm)
}
//薪资核算-人员采集-集合列表
export const actionEmpCollectNewList = ({ dispatch }, ruleForm) => {
  return apiEmpCollectNewList(ruleForm)
}
//人员采集-境内人员信息编辑保存
export const actionSaveEmpCollectInfo = ({ dispatch }, employeeFormData) => {
    return apiSaveEmpCollectInfo(employeeFormData)
}
//薪资计算-人员采集-报送
export const actionReport = ({ dispatch }, reportForm) => {
    return apiReport(reportForm)
}
//个税申报-人员采集-报送
export const actionTaxReport = ({ dispatch }, reportForm) => {
  return apiTaxReport(reportForm)
}
//人员采集-获取反馈
export const actionGetFeedback = ({ dispatch }, feedbackForm) => {
    return apiGetFeedback(feedbackForm)
}
//人员采集-报送反馈
export const actionPostReportInfo = ({ dispatch }, reportInfoForm) => {
  return apiPostReportInfo(reportInfoForm)
}
/*个税-专项附加扣除列表*/
export const actionOtherTotalList = ({ dispatch }, totalListForm) => {
    return apiOtherTotalList(totalListForm)
}
/*薪资计算-专项附加扣除列表*/
export const actionAdditionalList = ({ dispatch }, totalListForm) => {
  return apiAdditionalList(totalListForm)
}

//主体集合
export const actionTaxSubjectInfoList = ({ dispatch }, date) => {
    return apiTaxSubjectInfoList(date)
}

//导出
export const actionOtherTotalExport = ({ dispatch }, exportForm) => {
    return apiOtherTotalExport(exportForm)
}

//更新累计值
export const actionDownloadOtherTotal = ({ dispatch }, tatalForm) => {
    return apiDownloadOtherTotal(tatalForm)
}

/*个税-综合申报*/

//综合申报-列表
export const actionTaxReportTotalList = ({ dispatch }, reportForm) => {
    return apiTaxReportTotalList(reportForm)
}

//综合申报-生成申报数据
export const postGenerateTaxReportData = ({ dispatch }, generateForm) => {
    return apiGenerateTaxReportData(generateForm)
}

//综合申报-作废申报
export const postCancelSubTaxReport = ({ dispatch }, invalidForm) => {
    return apiCancelSubTaxReport(invalidForm)
}

//综合申报-获取反馈结果
export const postGetReportBack = ({ dispatch }, invalidForm) => {
    return apiGetReportBack(invalidForm)
}

//综合申报-发送申报
export const postSendReport = ({ dispatch }, sendReportForm) => {
    return apiSendReport(sendReportForm)
}

//综合申报-获取人员状态为非正常
export const postCheckReportData = ({ dispatch }, reportForm) => {
    return apiCheckReportData(reportForm)
}

//综合申报-申报表导出
export const getSubTaxReportExport = ({ dispatch }, reportForm) => {
    return apiSubTaxReportExport(reportForm)
}

/*个税-扣缴义务人*/
//扣缴义务人-集合列表
export const actionTaxSubjectList = ({ dispatch },taxListFormData) => {
    return apiTaxSubjectList(taxListFormData)
}

//扣缴义务人-添加/修改
export const actionDealTaxSubject = ({ dispatch }, ruleForm) => {
    return apiDealTaxSubject(ruleForm)
}

//扣缴义务人-删除
export const actionDelTaxSubject = ({ dispatch }, id) => {
    return apiDelTaxSubject(id)
}

