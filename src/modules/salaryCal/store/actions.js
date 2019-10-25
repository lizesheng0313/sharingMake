import { apiGetSalaryStatus,apiSalaryStubsList,apiSalarySum,apiCheckMemberDownload,apiCheckMemberDeleteAll,apiMemberErrorRecord,apiSocialProvident,apiSocialProvidentTemplate,apiSocialProvidentRecord} from './api'

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
//导入人员模板下载日志
export const postMemberErrorRecord = ({ dispatch },uuid) => {
  return apiMemberErrorRecord(uuid);
}
//核对人员删除全部
export const deleteCheckMemberDeleteAll = ({ dispatch },checkId) => {
  return apiCheckMemberDeleteAll(checkId);
}
// 社保公积金导入
export const actionSocialProvident = ({ dispatch },data) => {
  return apiSocialProvident(data);
}
// 社保公积金 下载模板
export const actionSocialProvidentTemplate = ({ dispatch }) => {
  return apiSocialProvidentTemplate();
}

// 社保公积金 下载日志
export const actionSocialProvidentRecord = ({ dispatch },uuid) => {
  return apiSocialProvidentRecord(uuid);
}

