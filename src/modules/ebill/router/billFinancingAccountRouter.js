const billFinancingAccountRouter = [
  {
    path: '/ddblFactoringLedger',
    name: 'ddblFactoringLedger',
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
    path: '/ddblFactoringLedgerDetail',
    name: 'ddblFactoringLedgerDetail',
    component: () => import('../views/queryStatistics/billFinancingAccount/detail'),
    meta: {
      isMock: true,
      title: '订单保理融资详情',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      parent:'ddblFactoringLedger',
      notRequireAuth: true
    }
  },
]
export default billFinancingAccountRouter
