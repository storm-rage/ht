const transferTransactionQueryRouter = [
  {
    path: '/transferTransactionSearch',
    name: 'transferTransactionSearch',
    component: () => import('../views/billLssue/transferTransactionQuery'),
    meta: {
      isMock: true,
      title: '转让交易查询',
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/transferTransactionSearchDetail',
    name: 'transferTransactionSearchDetail',
    component: () => import('../views/billLssue/transferTransactionQuery/detail'),
    meta: {
      isMock: true,
      title: '转让交易详情',
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      parent:'transferTransactionSearch',
      notRequireAuth: true
    }
  },
]
export default transferTransactionQueryRouter
