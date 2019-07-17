import { apiTaxSubjectList, apiDealTaxSubject } from './api'

//纳税主体-集合列表
export const actionTaxSubjectList = ({ dispatch }) => {
    return apiTaxSubjectList()
}

//纳税主体-添加/修改
export const actionDealTaxSubject = ({ dispatch }) => {
    return apiDealTaxSubject()
}
