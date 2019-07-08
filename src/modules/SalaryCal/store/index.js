import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

export const salaryCalStore = {
  namespaced: true,
  state: {
    rouleId:"",
    basicInfoForm:{}
  },
  actions,
  mutations,
  getters
}
