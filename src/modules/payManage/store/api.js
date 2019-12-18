import fetch from "request/oldFetch";
//批量代发列表
export function apiBatchList(formData) {
    return fetch({
        url: 'account/getAllAcount',
        method: 'post',
        data: formData
    })
}
//批量代发记录列表
export function apiRecordList(formData) {
    return fetch({
        url: 'waitSend/batch/queryBatchList',
        method: 'post',
        data: formData
    })
}
//批量代发记录-公司列表
export function apiSelectMerchant(formData) {
    return fetch({
        url: 'waitSend/batch/getMerchantComb',
        method: 'post',
        data: formData
    })
}
//批量代发记录-状态列表
export function apiSelectStatus(formData) {
    return fetch({
        url: 'waitSend/batch/getBatchStatusComb',
        method: 'post',
        data: formData
    })
}
//代发记录-详情-概括
export function apiRecordInfo(formData) {
    return fetch({
        url: 'waitSend/batch/queryBatchInfo',
        method: 'post',
        data: formData
    })
}
//生成工资代付数据-查询薪税通所选月份存在待发薪数据
export function apiCreateSalary(formData) {
    return fetch({
        url: 'wagesCompute/queryXST',
        method: 'post',
        data: formData
    })
}
//生成工资代付数据，保存薪税通已有数据
export function apiSaveCreate(formData) {
    return fetch({
        url: 'wagesCompute/addBatch',
        method: 'post',
        data: formData
    })
}
//导入工资代付数据
//该方法没有用到，直接用的el-upload组件传值
export function apiImportSalary(params) {
    let formData = new FormData();
    formData.append("file", params.file);
    return fetch({
        url: 'waitSend/batch/addByCsv',
        method: 'post',
        data: formData
    })
}
//代发记录-详情-批次概要
export function apiBatchInfo(formData) {
    return fetch({
        url: 'remit/order/sum.json',
        method: 'post',
        data: formData
    })
}
//代发记录-详情-编辑
export function apiOrderEdite(formData) {
    return fetch({
        url: 'remit/order/update.json',
        method: 'post',
        data: formData
    })
}
//代发记录-详情-关闭订单
export function apiCloseOrder(formData) {
    return fetch({
        url: 'waitSend/batch/closeRemitOrder',
        method: 'post',
        data: formData
    })
}
//删除订单
export function apiDeleteOrder(formData) {
    return fetch({
        url: 'remit/order/delete.json',
        method: 'post',
        data: formData
    })
}
//代发订单
export function apiOrderList(formData) {
    return fetch({
        url: 'waitSend/batch/queryRemitOrderList',
        method: 'post',
        data: formData
    })
}
//代发记录-删除
export function apiDeleteBatch(formData) {
    return fetch({
        url: 'waitSend/batch/delete.json',
        method: 'post',
        data: formData
    })
}
//确认代发验密
export function apiConfirmPay(formData) {
    return fetch({
        url: 'confirmPay/checkBhaPasswd',
        method: 'post',
        data: formData
    })
}
//重发
export function apiReSend(formData) {
    return fetch({
        url: 'confirmPay/retry',
        method: 'post',
        data: formData
    })
}
//记录信息导出
export function apiRecordExport(formData) {
    return fetch({
        url: 'waitSend/batch/exportCSV',
        method: 'post',
        data: formData,
        responseType: 'blob'
    })
}
//订单信息导出
export function apiOrderExport(formData) {
    return fetch({
        url: 'waitSend/batch/remitOrderExportCSV',
        method: 'post',
        data: formData,
        responseType: 'blob'
    })
}
//下载模板
export function apiDownloadTemplate(formData) {
    return fetch({
        url: 'wages/downloadTemplate',
        method: 'post',
        data: formData,
        responseType: 'blob'
    })
}
//订单状态列表
export function apiOrderStatus(formData) {
    return fetch({
        url: 'waitSend/batch/getRemitOrderStatusComb',
        method: 'post',
        data: formData
    })
}