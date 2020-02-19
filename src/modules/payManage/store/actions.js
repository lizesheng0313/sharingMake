import * as AT from './actionTypes';
import { apiBatchList, apiRecordList, apiCreateSalary, apiImportSalary, apiBatchInfo, apiCloseOrder, apiOrderEdite, apiOrderList, apiDeleteBatch, apiSaveCreate, apiSelectMerchant, apiSelectStatus, apiRecordInfo, apiDeleteOrder, apiConfirmPay, apiReSend, apiRecordExport, apiOrderExport, apiDownloadTemplate, apiOrderStatus } from './api'

export const postBatchList = ({ commit }, formData) => {
    return apiBatchList(formData).then(res => {
        commit(AT.SET_BATCHLIST, res.data);
    });
};

export const postRecordList = ({ commit }, formData) => {
    return apiRecordList(formData).then(res => {
        commit(AT.SET_RECORDLIST, res.data);
    });
};

export const postCreateSalary = ({ commit }, formData) => {
  return apiCreateSalary(formData).then(res => res);
};

export const postImportSalary = ({ commit }, formData) => {
    return apiImportSalary(formData).then(res => res);
};

export const postBatchInfo = ({ commit }, formData) => {
    return apiBatchInfo(formData).then(res => {
        commit(AT.SET_BATCHINFO, res.data);
    });
};

export const postCloseOrder = ({ commit }, formData) => {
    return apiCloseOrder(formData).then(res => res);
};

export const postOrderEdite = ({ commit }, formData) => {
    return apiOrderEdite(formData).then(res => res);
};

export const postOrderList = ({ commit }, formData) => {
    return apiOrderList(formData).then(res => {
        commit(AT.SET_ORDERLIST, res.data);
    });
};

export const postDeleteBatch = ({ commit }, formData) => {
    return apiDeleteBatch(formData).then(res => res);
};

export const postSaveCreate = ({ commit }, formData) => {
    return apiSaveCreate(formData).then(res => res);
};

export const postSelectMerchant = ({ commit }, formData) => {
    return apiSelectMerchant(formData).then(res => res);
};

export const postSelectStatus = ({ commit }, formData) => {
    return apiSelectStatus(formData).then(res => res);
};

export const postRecordInfo = ({ commit }, formData) => {
    return apiRecordInfo(formData).then(res => {
        commit(AT.SET_RECORDINFO, res.data);
    });
};

export const postDeleteOrder = ({ commit }, formData) => {
    return apiDeleteOrder(formData).then(res => res);
};

export const postConfirmPay = ({ commit }, formData) => {
    return apiConfirmPay(formData).then(res => res);
};

export const postReSend = ({ commit }, formData) => {
    return apiReSend(formData).then(res => res);
};

export const postRecordExport = ({ commit }, formData) => apiRecordExport(formData);
export const postOrderExport = ({ commit }, formData) => apiOrderExport(formData);
export const postDownloadTemplate = ({ commit }, formData) => apiDownloadTemplate(formData);
export const postOrderStatus = ({ commit }, formData) => apiOrderStatus(formData);