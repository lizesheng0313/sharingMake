import { fetch, fetchFile } from 'request/fetch'
import oldFetch from "request/oldFetch";
//參保方案
export function apiInsuredProjectList(ruleForm) {
  return fetch({
    url: '/api/xsalary/insuredProject/manage/list',
    method: 'post',
    data: ruleForm
  })
}
//参保方案，新增，城市参保方案
export function apiInsuredGetBase(id) {
  return oldFetch({
    url: 'xsalary/insuredProject/manage/getBase/'+id,
    method: 'get',
  })
}






