import * as actions from './actions';
import mutations from './mutations';

export const payManageStore = {
    namespaced: true,
    state: {
        currStep: 0,
        //批量代发
        batchList: [],
        batchListTotal: 0,
        salaryInfo: {},
        //代发记录
        recordList: [],
        recordListTotal: 0,
        recordInfo: {},
        //代发订单,第二步确认订单中的订单列表
        orderList: [],
        orderListTotal: 0,
        batchInfo: {},
    },
    mutations,
    actions
}