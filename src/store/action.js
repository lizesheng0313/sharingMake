import { apiIndex, apiUploader, apiUploaderImage, apiNotify, apiTaskstatus, apiSteps } from "./api"
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
  actionUploaderImage({ commit }, data) {
    return apiUploaderImage(data)
  },
  actionNotify({ commit }, data) {
    return apiNotify(data)
  },
  actionTaskstatus({ commit }, data) {
    return apiTaskstatus(data)
  },
  actionSteps({ commit }, data) {
    return apiSteps(data)
  }
}
