import attach from '../attach'
import collect from '../collect'
import declare from '../declare'

export default [
  {
    path: '/tax/attach',
    component: attach,
  }, {
    path: '/tax/collect',
    component: collect,
  },{
    path: '/tax/declare',
    component: declare
  },
  {
    path:'/tax/info-collection'
  }
]
