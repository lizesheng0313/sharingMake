import { apiTaxTotalBaseList } from './api'

//累计应税所得额初始化-集合列表
export const actionTaxTotalBaseList = ({ dispatch },ruleForm) => {
    return apiTaxTotalBaseList(ruleForm)
}

