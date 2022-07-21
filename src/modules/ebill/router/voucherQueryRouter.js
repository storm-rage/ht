const voucherSignForRouter = [
  {
    path: '/voucherQuery',
    name: 'voucherQuery',
    component: () => import('../views/queryStatistics/voucherQuery'),
    meta: {
      isMock: true,
      title: '电子债权凭证查询',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/voucherQueryDetail',
    name: 'voucherQueryDetail',
    component: () => import('../views/queryStatistics/voucherQuery/detail'),
    meta: {
      isMock: true,
      title: '电子债权凭证详情',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      parent:'voucherQuery',
      notRequireAuth: true
    }
  },
]
export default voucherSignForRouter
