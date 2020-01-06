import payBatch from '../payBatch';
import payRecord from '../payRecord';
import payOrder from '../payOrder';
import batchEdite from '../batchEdite';
import recordDetail from '../recordDetail';

export default [
	{
		path: '/pay-batch',
		name: 'payBatch',
		component: payBatch,
		meta: {
      businessCode: "salary.psalaryIssuing.batch",
      icon:"iconshenbao"
    }
	},
	{
		path: '/pay-record',
		name: 'payRecord',
		component: payRecord,
		meta: { title: "批量代发记录", businessCode: "salary.psalaryIssuing.batchRecord",}
	},
	{
		path: '/pay-order',
		name: 'payOrder',
		component: payOrder,
		meta: { title: "代发订单",businessCode: "salary.psalaryIssuing.order",}
	},
	{
		path: '/batch-edite',
		name: 'batchEdite',
		component: batchEdite,
		meta: { title: "批量代发" }
	},
	{
		path: '/record-detail',
		name: 'recordDetail',
		component: recordDetail,
		meta: { title: "记录详情" }
	}
]
