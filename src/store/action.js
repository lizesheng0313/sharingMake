
import { apiUserPrivilege} from './api'

export default {

  //获取用户权限
  actionUserPrivilege({commit}){
    return apiUserPrivilege();
  }

}

