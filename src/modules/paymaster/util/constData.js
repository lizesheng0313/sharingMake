/**
 * 模板管理 常量定义
 */

//雇员状态
export const workerType = [
  {
    label:"雇员",
    value:"EMPLOYEE"
  },{
    label:"其他",
    value:"OTHER"
  }
]
//性别
export const empSex = [
  {
    label:"男",
    value:"MALE"
  },{
    label:"女",
    value:"FEMALE"
  }
]

//证件类型
export const idType = [
  {
    label:"居民身份证",
    value:"PRC_ID"
  },{
    label:"港澳居民来往内地通行证",
    value:"COMPATRIOTS_CARD"
  }, {
    label:"台湾居民来往大陆通行证",
    value:"FORMOSA_CARD"
  },{
    label:"中国护照",
    value:"CHINA_PASSPORT"
  },{
    label:"外国护照",
    value:"FOREIGN_PASSPORT"
  },{
    label:"台湾居民居住证",
    value:"FORMOSA_PRC_ID"
  },{
    label:"港澳居民居住证",
    value:"MACAU_PRC_ID"
  },{
    label:"外国人永久居留身份证",
    value:"FOREIGN_PRC_ID"
  },{
    label:"外国人工作许可证（A类）",
    value:"FOREIGN_WORK_PERMIT_A"
  },{
    label:"外国人工作许可证（B类）",
    value:"FOREIGN_WORK_PERMIT_B"
  },{
    label:"外国人工作许可证（C类）",
    value:"FOREIGN_WORK_PERMIT_C"
  },{
    label:"其他",
    value:"OTHER"
  }
]
//用工性质
export const enumEmpTypeOption = [
  {
    label:"全职",
    value:"FULL_TIME"
  },{
    label:"兼职",
    value:"PART_TIME"
  },{
    label:"实习",
    value:"PRACTICE"
  },{
    label:"劳务",
    value:"LABOUR"
  },{
    label:"退休返聘",
    value:"RE_EMPLOY"
  }
]
  //员工状态
  export const employStatusOption = [
  {
    label:"在职",
    value:"ON_THE_JOB"
  },{
    label:"离职",
    value:"DIMISSION"
  },{
    label:"退休",
    value:"RETIRED"
  }
]

//是否转正
export const regularEmpYnOption = [
  {
    label:"不限",
    value:""
  },{
    label:"是",
    value:"1"
  },{
    label:"否",
    value:"0"
  }
]

//最高学历
export const educationOption = [
  {
    label:"博士研究生",
    value:"DR"
  },{
    label:"硕士研究生",
    value:"MASTER"
  },{
    label:"大学本科",
    value:"REGULAR"
  },{
      label:"大学专科",
      value:"JUNIOR"
  },{
      label:"其他",
      value:"OTHER"
  },
]
// 户口性质
export const householdRegistrationTypeOption = [
  {
    label:"城镇户口",
    value:"CITY"
  },{
    label:"农村户口",
    value:"VILLAGE"
  }
]
//涉税事由
export const taxReasonOption = [
  {
    label:"任职受雇",
    value:"EMPLOYMENT"
  },{
    label:"提供临时劳务",
    value:"TEMPORARY_LABOR"
  },{
    label:"转让财产",
    value:"TRANSFER_PROPERTY"
  },{
    label:"从事投资和经营活动",
    value:"INVEST"
  },{
    label:"其他",
    value:"OTHER"
  },
]

