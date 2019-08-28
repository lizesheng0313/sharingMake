import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

//各模块store
import { salaryCalStore } from '../modules/salaryCal/store'
import { taxPageStore } from '../modules/tax/store'
import { cumulativePageStore } from '../modules/cumulative/store'
Vue.use(Vuex)

import mutations from './mutations'
import actions from './action'

export default new Vuex.Store({
  modules: {
    salaryCalStore,
    taxPageStore,
    cumulativePageStore
  },
  state: {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidXNlcl8xNjI5IiwiZW50ZXJwcmlzZUlkIjoxNjI5LCJ1c2VyVHlwZSI6IkVOVEVSUFJJU0UiLCJ1c2VySWQiOjE2MTEsImV4cCI6MTU2ODE4MTU0M30.kNhImkznwX4C6JKdoyNNxrkhCmzLNsuhEGWMbnTJfl4',
    isShowApp: true
  },
  mutations,
  actions,
  plugins: [createPersistedState({
    storage: sessionStorage
  })]
})
