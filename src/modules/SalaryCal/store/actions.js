import { apiGetSalaryStatus,apiSalaryStubsList } from './api'

export const actionGetSalaryStatus = ({ dispatch },id) => {
  return apiGetSalaryStatus(id);
}
//工资表列表
export const actionGetSalaryStubsList = ({ dispatch },form) => {
  return apiSalaryStubsList(form);
}

