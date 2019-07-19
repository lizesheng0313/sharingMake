/**
 * 模板管理 常量定义
 */
export default {
  //身份证状态
  idValidStatus: {
    '待验证': 'AWAIT_CHECK',
    '验证中': 'CHECKING',
    '验证通过': 'CHECK_SUCCES,S',
    '验证不通过': 'CHECK_FAI,L',
    '暂不验证': 'NO_CHECK'
  },
  //报送状态
  reportStatus: {
    '待报送': 'AWAIT_REPORT',
    '待反馈': 'REPORTING',
    '报送成功': 'REPORT_SUCCESS',
    '报送失败': 'REPORT_ERROR'
  },
  workerType: {
    '雇员': 'EMPLOYEE',
    '其他': 'OTHER'
  },
  empStatus: {
    '正常': 'NORMAL',
    '非正常': 'NO_NORMAL'
  }
}
