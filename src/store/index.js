import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

//各模块store

import { homePageStore } from '../modules/homePage/store'
import { salaryCalStore } from '../modules/salaryCal/store'
import { taxPageStore } from '../modules/tax/store'
import { cumulativePageStore } from '../modules/initialize/store'
import { taxPaidStore } from '../modules/taxPaid/store'
import { payManageStore } from '@/modules/payManage/store'
import { accountPageStore } from "@/modules/account/store"
import { withdrawalPageStore } from "@/modules/withdrawal/store"
import { payMasterStore } from "@/modules/payMaster/store"
Vue.use(Vuex)

import mutations from './mutations'
import actions from './action'

export default new Vuex.Store({
  modules: {
    homePageStore,
    salaryCalStore,
    taxPageStore,
    cumulativePageStore,
    taxPaidStore,
    withdrawalPageStore,
    payManageStore,
    accountPageStore,
    payMasterStore
  },
  state: {
    token: '',
    isShowApp: true,
    privilegeVoList:[],
    taxSubjectInfoList:[],
    countryList:[],
    bankList:[],
  },
  mutations,
  actions,
  plugins: [createPersistedState({
    storage: sessionStorage
  })]
})
