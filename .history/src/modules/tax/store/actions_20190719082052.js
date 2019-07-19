import { apiEmpCollectList, apiTaxSubjectList, apiDealTaxSubject, apiDelTaxSubject, apiSaveEmpCollectInfo } from './api'
import { rule } from 'postcss';

/*个税-人员采集*/

//纳税主体-集合列表
export const actionEmpCollectList = ({ dispatch }, ruleForm) => {
    return apiEmpCollectList(ruleForm)
}
export const actionSaveEmpCollectInfo = ({ dispatch }, ruleForm) => {
    return apiSaveEmpCollectInfo(ruleForm)
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

