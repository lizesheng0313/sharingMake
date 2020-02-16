import { apiEmpMonthlyLedgerList,apiArchiveMonthlyLedger,apiSaveMonthlyLedger,apiGetCompMonthlyLedgerList,apiInsuredDel,apiInsuredGetEditInfo,apiInsuredProjectMList,apiInsuredProjectSave,apiInsuredGetInfo,apiInsuredProjectList,apiInsuredGetBase} from './api'

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
