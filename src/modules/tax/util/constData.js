
//身份证状态
export const idValidStatus = {
  'AWAIT_CHECK': '待验证',
  'CHECKING': '验证中',
  'CHECK_SUCCESS': '验证通过',
  'CHECK_FAIL': '验证不通过',
  'NO_CHECK': '暂不验证'
};
//报送状态
export const reportStatus = {
  'AWAIT_REPORT': "待报送",
  'REPORTING': "待反馈",
  'REPORT_SUCCESS': "报送成功",
  'REPORT_ERROR': "报送失败"
}
//人员状态
export const empStatus = {
  "": "不限",
  'NORMAL': "正常",
  'NO_NORMAL': "非正常"
}
//是否孤老
export const iscgl =
{
  "": '不限',
  "Y": '是',
  "N": '否'
}
//雇员状态
export const workerType = {
  'EMPLOYEE': '雇员',
  'OTHER': '其他'
}
//性别
export const empSex = {
  'MALE': '男',
  'FEMALE': '女'
}
//证件类型
export const idType = {
  'PRC_ID': "居民身份证",
  'COMPATRIOTS_CARD': "港澳居民来往内地通行证",
  'FORMOSA_CARD': "台湾居民来往大陆通行证",
  'CHINA_PASSPORT': "中国护照",
  'FOREIGN_PASSPORT': "外国护照",
  'HONGKONG_RESIDENCE': "香港永久性居民身份证",
  "FORMOSA_PRC_ID": "台湾身份证",
  "MACAU_PRC_ID": "澳门特别行政区永久性居民身份证",
  "OTHER": "其他"
}

//申报类型
export const reportType = {
  "NORMAL": "正常申报",
  "CORRECT": "更正申报"
}

//申报状态
export const declareStatus = {
  "INIT":"_",
  "GENERATE_REPORT_WAIT":"申报表生成中",
  "AWAIT_REPORT":"未申报",
  "REPORTING":"_",
  "REPORT_WAIT_BACK":"申报处理中",
  "REPORT_BACK_WAIT_BACK":"_",
  "REPORT_ERROR":"申报失败",
  "REPORT_SUCCESS":"申报成功",
  "REPORT_SUCCESS_OTHER":"申报成功未接受处罚",
  "CANCEL_SUCCESS":"作废成功",
  "CANCEL_WAIT_BACK":"_"
}

export const subTaxReportType = {
  "SALARY_PAY_RULE": "工资薪金所得申报",
  "PERSON_PAY_RULE": "劳务报酬所得申报",
  "TOTAL_RULE": "综合所得预扣预缴表",
  "BONUS_PAY_RULE":"全年一次性奖金申报",
  "REMOVE_CONTRACT_RULE":"解除劳动合同申报",
}