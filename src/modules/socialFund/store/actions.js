import { apiInsuredGetInfo,apiInsuredProjectList,apiInsuredGetBase} from './api'

//參保列表
export const actionInsuredProjectList = ({ dispatch },ruleForm) => {
    return apiInsuredProjectList(ruleForm)
}
//參保列表
export const actionInsuredGetBase = ({ dispatch },id) => {
    return apiInsuredGetBase(id)
}

//参保详情
export const actionInsuredGetInfo = ({ dispatch },id) => {
  return apiInsuredGetInfo(id)
}


