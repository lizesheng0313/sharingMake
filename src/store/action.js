import { apiIndex, apiUploader } from "./api"
import * as ACT from "./actionTypes"
export default {
  actionIndex({ commit }, data) {
    return apiIndex(data).then(res => {
      commit(ACT.INDEXOBJ, res.data)
      return res
    })
  },
  actionUploader({ commit }, data) {
    return apiUploader(data)
  },
}
