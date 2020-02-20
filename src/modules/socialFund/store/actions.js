import { apiEmpMonthlyLedgerExport,apiFloatEmployeeEditErrorRecord,apiFloatEmployeeDecreaseErrorRecord,apiFloatEmployeeIncreaseErrorRecord,apiFloatEmployeeEditImport,apiFloatEmployeeDecreaseImport,apiFloatEmployeeIncreaseImport,apiFloatEmployeeDownloadModelDocE,apiFloatEmployeeDownloadModelDocD,apiFloatEmployeeDownloadModelDocI,apiDeleteEmpMonthly,apiDeleteCompMonthly,apiImportMonthlyLedger,apiMonthlyLedgerError,apiMonthlyLedgerTemplate,apiFloatEmployeeDel,apiFloatEmployeeDeExport,apiFloatEmployeeInExport,apiFloatEmployeeInsuredExport,apiFloatEmployeeManageSave,apiFloatEmployeeManageInfo,apiFloatEmployeeIncreaseDo,apiGetCompInsuredProject,apiFloatEmployeeDecreaseDo,apiFloatEmployeeIncreaseList,apiFloatEmployeeIncreaseUnlist,apiEmpMonthlyLedgerDetail,apiEmpMonthlyLedgerSupple,apiEmpMonthlyLedgerDelete,apiFloatEmployeeList,apiEmpMonthlyLedgerList,apiArchiveMonthlyLedger,apiSaveMonthlyLedger,apiGetCompMonthlyLedgerList,apiInsuredDel,apiInsuredGetEditInfo,apiInsuredProjectMList,apiInsuredProjectSave,apiInsuredGetInfo,apiInsuredProjectList,apiInsuredGetBase} from './api'

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
//参保台账 公司删除
export const actionDeleteCompMonthly= ({ dispatch },form) => {
  return apiDeleteCompMonthly(form)
}
//参保台账 员工删除
export const actionDeleteEmpMonthly= ({ dispatch },form) => {
  return apiDeleteEmpMonthly(form)
}
//参保台账归档
export const actionArchiveMonthlyLedger= ({ dispatch },form) => {
  return apiArchiveMonthlyLedger(form)
}
//参保台账 导入模板
export const actionMonthlyLedgerTemplate= ({ dispatch }) => {
  return apiMonthlyLedgerTemplate()
}
//参保台账 导入错误日志
export const actionMonthlyLedgerError= ({ dispatch },data) => {
  return apiMonthlyLedgerError(data)
}
//参保台账 导入
export const actionImportMonthlyLedger= ({ dispatch },data) => {
  return apiImportMonthlyLedger(data)
}
//参保月度台账、员工列表
export const actionEmpMonthlyLedgerList= ({ dispatch },form) => {
  return apiEmpMonthlyLedgerList(form)
}
//参保月度台账、员工列表导出
export const actionEmpMonthlyLedgerExport= ({ dispatch },form) => {
  return apiEmpMonthlyLedgerExport(form)
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
//增员导入模板
export const actionFloatEmployeeDownloadModelDocI= ({ dispatch }) => {
  return apiFloatEmployeeDownloadModelDocI()
}
//增员导入
export const actionFloatEmployeeIncreaseImport= ({ dispatch },data) => {
  return apiFloatEmployeeIncreaseImport(data)
}
//增员导入日志
export const actionFloatEmployeeIncreaseErrorRecord= ({ dispatch },data) => {
  return apiFloatEmployeeIncreaseErrorRecord(data)
}
//减员导入模板
export const actionFloatEmployeeDownloadModelDocD= ({ dispatch }) => {
  return apiFloatEmployeeDownloadModelDocD()
}
//减员导入
export const actionFloatEmployeeDecreaseImport= ({ dispatch },data) => {
  return apiFloatEmployeeDecreaseImport(data)
}
//减员导入日志
export const actionFloatEmployeeDecreaseErrorRecord= ({ dispatch },data) => {
  return apiFloatEmployeeDecreaseErrorRecord(data)
}
//编辑导入模板
export const actionFloatEmployeeDownloadModelDocE= ({ dispatch }) => {
  return apiFloatEmployeeDownloadModelDocE()
}
//编辑导入
export const actionFloatEmployeeEditImport= ({ dispatch },data) => {
  return apiFloatEmployeeEditImport(data)
}
//编辑导入日志
export const actionFloatEmployeeEditErrorRecord= ({ dispatch },data) => {
  return apiFloatEmployeeEditErrorRecord(data)
}
//增减员列表 删除
export const actionFloatEmployeeDel= ({ dispatch },form) => {
  return apiFloatEmployeeDel(form)
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
//增员
export const actionFloatEmployeeIncreaseDo= ({ dispatch },form) => {
  return apiFloatEmployeeIncreaseDo(form)
}
//参保导出
export const actionFloatEmployeeInsuredExport= ({ dispatch },form) => {
  return apiFloatEmployeeInsuredExport(form)
}
//增员导出
export const actionFloatEmployeeInExport= ({ dispatch },form) => {
  return apiFloatEmployeeInExport(form)
}
//减员导出
export const actionFloatEmployeeDeExpor= ({ dispatch },form) => {
  return apiFloatEmployeeDeExport(form)
}
//增减员详情
export const actionFloatEmployeeManageInfo= ({ dispatch },data) => {
  return apiFloatEmployeeManageInfo(data)
}
//增减员 编辑、保存
export const actionFloatEmployeeManageSave= ({ dispatch },data) => {
  return apiFloatEmployeeManageSave(data)
}
//增员参保方案
export const actionGetCompInsuredProject= ({ dispatch },) => {
  return apiGetCompInsuredProject()
}
