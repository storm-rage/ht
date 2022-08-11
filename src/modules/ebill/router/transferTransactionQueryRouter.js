const transferTransactionQueryRouter = [
  {
    path: '/queryBillTransfer',
    name: 'queryBillTransfer',
    component: () => import('../views/billLssue/transferTransactionQuery'),
    meta: {
      title: '转让交易查询',
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/transferTransactionSearchDetail',
    name: 'transferTransactionSearchDetail',
    component: () => import('../views/billLssue/transferTransactionQuery/detail'),
    meta: {
      title: '转让交易详情',
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      parent:'queryBillTransfer',
    }
  },
]
export default transferTransactionQueryRouter
