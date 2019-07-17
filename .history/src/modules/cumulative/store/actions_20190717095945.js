import { apiTaxTotalBaseList } from './api'
import { rule } from 'postcss';

//累计应税所得额初始化-集合列表
export const actionTaxTotalBaseList = ({ dispatch },ruleForm) => {
    console.log(ruleForm)
    return apiTaxTotalBaseList(ruleForm)
}

