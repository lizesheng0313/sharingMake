import { apiGetSalaryStatus,apiSalaryStubsList,apiSalarySum,apiCheckMemberDownload,apiCheckMemberDeleteAll} from './api'

export const actionGetSalaryStatus = ({ dispatch },id) => {
  return apiGetSalaryStatus(id);
}
//工资表列表
export const actionGetSalaryStubsList = ({ dispatch },form) => {
  return apiSalaryStubsList(form);
}
//薪资表合计
export const actionPostSalarySum = ({ dispatch },form) => {
  return apiSalarySum(form);
}
//下载人员模板
export const postCheckMemberDownload = ({ dispatch }) => {
  return apiCheckMemberDownload();
}
//核对人员删除全部
export const deleteCheckMemberDeleteAll = ({ dispatch },checkId) => {
  return apiCheckMemberDeleteAll(checkId);
}

