const billFinancingAccountRouter = [
  {
    path: '/billFinancingAccount',
    name: 'billFinancingAccount',
    component: () => import('../views/queryStatistics/billFinancingAccount'),
    meta: {
      isMock: true,
      title: '订单保理融资台账',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billFinancingAccountDetail',
    name: 'billFinancingAccountDetail',
    component: () => import('../views/queryStatistics/billFinancingAccount/detail'),
    meta: {
      isMock: true,
      title: '订单保理融资详情',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      parent:'billFinancingAccount',
      notRequireAuth: true
    }
  },
]
export default billFinancingAccountRouter
