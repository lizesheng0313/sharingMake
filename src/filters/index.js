import Vue from 'vue'
import filterSample from './sample'

Vue.filter('filterSample', filterSample)
//data时间转化
const resetDate = (val) => {
 return val?val.split(" ")[0]:""
};
//计税规则
const texRule = (val) => {
  switch (val) {
    case 'SALARY_PAY_RULE': {
      return '按工资薪资所得计算个税';
    }
    case 'PERSON_PAY_RULE': {
      return '按劳务报酬所得计算个税';
    }
    case 'YEAR_END_BONUS': {
      return '按全年一次性奖金计算个税';
    }
  }
};
//薪资核算状态
const salaryCheckStatus = (val) => {
  switch (val) {
    case 'NONE': {
      return '未启动';
    }
    case 'INIT': {
      return '未计算';
    }
    case 'CHECKED_MEMBER': {
      return '人员已核对';
    }
    case 'CHECKED_SALARY': {
      return '薪资已核对';
    }
    case 'WAIT_BACK': {
      return '待反馈';
    }
    case 'AUDIT_REJECT': {
      return '审核拒绝';
    }
    case 'COMPUTED': {
      return '已计算';
    }
    case 'AUDITED': {
      return '审核通过';
    }
    case 'PAID': {
      return '薪资已发放';
    }
    case 'FINISH': {
      return '结束';
    }
  }
};
//用工性质
const filterEmpType = (val) => {
  switch (val) {
    case 'FULL_TIME': {
      return '全职';
    }
    case 'PART_TIME': {
      return '兼职';
    }
    case 'PRACTICE': {
      return '实习';
    }
    case 'LABOUR': {
      return '劳务';
    }
    case 'RE_EMPLOY': {
      return '退休返聘';
    }
  }
};
//学历
const filterEducation = (val) => {
  switch (val) {
    case 'DR': {
      return '博士研究生';
    }
    case 'MASTER': {
      return '硕士研究生';
    }
    case 'REGULAR': {
      return '大学本科';
    }
    case 'JUNIOR': {
      return '大学专科';
    }
    case 'OTHER': {
      return '其他';
    }
  }
};
//员工状态
export const filterEmployStatus = (val) =>{
  switch (val) {//仲裁类别
    case 'ON_THE_JOB': {
      return '在职';
    }
    case 'DIMISSION': {
      return '离职';
    }
    case 'RETIRED': {
      return '退休';
    }
  }
}
//对比上月状态
export const compareLastMonthOperation = (val) =>{
  switch (val) {
    case 'ADD': {
      return '增员';
    }
    case 'UPDATE': {
      return '更新';
    }
    case 'DELETE': {
      return '减员';
    }
  }
}
//户口性质
const householdRegistrationType = (val) => {
  switch (val) {//仲裁类别
    case 'CITY': {
      return '城镇户口';
    }
    case 'VILLAGE': {
      return '农村户口';
    }
  }
};
const filterType = (val) => {
  switch (val) {//仲裁类别
    case 'SYSYEM': {
      return '系统项';
    }
    case 'COMPUTE': {
      return '计算项';
    }
    case 'BEFORE_TAX': {
      return '税前';
    }
    case 'DEDUCT': {
      return '税后';
    }
    case 'AFTER_TAX': {
      return '扣减项';
    }
    case 'SALARY': {
      return '收入项';
    }
  }
};
const getDay = (val) => {
  let selectMonth;
  switch (val) {
    case "CURRENT_MONTH":
      selectMonth = this.month;
      break;
    case 'NEXT_MONTH':
      selectMonth = this.month - (-1);
      break;
    case 'LAST_MONTH':
      selectMonth = this.month - 1;
      break;
    default:
  }
  if([1,3,5,7,8,10,12].includes(selectMonth)){this.fullDay = 31}
  if([4,6,9,11].includes(selectMonth)){this.fullDay = 30}
  if(selectMonth == "2"){
      if ((this.fullYear % 4 == 0 && this.fullYear % 100 != 0) ||this.fullYear % 400 == 0) {
        this.fullDay = 29; //闰年2月29天
      } else {
        this.fullDay = 28; //闰年平年28天
      }
  }
};
const accreditStatus = (val) => {
  switch (val) {//仲裁类别
    case 'SUCCESS': {
      return '验证成功';
    }
    case 'FAIL': {
      return '验证失败';
    }
    case 'WAIT_ACCREDIT': {
      return '待反馈';
    }
  }
};
const filtersSalaryType = (val) => {
  switch (val) {
    case 'NO_PROVIDE': {
      return '未发放';
    }
    case 'PROVIDED': {
      return '已发放';
    }
    case 'BACK': {
      return '已撤销';
    }
  }
};
const idType = (val) => {
  switch (val) {
    case 'PRC_ID': {
      return '居民身份证';
    }
  }
};

