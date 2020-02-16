import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

export const socialFundStore = {
  namespaced: true,
  state: {
    insuredAccoundItem:{}
  },
  actions,
  mutations,
  getters
}
