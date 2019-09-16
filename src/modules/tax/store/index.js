import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

export const taxPageStore = {
  namespaced: true,
  state: {
    personnelCollection: {}//人员集合
  },
  actions,
  mutations,
  getters
}
