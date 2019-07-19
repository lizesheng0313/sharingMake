
//身份证状态
const idValidStatus = [{
  'title': '身份证状态',
  list:
  {
    "": "不限",
    'AWAIT_CHECK': '待验证',
    'CHECKING': '验证中',
    'CHECK_SUCCESS': '验证通过',
    'CHECK_FAIL': '验证不通',
    'NO_CHECK': '暂不通过'
  }
},
{
  "title": "报送状态",
  list:
  {
    "": "不限",
    'AWAIT_REPORT': "待报送",
    'REPORTING': "待反馈",
    'REPORT_SUCCESS': "报送成功",
    'REPORT_ERROR': "报关失败"
  }

},
{
  "title": "人员状态",
  list: {
    "": "不限",
    'NORMAL': "正常",
    'NO_NORMAL': "非正常"
  }
},
{
  "title": "是否孤烈",
  list: {
    "": '不限',
    'Y': '是',
    'N': '否'
  }
}, {
  "title": "任职受雇从业类型",
  list: {
    "": '不限',
    'EMPLOYEE': '雇员',
    'OTHER': '其他'
  }
}
]

export default { idValidStatus }