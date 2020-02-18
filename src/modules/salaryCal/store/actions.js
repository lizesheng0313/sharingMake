import { apiAddEmpCollectList,apiCheckMemberSummary,apiSalaryAddDetailCheckMembers,apiSalaryDetailCheckMembersDelete,apiAddSalaryEmp,apiSalaryDetailCheckMembers,apiSalaryAddEmpList,apiSyncSalaryEmp,apiEnterpriseEmployees,apiGetSalaryStatus,apiSalaryStubsList,apiSalarySum,apiCheckMemberDownload,apiCheckMemberDeleteAll,apiMemberErrorRecord,apiSocialProvident,apiSocialProvidentTemplate,apiSocialProvidentRecord,apisyncLastMonthSocial,apiSalaryComputes,apiSalaryCheckQuery,apiSocialProvidentExport,apiCheckEmpReportStatus,apiPayrollCredit,apiSalaryCheckFailRecord,apiSalaryCheckFailRecordExport,apiPayrollCreditCancel,apiGetAdditionalListExport,apiPayrollCreditExport,apiTips} from './api'


//增减员明细
export const actionSalaryDetailCheckMembers = ({ dispatch },form) => {
  return apiSalaryDetailCheckMembers(form);
}
//删除算薪人员
export const actionSalaryDetailCheckMembersDelete = ({ dispatch },id) => {
  return apiSalaryDetailCheckMembersDelete(id);
}
//添加算薪人员
export const actionSalaryAddDetailCheckMembers = ({ dispatch },id) => {
  return apiSalaryAddDetailCheckMembers(id);
}
//可添加发薪人员列表
export const actionSalaryAddEmpList = ({ dispatch },form) => {
  return apiSalaryAddEmpList(form);
}
//可添加人员信息采集 列表
export const actionAddEmpCollectList = ({ dispatch },form) => {
  return apiAddEmpCollectList(form);
}
//增减员明细人数
export const actionCheckMemberSummary = ({ dispatch },id) => {
  return apiCheckMemberSummary(id);
}

//可添加发薪人员  添加
export const actionAddSalaryEmp = ({ dispatch },form) => {
  return apiAddSalaryEmp(form);
}
//同步发薪人员
export const actionSyncSalaryEmp = ({ dispatch },id) => {
  return apiSyncSalaryEmp(id);
}
export const actionGetSalaryStatus = ({ dispatch },id) => {
  return apiGetSalaryStatus(id);
}
//工资表列表
export const actionGetSalaryStubsList = ({ dispatch },form) => {
  return apiSalaryStubsList(form);
}
//工资表设置扣缴义务人人员
export const actionGetEnterpriseEmployees = ({ dispatch },id) => {
  return apiEnterpriseEmployees(id);
}
//薪资表合计
export const actionPostSalarySum = ({ dispatch },form) => {
  return apiSalarySum(form);
}
//薪资核算提示
export const actionPostTips = ({ dispatch },form) => {
  return apiTips(form);
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
//检索发放状态
export const actionPayrollCredit = ({ dispatch },id) => {
  return apiPayrollCredit(id);
}
//检索撤销发放
export const actionPayrollCreditCancel = ({ dispatch },id) => {
  return apiPayrollCreditCancel(id);
}
//检索发放失败原因导出
export const actionPayrollCreditExport = ({ dispatch },id) => {
  return apiPayrollCreditExport(id);
}

//薪资计算失败记录
export const actionSalaryCheckFailRecord = ({ dispatch },params) => {
  return apiSalaryCheckFailRecord(params);
}
//薪资计算失败记录
export const actionSalaryCheckFailRecordExport = ({ dispatch },params) => {
  return apiSalaryCheckFailRecordExport(params);
}

//专项附加扣除导出
export const actionGetAdditionalListExport = ({ dispatch },data) => {
  return apiGetAdditionalListExport(data);
}





