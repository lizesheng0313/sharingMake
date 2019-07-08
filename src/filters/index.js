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
    case 'AUDIT_REJECT': {
      return '审核拒绝';
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
export default {
  resetDate,
  texRule,
  salaryCheckStatus,
  getDay,
  filterType,
}