import { fetch, fetchFile } from 'request/fetch'

//參保方案
export function apiInsuredProjectList(ruleForm) {
  return fetch({
    url: '/api/xsalary/insuredProject/manage/list',
    method: 'post',
    data: ruleForm
  })
}





