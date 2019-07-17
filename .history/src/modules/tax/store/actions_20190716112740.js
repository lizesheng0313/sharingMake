import { apiTaxSubjectList, apiDealTaxSubject, apiDelTaxSubject } from './api'

//纳税主体-集合列表
export const actionTaxSubjectList = ({ dispatch }) => {
    return apiTaxSubjectList()
}

//纳税主体-添加/修改
export const actionDealTaxSubject = ({ dispatch }) => {
    return apiDealTaxSubject(ruleForm)
}

//纳税主体-删除
export const actionDelTaxSubject = ({ dispatch }, id) => {
    return apiDelTaxSubject(id)
}

