import { apiInsuredProjectList} from './api'

//參保列表
export const actionInsuredProjectList = ({ dispatch },ruleForm) => {
    return apiInsuredProjectList(ruleForm)
}


