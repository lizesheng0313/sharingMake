import * as AT from './actionTypes'
export default {
  [AT.GET_INSUREDACCOUNTITEM](state, insuredAccoundItem) {
    state.insuredAccoundItem = insuredAccoundItem;
  },
}

