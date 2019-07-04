import Vue from 'vue'
import filterSample from './sample'

Vue.filter('filterSample', filterSample)
const participantsType = (val) => {
  switch (val) {//仲裁类别
    case 1: {
      return '个人';
    }
    case 2: {
      return '企业';
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
  console.log(this.fullDay)
};
export default {
  participantsType,
  getDay,
  filterType,
}