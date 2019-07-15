import attach from '../attach'
import collect from '../collect'
import declare from '../declare'
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
    path: '/tax/declare',
    component: declare
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
