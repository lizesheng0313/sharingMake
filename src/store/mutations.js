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

}
