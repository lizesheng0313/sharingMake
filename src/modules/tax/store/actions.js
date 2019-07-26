import {apiSubTaxReportExport,apiCheckReportData,apiSendReport,apiGetReportBack,apiCancelSubTaxReport,apiEmpCollectList, apiTaxSubjectList, apiDealTaxSubject, apiDelTaxSubject, apiSaveEmpCollectInfo, apiReport, apiTaxSubjectInfoList, apiGetFeedback, apiOtherTotalList, apiOtherTotalExport, apiDownloadOtherTotal,apiTaxReportTotalList,apiGenerateTaxReportData} from './api'

/*个税-人员采集*/

//人员采集-集合列表
export const actionEmpCollectList = ({ dispatch }, ruleForm) => {
    return apiEmpCollectList(ruleForm)
}
//人员采集-境内人员信息编辑保存
export const actionSaveEmpCollectInfo = ({ dispatch }, employeeFormData) => {
    return apiSaveEmpCollectInfo(employeeFormData)
}
//人员采集-报送
export const actionReport = ({ dispatch }, reportForm) => {
    return apiReport(reportForm)
}

//人员采集-获取反馈
export const actionGetFeedback = ({ dispatch }, feedbackForm) => {
    return apiGetFeedback(feedbackForm)
}

/*个税-专项附加扣除*/

//集合列表
export const actionOtherTotalList = ({ dispatch }, totalListForm) => {
    return apiOtherTotalList(totalListForm)
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




/*个税-纳税主体*/
//纳税主体-集合列表
export const actionTaxSubjectList = ({ dispatch },taxListFormData) => {
    return apiTaxSubjectList(taxListFormData)
}

//纳税主体-添加/修改
export const actionDealTaxSubject = ({ dispatch }, ruleForm) => {
    return apiDealTaxSubject(ruleForm)
}

//纳税主体-删除
export const actionDelTaxSubject = ({ dispatch }, id) => {
    return apiDelTaxSubject(id)
}

