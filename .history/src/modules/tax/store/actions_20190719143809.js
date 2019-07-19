import { apiEmpCollectList, apiTaxSubjectList, apiDealTaxSubject, apiDelTaxSubject, apiSaveEmpCollectInfo } from './api'

/*个税-人员采集*/

//人员采集-集合列表
export const actionEmpCollectList = ({ dispatch }, ruleForm) => {
    return apiEmpCollectList(ruleForm)
}
//人员采集-境内人员信息编辑保存
export const actionSaveEmpCollectInfo = ({ dispatch }, ruleForm) => {
    return apiSaveEmpCollectInfo(employeeFormData)
}





//纳税主体-集合列表
export const actionTaxSubjectList = ({ dispatch }) => {
    return apiTaxSubjectList()
}

//纳税主体-添加/修改
export const actionDealTaxSubject = ({ dispatch }, ruleForm) => {
    return apiDealTaxSubject(ruleForm)
}

//纳税主体-删除
export const actionDelTaxSubject = ({ dispatch }, id) => {
    return apiDelTaxSubject(id)
}

