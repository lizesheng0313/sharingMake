/**
 * 模板管理 常量定义
 */
//保险类型
export const socialInsuranceType = [
    {
      label:"养老保险",
      value:"ENDOWMENT_INSURANCE"
    },{
      label:"医疗保险",
      value:"MEDICAL_INSURANCE"
    }, {
      label:"失业保险",
      value:"UNEMPLOYMENT_INSURANCE"
    },{
      label:"工伤保险",
      value:"INJURY_INSURANCE"
    },{
      label:"生育保险",
      value:"BIRTH_INSURANCE"
    },{
      label:"大病医疗",
      value:"SERIOUS_DISEASE_TREATMENT"
    },{
      label:"残保金",
      value:"RESIDUAL_INSURANCE_GOLD"
    }, {
    label:"补充养老保险",
    value:"COMPENSATORY_ENDOWMENT_INSURANCE"
   }, {
    label:"补充医疗保险",
    value:"COMPENSATORY_MEDICAL_INSURANCE"
  }, {
      label:"补充失业保险",
      value:"COMPENSATORY_UNEMPLOYMENT_INSURANCE"
    }
  ]
export const funInsuranceType = [
  {
    label:"公积金",
    value:"ACCUMULATION_FUND"
  },{
    label:"补偿公积金",
    value:"COMPENSATORY_ACCUMULATION_FUND"
  },
]

export const ruleOption = [
  {
    label:"四舍五入至分",
    value:"ROUND_UNTIL_FEN"
  },{
    label:"四舍五入至角",
    value:"ROUND_UNTIL_JIAO"
  },{
    label:"四舍五入至元",
    value:"ROUND_UNTIL_YUAN"
  },{
    label:"见厘进分",
    value:"CEIL_INTO_FEN"
  },{
      label:"见分进角",
      value:"CEIL_INTO_JIAO"
  },{
      label:"见分舍去，见角进元",
      value:"CEIL_INTO_YUAN"
  },{
      label:"见分进角进元",
      value:"CEIL_INTO_JIAO_YUAN"
  },{
      label:"截尾舍去至元",
      value:"ZERO_EXCEPT_YUAN"
  },
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