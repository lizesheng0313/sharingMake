import { apiGetCode } from './api'

export default {
    getCode({ commit }) {
        return apiGetCode()
    }
}
