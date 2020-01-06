import attach from '../attach'
import collect from '../collect'
import report from '../report'
import paid from '../paid'
import infoCollection from '../info-collection'

export default [
  {
    path: '/tax/attach',
    component: attach,
    meta: {
      businessCode: "salary.report.additionl"
    }
  }, {
    path: '/tax/collect',
    component: collect,
    meta: {
      businessCode: "salary.report.personReport",
      icon:"icongeshuishenbao"
    }
  }, {
    path: '/tax/report',
    component: report,
    meta: {
      businessCode: "salary.report.taxReport"
    }
  },
  {
    path: '/tax/info-collection',
    component: infoCollection
  },
  {
    path: '/tax/paid',
    component: paid
  }
]
