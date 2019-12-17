import { apiGetSalaryStatus,apiSalaryStubsList,apiSalarySum,apiCheckMemberDownload,apiCheckMemberDeleteAll,apiMemberErrorRecord,apiSocialProvident,apiSocialProvidentTemplate,apiSocialProvidentRecord,apisyncLastMonthSocial,apiSalaryComputes,apiSalaryCheckQuery,apiSocialProvidentExport,apiCheckEmpReportStatus,apiPayrollCredit,apiSalaryCheckFailRecord} from './api'

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
//校验人员报送状态
export const actionCheckEmpReportStatus = ({ dispatch },data) => {
  return apiCheckEmpReportStatus(data);
}
// 社保公积金导入
export const actionSocialProvident = ({ dispatch },data) => {
  return apiSocialProvident(data);
}
// 社保公积金导出
export const actionSocialProvidentExport = ({ dispatch },data) => {
  return apiSocialProvidentExport(data);
}
// 社保公积金 下载模板
export const actionSocialProvidentTemplate = ({ dispatch }) => {
  return apiSocialProvidentTemplate();
}

// 社保公积金 下载日志
export const actionSocialProvidentRecord = ({ dispatch },uuid) => {
  return apiSocialProvidentRecord(uuid);
}

//社保公积金  复制上月累计数据
export const actionSyncLastMonthSocial = ({ dispatch },params) => {
  return apisyncLastMonthSocial(params);
}

//薪资计算
export const actionSalaryComputes = ({ dispatch },params) => {
  return apiSalaryComputes(params);
}
//薪资计算  反馈
export const actionSalaryCheckQuery = ({ dispatch },params) => {
  return apiSalaryCheckQuery(params);
}
export const actionPayrollCredit = ({ dispatch },id) => {
  return apiPayrollCredit(id);
}
//薪资计算失败记录
export const actionSalaryCheckFailRecord = ({ dispatch },params) => {
  return apiSalaryCheckFailRecord(params);
}


