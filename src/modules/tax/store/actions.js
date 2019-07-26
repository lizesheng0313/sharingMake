import { apiEmpCollectList, apiTaxSubjectList, apiDealTaxSubject, apiDelTaxSubject, apiSaveEmpCollectInfo, apiReport, apiTaxSubjectInfoList, apiGetFeedback, apiOtherTotalList, apiOtherTotalExport, apiDownloadOtherTotal,apiTaxReportTotalList} from './api'

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

//综合申报列表
export const actionTaxReportTotalList = ({ dispatch }, reportForm) => {
    return apiTaxReportTotalList(reportForm)
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

