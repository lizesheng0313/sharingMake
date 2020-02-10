import { apiGetEmployee,apiPostEmployeeList,apiPostEmployee,apiPostCompany,apiGetCity,apiPostCompanyChange} from './api'

//发薪人员、员工信息列表
export const actionGetEmployeeList = ({ dispatch },form) => {
  return apiPostEmployeeList(form)
}
//发薪人员、员工详情
export const actionGetEmployee = ({ dispatch },id) => {
    return apiGetEmployee(id)
}

//发薪人员、员工详情、保存员工基本信息
export const actionSaveEmployee = ({ dispatch },form) => {
  return apiPostEmployee(form)
}

//发薪人员、员工详情、保存公司信息
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

