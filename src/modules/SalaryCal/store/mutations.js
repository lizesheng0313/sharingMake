import * as AT from './actionTypes'
export default {
  [AT.SET_ROULEID](state, rouleId) {
    state.rouleId = rouleId;
  },
  [AT.SET_BASICINFOFORM](state, basicInfoForm) {
    state.basicInfoForm = basicInfoForm;
  },
  [AT.SET_INDEXCURRENTDATE](state, currentDate) {
    state.IndexCurrentDate = currentDate;
  },
}

