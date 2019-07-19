
//身份证状态
let idValidStatus = {
  "0": "",
  '1': 'AWAIT_CHECK',
  '2': 'CHECKING',
  '3': 'CHECK_SUCCES,S',
  '4': 'CHECK_FAI,L',
  '5': 'NO_CHECK'
}
//报送状态
let reportStatus = {
  "0": "",
  '1': 'AWAIT_REPORT',
  '2': 'REPORTING',
  '3': 'REPORT_SUCCESS',
  '4': 'REPORT_ERROR'
}
//任职受雇从业类型
let workerType = {
  "0": "",
  '1': 'EMPLOYEE',
  '2': 'OTHER'
}
//人员状态
let empStatus = {
  "0": "",
  '1': 'NORMAL',
  '2': 'NO_NORMAL'
}
//是否孤烈
let iscgl = {
  "0": "",
  '1': 'Y',
  '2': 'N'
}

export default { idValidStatus, reportStatus, workerType, empStatus, iscgl }