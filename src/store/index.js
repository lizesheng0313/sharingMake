import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

//各模块store

// import { homePageStore } from '../modules/homePage/store'

Vue.use(Vuex)

import mutations from './mutations'
import actions from './action'

export default new Vuex.Store({
  modules: {
  },
  state: {
    token: '',
  },
  mutations,
  actions,
  plugins: [createPersistedState({
    storage: sessionStorage
  })]
})
