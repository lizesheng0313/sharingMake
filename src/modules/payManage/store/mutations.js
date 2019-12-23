import * as AT from './actionTypes';
import { orderStatus, batchStatus, checkStatus, activeStatus } from "@/utils/constData";

export default {
    [AT.SET_CURRSTEP](state, payload) {
        state.currStep = payload;
    },
    [AT.SET_BATCHLIST](state, payload) {
        if (payload && payload.length > 0) {
            payload.forEach(item => {
                item.bhaAuditStatusStr = item.bhaAuditStatus ? checkStatus[item.bhaAuditStatus] : '-';
                item.bhaOpenStatusStr = item.bhaOpenStatus ? activeStatus[item.bhaOpenStatus] : '-';
            });
        }
        state.batchList = payload;
    },
    [AT.SET_RECORDLIST](state, payload) {
        if (payload && payload.list && payload.list.length > 0) {
            payload.list.forEach(item => {
                item.statusStr = item.status ? batchStatus[item.status] : '-';
            });
        }
        state.recordList = payload.list;
        state.recordListTotal = payload.total;
    },
    [AT.SET_RECORDINFO](state, payload) {
        if (payload) {
            payload.statusStr = batchStatus[payload.status];
        }
        state.recordInfo = payload;
    },
    [AT.SET_BATCHINFO](state, payload) {
        state.batchInfo = payload;
    },
    [AT.SET_ORDERLIST](state, payload) {
        if (payload && payload.list && payload.list.length > 0) {
            payload.list.forEach(item => {
                item.statusStr = item.status ? orderStatus[item.status] : '-';
            });
        }
        state.orderList = payload.list;
        state.orderListTotal = payload.total;
    },
    [AT.SET_SALARYINFO](state, payload) {
        state.salaryInfo = payload;
    }
}