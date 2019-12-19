import { apiGetCode,apiUserPrivilege} from './api'

export default {
    getCode({ commit }) {
        return apiGetCode()
    },
    //获取用户权限
    actionUserPrivilege({commit}){
      return apiUserPrivilege();
    }
}
