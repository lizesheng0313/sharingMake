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