const dateStyle = (val) => {
  if(val){
    return val.split(' ')[0]
  }
}

const countryType = (val) => {
  switch (val) {
    case 'CHINA': {
      return '中国';
    }
  }
};

const reportType = (val) => {
  switch (val) {
    case 'FAIL': {
      return '失败';
    }
  }
};

//性别
const filterEmpSex = (val) => {
  switch (val) {
    case 'MALE': {
      return '男';
    }
    case 'FEMALE': {
      return '女';
    }
  }
};
 //参保状态
const insuredStatus = (val) => {
  switch (val) {
    case 'INSURED_STOP': {
      return '已停保';
    }
    case 'INSURED_ING': {
      return '参保中';
    }
  }
};

 const insuranceType = (val) => {
  switch (val) {
    case 'ENDOWMENT_INSURANCE': {
      return '养老保险';
    }
    case 'MEDICAL_INSURANCE': {
      return '医疗保险';
    }
    case 'UNEMPLOYMENT_INSURANCE': {
      return '失业保险';
    }
    case 'INJURY_INSURANCE': {
      return '工伤保险';
    }
    case 'BIRTH_INSURANCE': {
      return '生育保险';
    }
    case 'SERIOUS_DISEASE_TREATMENT': {
      return '大病医疗';
    }
    case 'COMPENSATORY_ENDOWMENT_INSURANCE': {
      return '补充养老保险';
    }
    case 'RESIDUAL_INSURANCE_GOLD': {
      return '残保金';
    }
    case 'COMPENSATORY_MEDICAL_INSURANCE': {
      return '补充医疗保险';
    }
    case 'COMPENSATORY_UNEMPLOYMENT_INSURANCE': {
      return '补充失业保险';
    }
    case 'ACCUMULATION_FUND': {
      return '公积金';
    }
    case 'COMPENSATORY_ACCUMULATION_FUND': {
      return '补偿公积金';
    }
    case 'TOTAL_INSURANCE': {
      return '合计';
    }

  }
};
//证件类型
const filterIdType = (val) => {
  switch (val) {
    case 'PRC_ID': {
      return '居民身份证';
    }
    case 'COMPATRIOTS_CARD': {
      return '港澳居民来往内地通行证';
    }
    case 'FORMOSA_CARD': {
      return '台湾居民来往大陆通行证';
    }
    case 'CHINA_PASSPORT': {
      return '中国护照';
    }
    case 'FOREIGN_PASSPORT': {
      return '外国护照';
    }
    case 'FORMOSA_PRC_ID': {
      return '台湾居民居住证';
    }
    case 'MACAU_PRC_ID': {
      return '港澳居民居住证';
    }
    case 'FOREIGN_PRC_ID':{
      return '外国人永久居留身份证';
    }
    case 'FOREIGN_WORK_PERMIT_A': {
      return '外国人工作许可证（A类）';
    }
    case 'FOREIGN_WORK_PERMIT_B': {
      return '外国人工作许可证（B类）';
    }
    case 'FOREIGN_WORK_PERMIT_C': {
      return '外国人工作许可证（C类）';
    }
    case 'OTHER': {
      return '其他';
    }
  }
};

// 任职受雇从业类型
const workType = (val) => {
  switch (val) {
    case 'EMPLOYEE': {
      return '雇员';
    }
    case 'OTHER': {
      return '其他';
    }
  }
};
// 是否转正
const regularEmpYn = (val) => {
  switch (val) {
    case '1': {
      return '是';
    }
    case '0': {
      return '否';
    }
  }
};

export default {
  resetDate,
  texRule,
  salaryCheckStatus,
  filterEmpType,
  idType,
  countryType,
  accreditStatus,
  dateStyle,
  insuranceType,
  reportType,
  filterEmployStatus,
  filterEmpSex,
  filterIdType,
  filterEducation,
  householdRegistrationType,
  workType,
  insuredStatus,
  compareLastMonthOperation,
  regularEmpYn
}