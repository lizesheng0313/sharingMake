import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

//各模块store
import { salaryCalStore } from '../modules/SalaryCal/store'
import { taxPageStore } from '../modules/tax/store'
Vue.use(Vuex)

import mutations from './mutations'
import actions from './action'

export default new Vuex.Store({
  modules: {
    salaryCalStore,
    taxPageStore
  },
  state: {
    token: '',
    isShowApp: true
  },
  mutations,
  actions,
  plugins: [createPersistedState({
    storage: sessionStorage
  })]
})
