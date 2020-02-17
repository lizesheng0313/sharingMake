import { apiFloatEmployeeDecreaseDo,apiFloatEmployeeIncreaseList,apiFloatEmployeeIncreaseUnlist,apiEmpMonthlyLedgerDetail,apiEmpMonthlyLedgerSupple,apiEmpMonthlyLedgerDelete,apiFloatEmployeeList,apiEmpMonthlyLedgerList,apiArchiveMonthlyLedger,apiSaveMonthlyLedger,apiGetCompMonthlyLedgerList,apiInsuredDel,apiInsuredGetEditInfo,apiInsuredProjectMList,apiInsuredProjectSave,apiInsuredGetInfo,apiInsuredProjectList,apiInsuredGetBase} from './api'

// 参保 方案列表
export const actionInsuredProjectMList = ({ dispatch },ruleForm) => {
  return apiInsuredProjectMList(ruleForm)
}

//参保编辑 获取内容
export const actionInsuredGetEditInfo = ({ dispatch },id) => {
  return apiInsuredGetEditInfo(id)
}

//参保编辑 获取内容
export const actionInsuredDel = ({ dispatch },id) => {
  return apiInsuredDel(id)
}

//基础參保列表
export const actionInsuredProjectList = ({ dispatch },ruleForm) => {
    return apiInsuredProjectList(ruleForm)
}
//參保列表
export const actionInsuredGetBase = ({ dispatch },id) => {
    return apiInsuredGetBase(id)
}

//参保详情
export const actionInsuredGetInfo = ({ dispatch },id) => {
  return apiInsuredGetInfo(id)
}

//参保详情 保存
export const actionInsuredProjectSave = ({ dispatch },ruleForm) => {
  return apiInsuredProjectSave(ruleForm)
}

//参保台账企业信息
export const actionGetCompMonthlyLedgerList= ({ dispatch },form) => {
  return apiGetCompMonthlyLedgerList(form)
}
//参保台账生成
export const actionSaveMonthlyLedger= ({ dispatch },form) => {
  return apiSaveMonthlyLedger(form)
}
//参保台账归档
export const actionArchiveMonthlyLedger= ({ dispatch },form) => {
  return apiArchiveMonthlyLedger(form)
}
//参保月度台账、员工列表
export const actionEmpMonthlyLedgerList= ({ dispatch },form) => {
  return apiEmpMonthlyLedgerList(form)
}
//参保月度台账补缴删除
export const actionEmpMonthlyLedgerDelete= ({ dispatch },form) => {
  return apiEmpMonthlyLedgerDelete(form)
}
//参保月度台账补缴
export const actionEmpMonthlyLedgerSupple= ({ dispatch },form) => {
  return apiEmpMonthlyLedgerSupple(form)
}
//参保月度台账员工详情
export const actionEmpMonthlyLedgerDetail= ({ dispatch },form) => {
  return apiEmpMonthlyLedgerDetail(form)
}
//增减员列表
export const actionFloatEmployeeList= ({ dispatch },form) => {
  return apiFloatEmployeeList(form)
}
//增减员 入职未投保
export const actionFloatEmployeeIncreaseUnlist= ({ dispatch },form) => {
  return apiFloatEmployeeIncreaseUnlist(form)
}
//增减员 离职已投保
export const actionFloatEmployeeIncreaseList= ({ dispatch },form) => {
  return apiFloatEmployeeIncreaseList(form)
}
//减员
export const actionFloatEmployeeDecreaseDo= ({ dispatch },form) => {
  return apiFloatEmployeeDecreaseDo(form)
}