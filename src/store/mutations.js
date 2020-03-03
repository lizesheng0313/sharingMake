import * as AT from './actionTypes'

export default {
    [AT.SHOWAPP](state, value) {
        state.isShowApp = value
    },
    [AT.SET_TOKEN](state,value){
      state.token = value
    },
    [AT.SET_PRIVILIGEVOLiST](state,value){
      state.privilegeVoList = value
    },
    [AT.SET_TAXSUBJECTINFOLIST](state,value){
      state.taxSubjectInfoList = value
    },
    [AT.SET_COUNTRYLIST](state,value){
      state.countryList = value
    },
    [AT.SET_BANKLIST](state,value){
      state.bankList = value
    },
    [AT.SET_CITYLIST](state,value){
      state.cityList = value
    },

}
