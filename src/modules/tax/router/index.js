import attach from '../attach'
import collect from '../collect'
import report from '../report'
import paid from '../paid'
import infoCollection from '../info-collection'

export default [
  {
    path: '/tax/attach',
    component: attach,
  }, {
    path: '/tax/collect',
    component: collect,
  }, {
    path: '/tax/report',
    component: report
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
