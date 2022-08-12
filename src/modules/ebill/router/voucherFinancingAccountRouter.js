const voucherFinancingAccountRouter = [
  {
    path: '/rdFactoringLedger',
    name: 'rdFactoringLedger',
    component: () => import('../views/queryStatistics/voucherFinancingAccount'),
    meta: {
      isMock: true,
      title: '凭证保理融资台账',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/rdFactoringLedgerDetail',
    name: 'rdFactoringLedgerDetail',
    component: () => import('../views/queryStatistics/voucherFinancingAccount/detail'),
    meta: {
      isMock: true,
      title: '凭证融资详情',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      parent:'rdFactoringLedger',
      notRequireAuth: true
    }
  },
]
export default voucherFinancingAccountRouter
