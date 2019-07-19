/**
 * 模板管理 常量定义
 */
export default {
  //身份证状态
  idValidStatus: {
    0: [],
    '1': 'AWAIT_CHECK',
    '2': 'CHECKING',
    '3': 'CHECK_SUCCES,S',
    '4': 'CHECK_FAI,L',
    '5': 'NO_CHECK'
  },
  //报送状态
  reportStatus: {
    "0": [],
    '1': 'AWAIT_REPORT',
    '2': 'REPORTING',
    '3': 'REPORT_SUCCESS',
    '4': 'REPORT_ERROR'
  },
  workerType: {
    "0": [],
    '1': 'EMPLOYEE',
    '2': 'OTHER'
  },
  empStatus: {
    "0": "",
    '1': 'NORMAL',
    '2': 'NO_NORMAL'
  },
  iscgl: {
    "0": "",
    '1': 'Y',
    '2': 'N'
  }
}
