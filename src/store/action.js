import { apiIndex, apiUploader, apiUploaderImage, apiNotify, apiTaskstatus, apiSteps, apiGetCode, apiRegister, apiLogin } from "./api"
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
  },
  actionGetCode({ commit }, data) {
    return apiGetCode(data)
  },
  actionRegister({ commit }, data) {
    return apiRegister(data)
  },
  actionLogin({ commit }, data) {
    return apiLogin(data)
  },
}
