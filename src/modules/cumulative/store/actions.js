import { apiTaxTotalBaseList,apiDelTaxTotalBase,apidownloadTemplate,apiImportTaxTotalBaseSuccess } from './api'
import { rule } from 'postcss';

//累计应税所得额初始化-集合列表
export const actionTaxTotalBaseList = ({ dispatch },ruleForm) => {
    return apiTaxTotalBaseList(ruleForm)
}

//累计应税所得额初始化--删除
export const actionDelTaxTotalBase = ({ dispatch },idsForm) => {
    return apiDelTaxTotalBase(idsForm)
}

//累计应税所得额初始化-下载模版
export const actionDownloadTemplate = ({ dispatch }) => {
    return apidownloadTemplate()
}

//累计应税所得额初始化-下载模版
export const actionImportTaxTotalBaseSuccess = ({ dispatch },ruleForm) => {
    return apiImportTaxTotalBaseSuccess(ruleForm)
}


