const transferTransactionSearchRouter = [
  {
    path: '/transferTransactionSearch',
    name: 'transferTransactionSearch',
    component: () => import('../views/voucherManage/transferTransactionSearch'),
    meta: {
      isMock: true,
      title: '转让交易查询',
      root: '凭证管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/transferTransactionSearchDetail',
    name: 'transferTransactionSearchDetail',
    component: () => import('../views/voucherManage/transferTransactionSearch/detail'),
    meta: {
      isMock: true,
      title: '转让交易详情',
      root: '凭证管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'transferTransactionSearch',
      notRequireAuth: true
    }
  },
]
export default transferTransactionSearchRouter
