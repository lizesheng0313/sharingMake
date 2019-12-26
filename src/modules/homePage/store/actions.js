import { apiGetUserInfo } from './api'

//累计应税所得额初始化-集合列表
export const actionGetUserInfo = ({ dispatch },ruleForm) => {
  return apiGetUserInfo(ruleForm)
}
