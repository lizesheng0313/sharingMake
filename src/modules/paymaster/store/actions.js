import { apiPostEmpolyeeCompany,apiEmployeeIdCard,apiEmployeesImport,apiEmployeesVerifyErrorLog,apiEmployeesTemplate,apiDeleteEmployee,apiPostEmployeesExport,apiGetEmployee,apiPostEmployeeList,apiPostEmployee,apiPostCompany,apiGetCity,apiPostCompanyChange,apiGetCountries,apiGetBanks,apiPostEmployees} from './api'
//发薪人员、员工信息列表
export const actionGetEmployeeList = ({ dispatch },form) => {
  return apiPostEmployeeList(form)
}
//发薪人员 导出
export const actionEmployeeExport = ({ commit }, formData) => {
  return apiPostEmployeesExport(formData).then(res => res);
};
//发薪人员 删除
export const actionDeleteEmployee = ({ commit }, id) => {
  return apiDeleteEmployee(id).then(res => res);
};
//发薪人员、员工详情
export const actionGetEmployee = ({ dispatch },data) => {
    return apiGetEmployee(data)
}

//发薪人员、员工详情、保存员工基本信息
export const actionSaveEmployee = ({ dispatch },form) => {
  return apiPostEmployee(form)
}

//发薪人员、员工详情、保存公司信息
export const actionEmpolyeeCompany = ({ dispatch },form) => {
  return apiPostEmpolyeeCompany(form)
}

//发薪人员、变更、保存公司信息
export const actionSaveCompany = ({ dispatch },form) => {
  return apiPostCompany(form)
}
//调动
export const actionCompanyChange = ({ dispatch },form) => {
  return apiPostCompanyChange(form)
}

//城市
export const actionGetCity= ({ dispatch }) => {
  return apiGetCity()
}

//国籍
export const actionGetCountries= ({ dispatch }) => {
  return apiGetCountries()
}

//银行
export const actionGetBanks= ({ dispatch }) => {
  return apiGetBanks()
}

//新增员工信息
export const actionAddEmployees= ({ dispatch },form) => {
  return apiPostEmployees(form)
}

//新增模板下载
export const actionEmployeesTemplate= ({ dispatch }) => {
  return apiEmployeesTemplate()
}

//导入错误日志下载
export const actionEmployeesVerifyErrorLog= ({ dispatch },data) => {
  return apiEmployeesVerifyErrorLog(data)
}

//增员导入
export const actionEmployeesImport= ({ dispatch },data) => {
  return apiEmployeesImport(data)
}
//校验身份证号
export const actionEmployeeIdCard= ({ dispatch },idCard) => {
  return apiEmployeeIdCard(idCard)
}



