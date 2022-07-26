/**
 * 业务申请 路由
 */
const businessApplyRouter = [
  {
    path: '/productOpenApply',
    name: 'productOpenApply',
    component: () => import('../views/businessApply/productsOpened/index.vue'),
    meta: {
      title: '产品开通申请',
      root: '业务申请',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/productsOpenedApply',
    name: 'productsOpenedApply',
    component: () => import('../views/businessApply/productsOpened/apply/index.vue'),
    meta: {
      title: '产品开通申请',
      parent: 'productOpenApply',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/basicInfoApplyRecord',
    name: 'basicInfoApplyRecord',
    component: () => import('../views/businessApply/transactionQuery/index.vue'),
    meta: {
      title: `基础信息维护交易查询`,
      root: '业务申请',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/transactionQueryEnt',
    name: 'transactionQueryEnt',
    component: () => import('../views/businessApply/transactionQuery/detail/entDetail.vue'),
    meta: {
      title: `基础信息维护交易详情-企业`,
      parent: 'basicInfoApplyRecord',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/transactionQueryUser',
    name: 'transactionQueryUser',
    component: () => import('../views/businessApply/transactionQuery/detail/userDetail.vue'),
    meta: {
      title: `基础信息维护交易详情-用户`,
      parent: 'basicInfoApplyRecord',
      keepAlive: true,
      refreshIndex: 0,
    }
  }
]
export default businessApplyRouter
