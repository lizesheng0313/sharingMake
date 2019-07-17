import { apiTaxTotalBaseList,apiDelTaxTotalBase } from './api'
import { rule } from 'postcss';

//累计应税所得额初始化-集合列表
export const actionTaxTotalBaseList = ({ dispatch },ruleForm) => {
    return apiTaxTotalBaseList(ruleForm)
}

//累计应税所得额初始化--删除
export const actionDelTaxTotalBase = ({ dispatch },id) => {
    return apiDelTaxTotalBase(id)
}