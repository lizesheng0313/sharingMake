import * as AT from './actionTypes'
export default {
  [AT.GET_INSUREDACCOUNTITEM](state, insuredAccoundItem) {
    state.insuredAccoundItem = insuredAccoundItem;
  },
  //快速增减员选择Item
  [AT.GET_ATRRITIONITEM](state, attritionItem) {
    state.attritionItem = attritionItem;
  },
}

