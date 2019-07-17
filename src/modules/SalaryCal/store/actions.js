import { apiGetSalaryStatus } from './api'

export const actionGetSalaryStatus = ({ dispatch },id) => {
  return apiGetSalaryStatus(id);
}

