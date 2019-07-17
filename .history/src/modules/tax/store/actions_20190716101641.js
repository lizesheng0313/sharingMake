import { apiTaxSubjectList } from './api'

export default {
    actionTaxSubjectList({ commit }) {
        return apiTaxSubjectList()
    }
}