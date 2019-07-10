import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

export const salaryCalStore = {
  namespaced: true,
  state: {
    rouleId:"",
    basicInfoForm:{},
    IndexCurrentDate:"",//薪资核算首页选择时间
  },
  actions,
  mutations,
  getters
}
