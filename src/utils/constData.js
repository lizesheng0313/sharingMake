//账户审核状态
export const accountStatus = {
	SUBMITTED: "已提交",
	WAIT: "待审核",
	PASS: "审核通过",
	BACK: "审核回退",
	FAIL: "审核拒绝"
}
//激活状态
export const activeStatus = {
	NOT_SUBMIT: "未报送",
	WAIT_ACTIVE: "待激活",
	ACTIVED: "已激活"
}
//提现订单状态
export const withdrawStatus = {
	"WITHDRAW_INIT": "已受理",
	"MERCHANT_REMIT_ING": "出款中",
	"SUCCESS": "出款成功",
	"BACK_SUCCESS": "出款失败",
	"ROLL_BACK_SUCCESS": "已退汇"
}
//充值订单状态
export const rechargeStatus = {
	"ACCEPT": "支付中",
	"SUCCESS": "成功",
	"FAIL": "失败"
}
//订单类型
export const orderType = {
	BHA_WAP: "存管网银充值",
	BHA_UNLINE: "存管线下调账充值",
	BHA_TRANSFER: "线下转账充值",
	BHA_OFFLINE_WEB: "打款划拨充值"
}
//订单状态枚举
export const orderStatus = {
	ACCEPT: "已受理",
	CHECK_SUCCESS: "校验通过",
	CHECK_FAIL: "校验失败",
	BACK_SUCCESS: "出款失败",
	ROLL_BACK_SUCCESS: "已退汇",
	SUCCESS: "出款成功",
	CLOSED: "已关单",
	MERCHANT_REMIT_ING: "出款中",
	ROLL_BACK_ING: "退汇中"
}
//批次状态枚举
export const batchStatus = {
	CHECK_ING: "鉴权校验中",
	CHECK_ALL_SUCCESS: "校验全部成功",
	CHECK_PART_SUCCESS: "校验部分成功",
	CHECK_ALL_FAIL: "校验全部失败",
	PAID: "已支付",
	CLOSED: "已关单"
}
//开户审核状态
export const checkStatus = {
	SUBMITTED: "已提交",
	WAIT: "待审核",
	FAIL: "审核失败",
	BACK: "审核回退",
	PASS: "审核通过"
}
export const privilegeVOList = [
  {groupId: 5, name: "查看", code: "salary.homePage.query"},
  {groupId: 7, name: "列表查看", code: "salary.compute.salaryCheck.list"},
  {groupId: 7, name: "新增工资表", code: "salary.compute.salaryCheck.addSalaryRule"},
  {groupId: 7, name: "设置工资表", code: "salary.compute.salaryCheck.updateSalaryRule"},
  {groupId: 7, name: "启动算薪/计算/查看薪资", code: "salary.compute.salaryCheck.query"},
  {groupId: 7, name: "核对人员-列表查看", code: "salary.compute.salaryCheck.empList"},
  {groupId: 7, name: "核对人员-增减员导入", code: "salary.compute.salaryCheck.empAdd"},
  {groupId: 7, name: "核对人员-删除", code: "salary.compute.salaryCheck.empDelete"},
  {groupId: 7, name: "核对人员-导出", code: "salary.compute.salaryCheck.empExport"},
  {groupId: 7, name: "采集报送-列表查看", code: "salary.compute.salaryCheck.empReportList"},
  {groupId: 7, name: "采集报送-编辑", code: "salary.compute.salaryCheck.empReportEdit"},
  {groupId: 7, name: "采集报送-报送", code: "salary.compute.salaryCheck.empReport"},
  {groupId: 7, name: "采集报送-导出", code: "salary.compute.salaryCheck.empReportExport"},
  {groupId: 7, name: "专项附加扣除-列表查看", code: "salary.compute.salaryCheck.additionList"},
  {groupId: 7, name: "专项附加扣除-全部下载", code: "salary.compute.salaryCheck.additionDownload"},
  {groupId: 7, name: "社保公积金-列表查看", code: "salary.compute.salaryCheck.socialList"},
  {groupId: 7, name: "社保公积金-复制上月数据", code: "salary.compute.salaryCheck.socialCopy"},
  {groupId: 7, name: "社保公积金-导入", code: "salary.compute.salaryCheck.socialImport"},
  {groupId: 7, name: "社保公积金-导出", code: "salary.compute.salaryCheck.socialExport"},
  {groupId: 7, name: "核算薪资-列表查看", code: "salary.compute.salaryCheck.salaryList"},
  {groupId: 7, name: "核算薪资-浮动项导入", code: "salary.compute.salaryCheck.salaryImport"},
  {groupId: 7, name: "核算薪资-薪资计算", code: "salary.compute.salaryCheck.salaryCompute"},
  {groupId: 7, name: "核算薪资-薪资审核", code: "salary.compute.salaryCheck.salaryReview"},
  {groupId: 7, name: "核算薪资-导出工资明细", code: "salary.compute.salaryCheck.salaryExport"},
  {groupId: 7, name: "核算薪资-导出部门汇总", code: "salary.compute.salaryCheck.depExport"},
  {groupId: 7, name: "发放薪资-银行代发", code: "salary.compute.salaryCheck.payroll"},
  {groupId: 7, name: "发放薪资-银行报盘", code: "salary.compute.salaryCheck.bankOffer"},
  {groupId: 7, name: "发放薪资-发放工资条", code: "salary.compute.salaryCheck.providStubs"},
  {groupId: 9, name: "列表查看", code: "salary.report.personReport.list"},
  {groupId: 9, name: "编辑", code: "salary.report.personReport.edit"},
  {groupId: 9, name: "报送", code: "salary.report.personReport.sendReport"},
  {groupId: 9, name: "导出", code: "salary.report.personReport.export"},
  {groupId: 10, name: "列表查看", code: "salary.report.additionl.list"},
  {groupId: 10, name: "导出", code: "salary.report.additionl.export"},
  {groupId: 11, name: "列表查看", code: "salary.report.taxReport.list"},
  {groupId: 11, name: "生成申报数据", code: "salary.report.taxReport.generateReport"},
  {groupId: 11, name: "发送申报", code: "salary.report.taxReport.sendReport"},
  {groupId: 11, name: "获取反馈", code: "salary.report.taxReport.reportBack"},
  {groupId: 11, name: "作废申报", code: "salary.report.taxReport.cancelReport"},
  {groupId: 11, name: "导出申报表", code: "salary.report.taxReport.export"},
  {groupId: 13, name: "列表查看", code: "salary.taxpay.paytax.list"},
  {groupId: 13, name: "立即缴款", code: "salary.taxpay.paytax.sendPay"},
  {groupId: 13, name: "下载三方协议", code: "salary.taxpay.paytax.downloadProtocol"},
  {groupId: 15, name: "列表查看", code: "salary.init.taxSubject.list"},
  {groupId: 15, name: "新增/编辑", code: "salary.init.taxSubject.save"},
  {groupId: 15, name: "删除", code: "salary.init.taxSubject.delete"},
  {groupId: 16, name: "列表查看", code: "salary.init.taxTotalBase.list"},
  {groupId: 16, name: "删除", code: "salary.init.taxTotalBase.delete"},
  {groupId: 16, name: "导入", code: "salary.init.taxTotalBase.import"},
  {groupId: 18, name: "列表查看", code: "salary.psalaryIssuing.batch.select"},
  {groupId: 18, name: "激活账户", code: "salary.psalaryIssuing.batch.activation"},
  {groupId: 18, name: "生成代发数据", code: "salary.psalaryIssuing.batch.create"},
  {groupId: 18, name: "导入代发数据", code: "salary.psalaryIssuing.batch.import"},
  {groupId: 19, name: "详情-确认代发", code: "salary.psalaryIssuing.batchRecord.pay"},
  {groupId: 19, name: "列表查看", code: "salary.psalaryIssuing.batchRecord.select"},
  {groupId: 19, name: "批量代发详情", code: "salary.psalaryIssuing.batchRecord.details"},
  {groupId: 19, name: "继续代发", code: "salary.psalaryIssuing.batchRecord.continue"},
  {groupId: 19, name: "删除批量代发记录", code: "salary.psalaryIssuing.batchRecord.delete"},
  {groupId: 19, name: "导出", code: "salary.psalaryIssuing.batchRecord.export"},
  {groupId: 19, name: "详情-编辑", code: "salary.psalaryIssuing.batchRecord.detailsEdit"},
  {groupId: 19, name: "详情-重发", code: "salary.psalaryIssuing.batchRecord.detailsContinue"},
  {groupId: 19, name: "详情-关闭订单", code: "salary.psalaryIssuing.batchRecord.close"},
  {groupId: 20, name: "列表查看", code: "salary.psalaryIssuing.order.select"},
  {groupId: 22, name: "列表查看", code: "salary.account.psalaryAccount.select"},
  {groupId: 22, name: "新增资金账户", code: "salary.account.psalaryAccount.add"},
  {groupId: 22, name: "立即开户", code: "salary.account.psalaryAccount.open"},
  {groupId: 22, name: "激活账户", code: "salary.account.psalaryAccount.activation"},
  {groupId: 22, name: "账户详情", code: "salary.account.psalaryAccount.details"},
  {groupId: 22, name: "开户信息", code: "salary.account.psalaryAccount.info"},
  {groupId: 22, name: "开户信息-保存修改", code: "salary.account.psalaryAccount.saveUpdate"},
  {groupId: 22, name: "账户信息-余额提现", code: "salary.account.psalaryAccount.withdraw"},
  {groupId: 22, name: "账户信息-修改交易密码", code: "salary.account.psalaryAccount.changePwd"},
  {groupId: 23, name: "列表查看", code: "salary.account.recharge.select"},
  {groupId: 23, name: "导出", code: "salary.account.recharge.export"},
  {groupId: 24, name: "列表查看", code: "salary.account.withdraw.select"},
  {groupId: 24, name: "导出", code: "salary.account.withdraw.export"},
]
export const privilegeGroupTreeVO = [
  {
    "name": "薪资核算",
    "businessCode": "salary.compute",
    "parentId": 4,
    "children": [{
      "name": "薪资核算",
      "businessCode": "salary.compute.salaryCheck",
      "parentId": 6,
      "children": null,
      "privileges": null
    }],
    "privileges": null
  },
  {
    "name": "个税申报",
    "businessCode": "salary.report",
    "parentId": 4,
    "children": [{
      "name": "人员信息采集",
      "businessCode": "salary.report.personReport",
      "parentId": 8,
      "children": null,
      "privileges": null
    }, {
      "name": "专项附加扣除",
      "businessCode": "salary.report.additionl",
      "parentId": 8,
      "children": null,
      "privileges": null
    },
      {
        "name": "综合所得申报",
        "businessCode": "salary.report.taxReport",
        "parentId": 8,
        "children": null,
        "privileges": null
      }],
    "privileges": null
  },
  {
    "name": "税款缴纳",
    "businessCode": "salary.taxpay",
    "parentId": 4,
    "children": [{
      "name": "三方协议缴税",
      "businessCode": "salary.taxpay.paytax",
      "parentId": 12,
      "children": null,
      "privileges": null
    }],
    "privileges": null
  },
  {
    "name": "初始化设置",
    "businessCode": "salary.init",
    "parentId": 4,
    "children": [{
      "name": "扣缴义务人管理",
      "businessCode": "salary.init.taxSubject",
      "parentId": 14,
      "children": null,
      "privileges": null
    },
      {
        "name": "累计应税项初始化",
        "businessCode": "salary.init.taxTotalBase",
        "parentId": 14,
        "children": null,
        "privileges": null
      }],
    "privileges": null
  },
  {
    "name": "代发管理",
    "businessCode": "salary.psalaryIssuing",
    "parentId": 4,
    "children": [{
      "name": "批量代发",
      "businessCode": "salary.psalaryIssuing.batch",
      "parentId": 17,
      "children": null,
      "privileges": null
    },
      {
        "name": "批量代发记录",
        "businessCode": "salary.psalaryIssuing.batchRecord",
        "parentId": 17,
        "children": null,
        "privileges": null
      }, {
        "name": "代发订单",
        "businessCode": "salary.psalaryIssuing.order",
        "parentId": 17,
        "children": null,
        "privileges": null
      }],
    "privileges": null
  },
  {
    "name": "账户管理",
    "businessCode": "salary.account",
    "parentId": 4,
    "children": [{
      "name": "代发账户管理",
      "businessCode": "salary.account.psalaryAccount",
      "parentId": 21,
      "children": null,
      "privileges": null
    },
      {
        "name": "充值记录",
        "businessCode": "salary.account.recharge",
        "parentId": 21,
        "children": null,
        "privileges": null
      },
      {
        "name": "提现记录",
        "businessCode": "salary.account.withdraw",
        "parentId": 21,
        "children": null,
        "privileges": null
      }
    ]},
]